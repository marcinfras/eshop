import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { deleteCartCookie } from "../../../lib/actions/deleteCartCookie";

export const AccountNavIcon = () => {
  const { data } = useSession();

  const logoutHander = () => {
    deleteCartCookie();

    signOut({ callbackUrl: "/login" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            {/* <AvatarImage src="/placeholder-user.jpg" /> */}
            <AvatarFallback>
              {data?.user?.name ? data.user.name[0].toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <div className="px-4 py-2">
          <p className="text-sm font-medium leading-none">{data?.user?.name}</p>
          <p className="text-xs text-muted-foreground">{data?.user?.email}</p>
        </div>
        <DropdownMenuSeparator />
        <Link href="/account" className="cursor-pointer">
          <DropdownMenuItem className="cursor-pointer">
            <span>Account</span>
            <span className="ml-auto text-xs">⇧⌘P</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link href="/account/orders" className="cursor-pointer">
          <DropdownMenuItem className="cursor-pointer">
            <span>Orders</span>
            <span className="ml-auto text-xs">⇧⌘P</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logoutHander} className="cursor-pointer">
          <span>Log out</span>
          <span className="ml-auto text-xs">⇧⌘Q</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
