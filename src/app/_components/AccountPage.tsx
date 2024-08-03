"use client";

import { getSession, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

export const AccountPage = async () => {
  const { data } = useSession();
  // const test = await getSession();

  // console.log(test);
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
            <div className="mt-6 space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" defaultValue="John Doe" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john@example.com"
                  disabled
                />
              </div>
              <Button className="w-full">Update Profile</Button>
            </div>
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
