import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Bell, UploadCloud } from "lucide-react";
import axios from "axios";
import "../styles/request.css"; 

export default function Request() {
  const navigate = useNavigate();
  const [isEmergency, setIsEmergency] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); 
  const [errorMessage, setErrorMessage] = useState(""); 
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsProfileOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [formData, setFormData] = useState({
    recipientName: "", contactNumber: "", hospitalName: "", 
    bloodGroup: "", unitsNeeded: "", reason: "", agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (errorMessage) setErrorMessage(""); 
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file); 
    }
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!formData.agreed) {
      setErrorMessage("Please check the declaration box to verify information accuracy.");
      return;
    }
    setIsSubmitting(true);
    setErrorMessage(""); 

    const payload = new FormData();
    payload.append("isEmergency", isEmergency);
    Object.keys(formData).forEach((key) => { payload.append(key, formData[key]); });
    if (selectedFile) { payload.append("document", selectedFile); }

    try {
      await axios.post("http://127.0.0.1:8000/api/blood-request", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage("Backend Error: Endpoint not found. Check your URL.");
      } else {
        setErrorMessage(error.message || "Failed to process request.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="request-page">
      <header className="form-navbar">
        <Link className="brand" to="/">DONORHUB</Link>
        <nav className="center-links">
          <Link to="/">Home</Link>
          <Link to="/donation">Donate</Link>
          <Link to="/request" className="active">Request</Link>
        </nav>
        <div className="nav-right">
          <button className="icon-btn"><Bell size={22} strokeWidth={2} color="#C92A2A" /></button>
          
          <div className="profile-menu-container" ref={dropdownRef}>
            <div className="nav-avatar" onClick={() => setIsProfileOpen(!isProfileOpen)}></div>
            
            {isProfileOpen && (
              <div className="profile-dropdown-menu">
                <div className="user-info-header">
                  <strong>Jane Doe</strong>
                  <span>jane@example.com</span>
                </div>
                <div className="menu-links">
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="/settings">Settings</Link>
                </div>
                <button onClick={() => navigate('/login')} className="logout-btn">Logout</button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <main className="request-container">
        <div className="request-header-center">
          <div className="medical-icon-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#C92A2A" stroke="#C92A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H10C8.89543 2 8 2.89543 8 4V6H4C2.89543 6 2 6.89543 2 8V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V8C21.1046 6.89543 21 6 20 6H16V4C16 2.89543 15.1046 2 14 2Z"/>
              <path d="M12 11V17" stroke="white" strokeWidth="3"/><path d="M9 14H15" stroke="white" strokeWidth="3"/>
            </svg>
          </div>
          <span className="red-eyebrow">MEDICAL ASSISTANCE</span>
          <h1>Request Blood Support</h1>
          <p>Immediate vital resource allocation for patients in need. Please provide accurate clinical details below.</p>
        </div>

        {errorMessage && <div className="error-banner">{errorMessage}</div>}

        <form onSubmit={handleSubmit} className="request-form-card">
          <div className="emergency-banner">
            <div className="alert-text">
              <span className="alert-icon">⚠️</span>
              <div>
                <strong>Is this an emergency?</strong>
                <p>Emergency requests are processed with top priority.</p>
              </div>
            </div>
            <label className="ios-toggle">
              <input type="checkbox" checked={isEmergency} onChange={() => setIsEmergency(!isEmergency)} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="input-grid mt-2rem">
            <div className="input-block">
              <label>RECIPIENT NAME</label>
              <input type="text" name="recipientName" value={formData.recipientName} placeholder="Full legal name" onChange={handleChange} required />
            </div>
            <div className="input-block">
              <label>CONTACT NUMBER</label>
              <input type="text" name="contactNumber" value={formData.contactNumber} placeholder="+1 (555) 000-0000" onChange={handleChange} required />
            </div>
          </div>

          <div className="input-block full-width mt-1rem">
            <label>HOSPITAL NAME</label>
            <input type="text" name="hospitalName" value={formData.hospitalName} placeholder="Current medical facility" onChange={handleChange} required />
          </div>

          <div className="input-grid unit-row mt-1rem">
            <div className="input-block">
              <label>BLOOD GROUP NEEDED</label>
              <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
                <option value="">Select Group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <div className="input-block">
              <label>UNITS NEEDED</label>
              <div className="unit-flex">
                <input type="number" name="unitsNeeded" value={formData.unitsNeeded} placeholder="0" onChange={handleChange} required />
                <span className="unit-desc">(450ml per unit)</span>
              </div>
            </div>
          </div>

          <div className="input-block full-width mt-2rem">
            <label>DOCTOR/HOSPITAL RECOMMENDATION NOTES</label>
            <div className="dashed-upload">
              <input type="file" id="file-upload" hidden onChange={handleFileUpload} accept=".pdf,.png,.jpg,.jpeg" />
              <label htmlFor="file-upload">
                <UploadCloud color="#A8A2A2" size={28} />
                <strong>{fileName || "Click to upload or drag and drop"}</strong>
                <p>PDF, PNG or JPG (MAX. 5MB)</p>
              </label>
            </div>
          </div>

          <div className="input-block full-width mt-1rem">
            <label>REASON FOR REQUEST</label>
            <textarea name="reason" value={formData.reason} placeholder="Briefly explain the emergency or clinical requirement..." rows="4" onChange={handleChange} required />
          </div>

          <div className="terms-box mt-2rem">
            <strong>SERVICE TERMS & CONDITIONS</strong>
            <ol>
              <li>All requests are subject to verification by DonorHub clinical coordination team and hospital staff.</li>
              <li>Blood provided is for immediate medical use only and cannot be resold or transferred.</li>
              <li>While we strive for rapid fulfillment, stock levels are dynamic and fulfillment is not guaranteed.</li>
            </ol>
          </div>

          <div className="form-footer mt-2rem">
            <label className="agree-checkbox left-align">
              <input type="checkbox" name="agreed" checked={formData.agreed} onChange={handleChange} /> 
              <span>
                I certify that the information provided is accurate and I have read and agree to the 
                <button type="button" className="terms-link-btn" onClick={() => setShowTerms(true)}> Terms & Conditions</button>.
              </span>
            </label>
            <button type="submit" className="submit-form-btn" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Submit Request"}
            </button>
          </div>
        </form>
      </main>

      {/* COMPACT TERMS MODAL FOR REQUEST PAGE */}
      {showTerms && (
        <div className="terms-modal-overlay" onClick={() => setShowTerms(false)}>
          <div className="terms-modal-content" onClick={e => e.stopPropagation()}>
            <h2>Terms & Conditions</h2>
            <div className="terms-text-box">
              <p>1. Requests are subject to verification by clinical staff.</p>
              <p>2. Blood is for immediate medical use only and cannot be resold.</p>
              <p>3. Fulfillment is based on dynamic stock levels and cannot be 100% guaranteed immediately.</p>
            </div>
            <button className="submit-form-btn" onClick={() => setShowTerms(false)}>Acknowledge & Close</button>
          </div>
        </div>
      )}

      <footer className="form-footer-nav">
        <div className="footer-brand">
          <strong>DONORHUB.</strong>
          <p>© 2024 BACKROW LABS. ALL RIGHTS RESERVED.</p>
        </div>
        <div className="footer-links">
          <a href="#">CONTACT US</a>
          <a href="#">PRIVACY POLICY</a>
          <a href="#">TERMS OF SERVICE</a>
          <a href="#">FAQ</a>
        </div>
      </footer>
    </div>
  );
}