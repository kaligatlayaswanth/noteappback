
import React, { useState } from 'react';
import { Trash2, Calendar, Edit2 } from 'lucide-react';
import "../styles/Note.css";

const Note = ({ note, onDelete }) => {
    const [isConfirming, setIsConfirming] = useState(false);
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const handleDelete = () => {
        if (isConfirming) {
            onDelete(note.id);
        } else {
            setIsConfirming(true);
            // Auto reset after 3 seconds
            setTimeout(() => setIsConfirming(false), 3000);
        }
    };

    return (
        <div className="note-card">
            <div className="note-header">
                <h3 className="note-title">{note.title}</h3>
                <div className="note-actions">
                    <button 
                        className={`delete-button ${isConfirming ? 'confirming' : ''}`}
                        onClick={handleDelete}
                        aria-label={isConfirming ? "Confirm delete" : "Delete note"}
                    >
                        {isConfirming ? 'Confirm' : <Trash2 size={16} />}
                    </button>
                </div>
            </div>
            
            <div className="note-body">
                <p className="note-content">{note.content}</p>
            </div>
            
            <div className="note-footer">
                <div className="note-date">
                    <Calendar size={14} />
                    <span>{formattedDate}</span>
                </div>
            </div>
        </div>
    );
};

export default Note;