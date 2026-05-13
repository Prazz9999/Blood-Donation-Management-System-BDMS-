import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/ui.css";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
      alert("Please fill all fields");
      return;
    }

    alert("Login Successful!");

    navigate("/dashboard");
  };

  return (
    <div className="auth-page login-bg">
      <div className="auth-logo-stack">
        <div className="brand with-icon">🩸 DONORHUB</div>
        <p>Vital Minimalism in Healthcare</p>
      </div>

      <div className="auth-card compact">
        <h2>Welcome back</h2>
        <p>Please enter your details to sign in.</p>

        <label>USERNAME</label>
        <input
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="inline-label">
          <label>PASSWORD</label>
          <button className="forgot-btn">
            Forgot?
          </button>       
         </div>

        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn primary block" onClick={handleLogin}>
          Login
        </button>

        <div className="divider" />

        <p className="switch-copy">
          Don't have an account?{" "}
          <Link to="/signup">Create an account</Link>
        </p>
      </div>

      <div className="vertical-copy">
        SECURE PORTAL ACCESS SYSTEM
      </div>

      <footer className="footer-shell auth-footer">
        <div className="footer-brand">
          <div className="brand">DONORHUB.</div>
          <p>© 2024 BACKROW LABS. ALL RIGHTS RESERVED.</p>
        </div>

        <div className="footer-links">
          <a href="#">CONTACT US</a>
          <a href="#">PRIVACY POLICY</a>
          <a href="#">TERMS OF SERVICE</a>
          <a href="#">FAQ</a>
        </div>
      </footer>
    </div>
  );
}