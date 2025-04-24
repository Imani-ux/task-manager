import React, { useState } from "react";

export default function CreateTask({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim().length < 3 || !dueDate) {
      setError("Title must be at least 3 characters and due date is required.");
      return;
    }

    onAddTask({ id: Date.now(), title: title.trim(), dueDate, completed: false });
    setTitle("");
    setDueDate("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Create Task</h2>

      {error && <p style={styles.error}>{error}</p>}

      <input
        style={styles.input}
        autoFocus
        placeholder="Task Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setError("");
        }}
      />

      <input
        style={styles.input}
        type="date"
        value={dueDate}
        onChange={(e) => {
          setDueDate(e.target.value);
          setError("");
        }}
      />

      <div style={styles.buttonGroup}>
        <button type="submit" style={styles.button} disabled={!title || !dueDate}>
          Add Task
        </button>
        <button
          type="button"
          style={{ ...styles.button, backgroundColor: "#ccc", color: "#000" }}
          onClick={() => {
            setTitle("");
            setDueDate("");
            setError("");
          }}
        >
          Clear
        </button>
      </div>
    </form>
  );
}
const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "20px",
    backgroundColor: "#f4f4f4",
    borderRadius: "5px",
  },
  heading: {
    marginBottom: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    cursor: "pointer",
  },
  error: {
    color: "red",
  },
};