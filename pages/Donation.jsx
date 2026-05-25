import { useState, useEffect, useRef } from 'react'; // Added useEffect and useRef
import { useNavigate, Link } from 'react-router-dom';
import { Bell, CheckCircle } from "lucide-react";
import NotificationDropdown from "../components/NotificationDropdown";

// CRITICAL: Make sure this path exactly matches where your CSS file is!
import '../styles/donation.css'; 

export default function Donation() {
  const navigate = useNavigate();
  const [healthStatus, setHealthStatus] = useState({ recentDonation: null, medication: null, travel: "" });

  // NEW: Notification State
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null);

  // Close notification dropdown when clicking anywhere else on the screen
  useEffect(() => {
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (healthStatus.recentDonation === null || healthStatus.medication === null) {
      alert("Please answer Yes or No to the health questions before submitting.");
      return;
    }
    alert("Donation Request Submitted!");
    navigate('/dashboard');
  };

  return (
    <div className="donation-page">
      <header className="form-navbar">
        <Link className="brand" to="/">DONORHUB</Link>
        <nav className="center-links">
          <Link to="/">Home</Link>
          <Link to="/donation" className="active">Donate</Link>
          <Link to="/request">Request</Link>
        </nav>
        <div className="nav-right">
          
          {/* FIXED: Notification Bell Wrapper */}
          <div className="notif-wrapper" style={{ position: 'relative' }}>
            <button className="icon-btn" onClick={() => setIsNotifOpen(!isNotifOpen)}>
              <Bell size={22} strokeWidth={2} color="#C92A2A" />
            </button>
            <NotificationDropdown isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
          </div>

        </div>
      </header>
      
      <main className="donation-container">
        <div className="donation-header">
          <h1>Donation Request</h1>
          <p>Complete the vital information to begin your life-saving journey.</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* SECTION 1: DONOR INFO */}
          <section className="form-section-card border-red">
            <div className="section-title">
              <span className="step-circle filled">1</span>
              <h2>Donor Info</h2>
            </div>
            
            <div className="input-grid">
              <div className="input-block">
                <label>FULL NAME</label>
                <input placeholder=" Full name" required />
              </div>
              <div className="input-block">
                <label>BLOOD TYPE</label>
                <select required>
                  <option value="">Select Type</option>
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="input-block">
                <label>HEIGHT (CM)</label>
                <input type="number" placeholder="175" />
              </div>
              <div className="input-block">
                <label>WEIGHT (KG)</label>
                <input type="number" placeholder="70" />
              </div>
              <div className="input-block">
                <label>EMAIL ADDRESS</label>
                <input type="email" placeholder="name@gmail.com" required />
              </div>
              <div className="input-block">
                <label>DATE OF BIRTH</label>
                <input type="text" placeholder="mm/dd/yyyy" required />
              </div>
            </div>
            
            <div className="input-block full-width mt-1rem">
              <label>FULL ADDRESS</label>
              <input placeholder="123 Vital St, Medical District, City" required />
            </div>
            <div className="input-block full-width mt-1rem">
              <label>PREFERRED DONATION LOCATION</label>
              <select required>
                <option value="">Select Location (Hospital or Landmark)</option>
                <option>Central General Hospital</option>
                <option>Red Cross Station A</option>
              </select>
            </div>
          </section>

          {/* SECTION 2: HEALTH QUESTIONS */}
          <section className="form-section-card pink-bg mt-2rem">
            <div className="section-title">
              <span className="step-circle outlined">2</span>
              <h2>Health Questions</h2>
            </div>
            
            <div className="white-question-box">
              <span>Have you donated blood in the last 8 weeks?</span>
              <div className="toggle-group">
                <button type="button" className={healthStatus.recentDonation === true ? 'active' : ''} onClick={() => setHealthStatus({...healthStatus, recentDonation: true})}>Yes</button>
                <button type="button" className={healthStatus.recentDonation === false ? 'active' : ''} onClick={() => setHealthStatus({...healthStatus, recentDonation: false})}>No</button>
              </div>
            </div>

            <div className="white-question-box">
              <span>Are you currently taking any prescription medication?</span>
              <div className="toggle-group">
                <button type="button" className={healthStatus.medication === true ? 'active' : ''} onClick={() => setHealthStatus({...healthStatus, medication: true})}>Yes</button>
                <button type="button" className={healthStatus.medication === false ? 'active' : ''} onClick={() => setHealthStatus({...healthStatus, medication: false})}>No</button>
              </div>
            </div>

            <div className="white-question-box flex-col">
              <span>Any recent travel outside the country (within 6 months)?</span>
              <input type="text" placeholder="List countries and dates if applicable..." value={healthStatus.travel} onChange={(e) => setHealthStatus({...healthStatus, travel: e.target.value})} />
            </div>
          </section>

          <div className="form-footer">
            <label className="agree-checkbox">
              <input type="checkbox" required />
              <span>I agree to the terms and conditions and confirm my information is vital and accurate.</span>
            </label>
            <button type="submit" className="submit-form-btn">Submit Donation Request</button>
          </div>
        </form>
      </main>

      <footer className="form-footer-nav">
        <div className="footer-brand">
          <strong>DONORHUB.</strong>
          <p>© 2026 BACKROW LABS. ALL RIGHTS RESERVED.</p>
        </div>
        <div className="footer-links">
          <Link to="#">CONTACT US</Link>
          <Link to="#">PRIVACY POLICY</Link>
          <Link to="#">TERMS OF SERVICE</Link>
          <Link to="#">FAQ</Link>
        </div>
      </footer>
    </div>
  );
}