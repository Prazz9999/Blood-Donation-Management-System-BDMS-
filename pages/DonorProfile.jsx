import React, { useState, useEffect } from "react";
import SharedDashboardNav from "../components/SharedDashboardNav";
import ProfileForm from "../components/ProfileForm";
import LegalModal from "../components/LegalModal";
import "../styles/donordashboard.css";
import "../styles/donor-profile.css";

export default function DonorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeModal, setActiveModal] = useState(null);
  
  // State variables
  const [fullName, setFullName] = useState("prazz");
  const [email, setEmail] = useState("prazzkira@gmail.com");
  const [phone, setPhone] = useState("0209209424");
  const [bloodGroup, setBloodGroup] = useState("A Negative (A-)");
  const [age, setAge] = useState("24");
  const [weight, setWeight] = useState("4");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const token = localStorage.getItem("token");

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 1);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/users/me", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {

          if (data.name) setFullName(data.name);
          if (data.email) setEmail(data.email);
          if (data.phone) setPhone(data.phone);
          if (data.blood_group) setBloodGroup(data.blood_group);
          if (data.age) setAge(data.age);

      })
      .catch(err => console.log("Using default mock values."));
  }, [token]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfileImageUrl(URL.createObjectURL(file)); 
    const formData = new FormData();
    formData.append("avatar", file);

    // Optional: Sync avatar to backend. If this fails, we still show the new avatar locally. 

    fetch("http://127.0.0.1:8000/users/update-avatar", {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}` },
      body: formData
    }).catch(err => console.log("Avatar background sync failed."));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setErrorMessage(""); 

    fetch("http://127.0.0.1:8000/users/update-profile", {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify({ fullName, email, phone, bloodGroup, age, weight })
    })
      .then(res => {
        if (res.ok) {
          setIsEditing(false); 
        } else {
          setErrorMessage("Failed to save changes. Please try again.");
        }
      })
      .catch(err => {
        setErrorMessage("⚠️ Connection error: Changes saved locally, but server is offline.");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="dp-page-wrapper">
      <SharedDashboardNav activePage="profile" />
      
      <main className="dp-main-container">
        <header className="dp-page-header">
          <h1>Donor Profile</h1>
          <p>Manage your vital information and donation history.</p>
        </header>
        
        <div className="dp-content-split">
          {/* LEFT SIDEBAR */}
          <aside className="dp-sidebar-card">
            <div className="dp-avatar-section">
              <div className="dp-avatar-ring">
                {profileImageUrl ? (
                  <img src={profileImageUrl} alt="User Profile" />
                ) : (
                  <div className="dp-avatar-initials-fallback">{getInitials(fullName)}</div>
                )}
                <label htmlFor="file-input" className="dp-edit-avatar-btn">✎</label>
                <input id="file-input" type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: "none" }} />
              </div>
              <h2>{fullName}</h2>
              <p>{bloodGroup.toUpperCase()} DONOR</p>
            </div>
            <div className="dp-contribution-box">
              <span className="dp-stat-label">TOTAL BLOOD CONTRIBUTED</span>
              <div className="dp-stat-value">1,800<span>ml</span></div>
            </div>
          </aside>

          {/* LINKED PROFILE FORM COMPONENT */}
          <ProfileForm 
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            bloodGroup={bloodGroup}
            setBloodGroup={setBloodGroup}
            age={age}
            setAge={setAge}
            weight={weight}
            setWeight={setWeight}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            handleSaveProfile={handleSaveProfile}
          />
        </div>

        {/* METRICS ROW */}
        <section className="dp-stats-row">
          <div className="dp-stat-block"><div>⏱️</div><span>DONATIONS</span><strong>04</strong></div>
          <div className="dp-stat-block"><div>❤️</div><span>LIVES SAVED</span><strong>12</strong></div>
          <div className="dp-stat-block"><div>🎖️</div><span>LEVEL</span><strong>Silver</strong></div>
          <div className="dp-stat-block"><div>📅</div><span>SINCE</span><strong>2021</strong></div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer-shell">
        <div className="footer-brand">
          <div className="brand">DONORHUB.</div>
          <p>© 2026 BACKROW LABS. ALL RIGHTS RESERVED.</p>
        </div>
        <div className="footer-links">
          <button className="footer-modal-trigger-btn" onClick={() => setActiveModal('contact')}>CONTACT US</button>
          <button className="footer-modal-trigger-btn" onClick={() => setActiveModal('privacy')}>PRIVACY POLICY</button>
          <button className="footer-modal-trigger-btn" onClick={() => setActiveModal('terms')}>TERMS OF SERVICE</button>
          <button className="footer-modal-trigger-btn" onClick={() => setActiveModal('faq')}>FAQ</button>
        </div>
      </footer>
      <LegalModal activeModal={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}