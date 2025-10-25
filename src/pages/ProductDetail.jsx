import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductByBarcode } from "../utils/api";

const ProductDetail = ({ product }) => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(product || null);
  const [loading, setLoading] = useState(!product);

  useEffect(() => {
    const loadProduct = async () => {
      if (code && !product) {
        const fetched = await getProductByBarcode(code);
        setData(fetched);
        setLoading(false);
      }
    };
    loadProduct();
  }, [code, product]);

  if (loading) {
    return <p className="text-center text-gray-600 mt-10">Loading product...</p>;
  }

  if (!data) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-600">No product found</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
  <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
    {/* Image + Info */}
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8">
      <img
        src={data.image_url || "https://via.placeholder.com/200"}
        alt={data.product_name}
        className="w-40 h-40 sm:w-48 sm:h-48 object-contain border rounded-md"
      />
      <div className="text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          {data.product_name || `Product #${data.code}`}
        </h2>
        <p className="text-gray-600 mb-1 text-sm sm:text-base">
          {data.brands || "Unknown"} • {data.categories || "N/A"}
        </p>
        <p className="text-gray-600 text-sm sm:text-base">
          Nutrition Grade:{" "}
          <span className="font-bold uppercase text-green-600">
            {data.nutrition_grades || "N/A"}
          </span>
        </p>
      </div>
    </div>

    {/* Ingredients and Nutrition */}
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
      <div>
        <h3 className="font-semibold mb-1 text-green-700">Ingredients</h3>
        <p className="text-sm sm:text-base">{data.ingredients_text || "No ingredients info"}</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1 text-green-700">Nutritional Values (per 100g)</h3>
        <ul className="text-sm sm:text-base">
          <li>Energy: {data.nutriments?.energy || "N/A"} kJ</li>
          <li>Fat: {data.nutriments?.fat || "N/A"} g</li>
          <li>Carbs: {data.nutriments?.carbohydrates || "N/A"} g</li>
          <li>Proteins: {data.nutriments?.proteins || "N/A"} g</li>
        </ul>
      </div>
    </div>

    {/* Labels */}
    {data.labels && (
      <p className="mt-4 text-center sm:text-left text-sm sm:text-base">
        <strong>Labels:</strong> {data.labels}
      </p>
    )}

    {/* Back Button */}
    <div className="flex justify-center mt-6">
      <button
        onClick={() => navigate(-1)}
        className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition text-sm sm:text-base"
      >
      Back
      </button>
    </div>
  </div>
</div>

  );
};

export default ProductDetail;
