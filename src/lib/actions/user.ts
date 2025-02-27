"use server";
import { auth } from "@/auth";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { userInfo } from "@/index";
import { count, eq, not } from "drizzle-orm";

interface UserActionResponse {
  success: boolean;
  data?: { count: number; users: userInfo[] };
  error?: string;
}

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
    return user as userInfo;
  } catch (error) {
    console.error("Error getting user :", error);
    return null;
  }
};

export const deleteUser: (
  userID: string
) => Promise<UserActionResponse> = async (userID) => {
  try {
    // const admin = await getUser();
    // if (!admin) {
    //   return {
    //     success: false,
    //     error: "no Session, Please connect and try again",
    //   };
    // }
    const checkAdmin = await checkAdminPermission();
    if (!checkAdmin.success || !checkAdmin.data?.users) return checkAdmin;
    const admin = checkAdmin.data?.users[0];
    const userRole = await db
      .select({ role: usersTable.role })
      .from(usersTable)
      .where(eq(usersTable.id, userID));

    if (
      // !admin.role ||
      // admin.role === "USER" ||
      userRole[0].role === "SUPERADMIN" ||
      (admin.role === "ADMIN" && userRole[0].role === "ADMIN")
    ) {
      return {
        success: false,
        error: "You dont have Permission To do this action",
      };
    }
    await db
      .update(usersTable)
      .set({ status: "DELETED" })
      .where(eq(usersTable.id, userID));
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: "Error getting users, " + error,
    };
  }
};

const checkAdminPermission: () => Promise<UserActionResponse> = async () => {
  try {
    const admin = await getUser();
    if (!admin) {
      return {
        success: false,
        error: "no Session, Please connect and try again",
      };
    }
    if (!admin.role || admin.role === "USER")
      return {
        success: false,
        error: "You don't have permission",
      };

    return { success: true, data: { count: 1, users: [admin] } };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Error Checking admin permission, " + error,
    };
  }
};
const checkSuperiority: (id: string) => Promise<UserActionResponse> = async (
  id
) => {
  const admin = await checkAdminPermission();
  if (!admin.success) return admin;

  const adminRole = admin.data?.users[0].role as string;

  const bellow = await db
    .select({ role: usersTable.role })
    .from(usersTable)
    .where(eq(usersTable.id, id));
  if (!bellow || bellow.length < 0)
    return {
      success: false,
      error: `there is no user with that id : ${id}`,
    };
  const userRole = bellow[0].role;
  if (
    (adminRole === "ADMIN" && userRole === "USER") ||
    (adminRole === "SUPERADMIN" && userRole !== "SUPERADMIN")
  ) {
    return { success: true };
  }
  return { success: false, error: "you don't have supremacy" };
};
export const updateUserRole: (
  role: "USER" | "ADMIN" | "SUPERADMIN",
  id: string
) => Promise<UserActionResponse> = async (role, id) => {
  try {
    const checkAdmin = await checkSuperiority(id);
    if (!checkAdmin.success) return checkAdmin;
    await db
      .update(usersTable)
      .set({ role: role })
      .where(eq(usersTable.id, id));
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: "Error updating  user role, " + error,
    };
  }
};

export const getUsers: (props?: {
  offset: number;
  limit: number;
}) => Promise<UserActionResponse> = async (props) => {
  const offset = props?.offset || 0;
  const limit = props?.limit || 10;
  try {
    const user = await getUser();
    if (!user)
      return {
        success: false,
        error: "no Session, Please connect and try again",
      };
    if (user.role != "ADMIN" && user.role != "SUPERADMIN")
      return {
        success: false,
        error: "you don't have permission!!",
      };
    const countRes = await db
      .select({ count: count() })
      .from(usersTable)
      .where(not(eq(usersTable.status, "DELETED")));
    const resp = await db
      .select()
      .from(usersTable)
      .where(not(eq(usersTable.status, "DELETED")))
      .orderBy(usersTable.createdAt)
      .offset(offset)
      .limit(limit);
    if (!countRes || countRes.length < 1 || !resp || resp.length < 1)
      return {
        success: false,
        error: "there is no user in database make sure to add users",
      };

    return {
      success: true,
      data: { count: countRes[0].count || 0, users: resp as userInfo[] },
    };
  } catch (error) {
    return {
      success: false,
      error: "Error getting users, " + error,
    };
  }
};
