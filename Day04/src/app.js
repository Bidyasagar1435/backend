// server ko create krna
const express = require("express");

const app = express();
app.use(express.json());

const notes = [];
// post route
app.post("/notes", (req, res) => {
  notes.push(req.body);

  res.status(201).json({ message: "Note created successfully" });
});

// get route
app.get("/notes", (req, res) => {
  res.status(200).json({
    message: "Notes fetched successfully",
    notes: notes,
  });
});

// delete route
app.delete("/notes/:index", (req, res) => {
  const index = req.params.index;
  delete notes[index];

  res.status(200).json({ message: "Note deleted successfully" });
});

// patch route
app.patch("/notes/:index", (req, res) => {
  const index = req.params.index;
  const desc = req.body.desc;

  notes[index].desc = desc;
  
  res.status(200).json({ message: "Note updated successfully" });
});

module.exports = app;
