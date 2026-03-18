// routes/notes.js
// This file handles all 4 CRUD operations for notes.
// Each function is async because database operations take time.

const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// ─────────────────────────────────────────
// POST /api/notes  →  Create a new note
// ─────────────────────────────────────────
router.post("/", async (req, res) => {
  // req.body contains { title, content } sent from the frontend
  const { title, content } = req.body;

  // Basic validation — don't save empty notes
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required." });
  }

  try {
    const note = new Note({ title, content });
    const saved = await note.save();      // save to MongoDB
    res.status(201).json(saved);          // 201 = Created
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─────────────────────────────────────────
// GET /api/notes  →  Get all notes
// ─────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    // Find all notes, newest first (-1 = descending order)
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─────────────────────────────────────────
// PUT /api/notes/:id  →  Update a note
// ─────────────────────────────────────────
router.put("/:id", async (req, res) => {
  const { title, content } = req.body;

  try {
    // findByIdAndUpdate finds the note by ID and updates it
    // { new: true } returns the updated note instead of the old one
    const updated = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Note not found." });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─────────────────────────────────────────
// DELETE /api/notes/:id  →  Delete a note
// ─────────────────────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Note.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Note not found." });
    }

    res.json({ message: "Note deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
