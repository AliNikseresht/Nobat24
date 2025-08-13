"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "react-use";
import { fetchBusinesses } from "@/services/fetchBusinesses";

interface Business {
  id: string;
  name: string;
  description: string;
  image_url: string;
  category: { name: string };
  owner: { full_name: string };
}

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce query 300ms
  useDebounce(() => setDebouncedQuery(query), 300, [query]);

  const { data: results = [], isLoading, isError } = useQuery({
    queryKey: ["searchBusinesses", debouncedQuery],
    queryFn: () => fetchBusinesses(debouncedQuery),
    enabled: !!debouncedQuery,
  });

  const handleClick = (business: Business) => {
    console.log("Open modal for:", business);
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white rounded-lg flex items-center gap-2 p-2 border border-gray-300 shadow-md">
        <Search className="w-5 h-5 text-gray-500 flex-shrink-0" />
        <input
          type="text"
          placeholder="جستجوی خدمات، متخصص یا کسب و کار..."
          className="flex-grow p-2 rounded-lg outline-none text-xs md:text-sm text-gray-700 placeholder-gray-400"
          aria-label="جستجو"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {isLoading && <p className="mt-2 text-sm text-gray-500">در حال جستجو...</p>}
      {isError && <p className="mt-2 text-sm text-red-500">خطا در دریافت نتایج</p>}

      {!isLoading && !isError && debouncedQuery && results.length === 0 && (
        <p className="mt-2 p-2 text-sm text-gray-500 bg-white rounded-lg border border-gray-300 shadow-md">
          نتیجه‌ای یافت نشد
        </p>
      )}

      {results.length > 0 && (
        <div className="bg-white mt-2 rounded-lg shadow-md border border-gray-300 max-h-60 overflow-y-auto">
          {results.map((b: Business) => (
            <div
              key={b.id}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleClick(b)}
            >
              <div className="flex items-center gap-2">
                <img src={b.image_url} className="w-10 h-10 rounded-md" />
                <div>
                  <p className="text-sm font-semibold">{b.name}</p>
                  <p className="text-xs text-gray-500">
                    {b.owner.full_name} - {b.category.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
