import React, { useEffect, useState } from "react";
import EventsPage from "./EventsPage";

const About = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/events`);
        if (!response.ok) {
          throw new Error("Failed to fetch events.");
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <header
        className="relative bg-cover bg-center h-screen flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/1600x900/?concert')",
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

      <section id="upcoming-events" className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Upcoming Events</h2>
        {error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <EventsPage events={events} />
        )}
      </section>
    </>
  );
};

export default About;
