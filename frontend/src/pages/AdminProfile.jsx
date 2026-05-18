import React, { useState } from 'react';
import "../styles/adminprofile.css"; 
import { User, Mail, ShieldCheck, MapPin } from "lucide-react";

export default function AdminProfile() {
  // 1. Create state to hold the profile data
  const [profile, setProfile] = useState({
    fullName: "BackRow Admin",
    email: "admin@donorhub.org"
  });

  // 2. Handle the "Update" button click
  const handleUpdate = (e) => {
    e.preventDefault();
    alert("Profile settings synchronized with the central database successfully!");
    // In a real app, you'd send 'profile' to your FastAPI backend here
  };

  // 3. Update state as the user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="admin-profile-container">
      <div className="profile-header-section">
        <h1>Administrative Profile</h1>
        <p>Manage your account credentials, security settings, and system access levels.</p>
      </div>

      <div className="admin-profile-grid">
        {/* LEFT COLUMN: Identity Card (Now dynamic!) */}
        <div className="profile-identity-card">
          <div className="profile-avatar-navy">
            {profile.fullName.charAt(0).toUpperCase()}
          </div>
          <div className="identity-meta">
            {/* This text will now change instantly as you type */}
            <h2>{profile.fullName}</h2>
            <span className="admin-status-pill">SUPERUSER ACCESS</span>
          </div>
          <div className="identity-stats">
            <div className="stat-item">
              <span className="stat-val">Admin</span>
              <span className="stat-lbl">Role</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-val">Active</span>
              <span className="stat-lbl">Status</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Form Details */}
        <div className="profile-details-card">
          <h3>Account Information</h3>
          <form className="admin-details-form" onSubmit={handleUpdate}>
            <div className="admin-input-group">
              <label><User size={14}/> FULL NAME</label>
              <input 
                type="text" 
                name="fullName"
                value={profile.fullName} 
                onChange={handleChange}
                placeholder="Enter full name"
              />
            </div>
            
            <div className="admin-input-group">
              <label><Mail size={14}/> EMAIL ADDRESS</label>
              <input 
                type="email" 
                name="email"
                value={profile.email} 
                onChange={handleChange}
                placeholder="admin@donorhub.org"
              />
            </div>

            <div className="admin-input-row">
              <div className="admin-input-group">
                <label><ShieldCheck size={14}/> ACCESS LEVEL</label>
                <input type="text" value="Level 4 (Full Audit)" readOnly className="readonly-input" />
              </div>
              <div className="admin-input-group">
                <label><MapPin size={14}/> PRIMARY HUB</label>
                <input type="text" value="Central District" readOnly className="readonly-input" />
              </div>
            </div>

            <div className="admin-form-actions">
              <button type="submit" className="btn-update-profile-final">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}