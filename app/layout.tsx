import type { Metadata } from "next";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { SupabaseProvider } from "@/components/providers/SupabaseProvider";
import localFont from "next/font/local";

import { Toaster } from "react-hot-toast";
import "./globals.css";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "نوبت ۲۴",
  description: "سیستم رزرو و نوبت‌دهی آنلاین",
  authors: [{ name: "نوبت ۲۴" }],
};

const vazirmatn = localFont({
  src: [
    {
      path: "../fonts/Vazirmatn-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Vazirmatn-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html dir="rtl" lang="fa" suppressHydrationWarning>
      <body
        className={`${vazirmatn.className} min-h-screen flex items-center flex-col`}
      >
        <ReactQueryProvider>
          <SupabaseProvider>
            <Header />
            <main className="w-full flex justify-center items-center">
              {children}
            </main>
            <Toaster position="top-center" reverseOrder={false} />
          </SupabaseProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
