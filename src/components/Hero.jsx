import React, { useState, useEffect, useRef } from 'react';
import { LAMBORGHINI_MODELS, parseVideoUrl } from '../models';

export default function Hero({ activeModelId }) {
  const model = LAMBORGHINI_MODELS[activeModelId] || LAMBORGHINI_MODELS.revuelto;
  const [videoMode, setVideoMode] = useState(localStorage.getItem('lambo_video_mode') || 'local'); // Default to local MP4 video
  
  // Custom video overrides from Dealer Console
  const [customBg, setCustomBg] = useState(localStorage.getItem('custom_hero_bg') || '');
  const [customShowcase, setCustomShowcase] = useState(localStorage.getItem('custom_hero_showcase') || '');

  const bgRef = useRef(null);
  const showcaseRef = useRef(null);

  // Sync state with localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setVideoMode(localStorage.getItem('lambo_video_mode') || 'local');
      setCustomBg(localStorage.getItem('custom_hero_bg') || '');
      setCustomShowcase(localStorage.getItem('custom_hero_showcase') || '');
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('lambo_assets_updated', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('lambo_assets_updated', handleStorageChange);
    };
  }, []);

  // Determine video sources dynamically based on settings
  const bgSourceUrl = customBg || (videoMode === 'local' ? '/video/video.mp4' : model.videoBg);
  const showcaseSourceUrl = customShowcase || (videoMode === 'local' ? '/video/video.mp4' : model.videoShowcase);

  const bgVideo = parseVideoUrl(bgSourceUrl);
  const showcaseVideo = parseVideoUrl(showcaseSourceUrl);

  useEffect(() => {
    // Set active dynamic theme variables
    if (model.theme) {
      document.documentElement.style.setProperty('--hero-orb-a-rgb', model.theme.orbA);
      document.documentElement.style.setProperty('--hero-orb-b-rgb', model.theme.orbB);
    }
  }, [model]);

  // Sync mute state to video or iframe elements reactively
  useEffect(() => {
    // Check & control background element
    if (bgRef.current) {
      if (bgRef.current.tagName === 'IFRAME' && bgRef.current.contentWindow) {
        bgRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'mute', args: '' }),
          '*'
        );
      } else if (bgRef.current.tagName === 'VIDEO') {
        bgRef.current.muted = true; // Background loop is always muted to prevent dual-audio interference
        bgRef.current.play().catch(err => {
          console.log("Autoplay background loop prevented by browser: ", err);
        });
      }
    }

    // Check & control showcase element
    if (showcaseRef.current) {
      if (showcaseRef.current.tagName === 'IFRAME' && showcaseRef.current.contentWindow) {
        showcaseRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'mute', args: '' }),
          '*'
        );
      } else if (showcaseRef.current.tagName === 'VIDEO') {
        showcaseRef.current.muted = true; // Showcase loop is always muted in Hero
        showcaseRef.current.play().catch(err => {
          console.log("Autoplay showcase video prevented by browser: ", err);
        });
      }
    }
  }, [bgSourceUrl, showcaseSourceUrl]);

  // Radial gradient background configurations based on current model theme
  const orbAStyle = model.theme 
    ? { background: `radial-gradient(circle, rgba(${model.theme.orbA}, 0.55), transparent 68%)` }
    : {};
  const orbBStyle = model.theme 
    ? { background: `radial-gradient(circle, rgba(${model.theme.orbB}, 0.45), transparent 70%)` }
    : {};

  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <div className="hero-orb hero-orb-a" style={orbAStyle} aria-hidden="true"></div>
        <div className="hero-orb hero-orb-b" style={orbBStyle} aria-hidden="true"></div>
        
        {/* Ambient video background loop - NO Static Photo Underneath, Full Opacity Cinematic Background */}
        {bgVideo && bgVideo.type === 'youtube' ? (
          <iframe
            ref={bgRef}
            id="hero-bg-img"
            className="hero-img"
            src={`${bgVideo.embedUrl}?autoplay=1&mute=1&loop=1&playlist=${bgVideo.id}&controls=0&modestbranding=1&rel=0&showinfo=0&enablejsapi=1`}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100vw',
              height: '100vh',
              transform: 'translate(-50%, -50%) scale(1.5)',
              pointerEvents: 'none',
              border: 'none',
              objectFit: 'cover',
              opacity: 0.75, // Rich, high opacity for a fully solid visual background
              zIndex: 2
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Lamborghini Ambient Loop"
          ></iframe>
        ) : bgVideo ? (
          <video
            ref={bgRef}
            id="hero-bg-img"
            className="hero-img"
            autoPlay
            loop
            muted={true}
            playsInline
            preload="auto"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100vw',
              height: '100vh',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              border: 'none',
              objectFit: 'cover',
              opacity: 0.75, // Rich, high opacity
              zIndex: 2
            }}
          >
            <source src={bgVideo.url} type="video/mp4" />
          </video>
        ) : null}
        
        <div className="hero-gradient" style={{ zIndex: 3 }}></div>
        <div className="hero-grid" style={{ zIndex: 3 }}></div>
      </div>
      
      <div className="hero-layout" style={{ position: 'relative', zIndex: 4 }}>
        <div className="hero-content">
          <p className="eyebrow is-visible">{model.hero.eyebrow}</p>
          <div className="hero-title-wrap">
            <h1 className="hero-title hero-title-3d">
              <span className="title-line">We are not</span>
              <span className="title-line title-accent">like the others</span>
            </h1>
          </div>
          <p className="hero-lead">
            {model.hero.lead}
          </p>
          
          <div className="hero-stats">
            {model.stats && model.stats.map((stat, i) => (
              <div className="stat" key={i}>
                <span className="stat-value">{stat.val}</span>
                <span className="stat-label">{stat.lbl}</span>
              </div>
            ))}
          </div>
          
          <div className="hero-actions">
            <a className="btn btn-primary" href="#models">Browse models</a>
            <a className="btn btn-ghost" href="#cinema">Watch the film</a>
          </div>
        </div>
        
        <div className="hero-showcase">
          {showcaseVideo && showcaseVideo.type === 'youtube' ? (
            <iframe
              ref={showcaseRef}
              className="hero-video"
              src={`${showcaseVideo.embedUrl}?autoplay=1&mute=1&loop=1&playlist=${showcaseVideo.id}&controls=0&modestbranding=1&rel=0&enablejsapi=1`}
              style={{
                width: '100%',
                aspectRatio: '16/9',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
                pointerEvents: 'none'
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Lamborghini Promotional Film"
            ></iframe>
          ) : showcaseVideo ? (
            <video
              ref={showcaseRef}
              className="hero-video"
              autoPlay
              loop
              muted={true}
              playsInline
              preload="auto"
              style={{
                width: '100%',
                aspectRatio: '16/9',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
                objectFit: 'cover'
              }}
            >
              <source src={showcaseVideo.url} type="video/mp4" />
            </video>
          ) : null}
        </div>
      </div>
      
      <div className="hero-scroll" aria-hidden="true">
        <span>Scroll</span>
        <span className="scroll-line"></span>
      </div>
    </section>
  );
}
