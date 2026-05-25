import React, { useRef, useEffect, useState } from 'react';
import { X, CheckCircle, Megaphone } from 'lucide-react';
import '../styles/notification.css';

export default function NotificationDropdown({ isOpen, onClose }) {
  const dropdownRef = useRef(null);

  // --- Notification data source ---
  // Replace with real API data when available. Empty array shows the "No new updates" state.
const [notifications, setNotifications] = useState([]);

const fetchNotifications = async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000/notifications");

    const data = await res.json();

    setNotifications(data);

  } catch (error) {
    console.error("Failed to fetch notifications", error);
  }
};
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      fetchNotifications();
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="notif-dropdown-card" ref={dropdownRef}>
      <div className="notif-dropdown-header">
        <h4>NOTIFICATIONS</h4>
        <button className="notif-close-btn" onClick={onClose}><X size={14} color="#1A1A1A" /></button>
      </div>

      <div className="notif-dropdown-body">
  {notifications.length === 0 ? (
    <div className="notif-empty-state">No new updates</div>
  ) : (
    notifications.map((n) => (
      <div className="notif-item" key={n.id}>

        <div className={`notif-icon-wrapper ${n.type}`}>
          {n.type === "urgent"
            ? "!"
            : n.type === "verified"
            ? "✓"
            : "📢"}
        </div>

        <div className="notif-content">
          <p className="notif-text">{n.message}</p>
          <span className="notif-time">{n.type}</span>
        </div>

      </div>
    ))
  )}
</div>        

      <div className="notif-dropdown-footer">
        <button className="view-all-btn">VIEW ALL ACTIVITY</button>
      </div>
    </div>
  );
}
