import React, { useEffect, useState } from "react";
import api from "../services/api";

const Cart = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const fetchCartData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get("/cart");

        setCartData(response.data.items || []);
      } catch (error) {
        console.error("Fetch cart error:", err);
        setError(
          err.response?.status === 401
            ? "Please log in to view your cart."
            : "Failed to load your cart.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await api.delete("/cart/remove", {
        data: { productId },
      });

      setCartData((currentItems) =>
        currentItems.filter((item) => item.product?._id !== productId),
      );
    } catch (err) {
      console.error("Remove product error:", err);
      alert(err.response?.data?.message || "Failed to remove product.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading your cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="bg-red-50 border border-red-200 text-red-600 px-6 py-3 rounded-lg">
          {error}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            🛒 Your Shopping Cart
          </h1>

          {cartData.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
              <p className="text-6xl mb-4">🛒</p>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-400">
                Add some fresh products to get started!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartData.map((item) => {
                const product = item.product;

                if (!product || typeof product !== "object") {
                  return null;
                }
                return (
                  <div
                    key={product._id}
                    className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4"
                  >
                    <div className="w-20 h-20 flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>

                    <div className="flex-1 text-left">
                      <h2 className="text-base font-semibold text-gray-800">
                        {product.name}
                      </h2>
                      <p className="text-sm text-gray-400 mt-0.5 line-clamp-1">
                        {product.desc}
                      </p>
                      <p className="text-sm text-green-600 font-medium mt-1">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <button
                      onClick={() => handleRemove(product._id)}
                      className="px-4 py-2 text-sm font-medium text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors duration-200 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
