import { useState } from 'react';
import { Calendar, MapPin, Users, Plus, Pencil, MoreVertical, Truck, Box, UserCheck, X } from 'lucide-react';
import '../styles/admincamp.css';

export default function AdminCamp() {
  const [activeTab, setActiveTab] = useState('UPCOMING');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [camps, setCamps] = useState([
    { id: 1, day: "24", month: "OCT", title: "St. Mary's Community Hall", location: "Central District, Downtown", donors: 124, time: "09:00 AM - 04:00 PM", status: "HIGH PRIORITY", type: "UPCOMING" },
    { id: 2, day: "28", month: "OCT", title: "Corporate Plaza Tower B", location: "North Industrial Park", donors: 85, time: "10:30 AM - 06:00 PM", status: "", type: "UPCOMING" },
    { id: 3, day: "02", month: "NOV", title: "Green Valley High School", location: "Suburban East", donors: 42, time: "08:00 AM - 02:00 PM", status: "", type: "UPCOMING" },
  ]);

  const [newCamp, setNewCamp] = useState({ title: '', location: '', day: '', month: '' });

  const handleAddCamp = (e) => {
    e.preventDefault();
    const campToAdd = {
      id: Date.now(),
      day: newCamp.day,
      month: newCamp.month.toUpperCase(),
      title: newCamp.title,
      location: newCamp.location,
      donors: 0,
      time: "09:00 AM - 05:00 PM",
      type: "UPCOMING",
      status: "NEWLY ADDED"
    };
    setCamps([campToAdd, ...camps]);
    setIsModalOpen(false);
    setNewCamp({ title: '', location: '', day: '', month: '' });
  };

  return (
    <div className="camp-page-container">
      
      {/* 1. HEADER SECTION */}
      <div className="camp-page-header">
        <div className="header-text">
          <span className="mini-label">VITAL CONTROL CENTER</span>
          <h1>Camp Management</h1>
          <p>Orchestrate life-saving opportunities. Manage locations, logistics, and donor outreach for upcoming blood drives.</p>
        </div>
        <button className="btn-schedule-red" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Schedule New Camp
        </button>
      </div>

      {/* 2. TAB NAVIGATION */}
      <div className="active-schedule-bar">
        <h3>Active Schedule</h3>
        <div className="tab-group">
          <button className={`tab-btn ${activeTab === 'UPCOMING' ? 'active' : ''}`} onClick={() => setActiveTab('UPCOMING')}>UPCOMING</button>
          <button className={`tab-btn ${activeTab === 'PAST' ? 'active' : ''}`} onClick={() => setActiveTab('PAST')}>PAST CAMPS</button>
        </div>
      </div>

      {/* 3. MAIN LAYOUT */}
      <div className="camp-main-layout">
        <div className="camp-cards-list">
          {camps.filter(c => c.type === activeTab).map(camp => (
            <article key={camp.id} className="camp-entry-card">
              <div className="date-tile">
                <span className="d-day">{camp.day}</span>
                <span className="d-month">{camp.month}</span>
              </div>
              
              <div className="camp-info-main">
                <div className="info-top-row">
                  {camp.status && <span className="priority-badge">{camp.status}</span>}
                  <span className="time-text">◷ {camp.time}</span>
                </div>
                <h3>{camp.title}</h3>
                <div className="info-bottom-row">
                  <span className="loc-item"><MapPin size={14}/> {camp.location}</span>
                  <span className="donor-item"><Users size={14}/> {camp.donors} Registered Donors</span>
                </div>
              </div>

              <div className="camp-entry-actions">
                <button className="action-btn" onClick={() => alert(`Editing ${camp.title}...`)}><Pencil size={18} /></button>
                <button className="action-btn" onClick={() => alert(`Showing options for ${camp.title}...`)}><MoreVertical size={18} /></button>
              </div>
            </article>
          ))}
        </div>

        {/* SIDEBAR */}
        <aside className="camp-sidebar">
          <div className="sidebar-card logistics">
            <h3>Upcoming Logistics</h3>
            <div className="logistics-item">
              <div className="log-icon icon-red"><Truck size={18}/></div>
              <div className="log-text"><strong>Mobile Unit 42 Maintenance</strong><span>Due in 2 days</span></div>
            </div>
            <div className="logistics-item">
              <div className="log-icon icon-blue"><Box size={18}/></div>
              <div className="log-text"><strong>Refill Storage Kits</strong><span>15 units needed</span></div>
            </div>
            <div className="logistics-item">
              <div className="log-icon icon-pink"><UserCheck size={18}/></div>
              <div className="log-text"><strong>Volunteer Assignment</strong><span>3 staff pending</span></div>
            </div>
          </div>
          <div className="sidebar-card alert-banner">
             <div className="alert-content">
                <span className="alert-label">INVENTORY ALERT</span>
                <h4>O-Negative Supply Low</h4>
                <p>Prioritize outreach for upcoming camps.</p>
             </div>
          </div>
        </aside>
      </div>

      {/* 4. POLISHED MODAL [Matches image_6fbaca.png requirements] */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Schedule New Blood Drive</h2>
              <button className="close-x" onClick={() => setIsModalOpen(false)}><X size={20}/></button>
            </div>
            <form onSubmit={handleAddCamp}>
              <div className="form-group">
                <label>Camp Title</label>
                <input type="text" placeholder="e.g. City Mall Drive" required value={newCamp.title} onChange={(e) => setNewCamp({...newCamp, title: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input type="text" placeholder="Street name, District" required value={newCamp.location} onChange={(e) => setNewCamp({...newCamp, location: e.target.value})} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Day</label>
                  <input type="text" placeholder="25" required value={newCamp.day} onChange={(e) => setNewCamp({...newCamp, day: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Month</label>
                  <input type="text" placeholder="DEC" required value={newCamp.month} onChange={(e) => setNewCamp({...newCamp, month: e.target.value})} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-confirm-red">Confirm Schedule</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}