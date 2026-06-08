import React, { useState } from 'react';

export default function Header({ currentView, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : '';
  };

  const handleLinkClick = (e, view, anchor = "") => {
    if (view === 'admin' || !anchor) {
      e.preventDefault();
    }

    if (view === 'admin') {
      onNavigate('admin');
      setIsOpen(false);
      document.body.style.overflow = '';
    } else {
      onNavigate('home');
      setIsOpen(false);
      document.body.style.overflow = '';
      if (anchor) {
        // Allow default anchor jump after small timeout for view switch
        setTimeout(() => {
          const el = document.getElementById(anchor);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  return (
    <header className={`site-header ${isOpen ? 'is-open' : ''}`}>
      <a className="logo" href="/" onClick={(e) => handleLinkClick(e, 'home')}>
        <span className="logo-mark" aria-hidden="true">◢</span>
        <span className="logo-text">
          <span className="logo-wordmark logo-wordmark--solo">Lamborghini</span>
        </span>
      </a>
      
      <nav className="nav" aria-label="Primary">
        <a href="#models" className="nav-cta" onClick={(e) => handleLinkClick(e, 'home', 'models')}>Models</a>
        <a href="#cinema" className="nav-cta" onClick={(e) => handleLinkClick(e, 'home', 'cinema')}>Film</a>
        <a href="#gallery" className="nav-cta" onClick={(e) => handleLinkClick(e, 'home', 'gallery')}>Gallery</a>
        <a href="#specs" className="nav-cta" onClick={(e) => handleLinkClick(e, 'home', 'specs')}>Specs</a>
        <a href="#testimonials" className="nav-cta" onClick={(e) => handleLinkClick(e, 'home', 'testimonials')}>Owners</a>
        <a href="#cta" className="nav-cta" onClick={(e) => handleLinkClick(e, 'home', 'cta')}>Book Test Drive</a>
        
        {currentView === 'admin' ? (
          <a 
            href="#home" 
            className="nav-cta" 
            style={{ borderColor: 'var(--accent)' }}
            onClick={(e) => handleLinkClick(e, 'home')}
          >
            Client Site
          </a>
        ) : (
          <a 
            href="#admin" 
            className="nav-cta" 
            onClick={(e) => handleLinkClick(e, 'admin')}
          >
            Dealer Panel
          </a>
        )}
      </nav>
      
      <button 
        className="menu-btn" 
        onClick={toggleMenu}
        type="button" 
        aria-label={isOpen ? "Close menu" : "Open menu"} 
        aria-expanded={isOpen}
      >
        <span></span><span></span>
      </button>
    </header>
  );
}
