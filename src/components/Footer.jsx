import React from 'react';

export default function Footer({ onNavigate }) {
  const currentYear = new Date().getFullYear();

  const handleAdminLink = (e) => {
    e.preventDefault();
    onNavigate('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="logo-mark" aria-hidden="true">◢</span>
          <span className="footer-wordmark">Lamborghini</span>
        </div>
        <div className="footer-columns">
          <div>
            <h3>Explore</h3>
            <ul>
              <li><a href="#hero" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</a></li>
              <li><a href="#models">Models</a></li>
              <li><a href="#cinema">Film</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#specs">Engineering</a></li>
            </ul>
          </div>
          <div>
            <h3>Administrative</h3>
            <ul>
              <li><a href="#admin" onClick={handleAdminLink}>Dealer Admin Portal</a></li>
              <li><a href="https://www.lamborghini.com/en-en/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
              <li><a href="https://www.lamborghini.com/en-en/privacy-policy#legal-notes" target="_blank" rel="noopener noreferrer">Terms of Use</a></li>
            </ul>
          </div>
          <div>
            <h3>Connect</h3>
            <ul className="footer-social">
              <li><a href="https://www.instagram.com/lamborghini/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a></li>
              <li><a href="https://www.youtube.com/user/Lamborghini" target="_blank" rel="noopener noreferrer" aria-label="YouTube">YT</a></li>
              <li><a href="https://x.com/lamborghini" target="_blank" rel="noopener noreferrer" aria-label="X">X</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-developer" style={{ marginBottom: '0.75rem', fontSize: '0.9rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text)' }}>
          Developed by <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>Akhil</span>
        </p>
        <p>
          © {currentYear} Fan tribute site. Lamborghini and related marks belong to their respective owners. Photos &amp; video bundled in /assets (online fallbacks optional).
        </p>
        <p className="footer-credit">Not affiliated with Automobili Lamborghini S.p.A.</p>
      </div>
    </footer>
  );
}
