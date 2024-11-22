import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold">
          EventHub
        </a>
        {/* Links */}
        <ul className="flex space-x-6">
          <li>
            <a href="#about" className="hover:text-yellow-400">
              About
            </a>
          </li>
          <li>
            <a href="#events" className="hover:text-yellow-400">
              Events
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-yellow-400">
              Contact
            </a>
          </li>
          <li>
            <a href="#signup" className="hover:text-yellow-400">
              Sign Up/Login
            </a>
          </li>
        </ul>
        {/* Search Bar */}
        <div className="flex items-center bg-gray-800 px-3 py-2 rounded">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-white outline-none"
          />
          <button className="text-yellow-400 ml-2">Search</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
