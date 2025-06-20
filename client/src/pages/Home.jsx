import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="text-center">
    <h2 className="text-xl font-semibold">Welcome to the Event Management Portal</h2>
    <p className="mt-4">Click below to see all events.</p>
    <Link to="/list" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      View Events
    </Link>
  </div>
);

export default Home;