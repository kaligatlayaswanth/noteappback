import React, { useState } from "react";
import { Eye, EyeOff, User, Lock, Loader2, LogIn } from "lucide-react";
import api from "../api";
import "../styles/Form.css";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isRegister = method === "register";
  const title = isRegister ? "Create an Account" : "Sign In";
  const buttonText = isRegister ? "Register" : "Login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }

    if (isRegister && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const payload = { username, password };
      const response = await api.post(route, payload);

      if (response.status === 201 || response.status === 200) {
        if (!isRegister) {
          // 🔐 TOKENLARI KAYDET
          localStorage.setItem(ACCESS_TOKEN, response.data.access);
          localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
          setSuccess("Login successful!");
          navigate("/"); // 🔁 yönlendirme
        } else {
          setSuccess("Account created successfully! You can now log in.");
          setTimeout(() => navigate("/login"), 1500); // biraz gecikmeli yönlendirme
        }

        // formu sıfırla
        setUsername("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.detail || err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="auth-container">
      <div className="auth-form-card">
        <div className="auth-header">
          <h1 className="auth-title">{title}</h1>
          <p className="auth-subtitle">
            {isRegister
              ? "Create a new account to manage your notes"
              : "Sign in to access your notes"}
          </p>
        </div>

        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-field">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <div className="input-group">
              <User size={18} className="input-icon" />
              <input
                type="text"
                id="username"
                className="form-input with-icon"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-input with-icon"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={loading}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {isRegister && (
            <div className="form-field">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <div className="input-group">
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  className="form-input with-icon"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  disabled={loading}
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="button-icon spin-icon" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <LogIn size={18} className="button-icon" />
                <span>{buttonText}</span>
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          {isRegister ? (
            <p>
              Already have an account?{" "}
              <a href="/login" className="auth-link">
                Sign in
              </a>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <a href="/register" className="auth-link">
                Create one
              </a>
            </p>
          )}
        </div>
      </div>
    </div>  );
}

export default Form;
