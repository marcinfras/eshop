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
import { useState } from "react";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { LoadingButton } from "./LoadingButton";

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

  const [isLogging, setIsLogging] = useState(false);

  const router = useRouter();

  // const path = usePathname();
  // console.log(path);

  const { handleSubmit, control } = form;

  const onSubmit = handleSubmit(async (data) => {
    setIsLogging(true);

    const res = await signIn("credentials", { ...data, redirect: false });
    console.log(res);
    if (res?.ok) {
      toast({
        title: "Successfully logged in",
        duration: 3000,
      });
      router.push("/");
    }
    if (!res?.ok) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Wrong email or password",
      });
    }

    setIsLogging(false);
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
        {!isLogging && (
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        )}
        {isLogging && (
          <LoadingButton className="w-full">Signing in</LoadingButton>
        )}
        {/* <Button type="submit" className="w-full">
          Sign in
        </Button> */}
      </form>
    </Form>
  );
};
