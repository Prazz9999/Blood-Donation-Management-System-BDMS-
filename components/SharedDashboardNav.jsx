import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import "../styles/donordashboard.css";

/**
 * SharedDashboardNav — the single source-of-truth navbar used by
 * /dashboard, /profile, and any other authenticated donor page.
 *
 * Props:
 *   activePage  — "dashboard" | "donate" | "request" | "profile" | ""
 *                 Controls which nav link gets the active underline.
 */
export default function SharedDashboardNav({ activePage = "" }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const dropdownRef = useRef(null);
  const notifRef = useRef(null);
  const navigate = useNavigate();

  // Parse user from localStorage safely
  const storedUser = (() => {
    try { return JSON.parse(localStorage.getItem("user")); }
    catch { return null; }
  })();
  const userName = storedUser?.fullName || storedUser?.name || localStorage.getItem("userName") || "User";
  const userEmail = storedUser?.email || localStorage.getItem("userEmail") || "";
  const avatarData = localStorage.getItem("userAvatar") || null;

  // Unified outside-click handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {

  localStorage.clear();

  navigate("/login");
};

  

  return (
    <header className="dash-nav">
      <Link className="brand" to="/">DONORHUB</Link>

      <nav className="center-links">
        <Link to="/" className={activePage === "home" ? "active" : ""}>Home</Link>
        <Link to="/donation" className={activePage === "donate" ? "active" : ""}>Donate</Link>
        <Link to="/request" className={activePage === "request" ? "active" : ""}>Request</Link>
        <Link to="/dashboard" className={activePage === "dashboard" ? "active" : ""}>Dashboard</Link>
      </nav>

      <div className="nav-right">
        {/* Notification Bell */}
        <div className="notif-wrapper" ref={notifRef}>
          <button className="icon-btn" onClick={() => setIsNotifOpen(!isNotifOpen)} aria-label="Notifications">
            <Bell size={20} strokeWidth={2.5} color="#1A1A1A" />
          </button>
          <NotificationDropdown isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
        </div>

        {/* Dynamic Profile Avatar */}
        <div className="profile-menu-container" ref={dropdownRef}>
          <div className="nav-avatar" onClick={() => setIsProfileOpen(!isProfileOpen)}>
            {avatarData
              ? <img src={avatarData} className="nav-avatar-img" alt="Profile" />
              : <div className="nav-avatar-initials">{userName?.charAt(0)?.toUpperCase() || "U"}</div>
            }
          </div>

          {isProfileOpen && (
            <div className="profile-dropdown-menu">
              <div className="user-info-header">
                <strong>{userName}</strong>
                <span>{userEmail}</span>
              </div>
              <div className="menu-links">
                <Link to="/dashboard" onClick={() => setIsProfileOpen(false)}>Dashboard</Link>
                <Link to="/profile" onClick={() => setIsProfileOpen(false)}>User Details</Link>
              </div>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
