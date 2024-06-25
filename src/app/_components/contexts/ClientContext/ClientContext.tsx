"use client";

import { SessionProvider } from "next-auth/react";

export const ClientContext = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
