import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Bell, Menu } from 'lucide-react'; 
import NotificationDropdown from '../components/NotificationDropdown';
import LegalModal from '../components/LegalModal';
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  
  const notifRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please fill all fields");
      return;
    }
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Invalid credentials");

      if (data.access_token) {
        // Admin gets a token directly — redirect to admin dashboard
        localStorage.setItem("token", data.access_token);
        const role = data.user?.role || data.role || "user";
        const userName = data.user?.name || data.name || "";
        localStorage.setItem("role", role);
        localStorage.setItem("userName", userName);
        localStorage.setItem("userEmail", email);
        
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        // Normal user — OTP was sent, redirect to OTP page
        navigate("/otp", { state: { email } });
      }
    } catch (error) {
      setErrorMessage(
        typeof error === "string" ? error : error.message || "Login failed"
      );
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
          <div className="notif-wrapper" style={{ position: 'relative' }}>
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
        <div className="vertical-copy">SECURE PORTAL ACCESS SYSTEM</div>

        <div className="auth-container">
          <div className="auth-logo-stack">
            <div className="brand-header">
              <span className="drop-icon">🩸</span>
              DONORHUB
            </div>
            <p className="tagline">Vital Minimalism in Healthcare</p>
          </div>

          <div className="auth-card">
            <h2>Welcome back</h2>
            <p>Please enter your details to sign in.</p>

            {errorMessage && <div className="error-banner">{errorMessage}</div>}

            <div className="input-group">
              <label>EMAIL ADDRESS</label>
              <input
                type="email"
                placeholder="name@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                autoComplete="off"
              />
            </div>

            <div className="input-group">
              <div className="label-row">
                <label>PASSWORD</label>
                <Link to="/forgot-password" className="forgot-link">Forgot?</Link>
              </div>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  autoComplete="off"
                />
                <button type="button" className="action-icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button className="btn-primary auth-submit" onClick={handleLogin} disabled={isLoading}>
              {isLoading ? "AUTHENTICATING..." : "Login"}
            </button>

            <p className="switch-text">
              Don't have an account? <Link to="/signup">Create an account</Link>
            </p>
          </div>
        </div>

        <footer className="auth-footer">
          <div className="footer-left">
            <strong>DONORHUB.</strong>
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