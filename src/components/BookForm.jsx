import React, { useState } from 'react';
import { LAMBORGHINI_MODELS } from '../models';

export default function BookForm({ activeModelId, onCreateBooking }) {
  const model = LAMBORGHINI_MODELS[activeModelId] || LAMBORGHINI_MODELS.revuelto;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const result = await onCreateBooking({
        name: name.trim(),
        email: email.trim(),
        model: model.name,
        tag: model.tag
      });

      setSuccessMsg(`Booking pass verified for ${result.name}! Your Ticket ID is ${result.id}. A representative will contact you shortly.`);
      setName('');
      setEmail('');
    } catch (e) {
      console.error(e);
      setErrorMsg(e.message || 'Failed to submit test drive booking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="cta" id="cta">
      <div className="cta-inner js-tilt">
        <div className="cta-visual is-visible">
          <div className="cta-frame">
            <img
              src="/assets/models/revuelto/side.jpg"
              alt="Lamborghini supercar body lines"
              width="1400"
              height="933"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1713856626815-46700c0f862f?auto=format&fit=crop&w=1200&h=800&q=80";
              }}
            />
          </div>
        </div>
        <div className="cta-copy is-visible">
          <p className="eyebrow eyebrow-dark">Find your dealer</p>
          <h2>Book a Test Drive</h2>
          <p>
            Experience the raw instinct of the <strong style={{ color: 'var(--accent)' }}>{model.name}</strong>. Enter your contact details below to secure an official scheduling block recorded securely in our database.
          </p>
          
          <form className="cta-form" id="cta-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="cta-name">Name</label>
            <input
              id="cta-name"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
            
            <label className="sr-only" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            
            <button 
              className="btn btn-primary btn-full" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Book Test Drive'}
            </button>
          </form>
          
          {successMsg && (
            <p className="cta-feedback" id="cta-feedback" style={{ display: 'block', color: '#00e676', border: '1px solid #00e676', background: 'rgba(0,230,118,0.05)', padding: '1rem', marginTop: '1rem', borderRadius: '4px' }}>
              {successMsg}
            </p>
          )}

          {errorMsg && (
            <p className="cta-feedback" id="cta-feedback" style={{ display: 'block', color: '#ff1744', border: '1px solid #ff1744', background: 'rgba(255,23,68,0.05)', padding: '1rem', marginTop: '1rem', borderRadius: '4px' }}>
              Error: {errorMsg}
            </p>
          )}

          <p className="cta-note">Registered details are fully protected and stored locally.</p>
        </div>
      </div>
    </section>
  );
}
