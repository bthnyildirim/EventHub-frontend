import React from "react";
import EventDetails from "./EventDetails";

const EventList = () => {
  // Sample event data
  const events = [
    {
      id: 1,
      title: "Live Music Concert",
      date: "October 18, 2024",
      location: "New York City",
      image: "https://source.unsplash.com/400x300/?music",
    },
    {
      id: 2,
      title: "Football Match",
      date: "October 20, 2024",
      location: "Los Angeles",
      image: "https://source.unsplash.com/400x300/?sports",
    },
    {
      id: 3,
      title: "Jazz Night",
      date: "October 25, 2024",
      location: "San Francisco",
      image: "https://source.unsplash.com/400x300/?concert",
    },
  ];

  return (
    <section id="events" className="py-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventDetails key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventList;
