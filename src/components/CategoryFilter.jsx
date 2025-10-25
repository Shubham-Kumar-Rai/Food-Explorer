import React, { useEffect, useState } from "react";
import { fetchCategories } from "../utils/api";

const CategoryFilter = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  const handleChange = (e) => {
    const category = e.target.value;
    setSelected(category);
    onSelectCategory(category);
  };

  return (
    <div className="flex justify-center sm:justify-start mb-6">
      <select
        value={selected}
        onChange={handleChange}
        className="border border-green-600 rounded-md px-3 py-2 outline-none bg-white text-green-700 font-medium"
      >
        <option value="">Select Category</option>
        {categories.map((cat, idx) => (
          <option key={idx} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
