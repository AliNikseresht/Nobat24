import CategoriesSection from "@/components/ui/CategoriesSection";
import { HeroSection } from "@/components/ui/HeroSection";
import ServicesList from "@/components/ui/ServicesList";

export default function HomePage() {
  return (
    <div className="w-full mx-auto flex flex-col">
      <HeroSection />
      <ServicesList />
      <CategoriesSection />
    </div>
  );
}
