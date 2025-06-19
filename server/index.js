const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;
const DATA_FILE = "./events.json";

app.use(cors());
app.use(bodyParser.json());

// Helper: Read events from file
function readEvents() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Helper: Write events to file
function writeEvents(events) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(events, null, 2));
}

// GET all events
app.get("/events", (req, res) => {
  const events = readEvents();
  res.json(events);
});

// GET event by ID
app.get("/events/:id", (req, res) => {
  const events = readEvents();
  const event = events.find(e => e.id == req.params.id);
  event ? res.json(event) : res.status(404).json({ error: "Event not found" });
});

// ADD new event
app.post("/events", (req, res) => {
  const events = readEvents();
  const newEvent = { ...req.body, id: Date.now() };
  events.push(newEvent);
  writeEvents(events);
  res.status(201).json(newEvent);
});

// UPDATE event
app.put("/events/:id", (req, res) => {
  let events = readEvents();
  const index = events.findIndex(e => e.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Event not found" });

  events[index] = { ...events[index], ...req.body };
  writeEvents(events);
  res.json(events[index]);
});

// DELETE event
app.delete("/events/:id", (req, res) => {
  let events = readEvents();
  const updated = events.filter(e => e.id != req.params.id);
  writeEvents(updated);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
