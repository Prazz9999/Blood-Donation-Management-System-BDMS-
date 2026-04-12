import '../styles/ui.css';

function Nav() {
  return (
    <header className="site-nav public-nav donor-nav">
      <a className="brand" href="/">DONORHUB</a>
      <nav>
        <a href="/">Home</a>
        <a href="/donation">Donate</a>
        <a className="active" href="/request">Request</a>
      </nav>
      <div className="nav-icons">🔔</div>
    </header>
  );
}

export default function Request() {
  return (
    <div className="ui-page form-page">
      <Nav />
      <main className="form-shell request-shell narrow-form">
        <div className="header-icon">✚</div>
        <div className="mini-title">MEDICAL ASSISTANCE</div>
        <h1>Request Blood Support</h1>
        <p>Immediate vital resource allocation for patients in need. Please provide accurate clinical details below.</p>

        <section className="form-card plain large">
          <div className="alert-toggle">
            <div>
              <strong>⚠ Is this an emergency?</strong>
              <p>Emergency requests are processed with top priority.</p>
            </div>
            <div className="toggle-switch"><span /></div>
          </div>

          <div className="form-grid two">
            <div><label>RECIPIENT NAME</label><input placeholder="Full legal name" /></div>
            <div><label>CONTACT NUMBER</label><input placeholder="+1 (555) 000-0000" /></div>
          </div>
          <div><label>HOSPITAL NAME</label><input placeholder="Current medical facility" /></div>
          <div className="form-grid units-grid">
            <div><label>BLOOD GROUP NEEDED</label><select><option>Select Group</option></select></div>
            <div><label>UNITS NEEDED</label><input placeholder="0" /></div>
            <div className="unit-note">(450ml per unit)</div>
          </div>
          <div><label>DOCTOR/HOSPITAL RECOMMENDATION NOTES</label><div className="upload-box">☁<strong>Click to upload or drag and drop</strong><span>PDF, PNG or JPG (MAX. 5MB)</span></div></div>
          <div><label>REASON FOR REQUEST</label><textarea placeholder="Briefly explain the emergency or clinical requirement..." /></div>
          <div className="terms-panel"><strong>SERVICE TERMS & CONDITIONS</strong><ol><li>All requests are subject to verification by DonorHub clinical coordination team and hospital staff.</li><li>Blood provided is for immediate medical use only and cannot be resold or transferred.</li><li>While we strive for rapid fulfillment, stock levels are dynamic and fulfillment is not guaranteed.</li></ol></div>
          <label className="checkbox-line"><input type="checkbox" /> I certify that the information provided is accurate and I have read and agree to the <a href="#">Terms & Conditions</a>.</label>
          <a className="btn primary block" href="/dashboard">Submit Request</a>
        </section>
      </main>
      <footer className="footer-shell">
        <div className="footer-brand"><div className="brand">DONORHUB.</div><p>© 2024 BACKROW LABS. ALL RIGHTS RESERVED.</p></div>
        <div className="footer-links"><a href="#">CONTACT US</a><a href="#">PRIVACY POLICY</a><a href="#">TERMS OF SERVICE</a><a href="#">FAQ</a></div>
      </footer>
    </div>
  );
}
