"use client";
import AuthForm from "@/components/AuthForm";
import { signUp } from "@/lib/actions/auth";
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
        onSubmit={signUp}
      />
    </div>
  );
}

export default page;
