import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "./_components/ui/toaster";
import { ClientContext } from "./_components/contexts/ClientContext/ClientContext";
import { MainNav } from "./_components/MainNav";
import { LoaderProvider } from "./_components/contexts/LoaderContext.tsx/LoaderContext";

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
  return (
    <ClientContext>
      <html lang="en">
        <body className={inter.className}>
          <LoaderProvider>
            <MainNav />
            {children}
            <Toaster />
            <div id="searchModal" />
          </LoaderProvider>
        </body>
      </html>
    </ClientContext>
  );
}
