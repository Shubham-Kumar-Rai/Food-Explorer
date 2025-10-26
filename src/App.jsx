
import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import { getProductByBarcode } from "./utils/api";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [barcodeProduct, setBarcodeProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleSearch = (query) => {
    setBarcodeProduct(null);
    setError("");
    setSearchQuery(query);
    navigate("/");
  };

  const handleBarcodeSearch = async (barcode) => {
    setSearchQuery("");
    setError("");
    setLoading(true);

    try {
      const product = await getProductByBarcode(barcode);

      if (!product || Object.keys(product).length === 0) {
        setError("No product found for this barcode.");
        setBarcodeProduct(null);
      } else {
        setBarcodeProduct(product);
      }
      navigate("/barcode-result");
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Something went wrong. Please try again.");
      setBarcodeProduct(null);
      navigate("/barcode-result");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSearch={handleSearch} onBarcodeSearch={handleBarcodeSearch} />

      {loading ? (
        <p className="text-center text-gray-600 mt-10">Loading product...</p>
      ) : (
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home searchQuery={searchQuery} />} />

          {/* Product Detail Page */}
          <Route path="/product/:code" element={<ProductDetail />} />

          {/* Barcode Search Result */}
          <Route
            path="/barcode-result"
            element={
              error ? (
                <div className="text-center mt-10">
                  <p className="bg-red-100 text-red-700 px-4 py-2 rounded-md inline-block font-medium shadow-sm">
                    {error}
                  </p>
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => navigate("/")}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                    >
                      Back to Home
                    </button>
                  </div>
                </div>
              ) : barcodeProduct ? (
                <ProductDetail product={barcodeProduct} />
              ) : (
                <p className="text-center text-gray-600 mt-10">
                  Enter a barcode to search for a product.
                </p>
              )
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
