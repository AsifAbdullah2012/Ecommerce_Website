import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="flex items-center w-full max-w-xl bg-white rounded-lg shadow-md overflow-hidden"
    >
      <input
        type="text"
        placeholder="Search Amazon ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 focus:outline-none"
      />
      <button
        type="submit"
        className="p-3 text-gray-600 hover:text-gray-800"
        aria-label="Search"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;
