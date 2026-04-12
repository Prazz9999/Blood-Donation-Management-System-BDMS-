import '../styles/ui.css';

function AdminNav() {
  return (
    <header className="site-nav admin-nav soft-top">
      <a className="brand" href="/admin/dashboard">DonorHub</a>
      <nav>
        <a href="/admin/dashboard">Dashboard</a>
        <a href="/admin/user">User</a>
        <a className="active" href="/admin/camp">Camp</a>
        <a href="/admin/stock">Stock</a>
      </nav>
      <div className="right-actions"><a className="icon-btn" href="#">🔔</a><a className="icon-btn" href="/admin/dashboard">◎</a></div>
    </header>
  );
}

export default function AdminCamp() {
  return (
    <div className="ui-page admin-page soft-admin-bg">
      <AdminNav />
      <main className="content-wrap admin-wrap camp-wrap">
        <div className="split-header">
          <div className="page-title-block"><div className="mini-title accent">VITAL CONTROL CENTER</div><h1>Camp Management</h1><p>Orchestrate life-saving opportunities. Manage locations, logistics, and donor outreach for upcoming blood drives.</p></div>
          <a className="btn primary smallish" href="#">⊕ Schedule New Camp</a>
        </div>

        <section className="section-top tighter tabs-line"><h3>Active Schedule</h3><div className="tab-switch"><button className="active">UPCOMING</button><button>PAST CAMPS</button></div></section>

        <section className="camp-layout">
          <div className="camp-cards">
            <article className="camp-card active-border"><div className="date-tile"><strong>24</strong><span>OCT</span></div><div className="camp-main"><div className="camp-meta"><span className="chip blue">HIGH PRIORITY</span><span>◷ 09:00 AM - 04:00 PM</span></div><h3>St. Mary&apos;s Community Hall</h3><p>⌖ Central District, Downtown &nbsp;&nbsp; ⌁ 124 Registered Donors</p></div><div className="camp-actions">✎<br/>⋮</div></article>
            <article className="camp-card"><div className="date-tile"><strong>28</strong><span>OCT</span></div><div className="camp-main"><div className="camp-meta"><span>◷ 10:30 AM - 06:00 PM</span></div><h3>Corporate Plaza Tower B</h3><p>⌖ North Industrial Park &nbsp;&nbsp; ⌁ 85 Registered Donors</p></div><div className="camp-actions">✎<br/>⋮</div></article>
            <article className="camp-card"><div className="date-tile"><strong>02</strong><span>NOV</span></div><div className="camp-main"><div className="camp-meta"><span>◷ 08:00 AM - 02:00 PM</span></div><h3>Green Valley High School</h3><p>⌖ Suburban East &nbsp;&nbsp; ⌁ 42 Registered Donors</p></div><div className="camp-actions">✎<br/>⋮</div></article>
          </div>

          <aside className="camp-side">
            <div className="soft-card logistics-card"><h3>Upcoming Logistics</h3><div className="log-row"><div className="icon-box small">🚚</div><div><strong>Mobile Unit 42 Maintenance</strong><span>Due in 2 days</span></div></div><div className="log-row"><div className="icon-box small">▣</div><div><strong>Refill Storage Kits</strong><span>15 units needed for St. Mary&apos;s</span></div></div><div className="log-row"><div className="icon-box small">⌘</div><div><strong>Volunteer Assignment</strong><span>3 staff members pending</span></div></div></div>
            <div className="photo-alert-card"><div className="mini-title">INVENTORY ALERT</div><h4>O-Negative Supply Low</h4><p>Prioritize outreach for upcoming camps.</p></div>
          </aside>
        </section>
      </main>

      <footer className="footer-shell admin-footer-panel">
        <div className="footer-brand"><div className="brand">DonorHub</div><p>Streamlining the vital link between generous donors and the healthcare systems that need them most. Precision logistics for human kindness.</p></div>
        <div className="footer-columns tight"><div><strong>PLATFORM</strong><a href="#">Admin Portal</a><a href="#">Donor Mobile App</a><a href="#">Hospital Integration</a><a href="#">Stock API</a></div><div><strong>CONTACT</strong><a href="#">✉ logistics@donorhub.org</a><a href="#">☏ +1 (800) VITAL-BLOOD</a></div></div>
      </footer>
    </div>
  );
}
