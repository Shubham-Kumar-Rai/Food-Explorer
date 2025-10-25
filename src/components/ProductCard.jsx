import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const getDisplayName = () => {
    if (product.product_name?.trim()) return product.product_name;
    if (product.brands) return `${product.brands} Product`;
    if (product.code) return `Product #${product.code}`;
    return "Unknown Product";
  };

  return (
    <div
  onClick={() => navigate(`/product/${product.code}`)}
  className="bg-linear-to-br from-green-50 to-green-100 rounded-lg shadow hover:shadow-xl transition-all duration-300 p-4 w-full sm:w-64 max-w-xs border border-transparent hover:border-green-500 cursor-pointer transform hover:scale-105"
>
  <img
    src={product.image_front_small_url || "https://via.placeholder.com/150"}
    alt={getDisplayName()}
    className="w-full h-40 sm:h-44 object-contain mb-3 rounded-md bg-white p-2"
  />
  <h3 className="font-semibold text-gray-800 truncate text-lg text-center sm:text-left">
    {getDisplayName()}
  </h3>
  <p className="text-sm text-gray-600 italic text-center sm:text-left">
    {product.categories || "Unknown Category"}
  </p>
  <p className="mt-2 text-gray-700 text-center sm:text-left">
    Nutrition Grade:{" "}
    <span className="font-semibold uppercase text-green-700">
      {product.nutrition_grades || "N/A"}
    </span>
  </p>
</div>
  );
};

export default ProductCard;
