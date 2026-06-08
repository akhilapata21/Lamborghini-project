import React from 'react';

export default function Testimonials() {
  const reviews = [
    {
      quote: "“It does not feel like a hybrid. It feels like the future finally learned how to scream.”",
      by: "M. Voss",
      role: "GT3 privateer · Berlin",
      hue: 42
    },
    {
      quote: "“The front axle pulls you into corners I used to respect. The rear reminds you who’s boss on exit.”",
      by: "Elena Ruiz",
      role: "Track instructor · Montmeló",
      hue: 200
    },
    {
      quote: "“I have owned three generations. This is the first that made my passenger cry — in a good way.”",
      by: "James Okonkwo",
      role: "Collector · Lagos",
      hue: 280
    }
  ];

  return (
    <section className="testimonials" id="testimonials">
      <div className="section-head section-head-light">
        <h2>From the community</h2>
        <p>Passion projects and fan voices — not official Lamborghini statements.</p>
      </div>
      <div className="testimonial-track">
        {reviews.map((rev, index) => (
          <article key={index} className="testimonial-card is-visible">
            <div className="testimonial-tilt js-tilt">
              <blockquote style={{ border: 'none', padding: 0, margin: 0 }}>
                <p>{rev.quote}</p>
                <footer className="testimonial-byline">
                  <div className="avatar" style={{ backgroundColor: `hsl(${rev.hue}, 70%, 45%)` }} aria-hidden="true"></div>
                  <div>
                    <cite>{rev.by}</cite>
                    <span>{rev.role}</span>
                  </div>
                </footer>
              </blockquote>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
