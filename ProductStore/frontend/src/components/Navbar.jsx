import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-600">
          FreshCart
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-green-600">
            Home
          </Link>

          <Link to="/cart" className="text-gray-700 hover:text-green-600">
            Cart
          </Link>

          <Link
            to="/login"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
