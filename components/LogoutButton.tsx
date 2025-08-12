"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/libs/supabaseClient";
import toast from "react-hot-toast";
import { useState } from "react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("خطا در خروج");
      setLoading(false);
    } else {
      toast.success("خروج موفقیت‌آمیز بود");
      router.refresh();
    }
  };

  return (
    <button
      disabled={loading}
      onClick={handleLogout}
      className="bg-red-600 text-white p-1.5 rounded hover:bg-red-700 flex items-center justify-center duration-200 cursor-pointer"
    >
      {loading ? (
        <div className="loading loading-spinner w-6 h-6"></div>
      ) : (
        <>
          <LogOut size={18} className="rotate-180" />
        </>
      )}
    </button>
  );
}
