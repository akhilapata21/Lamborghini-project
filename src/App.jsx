import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import IntroLoader from './components/IntroLoader';
import Hero from './components/Hero';
import ModelLineup from './components/ModelLineup';
import Cinema from './components/Cinema';
import Gallery from './components/Gallery';
import Specs from './components/Specs';
import Testimonials from './components/Testimonials';
import BookForm from './components/BookForm';
import Footer from './components/Footer';
import InfoModal from './components/InfoModal';
import AdminDashboard from './components/AdminDashboard';
import { useBookings } from './hooks/useBookings';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [view, setView] = useState('home'); // 'home' or 'admin'
  const [activeModelId, setActiveModelId] = useState('revuelto');
  const [modalModelId, setModalModelId] = useState(null);
  
  const { createBooking } = useBookings();

  // Default to local high-quality offline MP4 videos to guarantee playback for all visitors
  useEffect(() => {
    const currentMode = localStorage.getItem('lambo_video_mode');
    if (!currentMode || currentMode === 'streaming') {
      localStorage.setItem('lambo_video_mode', 'local');
      window.dispatchEvent(new Event('lambo_assets_updated'));
    }
  }, []);

  // Handle URL hashes for easy routing bookmarks
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#admin') {
        setView('admin');
      } else {
        setView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLaunch = () => {
    setShowIntro(false);
  };

  const handleNavigate = (newView) => {
    setView(newView);
    window.location.hash = newView === 'admin' ? 'admin' : '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMoreInfo = (modelId) => {
    setModalModelId(modelId);
  };

  const handleCloseModal = () => {
    setModalModelId(null);
  };

  // Add 3D Tilt interactive effects
  useEffect(() => {
    if (showIntro || view === 'admin') return;

    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const tiltElements = document.querySelectorAll(".js-tilt");
    
    tiltElements.forEach((el) => {
      const rawMax = el.getAttribute("data-tilt-max");
      let max = rawMax ? parseFloat(rawMax) : 8;
      if (isNaN(max)) max = 8;
      
      el.style.transformStyle = "preserve-3d";
      let raf = null;
      let curX = 0;
      let curY = 0;
      let tgtX = 0;
      let tgtY = 0;

      function tick() {
        curX += (tgtX - curX) * 0.14;
        curY += (tgtY - curY) * 0.14;
        el.style.transform = `perspective(960px) rotateX(${curX}deg) rotateY(${curY}deg) translateZ(0)`;
        
        if (Math.abs(tgtX - curX) > 0.02 || Math.abs(tgtY - curY) > 0.02) {
          raf = window.requestAnimationFrame(tick);
        } else {
          raf = null;
        }
      }

      function queue() {
        if (!raf) raf = window.requestAnimationFrame(tick);
      }

      const onMouseMove = (e) => {
        const b = el.getBoundingClientRect();
        const px = (e.clientX - b.left) / b.width - 0.5;
        const py = (e.clientY - b.top) / b.height - 0.5;
        tgtX = -py * 2 * max;
        tgtY = px * 2 * max;
        queue();
      };

      const onMouseLeave = () => {
        tgtX = 0;
        tgtY = 0;
        queue();
      };

      el.addEventListener("mousemove", onMouseMove);
      el.addEventListener("mouseleave", onMouseLeave);

      // Cleanups
      el._cleanup = () => {
        el.removeEventListener("mousemove", onMouseMove);
        el.removeEventListener("mouseleave", onMouseLeave);
        if (raf) window.cancelAnimationFrame(raf);
      };
    });

    return () => {
      tiltElements.forEach(el => {
        if (el._cleanup) el._cleanup();
      });
    };
  }, [showIntro, view, activeModelId]);

  // Handle Fade-in Intersection Observer scroll animations
  useEffect(() => {
    if (showIntro || view === 'admin') return;

    const revealElements = document.querySelectorAll("[data-reveal]");
    
    if (!revealElements.length || !("IntersectionObserver" in window)) {
      revealElements.forEach(el => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [showIntro, view, activeModelId]);

  if (showIntro) {
    return <IntroLoader onLaunch={handleLaunch} />;
  }

  return (
    <div className="noise-bg">
      <div className="noise" aria-hidden="true"></div>
      
      <Header currentView={view} onNavigate={handleNavigate} />
      
      {view === 'home' ? (
        <>
          <Hero activeModelId={activeModelId} />
          
          <div className="marquee-strip" role="presentation" aria-hidden="true">
            <div className="marquee-inner">
              <span>Revuelto</span>
              <span>◆</span>
              <span>Temerario</span>
              <span>◆</span>
              <span>Huracán</span>
              <span>◆</span>
              <span>Urus SE</span>
              <span>◆</span>
              <span>Aventador SVJ</span>
              <span>◆</span>
              <span>Sián</span>
              <span>◆</span>
              <span>Countach</span>
              <span>◆</span>
              <span>Ad Personam</span>
              <span>◆</span>
              <span>Sant’Agata</span>
              <span>◆</span>
              <span>Revuelto</span>
              <span>◆</span>
              <span>Temerario</span>
              <span>◆</span>
              <span>Huracán</span>
              <span>◆</span>
              <span>Urus SE</span>
              <span>◆</span>
              <span>Aventador SVJ</span>
              <span>◆</span>
              <span>Sián</span>
              <span>◆</span>
              <span>Countach</span>
              <span>◆</span>
              <span>Ad Personam</span>
              <span>◆</span>
              <span>Sant’Agata</span>
              <span>◆</span>
            </div>
          </div>
          
          <ModelLineup 
            activeModelId={activeModelId} 
            onModelChange={setActiveModelId}
            onMoreInfo={handleMoreInfo}
          />
          
          <Cinema activeModelId={activeModelId} />
          
          <Gallery />
          
          <Specs />
          
          <Testimonials />
          
          <BookForm 
            activeModelId={activeModelId} 
            onCreateBooking={createBooking} 
          />
        </>
      ) : (
        <AdminDashboard />
      )}
      
      <Footer onNavigate={handleNavigate} />

      {/* Specification and Test Drive booking popups */}
      <InfoModal 
        modelId={modalModelId}
        isOpen={modalModelId !== null}
        onClose={handleCloseModal}
        onCreateBooking={createBooking}
      />
    </div>
  );
}
