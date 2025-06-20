import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddEvent from "./pages/AddEvent";
import EventList from "./pages/EventList";
import EditEvent from "./pages/EditEvent";
import Login from "./pages/LogIn";
import Signup from "./pages/SignUp";
import { useEffect, useState } from "react";

function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) setUserName(user.name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserName("");
  };

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen p-4">
        <nav className="flex justify-between items-center bg-white shadow p-4 mb-6 rounded-lg">
          <h1 className="text-2xl font-bold text-blue-600">Event Management Portal</h1>
          <div className="space-x-4 flex items-center">
            <Link to="/" className="text-blue-500 hover:underline">Home</Link>
            <Link to="/add" className="text-blue-500 hover:underline">Add Event</Link>
            <Link to="/list" className="text-blue-500 hover:underline">View Events</Link>
            {!userName ? (
              <>
                <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                <Link to="/signup" className="text-blue-500 hover:underline">Signup</Link>
              </>
            ) : (
              <>
                <span className="text-sm text-gray-600">Welcome, {userName}!</span>
                <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
              </>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddEvent />} />
          <Route path="/list" element={<EventList />} />
          <Route path="/edit/:id" element={<EditEvent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
