import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/events/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-block bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700"
      >
        ← Back
      </button>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Event Image */}
        <div className="relative h-64 sm:h-96">
          <img
            src={`${import.meta.env.VITE_API_URL}${event.image}`}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Event Content */}
        <div className="p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {event.title}
          </h1>
          <p className="text-gray-500 text-lg mb-4">
            {new Date(event.dateTime).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {event.description}
          </p>

          {/* Venue Details */}
          <div className="bg-gray-100 rounded-lg p-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Venue Details
            </h2>
            {event.venue ? (
              <div className="text-gray-700">
                <p className="font-medium text-lg">{event.venue.name}</p>
                <p>
                  {event.venue.location.streetName}, {event.venue.location.town}
                </p>
                <p>Capacity: {event.venue.capacity}</p>
              </div>
            ) : (
              <p className="text-gray-500">No venue details available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
