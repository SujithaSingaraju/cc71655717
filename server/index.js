const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

const EVENTS_FILE = "./events.json";
const USERS_FILE = "./users.json";

app.use(cors());
app.use(bodyParser.json());

// Utility functions
function readData(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (err) {
    return [];
  }
}

function writeData(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// ✳️ Signup Route
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "All fields required" });

  const users = readData(USERS_FILE);
  if (users.find(user => user.email === email)) {
    return res.status(409).json({ error: "User already exists" });
  }

  users.push({ name, email, password });
  writeData(USERS_FILE, users);
  res.status(201).json({ message: "Signup successful" });
});

// ✳️ Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = readData(USERS_FILE);
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  res.json({ message: "Login successful", name: user.name });
});

// 🟢 Get All Events
app.get("/events", (req, res) => {
  res.json(readData(EVENTS_FILE));
});

// 🟢 Add a New Event
app.post("/events", (req, res) => {
  const events = readData(EVENTS_FILE);
  const newEvent = { ...req.body, id: Date.now() };
  events.push(newEvent);
  writeData(EVENTS_FILE, events);
  res.status(201).json(newEvent);
});

// 🔍 Get a Single Event by ID
app.get("/events/:id", (req, res) => {
  const eventId = Number(req.params.id);
  console.log("🔍 Looking for event ID:", eventId); // 👈 add this

  const events = readData(EVENTS_FILE);
  const event = events.find(e => e.id === eventId);

  if (!event) {
    console.log("❌ Event not found");
    return res.status(404).json({ message: "Event not found" });
  }

  console.log("✅ Event found:", event);
  res.json(event);
});

// ✏️ Update Event by ID
app.put("/events/:id", (req, res) => {
  const events = readData(EVENTS_FILE);
  const eventId = Number(req.params.id);
  const index = events.findIndex(e => e.id === eventId);

  if (index === -1) {
    return res.status(404).json({ message: "Event not found" });
  }

  events[index] = { ...events[index], ...req.body, id: eventId }; // Preserve ID
  writeData(EVENTS_FILE, events);
  res.json(events[index]);
});

// ❌ Delete Event by ID
app.delete("/events/:id", (req, res) => {
  let events = readData(EVENTS_FILE);
  const eventId = Number(req.params.id);
  const updatedEvents = events.filter(e => e.id !== eventId);

  if (events.length === updatedEvents.length) {
    return res.status(404).json({ message: "Event not found" });
  }

  writeData(EVENTS_FILE, updatedEvents);
  res.json({ message: "Event deleted successfully" });
});

// 🚀 Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
