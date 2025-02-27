/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { auth, signIn, signOut } from "../../auth";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { signUpParams } from "@/index";
import { hash } from "bcryptjs";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import ratelimit from "../rateLimite";
import { redirect } from "next/navigation";
import { workflowClient } from "../workflow";
import config from "../../../config";

export const logOut = async () => {
  await signOut();
};

export const signUp = async ({
  fullName,
  email,
  universityId,
  password,
  universityCard,
  userAvatar,
}: signUpParams) => {
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) return redirect("/too-fast");
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (user.length === 1) {
    return { success: false, message: "user already exists" };
  }
  try {
    const hashedPassword = await hash(password, 15);
    //@ts-ignore
    await db.insert(usersTable).values({
      email,
      fullName,
      universityId,
      password: hashedPassword,
      universityCard,
      userAvatar,
    });

    await workflowClient.trigger({
      url: `${config.env.prodApiEndPoint}/api/workflow/onboard`,
      body: {
        email,
        name: fullName,
      },
    });
    await signInWithCredenetials({ email, password });

    return { success: true };
  } catch (error: any) {
    console.error(error);
    return { success: false, message: "56" + error.message };
  }
};

export const signInWithCredenetials: (data: {
  email: string;
  password: string;
}) => Promise<{
  success: boolean;
  message?: string;
}> = async ({ email, password }: { email: string; password: string }) => {
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return redirect("/too-fast");
  }
  try {
    console.log("sign in..........");
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response?.error) {
      console.error("error 61 : " + response.error);
      return { success: false, error: "82" + response.error };
    }
    // console.log("----------*---------");
    // console.log(response);
    // const a = await auth();
    // console.log(a);
    // console.log("----------*---------");
    const session = await auth();
    return { success: true, session: session };
  } catch (error: any) {
    console.error("error 67: " + error.message);
    console.log(error);
    return { success: false, message: "94" + error.message };
  }
};
