import React from "react";

const About = () => {
  return (
    <header
      className="relative bg-cover bg-center h-screen flex items-center justify-center text-center"
      style={{
        backgroundImage: "url('https://source.unsplash.com/1600x900/?concert')",
      }}
    >
      <div className="bg-black bg-opacity-50 p-10 rounded-lg">
        <h1 className="text-5xl font-bold text-white">
          The World of Events, Here
        </h1>
        <p className="text-lg text-gray-300 mt-4">
          Discover the best music and sports events near you. Join us for an
          unforgettable experience.
        </p>
        <a
          href="#learn-more"
          className="mt-6 inline-block bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-500"
        >
          Learn More
        </a>
      </div>
    </header>
  );
};

export default About;
