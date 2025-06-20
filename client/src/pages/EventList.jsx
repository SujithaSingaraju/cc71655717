import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 search input
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/events")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error("Failed to fetch events", err));
  }, []);

  const deleteEvent = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/events/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setEvents(events.filter(e => e.id !== id));
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  const editEvent = (id) => {
    navigate(`/edit/${id}`);
  };

  // 🔍 filter events based on searchTerm
  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">All Events</h2>

      {/* 🔍 Search input */}
      <input
        type="text"
        placeholder="Search by name or location..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      {filteredEvents.length === 0 && <p>No events found.</p>}

      {filteredEvents.map(event => (
        <div key={event.id} className="bg-white shadow p-4 mb-3 rounded">
          <h3 className="font-semibold text-lg">{event.name}</h3>
          <p className="text-gray-600">{event.date} @ {event.location}</p>
          <div className="mt-2 space-x-3">
            <button
              onClick={() => deleteEvent(event.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
            <button
              onClick={() => editEvent(event.id)}
              className="text-blue-500 hover:underline"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
