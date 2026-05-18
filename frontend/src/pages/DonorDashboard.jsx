import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/donordashboard.css";

// --- INLINE NAVBAR (LOCKED TO MATCH UI) ---
function DashboardNavbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsProfileOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="dash-nav">
      <Link className="brand" to="/">DONORHUB</Link>
      
      <nav className="center-links">
        <Link to="/donation">Donate</Link>
        <Link to="/request">Request</Link>
        <Link to="/dashboard" className="active">Dashboard</Link>
      </nav>
      
      <div className="nav-right">
        <Link to="/donation" className="btn-donate-now">Donate Now</Link>
        <button className="icon-btn"><Bell size={20} strokeWidth={2.5} color="#1A1A1A" /></button>
        
        <div className="profile-menu-container" ref={dropdownRef}>
          <div className="nav-avatar" onClick={() => setIsProfileOpen(!isProfileOpen)}></div>
          
          {isProfileOpen && (
            <div className="profile-dropdown-menu">
              <div className="user-info-header">
                <strong>Donor User</strong>
                <span>donor@example.com</span>
              </div>
              <div className="menu-links">
                <Link to="/settings">Settings</Link>
              </div>
              <button onClick={() => navigate('/login')} className="logout-btn">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// --- INLINE MULTI-COLUMN FOOTER (LOCKED TO MATCH UI) ---
function DashboardFooter() {
  return (
    <footer className="dash-footer">
      <div className="footer-main">
        <div className="footer-brand-col">
          <div className="brand">DONORHUB.</div>
          <p>Empowering communities through life-saving donations. Your small act makes a massive impact.</p>
        </div>
        <div className="footer-links-col">
          <div className="link-group">
            <strong>COMPANY</strong>
            <Link to="#">About Us</Link>
            <Link to="#">Contact Us</Link>
            <Link to="#">Careers</Link>
          </div>
          <div className="link-group">
            <strong>RESOURCES</strong>
            <Link to="#">FAQ</Link>
            <Link to="#">Help Center</Link>
            <Link to="#">Guidelines</Link>
          </div>
          <div className="link-group">
            <strong>LEGAL</strong>
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
            <Link to="#">Cookies</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 BACKROW LABS. ALL RIGHTS RESERVED.</p>
        <div className="social-icons">
          <Twitter size={18} strokeWidth={2.5} />
          <Instagram size={18} strokeWidth={2.5} />
          <Linkedin size={18} strokeWidth={2.5} />
        </div>
      </div>
    </footer>
  );
}

// --- MAIN DASHBOARD CONTENT (YOUR LOGIC KEPT INTACT) ---
export default function DonorDashboard() {
  const [available, setAvailable] = useState(false);
  const [donorData, setDonorData] = useState(null);
  const [history, setHistory] = useState([]);
  const [camps, setCamps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      try {
        const profileRes = await fetch("http://127.0.0.1:8000/users/me", { headers });
        const profileData = await profileRes.json();
        setDonorData(profileData);
        setAvailable(profileData.is_available);

        const historyRes = await fetch("http://127.0.0.1:8000/donations/my-history", { headers });
        const historyData = await historyRes.json();
        setHistory(historyData);

        const campsRes = await fetch("http://127.0.0.1:8000/camps/upcoming");
        const campsData = await campsRes.json();
        setCamps(campsData);

      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const toggleAvailability = async () => {
    const newStatus = !available;
    setAvailable(newStatus); 

    try {
      const res = await fetch("http://127.0.0.1:8000/users/update-availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ is_available: newStatus }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with status code: ${res.status}`);
      }
      
    } catch (error) {
      console.error("Failed to save emergency availability status:", error);
      setAvailable(!newStatus); 
    }
  };

  if (isLoading) return <div className="loader">Loading Dashboard...</div>;

  return (
    <div className="dashboard-page">
      <DashboardNavbar />

      <main className="content-wrap donor-dashboard">
        <section className="dashboard-head split">
          <div>
            <h1>Welcome, {donorData?.fullName || "Donor"}!</h1>
            <p>Your contribution keeps the pulse of the community beating.</p>

            <div className="availability-toggle">
              <span>Emergency Availability</span>
              <div
                className={`toggle-pill ${available ? "active" : ""}`}
                onClick={toggleAvailability}
                style={{ cursor: "pointer" }}
              >
                <span>{available ? "✓" : "✕"}</span>
              </div>
            </div>
          </div>

          <div className="member-card">
            <div className="mini-title">MEMBER SINCE</div>
            <strong>{donorData?.memberSince || "October 2023"}</strong>
          </div>
        </section>

        <section className="stats-grid four">
          <article className="white-card metric-card">
            <div className="metric-icon">◔</div>
            <div className="metric-title">TOTAL VOLUME</div>
            <strong>{donorData?.totalDonations || 4} <span>Donations</span></strong>
          </article>

          <article className="soft-card metric-card">
            <div className="metric-icon heart">♥</div>
            <div className="metric-title">IMPACT</div>
            <strong>{donorData?.livesSaved || 12} <span>Lives Saved</span></strong>
          </article>

          <article className="white-card metric-card">
            <div className="metric-icon">🩸</div>
            <div className="metric-title">STATUS</div>
            <strong>{donorData?.bloodGroup || "2 months ago"}</strong>
          </article>

          <article className="accent-card metric-card inverse">
            <div className="metric-icon">☑</div>
            <div className="metric-title">NEXT ELIGIBILITY</div>
            <strong>{donorData?.nextEligibility || "Aug 12, 2024"}</strong>
          </article>
        </section>

        <section className="cta-grid two-wide">
          <article className="accent-card cta-card big">
            <h2>Start a Donation</h2>
            <p>Find the nearest center and book your next appointment in seconds.</p>
            <Link className="btn white smallish" to="/donation">Schedule Now →</Link>
          </article>

          <article className="soft-card cta-card">
            <h2>Request Blood</h2>
            <p>In urgent need? Raise a request for your patient or family member.</p>
            <Link className="btn primary smallish" to="/request">Request Emergency ✱</Link>
          </article>
        </section>

        <section className="lower-grid">
          <div>
            <div className="section-top">
              <h3>Donation History</h3>
              <Link to="/history">VIEW ALL</Link>
            </div>

            <div className="table-card">
              <div className="table-head five">
                <span>DATE</span>
                <span>CENTER</span>
                <span>TYPE</span>
                <span>STATUS</span>
              </div>

              {history.length > 0 ? history.map((item, index) => (
                <div className="table-row five" key={index}>
                  <span>{item.date}</span>
                  <span>{item.center}</span>
                  <span className="chip pale">{item.type}</span>
                  <span className={`status ${item.status === 'Completed' ? 'blue' : 'gray'}`}>
                    ● {item.status}
                  </span>
                </div>
              )) : <div className="p-4">No donation history found.</div>}
            </div>
          </div>

          <aside className="sidebar-panel">
            <h3>Local Donation Camps</h3>
            {camps.map((camp, index) => (
              <div className={`camp-list-card ${index % 2 === 0 ? 'teal' : 'brown'}`} key={camp.id}>
                <div className="date-badge">
                  {camp.month} <strong>{camp.day}</strong>
                </div>
                <div>
                  <strong>{camp.location}</strong>
                  <small>{camp.time} • {camp.distance}</small>
                  <Link to={`/camps/${camp.id}`}>JOIN CAMP ›</Link>
                </div>
              </div>
            ))}
          </aside>
        </section>
      </main>

      <DashboardFooter />
    </div>
  );
}