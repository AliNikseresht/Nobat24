import Image from "next/image";
import React from "react";
import topSectionImage from "@/public/photo-top-section.png";

const TopSection = () => {
  return (
    <div className="flex flex-col sm:flex-row w-full justify-between bg-white p-4 rounded-lg shadow-md gap-4 sm:gap-0">
      <div className="flex flex-col gap-1.5 flex-1">
        <h2 className="text-xl sm:text-2xl font-semibold">
          به نوبت۲۴ خوش آمدید
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          رزرو آنلاین نوبت، سریع و آسان برای تمام خدمات مورد نیاز شما
        </p>
      </div>
      <div className="flex-shrink-0 w-full sm:w-[180px] h-[180px] relative">
        <Image
          src={topSectionImage}
          alt="top section photo"
          fill
          sizes="(max-width: 640px) 100vw, 180px"
          className="object-contain rounded"
          priority
        />
      </div>
    </div>
  );
};

export default TopSection;
