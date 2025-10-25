import React from "react";

const SortOptions = ({ onSortChange }) => {
  const handleChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="flex justify-center sm:justify-start mb-6">
      <select
        onChange={handleChange}
        className="border border-green-600 rounded-md px-3 py-2 outline-none bg-white text-green-700 font-medium"
      >
        <option value="">Sort By</option>
        <option value="name-asc">Name (A - Z)</option>
        <option value="name-desc">Name (Z - A)</option>
        <option value="grade-asc">Nutrition Grade (A → E)</option>
        <option value="grade-desc">Nutrition Grade (E → A)</option>
      </select>
    </div>
  );
};

export default SortOptions;
