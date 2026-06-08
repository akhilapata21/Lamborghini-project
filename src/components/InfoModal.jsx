import React, { useState, useEffect } from 'react';
import { LAMBORGHINI_MODELS } from '../models';

export default function InfoModal({ modelId, isOpen, onClose, onCreateBooking }) {
  const model = LAMBORGHINI_MODELS[modelId] || LAMBORGHINI_MODELS.revuelto;
  
  const [activeView, setActiveView] = useState('specs'); // 'specs', 'booking', 'success'
  const [activeImage, setActiveImage] = useState('');
  const [activeThumbIndex, setActiveThumbIndex] = useState(1); // Default to panelImg (index 1)
  
  // Booking Form Inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [ticketDetails, setTicketDetails] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setActiveView('specs');
      setActiveImage(model.panelImg);
      setActiveThumbIndex(1);
      setName('');
      setEmail('');
      setErrorMsg('');
      setTicketDetails(null);
      document.body.classList.add('is-modal-open');
    } else {
      document.body.classList.remove('is-modal-open');
    }
  }, [isOpen, model]);

  if (!isOpen) return null;

  const handleThumbClick = (imgSrc, index) => {
    setActiveImage(imgSrc);
    setActiveThumbIndex(index);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setLoading(true);
    setErrorMsg('');
    
    try {
      // Call standard booking creation
      const result = await onCreateBooking({
        name: name.trim(),
        email: email.trim(),
        model: model.name,
        tag: model.tag
      });

      setTicketDetails(result);
      setActiveView('success');
    } catch (e) {
      console.error(e);
      setErrorMsg(e.message || 'Failed to submit test drive booking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="info-modal is-open" id="info-modal" role="dialog" aria-hidden="false">
      <div className="info-modal-overlay" onClick={onClose}></div>
      <div className="info-modal-container">
        <button className="info-modal-close" onClick={onClose} aria-label="Close modal">✕</button>
        
        <div className="info-modal-body">
          {/* Modal Gallery Visual Section */}
          <div className="info-modal-visual">
            <div className="modal-gallery-container" id="modal-gallery-container">
              <img 
                id="modal-img" 
                src={activeImage || model.panelImg} 
                alt={`${model.name} details visual`}
                draggable="false"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://picsum.photos/800/600";
                }}
              />
            </div>
            
            {/* Gallery Thumbnails */}
            <div className="modal-thumbnails" id="modal-thumbnails">
              {model.galleryImages && model.galleryImages.map((imgSrc, index) => (
                <button
                  key={index}
                  type="button"
                  className={`modal-thumbnail-btn ${activeThumbIndex === index ? 'is-active' : ''}`}
                  onClick={() => handleThumbClick(imgSrc, index)}
                >
                  <img 
                    src={imgSrc} 
                    alt={`${model.name} view thumbnail ${index + 1}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://picsum.photos/200/150";
                    }}
                  />
                </button>
              ))}
            </div>
            
            <div className="modal-visual-gradient"></div>
          </div>
          
          {/* Modal Copy / Interactive Form Content */}
          <div className="info-modal-content">
            
            {/* View 1: Specification Details */}
            {activeView === 'specs' && (
              <div id="modal-specs-view">
                <p className="modal-tag" id="modal-tag">{model.tag}</p>
                <h2 className="modal-title" id="modal-title">{model.name}</h2>
                
                <div className="modal-price-wrap">
                  <span className="price-label">MSRP (Ex-Showroom)</span>
                  <div className="price-row">
                    <span className="modal-price-inr" id="modal-price-inr">{model.priceINR}</span>
                    <span className="modal-price-usd" id="modal-price-usd">~{model.price}</span>
                  </div>
                </div>
                
                <div className="modal-divider"></div>
                
                <p className="modal-story" id="modal-story">{model.story || model.panel.desc}</p>
                
                <div className="modal-specs-grid">
                  <div className="modal-spec-item">
                    <span className="spec-lbl">Engine</span>
                    <span className="spec-val" id="modal-spec-engine">{model.specs.engine}</span>
                  </div>
                  <div className="modal-spec-item">
                    <span className="spec-lbl">Transmission</span>
                    <span className="spec-val" id="modal-spec-trans">{model.specs.transmission}</span>
                  </div>
                  <div className="modal-spec-item">
                    <span className="spec-lbl">Chassis</span>
                    <span className="spec-val" id="modal-spec-chassis">{model.specs.chassis}</span>
                  </div>
                  <div className="modal-spec-item">
                    <span className="spec-lbl">Top Speed</span>
                    <span className="spec-val" id="modal-spec-speed">{model.specs.topSpeed}</span>
                  </div>
                </div>
                
                <button 
                  className="btn btn-primary modal-cta-btn" 
                  onClick={() => setActiveView('booking')}
                  type="button"
                >
                  Book a Test Drive
                </button>
              </div>
            )}

            {/* View 2: Database Booking Form */}
            {activeView === 'booking' && (
              <div id="modal-booking-view">
                <p className="modal-tag">Verification Portal</p>
                <h2 className="modal-title">Book Test Drive</h2>
                <p className="modal-story">Please provide your verification details below to secure a scheduling block.</p>
                
                <form className="cta-form" id="modal-booking-form" onSubmit={handleBookingSubmit}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', textAlign: 'left', marginBottom: '0.75rem' }}>
                    <label htmlFor="booking-name" style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>Full Name</label>
                    <input 
                      type="text" 
                      id="booking-name" 
                      placeholder="Enter Full Name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required 
                      disabled={loading}
                      style={{ width: '100%', padding: '0.85rem', fontFamily: 'var(--font-body)', background: 'var(--bg-deep)', border: '1px solid var(--line)', color: 'var(--text)', outline: 'none' }}
                    />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', textAlign: 'left', marginBottom: '1.25rem' }}>
                    <label htmlFor="booking-email" style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>Email Address</label>
                    <input 
                      type="email" 
                      id="booking-email" 
                      placeholder="you@domain.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                      disabled={loading}
                      style={{ width: '100%', padding: '0.85rem', fontFamily: 'var(--font-body)', background: 'var(--bg-deep)', border: '1px solid var(--line)', color: 'var(--text)', outline: 'none' }}
                    />
                  </div>
                  
                  {errorMsg && (
                    <div style={{ color: '#ff1744', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'left' }}>
                      Error: {errorMsg}
                    </div>
                  )}

                  <button 
                    className="btn btn-primary btn-full" 
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Verifying...' : 'Verify & Confirm Booking'}
                  </button>
                  
                  <button 
                    className="btn btn-ghost btn-full" 
                    type="button" 
                    id="modal-booking-back" 
                    onClick={() => setActiveView('specs')}
                    disabled={loading}
                    style={{ marginTop: '0.5rem' }}
                  >
                    Back to Specs
                  </button>
                </form>
              </div>
            )}

            {/* View 3: Verified Digital Ticket Pass */}
            {activeView === 'success' && ticketDetails && (
              <div id="modal-success-view" style={{ textAlign: 'center' }}>
                <p className="modal-tag" style={{ color: '#00e676' }}>Verified Pass</p>
                <h2 className="modal-title" style={{ fontSize: '2.2rem', color: '#fff' }}>Ticket Issued</h2>
                <div className="modal-divider" style={{ background: '#00e676', opacity: 0.4 }}></div>
                
                {/* Digital Pass Card */}
                <div className="digital-pass-card" style={{ border: '1px solid #00e676', background: 'rgba(0, 230, 118, 0.05)', padding: '1.5rem', margin: '1.5rem 0', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', letterSpacing: '0.15em', color: '#00e676' }}>Lambo Test Pass</span>
                    <span id="ticket-id" style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--text-muted)' }}>ID: {ticketDetails.id}</span>
                  </div>
                  
                  <div style={{ marginBottom: '0.75rem' }}>
                    <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Driver Name</span>
                    <span id="ticket-name" style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff' }}>{ticketDetails.name}</span>
                  </div>

                  <div style={{ marginBottom: '0.75rem' }}>
                    <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Email</span>
                    <span style={{ fontSize: '1.0rem', fontWeight: 500, color: '#e0e0e0' }}>{ticketDetails.email}</span>
                  </div>

                  <div>
                    <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Selected Supercar</span>
                    <span style={{ fontSize: '1.0rem', fontWeight: 600, color: '#ffeb3b' }}>{ticketDetails.model}</span>
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Your request is saved securely. Present this pass or ticket ID to your selected dealer upon arrival.
                </p>
                
                <button 
                  className="btn btn-primary btn-full" 
                  onClick={onClose}
                  type="button"
                >
                  Done
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
