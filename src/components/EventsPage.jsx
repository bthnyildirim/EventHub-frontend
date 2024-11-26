import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateEvent from "./CreateEvent";
import CreateVenue from "./CreateVenue";
import EditEvent from "./EditEvent";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [showCreateEventForm, setShowCreateEventForm] = useState(false);
  const [showCreateVenueForm, setShowCreateVenueForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null); // Track the event being edited

  // Fetch events, venues, and check user type on component load
  useEffect(() => {
    // Fetch all events
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/events`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.error("Error fetching events:", error));

    // Fetch all venues
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/venues`)
      .then((response) => {
        setVenues(response.data);
      })
      .catch((error) => console.error("Error fetching venues:", error));

    // Decode token to check user type
    const token = localStorage.getItem("authToken");
    if (token) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
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
    setShowCreateEventForm(false); // Hide the form after adding the event
  };

  // Handle event update
  const handleEventUpdated = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event._id === updatedEvent._id ? updatedEvent : event
      )
    );
    setEditingEvent(null); // Exit edit mode
  };

  // Handle venue addition
  const handleVenueAdded = (newVenue) => {
    setVenues((prevVenues) => [...prevVenues, newVenue]);
    setShowCreateVenueForm(false); // Hide the form after adding the venue
  };

  // Handle event deletion
  const handleDeleteEvent = (eventId) => {
    const token = localStorage.getItem("authToken");
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event._id !== eventId)
        );
      })
      .catch((error) => console.error("Error deleting event:", error));
  };

  // Handle venue deletion
  const handleDeleteVenue = (venueId) => {
    const token = localStorage.getItem("authToken");
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/venues/${venueId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setVenues((prevVenues) =>
          prevVenues.filter((venue) => venue._id !== venueId)
        );
      })
      .catch((error) => console.error("Error deleting venue:", error));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Events and Venues</h1>

      {/* Section for Events */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Events</h2>

        {isOrganizer && !editingEvent && (
          <button
            onClick={() => setShowCreateEventForm(!showCreateEventForm)}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            {showCreateEventForm ? "Cancel" : "Create Event"}
          </button>
        )}

        {showCreateEventForm && (
          <CreateEvent
            onEventAdded={handleEventAdded}
            venues={venues} // Pass venues for selection
          />
        )}

        {editingEvent && (
          <EditEvent
            event={editingEvent}
            venues={venues} // Pass venues for selection
            onEventUpdated={handleEventUpdated}
            onCancel={() => setEditingEvent(null)}
          />
        )}

        {!editingEvent && events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition"
              >
                <h3 className="text-xl font-bold">{event.title}</h3>
                <p className="text-gray-500">
                  {new Date(event.dateTime).toDateString()}
                </p>
                <p className="text-gray-600">{event.description}</p>
                <p className="text-gray-600">
                  Venue: {event.venue?.name || "No Venue Assigned"}
                </p>
                <img
                  src={event.image || "/placeholder.jpg"}
                  alt={event.title}
                  className="w-full h-32 object-cover rounded mt-2"
                />
                {isOrganizer && (
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => setEditingEvent(event)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          !editingEvent && (
            <div className="text-center text-gray-500">
              No events available.
            </div>
          )
        )}
      </div>

      {/* Section for Venues */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Venues</h2>

        {isOrganizer && (
          <button
            onClick={() => setShowCreateVenueForm(!showCreateVenueForm)}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
          >
            {showCreateVenueForm ? "Cancel" : "Create Venue"}
          </button>
        )}

        {showCreateVenueForm && <CreateVenue onVenueAdded={handleVenueAdded} />}

        {venues.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {venues.map((venue) => (
              <div
                key={venue._id}
                className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition"
              >
                <h3 className="text-xl font-bold">{venue.name}</h3>
                <p className="text-gray-500">Capacity: {venue.capacity}</p>
                <p className="text-gray-600">
                  Location: {venue.location.town}, {venue.location.streetName}
                </p>
                {isOrganizer && (
                  <div className="mt-4 flex space-x-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteVenue(venue._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No venues available.</div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
