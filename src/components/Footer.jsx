import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="container mx-auto text-center">
        <p className="text-lg">&copy; 2024 EventHub. All rights reserved.</p>
        <div className="mt-4">
          <a href="#" className="text-yellow-400 hover:text-yellow-500 mx-2">
            Privacy Policy
          </a>
          <a href="#" className="text-yellow-400 hover:text-yellow-500 mx-2">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
