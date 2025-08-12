"use client";

import React from "react";
import Link from "next/link";
import { useSupabaseAuth } from "@/components/providers/SupabaseProvider";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/libs/supabaseClient";
import LogoutButton from "@/components/LogoutButton";
import { usePathname } from "next/navigation";

async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

const Header = () => {
  const { session, loading } = useSupabaseAuth();
  const pathname = usePathname();
  const { data, isLoading } = useQuery({
    queryKey: ["profiles", session?.user?.id],
    queryFn: () => getProfile(session!.user.id),
    enabled: !!session?.user?.id,
  });

  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    return null;
  }

  return (
    <header className="w-full sticky top-0 z-50 bg-gray-100 shadow-md px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        <Link href="/">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#242424] cursor-pointer">
            نوبت۲۴
          </h1>
        </Link>

        {session?.user ? (
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {loading || isLoading ? (
              <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            ) : (
              <span className="text-gray-800 font-semibold text-lg whitespace-nowrap">
                {data?.full_name || "کاربر"}
              </span>
            )}
            <LogoutButton />
          </div>
        ) : (
          <div className="flex gap-3 w-full sm:w-auto justify-end">
            <Link
              href="/login"
              className="sm:flex-none text-center px-4 py-2 rounded border border-blue-600 text-blue-700 hover:bg-blue-700 hover:text-white transition-colors duration-200"
            >
              ورود
            </Link>
            <Link
              href="/register"
              className="sm:flex-none text-center px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
            >
              ثبت‌نام
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
