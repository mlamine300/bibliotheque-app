import { auth } from "@/auth";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { userInfo } from "@/index";
import { eq } from "drizzle-orm";

export const getUser: () => Promise<userInfo | null> = async () => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      console.log("there is no session please connect");
      return null;
    }
    const res = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, session.user.id))
      .limit(1);
    if (!res.length || res.length < 1) {
      console.log(session.user.id);
      console.log("user not saved on db");
      return null;
    }
    const user = res[0];
    /**  status: "PENDING" | "APPROVED" | "REJECTED";
  name: string;
  email: string;
  studentId: string;
  userAvatar: string;
  universityCard: string; */
    return {
      email: user.email,
      name: user.fullName,
      status: user.status,
      studentId: user.universityId + "",
      universityCard: user.universityCard,
      userAvatar: "/users/cv%20image%202.jpeg",
    } as userInfo;
  } catch (error) {
    console.error("Error getting user :", error);
    return null;
  }
};
