import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-6xl font-bold mb-2">Home</h1>
      <p className="text-2xl font-semibold text-green-500 mb-10">
        Welcome to our platform!
      </p>
      <button
        onClick={() => navigate("/posts")}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
      >
        Click Me {" "}
        <span className="font-normal">{`->`}</span>
      </button>
    </div>
  );
};

export default Home;
