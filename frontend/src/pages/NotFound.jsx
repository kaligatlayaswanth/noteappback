import React from "react";
import { Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles//NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">404</div>
        
        <div className="error-divider"></div>
        
        <div className="error-details">
          <h1 className="error-title">Page Not Found</h1>
          <p className="error-message">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="error-illustration">
            <svg 
              width="200" 
              height="140" 
              viewBox="0 0 200 140" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="20" y="90" width="160" height="10" rx="5" fill="#e5e7eb" />
              <circle cx="100" cy="50" r="30" fill="#e5e7eb" />
              <path d="M85 50 A15 15 0 0 0 115 50" stroke="#9ca3af" strokeWidth="3" fill="none" />
              <circle cx="85" cy="40" r="5" fill="#9ca3af" />
              <circle cx="115" cy="40" r="5" fill="#9ca3af" />
            </svg>
          </div>
          
          <div className="error-actions">
            <button 
              className="action-button secondary-button" 
              onClick={goBack}
            >
              <ArrowLeft size={18} />
              <span>Go Back</span>
            </button>
            
            <button 
              className="action-button primary-button" 
              onClick={goHome}
            >
              <Home size={18} />
              <span>Go Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;