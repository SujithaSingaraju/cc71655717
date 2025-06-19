import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 👉 Import this

const EventList = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); // 👉 For navigation

 useEffect(() => {
  fetch("http://localhost:5000/events")
    .then(res => res.json())
    .then(data => setEvents(data))
    .catch(err => console.error("Failed to fetch events", err));
}, []);

 const deleteEvent = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/events/${id}`, {
      method: "DELETE"
    });

    if (res.ok) {
      setEvents(events.filter(e => e.id !== id));
    } else {
      alert("Delete failed");
    }
  } catch (err) {
    console.error(err);
  }
};


  const editEvent = (id) => {
    navigate(`/edit/${id}`); // 👉 Go to edit route
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">All Events</h2>
      {events.length === 0 && <p>No events found.</p>}
      {events.map(event => (
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
