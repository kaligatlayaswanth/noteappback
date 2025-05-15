import React from "react";
import { Loader2 } from "lucide-react";
import "../styles/LoadingIndicator.css";

const LoadingIndicator = ({ message = "Loading..." }) => {
  return (
    <div className="loading-indicator">
      <div className="loading-spinner">
        <Loader2 size={24} className="spinner-icon" />
      </div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default LoadingIndicator;