import '../styles/ui.css';

export default function DonorProfile() {
  return (
    <div className="ui-page profile-page">
      <header className="site-nav donor-topbar">
        <a className="brand" href="/">DONORHUB</a>
        <nav>
          <a href="/">Home</a>
          <a href="/donation">Donate</a>
          <a href="/request">Request</a>
          <a className="active" href="/dashboard">Dashboard</a>
        </nav>
        <div className="right-actions"><a className="icon-btn" href="/dashboard?notifications=1">🔔</a><a className="avatar small" href="/profile">AP</a></div>
      </header>

      <main className="content-wrap profile-wrap">
        <div className="page-title-block">
          <h1>Donor Profile</h1>
          <p>Manage your vital information and donation history.</p>
        </div>

        <section className="profile-grid">
          <article className="white-card profile-side">
            <div className="profile-photo large">AP<div className="edit-dot">✎</div></div>
            <h2>Alexander Pierce</h2>
            <div className="mini-title accent">O POSITIVE DONOR</div>
            <div className="mini-stat-block"><span>TOTAL BLOOD CONTRIBUTED</span><strong>1,800ml</strong></div>
          </article>

          <article className="white-card profile-main">
            <div className="form-grid two compact-grid">
              <div><label>FULL NAME</label><input value="Alexander Pierce" readOnly /></div>
              <div><label>EMAIL ADDRESS</label><input value="alex.pierce@healthmail.org" readOnly /></div>
              <div><label>PHONE NUMBER</label><input value="+1 (555) 0123-456" readOnly /></div>
              <div><label>BLOOD GROUP</label><select value="O Positive (O+)" readOnly><option>O Positive (O+)</option></select></div>
              <div><label>AGE</label><input value="32" readOnly /></div>
              <div><label>WEIGHT (KG)</label><input value="78" readOnly /></div>
            </div>

            <div className="last-donation-card">
              <div className="split-line"><span>LAST DONATION DATE</span><strong>October 14, 2023</strong></div>
              <div className="progress"><span style={{width:'76%'}} /></div>
              <small>Next eligibility: January 14, 2024</small>
            </div>

            <div className="profile-actions"><a className="btn primary smallish" href="#">▣ Update Profile</a></div>
          </article>
        </section>

        <section className="stats-grid four compact-stats">
          <article className="soft-card mini-info"><div>⟲</div><span>DONATIONS</span><strong>04</strong></article>
          <article className="soft-card mini-info"><div>♡</div><span>LIVES SAVED</span><strong>12</strong></article>
          <article className="soft-card mini-info"><div>✪</div><span>LEVEL</span><strong>Silver</strong></article>
          <article className="soft-card mini-info"><div>🗓</div><span>SINCE</span><strong>2021</strong></article>
        </section>
      </main>

      <footer className="footer-shell">
        <div className="footer-brand"><div className="brand">DONORHUB.</div><p>© 2024 BACKROW LABS. ALL RIGHTS RESERVED.</p></div>
        <div className="footer-links"><a href="#">CONTACT US</a><a href="#">PRIVACY POLICY</a><a href="#">TERMS OF SERVICE</a><a href="#">FAQ</a></div>
      </footer>
    </div>
  );
}
