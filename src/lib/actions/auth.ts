/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { auth, signIn } from "../../auth";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { signUpParams } from "@/index";
import { hash } from "bcryptjs";

import { eq } from "drizzle-orm";

export const signUp = async ({
  fullName,
  email,
  universityId,
  password,
  universityCard,
}: signUpParams) => {
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
    });

    signInWithCredenetials({ email, password });
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const signInWithCredenetials: (data: {
  email: string;
  password: string;
}) => Promise<{
  success: boolean;
  message?: string;
}> = async ({ email, password }: { email: string; password: string }) => {
  try {
    console.log("sign in..........");
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response?.error) {
      console.log("error 61 : " + response.error);
      return { success: false, error: response.error };
    }
    // console.log("----------*---------");
    // console.log(response);
    // const a = await auth();
    // console.log(a);
    // console.log("----------*---------");
    const session = await auth();
    return { success: true, session: session };
  } catch (error: any) {
    console.log("error 67: " + error.message);
    console.log(error);
    return { success: false, message: error.message };
  }
};
