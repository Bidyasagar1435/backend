// server ko create krna
const express = require("express");
const noteModel = require("./models/note.model");

const app = express();
app.use(express.json());

// post route
app.post("/notes", async (req, res) => {
  const data = req.body;
  await noteModel.create({
    title: data.title,
    desc: data.desc,
  });
  res.status(201).json({
    message: "note created successfully",
  });
});

app.get("/notes", async (req, res) => {
  const notes = await noteModel.find(); // []
  // const notes = await noteModel.findOne({
  //   title: "test_title",
  // });
  res.status(200).json({
    message: "notes fetched successfully",
    notes: notes,
  });
});

app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;

  await noteModel.findOneAndDelete({
    _id: id, // _id bcz when data save in database it is in the form of _id
  });
  res.status(200).json({
    message: "note deleted successfully",
  });
});   

app.patch("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const desc = req.body.desc;

  await noteModel.findOneAndUpdate(
    {
      _id: id,
    },
    { desc: desc },
  );
  res.status(200).json({
    message: "note updated successfully",
  });
});

// const notes = [];
// // post route
// app.post("/notes", (req, res) => {
//   notes.push(req.body);

//   res.status(201).json({ message: "Note created successfully" });
// });

// // get route
// app.get("/notes", (req, res) => {
//   res.status(200).json({
//     message: "Notes fetched successfully",
//     notes: notes,
//   });
// });

// // delete route
// app.delete("/notes/:index", (req, res) => {
//   const index = req.params.index;
//   delete notes[index];

//   res.status(200).json({ message: "Note deleted successfully" });
// });

// // patch route
// app.patch("/notes/:index", (req, res) => {
//   const index = req.params.index;
//   const desc = req.body.desc;

//   notes[index].desc = desc;

//   res.status(200).json({ message: "Note updated successfully" });
// });

module.exports = app;
