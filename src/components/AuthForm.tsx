"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { z, ZodType } from "zod";
import {
  Form,
  FormControl,

  //   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  //   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "../../constants";
import ImageUpload from "./ImageUpload";
interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP ";
}
const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const form: UseFormReturn<T> = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });
  const isForSignIn = type === "SIGN_IN";
  console.log(defaultValues);
  return (
    <Form {...form}>
      <div className="flex flex-col gap-4">
        <p className="text-2xl text-white font-semibold">
          {isForSignIn
            ? "Welcome Back to the BookWise"
            : "Create Your Library Account"}
        </p>
        <p className="text-md text-light-500 ">
          {isForSignIn
            ? "Access the vast collection of resources, and stay updated"
            : "Please complete all fields and upload a valid university ID to gain access to the library"}
        </p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {Object.keys(defaultValues).map((feild) => (
            <FormField
              key={feild}
              control={form.control}
              name={feild as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[feild as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {feild === "universityCard" ? (
                      <ImageUpload onFileChange={field.onChange} />
                    ) : (
                      <Input
                        required={true}
                        type={FIELD_TYPES[feild as keyof typeof FIELD_TYPES]}
                        {...field}
                        className="form-input"
                      />
                    )}
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            className="py-6 w-full text-lg text-dark-100 font-bold"
            type="submit"
          >
            {isForSignIn ? "Login" : "Sign Up"}
          </Button>
        </form>

        <p className="text-lg text-light-100">
          {isForSignIn
            ? "Don’t have an account already? "
            : "Have an account already? "}
          <Link
            href={isForSignIn ? "/sign-up" : "sign-in"}
            className="font-semibold text-primary"
          >
            {isForSignIn ? "Register here" : "Login"}
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default AuthForm;
