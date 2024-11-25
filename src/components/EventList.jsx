import React from "react";
import { Link } from "react-router-dom";

const EventList = ({ events = [], userType }) => {
  if (!events.length) {
    return (
      <div className="text-center text-gray-500">No events available.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
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
          {userType === "organizer" && (
            <div className="mt-4 flex space-x-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Edit
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded">
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EventList;
