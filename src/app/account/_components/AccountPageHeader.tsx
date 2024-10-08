"use client";

import { Avatar, AvatarFallback } from "@/app/_components/ui/avatar";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";

export const AccountPageHeader = () => {
  const { data, status } = useSession();

  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/login");
  }

  return (
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
  );
};
