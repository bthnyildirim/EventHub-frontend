import React from "react";

const EventDetails = ({ event }) => {
  return (
    <div className="bg-gray-100 rounded-lg shadow-lg">
      <img src={event.image} alt={event.title} className="rounded-t-lg" />
      <div className="p-6">
        <h3 className="text-2xl font-bold">{event.title}</h3>
        <p className="text-gray-600 mt-2">{event.date}</p>
        <p className="text-gray-600">{event.location}</p>
        <a
          href="#"
          className="block mt-4 text-yellow-500 font-semibold hover:underline"
        >
          View Details
        </a>
      </div>
    </div>
  );
};

export default EventDetails;
