import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Search, MoreVertical, ChevronDown, X } from 'lucide-react';
import '../styles/user-record.css';

export default function AdminUserRecords() {
  const [users, setUsers] = useState([]);
  const [localSearch, setLocalSearch] = useState("");
  const [bloodFilter, setBloodFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("Any Status");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;

  // UI States
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const menuRef = useRef(null);
  const API_URL = 'http://127.0.0.1:8000/request';

  // 1. FETCH DATA FROM BACKEND
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch (err) {
      console.error("Backend Connection Error:", err);
      setUsers([]); // Clear list on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 2. ADD OR EDIT RECORD
  const handleAddOrEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      role: formData.get('role'),
      blood: formData.get('blood'),
      status: editingUser ? editingUser.status : "Active"
    };

    try {
      if (editingUser) {
        // UPDATE existing record
        await axios.put(`${API_URL}/${editingUser.id}`, userData);
      } else {
        // CREATE new record
        await axios.post(API_URL, userData);
      }
      fetchUsers(); // Refresh the list
      setIsModalOpen(false);
      setEditingUser(null);
    } catch (err) {
      alert("Failed to save record. Check backend connection.");
    }
  };

  // 3. CHANGE STATUS (Utility Menu)
  const handleToggleStatus = async (id, newStatus) => {
    try {
      await axios.patch(`${API_URL}/${id}`, { status: newStatus });
      setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
      setOpenMenuId(null);
    } catch (err) {
      console.error("Status update failed");
    }
  };

  // 4. DELETE RECORD
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers(users.filter(u => u.id !== id));
      setOpenMenuId(null);
    } catch (err) {
      alert("Delete failed.");
    }
  };

  // FRONTEND FILTERING & PAGINATION
  const filteredUsers = users.filter(user => {
    const nameStr = user.name?.toLowerCase() || "";
    const matchesSearch = nameStr.includes(localSearch.toLowerCase());
    const matchesBlood = bloodFilter === "All Types" || user.blood === bloodFilter;
    const matchesStatus = statusFilter === "Any Status" || user.status === statusFilter;
    return matchesSearch && matchesBlood && matchesStatus;
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  if (isLoading) return <div className="admin-loader">Connecting to Central Database...</div>;

  return (
    <div className="user-records-container">
      <div className="user-page-header">
        <div className="header-text">
          <h1>Community Records</h1>
          <p>Oversee the life-saving network of donors, seekers, and administrators across the DonorHub ecosystem.</p>
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
            <select value={bloodFilter} onChange={(e) => setBloodFilter(e.target.value)}>
              <option>All Types</option>
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <ChevronDown size={14} />
          </div>
        </div>
        <div className="filter-dropdown-card">
          <label>STATUS</label>
          <div className="select-wrapper">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option>Any Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Inactive</option>
            </select>
            <ChevronDown size={14} />
          </div>
        </div>
      </section>

      <section className="user-table-card">
        <div className="table-header-grid">
          <div>USER IDENTITY</div>
          <div>CLASSIFICATION</div>
          <div>VITAL SIGN</div>
          <div>INTEGRITY</div>
          <div className="text-right">UTILITY</div>
        </div>

        <div className="table-rows">
          {currentUsers.length === 0 ? (
            <div className="empty-state">No records found in database.</div>
          ) : (
            currentUsers.map((user) => (
              <div key={user.id} className="table-row-grid">
                <div className="user-identity-cell">
                  <div className="user-avatar-navy">{user.name?.charAt(0)}</div>
                  <div className="user-info">
                    <span className="user-name">{user.name}</span>
                    <span className="user-email">{user.email}</span>
                  </div>
                </div>
                <div><span className={`role-pill ${user.role?.toLowerCase()}`}>{user.role}</span></div>
                <div><span className="blood-box-pink">{user.blood}</span></div>
                <div className="integrity-cell">
                  <span className={`dot ${user.status?.toLowerCase()}`}>●</span>
                  <span className="status-text">{user.status}</span>
                </div>
                <div className="utility-cell text-right">
                  <button className="btn-more" onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}>
                    <MoreVertical size={18} />
                  </button>
                  {openMenuId === user.id && (
                    <div className="floating-menu" ref={menuRef}>
                      <button onClick={() => { setEditingUser(user); setIsModalOpen(true); setOpenMenuId(null); }}>Edit Profile</button>
                      <button onClick={() => handleToggleStatus(user.id, "Active")}>Set Active</button>
                      <button onClick={() => handleToggleStatus(user.id, "Inactive")}>Set Inactive</button>
                      <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete Record</button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="table-footer-pagination">
          <span>Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} members</span>
          <div className="pagination-controls">
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>&lt;</button>
            {[1, 2, 3].map(num => (
              <button 
                key={num} 
                className={currentPage === num ? "active" : ""} 
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            ))}
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, 3))}>&gt;</button>
          </div>
        </div>
      </section>

      {/* ADD/EDIT MODAL */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingUser ? "Edit Profile" : "Add New Record"}</h2>
              <button className="close-x" onClick={() => setIsModalOpen(false)}><X size={20}/></button>
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
              <div className="form-row">
                <div className="form-group">
                  <label>Role</label>
                  <select name="role" defaultValue={editingUser?.role || "DONOR"}>
                    <option value="DONOR">DONOR</option>
                    <option value="SEEKER">SEEKER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Blood Type</label>
                  <select name="blood" defaultValue={editingUser?.blood || "O+"}>
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <button type="submit" className="submit-btn">{editingUser ? "Update Profile" : "Create Record"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}