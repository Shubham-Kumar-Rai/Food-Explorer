import React, { useState } from "react";
import logo from "../assets/food-logo.jpg";

const Navbar = ({ onSearch, onBarcodeSearch }) => {
  const [query, setQuery] = useState("");
  const [barcode, setBarcode] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  const handleBarcodeSubmit = (e) => {
    e.preventDefault();
    if (barcode.trim()) onBarcodeSearch(barcode);
  };

  return (
    <div className="w-full h-27 bg-green-600 text-white px-6 py-4 flex flex-col sm:flex-row items-center justify-between shadow-md gap-3 sm:gap-0">
      
      <div className="flex items-center gap-2">
        <img
          src={logo}
          alt="Logo"
          className="w-26 h-26 bg-white object-contain rounded-full border border-white"
        />
        <h1 className="m-5 text-2xl font-bold tracking-wide">Food Explorer</h1>
      </div>

      {/* Search by Name */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center border border-white rounded-md overflow-hidden"
      >
        <input
          type="text"
          placeholder="Search food..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-3 py-2 text-black outline-none w-40 sm:w-56"
        />
        <button
          type="submit"
          className="bg-white text-green-600 px-4 py-2 font-semibold hover:bg-gray-100"
        >
          Search
        </button>
      </form>

      {/* Search by Barcode */}
      <form
        onSubmit={handleBarcodeSubmit}
        className="flex items-center border border-white rounded-md overflow-hidden"
      >
        <input
          type="text"
          placeholder="Barcode..."
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          className="px-3 py-2 text-black outline-none w-32 sm:w-40"
        />
        <button
          type="submit"
          className="bg-white text-green-600 px-4 py-2 font-semibold hover:bg-gray-100"
        >
          Go
        </button>
      </form>
    </div>
  );
};

export default Navbar;
