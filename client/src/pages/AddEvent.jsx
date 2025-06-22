import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext"; // ✅ context import

const AddEvent = () => {
  const { userEmail } = useContext(UserContext); // ✅ get email from context
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    name: "",
    date: "",
    location: "",
  });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userEmail) {
      alert("User not logged in.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...event, userEmail }), // ✅ attach userEmail
      });

      if (res.ok) {
        navigate("/list");
      } else {
        alert("Failed to add event");
      }
    } catch (err) {
      console.error("Add event error:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-green-600">Add Event</h2>
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
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
