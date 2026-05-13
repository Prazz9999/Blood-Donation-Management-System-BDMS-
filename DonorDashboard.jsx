import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ui.css";

function DonorNav() {
  const showNotifications =
    window.location.pathname === "/dashboard" &&
    window.location.search.includes("notifications=1");

  return (
    <header className="site-nav donor-topbar">
      <Link className="brand" to="/">
        DONORHUB
      </Link>

      <nav>
        <Link to="/donation">Donate</Link>
        <Link to="/request">Request</Link>
        <Link className="active" to="/dashboard">
          Dashboard
        </Link>
      </nav>

      <div className="right-actions">
        <Link className="btn small primary" to="/donation">
          Donate Now
        </Link>

        <Link className="icon-btn" to="/dashboard?notifications=1">🔔
        </Link>

        <Link className="icon-btn" to="/profile">
          i
        </Link>
      </div>

      {showNotifications && (
        <div className="notifications-popover">

          <div className="pop-head">
            <strong>NOTIFICATIONS</strong>

            <Link to="/dashboard">×</Link>
          </div>

          <div className="note-item urgent">
            <span>✱</span>

            <div>
              <strong>
                URGENT: B+ blood needed at City Hospital.
                Click to volunteer.
              </strong>

              <small>2 mins ago</small>
            </div>
          </div>

          <div className="note-item">
            <span>✿</span>

            <div>
              <strong>
                Your donation at Metro Care Center has been verified.
              </strong>

              <small>2 hours ago</small>
            </div>
          </div>

          <div className="note-item">
            <span>➜</span>

            <div>
              <strong>
                New blood donation camp scheduled at Community Center
                for June 15th.
              </strong>

              <small>Yesterday</small>
            </div>
          </div>

          <div className="pop-foot">
            VIEW ALL ACTIVITY
          </div>

        </div>
      )}
    </header>
  );
}

export default function DonorDashboard() {

  const [available, setAvailable] = useState(true);

  const donor = {
    name: "Prazz",
    bloodType: "O+",
    donations: 4,
    livesSaved: 12,
  };

  return (
    <div className="ui-page dashboard-page">

      <DonorNav />

      <main className="content-wrap donor-dashboard">

        <section className="dashboard-head split">

          <div>

            <h1>
              Welcome, {donor.name}!
            </h1>

            <p>
              Your contribution keeps the pulse of the community
              beating. You're part of a vital network of heroes.
            </p>

            <div className="availability-toggle">

              <span>Emergency Availability</span>

              <div
                className={`toggle-pill ${available ? "active" : ""}`}
                onClick={() => setAvailable(!available)}
                style={{ cursor: "pointer" }}
              >
                <span>{available ? "✓" : "✕"}</span>
              </div>

            </div>

          </div>

          <div className="member-card">
            <div className="mini-title">MEMBER SINCE</div>

            <strong>October 2023</strong>
          </div>

        </section>

        <section className="stats-grid four">

          <article className="white-card metric-card">

            <div className="metric-icon">◔</div>

            <div className="metric-title">
              TOTAL DONATIONS
            </div>

            <strong>
              {donor.donations} <span>Donations</span>
            </strong>

            <div className="progress">
              <span style={{ width: "72%" }} />
            </div>

          </article>

          <article className="soft-card metric-card">

            <div className="metric-icon heart">♥</div>

            <div className="metric-title">
              IMPACT
            </div>

            <strong>
              {donor.livesSaved} <span>Lives Saved</span>
            </strong>

            <small>
              Top 5% of regional donors
            </small>

          </article>

          <article className="white-card metric-card">

            <div className="metric-icon">🩸</div>

            <div className="metric-title">
              BLOOD TYPE
            </div>

            <strong>
              {donor.bloodType}
            </strong>

            <small>
              Universal donor status active
            </small>

          </article>

          <article className="accent-card metric-card inverse">

            <div className="metric-icon">☑</div>

            <div className="metric-title">
              NEXT ELIGIBILITY
            </div>

            <strong>
              Aug 12, 2024
            </strong>

            <small>
              Standard 3-month cycle
            </small>

          </article>

        </section>

        <section className="cta-grid two-wide">

          <article className="accent-card cta-card big">

            <h2>Start a Donation</h2>

            <p>
              Find the nearest center and book your next appointment
              in seconds.
            </p>

            <Link
              className="btn white smallish"
              to="/donation"
            >
              Schedule Now →
            </Link>

          </article>

          <article className="soft-card cta-card">

            <h2>Request Blood</h2>

            <p>
              In urgent need? Raise a request for your patient
              or family member.
            </p>

            <Link
              className="btn primary smallish"
              to="/request"
            >
              Request Emergency ✱
            </Link>

          </article>

        </section>

        <section className="lower-grid">

          <div>

            <div className="section-top">

              <h3>Donation History</h3>

              <a href="#">VIEW ALL</a>

            </div>

            <div className="table-card">

              <div className="table-head five">
                <span>DATE</span>
                <span>CENTER</span>
                <span>TYPE</span>
                <span>STATUS</span>
              </div>

              <div className="table-row five">
                <span>May 12, 2024</span>

                <span>City Central Hospital</span>

                <span className="chip pale">
                  WHOLE BLOOD
                </span>

                <span className="status blue">
                  ● Completed
                </span>
              </div>

              <div className="table-row five">
                <span>Feb 04, 2024</span>

                <span>Red Cross Plaza</span>

                <span className="chip pale">
                  PLATELETS
                </span>

                <span className="status blue">
                  ● Completed
                </span>
              </div>

              <div className="table-row five">
                <span>Nov 28, 2023</span>

                <span>Metro Care Center</span>

                <span className="chip pale">
                  WHOLE BLOOD
                </span>

                <span className="status blue">
                  ● Completed
                </span>
              </div>

            </div>

          </div>

          <aside className="sidebar-panel">

            <h3>Local Donation Camps</h3>

            <div className="camp-list-card">

              <div className="date-badge">
                JUN <strong>15</strong>
              </div>

              <div>

                <strong>
                  Community Center Drive
                </strong>

                <small>
                  9:00 AM - 4:00 PM • 2.4 miles away
                </small>

                <Link to="/admin/camp">
                  JOIN CAMP ›
                </Link>

              </div>

            </div>

            <div className="camp-list-card teal">

              <div className="date-badge">
                JUN <strong>22</strong>
              </div>

              <div>

                <strong>
                  Tech Park Blood Fest
                </strong>

                <small>
                  10:00 AM - 6:00 PM • 5.1 miles away
                </small>

                <Link to="/admin/camp">
                  JOIN CAMP ›
                </Link>

              </div>

            </div>

            <div className="camp-list-card brown">

              <div className="date-badge">
                JUL <strong>02</strong>
              </div>

              <div>

                <strong>
                  University Donation Week
                </strong>

                <small>
                  8:00 AM - 2:00 PM • 3.8 miles away
                </small>

                <Link to="/admin/camp">
                  JOIN CAMP ›
                </Link>

              </div>

            </div>

            <div className="quote-photo-card">

              <div className="photo-placeholder">
                A+
              </div>

              <p>
                “A single pint can save three lives,
                a single hero can change the world.”
              </p>

            </div>

          </aside>

        </section>

      </main>

      <footer className="footer-shell large-footer">

        <div className="footer-brand">

          <div className="brand">
            DONORHUB.
          </div>

          <p>
            Empowering communities through life-saving donations.
            Your small act makes a massive impact.
          </p>

        </div>

        <div className="footer-columns">

          <div>
            <strong>COMPANY</strong>

            <a href="#">About Us</a>
            <a href="#">Contact Us</a>
            <a href="#">Careers</a>
          </div>

          <div>
            <strong>RESOURCES</strong>

            <a href="#">FAQ</a>
            <a href="#">Help Center</a>
            <a href="#">Guidelines</a>
          </div>

          <div>
            <strong>LEGAL</strong>

            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookies</a>
          </div>

        </div>

      </footer>

    </div>
  );
}