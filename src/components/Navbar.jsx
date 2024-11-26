import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const Navbar = () => {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 text-white py-4 px-8 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <Link to="/">EventHub</Link>
      </div>
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
        {!isLoggedIn ? (
          <>
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
          </>
        ) : (
          <li>
            <button
              onClick={logOutUser}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
