"use client";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { useSession } from "next-auth/react";

import { useState } from "react";
import { changePasswordSchema } from "../schemas";
import { toast } from "@/app/_components/ui/use-toast";
import { updatePasswordAction } from "../../../../lib/actions/updatePassword";
import { Loader } from "@/app/_components/Loader";
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

type ChangePasswordFormInput = {
  password: string;
  confirmPassword: string;
};

export const UpdatePasswordForm = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const { data } = useSession();

  const passwordForm = useForm<ChangePasswordFormInput>({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit, control, reset } = passwordForm;

  const onSubmit = handleSubmit(async ({ password }) => {
    setIsUpdating(true);
    if (!data?.user?.email) {
      toast({
        variant: "destructive",
        title: "Failed to update your name",
      });
      setIsUpdating(false);
      return;
    }

    const res = await updatePasswordAction({
      password,
      email: data?.user?.email,
    });

    if ("error" in res) {
      toast({
        variant: "destructive",
        title: res.error,
      });
      setIsUpdating(false);
    }

    setIsUpdating(false);

    toast({
      title: "Password changed successfully!",
      duration: 3000,
    });

    reset();
    console.log(res);
  });

  return (
    <section>
      {isUpdating && <Loader />}
      <h2 className="text-2xl font-bold">Security</h2>
      <Form {...passwordForm}>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage className="first-letter:uppercase" />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage className="first-letter:uppercase" />
              </FormItem>
            )}
          />
          <Button className="w-full">Change Password</Button>
        </form>
      </Form>
    </section>
  );
};
