import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick"; // Simple slider library (react-slick)

// Slider styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const UpcomingEventsSlider = ({ events }) => {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Number of events to show at a time
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // Show one slide at a time for small screens
        },
      },
    ],
  };

  if (!events.length) {
    return (
      <div className="text-center text-gray-500">
        No upcoming events available.
      </div>
    );
  }

  return (
    <Slider {...settings} className="px-4">
      {events.map((event) => (
        <div
          key={event._id}
          className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition"
        >
          <h3 className="text-xl font-bold">{event.title}</h3>
          <p className="text-gray-500">
            {new Date(event.dateTime).toDateString()}
          </p>
          <p className="text-gray-600">
            {event.venue?.name || "No Venue Assigned"}
          </p>
          <Link
            to={`/events/${event._id}`}
            className="text-yellow-500 hover:text-yellow-600 mt-4 block"
          >
            View Details
          </Link>
        </div>
      ))}
    </Slider>
  );
};

export default UpcomingEventsSlider;
