import React, { useState, useEffect } from "react";

const EditEvent = ({ event, onEventUpdated }) => {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [dateTime, setDateTime] = useState(event.dateTime);
  const [pricing, setPricing] = useState(event.pricing);
  const [venue, setVenue] = useState(event.venue?._id || "");
  const [venues, setVenues] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  // Fetch available venues
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/venues`)
      .then((response) => response.json())
      .then((data) => setVenues(data))
      .catch((error) => console.error("Error fetching venues:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events/${event._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            description,
            dateTime,
            pricing,
            venue,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update the event.");
      }

      const updatedEvent = await response.json();
      onEventUpdated(updatedEvent);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-3 rounded">
          {errorMessage}
        </div>
      )}
      <div>
        <label className="block font-bold">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />
      </div>
      <div>
        <label className="block font-bold">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        ></textarea>
      </div>
      <div>
        <label className="block font-bold">Date and Time</label>
        <input
          type="datetime-local"
          value={new Date(dateTime).toISOString().slice(0, 16)} // Format for input field
          onChange={(e) => setDateTime(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />
      </div>
      <div>
        <label className="block font-bold">Pricing (Min - Max)</label>
        <div className="flex space-x-2">
          <input
            type="number"
            value={pricing.min}
            onChange={(e) =>
              setPricing({ ...pricing, min: Number(e.target.value) })
            }
            className="w-1/2 border px-4 py-2 rounded"
          />
          <input
            type="number"
            value={pricing.max}
            onChange={(e) =>
              setPricing({ ...pricing, max: Number(e.target.value) })
            }
            className="w-1/2 border px-4 py-2 rounded"
          />
        </div>
      </div>
      <div>
        <label className="block font-bold">Venue</label>
        <select
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          required
        >
          <option value="">Select a Venue</option>
          {venues.map((v) => (
            <option key={v._id} value={v._id}>
              {v.name} - {v.location.town}, {v.location.streetName}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditEvent;
