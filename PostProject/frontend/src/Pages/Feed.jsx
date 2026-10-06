import React, { useEffect, useState } from "react";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // axios.get("http://localhost:3000/posts").then((res) => {
    //   setPosts(res.data.posts);
    //   setLoading(false);
    // });

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/posts");
        setPosts(res.data.posts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Feed</h1>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-400 text-sm mt-16">
            Loading posts...
          </p>
        )}

        {/* Empty state */}
        {!loading && posts.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
            <svg
              className="w-12 h-12 mb-3"
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
            <p className="text-sm">No posts yet. Be the first to post!</p>
          </div>
        )}

        {/* Posts list */}
        {!loading && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            {posts.map((post, index) => (
              <div
                key={post._id || index}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
              >
                {/* Image */}
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.caption || "Post image"}
                    className="w-full object-cover max-h-96"
                  />
                )}

                {/* Caption */}
                {post.caption && (
                  <div className="px-5 py-4">
                    <p className="text-gray-700 text-sm">{post.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
