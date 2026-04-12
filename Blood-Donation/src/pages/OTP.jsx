import '../styles/ui.css';

export default function OTP() {
  return (
    <div className="auth-page otp-bg centered-only">
      <header className="site-nav public-nav narrow">
        <a className="brand" href="/">DONORHUB</a>
        <nav>
          <a href="/">Home</a>
          <a href="/donation">Donate</a>
          <a href="/request">Request</a>
          <a className="pill danger" href="/request">Emergency</a>
        </nav>
      </header>

      <div className="auth-card otp-card">
        <div className="otp-icon-box">🛡</div>
        <h2>Verify Account</h2>
        <p>Enter the 6-digit code sent to your phone</p>
        <div className="otp-row">
          <input maxLength="1" />
          <input maxLength="1" />
          <input maxLength="1" />
          <input maxLength="1" />
          <input maxLength="1" />
          <input maxLength="1" />
        </div>
        <a className="btn primary block" href="/dashboard">VERIFY</a>
        <p className="switch-copy centered">Didn&apos;t receive the code?</p>
        <a className="resend-link" href="#">RESEND CODE</a>
      </div>

      <p className="secure-note">SECURE VERIFICATION POWERED BY DONORHUB ENCRYPTION PROTOCOLS.</p>

      <footer className="footer-shell auth-footer">
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
    </div>
  );
}
