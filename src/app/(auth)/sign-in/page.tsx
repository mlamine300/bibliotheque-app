"use client";
import AuthForm from "@/components/AuthForm";
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
        onSubmit={() => {
          console.log("");
        }}
      />
    </div>
  );
}

export default page;
