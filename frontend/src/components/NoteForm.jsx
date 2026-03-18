// src/components/NoteForm.jsx
// This component handles BOTH creating and editing a note.
// If "editNote" prop is passed, it pre-fills the form for editing.

import { useState, useEffect } from "react";

function NoteForm({ onSubmit, editNote, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // When editNote changes (user clicks Edit), fill in the form
  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setContent(editNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return; // basic guard
    onSubmit({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>
        {editNote ? "✏️ Edit Note" : "📝 New Note"}
      </h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.input}
        required
      />

      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={styles.textarea}
        rows={4}
        required
      />

      <div style={styles.buttons}>
        <button type="submit" style={styles.submitBtn}>
          {editNote ? "Update Note" : "Add Note"}
        </button>

        {/* Show cancel button only when editing */}
        {editNote && (
          <button type="button" onClick={onCancelEdit} style={styles.cancelBtn}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

const styles = {
  form: {
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  heading: { margin: 0, fontSize: "1.2rem", color: "#333" },
  input: {
    padding: "0.6rem 0.9rem",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    outline: "none",
  },
  textarea: {
    padding: "0.6rem 0.9rem",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    resize: "vertical",
    outline: "none",
    fontFamily: "inherit",
  },
  buttons: { display: "flex", gap: "0.75rem" },
  submitBtn: {
    padding: "0.6rem 1.2rem",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.95rem",
  },
  cancelBtn: {
    padding: "0.6rem 1.2rem",
    background: "#e5e7eb",
    color: "#333",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.95rem",
  },
};

export default NoteForm;
