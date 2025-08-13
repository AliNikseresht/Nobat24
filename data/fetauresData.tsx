import { Feature } from "@/types/featureType";
import { Calendar, Clock, Star } from "lucide-react";

export const features: Feature[] = [
  {
    id: 1,
    label: "رزرو آسان",
    icon: <Calendar className="size-5 text-white drop-shadow bg-indigo-700 rounded-md p-1" />,
    bgColor: "bg-indigo-100",
    iconBgColor: "bg-indigo-700",
  },
  {
    id: 2,
    label: "انتخاب زمان دلخواه",
    icon: <Clock className="size-5 text-white drop-shadow bg-green-700 rounded-md p-1" />,
    bgColor: "bg-green-100",
    iconBgColor: "bg-green-700",
  },
  {
    id: 3,
    label: "بهترین کیفیت",
    icon: <Star className="size-5 text-white drop-shadow bg-yellow-700 rounded-md p-1" />,
    bgColor: "bg-yellow-100",
    iconBgColor: "bg-yellow-700",
  },
];