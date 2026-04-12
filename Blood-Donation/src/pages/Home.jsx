import '../styles/ui.css';

function PublicNav({ active }) {
  return (
    <header className="site-nav public-nav">
      <a className="brand" href="/">DONORHUB</a>
      <nav>
        <a className={active === 'home' ? 'active' : ''} href="/">Home</a>
        <a className={active === 'donate' ? 'active' : ''} href="/donation">Donate</a>
        <a className={active === 'request' ? 'active' : ''} href="/request">Request</a>
        <a className="pill danger" href="/request">Emergency</a>
      </nav>
    </header>
  );
}

function PublicFooter() {
  return (
    <footer className="footer-shell">
      <div className="footer-brand">
        <div className="brand">DONORHUB.</div>
        <p>© 2024 BACKROW LABS. ALL RIGHTS RESERVED.</p>
      </div>
      <div className="footer-links">
        <a href="#">CONTACT US</a>
        <a href="#">PRIVACY POLICY</a>
        <a href="#">TERMS OF SERVICE</a>
        <a href="#">FAQ</a>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="ui-page public-page">
      <PublicNav active="home" />

      <section className="hero-panel">
        <div className="hero-copy">
          <div className="eyebrow-pill">✱ EVERY DROP MATTERS</div>
          <h1>
            Donate Blood,
            <br />
            <span>Save Lives.</span>
          </h1>
          <p>
            Your contribution is the pulse of our community. Join a network of donors
            providing vital lifelines to those in urgent need. Simple, safe, and sophisticated.
          </p>
          <div className="button-row">
            <a className="btn primary" href="/signup">Become a Donor →</a>
            <a className="btn soft" href="/request">Request Blood</a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="blood-bag-art">
            <div className="tube tube-left" />
            <div className="tube tube-right" />
            <div className="bag-core" />
          </div>
          <div className="floating-stat">
            <div className="stat-icon">♥</div>
            <div>
              <strong>450ml</strong>
              <span>AVG. DONATION</span>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-grid three-up">
        <article className="soft-card feature-card">
          <div className="feature-icon">◔</div>
          <h3>DONATE</h3>
          <p>
            Schedule a convenient time at our vital centers. We ensure the most comfortable experience for our lifesavers.
          </p>
          <a href="/donation">Find a Center →</a>
        </article>

        <article className="white-card feature-card">
          <div className="feature-icon blue">⌘</div>
          <h3>REQUEST</h3>
          <p>
            Urgent need for a patient? Submit a request immediately to our priority network for rapid response.
          </p>
          <a className="blue-link" href="/request">Submit Request →</a>
        </article>

        <article className="soft-card feature-card">
          <div className="feature-icon">◫</div>
          <h3 className="accent-title">SEARCH STOCKS</h3>
          <p>
            Real-time inventory of blood types across all partner hospitals and regional blood banks.
          </p>
          <a href="/admin/stock">Live Inventory →</a>
        </article>
      </section>

      <section className="testimonial-block">
        <div className="white-card quote-card">
          <div className="stars">★★★★★</div>
          <p>
            “The process was seamless and incredibly professional. Knowing my single donation could help three different people makes the experience priceless. DonorHub makes it easy to be a hero.”
          </p>
          <div className="quote-author">
            <div className="avatar initials">JV</div>
            <div>
              <strong>Julian Vance</strong>
              <span>REGULAR DONOR</span>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
