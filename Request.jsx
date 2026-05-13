import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/ui.css";

function Nav() {
  return (
    <header className="site-nav public-nav donor-nav">

      <Link className="brand" to="/">
        DONORHUB
      </Link>

      <nav>
        <Link to="/">Home</Link>

        <Link to="/donation">
          Donate
        </Link>

        <Link className="active" to="/request">
          Request
        </Link>
      </nav>

      <div className="nav-icons">
        🔔
      </div>

    </header>
  );
}

export default function Request() {

  const navigate = useNavigate();

  const [isEmergency, setIsEmergency] = useState(false);

  const [formData, setFormData] = useState({
    recipientName: "",
    contactNumber: "",
    hospitalName: "",
    bloodGroup: "",
    unitsNeeded: "",
    reason: "",
    agreed: false,
  });

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {

    const {
      recipientName,
      contactNumber,
      hospitalName,
      bloodGroup,
      unitsNeeded,
      reason,
      agreed,
    } = formData;

    if (
      !recipientName ||
      !contactNumber ||
      !hospitalName ||
      !bloodGroup ||
      !unitsNeeded ||
      !reason
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (!agreed) {
      alert("Please accept the Terms & Conditions.");
      return;
    }

    alert("Blood Request Submitted Successfully!");

    navigate("/dashboard");
  };

  return (
    <div className="ui-page form-page">

      <Nav />

      <main className="form-shell request-shell narrow-form">

        <div className="header-icon">✚</div>

        <div className="mini-title">
          MEDICAL ASSISTANCE
        </div>

        <h1>Request Blood Support</h1>

        <p>
          Immediate vital resource allocation for patients in need.
          Please provide accurate clinical details below.
        </p>

        <section className="form-card plain large">

          <div className="alert-toggle">

            <div>

              <strong>
                ⚠ Is this an emergency?
              </strong>

              <p>
                Emergency requests are processed with top priority.
              </p>

            </div>

            <div
              className={`toggle-switch ${isEmergency ? "active" : ""}`}
              onClick={() => setIsEmergency(!isEmergency)}
              style={{ cursor: "pointer" }}
            >
              <span />
            </div>

          </div>

          <div className="form-grid two">

            <div>

              <label>RECIPIENT NAME</label>

              <input
                type="text"
                name="recipientName"
                placeholder="Full legal name"
                value={formData.recipientName}
                onChange={handleChange}
              />

            </div>

            <div>

              <label>CONTACT NUMBER</label>

              <input
                type="text"
                name="contactNumber"
                placeholder="+1 (555) 000-0000"
                value={formData.contactNumber}
                onChange={handleChange}
              />

            </div>

          </div>

          <div>

            <label>HOSPITAL NAME</label>

            <input
              type="text"
              name="hospitalName"
              placeholder="Current medical facility"
              value={formData.hospitalName}
              onChange={handleChange}
            />

          </div>

          <div className="form-grid units-grid">

            <div>

              <label>BLOOD GROUP NEEDED</label>

              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
              >
                <option value="">Select Group</option>

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

              <label>UNITS NEEDED</label>

              <input
                type="number"
                name="unitsNeeded"
                placeholder="0"
                value={formData.unitsNeeded}
                onChange={handleChange}
              />

            </div>

            <div className="unit-note">
              (450ml per unit)
            </div>

          </div>

          <div>

            <label>
              DOCTOR/HOSPITAL RECOMMENDATION NOTES
            </label>

            <div className="upload-box">

              ☁

              <strong>
                Click to upload or drag and drop
              </strong>

              <span>
                PDF, PNG or JPG (MAX. 5MB)
              </span>

            </div>

          </div>

          <div>

            <label>REASON FOR REQUEST</label>

            <textarea
              name="reason"
              placeholder="Briefly explain the emergency or clinical requirement..."
              value={formData.reason}
              onChange={handleChange}
            />

          </div>

          <div className="terms-panel">

            <strong>
              SERVICE TERMS & CONDITIONS
            </strong>

            <ol>
              <li>
                All requests are subject to verification by
                DonorHub clinical coordination team and hospital staff.
              </li>

              <li>
                Blood provided is for immediate medical use only and
                cannot be resold or transferred.
              </li>

              <li>
                While we strive for rapid fulfillment, stock levels
                are dynamic and fulfillment is not guaranteed.
              </li>
            </ol>

          </div>

          <label className="checkbox-line">

            <input
              type="checkbox"
              name="agreed"
              checked={formData.agreed}
              onChange={handleChange}
            />

            I certify that the information provided is accurate and
            I have read and agree to the{" "}

            <a href="#">
              Terms & Conditions
            </a>

          </label>

          <button
            className="btn primary block"
            onClick={handleSubmit}
          >
            Submit Request
          </button>

        </section>

      </main>

      <footer className="footer-shell">

        <div className="footer-brand">

          <div className="brand">
            DONORHUB.
          </div>

          <p>
            © 2024 BACKROW LABS. ALL RIGHTS RESERVED.
          </p>

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