import '../styles/ui.css';

export default function Signup() {
  return (
    <div className="auth-page signup-bg">
      <div className="auth-card wide">
        <div className="brand with-icon">🩸 DONORHUB</div>
        <h2>Create Account</h2>
        <p>Join our community of life-savers and start your journey today.</p>

        <div className="form-grid two">
          <div>
            <label>FULL NAME</label>
            <input placeholder="Enter your name" />
          </div>
          <div>
            <label>EMAIL</label>
            <input placeholder="name@example.com" />
          </div>
          <div>
            <label>PHONE NUMBER</label>
            <input placeholder="+1 (555) 000-0000" />
          </div>
          <div>
            <label>BLOOD GROUP</label>
            <select>
              <option>Select Group</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>
          <div>
            <label>PASSWORD</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <div>
            <label>CONFIRM PASSWORD</label>
            <input type="password" placeholder="••••••••" />
          </div>
        </div>

        <a className="btn primary block" href="/otp">SIGN UP</a>
        <p className="switch-copy centered">Already have an account? <a href="/login">Login</a></p>
      </div>

      <div className="badge-strip">
        <div>🛡 SECURE DATA</div>
        <div>🤍 VITAL IMPACT</div>
        <div>⌖ SMART MATCHING</div>
      </div>

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
