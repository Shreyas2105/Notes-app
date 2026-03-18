

import axios from "axios";

const API = axios.create({
  baseURL: "https://notes-app-bsth.onrender.com/api",  // proxied to http://localhost:5000/api in development
});

// Get all notes
export const getNotes = () => API.get("/notes");

// Create a new note  →  data = { title, content }
export const createNote = (data) => API.post("/notes", data);

// Update a note by ID  →  data = { title, content }
export const updateNote = (id, data) => API.put(`/notes/${id}`, data);

// Delete a note by ID
export const deleteNote = (id) => API.delete(`/notes/${id}`);
