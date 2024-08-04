"use client";

import { getSession, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { updateNameAction } from "../../../lib/actions/updateName";
import { toast } from "./ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { nameSchema } from "../account/schemas";

type ChangeNameFormInput = {
  name: string;
};

export const AccountPage = () => {
  const { data, update } = useSession();

  const form = useForm<ChangeNameFormInput>({
    resolver: yupResolver(nameSchema),
    defaultValues: {
      name: data?.user?.name as string,
    },
  });

  const { handleSubmit, control } = form;

  const onNameSubmit = handleSubmit(async ({ name }) => {
    console.log(name);
    update({ name });
    const res = await updateNameAction({
      name,
      email: data?.user?.email as string,
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
    <>
      <header className="bg-muted py-6 px-4 md:px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              {/* <AvatarImage src="/placeholder-user.jpg" /> */}
              <AvatarFallback>
                {data?.user?.name ? data.user.name[0].toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold">{data?.user?.name}</h1>
              <p className="text-muted-foreground">{data?.user?.email}</p>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="container mx-auto max-w-xl space-y-8">
          <section>
            <h2 className="text-2xl font-bold">Account Settings</h2>
            <Form {...form}>
              <form className="mt-6 space-y-4" onSubmit={onNameSubmit}>
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

                {/* <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    defaultValue={data?.user?.name || ""}
                  />
                </div> */}
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input value={data?.user?.email || ""} disabled />
                </div>
                <Button className="w-full">Update Profile</Button>
              </form>
            </Form>
          </section>
          <Separator />
          <section>
            <h2 className="text-2xl font-bold">Security</h2>
            <div className="mt-6 space-y-4">
              <div className="space-y-1">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button className="w-full">Change Password</Button>
            </div>
          </section>
          <Separator />
          <section>
            <Button
              onClick={() => signOut({ callbackUrl: "/login" })}
              variant="destructive"
              className="w-full"
            >
              Logout
            </Button>
          </section>
        </div>
      </main>
    </>
  );
};
