import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    axios
      .post("http://localhost:3000/create-post", formData)
      .then((res) => {
        navigate("/feed");
      })
      .catch((err) => {
        console.log(err);
        alert("Error");
      });
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-16 px-4">
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full max-w-md p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Create Post
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Image Upload */}
          <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
            <svg
              className="w-8 h-8 text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4-4m0 0l4 4m-4-4v9M20 12a8 8 0 10-16 0"
              />
            </svg>
            <span className="text-sm text-gray-500">
              Click to upload an image
            </span>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="hidden"
            />
          </label>

          {/* Caption */}
          <input
            type="text"
            name="caption"
            placeholder="Write a caption..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-medium py-3 rounded-xl transition-all"
          >
            Post
          </button>
        </form>
      </section>
    </div>
  );
};

export default Posts;
