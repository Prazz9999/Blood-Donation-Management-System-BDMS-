import '../styles/ui.css';

function Nav() {
  return (
    <header className="site-nav public-nav donor-nav">
      <a className="brand" href="/">DONORHUB</a>
      <nav>
        <a href="/">Home</a>
        <a className="active" href="/donation">Donate</a>
        <a href="/request">Request</a>
      </nav>
      <div className="nav-icons">🔔</div>
    </header>
  );
}

export default function Donation() {
  return (
    <div className="ui-page form-page">
      <Nav />
      <main className="form-shell donate-shell">
        <h1>Donation Request</h1>
        <p>Complete the vital information to begin your life-saving journey.</p>

        <section className="form-card bordered-left">
          <div className="section-header"><span className="step filled">1</span><h3>Donor Info</h3></div>
          <div className="form-grid two">
            <div><label>FULL NAME</label><input placeholder="John Doe" /></div>
            <div><label>BLOOD TYPE</label><select><option>Select Type</option></select></div>
            <div><label>HEIGHT (CM)</label><input placeholder="175" /></div>
            <div><label>WEIGHT (KG)</label><input placeholder="70" /></div>
            <div><label>EMAIL ADDRESS</label><input placeholder="john@example.com" /></div>
            <div><label>DATE OF BIRTH</label><input placeholder="mm/dd/yyyy" /></div>
          </div>
          <div><label>FULL ADDRESS</label><input placeholder="123 Vital St, Medical District, City" /></div>
          <div><label>PREFERRED DONATION LOCATION</label><select><option>Select Location (Hospital or Landmark)</option></select></div>
        </section>

        <section className="form-card soft-block">
          <div className="section-header"><span className="step outline">2</span><h3>Health Questions</h3></div>
          <div className="question-box"><span>Have you donated blood in the last 8 weeks?</span><div className="mini-actions"><button>Yes</button><button>No</button></div></div>
          <div className="question-box"><span>Are you currently taking any prescription medication?</span><div className="mini-actions"><button>Yes</button><button>No</button></div></div>
          <div className="question-box stacked"><span>Any recent travel outside the country (within 6 months)?</span><textarea placeholder="List countries and dates if applicable..." /></div>
        </section>

        <label className="checkbox-line"><input type="checkbox" /> I agree to the terms and conditions and confirm my information is vital and accurate.</label>
        <a className="btn primary block" href="/dashboard">Submit Donation Request</a>
      </main>
      <footer className="footer-shell">
        <div className="footer-brand"><div className="brand">DONORHUB.</div><p>© 2024 BACKROW LABS. ALL RIGHTS RESERVED.</p></div>
        <div className="footer-links"><a href="#">CONTACT US</a><a href="#">PRIVACY POLICY</a><a href="#">TERMS OF SERVICE</a><a href="#">FAQ</a></div>
      </footer>
    </div>
  );
}
