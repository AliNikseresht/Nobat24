"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/libs/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { registerSchema } from "@/utils/registerSchema";

type RegisterFormInputs = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    setLoading(true);
    try {
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });

      if (signUpError) {
        toast.error(signUpError.message);
        setLoading(false);
        return;
      }

      const userId = signUpData.user?.id;
      if (!userId) {
        toast.error("شناسه کاربر پیدا نشد.");
        setLoading(false);
        return;
      }

      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: userId,
          full_name: data.fullName,
          phone: data.phone,
          role: data.role,
        },
      ]);
      if (profileError) {
        toast.error(profileError.message);
        setLoading(false);
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (signInError) {
        toast.error(signInError.message);
        setLoading(false);
        return;
      }

      toast.success("ثبت‌نام با موفقیت انجام شد.");
      router.push("/");
    } catch {
      toast.error("خطای غیرمنتظره‌ای رخ داده است.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center rounded-md">
      <div className="max-w-md w-full rounded-md bg-white p-6">
        <h1 className="text-2xl mb-4 text-center">ثبت‌ نام</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 text-sm text-[#242424]"
        >
          <input
            {...register("fullName")}
            placeholder="نام کامل"
            className="border border-gray-300 outline-none p-2 rounded text-right"
            disabled={loading}
          />
          {errors.fullName && (
            <p className="text-red-600 text-right">{errors.fullName.message}</p>
          )}

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

          <input
            {...register("phone")}
            placeholder="شماره تلفن"
            type="tel"
            className="border border-gray-300 outline-none p-2 rounded text-right"
            disabled={loading}
          />
          {errors.phone && (
            <p className="text-red-600 text-right">{errors.phone.message}</p>
          )}

          <div className="flex flex-col text-right">
            <label className="mb-1.5 font-semibold">
              نقش خود را انتخاب کنید:
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                {...register("role")}
                type="radio"
                value="customer"
                defaultChecked
                disabled={loading}
              />
              مشتری
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                {...register("role")}
                type="radio"
                value="owner"
                disabled={loading}
              />
              صاحب کسب‌وکار
            </label>
            {errors.role && (
              <p className="text-red-600 text-right">{errors.role.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer duration-200"
          >
            {loading ? "لطفا صبر کنید..." : "ثبت‌ نام"}
          </button>

          <p className="mt-4 text-center">
            قبلاً ثبت‌نام کرده‌اید؟{" "}
            <Link href="/login" className="text-blue-600 underline">
              وارد شوید
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
