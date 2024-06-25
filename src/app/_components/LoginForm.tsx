"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema } from "../(login-register)/login/loginSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { redirect, usePathname } from "next/navigation";
import { getAccountByEmail } from "../../../lib/graphql";
import { signIn, useSession } from "next-auth/react";

type LoginFormInputs = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const form = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const path = usePathname();
  // console.log(path);

  const { handleSubmit, control } = form;

  const onSubmit = handleSubmit(async (data) => {
    signIn("credentials", { ...data, redirect: true, callbackUrl: "/" });
  });

  const session = useSession();

  return (
    <Form {...form}>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <form className="space-y-4" onSubmit={onSubmit}>
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage className="first-letter:uppercase" />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage className="first-letter:uppercase" />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
    </Form>
  );
};
