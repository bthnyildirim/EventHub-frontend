import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  const [editingEvent, setEditingEvent] = useState(null);

  // Fetch events, venues, and check user type on component load
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/events`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.error("Error fetching events:", error));

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/venues`)
      .then((response) => {
        setVenues(response.data);
      })
      .catch((error) => console.error("Error fetching venues:", error));

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

  const sortedEvents = events.slice().sort((a, b) => {
    return new Date(a.dateTime) - new Date(b.dateTime);
  });

  const handleEventAdded = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setShowCreateEventForm(false);
  };

  const handleVenueAdded = (newVenue) => {
    setVenues((prevVenues) => [...prevVenues, newVenue]);
    setShowCreateVenueForm(false);
  };

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
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">EVENTS</h1>

        {isOrganizer && !editingEvent && (
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowCreateEventForm(!showCreateEventForm)}
              className="px-4 py-2 mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded flex items-center"
            >
              <i className="fas fa-plus-circle mr-2"></i>
              {showCreateEventForm ? "Cancel" : "Create Event"}
            </button>
          </div>
        )}

        {showCreateEventForm && (
          <CreateEvent onEventAdded={handleEventAdded} venues={venues} />
        )}

        {editingEvent && (
          <EditEvent
            event={editingEvent}
            venues={venues}
            onEventUpdated={handleEventUpdated}
            onCancel={() => setEditingEvent(null)}
          />
        )}

        {!editingEvent && sortedEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sortedEvents.map((event) => (
              <Link
                key={event._id}
                to={`/events/${event._id}`}
                className="block"
              >
                <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition">
                  <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                    <img
                      src={`${import.meta.env.VITE_API_URL}${event.image}`}
                      alt={event.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-500 mb-2">
                      {new Date(event.dateTime).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-gray-600 mb-2">{event.description}</p>
                    <p className="text-gray-600 mb-2">
                      Venue: {event.venue?.name || "No Venue Assigned"}
                    </p>
                    <p className="text-gray-600">
                      Price Range: ${event.pricing?.min || "0"} - $
                      {event.pricing?.max || "0"}
                    </p>
                    {isOrganizer && (
                      <div className="mt-4 flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setEditingEvent(event);
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-green-400 to-teal-500 text-white font-bold rounded flex items-center"
                        >
                          <i className="fas fa-edit mr-2"></i>Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeleteEvent(event._id);
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded flex items-center"
                        >
                          <i className="fas fa-trash-alt mr-2"></i>Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
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

      {isOrganizer && (
        <div id="create-venue">
          <h2 className="text-2xl font-bold mb-4">Venues</h2>

          <button
            onClick={() => setShowCreateVenueForm(!showCreateVenueForm)}
            className="px-4 py-2 mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded flex items-center"
          >
            <i className="fas fa-plus-circle mr-2"></i>
            {showCreateVenueForm ? "Cancel" : "Create Venue"}
          </button>

          {showCreateVenueForm && (
            <CreateVenue onVenueAdded={handleVenueAdded} />
          )}

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
                  <div className="mt-4 flex space-x-2">
                    <button className="px-4 py-2 bg-gradient-to-r from-green-400 to-teal-500 text-white font-bold rounded flex items-center">
                      <i className="fas fa-edit mr-2"></i>Edit
                    </button>
                    <button
                      onClick={() => handleDeleteVenue(venue._id)}
                      className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded flex items-center"
                    >
                      <i className="fas fa-trash-alt mr-2"></i>Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              No venues available.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventsPage;
