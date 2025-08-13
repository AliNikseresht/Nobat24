"use client";

import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

interface Business {
  id: string;
  name: string;
  description: string;
  image_url: string;
  category: { name: string };
  owner: { full_name: string };
}

const fetchBusinessesPage = async ({
  pageParam = 0,
}): Promise<{ data: Business[]; nextPage: number | null }> => {
  const pageSize = 20;

  const allBusinesses: Business[] = Array.from({ length: 130 }).map((_, i) => ({
    id: (i + 1).toString(),
    name: `خدمت شماره ${i + 1}`,
    description: `توضیحات خدمت شماره ${i + 1}`,
    image_url: `https://picsum.photos/seed/${i + 1}/100/100`,
    category: { name: `دسته ${(i % 5) + 1}` },
    owner: { full_name: `صاحب کسب‌وکار ${(i % 10) + 1}` },
  }));

  const start = pageParam * pageSize;
  const end = start + pageSize;
  const pageData = allBusinesses.slice(start, end);
  const nextPage = end < allBusinesses.length ? pageParam + 1 : null;

  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: pageData, nextPage }), 500)
  );
};

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
    queryFn: fetchBusinessesPage,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });

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
              <button className="absolute bottom-2 left-2 px-2 py-0.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 duration-200 gap-2 cursor-pointer">نوبت بگیر</button>
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
    </section>
  );
};

export default ServicesList;
