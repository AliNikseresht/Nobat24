"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/libs/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { loginSchema } from "@/utils/loginSchema";

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (signInError) {
        toast.error(signInError.message);
        setLoading(false);
        return;
      }

      toast.success("ورود موفقیت‌آمیز بود.");
      router.push("/");
    } catch {
      toast.error("خطای غیرمنتظره‌ای رخ داده است.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full rounded-md bg-white p-6">
      <h1 className="text-2xl mb-4 text-center">ورود</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 text-sm text-[#242424]"
      >
        <input
          {...register("email")}
          placeholder="ایمیل"
          type="email"
          className="border border-gray-300 outline-none p-2 rounded text-right"
          disabled={loading}
        />
        {errors.email && (
          <p className="text-red-600 text-right">{errors.email.message}</p>
        )}

        <input
          {...register("password")}
          placeholder="رمز عبور"
          type="password"
          className="border border-gray-300 outline-none p-2 rounded text-right"
          disabled={loading}
        />
        {errors.password && (
          <p className="text-red-600 text-right">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer duration-200"
        >
          {loading ? "لطفا صبر کنید..." : "ورود"}
        </button>
        <p className="mt-4 text-center">
          حساب ندارید؟{" "}
          <Link href="/register" className="text-blue-600 underline">
            ثبت‌نام کنید
          </Link>
        </p>
      </form>
    </div>
  );
}
