/* Lamborghini-only lineup — images under assets/models/<slug>/ */
(function (global) {
  var FLAGSHIP_GLB = "assets/models/revuelto/3d/model.glb";
  var GLB =
    "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/ToyCar/glTF-Binary/ToyCar.glb";

  global.LAMBORGHINI_FLAGSHIP_GLB = FLAGSHIP_GLB;
  global.LAMBORGHINI_MODELS = {
    revuelto: {
      id: "revuelto",
      brand: "Lamborghini",
      name: "Revuelto",
      tag: "Flagship HPEV",
      hero: {
        eyebrow: "Revuelto — HPEV",
        lead:
          "First HPEV flagship: carbon monocoque, three electric motors, and a naturally aspirated V12 that still owns the soundtrack.",
        poster: "assets/models/revuelto/hero.jpg",
        alt: "Lamborghini Revuelto",
      },
      glb: FLAGSHIP_GLB,
      glbFallback: GLB,
      spinCount: 15,
      stats: [
        { val: "2.5s", lbl: "0 — 100 km/h" },
        { val: "350+", lbl: "km/h (est.)" },
        { val: "1015", lbl: "CV combined" },
      ],
      theme: { orbA: "232, 197, 71", orbB: "30, 80, 140" },
      panel: {
        desc:
          "Twelve cylinders forward, electrons at the corners — a new chapter for the Raging Bull without muting its voice.",
        highlights: [
          "Monofuselage carbon structure",
          "Triple electric motor layout",
          "8-speed dual-clutch transaxle",
        ],
      },
      panelImg: "assets/models/revuelto/side.jpg",
      panelImgFallback: "assets/models/revuelto/side.jpg",
      price: "$608,358 USD",
      priceINR: "₹8.89 Crore",
      galleryImages: [
        "assets/models/revuelto/hero.jpg",
        "assets/models/revuelto/side.jpg",
        "assets/models/revuelto/gallery/01.jpg",
        "assets/models/revuelto/gallery/02.jpg"
      ],
      story: "The flagship supercar of Lamborghini's hybrid era. Combining the absolute raw power of a high-revving naturally aspirated 6.5L V12 engine with the instantaneous torque vectoring of three high-performance electric motors (HPEV). Built on a full carbon-fiber Monofuselage chassis.",
      specs: {
        engine: "6.5L V12 N/A + 3 Electric Motors",
        transmission: "8-Speed Dual Clutch Transaxle",
        chassis: "Full Carbon Fiber Monofuselage",
        topSpeed: "350+ km/h (217+ mph)"
      }
    },
    "huracan-tecnica": {
      id: "huracan-tecnica",
      brand: "Lamborghini",
      name: "Huracán Tecnica",
      tag: "RWD V10",
      hero: {
        eyebrow: "Huracán — Tecnica",
        lead:
          "Rear-wheel drive clarity with a V10 heart: road manners by day, circuit focus when you ask for it.",
        poster: "assets/models/huracan-tecnica/hero.jpg",
        alt: "Lamborghini Huracán Tecnica",
      },
      glb: FLAGSHIP_GLB,
      glbFallback: GLB,
      spinCount: 12,
      stats: [
        { val: "3.2s", lbl: "0 — 100 km/h" },
        { val: "325", lbl: "km/h" },
        { val: "640", lbl: "CV" },
      ],
      theme: { orbA: "232, 197, 71", orbB: "180, 120, 40" },
      panel: {
        desc:
          "The sweet spot between EVO daily polish and STO track aggression — tail happy, front precise.",
        highlights: ["LDVI vehicle dynamics", "Carbon-ceramic brakes optional", "Strada, Sport, Corsa modes"],
      },
      panelImg: "assets/models/huracan-tecnica/side.jpg",
      panelImgFallback: "assets/models/huracan-tecnica/side.jpg",
      price: "$239,000 USD",
      priceINR: "₹4.04 Crore",
      galleryImages: [
        "assets/models/huracan-tecnica/hero.jpg",
        "assets/models/huracan-tecnica/side.jpg",
        "assets/models/huracan-tecnica/gallery/01.jpg",
        "assets/models/huracan-tecnica/gallery/02.jpg"
      ],
      story: "A bridge between track precision and everyday road utility. Features a purist rear-wheel drive setup, rear-wheel steering, and the raw acoustic signature of a high-revving V10. Perfect for drivers who crave mechanical feedback.",
      specs: {
        engine: "5.2L V10 Naturally Aspirated",
        transmission: "7-Speed Dual Clutch LDF",
        chassis: "Hybrid Aluminum and Carbon Fiber",
        topSpeed: "325 km/h (202 mph)"
      }
    },
    "huracan-sto": {
      id: "huracan-sto",
      brand: "Lamborghini",
      name: "Huracán STO",
      tag: "Track homologation",
      hero: {
        eyebrow: "Huracán — STO",
        lead:
          "Super Trofeo Omologata: aero you can read from across the paddock, weight shaved for apex obsession.",
        poster: "assets/models/huracan-sto/hero.jpg",
        alt: "Lamborghini Huracán STO",
      },
      glb: FLAGSHIP_GLB,
      glbFallback: GLB,
      spinCount: 18,
      stats: [
        { val: "3.0s", lbl: "0 — 100 km/h" },
        { val: "310", lbl: "km/h" },
        { val: "640", lbl: "CV" },
      ],
      theme: { orbA: "220, 80, 60", orbB: "40, 40, 50" },
      panel: {
        desc:
          "Shark fin, adjustable wing, and a rear axle that wants to talk through every fast corner.",
        highlights: [
          "75% carbon fiber body panels",
          "Brembo CCM-R brakes",
          "Race-derived Bridgestone Potenza",
        ],
      },
      panelImg: "assets/models/huracan-sto/side.jpg",
      panelImgFallback: "assets/models/huracan-sto/side.jpg",
      price: "$335,000 USD",
      priceINR: "₹4.99 Crore",
      galleryImages: [
        "assets/models/huracan-sto/hero.jpg",
        "assets/models/huracan-sto/side.jpg",
        "assets/models/huracan-sto/gallery/01.jpg",
        "assets/models/huracan-sto/gallery/02.jpg"
      ],
      story: "Super Trofeo Omologata. A road-homologated racecar derived from Lamborghini's Squadra Corse history. Standard with extreme aerodynamics, a prominent roof scoop, shark fin, and full carbon fiber bodywork (75% of panels).",
      specs: {
        engine: "5.2L V10 Squadra Corse N/A",
        transmission: "7-Speed Dual Clutch LDF",
        chassis: "Ultra-Lightweight Full Carbon Body",
        topSpeed: "310 km/h (193 mph)"
      }
    },
    urus: {
      id: "urus",
      brand: "Lamborghini",
      name: "Urus S",
      tag: "Super SUV",
      hero: {
        eyebrow: "Urus — S",
        lead:
          "The super SUV brief: everyday usability, twin-turbo muscle, and corners that still feel insulted by the word crossover.",
        poster: "assets/models/urus/hero.jpg",
        alt: "Lamborghini Urus S",
      },
      glb: FLAGSHIP_GLB,
      glbFallback: GLB,
      spinCount: 12,
      stats: [
        { val: "3.5s", lbl: "0 — 100 km/h" },
        { val: "305", lbl: "km/h" },
        { val: "666", lbl: "CV" },
      ],
      theme: { orbA: "140, 160, 200", orbB: "232, 197, 71" },
      panel: {
        desc:
          "Family logistics meet volcanic acceleration — air suspension, torque vectoring, and a cabin that still feels special.",
        highlights: [
          "ANIMA drive modes including Sabbia",
          "Adaptive rear steering",
          "Carbon ceramic brakes available",
        ],
      },
      panelImg: "assets/models/urus/side.jpg",
      panelImgFallback: "assets/models/urus/side.jpg",
      price: "$230,000 USD",
      priceINR: "₹4.18 Crore",
      galleryImages: [
        "assets/models/urus/hero.jpg",
        "assets/models/urus/side.jpg",
        "assets/models/urus/gallery/01.jpg",
        "assets/models/urus/gallery/02.jpg"
      ],
      story: "The ultimate high-performance luxury SUV. Powered by a thunderous twin-turbo V8, delivering the dynamics of a supercar in a versatile utility body. Includes adaptive air suspension, active torque vectoring, and carbon ceramic brakes.",
      specs: {
        engine: "4.0L Twin-Turbo V8",
        transmission: "8-Speed Automatic Gearbox",
        chassis: "Steel-Aluminum Space Frame SUV",
        topSpeed: "305 km/h (189 mph)"
      }
    },
    countach: {
      id: "countach",
      brand: "Lamborghini",
      name: "Countach LPI 800-4",
      tag: "Hybrid icon",
      hero: {
        eyebrow: "Countach — LPI 800-4",
        lead:
          "A wedge-shaped icon reborn with hybrid assist: poster-car silhouette, modern chassis, limited production legend.",
        poster: "assets/models/countach/hero.jpg",
        alt: "Lamborghini Countach LPI 800-4",
      },
      glb: FLAGSHIP_GLB,
      glbFallback: GLB,
      spinCount: 12,
      stats: [
        { val: "2.8s", lbl: "0 — 100 km/h" },
        { val: "355", lbl: "km/h" },
        { val: "814", lbl: "CV combined" },
      ],
      theme: { orbA: "200, 180, 120", orbB: "80, 40, 120" },
      panel: {
        desc:
          "Retro-futurist sheet metal with a V12 and 48-volt electric motor — a collector halo, not a mass-market trim.",
        highlights: [
          "Periscopio-style roof channel nod",
          "Monocoque in carbon fiber",
          "Extremely limited production run",
        ],
      },
      panelImg: "assets/models/countach/side.jpg",
      panelImgFallback: "assets/models/countach/side.jpg",
      price: "$2,640,000 USD",
      priceINR: "₹21.00 Crore",
      galleryImages: [
        "assets/models/countach/hero.jpg",
        "assets/models/countach/side.jpg",
        "assets/models/countach/gallery/01.jpg",
        "assets/models/countach/gallery/02.jpg"
      ],
      story: "A highly exclusive modern tribute to the poster car of the 1970s and 80s. Built on a full carbon fiber monocoque, it features a hybrid V12 power unit with custom supercapacitor technology. Limited to just 112 units globally.",
      specs: {
        engine: "6.5L V12 N/A + 48V Supercapacitor",
        transmission: "7-Speed ISR automated manual",
        chassis: "Full Carbon Monocoque & Subframes",
        topSpeed: "355 km/h (221 mph)"
      }
    },
  };

  var ids = Object.keys(global.LAMBORGHINI_MODELS);
  for (var s = 0; s < ids.length; s++) {
    var m = global.LAMBORGHINI_MODELS[ids[s]];
    m.spin360Resolved = [
      m.hero.poster,
      m.panelImg,
      m.galleryImages[2],
      m.galleryImages[3],
      m.panelImg
    ];
    m.spin360Fallback = [m.hero.poster];
  }
})(typeof window !== "undefined" ? window : global);
