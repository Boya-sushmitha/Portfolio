import React, { useState } from 'react';
import { ExternalLink, X, Award, CheckCircle } from 'lucide-react';
import './Certificates.css';

import certGoogleAiml from '../assets/cert_google_aiml.png';
import certInfosysIntro from '../assets/cert_infosys_mysql_intro.png';
import certInfosysDatastore from '../assets/cert_infosys_mysql_datastore.png';
import certApssdc from '../assets/cert_apssdc.png';

const certificateLinks = [
  {
    id: '01',
    displayText: 'SQL and Databases — Infosys Springboard',
    title: 'SQL and Databases',
    issuer: 'Infosys Springboard',
    subtitle: 'MySQL Database Management & Datastore',
    images: [
      { label: 'Introduction to MySQL', src: certInfosysIntro },
      { label: 'MySQL as a Datastore', src: certInfosysDatastore }
    ]
  },
  {
    id: '02',
    displayText: 'Google AI-ML — EduSkills',
    title: 'Google AI-ML',
    issuer: 'EduSkills • Google for Developers',
    subtitle: 'AI-ML Virtual Internship (Grade A)',
    images: [
      { label: 'AI-ML Certificate', src: certGoogleAiml }
    ]
  },
  {
    id: '03',
    displayText: 'Artificial Intelligence — AcenAAR',
    title: 'Artificial Intelligence',
    issuer: 'AcenAAR • APSSDC',
    subtitle: 'Data Analysis using Python & AI Internship',
    images: [
      { label: 'Certificate of Completion', src: certApssdc }
    ]
  }
];

const Certificates = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleOpen = (item) => {
    setActiveItem(item);
    setActiveImageIndex(0);
  };

  const handleClose = () => {
    setActiveItem(null);
    setActiveImageIndex(0);
  };

  return (
    <section id="certificates" className="container section certificates-section">
      <div className="certificates-header">
        <span className="certificates-eyebrow">ACCREDITATIONS</span>
        <h2 className="section-title certificates-title">Verified <span className="title-accent">Certificates</span></h2>
        <p className="certificates-tagline">Click on any certificate link below to view the credential</p>
      </div>

      {/* Clean Interactive Links List */}
      <div className="cert-links-card glass">
        <div className="cert-links-list">
          {certificateLinks.map((item, index) => (
            <React.Fragment key={item.id}>
              <button
                type="button"
                className="cert-inline-link-btn"
                onClick={() => handleOpen(item)}
              >
                <div className="link-left">
                  <span className="link-index">{item.id}.</span>
                  <span className="link-title">{item.displayText}</span>
                </div>
                <div className="link-action">
                  <span className="link-view-label">View Certificate</span>
                  <div className="link-icon-bubble">
                    <ExternalLink size={15} />
                  </div>
                </div>
              </button>
              {index < certificateLinks.length - 1 && <div className="cert-link-divider" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Lightbox Modal displaying the Certificate Image */}
      {activeItem && (
        <div className="cert-modal-backdrop" onClick={handleClose}>
          <div className="cert-modal-box glass" onClick={(e) => e.stopPropagation()}>
            <button className="cert-modal-close-btn" onClick={handleClose} aria-label="Close Certificate">
              <X size={22} />
            </button>

            <div className="cert-modal-header">
              <div className="cert-modal-badge">
                <CheckCircle size={14} /> Verified Credential
              </div>
              <h2 className="cert-modal-title">{activeItem.title}</h2>
              <p className="cert-modal-subtitle">{activeItem.issuer} • {activeItem.subtitle}</p>
            </div>

            {/* If multiple certificates exist under one link (e.g. Infosys 2 certs) */}
            {activeItem.images.length > 1 && (
              <div className="cert-multi-tabs">
                {activeItem.images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`cert-tab-btn ${activeImageIndex === i ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(i)}
                  >
                    {img.label}
                  </button>
                ))}
              </div>
            )}

            {/* Certificate Image View */}
            <div className="cert-modal-image-wrapper">
              <img
                src={activeItem.images[activeImageIndex].src}
                alt={`${activeItem.title} Certificate`}
                className="cert-modal-full-img"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificates;
