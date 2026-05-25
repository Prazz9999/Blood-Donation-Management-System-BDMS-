import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Search, MoreVertical, ChevronDown, X, CheckCircle, AlertCircle } from 'lucide-react';
import Toast from '../components/Toast';
import '../styles/user-record.css';

export default function AdminUserRecords() {
  const [users, setUsers] = useState([]);
  const [localSearch, setLocalSearch] = useState("");
  const [bloodFilter, setBloodFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("Any Status");
  
  // Dynamic Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;

  const [openMenuId, setOpenMenuId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const menuRef = useRef(null);
  const API_URL = 'http://127.0.0.1:8000/admin/users';

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500); 
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Backend Connection Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddOrEdit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      role: formData.get('role'),
      blood: formData.get('blood'),
      status: editingUser ? editingUser.status : "Active"
    };

    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      if (editingUser) {
        await axios.put(`${API_URL}/${editingUser.id}`, userData, config);
        showToast("User updated successfully!", "success");
      } else {
        await axios.post(API_URL, userData, config);
        showToast("New user record created!", "success");
      }
      fetchUsers();
      setIsModalOpen(false);
    } catch (err) {
      showToast("Failed to save record. Check backend connection.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record permanently?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setUsers(users.filter(u => u.id !== id));
      showToast("Record deleted.", "info");
      setOpenMenuId(null);
    } catch (err) {
      showToast("Delete failed.", "error");
    }
  };

  // TASK 4 FIX: Send PATCH to correct endpoint and update local state via .map()
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      // Correct endpoint: PATCH /admin/users/{id} with { status } payload
      await axios.patch(`http://127.0.0.1:8000/admin/users/${id}/status`, { status: newStatus }, config);
      // Immediately reflect in UI without page reload
      setUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
      showToast(`Status set to ${newStatus} successfully.`, "success");
      setOpenMenuId(null);
    } catch (err) {
      console.error("Status update error:", err);
      showToast("Status update failed. Check backend connection.", "error");
    }
  };

  // --- LOGIC: FILTERING & PAGINATION ---
  // TASK 4 FIX: case-insensitive status comparison
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(localSearch.toLowerCase()) || 
                          user.email?.toLowerCase().includes(localSearch.toLowerCase());
    const matchesBlood = bloodFilter === "All Types" || 
                         (user.blood || user.bloodGroup || "") === bloodFilter;
    // Normalize both sides to handle backend returning 'active' vs filter 'Active'
    const matchesStatus = statusFilter === "Any Status" ||
                          (user.status || "").toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesBlood && matchesStatus;
  });

  // Dynamic Pagination Calculations
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage) || 1;
  const currentUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  if (isLoading) return <div className="admin-loader user-loader">Synchronizing Database...</div>;

  return (
    <div className="user-records-container">
      <Toast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />

      <div className="user-page-header">
        <div className="header-text">
          <h1>Community Records</h1>
          <p>Oversee the life-saving network across the DonorHub ecosystem.</p>
        </div>
        <button className="btn-add-record" onClick={() => { setEditingUser(null); setIsModalOpen(true); }}>
          Add New Record
        </button>
      </div>

      <section className="user-filters-row">
        <div className="filter-search-box">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Filter by name, email, or ID..." 
            value={localSearch} 
            onChange={(e) => {setLocalSearch(e.target.value); setCurrentPage(1);}} 
          />
        </div>
        
        <div className="filter-dropdown-card">
          <label>BLOOD TYPE</label>
          <div className="select-wrapper">
            <select value={bloodFilter} onChange={(e) => {setBloodFilter(e.target.value); setCurrentPage(1);}}>
              <option>All Types</option>
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <ChevronDown size={14} className="custom-arrow" />
          </div>
        </div>

        <div className="filter-dropdown-card">
          <label>STATUS</label>
          <div className="select-wrapper">
            <select value={statusFilter} onChange={(e) => {setStatusFilter(e.target.value); setCurrentPage(1);}}>
              <option>Any Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Inactive</option>
            </select>
            <ChevronDown size={14} className="custom-arrow" />
          </div>
        </div>
      </section>

      <section className="user-table-card">
        <div className="table-header-grid">
          <div>USER IDENTITY</div><div>CLASSIFICATION</div><div>VITAL SIGN</div><div>INTEGRITY</div><div className="text-right">UTILITY</div>
        </div>

        <div className="table-rows">
          {currentUsers.map((user) => (
            <div key={user.id} className="table-row-grid">
              <div className="user-identity-cell">
                <div className="avatar-square-placeholder">{user.name?.charAt(0)}</div>
                <div className="user-info">
                  <span className="user-name">{user.name}</span>
                  <span className="user-email">{user.email}</span>
                </div>
              </div>
              <div><span className={`tag ${user.role?.toLowerCase()}`}>{user.role}</span></div>
              <div><span className="blood-box-pink">{user.blood}</span></div>
              <div className="integrity-cell">
                <span className={`status-dot ${user.status?.toLowerCase()}`}>●</span>
                <span className="status-label">{user.status}</span>
              </div>
              <div className="utility-cell text-right" style={{position: 'relative'}}>
                <button className="btn-more" onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}>
                   <MoreVertical size={18} />
                </button>
                {openMenuId === user.id && (
                  <div className="floating-menu" ref={menuRef}>
                    <button onClick={() => { setEditingUser(user); setIsModalOpen(true); setOpenMenuId(null); }}>Edit Profile</button>
                    {user.status !== 'Active' && <button onClick={() => handleUpdateStatus(user.id, 'Active')}>Set Active</button>}
                    {user.status !== 'Inactive' && <button onClick={() => handleUpdateStatus(user.id, 'Inactive')}>Set Inactive</button>}
                    <button onClick={() => handleDelete(user.id)} className="delete-btn">Delete Record</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="table-footer-pagination">
          <span>
            Showing {currentUsers.length} of {filteredUsers.length} community members
          </span>
          
          <div className="pagination-controls">
            <button 
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} 
              disabled={currentPage === 1}
              className="page-btn"
            >&lt;</button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
              <button 
                key={num} 
                className={`page-btn ${currentPage === num ? "active" : ""}`} 
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} 
              disabled={currentPage === totalPages}
              className="page-btn"
            >&gt;</button>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingUser ? "Edit Profile" : "Add New Record"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="close-btn"><X size={20}/></button>
            </div>
            <form onSubmit={handleAddOrEdit}>
              <div className="form-group">
                <label>Full Name</label>
                <input name="name" defaultValue={editingUser?.name} required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input name="email" type="email" defaultValue={editingUser?.email} required />
              </div>
              <div className="form-row-split">
                  <div className="form-group form-group-split">
                    <label>Role</label>
                    <div className="select-wrapper">
                      <select name="role" defaultValue={editingUser?.role || "DONOR"}>
                        <option value="DONOR">DONOR</option><option value="SEEKER">SEEKER</option><option value="ADMIN">ADMIN</option>
                      </select>
                      <ChevronDown size={16} className="custom-arrow" />
                    </div>
                  </div>
                  <div className="form-group form-group-split">
                    <label>Blood Type</label>
                    <div className="select-wrapper">
                      <select name="blood" defaultValue={editingUser?.blood || "O+" }>
                        {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <ChevronDown size={16} className="custom-arrow" />
                    </div>
                  </div>
              </div>
              <button type="submit" className="submit-batch-btn" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Record"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}