import React, { useState } from "react";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [pricing, setPricing] = useState({ min: "", max: "" });
  const [venue, setVenue] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const token = localStorage.getItem("token");

    if (!token) {
      setErrorMessage(
        "You must be logged in as an organizer to create an event."
      );
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/events`, {
        method: "POST",
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
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create the event.");
      }

      setSuccessMessage("Event created successfully!");
      setTitle("");
      setDescription("");
      setDateTime("");
      setPricing({ min: "", max: "" });
      setVenue("");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-bold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-bold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          ></textarea>
        </div>
        <div>
          <label className="block font-bold">Date and Time</label>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-bold">Pricing (Min - Max)</label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={pricing.min}
              onChange={(e) => setPricing({ ...pricing, min: e.target.value })}
              className="w-1/2 border px-4 py-2 rounded"
              placeholder="Min"
              required
            />
            <input
              type="number"
              value={pricing.max}
              onChange={(e) => setPricing({ ...pricing, max: e.target.value })}
              className="w-1/2 border px-4 py-2 rounded"
              placeholder="Max"
              required
            />
          </div>
        </div>
        <div>
          <label className="block font-bold">Venue</label>
          <input
            type="text"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            placeholder="Venue ID"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
