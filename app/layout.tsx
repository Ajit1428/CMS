import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";

import { ThemeProvider } from "@/components/theme-provider/theme-provider";
import { cn } from "@/lib/utils";
import { ToastProvider } from "@/provider/toast/toast-provider";
import { mongoDB } from "@/config/db/mongodb";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "K.B.L. Securities Limited & Kumari Bank Limited",
  description: "Collaborative CMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  mongoDB();
  return (
    <ClerkProvider
      publishableKey={process.env.CLERK_FRONTEND_API}
      appearance={{
        baseTheme: shadesOfPurple,
      }}
    >
      <html lang="en">
        <body className={cn("dark:bg-[#1e1e2e]", poppins.className)}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <ToastProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
