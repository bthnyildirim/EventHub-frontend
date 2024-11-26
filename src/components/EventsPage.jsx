import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CreateEvent from "./CreateEvent";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Fetch events and check user type on component load
  useEffect(() => {
    // Fetch all events
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/events`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.error("Error fetching events:", error));

    // Decode token to check user type
    const token = localStorage.getItem("authToken");
    console.log(localStorage.getItem("authToken"));
    if (token) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("User type:", response.data.userType);
          if (response.data.userType === "organizer") {
            setIsOrganizer(true);
          }
        })
        .catch((error) => console.error("Error verifying user:", error));
    }
  }, []);

  // Handle event addition
  const handleEventAdded = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setShowCreateForm(false); // Hide the form after adding the event
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Events</h1>

      {/* Show "Create Event" button for organizers */}
      {isOrganizer && (
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          {showCreateForm ? "Cancel" : "Create Event"}
        </button>
      )}

      {/* Render CreateEvent component if showCreateForm is true */}
      {showCreateForm && <CreateEvent onEventAdded={handleEventAdded} />}

      {/* Event list */}
      {events.length > 0 ? (
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
              {isOrganizer && (
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
      ) : (
        <div className="text-center text-gray-500">No events available.</div>
      )}
    </div>
  );
};

export default EventsPage;
