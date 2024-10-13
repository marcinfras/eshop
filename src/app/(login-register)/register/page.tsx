import type { Metadata } from "next";
import { RegisterForm } from "../_components/RegisterForm";

export const metadata: Metadata = {
  title: "Registration",
  description: "Create an account to access ordering",
  openGraph: {
    title: "Registration",
    description: "Create an account to access ordering",
  },
};

const Page = () => {
  return <RegisterForm />;
};

export default Page;
