import React, { useEffect, useState } from "react";
import api from "../services/api";

const Home = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get("/product/all-products");
        setProducts(response.data.products || []);
      } catch (err) {
        console.error("Fetch products error:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 text-lg font-medium">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white border border-red-200 text-red-600 px-6 py-4 rounded-xl shadow-sm text-center">
          <p className="font-semibold text-lg mb-1">Oops!</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = async (productId) => {
    try {
      const response = await api.post("/cart/add", { productId });

      alert(response.data.message || "Item Added Successfully!!");
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Please login to add items to cart");
      } else {
        alert(err.response?.data?.message || "Failed to add product to cart.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fresh Products</h1>
            <p className="text-sm text-gray-500 mt-1">
              Explore our wide variety of top-quality items
            </p>
          </div>
          <span className="mt-2 sm:mt-0 text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full w-fit">
            {products.length} Products
          </span>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center max-w-md mx-auto mt-12">
            <div className="text-5xl mb-4">🛒</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No Products Available
            </h3>
            <p className="text-gray-500 text-sm">
              Check back later for new arrivals!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id || product.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden border border-gray-100 group"
              >
                <div className="w-full h-52 bg-gray-100 overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1 group-hover:text-green-600 transition-colors">
                      {product.name}
                    </h2>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {product.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
                    <button
                    onClick={()=> handleAddToCart(product._id)}
                      type="button"
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 active:scale-95 text-white text-sm font-semibold rounded-lg shadow-sm transition-all duration-200 cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
