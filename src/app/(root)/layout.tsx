import { auth } from "@/auth";
import Header from "@/components/Header";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { after } from "next/server";

import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  after(async () => {
    if (!session?.user?.id) return;
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, session.user?.id))
      .limit(1);
    if (!user || user.length === 0) return;
    const now = new Date();
    const lastActivity = user[0].lastActivityDate;
    if (now.toISOString().slice(0, 10) === lastActivity) return;
    db.update(usersTable)
      .set({
        lastActivityDate: now.toISOString().slice(0, 10),
      })
      .where(eq(usersTable.id, session.user.id));

    // console.log("update last activity");
  });
  return (
    <main className="root-container">
      <Header session={session} />
      <div className=" max-w-[1500px] mx-auto w-full">{children}</div>
    </main>
  );
};

export default layout;
