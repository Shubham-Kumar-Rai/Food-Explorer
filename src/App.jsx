
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
  const navigate = useNavigate();

  const handleSearch = (query) => {
    setBarcodeProduct(null);
    setSearchQuery(query);
    navigate("/");
  };

  const handleBarcodeSearch = async (barcode) => {
    setSearchQuery("");
    setLoading(true);
    const product = await getProductByBarcode(barcode);
    setBarcodeProduct(product);
    setLoading(false);
    navigate("/barcode-result"); 
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSearch={handleSearch} onBarcodeSearch={handleBarcodeSearch} />

      {loading ? (
        <p className="text-center text-gray-600 mt-10">Loading product...</p>
      ) : (
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />

          <Route path="/product/:code" element={<ProductDetail />} />

          <Route
            path="/barcode-result"
            element={<ProductDetail product={barcodeProduct} />}
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
