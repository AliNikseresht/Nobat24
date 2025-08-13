import z from "zod";

export const bookingSchema = z.object({
  fullName: z.string().min(3, "نام کامل باید حداقل ۳ کاراکتر باشد"),
  phone: z.string().min(8, "شماره موبایل معتبر نیست"),
  date: z.string().min(1, "تاریخ را وارد کنید"),
  time: z.string().min(1, "ساعت را وارد کنید"),
  notes: z.string().optional(),
});
