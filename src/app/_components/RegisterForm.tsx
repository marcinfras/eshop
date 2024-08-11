"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { registerSchema } from "../(login-register)/register/registerSchema";
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
import { createAccountAction } from "../../../lib/actions/createAccount";
import { toast } from "./ui/use-toast";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoadingButton } from "./LoadingButton";

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const form = useForm<RegisterFormInputs>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [isCreating, setIsCreating] = useState(false);

  const router = useRouter();

  const { handleSubmit, control } = form;

  const onSubmit = handleSubmit(async (data) => {
    setIsCreating(true);
    const createdAccount = await createAccountAction(data);
    if (createdAccount) {
      toast({
        title: "Your account has been created",
        description: "Now you can log in to it",
      });
      router.push("/login");
    }
    if (!createdAccount) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "An account with this email address already exists",
      });
    }

    setIsCreating(false);
  });

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={onSubmit}>
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage className="first-letter:uppercase" />
            </FormItem>
          )}
        />
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
        {!isCreating && (
          <Button type="submit" className="w-full">
            Create account
          </Button>
        )}
        {isCreating && (
          <LoadingButton className="w-full">Creating</LoadingButton>
        )}
      </form>
    </Form>
  );
};
