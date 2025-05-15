import { useState, useEffect } from "react";
import { PlusCircle, Loader2 } from "lucide-react";
import api from "../api";
import Note from "../components/Note";
import Layout from "../components/Layout"
import "../styles/Home.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    getNotes();
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const getNotes = () => {
    setLoading(true);
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        setLoading(false);
      })
      .catch((err) => {
        showNotification(err.message || "Failed to fetch notes", "error");
        setLoading(false);
      });
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          showNotification("Note deleted successfully");
          getNotes();
        } else {
          showNotification("Failed to delete note", "error");
        }
      })
      .catch((err) => {
        showNotification(err.message || "Error deleting note", "error");
      });
  };

  const createNote = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) {
          showNotification("Note created successfully");
          setTitle("");
          setContent("");
          getNotes();
        } else {
          showNotification("Failed to create note", "error");
        }
        setSubmitting(false);
      })
      .catch((err) => {
        showNotification(err.message || "Error creating note", "error");
        setSubmitting(false);
      });
  };

  return (
    <div className="notes-app">
        
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      
      <div className="app-container">
        <section className="notes-section">
          <h2 className="section-title">My Notes</h2>
          
          {loading ? (
            <div className="loading-state">
              <Loader2 className="spin-icon" />
              <span>Loading notes...</span>
            </div>
          ) : notes.length > 0 ? (
            <div className="notes-grid">
              {notes.map((note) => (
                <Note note={note} onDelete={deleteNote} key={note.id} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>You don't have any notes yet. Create your first note below!</p>
            </div>
          )}
        </section>

        <section className="create-note-section">
          <h2 className="section-title">Create a Note</h2>
          <form onSubmit={createNote} className="note-form">
            <div className="form-group">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-input"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Enter note title"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="content" className="form-label">Content</label>
              <textarea
                id="content"
                name="content"
                className="form-textarea"
                required
                onChange={(e) => setContent(e.target.value)}
                value={content}
                placeholder="Write your note here..."
                rows="5"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="submit-button" 
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="button-icon spin-icon" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="button-icon" />
                  <span>Create Note</span>
                </>
              )}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Home;