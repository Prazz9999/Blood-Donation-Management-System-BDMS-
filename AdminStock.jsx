import '../styles/ui.css';

function AdminNav() {
  return (
    <header className="site-nav admin-nav soft-top">
      <a className="brand" href="/admin/dashboard">DonorHub</a>
      <nav>
        <a href="/admin/dashboard">Dashboard</a>
        <a className="active" href="/admin/stock">Stock</a>
        <a href="/admin/user">User</a>
        <a href="/admin/camp">Camp</a>
      </nav>
      <div className="right-actions"><div className="search-bar small-search">⌕ Search inventory...</div><a className="icon-btn" href="#">🔔</a><a className="icon-btn" href="#">⚙</a><a className="avatar small dark" href="/admin/dashboard">BA</a></div>
    </header>
  );
}

export default function AdminStock() {
  return (
    <div className="ui-page admin-page">
      <AdminNav />
      <main className="content-wrap admin-wrap wide-gap">
        <div className="split-header">
          <div className="page-title-block"><div className="mini-title accent">INVENTORY MANAGEMENT</div><h1>Stock Vitality</h1><p>Real-time oversight of life-saving assets. Monitor blood group distribution, track expiration timelines, and manage critical reserves.</p></div>
          <div className="button-row"><a className="btn primary smallish" href="#">＋ Add New Batch</a><a className="btn soft smallish" href="#">Export Report</a></div>
        </div>

        <section className="stock-summary-grid">
          <article className="soft-card summary-alert"><div><span>Critical Reserves</span><strong>12% <small>Low Inventory Alert</small></strong><p>O- and AB+ groups require immediate replenishment.</p></div><div className="warning-art">!</div></article>
          <article className="white-card summary-box"><span>Total Units</span><strong>2,480 <small>ml</small></strong><p className="up">↗ +5.2% from last month</p></article>
          <article className="white-card summary-box"><span>Upcoming Expirations</span><strong>14 <small>batches</small></strong><p className="danger-text">◌ Action required in 48h</p></article>
        </section>

        <section className="table-card inventory-table">
          <div className="section-top inside"><h3>Inventory Details</h3><div className="filter-icons">☰ ☷</div></div>
          <div className="table-head inventory-grid"><span>BLOOD TYPE</span><span>INVENTORY STATUS</span><span>UNITS AVAILABLE</span><span>COLLECTION DATE</span><span>EXPIRY DATE</span></div>
          <div className="table-row inventory-grid"><span><span className="blood-box">A+</span></span><span><div className="progress status-bar"><span style={{width:'84%'}} /></div><small>HEALTHY SUPPLY</small></span><span><strong>850 ml</strong></span><span>Oct 24, 2023</span><span>Nov 28, 2023</span></div>
          <div className="table-row inventory-grid"><span><span className="blood-box">O-</span></span><span><div className="progress status-bar"><span style={{width:'12%'}} /></div><small className="danger-text">LOW STOCK ALERT ⓘ</small></span><span><strong className="danger-text">120 ml</strong></span><span>Oct 26, 2023</span><span className="danger-text">Nov 15, 2023</span></div>
          <div className="table-row inventory-grid"><span><span className="blood-box">B+</span></span><span><div className="progress status-bar"><span style={{width:'62%'}} /></div><small>SUFFICIENT</small></span><span><strong>620 ml</strong></span><span>Oct 22, 2023</span><span>Nov 25, 2023</span></div>
          <div className="table-row inventory-grid"><span><span className="blood-box">AB-</span></span><span><div className="progress status-bar"><span style={{width:'40%'}} /></div><small>MODERATE</small></span><span><strong>400 ml</strong></span><span>Oct 25, 2023</span><span>Nov 30, 2023</span></div>
          <div className="table-row inventory-grid"><span><span className="blood-box">AB+</span></span><span><div className="progress status-bar"><span style={{width:'10%'}} /></div><small className="danger-text">CRITICAL STOCK ⓘ</small></span><span><strong className="danger-text">90 ml</strong></span><span>Oct 28, 2023</span><span className="danger-text">Nov 10, 2023</span></div>
          <div className="inventory-footer"><span>SHOWING 5 OF 8 BLOOD GROUPS</span><div><span>‹Previous</span><strong>Next›</strong></div></div>
        </section>

        <section className="storage-grid">
          <div><h2>Storage Conditions</h2><div className="mini-storage-grid"><article className="white-card climate-box"><div className="climate-icon blue">🌡</div><div><strong>2.4°C</strong><span>COOLER 01 TEMP</span></div></article><article className="white-card climate-box"><div className="climate-icon red">◔</div><div><strong>42%</strong><span>FACILITY HUMIDITY</span></div></article></div></div>
          <article className="white-card dispatch-box"><div className="mini-title accent">EMERGENCY DISPATCH</div><h3>Request urgent delivery from Central Hub</h3><a className="btn dark smallish" href="#">Initiate Protocol</a></article>
        </section>
      </main>
    </div>
  );
}
