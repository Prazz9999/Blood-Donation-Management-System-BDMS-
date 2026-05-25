import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Info } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";

export default function DonorNav() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="donor-topbar">
      {/* Brand Identity Branding Logo Anchor */}
      <Link className="brand" to="/">DONORHUB</Link>
      
      {/* Changed to an explicit div container to bypass global `.ui-page nav` rules */}
      <div className="donor-nav-links">
        <Link to="/donation">Donate</Link>
        <Link to="/request">Request</Link>
        <Link className="active" to="/dashboard">Dashboard</Link>
      </div>
      
      {/* Consolidated Right Action Controls Row */}
      <div className="right-actions">
        <Link className="btn small primary" to="/donation">Donate Now</Link>
        
        <div className="notification-trigger-wrapper" style={{ position: 'relative' }}>
          <button 
            className="icon-btn" 
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Toggle notifications"
          >
            <Bell size={20} />
          </button>
          <NotificationDropdown isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
        </div>

        <Link className="icon-btn" to="/profile"><Info size={20} /></Link>
      </div>
    </header>
  );
}