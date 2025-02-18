import { db } from "@/db";
import { usersTable } from "@/db/schema";
import NextAuth, { User } from "next-auth";
import { eq } from "drizzle-orm";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("please cheque again");
          return null;
        }

        const user = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, credentials.email.toString()))
          .limit(1);

        if (user.length === 0) {
          console.log(credentials.email.toString());
          console.log("email does not exist");
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password.toString(),
          user[0].password
        );

        if (!isPasswordValid) {
          console.log("invalid Password");
          return null;
        }
        return {
          id: user[0].id.toString(),
          email: user[0].email,
          name: user[0].fullName,
        } as User;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }

      return session;
    },
  },
});
