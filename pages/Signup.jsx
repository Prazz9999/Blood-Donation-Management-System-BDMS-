import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Bell, Menu, ChevronDown } from 'lucide-react';
import NotificationDropdown from '../components/NotificationDropdown';
import LegalModal from '../components/LegalModal';
import "../styles/signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", bloodGroup: "", role: "", password: "", confirmPassword: "", });
  const [activeModal, setActiveModal] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const notifRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage("");
  };

  const handleSignup = async () => {
    const { fullName, email, phone, bloodGroup, role, password, confirmPassword } = formData;
    if (!fullName || !email || !phone || !bloodGroup || !role || !password || !confirmPassword) {
      setErrorMessage("Please fill all fields including your role");
      return;
    }
    if (password !== confirmPassword) { setErrorMessage("Passwords do not match"); return; }

    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email: email,
          phone: phone,
          blood_group: bloodGroup,
          role: role.toLowerCase(),
          password: password
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Failed to create account.");
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="public-page-wrapper user-auth-flow">
      
      {/* 3-COLUMN NAVBAR */}
      <header className="site-nav">
        <Link className="brand" to="/">DONORHUB</Link>
        <nav className="desktop-links">
          <Link to="/">Home</Link>
          <Link to="/donation">Donate</Link>
          <Link to="/request">Request</Link>
        </nav>

        <div className="nav-right">
          <div className="notif-wrapper">
            <button className="icon-btn" onClick={() => setIsNotifOpen(!isNotifOpen)}>
              <Bell size={22} strokeWidth={2} color="#C92A2A" />
            </button>
            <NotificationDropdown isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
          </div>

          <div className="menu-wrapper" ref={menuRef}>
            <button className="icon-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu size={24} strokeWidth={2} color="#C92A2A" />
            </button>
            {isMenuOpen && (
              <div className="dropdown-menu-box menu-box">
                <Link to="/login" className="dropdown-link" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link to="/signup" className="dropdown-link" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                <div className="menu-divider"></div>
                <Link to="/admin/dashboard" className="dropdown-link" onClick={() => setIsMenuOpen(false)}>Admin Portal</Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="auth-page">
        <div className="auth-card wide">
          
          <div className="brand-header-inside">
            <span className="drop-icon">🩸</span>
            <span className="brand-name">DONORHUB</span>
          </div>

          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join our community of life-savers and start your journey today.</p>

          {errorMessage && <div className="error-text">{errorMessage}</div>}

          <div className="form-grid">
            <div className="input-group">
              <label>FULL NAME</label>
              <input type="text" name="fullName" placeholder="Enter your name" onChange={handleChange} autoComplete="off" />
            </div>

            <div className="input-group">
              <label>EMAIL</label>
              <input type="email" name="email" placeholder="name@gmail.com" onChange={handleChange} autoComplete="off" />
            </div>

            <div className="input-group">
              <label>PHONE NUMBER</label>
              <input type="text" name="phone" placeholder=" (+977) 00000-00000" onChange={handleChange} autoComplete="off" />
            </div>

            <div className="input-group">
              <label>BLOOD GROUP</label>
              <div className="input-wrapper">
                <select name="bloodGroup" onChange={handleChange}>
                  <option value="">Select Group</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(t => <option key={t}>{t}</option>)}
                </select>
                <ChevronDown size={16} className="action-icon select-caret" />
              </div>
            </div>

            <div className="input-group full-width">
              <label>I AM A</label>
              <div className="input-wrapper">
                <select name="role" onChange={handleChange}>
                  <option value="">Select Role</option>
                  <option value="DONOR">DONOR — I want to donate blood</option>
                  <option value="SEEKER">SEEKER — I need blood support</option>
                </select>
                <ChevronDown size={16} className="action-icon select-caret" />
              </div>
            </div>

            <div className="input-group">
              <label>PASSWORD</label>
              <div className="input-wrapper">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  placeholder="••••••••" 
                  onChange={handleChange} 
                  autoComplete="off"
                />
                <button type="button" className="action-icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="input-group">
              <label>CONFIRM PASSWORD</label>
              <div className="input-wrapper">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  name="confirmPassword" 
                  placeholder="••••••••" 
                  onChange={handleChange} 
                  autoComplete="off"
                />
                <button type="button" className="action-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <button className="btn-primary auth-submit" onClick={handleSignup} disabled={isLoading}>
            {isLoading ? "CREATING ACCOUNT..." : "SIGN UP"}
          </button>

          <p className="switch-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>

        <div className="badge-strip">
          <div className="badge-item"><span>🛡</span> SECURE DATA</div>
          <div className="badge-item"><span>🤲</span> VITAL IMPACT</div>
          <div className="badge-item"><span>📍</span> SMART MATCHING</div>
        </div>

        <footer className="auth-footer">
          <div className="footer-left">
            <div className="footer-logo">DONORHUB.</div>
            <p>© 2026 BACKROW LABS. ALL RIGHTS RESERVED.</p>
          </div>
          <div className="footer-right">
            <button className="footer-modal-trigger-btn" onClick={() => setActiveModal('contact')}>CONTACT US</button>
            <button className="footer-modal-trigger-btn" onClick={() => setActiveModal('privacy')}>PRIVACY POLICY</button>
            <button className="footer-modal-trigger-btn" onClick={() => setActiveModal('terms')}>TERMS OF SERVICE</button>
            <button className="footer-modal-trigger-btn" onClick={() => setActiveModal('faq')}>FAQ</button>
          </div>
        </footer>
        <LegalModal activeModal={activeModal} onClose={() => setActiveModal(null)} />
      </div>
    </div>
  );
}