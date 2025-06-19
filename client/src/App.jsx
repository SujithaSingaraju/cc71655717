import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddEvent from "./pages/AddEvent";
import EditEvent from "./pages/EditEvent";
import EventList from "./pages/EventList";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen p-4">
        <nav className="flex justify-between items-center bg-white shadow p-4 mb-6 rounded-lg">
          <h1 className="text-2xl font-bold text-blue-600">Event Management Portal</h1>
          <div className="space-x-4">
            <Link to="/" className="text-blue-500 hover:underline">Home</Link>
            <Link to="/add" className="text-blue-500 hover:underline">Add Event</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddEvent />} />
          <Route path="/list" element={<EventList />} />
          <Route path="/edit/:id" element={<EditEvent />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
