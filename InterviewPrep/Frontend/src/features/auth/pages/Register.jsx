import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { loading, handleRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleRegister({ username, email, password });

    setUsername("");
    setEmail("");
    setPassword("");

    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center gap-2 min-h-screen">
        <Loader size={25} className="animate-spin text-green-500" />
        <h2 className="text-xl font-semibold text-green-600">Logging in...</h2>
      </div>
    );
  }
  return (
    <>
      <main className="flex justify-center items-center min-h-screen">
        <div className="bg-stone-900/60 border border-white/20 px-10 py-6 flex flex-col gap-2 rounded-md">
          <h1 className="text-4xl font-bold bg-linear-to-tr from-gray-500 to-gray-700 bg-clip-text text-transparent py-2 tracking-wide rounded-lg">
            Register
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <label className="text-lg text-white">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-transparent border border-white/20 outline-none px-4 py-2 rounded-lg focus:border-white/70 transition-colors dura"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg text-white">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border border-white/20 outline-none px-4 py-2 rounded-lg focus:border-white/70 transition-colors dura"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-lg text-white">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent border border-white/20 outline-none px-4 py-2 rounded-lg focus:border-white/70 transition-colors dura"
              />
            </div>
            <button
              type="submit"
              className="inline-block bg-linear-to-tr from-stone-700 via-stone-800 to-stone-900 text-white px-4 py-2 mt-4 font-semibold text-lg rounded-lg cursor-pointer hover:transform hover:scale-[1.05] transition-all duration-200"
            >
              Register
            </button>
          </form>

          <div>
            <h2 className="text-lg text-white mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Login here
              </Link>
            </h2>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;
