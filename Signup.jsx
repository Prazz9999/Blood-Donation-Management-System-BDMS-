import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/ui.css";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bloodGroup: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = () => {
    const {
      fullName,
      email,
      phone,
      bloodGroup,
      password,
      confirmPassword,
    } = formData;

    // Simple validation
    if (
      !fullName ||
      !email ||
      !phone ||
      !bloodGroup ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Fake successful signup
    alert("Account Created Successfully!");

    // Navigate to OTP page
    navigate("/otp");
  };

  return (
    <div className="auth-page signup-bg">
      <div className="auth-card wide">
        <div className="brand with-icon">🩸 DONORHUB</div>

        <h2>Create Account</h2>

        <p>
          Join our community of life-savers and start your journey today.
        </p>

        <div className="form-grid two">

          <div>
            <label>FULL NAME</label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter your name"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>EMAIL</label>

            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>PHONE NUMBER</label>

            <input
              type="text"
              name="phone"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>BLOOD GROUP</label>

            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
            >
              <option value="">Select Group</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>

          <div>
            <label>PASSWORD</label>

            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>CONFIRM PASSWORD</label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

        </div>

        <button className="btn primary block" onClick={handleSignup}>
          SIGN UP
        </button>

        <p className="switch-copy centered">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>

      <div className="badge-strip">
        <div>🛡 SECURE DATA</div>
        <div>🤍 VITAL IMPACT</div>
        <div>⌖ SMART MATCHING</div>
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