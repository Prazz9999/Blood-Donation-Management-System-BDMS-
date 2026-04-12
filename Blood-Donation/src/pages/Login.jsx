import '../styles/ui.css';

export default function Login() {
  return (
    <div className="auth-page login-bg">
      <div className="auth-logo-stack">
        <div className="brand with-icon">🩸 DONORHUB</div>
        <p>Vital Minimalism in Healthcare</p>
      </div>

      <div className="auth-card compact">
        <h2>Welcome back</h2>
        <p>Please enter your details to sign in.</p>

        <label>USERNAME</label>
        <input placeholder="Enter your username" />

        <div className="inline-label">
          <label>PASSWORD</label>
          <a href="#">Forgot?</a>
        </div>
        <input type="password" placeholder="••••••••" />

        <a className="btn primary block" href="/dashboard">Login</a>

        <div className="divider" />
        <p className="switch-copy">
          Don't have an account? <a href="/signup">Create an account</a>
        </p>
      </div>

      <div className="vertical-copy">SECURE PORTAL ACCESS SYSTEM</div>

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
