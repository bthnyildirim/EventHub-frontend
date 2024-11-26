import React, { useState } from "react";

const CreateVenue = ({ onVenueAdded }) => {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState({ town: "", streetName: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const token = localStorage.getItem("authToken");

    if (!token) {
      setErrorMessage(
        "You must be logged in as an organizer to create a venue."
      );
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/venues`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, capacity, location }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create the venue.");
      }

      const newVenue = await response.json();
      setSuccessMessage("Venue created successfully!");
      onVenueAdded(newVenue);

      // Reset form fields
      setName("");
      setCapacity("");
      setLocation({ town: "", streetName: "" });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Venue</h1>
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
          <label className="block font-bold">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-bold">Capacity</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-bold">Location</label>
          <div className="space-y-2">
            <input
              type="text"
              value={location.town}
              onChange={(e) =>
                setLocation({ ...location, town: e.target.value })
              }
              className="w-full border px-4 py-2 rounded"
              placeholder="Town"
              required
            />
            <input
              type="text"
              value={location.streetName}
              onChange={(e) =>
                setLocation({ ...location, streetName: e.target.value })
              }
              className="w-full border px-4 py-2 rounded"
              placeholder="Street Name"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create Venue
        </button>
      </form>
    </div>
  );
};

export default CreateVenue;
