import { useState } from 'react';
import '../styles/legal-modal.css';

const MODAL_CONTENT = {
  contact: {
    title: 'Contact Us',
    eyebrow: 'GET IN TOUCH',
    body: (
      <>
        <p>
          Have a question, concern, or feedback? Our support team at DonorHub is
          available around the clock to assist you.
        </p>
        <strong>General Enquiries</strong>
        <p>Email: support@donorhub.org<br />Phone: 0-800-VITAL-HUB (Mon–Fri, 8am–6pm)</p>
        <strong>Emergency Requests</strong>
        <p>
          For emergency blood request escalations, please call our 24/7 hotline or
          use the "Emergency" toggle on the Request page for immediate prioritisation.
        </p>
        <strong>Media &amp; Partnerships</strong>
        <p>Email: partnerships@donorhub.org</p>
      </>
    ),
  },
  privacy: {
    title: 'Privacy Policy',
    eyebrow: 'LEGAL',
    body: (
      <>
        <p>
          DonorHub is committed to protecting your personal information and your
          right to privacy. This policy explains what information we collect, why
          we collect it, and how we use it.
        </p>
        <strong>Information We Collect</strong>
        <ul>
          <li>Account registration details (name, email, blood type)</li>
          <li>Donation history and medical eligibility status</li>
          <li>Location data used solely for finding nearby donation camps</li>
        </ul>
        <strong>How We Use Your Information</strong>
        <ul>
          <li>To match donors with urgent recipient requests</li>
          <li>To send appointment reminders and eligibility notifications</li>
          <li>To improve our platform and services</li>
        </ul>
        <strong>Data Retention</strong>
        <p>
          We retain personal data for as long as your account is active. You may
          request deletion of your account and all associated data at any time.
        </p>
        <p>
          For the full legal text, contact our Data Protection Officer at:
          dpo@donorhub.org
        </p>
      </>
    ),
  },
  terms: {
    title: 'Terms of Service',
    eyebrow: 'LEGAL',
    body: (
      <>
        <p>
          By using DonorHub, you agree to the following terms. Please read them
          carefully before using our platform.
        </p>
        <strong>Eligibility</strong>
        <ul>
          <li>You must be at least 18 years of age to register as a donor.</li>
          <li>You certify that all health information provided is accurate and current.</li>
        </ul>
        <strong>Donor Obligations</strong>
        <ul>
          <li>Donations are voluntary and may not be exchanged for monetary compensation.</li>
          <li>Blood donated is for immediate medical use only and cannot be resold or transferred.</li>
          <li>Fulfillment of requests is based on dynamic stock levels and is not guaranteed.</li>
        </ul>
        <strong>Platform Use</strong>
        <ul>
          <li>You agree not to misuse the platform or submit fraudulent blood requests.</li>
          <li>DonorHub reserves the right to suspend accounts that violate these terms.</li>
        </ul>
        <p>© 2026 BACKROW LABS. All rights reserved.</p>
      </>
    ),
  },
  faq: {
    title: 'Frequently Asked Questions',
    eyebrow: 'FAQ',
    body: (
      <>
        <strong>Who can donate blood?</strong>
        <p>
          Generally, healthy adults aged 18–65 who weigh at least 50 kg and have
          no disqualifying medical conditions can donate. Our eligibility checker
          on the Donate page will guide you.
        </p>
        <strong>How often can I donate?</strong>
        <p>
          Whole blood donors can donate every 56 days (8 weeks). Platelet donors
          can donate up to 24 times per year. Your Dashboard will show your next
          eligible date automatically.
        </p>
        <strong>How do I track my donation history?</strong>
        <p>
          Log in and visit your Dashboard. All past donations, their verification
          status, and your cumulative impact score are listed there.
        </p>
        <strong>What happens after I submit a blood request?</strong>
        <p>
          Your request is reviewed by the DonorHub clinical coordination team
          within 30 minutes. You will receive a status update via email and your
          Dashboard notification feed.
        </p>
        <strong>Is my medical data secure?</strong>
        <p>
          Yes. All data is encrypted in transit and at rest. We comply with
          national health data protection regulations. See our Privacy Policy for
          full details.
        </p>
      </>
    ),
  },
};

/**
 * LegalModal — a global, reusable modal overlay for footer legal/info links.
 *
 * Usage:
 *   const [activeModal, setActiveModal] = useState(null);
 *   <LegalModal activeModal={activeModal} onClose={() => setActiveModal(null)} />
 *
 * Valid values for activeModal: 'contact' | 'privacy' | 'terms' | 'faq' | null
 */
export default function LegalModal({ activeModal, onClose }) {
  if (!activeModal) return null;

  const content = MODAL_CONTENT[activeModal];
  if (!content) return null;

  return (
    <div className="legal-modal-overlay" onClick={onClose}>
      <div className="legal-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="legal-modal-header">
          <h2>{content.title}</h2>
          <button className="legal-modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>
        <div className="legal-modal-body">
          <span className="legal-modal-eyebrow">{content.eyebrow}</span>
          {content.body}
        </div>
      </div>
    </div>
  );
}
