import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/ui.css";

export default function OTP() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value, index) => {
    // Only allow numbers
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;

    setOtp(updatedOtp);
  };

  const handleVerify = () => {
    const finalOtp = otp.join("");

    if (finalOtp.length < 6) {
      alert("Please enter complete OTP");
      return;
    }

    // Fake verification success
    alert("OTP Verified Successfully!");

    navigate("/dashboard");
  };

  const handleResend = () => {
    alert("New OTP sent successfully!");
  };

  return (
    <div className="auth-page otp-bg centered-only">

      <header className="site-nav public-nav narrow">

        <Link className="brand" to="/">
          DONORHUB
        </Link>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/donation">Donate</Link>
          <Link to="/request">Request</Link>

          <Link className="pill danger" to="/request">
            Emergency
          </Link>
        </nav>
      </header>

      <div className="auth-card otp-card">

        <div className="otp-icon-box">🛡</div>

        <h2>Verify Account</h2>

        <p>Enter the 6-digit code sent to your phone</p>

        <div className="otp-row">

          {otp.map((digit, index) => (
            <input
              key={index}
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
            />
          ))}

        </div>

        <button className="btn primary block" onClick={handleVerify}>
          VERIFY
        </button>

        <p className="switch-copy centered">
          Didn't receive the code?
        </p>

        <button className="resend-link" onClick={handleResend}>
          RESEND CODE
        </button>

      </div>

      <p className="secure-note">
        SECURE VERIFICATION POWERED BY DONORHUB ENCRYPTION PROTOCOLS.
      </p>

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