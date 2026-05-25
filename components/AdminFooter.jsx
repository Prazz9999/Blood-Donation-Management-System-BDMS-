import { useState } from 'react';
import { Link } from 'react-router-dom';
import LegalModal from '../components/LegalModal';
import '../styles/admin-global.css';

export default function AdminFooter() {
  const [activeModal, setActiveModal] = useState(null);
  return (
    <>
      <footer className="global-system-footer">
        <div className="footer-top-row">
          
          <div className="footer-brand-column">
            <h3 className="footer-brand-title">DonorHub</h3>
            <p className="footer-brand-tagline">
              Securing the vital lifeline of our community through technology, 
              coordination, and institutional transparency.
            </p>
          </div>
          
          <div className="footer-directory-links">
            <div className="directory-group">
              <h4>SYSTEMS</h4>
              <Link to="#status">Network Status</Link>
              <Link to="#docs">API Documentation</Link>
              <Link to="#safety">Safety Protocols</Link>
            </div>
            
            <div className="directory-group">
              <h4>GOVERNANCE</h4>
              <button className="footer-modal-trigger-btn admin-badge-btn" onClick={() => setActiveModal('privacy')}>Privacy Policy</button>
              <Link to="#ethics">Ethics Committee</Link>
              <button className="footer-modal-trigger-btn admin-badge-btn" onClick={() => setActiveModal('terms')}>Compliance</button>
            </div>
          </div>

          <div className="footer-contact-card">
            <span className="contact-meta-heading">EMERGENCY HOTLINE</span>
            <span className="contact-tel-number">0-800-VITAL-HUB</span>
          </div>
        </div>

        <hr className="footer-horizontal-divider" />

        <div className="footer-bottom-row">
          <span className="copyright-notice">
            Â© {new Date().getFullYear()} DONORHUB MEDICAL ADMINISTRATION. ALL RIGHTS RESERVED.
          </span>
          <div className="compliance-badges">
            <span className="badge-item">SECURITY AUDITED</span>
            <span className="badge-item">DATA INTEGRITY VERIFIED</span>
          </div>
        </div>
      </footer>

      <LegalModal activeModal={activeModal} onClose={() => setActiveModal(null)} />
    </>
  );
}