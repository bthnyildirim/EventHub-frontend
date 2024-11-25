import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/events/${id}`
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
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p className="text-gray-500">{new Date(event.dateTime).toDateString()}</p>
      <p className="mt-4">{event.description}</p>
      <h2 className="text-xl font-bold mt-6">Venue Details</h2>
      {event.venue ? (
        <>
          <p className="mt-2">{event.venue.name}</p>
          <p>
            {event.venue.location.streetName}, {event.venue.location.town}
          </p>
          <p>Capacity: {event.venue.capacity}</p>
        </>
      ) : (
        <p>No venue details available.</p>
      )}
    </div>
  );
};

export default EventDetails;
