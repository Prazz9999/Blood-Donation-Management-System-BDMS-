import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css"; 

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return setError("Please enter your email address.");

    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Email not found. Please try again.");

      setMessage("Reset code sent! Redirecting to verification...");
      setTimeout(() => {
        navigate("/otp", { state: { email, type: "password_reset" } });
      }, 2000);
    } catch (err) {
      setError(err.message || "Email not found. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h2>Reset Password</h2>
          <p>Enter your email address to receive a recovery code.</p>

          {error && <div className="error-banner">{error}</div>}
          {message && <div style={{ color: '#2B8A3E', backgroundColor: '#EBFBEE', padding: '12px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, marginBottom: '1rem' }}>{message}</div>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>EMAIL ADDRESS</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? "SENDING..." : "Send Recovery Code"}
            </button>
          </form>

          <p className="switch-text">
            Remembered your password? <Link to="/login">Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}