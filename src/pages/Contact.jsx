import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="container mx-auto max-w-4xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Contact Me
        </h1>

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="rounded-full border-4 border-gray-300 overflow-hidden h-32 w-32">
              <img
                src="/images/profile-image.JPG"
                alt="Your Profile"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Batuhan Yildirim
          </h2>
          <p className="text-gray-600 mt-2">
            A creative developer committed to building innovative and
            user-friendly digital solutions.
          </p>
        </div>

        <div className="flex justify-center space-x-6 mb-8">
          <a
            href="https://github.com/bthnyildirim"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 text-3xl"
          >
            <i className="fab fa-github"></i>
          </a>

          <a
            href="https://www.linkedin.com/in/batuhan-yildirim-17b109124/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-3xl"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </div>

        {/* Contact Form */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Your email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Message</label>
            <textarea
              rows="5"
              className="w-full border border-gray-300 rounded px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Your message"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 rounded hover:from-blue-600 hover:to-purple-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
