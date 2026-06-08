import React from 'react';

export default function Specs() {
  return (
    <section className="specs" id="specs">
      <div className="section-head">
        <h2>Engineered obsession</h2>
        <p>Carbon, software, and naturally aspirated instinct — one integrated machine.</p>
      </div>
      <div className="specs-grid">
        <article className="spec-card is-visible">
          <div className="spec-card-tilt js-tilt">
            <h3>Monocoque</h3>
            <p>Multi-material structure — lightness that you feel before you see it.</p>
          </div>
        </article>
        
        <article className="spec-card spec-card-wide is-visible">
          <div className="spec-card-tilt js-tilt">
            <h3>HPEV architecture</h3>
            <p>
              Electric torque on the front axle, V12 dominance at the rear — orchestrated by
              Lamborghini Dinamica Veicolo Integrata.
            </p>
          </div>
        </article>
        
        <article className="spec-card is-visible">
          <div className="spec-card-tilt js-tilt">
            <h3>Sound</h3>
            <p>The twelve-cylinder voice — shaped, never diluted, for the road and the circuit.</p>
          </div>
        </article>
      </div>
    </section>
  );
}
