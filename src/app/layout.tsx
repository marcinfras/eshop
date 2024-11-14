import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "./_components/ui/toaster";
import { ClientContext } from "./_components/contexts/ClientContext/ClientContext";
import { MainNav } from "./_components/MainNav";
import { LoaderProvider } from "./_components/contexts/LoaderContext.tsx/LoaderContext";
import { NewsletterPopup } from "./_components/NewsletterPopup";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Eshop",
    default: "Eshop",
  },
  description: "Explore a wide range of products on Eshop.",
  openGraph: {
    title: {
      template: "%s | Eshop",
      default: "Eshop",
    },
    description: "Explore a wide range of products on Eshop.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const newsletter = cookies().get("newsletter");
  
  return (
    <ClientContext>
      <html lang="en">
        <body className={inter.className}>
          <LoaderProvider>
            <MainNav />
            {!newsletter?.value && <NewsletterPopup />}
            {children}
            <Toaster />
            <div id="searchModal" />
          </LoaderProvider>
        </body>
      </html>
    </ClientContext>
  );
}
