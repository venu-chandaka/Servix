import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

// 1. Import the Toaster from sonner
import { Toaster } from "sonner";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "FixFlow AI",
  description: "AI Powered Home Intelligence Platform",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="bg-white text-black antialiased">
        {children}
        
        {/* 2. Add the Toaster here so notifications show up */}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}