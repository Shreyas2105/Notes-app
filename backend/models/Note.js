// models/Note.js
// This defines the shape of a Note document in MongoDB.
// Mongoose uses this "schema" to validate and save data.

const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,   // title is mandatory
      trim: true,       // removes extra spaces
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,   // automatically adds createdAt and updatedAt fields
  }
);

// Export the model so routes can use it
module.exports = mongoose.model("Note", NoteSchema);
