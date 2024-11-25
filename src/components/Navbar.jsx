import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white py-4 px-8 flex justify-between items-center">
      <div className="text-2xl font-bold">EventHub</div>
      <ul className="flex space-x-4">
        <li>
          <Link to="/about" className="hover:text-yellow-400">
            Home
          </Link>
        </li>
        <li>
          <Link to="/events" className="hover:text-yellow-400">
            Events
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-yellow-400">
            Contact
          </Link>
        </li>
        <li>
          <Link
            to="/signup"
            className="bg-amber-200 text-black px-4 py-2 rounded hover:bg-yellow-500"
          >
            Sign Up
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-700"
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
