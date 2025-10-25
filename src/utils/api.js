const BASE_URL = "https://world.openfoodfacts.org";
// src/utils/api.js

// const BASE_URL = "https://world.openfoodfacts.org";

// Default product list
export const fetchProducts = async (page = 1) => {
  try {
    const res = await fetch(
      `${BASE_URL}/cgi/search.pl?action=process&json=true&page=${page}&page_size=20`
    );
    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// ✅ Search products by name
export const searchProductsByName = async (query,page=1) => {
  try {
    const res = await fetch(
      `${BASE_URL}/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=true&page_size=20&page=${page}`
    );
    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};

export const getProductByBarcode = async (barcode) => {
  try {
    const res = await fetch(`${BASE_URL}/api/v0/product/${barcode}.json`);
    const data = await res.json();
    return data.product || null;
  } catch (error) {
    console.error("Error fetching product by barcode:", error);
    return null;
  }
};

export const fetchCategories = async () => {
  try {
    const res = await fetch(`${BASE_URL}/categories.json`);
    const data = await res.json();
    return data.tags?.slice(0, 20) || []; // limit to top 20 categories for performance
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// ✅ Fetch products by category
export const fetchProductsByCategory = async (category,page=1) => {
  try {
    const res = await fetch(`${BASE_URL}/category/${category}/${page}.json`);
    const data = await res.json();
    return data.products||[];
  } catch (error) {
    console.error("Error fetching category products:", error);
    return [];
  }
};
