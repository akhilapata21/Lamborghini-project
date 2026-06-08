import React from 'react';
import { LAMBORGHINI_MODELS } from '../models';

export default function ModelLineup({ activeModelId, onModelChange, onMoreInfo }) {
  const models = Object.values(LAMBORGHINI_MODELS);
  const activeModel = LAMBORGHINI_MODELS[activeModelId] || LAMBORGHINI_MODELS.revuelto;

  return (
    <section className="models" id="models" aria-labelledby="models-heading">
      <div className="section-head">
        <h2 id="models-heading">The lineup</h2>
        <p>
          Tap a model to open its sheet and mirror the hero above — fan overview for layout only,
          not factory specifications.
        </p>
      </div>
      
      <div className="models-shell is-visible">
        {/* Navigation Tabs */}
        <div className="model-tabs" role="tablist" aria-label="Lamborghini models">
          {models.map((model) => (
            <button
              key={model.id}
              type="button"
              className={`model-tab ${activeModelId === model.id ? 'is-active' : ''}`}
              role="tab"
              aria-selected={activeModelId === model.id}
              aria-controls={`panel-${model.id}`}
              onClick={() => onModelChange(model.id)}
            >
              {model.name}
            </button>
          ))}
        </div>
        
        {/* active model sheet details */}
        <div className="model-panels">
          <div
            className="model-panel is-active"
            id={`panel-${activeModel.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeModel.id}`}
          >
            <div className="model-panel-inner js-tilt">
              <div className="model-panel-visual">
                <img
                  src={activeModel.panelImg}
                  alt={`${activeModel.name} supercar side view`}
                  width="1200"
                  height="800"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    // Fail-safe unsplash load if files aren't ready
                    e.target.onerror = null;
                    const fallbackUrls = {
                      revuelto: "https://images.unsplash.com/photo-1713856626665-27a371c1f4ad?auto=format&fit=crop&w=1200&h=800&q=80",
                      temerario: "https://images.unsplash.com/photo-1725201708365-1d4db2fcc6a7?auto=format&fit=crop&w=1200&h=800&q=80",
                      "huracan-tecnica": "https://images.unsplash.com/photo-1725201708365-1d4db2fcc6a7?auto=format&fit=crop&w=1200&h=800&q=80",
                      "huracan-sto": "https://images.unsplash.com/photo-1725201763131-729ab5c1c875?auto=format&fit=crop&w=1200&h=800&q=80",
                      urus: "https://images.unsplash.com/photo-1627454820516-dc767bcb4d3e?auto=format&fit=crop&w=1200&h=800&q=80",
                      "aventador-svj": "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1200&h=800&q=80",
                      sian: "https://images.unsplash.com/photo-1710476308736-231a47dfd6bd?auto=format&fit=crop&w=1200&h=800&q=80",
                      countach: "https://images.unsplash.com/photo-1710476308736-231a47dfd6bd?auto=format&fit=crop&w=1200&h=800&q=80"
                    };
                    e.target.src = fallbackUrls[activeModel.id] || "https://images.unsplash.com/photo-1713856626665-27a371c1f4ad?auto=format&fit=crop&w=1200&h=800&q=80";
                  }}
                />
              </div>
              
              <div className="model-panel-copy">
                <p className="model-tag">{activeModel.tag}</p>
                <h3>{activeModel.name}</h3>
                <p className="model-desc">
                  {activeModel.panel.desc}
                </p>
                
                <ul className="model-highlights">
                  {activeModel.panel.highlights && activeModel.panel.highlights.map((hl, index) => (
                    <li key={index}>{hl}</li>
                  ))}
                </ul>
                
                <div className="model-panel-price">
                  <span className="price-inr">{activeModel.priceINR}</span>
                  <span className="price-usd">~{activeModel.price}</span>
                </div>
                
                <button 
                  className="btn btn-ghost more-info-btn" 
                  onClick={() => onMoreInfo(activeModel.id)} 
                  type="button" 
                  style={{ marginTop: '0.75rem', width: '100%' }}
                >
                  More Info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
