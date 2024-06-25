"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";

export const LoginRegisterFormTemplate = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const path = usePathname();

  return (
    <div className="w-full max-w-md space-y-8">
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
        {path === "/login" ? "Sign in to your account" : "Create a new account"}
      </h2>
      <div className="rounded-lg bg-white p-8 shadow dark:bg-gray-900">
        <div className="mb-4 flex justify-center gap-4">
          <Link
            href="login"
            className={buttonVariants({
              variant: path === "/login" ? "default" : "outline",
            })}
          >
            Login
          </Link>
          <Link
            href="register"
            className={buttonVariants({
              variant: path === "/register" ? "default" : "outline",
            })}
          >
            Register
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
};

//https://v0.dev/r/gl6VD99Wth9
