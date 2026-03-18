// src/components/NoteCard.jsx
// Displays a single note with its title, content, date, and action buttons.

function NoteCard({ note, onEdit, onDelete }) {
  // Format the date nicely:  "15 Jan 2025"
  const formattedDate = new Date(note.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{note.title}</h3>
      <p style={styles.content}>{note.content}</p>
      <p style={styles.date}>🕐 {formattedDate}</p>

      <div style={styles.actions}>
        {/* Tell the parent (App.jsx) which note to edit */}
        <button onClick={() => onEdit(note)} style={styles.editBtn}>
          Edit
        </button>
        <button onClick={() => onDelete(note._id)} style={styles.deleteBtn}>
          Delete
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    padding: "1.25rem",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  title: { margin: 0, fontSize: "1.1rem", color: "#1e293b" },
  content: { margin: 0, color: "#475569", fontSize: "0.95rem", lineHeight: 1.6 },
  date: { margin: 0, fontSize: "0.78rem", color: "#94a3b8" },
  actions: { display: "flex", gap: "0.5rem", marginTop: "0.5rem" },
  editBtn: {
    padding: "0.4rem 1rem",
    background: "#f0fdf4",
    color: "#16a34a",
    border: "1px solid #86efac",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.85rem",
  },
  deleteBtn: {
    padding: "0.4rem 1rem",
    background: "#fff1f2",
    color: "#dc2626",
    border: "1px solid #fca5a5",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.85rem",
  },
};

export default NoteCard;
