"use client";

import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAllBusinesses } from "@/services/fetchAllBusinesses";
import { Business } from "@/types/businessType";
import BookingModal from "./BookingModal";

const ServicesList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["allBusinesses"],
    queryFn: fetchAllBusinesses,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookingClick = (business: Business) => {
    setSelectedBusiness(business);
    setIsModalOpen(true);
  };

  const handleClick = (business: Business) => {
    console.log("Open modal for:", business);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full">
        <p className="text-gray-500">در حال بارگذاری خدمات...</p>
      </div>
    );
  if (isError) return <p className="text-red-500">خطا در دریافت خدمات</p>;

  return (
    <section className="bg-white flex justify-center items-center flex-col gap-4 p-3 md:px-0 md:py-6 w-full">
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {data?.pages.map((page) =>
          page.data.map((b) => (
            <div
              key={b.id}
              className="relative flex items-center gap-2 p-2 border border-gray-300 rounded-lg shadow-md cursor-pointer hover:bg-gray-50 justify-between"
              onClick={() => handleClick(b)}
            >
              <div className="flex items-center gap-2 p-2">
                <img
                  src={b.image_url}
                  alt={b.name}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                  <p className="text-sm font-semibold">{b.name}</p>
                  <p className="text-xs text-gray-500">{b.category.name}</p>
                  <p className="text-xs text-gray-400">{b.owner.full_name}</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleBookingClick(b);
                }}
                className="absolute bottom-2 left-2 px-2 py-0.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 duration-200 gap-2 cursor-pointer"
              >
                نوبت بگیر
              </button>
            </div>
          ))
        )}
      </div>
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="w-36 py-2 mt-2 bg-gray-900 text-white rounded-lg hover:bg-gray-600 duration-200 gap-2 cursor-pointer"
        >
          {isFetchingNextPage ? (
            <div className="loading loading-spinner"></div>
          ) : (
            "بارگذاری بیشتر"
          )}
        </button>
      )}
      <BookingModal
        business={selectedBusiness}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // user={loggedInUser}
      />
    </section>
  );
};

export default ServicesList;
