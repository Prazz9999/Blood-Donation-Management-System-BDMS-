import '../styles/ui.css';

function AdminNav() {
  const openMenu = window.location.pathname === '/admin/dashboard-menu';
  return (
    <header className="site-nav admin-nav">
      <a className="brand" href="/admin/dashboard">DONORHUB</a>
      <nav>
        <a href="/admin/stock">Stock</a>
        <a href="/admin/user">User</a>
        <a href="/admin/camp">Camp</a>
        <a className="active" href="/admin/dashboard">Dashboard</a>
      </nav>
      <div className="admin-profile-anchor">
        <a className="admin-id" href="/admin/dashboard-menu"><strong>BackRow Admin</strong><span>SUPERUSER</span></a>
        <a className="avatar small dark" href="/admin/dashboard-menu">BA</a>
      </div>
      {openMenu && (
        <div className="admin-menu-pop">
          <div className="menu-head"><div className="avatar dark">BA</div><div><strong>BackRow Admin</strong><span>admin@donorshub.org</span></div></div>
          <a href="/profile">◔ User Details</a>
          <a href="#">⚙ Settings</a>
          <a className="logout" href="/login">↪ Logout</a>
        </div>
      )}
    </header>
  );
}

export default function AdminDashboard() {
  return (
    <div className="ui-page admin-page">
      <AdminNav />
      <main className="content-wrap admin-wrap">
        <div className="page-title-block">
          <h1>Vital Inventory</h1>
          <p>Real-time monitoring of blood bank reserves by DonorHub.</p>
        </div>

        <section className="stats-grid four admin-stock-cards">
          <article className="white-card blood-card"><div className="blood-head"><strong>A+</strong><span className="chip pale">NORMAL</span></div><div className="big-number">12 <span>Units</span></div><div className="progress"><span style={{width:'30%'}} /></div></article>
          <article className="soft-card blood-card outlined"><div className="blood-head"><strong>O-</strong><span className="chip red">LOW STOCK</span></div><div className="big-number critical">3 <span>Units</span></div><div className="progress"><span style={{width:'14%'}} /></div><small>△ URGENT REPLENISHMENT REQUIRED</small></article>
          <article className="white-card blood-card"><div className="blood-head"><strong>B+</strong><span className="chip pale">STABLE</span></div><div className="big-number">24 <span>Units</span></div><div className="progress brown"><span style={{width:'55%'}} /></div></article>
          <article className="white-card blood-card"><div className="blood-head"><strong>AB-</strong><span className="chip pale">LOW</span></div><div className="big-number">8 <span>Units</span></div><div className="progress"><span style={{width:'20%'}} /></div></article>
        </section>

        <section className="campaign-banner">
          <div><h2>Camp Management</h2><p>Organize and schedule new blood donation camps in your area. Boost your inventory through community outreach.</p></div>
          <a className="btn white smallish" href="/admin/camp">🗓 SCHEDULE NEW CAMP</a>
        </section>

        <section className="table-card people-card wide">
          <div className="section-top inside"><h3>Registered Personnel</h3><a className="chip pale" href="/admin/user">MANAGE USERS</a></div>
          <div className="table-head four-admin"><span>NAME</span><span>BLOOD TYPE</span><span>ROLE</span><span>STATUS</span></div>
          <div className="table-row four-admin"><span className="name-cell"><div className="avatar initials">JD</div><div><strong>Julianne Doe</strong><small>julianne@donorhub.org</small></div></span><span><span className="chip red">O+</span></span><span>Senior Administrator</span><span className="status blue">● ACTIVE</span></div>
          <div className="table-row four-admin"><span className="name-cell"><div className="avatar initials">MK</div><div><strong>Marcus Knight</strong><small>m.knight@vital.com</small></div></span><span><span className="chip red">A-</span></span><span>Inventory Manager</span><span className="status blue">● ACTIVE</span></div>
        </section>
      </main>

      <footer className="footer-shell">
        <div className="footer-brand"><div className="brand">DONORHUB.</div><p>© 2024 BACKROW LABS. ALL RIGHTS RESERVED.</p></div>
        <div className="footer-links"><a href="#">CONTACT US</a><a href="#">PRIVACY POLICY</a><a href="#">TERMS OF SERVICE</a><a href="#">FAQ</a></div>
      </footer>
    </div>
  );
}
