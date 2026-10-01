import { forwardRef } from "react";

const SearchBar = forwardRef(function SearchBar({ value, onChange }, ref) {
  return (
    <input
      ref={ref}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by name, description or category..."
      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800"
    />
  );
});

export default SearchBar;