"use client";
import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validation";
import React from "react";

function page() {
  return (
    <div>
      <AuthForm
        defaultValues={{
          fullName: "",
          email: "",
          universityId: 0,
          password: "",
          universityCard: "",
        }}
        schema={signUpSchema}
        type="SIGN_UP "
        onSubmit={() => {
          console.log("");
        }}
      />
    </div>
  );
}

export default page;
