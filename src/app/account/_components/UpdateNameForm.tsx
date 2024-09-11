"use client";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import { nameSchema } from "../schemas";
import { toast } from "@/app/_components/ui/use-toast";
import { updateNameAction } from "../../../../lib/actions/updateName";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Button } from "@/app/_components/ui/button";

type ChangeNameFormInput = {
  name: string;
};

export const UpdateNameForm = () => {
  const { data, update } = useSession();

  const form = useForm<ChangeNameFormInput>({
    resolver: yupResolver(nameSchema),
    defaultValues: {
      name: data?.user?.name as string,
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = handleSubmit(async ({ name }) => {
    console.log(name);
    if (!data?.user?.email) {
      toast({
        variant: "destructive",
        title: "Failed to update your name",
      });
      return;
    }
    update({ name });
    const res = await updateNameAction({
      name,
      email: data?.user?.email,
    });

    if ("error" in res) {
      toast({
        variant: "destructive",
        title: res.error,
      });
    }
    console.log(res);
  });

  return (
    <section>
      <h2 className="text-2xl font-bold">Account Settings</h2>
      <Form {...form}>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="first-letter:uppercase" />
              </FormItem>
            )}
          />
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input value={data?.user?.email || ""} disabled />
          </div>
          <Button className="w-full">Update Profile</Button>
        </form>
      </Form>
    </section>
  );
};
