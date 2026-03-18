
import { useState, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";
import { getNotes, createNote, updateNote, deleteNote } from "./api";

function App() {
  const [notes, setNotes] = useState([]);          // list of all notes
  const [editNote, setEditNote] = useState(null);  // note currently being edited (or null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ── Load all notes when the page first opens ──
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const { data } = await getNotes();
      setNotes(data);
    } catch {
      setError("Could not load notes. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  // ── Create or Update ──
  // This single function handles both cases.
  // If editNote is set → update, otherwise → create.
  const handleSubmit = async (formData) => {
    try {
      if (editNote) {
        // Update existing note
        const { data } = await updateNote(editNote._id, formData);
        setNotes((prev) =>
          prev.map((n) => (n._id === editNote._id ? data : n))
        );
        setEditNote(null);  // exit edit mode
      } else {
        // Create new note
        const { data } = await createNote(formData);
        setNotes((prev) => [data, ...prev]);  // add to top of list
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  // ── Delete ──
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch {
      setError("Failed to delete note.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Header */}
        <h1 style={styles.appTitle}>🗒️ Notes App</h1>

        {/* Error banner */}
        {error && <p style={styles.error}>{error}</p>}

        {/* Create / Edit form */}
        <NoteForm
          onSubmit={handleSubmit}
          editNote={editNote}
          onCancelEdit={() => setEditNote(null)}
        />

        {/* Notes list */}
        {loading ? (
          <p style={styles.status}>Loading notes...</p>
        ) : notes.length === 0 ? (
          <p style={styles.status}>No notes yet. Create your first one above!</p>
        ) : (
          <div style={styles.grid}>
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={setEditNote}      // clicking Edit sets this note as editNote
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f1f5f9",
    padding: "2rem 1rem",
    fontFamily: "system-ui, sans-serif",
  },
  container: {
    maxWidth: "700px",
    margin: "0 auto",
  },
  appTitle: {
    textAlign: "center",
    marginBottom: "1.5rem",
    fontSize: "2rem",
    color: "#1e293b",
  },
  error: {
    background: "#fee2e2",
    color: "#dc2626",
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    marginBottom: "1rem",
    fontSize: "0.9rem",
  },
  status: {
    textAlign: "center",
    color: "#94a3b8",
    marginTop: "2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "1rem",
  },
};

export default App;
