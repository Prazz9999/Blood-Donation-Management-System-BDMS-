import { useState, useEffect, useRef } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { User, LogOut, Bell, Search, Mail, Phone, CheckCircle } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import '../styles/admin-global.css';

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Profile Dropdown State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // NEW: Notification Dropdown State
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null);

  const isActive = (path) => (location.pathname === path ? "active" : "");

  // Path Checks
  const isCampPage = location.pathname === '/admin/camp' || location.pathname === '/camp';
  const isSpecialNav = ['/admin/stock', '/stock', '/admin/user', '/user'].includes(location.pathname);

  // Close dropdowns if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // TASK 2: Read user identity from localStorage for dynamic rendering
  const userName  = localStorage.getItem("userName")  || "Admin";
  const userEmail = localStorage.getItem("userEmail") || "admin@donorhub.org";
  const userRole  = localStorage.getItem("role")      || "admin";
  const userAvatar= localStorage.getItem("userAvatar") || null;
  const initials  = userName.trim().charAt(0).toUpperCase() || "A";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userAvatar");
    navigate("/login");
  };

  // Shared Profile Dropdown Menu
  const ProfileDropdown = () => (
    <div className="profile-dropdown-card">
      <div className="dropdown-user-header">
        {/* TASK 2: Dynamic avatar — image if stored, else initial letter */}
        <div className="dropdown-avatar-large">
          {userAvatar
            ? <img src={userAvatar} alt="Profile" className="avatar-img" />
            : <div className="avatar-initials">{initials}</div>
          }
        </div>
        <div className="dropdown-user-meta">
          <span className="dropdown-name">{userName}</span>
          <span className="dropdown-email">{userEmail}</span>
        </div>
      </div>
      <div className="dropdown-menu-links">
        {/* TASK 2: "User Details" replaces "Settings" */}
        <Link to="/admin/profile" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
          <User size={18} /> <span>User Details</span>
        </Link>
        <button className="dropdown-logout-btn" onClick={handleLogout}>
          <LogOut size={18} className="logout-red" /> <span>Logout</span>
        </button>
      </div>
    </div>
  );


  return (
    <div className="admin-site-container">
      
      <header className="admin-navbar">
        <div className="admin-nav-left">
          <Link to="/admin/dashboard" className="admin-brand-logo">DonorHub</Link>
        </div>
        
        <nav className="admin-nav-center">
          <Link to="/admin/dashboard" className={isActive("/admin/dashboard")}>Dashboard</Link>
          <Link to="/admin/user" className={isActive("/admin/user")}>User</Link>
          <Link to="/admin/camp" className={isActive("/admin/camp")}>Camp</Link>
          <Link to="/admin/stock" className={isActive("/admin/stock")}>Stock</Link>
        </nav>
        
        <div className="admin-nav-right-group">
          {isSpecialNav && (
            <div className="admin-search-bar">
              <Search size={16} className="search-icon" />
              <input type="text" placeholder={location.pathname.includes('user') ? "Quick search..." : "Search inventory..."} />
            </div>
          )}

          {/* REPLACED: Notification Bell with Dropdown Wrapper */}
          <div className="notification-wrapper" ref={notifRef} style={{ position: 'relative' }}>
            <button 
              className="nav-icon-btn" 
              onClick={() => setIsNotifOpen(!isNotifOpen)}
            >
              <Bell size={20} />
            </button>
            <NotificationDropdown isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
          </div>
          
          <div className="admin-nav-right-wrapper" ref={dropdownRef}>
            <div
              className="admin-profile-trigger-circle"
              onClick={(e) => { e.preventDefault(); setIsDropdownOpen(!isDropdownOpen); }}
              title={userName}
            >
              {userAvatar
                ? <img src={userAvatar} alt="Profile" className="nav-avatar-img" />
                : <span className="nav-avatar-initials">{initials}</span>
              }
            </div>
            {isDropdownOpen && <ProfileDropdown />}
          </div>
        </div>
      </header>

      <main className="admin-content-outlet">
        {children || <Outlet />}
      </main>

      {isCampPage ? (
        <footer className="camp-extended-footer">
          <div className="footer-top-grid">
            <div className="footer-brand-col">
              <span className="footer-logo">DonorHub</span>
              <p>Streamlining the vital link between generous donors and the healthcare systems that need them most. Precision logistics for human kindness.</p>
            </div>
            <div className="footer-links-col">
              <h4>PLATFORM</h4>
              <Link to="/admin/dashboard">Admin Portal</Link>
              <Link to="/dashboard">Donor Mobile App</Link>
              <Link to="/integration">Hospital Integration</Link>
              <Link to="/api">Stock API</Link>
            </div>
            <div className="footer-contact-col">
              <h4>CONTACT</h4>
              <div className="contact-link"><Mail size={16}/> logistics@donorhub.org</div>
              <div className="contact-link"><Phone size={16}/> +1 (800) VITAL-BLOOD</div>
            </div>
          </div>
          <div className="footer-bottom-bar">
            <span className="copy-text">© 2026 DonorHub Medical Logistics. All rights reserved.</span>
            <div className="legal-links">
              <Link to="/privacy">Privacy Protocol</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/access">Accessibility</Link>
            </div>
          </div>
        </footer>
      ) : (
        <footer className="admin-footer">
          <div className="footer-left-side">
            <span className="footer-logo">DONORHUB.</span>
            <p className="footer-copyright">© 2026 BACKROW LABS. ALL RIGHTS RESERVED.</p>
          </div>
          <div className="footer-right-links">
            <Link to="/contact">CONTACT US</Link>
            <Link to="/privacy">PRIVACY POLICY</Link>
            <Link to="/terms">TERMS OF SERVICE</Link>
            <Link to="/faq">FAQ</Link>
          </div>
        </footer>
      )}
    </div>
  );
}