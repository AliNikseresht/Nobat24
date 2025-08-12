import { Search } from "lucide-react";
import React from "react";

const SearchBox = () => {
  return (
    <div className="bg-white rounded-lg flex items-center gap-2 p-2 border border-gray-300 shadow-md w-full max-w-full">
      <Search className="w-5 h-5 text-gray-500 flex-shrink-0" />
      <input
        type="text"
        placeholder="جستجوی خدمات، متخصص یا کسب و کار..."
        className="flex-grow p-2 rounded-lg outline-none text-sm text-gray-700 placeholder-gray-400"
        aria-label="جستجو"
      />
    </div>
  );
};

export default SearchBox;
