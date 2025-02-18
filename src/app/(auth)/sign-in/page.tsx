"use client";
import AuthForm from "@/components/AuthForm";
import { signInWithCredenetials } from "@/lib/actions/auth";
import { signInSchema } from "@/lib/validation";
import React from "react";

function page() {
  return (
    <div>
      <AuthForm
        defaultValues={{
          email: "",

          password: "",
        }}
        schema={signInSchema}
        type="SIGN_IN"
        onSubmit={signInWithCredenetials}
      />
    </div>
  );
}

export default page;
