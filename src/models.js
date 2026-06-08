export const LAMBORGHINI_FLAGSHIP_GLB = "assets/models/revuelto/3d/model.glb";
export const GLB = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/ToyCar/glTF-Binary/ToyCar.glb";

export const LAMBORGHINI_MODELS = {
  revuelto: {
    id: "revuelto",
    brand: "Lamborghini",
    name: "Revuelto",
    tag: "Flagship HPEV",
    videoBg: "cM7V0Z8oG2A",
    videoShowcase: "cM7V0Z8oG2A",
    cinemaFilm: "cM7V0Z8oG2A",
    hero: {
      eyebrow: "Revuelto — HPEV",
      lead: "First HPEV flagship: carbon monocoque, three electric motors, and a naturally aspirated V12 that still owns the soundtrack.",
      poster: "/assets/models/revuelto/hero.jpg",
      alt: "Lamborghini Revuelto",
    },
    glb: LAMBORGHINI_FLAGSHIP_GLB,
    glbFallback: GLB,
    spinCount: 15,
    stats: [
      { val: "2.5s", lbl: "0 — 100 km/h" },
      { val: "350+", lbl: "km/h (est.)" },
      { val: "1015", lbl: "CV combined" },
    ],
    theme: { orbA: "232, 197, 71", orbB: "30, 80, 140" },
    panel: {
      desc: "Twelve cylinders forward, electrons at the corners — a new chapter for the Raging Bull without muting its voice.",
      highlights: [
        "Monofuselage carbon structure",
        "Triple electric motor layout",
        "8-speed dual-clutch transaxle",
      ],
    },
    panelImg: "/assets/models/revuelto/side.jpg",
    panelImgFallback: "/assets/models/revuelto/side.jpg",
    price: "$608,358 USD",
    priceINR: "₹8.89 Crore",
    galleryImages: [
      "/assets/models/revuelto/hero.jpg",
      "/assets/models/revuelto/side.jpg",
      "/assets/models/revuelto/rear.jpg",
      "/assets/models/revuelto/interior.jpg"
    ],
    story: "The flagship supercar of Lamborghini's hybrid era. Combining the absolute raw power of a high-revving naturally aspirated 6.5L V12 engine with the instantaneous torque vectoring of three high-performance electric motors (HPEV). Built on a full carbon-fiber Monofuselage chassis.",
    specs: {
      engine: "6.5L V12 N/A + 3 Electric Motors",
      transmission: "8-Speed Dual Clutch Transaxle",
      chassis: "Full Carbon Fiber Monofuselage",
      topSpeed: "350+ km/h (217+ mph)"
    }
  },
  temerario: {
    id: "temerario",
    brand: "Lamborghini",
    name: "Temerario",
    tag: "HPEV Twin-Turbo V8",
    videoBg: "O1g0P9o8L5c",
    videoShowcase: "O1g0P9o8L5c",
    cinemaFilm: "O1g0P9o8L5c",
    hero: {
      eyebrow: "Temerario — HPEV V8",
      lead: "The plug-in hybrid V8 successor to Huracán: twin-turbo engine revving to 10,000 RPM, three electric motors, and 920 CV combined.",
      poster: "/assets/models/temerario/hero.jpg",
      alt: "Lamborghini Temerario"
    },
    glb: LAMBORGHINI_FLAGSHIP_GLB,
    glbFallback: GLB,
    spinCount: 12,
    stats: [
      { val: "2.7s", lbl: "0 — 100 km/h" },
      { val: "343", lbl: "km/h" },
      { val: "920", lbl: "CV combined" }
    ],
    theme: { orbA: "46, 204, 113", orbB: "26, 82, 118" },
    panel: {
      desc: "A new era of high-revving performance: twin-turbo V8 combined with torque vectoring front motors for absolute traction.",
      highlights: [
        "10,000 RPM redline V8 engine",
        "Triple electric motor layout",
        "Spaceframe aluminum chassis"
      ]
    },
    panelImg: "/assets/models/temerario/side.jpg",
    panelImgFallback: "/assets/models/temerario/side.jpg",
    price: "$357,621 USD",
    priceINR: "₹3.00 Crore",
    galleryImages: [
      "/assets/models/temerario/hero.jpg",
      "/assets/models/temerario/side.jpg",
      "/assets/models/temerario/rear.jpg",
      "/assets/models/temerario/interior.jpg"
    ],
    story: "The successor to the legendary Huracán, representing a massive shift towards hybridization without sacrificing emotional engagement. Powered by a custom-developed 4.0-liter flat-plane crank twin-turbo V8 engine that revs to 10,000 RPM, paired with three electric motors.",
    specs: {
      engine: "4.0L Twin-Turbo V8 + 3 Electric Motors",
      transmission: "8-Speed Dual Clutch Transaxle",
      chassis: "Full Spaceframe Aluminum Structure",
      topSpeed: "343 km/h (213 mph)"
    }
  },
  "huracan-tecnica": {
    id: "huracan-tecnica",
    brand: "Lamborghini",
    name: "Huracán Tecnica",
    tag: "RWD V10",
    videoBg: "_1r8soGJ0qg",
    videoShowcase: "_1r8soGJ0qg",
    cinemaFilm: "_1r8soGJ0qg",
    hero: {
      eyebrow: "Huracán — Tecnica",
      lead: "Rear-wheel drive clarity with a V10 heart: road manners by day, circuit focus when you ask for it.",
      poster: "/assets/models/huracan-tecnica/hero.jpg",
      alt: "Lamborghini Huracán Tecnica",
    },
    glb: LAMBORGHINI_FLAGSHIP_GLB,
    glbFallback: GLB,
    spinCount: 12,
    stats: [
      { val: "3.2s", lbl: "0 — 100 km/h" },
      { val: "325", lbl: "km/h" },
      { val: "640", lbl: "CV" },
    ],
    theme: { orbA: "232, 197, 71", orbB: "180, 120, 40" },
    panel: {
      desc: "The sweet spot between daily polish and track aggression — tail happy, front precise.",
      highlights: ["LDVI vehicle dynamics", "Carbon-ceramic brakes optional", "Strada, Sport, Corsa modes"],
    },
    panelImg: "/assets/models/huracan-tecnica/side.jpg",
    panelImgFallback: "/assets/models/huracan-tecnica/side.jpg",
    price: "$239,000 USD",
    priceINR: "₹4.04 Crore",
    galleryImages: [
      "/assets/models/huracan-tecnica/hero.jpg",
      "/assets/models/huracan-tecnica/side.jpg",
      "/assets/models/huracan-tecnica/rear.jpg",
      "/assets/models/huracan-tecnica/interior.jpg"
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
    videoBg: "h1E6O5BvL9w",
    videoShowcase: "h1E6O5BvL9w",
    cinemaFilm: "h1E6O5BvL9w",
    hero: {
      eyebrow: "Huracán — STO",
      lead: "Super Trofeo Omologata: aero you can read from across the paddock, weight shaved for apex obsession.",
      poster: "/assets/models/huracan-sto/hero.jpg",
      alt: "Lamborghini Huracán STO",
    },
    glb: LAMBORGHINI_FLAGSHIP_GLB,
    glbFallback: GLB,
    spinCount: 18,
    stats: [
      { val: "3.0s", lbl: "0 — 100 km/h" },
      { val: "310", lbl: "km/h" },
      { val: "640", lbl: "CV" },
    ],
    theme: { orbA: "220, 80, 60", orbB: "40, 40, 50" },
    panel: {
      desc: "Shark fin, adjustable wing, and a rear axle that wants to talk through every fast corner.",
      highlights: [
        "75% carbon fiber body panels",
        "Brembo CCM-R brakes",
        "Race-derived Bridgestone Potenza",
      ],
    },
    panelImg: "/assets/models/huracan-sto/side.jpg",
    panelImgFallback: "/assets/models/huracan-sto/side.jpg",
    price: "$335,000 USD",
    priceINR: "₹4.99 Crore",
    galleryImages: [
      "/assets/models/huracan-sto/hero.jpg",
      "/assets/models/huracan-sto/side.jpg",
      "/assets/models/huracan-sto/rear.jpg",
      "/assets/models/huracan-sto/interior.jpg"
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
    name: "Urus SE",
    tag: "Hybrid Super SUV",
    videoBg: "4WvXW8iQ4lE",
    videoShowcase: "4WvXW8iQ4lE",
    cinemaFilm: "4WvXW8iQ4lE",
    hero: {
      eyebrow: "Urus — SE",
      lead: "The first plug-in hybrid Super SUV: 800 CV combined power, twin-turbo V8, electric motor inside gearbox, and legendary torque vectoring.",
      poster: "/assets/models/urus/hero.jpg",
      alt: "Lamborghini Urus SE",
    },
    glb: LAMBORGHINI_FLAGSHIP_GLB,
    glbFallback: GLB,
    spinCount: 12,
    stats: [
      { val: "3.4s", lbl: "0 — 100 km/h" },
      { val: "312", lbl: "km/h" },
      { val: "800", lbl: "CV combined" },
    ],
    theme: { orbA: "244, 208, 63", orbB: "40, 180, 99" },
    panel: {
      desc: "Combining plug-in hybrid utility with race track performance — 800 CV, active roll stabilization, and zero-emission capability.",
      highlights: [
        "Plug-in Hybrid V8 powertrain",
        "800 CV combined system output",
        "Electric-only drive mode"
      ],
    },
    panelImg: "/assets/models/urus/side.jpg",
    panelImgFallback: "/assets/models/urus/side.jpg",
    price: "$258,000 USD",
    priceINR: "₹4.57 Crore",
    galleryImages: [
      "/assets/models/urus/hero.jpg",
      "/assets/models/urus/side.jpg",
      "/assets/models/urus/rear.jpg",
      "/assets/models/urus/interior.jpg"
    ],
    story: "The Lamborghini Urus SE is the first hybrid SUV by Automobili Lamborghini. It combines the raw power of a 4.0L twin-turbocharged V8 with a high-performance synchronous electric motor housed in the 8-speed gearbox, bringing the combined power output to a staggering 800 CV.",
    specs: {
      engine: "4.0L Twin-Turbo V8 + Hybrid System",
      transmission: "8-Speed Automatic with Electric Assist",
      chassis: "Dynamic Air Suspension SUV Chassis",
      topSpeed: "312 km/h (194 mph)"
    }
  },
  "aventador-svj": {
    id: "aventador-svj",
    brand: "Lamborghini",
    name: "Aventador SVJ",
    tag: "V12 Track Legend",
    videoBg: "AFXt7BLB0IM",
    videoShowcase: "AFXt7BLB0IM",
    cinemaFilm: "AFXt7BLB0IM",
    hero: {
      eyebrow: "Aventador — SVJ",
      lead: "The peak V12 naturally aspirated performance: 770 CV, active aerodynamics (ALA 2.0), and a legendary Nürburgring lap record.",
      poster: "/assets/models/aventador-svj/hero.jpg",
      alt: "Lamborghini Aventador SVJ"
    },
    glb: LAMBORGHINI_FLAGSHIP_GLB,
    glbFallback: GLB,
    spinCount: 12,
    stats: [
      { val: "2.8s", lbl: "0 — 100 km/h" },
      { val: "350+", lbl: "km/h" },
      { val: "770", lbl: "CV" }
    ],
    theme: { orbA: "243, 156, 18", orbB: "120, 40, 18" },
    panel: {
      desc: "Uncompromising performance shaped by air — ALA 2.0 active aerodynamics, magnetic suspension, and pure V12 acoustic fury.",
      highlights: [
        "ALA 2.0 Active Aerodynamics",
        "Naturally Aspirated 6.5L V12",
        "All-Wheel Steering System"
      ]
    },
    panelImg: "/assets/models/aventador-svj/side.jpg",
    panelImgFallback: "/assets/models/aventador-svj/side.jpg",
    price: "$517,760 USD",
    priceINR: "₹6.25 Crore",
    galleryImages: [
      "/assets/models/aventador-svj/hero.jpg",
      "/assets/models/aventador-svj/side.jpg",
      "/assets/models/aventador-svj/rear.jpg",
      "/assets/models/aventador-svj/interior.jpg"
    ],
    story: "Superveloce Jota. Designed to represent the absolute peak of Lamborghini's pure V12 era. Incorporating the second generation of Aerodinamica Lamborghini Attiva (ALA 2.0), lightweight carbon components, and dynamic steering to conquer racetracks.",
    specs: {
      engine: "6.5L V12 Naturally Aspirated",
      transmission: "7-Speed ISR Single Clutch",
      chassis: "Carbon Fiber Monocoque & Subframes",
      topSpeed: "350+ km/h (217+ mph)"
    }
  },
  sian: {
    id: "sian",
    brand: "Lamborghini",
    name: "Sián FKP 37",
    tag: "Supercapacitor V12",
    videoBg: "zXjZp_o7_5o",
    videoShowcase: "zXjZp_o7_5o",
    cinemaFilm: "zXjZp_o7_5o",
    hero: {
      eyebrow: "Sián — FKP 37",
      lead: "First hybrid supercar using supercapacitors: 819 CV combined, revolutionary energy storage, and extremely limited production.",
      poster: "/assets/models/sian/hero.jpg",
      alt: "Lamborghini Sian FKP 37"
    },
    glb: LAMBORGHINI_FLAGSHIP_GLB,
    glbFallback: GLB,
    spinCount: 12,
    stats: [
      { val: "2.8s", lbl: "0 — 100 km/h" },
      { val: "355", lbl: "km/h" },
      { val: "819", lbl: "CV combined" }
    ],
    theme: { orbA: "212, 172, 13", orbB: "74, 35, 90" },
    panel: {
      desc: "Futuristic hybrid tech meets classical raw V12 power — supercapacitor energy density 3 times greater than a lithium-ion cell.",
      highlights: [
        "Supercapacitor Hybrid System",
        "Titanium intake valves",
        "Limited edition of 63 units"
      ]
    },
    panelImg: "/assets/models/sian/side.jpg",
    panelImgFallback: "/assets/models/sian/side.jpg",
    price: "$3,600,000 USD",
    priceINR: "₹30.00 Crore",
    galleryImages: [
      "/assets/models/sian/hero.jpg",
      "/assets/models/sian/side.jpg",
      "/assets/models/sian/rear.jpg",
      "/assets/models/sian/interior.jpg"
    ],
    story: "The Sián FKP 37 is a limited edition V12 hybrid supercar paying tribute to Ferdinand Karl Piëch (FKP) and celebrating the brand's founding year 1963. Its hybrid system uses a supercapacitor rather than a conventional battery pack, charging and discharging instantly.",
    specs: {
      engine: "6.5L V12 + 48V Supercapacitor",
      transmission: "7-Speed ISR automated manual",
      chassis: "Carbon Fiber Monocoque & Active Aero",
      topSpeed: "355 km/h (221 mph)"
    }
  },
  countach: {
    id: "countach",
    brand: "Lamborghini",
    name: "Countach LPI 800-4",
    tag: "Hybrid icon",
    videoBg: "Q1B5vR7S-cM",
    videoShowcase: "Q1B5vR7S-cM",
    cinemaFilm: "Q1B5vR7S-cM",
    hero: {
      eyebrow: "Countach — LPI 800-4",
      lead: "A wedge-shaped icon reborn with hybrid assist: poster-car silhouette, modern chassis, limited production legend.",
      poster: "/assets/models/countach/hero.jpg",
      alt: "Lamborghini Countach LPI 800-4",
    },
    glb: LAMBORGHINI_FLAGSHIP_GLB,
    glbFallback: GLB,
    spinCount: 12,
    stats: [
      { val: "2.8s", lbl: "0 — 100 km/h" },
      { val: "355", lbl: "km/h" },
      { val: "814", lbl: "CV combined" },
    ],
    theme: { orbA: "200, 180, 120", orbB: "80, 40, 120" },
    panel: {
      desc: "Retro-futurist sheet metal with a V12 and 48-volt electric motor — a collector halo, not a mass-market trim.",
      highlights: [
        "Periscopio-style roof channel nod",
        "Monocoque in carbon fiber",
        "Extremely limited production run",
      ],
    },
    panelImg: "/assets/models/countach/side.jpg",
    panelImgFallback: "/assets/models/countach/side.jpg",
    price: "$2,640,000 USD",
    priceINR: "₹21.00 Crore",
    galleryImages: [
      "/assets/models/countach/hero.jpg",
      "/assets/models/countach/side.jpg",
      "/assets/models/countach/rear.jpg",
      "/assets/models/countach/interior.jpg"
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

// Auto-populate 360-degree spin frames
Object.keys(LAMBORGHINI_MODELS).forEach((id) => {
  const m = LAMBORGHINI_MODELS[id];
  m.spin360Resolved = [
    m.hero.poster,
    m.panelImg,
    m.galleryImages[2],
    m.galleryImages[3],
    m.panelImg
  ];
  m.spin360Fallback = [m.hero.poster];
});

// Dynamic Video URL Parser supporting YouTube formats, local MP4 drives, and absolute paths
export function parseVideoUrl(url) {
  if (!url) return null;
  
  // Regular expressions to match YouTube video IDs
  const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(ytRegex);
  
  if (match && match[1]) {
    return {
      type: 'youtube',
      id: match[1],
      embedUrl: `https://www.youtube.com/embed/${match[1]}`
    };
  }
  
  // Also check if it's just a clean 11-character string representing a YouTube ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
    return {
      type: 'youtube',
      id: url.trim(),
      embedUrl: `https://www.youtube.com/embed/${url.trim()}`
    };
  }

  // Otherwise treat as standard direct video file (MP4, WebM, local asset, local drive path)
  return {
    type: 'local',
    url: url
  };
}
