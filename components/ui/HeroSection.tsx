import SearchBox from "./SearchBox";
import { features } from "@/data/fetauresData";

export function HeroSection() {
  return (
    <section className="bg-indigo-50 py-7 md:py-14 px-2 flex flex-col items-center gap-7">
      <div className="w-full flex flex-col justify-center items-center gap-5">
        {/* Main Heading */}
        <h1 className="text-3xl md:text-4xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-bold">
          نوبت‌گیری آنلاین
        </h1>

        <p className="text-xs md:text-base text-muted-foreground text-center text-gray-800">
          به راحتی از خدمات مورد نظرتان نوبت بگیرید. از آرایشگری تا رستوران، همه
          چیز در یک مکان!
        </p>

        {/* Features */}
        <div className="flex justify-center gap-2 md:gap-6 text-gray-800 text-[11px] md:text-base">
          {features.map((feature) => (
            <div key={feature.id} className="flex items-center gap-3">
              <div
                className={`relative size-10 sm:size-11 rounded-xl ${feature.bgColor} grid place-items-center`}
              >
                <div className="absolute inset-0 rounded-xl opacity-10" />
                {feature.icon}
              </div>
              <span>{feature.label}</span>
            </div>
          ))}
        </div>
      </div>

      <SearchBox />
    </section>
  );
}
