import { Scissors, Coffee, Wrench, Home, Utensils } from "lucide-react";

const categories = [
  {
    name: "آرایشگری زنانه",
    icon: Scissors,
    desc: "خدمات کامل زیبایی برای بانوان",
    tags: ["کوتاهی مو", "رنگ مو", "میکاپ", "ابرو", "ناخن"],
    color: {
      iconBg: "bg-pink-500",
      iconTint: "bg-pink-100",
      badge: "bg-gray-900 text-white",
    },
    popular: true,
  },
  {
    name: "آرایشگری مردانه",
    icon: Scissors,
    desc: "خدمات اصلاح و زیبایی آقایان",
    tags: ["کوتاهی", "اصلاح صورت", "کراتین", "ماشین اصلاح", "شستن مو"],
    color: {
      iconBg: "bg-blue-500",
      iconTint: "bg-blue-100",
      badge: "bg-gray-900 text-white",
    },
    popular: true,
  },
  {
    name: "کافه",
    icon: Coffee,
    desc: "رزرو میز در بهترین کافه‌ها",
    tags: ["رزرو میز", "سفارش نوشیدنی", "کیک تولد", "مهمانی"],
    color: {
      iconBg: "bg-amber-500",
      iconTint: "bg-amber-100",
      badge: "bg-gray-900 text-white",
    },
    popular: true,
  },
  {
    name: "رستوران",
    icon: Utensils,
    desc: "رزرو میز در رستوران‌های محبوب",
    tags: ["رزرو میز", "منوی ویژه", "مهمانی", "غذای خانگی"],
    color: {
      iconBg: "bg-red-500",
      iconTint: "bg-red-100",
      badge: "bg-gray-900 text-white",
    },
    popular: true,
  },
  {
    name: "خدمات خانه",
    icon: Home,
    desc: "خدمات تمیزکاری و نگهداری منزل",
    tags: ["نظافت منزل", "نظافت راه‌پله", "بسته‌بندی", "خدمات حیوانات"],
    color: {
      iconBg: "bg-green-500",
      iconTint: "bg-green-100",
      badge: "bg-gray-900 text-white",
    },
    popular: true,
  },
  {
    name: "تعمیرات",
    icon: Wrench,
    desc: "تعمیر انواع لوازم خانگی و الکترونیکی",
    tags: [
      "نصب و راه‌اندازی",
      "تعمیر لوازم برقی",
      "سیستم‌های صوتی و تصویری",
      "تعمیر موبایل",
    ],
    color: {
      iconBg: "bg-violet-500",
      iconTint: "bg-violet-100",
      badge: "bg-gray-900 text-white",
    },
    popular: true,
  },
];

export default function CategoriesSection() {
  return (
    <section className="bg-indigo-50 rounded-xl shadow-md p-4 sm:p-6 flex justify-center">
      <div className="w-full max-w-6xl py-4 md:py-9">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">خدمات ما</h2>
          <p className="text-gray-500 mt-1 text-sm">
            از میان دسته‌های مختلف خدمات، آنچه که نیاز دارید را انتخاب کنید
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(
            ({ name, icon: Icon, desc, tags, color, popular }) => (
              <article
                key={name}
                className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 transition-all hover:shadow-lg cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`relative size-10 sm:size-11 rounded-xl ${color.iconTint} grid place-items-center`}
                    >
                      <div
                        className={`absolute inset-0 rounded-xl opacity-10`}
                      />
                      <Icon
                        className={`size-5 text-white drop-shadow ${color.iconBg} rounded-md p-1`}
                      />
                    </div>
                    <h3 className="font-semibold text-base sm:text-lg">
                      {name}
                    </h3>
                  </div>

                  {popular && (
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${color.badge}`}
                    >
                      محبوب
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 mt-3">{desc}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}
