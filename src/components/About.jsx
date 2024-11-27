import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";

const About = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/events`
        );
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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      {/* Hero Section */}
      <header
        className="relative bg-cover bg-center h-[90vh] flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/1600x900/?concert')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl p-10 rounded-lg text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Discover the World of Events
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mt-4">
            Uniting people through unforgettable experiences in music, sports,
            and entertainment. Explore, connect, and make memories!
          </p>
          <button
            onClick={() => navigate("/events")}
            className="mt-6 inline-block bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-500"
          >
            Learn More
          </button>
        </div>
      </header>

      {/* Upcoming Events Section */}
      <section id="upcoming-events" className="container mx-auto p-6">
        <h2 className="text-4xl font-bold text-center mb-6">Upcoming Events</h2>
        {error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <Slider {...sliderSettings}>
            {events.map((event) => (
              <div key={event._id} className="p-4">
                <Link to={`/events/${event._id}`}>
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition">
                    {/* Event Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                      <img
                        src={`${import.meta.env.VITE_API_URL}${event.image}`}
                        alt={event.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    {/* Event Details */}
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-gray-800">
                        {event.title}
                      </h3>
                      <p className="text-gray-500">
                        {new Date(event.dateTime).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-gray-600">
                        Venue: {event.venue?.name || "No Venue Assigned"}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        )}
      </section>
    </>
  );
};

export default About;
