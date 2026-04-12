import '../styles/ui.css';

function AdminNav() {
  return (
    <header className="site-nav admin-nav soft-top">
      <a className="brand" href="/admin/dashboard">DonorHub</a>
      <nav>
        <a href="/admin/dashboard">Dashboard</a>
        <a className="active" href="/admin/user">User</a>
        <a href="/admin/camp">Camp</a>
        <a href="/admin/stock">Stock</a>
      </nav>
      <div className="right-actions"><div className="search-bar small-search">⌕ Quick search...</div><a className="icon-btn" href="#">🔔</a><a className="icon-btn" href="/admin/dashboard">◎</a></div>
    </header>
  );
}

export default function AdminUserRecords() {
  return (
    <div className="ui-page admin-page soft-admin-bg">
      <AdminNav />
      <main className="content-wrap admin-wrap wide-gap">
        <div className="split-header">
          <div className="page-title-block"><h1>Community Records</h1><p>Oversee the life-saving network of donors, seekers, and administrators across the DonorHub ecosystem.</p></div>
          <a className="btn primary smallish" href="#">Add New Record</a>
        </div>

        <section className="filter-grid">
          <div className="filter-box grow">⌕ Filter by name, email, or ID...</div>
          <div className="filter-box"><small>BLOOD TYPE</small><strong>All Types</strong><span>⌄</span></div>
          <div className="filter-box"><small>STATUS</small><strong>Any Status</strong><span>⌄</span></div>
        </section>

        <section className="table-card huge-table">
          <div className="table-head user-grid"><span>USER IDENTITY</span><span>CLASSIFICATION</span><span>VITAL SIGN</span><span>INTEGRITY</span><span>UTILITY</span></div>
          <div className="table-row user-grid"><span className="name-cell"><div className="avatar dark">AT</div><div><strong>Alexander Thorne</strong><small>alex.thorne@provider.com</small></div></span><span><span className="chip blue">DONOR</span></span><span><span className="blood-box">O-</span></span><span className="status green">● Active</span><span>⋮</span></div>
          <div className="table-row user-grid"><span className="name-cell"><div className="avatar dark">ER</div><div><strong>Elena Rodriguez</strong><small>elena.r@vital.net</small></div></span><span><span className="chip pale">SEEKER</span></span><span><span className="blood-box">AB+</span></span><span className="status amber">● Pending</span><span>⋮</span></div>
          <div className="table-row user-grid"><span className="name-cell"><div className="avatar dark">MV</div><div><strong>Marcus Vane</strong><small>m.vane@donorhub.admin</small></div></span><span><span className="chip red">ADMIN</span></span><span><span className="blood-box">B+</span></span><span className="status green">● Active</span><span>⋮</span></div>
          <div className="table-row user-grid"><span className="name-cell"><div className="avatar dark">SC</div><div><strong>Sophia Chen</strong><small>s.chen@medical.org</small></div></span><span><span className="chip blue">DONOR</span></span><span><span className="blood-box">A+</span></span><span className="status gray">● Inactive</span><span>⋮</span></div>
          <div className="pagination-row"><span>Showing 4 of 2,842 community members</span><div className="pager"><button>‹</button><button className="active">1</button><button>2</button><button>3</button><button>›</button></div></div>
        </section>
      </main>

      <footer className="footer-shell admin-footer-panel">
        <div className="footer-brand"><div className="brand">DonorHub</div><p>Securing the vital lifeline of our community through technology and transparency.</p></div>
        <div className="footer-columns tight"><div><strong>SYSTEMS</strong><a href="#">Network Status</a><a href="#">API Documentation</a><a href="#">Donor Safety Protocols</a></div><div><strong>GOVERNANCE</strong><a href="#">Privacy Policy</a><a href="#">Ethics Committee</a><a href="#">Regional Compliance</a></div><div className="hotline-box"><small>EMERGENCY HOTLINE</small><strong>0-800-VITAL-HUB</strong></div></div>
      </footer>
    </div>
  );
}
