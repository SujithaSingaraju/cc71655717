import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditEvent = () => {
  const { id } = useParams(); // Get event ID from URL
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    name: "",
    date: "",
    location: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/events/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Event not found");
        }
        return res.json();
      })
      .then(data => setEvent(data))
      .catch(err => {
        alert("Event not found");
        console.error("Fetch error:", err);
        navigate("/list");
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });

      if (res.ok) {
        alert("Event updated successfully!");
        navigate("/list");
      } else {
        alert("Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-blue-600">Edit Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={event.name}
          onChange={handleChange}
          placeholder="Event Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          name="date"
          value={event.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="location"
          value={event.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
