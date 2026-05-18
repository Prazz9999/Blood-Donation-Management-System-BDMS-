import { useState, useEffect } from 'react';
import axios from 'axios';
import { Filter, Menu, X } from 'lucide-react'; 
import '../styles/adminstock.css'; 

export default function AdminStock() {
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // NEW: State to control if the pop-up is visible or hidden
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchStock = async () => {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        const res = await axios.get('http://localhost:5174/api/admin/stock', config);
        setInventory(res.data);
      } catch (error) {
        setInventory([
          { id: 1, type: "A+", units: 850, collected: "Oct 24, 2023", expiry: "Nov 28, 2023" },
          { id: 2, type: "O-", units: 120, collected: "Oct 26, 2023", expiry: "Nov 15, 2023" },
          { id: 3, type: "B+", units: 620, collected: "Oct 22, 2023", expiry: "Nov 25, 2023" },
          { id: 4, type: "AB-", units: 400, collected: "Oct 25, 2023", expiry: "Nov 30, 2023" },
          { id: 5, type: "AB+", units: 90, collected: "Oct 28, 2023", expiry: "Nov 10, 2023" },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStock();
  }, []);

  const filteredInventory = inventory.filter(item => 
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatus = (units) => {
    const percentage = Math.min((units / 1000) * 100, 100);
    if (percentage < 10) return { label: "CRITICAL STOCK ⓘ", isDanger: true, isModerate: false, percentage };
    if (percentage < 20) return { label: "LOW STOCK ALERT ⓘ", isDanger: true, isModerate: false, percentage };
    if (percentage < 50) return { label: "MODERATE", isDanger: false, isModerate: true, percentage };
    return { label: "HEALTHY SUPPLY", isDanger: false, isModerate: false, percentage };
  };

  // NEW: Button Actions
  const handleAddBatchClick = () => setIsModalOpen(true); // Opens the modal
  const closeModal = () => setIsModalOpen(false); // Closes the modal
  
  const handleExport = () => alert("Downloading Inventory Report...");
  const handleDispatch = () => alert("🚨 EMERGENCY PROTOCOL INITIATED!");

  // NEW: Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Sending new batch to backend database...");
    setIsModalOpen(false); // Close the modal after submitting
  };

  if (isLoading) return <div className="admin-loader">Loading Stock Data...</div>;

  return (
    <div className="stock-page-container">
      
      {/* HEADER SECTION */}
      <div className="stock-page-header">
        <div className="stock-header-text">
          <span className="stock-mini-title">INVENTORY MANAGEMENT</span>
          <h1>Stock Vitality</h1>
          <p>Real-time oversight of life-saving assets. Monitor blood group distribution, track expiration timelines, and manage critical reserves.</p>
        </div>
        <div className="stock-header-actions">
          {/* Linked the Add Batch button to open the modal */}
          <button className="btn-add-batch" onClick={handleAddBatchClick}>+ Add New Batch</button>
          <button className="btn-export" onClick={handleExport}>Export Report</button>
        </div>
      </div>

      {/* SUMMARY GRID */}
      <section className="stock-summary-grid">
        <div className="summary-card critical-card">
          <span className="summary-label">Critical Reserves</span>
          <div className="critical-metric">
            <span className="metric-large">12%</span>
            <span className="metric-small">Low Inventory Alert</span>
          </div>
          <p>O- and AB+ groups require immediate replenishment.</p>
          <div className="bg-triangle">!</div>
        </div>
        <div className="summary-card standard-card">
          <span className="summary-label">Total Units</span>
          <div className="standard-metric">
            <span className="metric-large">{inventory.reduce((acc, curr) => acc + curr.units, 0)}</span>
            <span className="metric-unit">ml</span>
          </div>
          <p className="trend-up">↗ +5.2% from last month</p>
        </div>
        <div className="summary-card standard-card">
          <span className="summary-label">Upcoming Expirations</span>
          <div className="standard-metric">
            <span className="metric-large">14</span>
            <span className="metric-unit">batches</span>
          </div>
          <p className="trend-danger">◷ Action required in 48h</p>
        </div>
      </section>

      {/* INVENTORY TABLE */}
      <section className="stock-table-card">
        <div className="table-header-flex">
          <h2>Inventory Details</h2>
          <div className="filter-icons-group">
            <button className="square-icon-btn"><Filter size={16} /></button>
            <button className="square-icon-btn"><Menu size={16} /></button>
          </div>
        </div>

        <div className="table-grid-header">
          <div>BLOOD TYPE</div>
          <div>INVENTORY STATUS</div>
          <div>UNITS AVAILABLE</div>
          <div>COLLECTION DATE</div>
          <div>EXPIRY DATE</div>
        </div>

        <div className="table-rows-container">
          {filteredInventory.map((item) => {
            const statusInfo = getStatus(item.units);
            return (
              <div key={item.id} className="table-grid-row">
                <div>
                  <span className="blood-type-box">{item.type}</span>
                </div>
                <div className="status-cell">
                  <div className="status-progress-bg">
                    <div 
                      className={`status-progress-fill ${statusInfo.isDanger ? 'danger' : statusInfo.isModerate ? 'moderate' : 'healthy'}`} 
                      style={{ width: `${statusInfo.percentage}%` }} 
                    />
                  </div>
                  <span className={`status-label ${statusInfo.isDanger ? 'danger-text' : ''}`}>{statusInfo.label}</span>
                </div>
                <div>
                  <span className={`units-text ${statusInfo.isDanger ? 'danger-text' : ''}`}>{item.units} ml</span>
                </div>
                <div className="date-text">{item.collected}</div>
                <div className={`date-text ${statusInfo.isDanger ? 'danger-text' : ''}`}>{item.expiry}</div>
              </div>
            );
          })}
        </div>

        <div className="table-footer">
          <span>SHOWING {filteredInventory.length} OF {inventory.length} BLOOD GROUPS</span>
          <div className="pagination-group">
            <button className="page-btn disabled" disabled>‹ Previous</button>
            <button className="page-btn active">Next ›</button>
          </div>
        </div>
      </section>

      {/* STORAGE & DISPATCH GRID */}
      <section className="stock-bottom-grid">
        <div className="storage-section">
          <h2>Storage Conditions</h2>
          <div className="storage-cards-wrapper">
            <div className="storage-card">
              <div className="storage-icon icon-blue">🌡</div>
              <div className="storage-info">
                <span className="storage-val">2.4°C</span>
                <span className="storage-lbl">COOLER 01 TEMP</span>
              </div>
            </div>
            <div className="storage-card">
              <div className="storage-icon icon-red">💧</div>
              <div className="storage-info">
                <span className="storage-val">42%</span>
                <span className="storage-lbl">FACILITY HUMIDITY</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dispatch-card">
          <span className="dispatch-lbl">EMERGENCY DISPATCH</span>
          <h3 className="dispatch-title">Request urgent delivery from Central Hub</h3>
          <button className="btn-dispatch-black" onClick={handleDispatch}>Initiate Protocol</button>
        </div>
      </section>

      {/* ==================== NEW POP-UP MODAL ==================== */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Blood Batch</h2>
              <button className="close-btn" onClick={closeModal}><X size={20} /></button>
            </div>
            <form onSubmit={handleFormSubmit} className="modal-form">
              <div className="form-group">
                <label>Blood Type</label>
                <select required>
                  <option value="">Select Type...</option>
                  <option value="A+">A+</option>
                  <option value="O-">O-</option>
                  <option value="B+">B+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              <div className="form-group">
                <label>Units (ml)</label>
                <input type="number" placeholder="e.g. 450" required />
              </div>
              <div className="form-group">
                <label>Collection Date</label>
                <input type="date" required />
              </div>
              <button type="submit" className="submit-batch-btn">Save Batch Data</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}