import SearchBox from "@/components/ui/SearchBox";
import TopSection from "@/components/ui/TopSection";
import {
  Coffee,
  Heart,
  Scissors,
  MessageCircleHeart,
  Dumbbell,
  Utensils,
  Wrench,
} from "lucide-react";
import Image from "next/image";

const categoryColors = [
  "bg-red-200 text-red-800",
  "bg-green-200 text-green-800",
  "bg-blue-200 text-blue-800",
  "bg-yellow-200 text-yellow-800",
  "bg-pink-200 text-pink-800",
  "bg-purple-200 text-purple-800",
  "bg-indigo-200 text-indigo-800",
];

const categories = [
  { name: "رستوران", icon: Utensils },
  { name: "کافه", icon: Coffee },
  { name: "آرایشگاه", icon: Scissors },
  { name: "ورزشی", icon: Dumbbell },
  { name: "سلامت و زیبایی", icon: Heart },
  { name: "خدمات خانگی", icon: Wrench },
  { name: "مشاوره", icon: MessageCircleHeart },
];

const featuredBusinesses = [
  {
    name: "کافه آرام",
    imageUrl: "/images/cafe-aram.jpg",
    todayAppointments: 5,
    specialty: "کافه و قهوه",
  },
  {
    name: "رستوران شب",
    imageUrl: "/images/restaurant-shab.jpg",
    todayAppointments: 8,
    specialty: "رستوران ایرانی",
  },
  {
    name: "باشگاه انرژی",
    imageUrl: "/images/gym-energy.jpg",
    todayAppointments: 3,
    specialty: "باشگاه ورزشی",
  },
  {
    name: "کلینیک مهر",
    imageUrl: "/images/clinic-mehr.jpg",
    todayAppointments: 6,
    specialty: "کلینیک زیبایی",
  },
];

const popularServices = [
  { name: "خدمات آرایشگری", icon: Scissors, price: "از ۱۵۰ هزار تومان" },
  { name: "مشاوره سلامت", icon: Heart, price: "از ۲۰۰ هزار تومان" },
  { name: "تعمیرات خانگی", icon: Wrench, price: "از ۱۰۰ هزار تومان" },
  { name: "کلاس‌های ورزشی", icon: Dumbbell, price: "از ۵۰ هزار تومان" },
];

export default function HomePage() {
  return (
    <div className="p-3 w-full max-w-5xl mx-auto flex flex-col gap-4">
      <TopSection />
      <SearchBox />

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="font-semibold mb-2">دسته‌بندی‌ها</h2>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {categories.map(({ name, icon: Icon }, i) => (
            <div
              key={name}
              className={`min-w-[100px] flex items-center gap-2 p-3 rounded-lg cursor-pointer hover:opacity-90 transition-opacity duration-200 ${
                categoryColors[i % categoryColors.length]
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-base font-medium">{name}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-semibold mb-2">کسب‌وکارهای ویژه</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featuredBusinesses.map(
            ({ name, imageUrl, todayAppointments, specialty }) => (
              <div
                key={name}
                className="border border-gray-300 rounded-lg p-4 bg-white hover:shadow-lg cursor-pointer transition-shadow duration-300 flex flex-col"
              >
                <Image
                  src={imageUrl}
                  alt={name}
                  className="h-28 w-full object-cover rounded mb-3"
                  priority
                />
                <h3 className="text-lg font-semibold mb-1">{name}</h3>
                <p className="text-sm text-gray-600 mb-1">تخصص: {specialty}</p>
                <p className="text-sm text-gray-600 mb-4">
                  نوبت‌های امروز:{" "}
                  <span className="font-semibold">{todayAppointments}</span>
                </p>
                <button className="mt-auto bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors duration-200">
                  نوبت بگیر
                </button>
              </div>
            )
          )}
        </div>
      </div>

      <div>
        <h2 className="font-semibold mb-2">خدمات پرطرفدار</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {popularServices.map(({ name, icon: Icon, price }) => (
            <div
              key={name}
              className="border-2 border-blue-400 rounded-lg p-4 bg-blue-50 cursor-pointer hover:bg-blue-100 transition-colors duration-300 flex items-center gap-3"
            >
              <Icon className="w-7 h-7 text-blue-700 flex-shrink-0" />
              <div>
                <p className="text-base font-medium text-blue-700">{name}</p>
                <p className="text-sm text-blue-600">{price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

