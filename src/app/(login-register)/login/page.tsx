import type { Metadata } from "next";
import { LoginForm } from "..//_components/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to your account to access ordering",
  openGraph: {
    title: "Login",
    description: "Log in to your account to access ordering",
  },
};

const Page = () => {
  return <LoginForm />;
};

export default Page;
