import React from 'react';

export default function Gallery() {
  const galleryItems = [
    {
      src: "/assets/models/countach/side.jpg",
      alt: "Lamborghini supercar wheel and brake detail",
      class: ""
    },
    {
      src: "/assets/models/revuelto/hero.jpg",
      alt: "Lamborghini front fascia in dramatic light",
      class: "gallery-cell-tall"
    },
    {
      src: "/assets/models/huracan-tecnica/side.jpg",
      alt: "Lamborghini side profile on track",
      class: ""
    },
    {
      src: "/assets/models/revuelto/interior.jpg",
      alt: "Lamborghini luxury interior and steering wheel",
      class: "gallery-cell-wide",
      wrapClass: "gallery-item-wide"
    },
    {
      src: "/assets/models/huracan-sto/rear.jpg",
      alt: "Lamborghini rear wing and taillights",
      class: ""
    }
  ];

  return (
    <section className="gallery" id="gallery">
      <div className="section-head">
        <h2>Sculpture in motion</h2>
        <p>Every surface is a vector — hover panels for a three-dimensional read of the form.</p>
      </div>
      <div className="gallery-scene">
        {galleryItems.map((item, idx) => (
          <div key={idx} className={`gallery-item ${item.wrapClass || ''} is-visible`}>
            <div className={`gallery-cell ${item.class} js-tilt`}>
              <img
                src={item.src}
                alt={item.alt}
                width="1200"
                height="1000"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.target.onerror = null;
                  // Dynamic backup placeholder
                  const seed = item.alt.replace(/[^\w]/g, "").slice(0, 24) || "lambo";
                  e.target.src = `https://picsum.photos/seed/${seed}/1200/800`;
                }}
              />
              <span className="gallery-shine" aria-hidden="true"></span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
