import z from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(2, "نام کامل باید حداقل ۲ کاراکتر باشد"),
  email: z.string().email("ایمیل معتبر نیست"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
  phone: z
    .string()
    .min(10, "شماره تلفن باید حداقل ۱۰ رقم باشد")
    .max(15, "شماره تلفن نمی‌تواند بیشتر از ۱۵ رقم باشد"),
  role: z.enum(["customer", "owner"], {
    message: "نقش کاربر الزامی است",
  }),
});