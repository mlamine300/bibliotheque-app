import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

async function layout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (session?.user) redirect("/");
  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row gap-3">
            <Image src="/icons/logo.svg" alt="logo" width={50} height={50} />
            <h1 className="text-white text-4xl font-semibold px-4">BookWise</h1>
          </div>
          <div>{children}</div>
        </div>
      </section>
      <section className="auth-illustration">
        <Image
          src="/images/auth-illustration.png"
          alt="auth-illustration"
          width={1000}
          height={1000}
          className="object-cover size-full"
        />
      </section>
    </main>
  );
}

export default layout;
