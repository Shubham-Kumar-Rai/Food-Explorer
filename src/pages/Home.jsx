import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  searchProductsByName,
  fetchProductsByCategory,
} from "../utils/api";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import SortOptions from "../components/SortOptions";

const Home = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Reset when search or category changes
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [searchQuery, category]);

  // ✅ Fetch products
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      let data = [];

      if (searchQuery) {
        data = await searchProductsByName(searchQuery, page);
      } else if (category) {
        data = await fetchProductsByCategory(category, page);
      } else {
        data = await fetchProducts(page);
      }

      if (!data.length) setHasMore(false);

      // Append new data
      setProducts((prev) => {
        const newList = [...prev, ...data];
        return sortProducts(newList, sortOption); // ✅ sort entire combined list
      });

      setLoading(false);
    };

    loadData();
  }, [searchQuery, category, page]);

  // ✅ Re-sort products whenever sort option changes
  useEffect(() => {
    if (products.length > 0) {
      setProducts((prev) => sortProducts([...prev], sortOption));
    }
  }, [sortOption]);

  // ✅ Sorting logic
  const sortProducts = (data, sortType) => {
    if (!sortType) return data;

    const gradeOrder = { a: 1, b: 2, c: 3, d: 4, e: 5 };

    return [...data].sort((a, b) => {
      const nameA = (a.product_name || "").toLowerCase();
      const nameB = (b.product_name || "").toLowerCase();
      const gradeA = gradeOrder[a.nutrition_grades?.toLowerCase()] || 99;
      const gradeB = gradeOrder[b.nutrition_grades?.toLowerCase()] || 99;

      switch (sortType) {
        case "name-asc":
          return nameA.localeCompare(nameB);
        case "name-desc":
          return nameB.localeCompare(nameA);
        case "grade-asc":
          return gradeA - gradeB; // A → E
        case "grade-desc":
          return gradeB - gradeA; // E → A
        default:
          return 0;
      }
    });
  };

  // ✅ Load more pagination
  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="px-6 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-700 mb-3 sm:mb-0">
          {searchQuery
            ? `Results for "${searchQuery}" 🔍`
            : category
            ? `Category: ${category} 🍽️`
            : "Explore Food Products "}
        </h2>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 mb-4">
        <CategoryFilter onSelectCategory={setCategory} />
        <SortOptions onSortChange={setSortOption} />
      </div>

      {/* Products */}
      {products.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
          {products.map((p, idx) => (
            <ProductCard key={`${p.code || p.id}-${idx}`} product={p} />
          ))}
        </div>
      ) : (
        !loading && <p className="text-gray-500 text-center">No products found.</p>
      )}

      {/* Load More */}
      {hasMore && !loading && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Load More
          </button>
        </div>
      )}

      {/* Loader */}
      {loading && (
        <p className="text-center text-gray-500 mt-4">Loading products...</p>
      )}
    </div>
  );
};

export default Home;
