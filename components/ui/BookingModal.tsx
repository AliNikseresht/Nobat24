"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Business, UserProfile } from "@/types/businessType";
import { bookingSchema } from "@/utils/bookingSchema";
import toast from "react-hot-toast";

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingModalProps {
  business: Business | null;
  isOpen: boolean;
  onClose: () => void;
  user?: UserProfile;
}

const BookingModal: React.FC<BookingModalProps> = ({
  business,
  isOpen,
  onClose,
  user,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: user?.full_name || "",
      phone: user?.phone || "",
      date: "",
      time: "",
      notes: "",
    },
  });

  useEffect(() => {
    reset({
      fullName: user?.full_name || "",
      phone: user?.phone || "",
      date: "",
      time: "",
      notes: "",
    });
  }, [user, reset]);

  if (!isOpen || !business) return null;

  const onSubmit = (data: BookingFormData) => {
    toast.success(
      "در خواست شما به صاحب کسب و کار ارسال شد نتیجه از طریق پیامک به شما اطلاع داده میشود"
    );

    console.log({ business, ...data });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 left-3 text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-2">{business.name}</h2>
        <p className="text-xs text-gray-500 mb-4">{business.category.name}</p>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("fullName")}
            type="text"
            placeholder="نام کامل شما"
            className="border border-gray-300 rounded p-2 text-sm w-full"
          />
          {errors.fullName && (
            <p className="text-xs text-red-500">{errors.fullName.message}</p>
          )}

          <input
            {...register("phone")}
            type="tel"
            placeholder="شماره موبایل"
            className="border border-gray-300 rounded p-2 text-sm w-full"
          />
          {errors.phone && (
            <p className="text-xs text-red-500">{errors.phone.message}</p>
          )}

          <input
            {...register("date")}
            type="date"
            className="border border-gray-300 rounded p-2 text-sm w-full"
          />
          {errors.date && (
            <p className="text-xs text-red-500">{errors.date.message}</p>
          )}

          <input
            {...register("time")}
            type="time"
            className="border border-gray-300 rounded p-2 text-sm w-full"
          />
          {errors.time && (
            <p className="text-xs text-red-500">{errors.time.message}</p>
          )}

          <textarea
            {...register("notes")}
            placeholder="یادداشت (اختیاری)"
            className="border border-gray-300 rounded p-2 text-sm w-full resize-none"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 duration-200"
          >
            ثبت نوبت
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
