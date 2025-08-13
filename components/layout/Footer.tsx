"use client";

import {
  Calendar,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Twitter,
} from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    return null;
  }

  return (
    <footer className="bg-indigo-950 text-white py-5 w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 ">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="size-8 text-primary" />
              <span className="text-xl">نوبت۲۴</span>
            </div>
            <p className="text-gray-400">
              راه حل هوشمند برای نوبت‌گیری آنلاین از انواع خدمات
            </p>
            <div className="flex gap-4">
              <Instagram className="size-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="size-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3>خدمات</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">
                آرایشگری زنانه
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                آرایشگری مردانه
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                کافه و رستوران
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                خدمات خانه
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                تعمیرات
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3>پشتیبانی</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">
                راهنمای استفاده
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                سوالات متداول
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                قوانین و مقررات
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                حریم خصوصی
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3>تماس با ما</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="size-4" />
                <span>011-12345678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-4" />
                <span>info@nobat24.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-4" />
                <span>مازندران، آمل</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-600 my-2"></div>
        <div className="pt-4 text-center text-gray-400">
          <p>&copy; نوبت۲۴. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}
