"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";

import { signIn } from "next-auth/react";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { loginSchema } from "../login/loginSchema";
import { toast } from "@/app/_components/ui/use-toast";
import { LoadingButton } from "@/app/_components/LoadingButton";

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

  const { handleSubmit, control } = form;

  const onSubmit = handleSubmit(async (data) => {
    setIsLogging(true);

    const res = await signIn("credentials", { ...data, redirect: false });

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

  return (
    <Form {...form}>
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
      </form>
    </Form>
  );
};
