import React, { useState, useEffect } from 'react';
import { LAMBORGHINI_MODELS, parseVideoUrl } from '../models';
import videoFile2 from '../assets/video2.mp4';

export default function Cinema({ activeModelId }) {
  const model = LAMBORGHINI_MODELS[activeModelId] || LAMBORGHINI_MODELS.revuelto;
  
  const [customFilm, setCustomFilm] = useState(localStorage.getItem('custom_cinema_film') || '');
  const [isMuted, setIsMuted] = useState(false);

  // Sync state with localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setCustomFilm(localStorage.getItem('custom_cinema_film') || '');
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('lambo_assets_updated', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('lambo_assets_updated', handleStorageChange);
    };
  }, []);

  // Determine film source dynamically
  const filmSourceUrl = customFilm || videoFile2;
  const filmVideo = parseVideoUrl(filmSourceUrl);

  return (
    <section className="cinema" id="cinema">
      <div className="section-head">
        <h2>The roar, uncut</h2>
        <p>Cinematic light, asphalt, and motion — turn sound on when you are ready.</p>
      </div>
      <div className="cinema-grid">
        <figure className="cinema-stage is-visible">
          <div className="cinema-tilt js-tilt">
            {filmVideo && filmVideo.type === 'youtube' ? (
              <iframe
                className="cinema-video"
                src={`${filmVideo.embedUrl}?rel=0&modestbranding=1${isMuted ? '&mute=1' : '&mute=0'}`}
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                  display: 'block'
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`${model.name} Cinematic Road Film`}
              ></iframe>
            ) : filmVideo ? (
              <video
                className="cinema-video"
                src={filmVideo.url}
                poster={model.hero.poster}
                controls
                playsInline
                preload="metadata"
                muted={isMuted}
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                  backgroundColor: '#000',
                  display: 'block'
                }}
              ></video>
            ) : null}
            <figcaption className="cinema-caption" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ flex: '1', minWidth: '250px' }}>
                <span className="cinema-tag">Film</span>
                <span>Lamborghini {model.name} goes head-to-head demonstrating raw power.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  className="btn btn-ghost"
                  onClick={() => setIsMuted(!isMuted)}
                  type="button"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.6rem 1.2rem',
                    height: 'auto',
                    border: '1px solid var(--line)',
                    background: 'rgba(255,255,255,0.03)',
                    color: 'var(--text)',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isMuted ? 'Unmute Sound 🔊' : 'Mute Sound 🔇'}
                </button>
              </div>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}

