/* eslint-env browser */
(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initTilt() {
    if (reduceMotion) {
      return;
    }
    document.querySelectorAll(".js-tilt").forEach(function (el) {
      var raw = el.getAttribute("data-tilt-max");
      var max = raw ? parseFloat(raw) : 8;
      if (isNaN(max)) {
        max = 8;
      }
      el.style.transformStyle = "preserve-3d";
      var raf = null;
      var curX = 0;
      var curY = 0;
      var tgtX = 0;
      var tgtY = 0;

      function tick() {
        curX += (tgtX - curX) * 0.14;
        curY += (tgtY - curY) * 0.14;
        el.style.transform =
          "perspective(960px) rotateX(" +
          curX +
          "deg) rotateY(" +
          curY +
          "deg) translateZ(0)";
        if (Math.abs(tgtX - curX) > 0.02 || Math.abs(tgtY - curY) > 0.02) {
          raf = window.requestAnimationFrame(tick);
        } else {
          raf = null;
        }
      }

      function queue() {
        if (!raf) {
          raf = window.requestAnimationFrame(tick);
        }
      }

      el.addEventListener("mousemove", function (e) {
        var b = el.getBoundingClientRect();
        var px = (e.clientX - b.left) / b.width - 0.5;
        var py = (e.clientY - b.top) / b.height - 0.5;
        tgtX = -py * 2 * max;
        tgtY = px * 2 * max;
        queue();
      });

      el.addEventListener("mouseleave", function () {
        tgtX = 0;
        tgtY = 0;
        queue();
      });
    });
  }

  var header = document.querySelector(".site-header");
  var menuBtn = document.querySelector(".menu-btn");
  var nav = document.querySelector(".nav");
  if (header && menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = header.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open menu");
        document.body.style.overflow = "";
      });
    });
  }

  var ctaForm = document.getElementById("cta-form");
  var ctaFeedback = document.getElementById("cta-feedback");
  if (ctaForm && ctaFeedback) {
    ctaForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var nameInput = document.getElementById("cta-name");
      var name = nameInput ? nameInput.value.trim() : "";
      if (name) {
        ctaFeedback.textContent = "Booking pass verified for " + name + "! A representative will contact you shortly.";
      } else {
        ctaFeedback.textContent = "Booking pass verified! A representative will contact you shortly.";
      }
      ctaFeedback.hidden = false;
      ctaForm.reset();
    });
  }

  function initGalleryFallbacks() {
    document.querySelectorAll("#gallery img[src], .cinema img[src]").forEach(function (img) {
      img.addEventListener(
        "error",
        function once() {
          img.removeEventListener("error", once);
          var seed =
            String(img.getAttribute("src") || img.alt || "car").replace(/[^\w]/g, "").slice(0, 24) ||
            "fallback";
          img.src = "https://picsum.photos/seed/" + seed + "/1200/800";
        },
        false
      );
    });
  }

  function setPanelImage(model) {
    if (!model) {
      return;
    }
    var panel = document.getElementById("panel-" + model.id);
    if (!panel) {
      return;
    }
    var img = panel.querySelector("[data-model-panel-img]");
    if (!img) {
      return;
    }
    img.onerror = function once() {
      img.onerror = null;
      if (model.panelImgFallback) {
        img.src = model.panelImgFallback;
      }
    };
    img.src = model.panelImg;
    img.alt = model.hero.alt;
  }

  function applyHeroCopy(model) {
    if (!model) {
      return;
    }
    var heroEyebrow = document.getElementById("hero-eyebrow");
    var heroLead = document.getElementById("hero-lead");
    if (heroEyebrow && model.hero.eyebrow) {
      heroEyebrow.textContent = model.hero.eyebrow;
    }
    if (heroLead && model.hero.lead) {
      heroLead.textContent = model.hero.lead;
    }
    var stats = model.stats || [];
    var statEls = [
      { v: "hero-stat1-val", l: "hero-stat1-lbl" },
      { v: "hero-stat2-val", l: "hero-stat2-lbl" },
      { v: "hero-stat3-val", l: "hero-stat3-lbl" },
    ];
    statEls.forEach(function (ids, i) {
      if (!stats[i]) {
        return;
      }
      var valEl = document.getElementById(ids.v);
      var lblEl = document.getElementById(ids.l);
      if (valEl) {
        valEl.textContent = stats[i].val;
      }
      if (lblEl) {
        lblEl.textContent = stats[i].lbl;
      }
    });
  }

  function initModelExplorer() {
    var models = window.LAMBORGHINI_MODELS;
    var heroViewer = window.HeroViewer;
    if (!models) {
      return;
    }

    var tabs = Array.prototype.slice.call(document.querySelectorAll(".model-tab"));
    var panels = Array.prototype.slice.call(document.querySelectorAll(".model-panel"));
    if (!tabs.length || !panels.length) {
      return;
    }

    function applyModel(modelId) {
      var model = models[modelId];
      if (!model) {
        return;
      }
      if (heroViewer) {
        heroViewer.applyModel(modelId);
      }
      applyHeroCopy(model);
      setPanelImage(model);
    }

    function activateTab(tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.setAttribute("tabindex", on ? "0" : "-1");
      });
      panels.forEach(function (p) {
        var id = tab.getAttribute("aria-controls");
        var show = p.id === id;
        p.toggleAttribute("hidden", !show);
        p.classList.toggle("is-active", show);
      });
      if (tab.dataset.model) {
        applyModel(tab.dataset.model);
        try {
          window.history.replaceState(null, "", "#model=" + tab.dataset.model);
        } catch (e) {
          /* ignore */
        }
      }
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        activateTab(tab);
      });
      tab.addEventListener("keydown", function (e) {
        var i = tabs.indexOf(tab);
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          activateTab(tabs[(i + 1) % tabs.length]);
          tabs[(i + 1) % tabs.length].focus();
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          var j = (i - 1 + tabs.length) % tabs.length;
          activateTab(tabs[j]);
          tabs[j].focus();
        }
      });
    });

    var hash = (window.location.hash || "").replace(/^#/, "");
    var m = hash.match(/^model=([\w-]+)$/i);
    if (m) {
      var slug = m[1].toLowerCase();
      var match = null;
      for (var hi = 0; hi < tabs.length; hi++) {
        if ((tabs[hi].dataset.model || "").toLowerCase() === slug) {
          match = tabs[hi];
          break;
        }
      }
      if (match) {
        activateTab(match);
        return;
      }
    }

    var initial = null;
    for (var ti = 0; ti < tabs.length; ti++) {
      if (tabs[ti].classList.contains("is-active")) {
        initial = tabs[ti];
        break;
      }
    }
    if (initial && initial.dataset.model) {
      applyModel(initial.dataset.model);
    }
  }

  // Web Audio V12 Engine Start sound synthesizer
  function playEngineStartSound() {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    var ctx = new AudioContext();
    var now = ctx.currentTime;
    
    // Create base oscillators for engine cylinders
    var osc1 = ctx.createOscillator();
    var osc2 = ctx.createOscillator();
    var noiseNode = ctx.createBufferSource();
    
    // Gain nodes
    var engineGain = ctx.createGain();
    var starterGain = ctx.createGain();
    var masterGain = ctx.createGain();
    
    // Filter
    var filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    
    // Setup starter clicking noise
    var bufferSize = ctx.sampleRate * 0.8; // 0.8s of noise
    var buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    var data = buffer.getChannelData(0);
    for (var i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    noiseNode.buffer = buffer;
    
    // Modulate noise to sound like starter click-click-click
    var noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 1000;
    noiseFilter.Q.value = 4;
    
    var noiseAmp = ctx.createGain();
    // pulsing the starter click
    for (var t = 0; t < 0.6; t += 0.08) {
      noiseAmp.gain.setValueAtTime(0.35, now + t);
      noiseAmp.gain.exponentialRampToValueAtTime(0.01, now + t + 0.05);
    }
    noiseAmp.gain.setValueAtTime(0, now + 0.7);
    
    noiseNode.connect(noiseFilter);
    noiseFilter.connect(noiseAmp);
    noiseAmp.connect(starterGain);
    
    // Setup V12 cylinders: sawtooth + triangle wave with detuning
    osc1.type = "sawtooth";
    osc2.type = "triangle";
    
    // Frequency sweeps representing engine RPM
    // Clicks & Starter phase (0.0s to 0.7s) -> base low pitch representing starter crank
    osc1.frequency.setValueAtTime(30, now);
    osc2.frequency.setValueAtTime(15, now);
    
    // Crank-start ignition phase (0.7s to 1.1s) -> burst! RPM shoots to peak (high engine rev)
    osc1.frequency.exponentialRampToValueAtTime(320, now + 1.0);
    osc2.frequency.exponentialRampToValueAtTime(160, now + 1.0);
    
    // Throttle decel to warm rumble idle phase (1.1s to 2.8s) -> RPM drops back down
    osc1.frequency.exponentialRampToValueAtTime(65, now + 2.4);
    osc2.frequency.exponentialRampToValueAtTime(32, now + 2.4);
    
    // Filter sweep matching the RPM curve (keeps engine bright on revs, deep at idle)
    filter.frequency.setValueAtTime(120, now);
    filter.frequency.exponentialRampToValueAtTime(850, now + 1.0);
    filter.frequency.exponentialRampToValueAtTime(180, now + 2.4);
    
    // Gain sweeps
    engineGain.gain.setValueAtTime(0.0, now);
    // combustion burst at 0.68s
    engineGain.gain.setValueAtTime(0.01, now + 0.68);
    engineGain.gain.exponentialRampToValueAtTime(0.85, now + 0.85); // roar!
    engineGain.gain.linearRampToValueAtTime(0.35, now + 1.8);       // decay to idle
    engineGain.gain.linearRampToValueAtTime(0.0, now + 2.9);        // fade out completely as loader screen finishes
    
    starterGain.gain.setValueAtTime(0.65, now);
    starterGain.gain.linearRampToValueAtTime(0.0, now + 0.75);
    
    // LFO to modulate cylinder firing (tremolo/rumble feel)
    var lfo = ctx.createOscillator();
    lfo.frequency.value = 35; // speed of rumble
    var lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.28;
    
    lfo.connect(lfoGain);
    lfoGain.connect(engineGain.gain);
    
    // Connection tree
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(engineGain);
    
    engineGain.connect(masterGain);
    starterGain.connect(masterGain);
    masterGain.connect(ctx.destination);
    
    // Master volume control
    masterGain.gain.setValueAtTime(0.6, now);
    masterGain.gain.exponentialRampToValueAtTime(0.6, now + 2.5);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 3.0); // smooth fade out
    
    // Play nodes
    osc1.start(now);
    osc2.start(now);
    noiseNode.start(now);
    lfo.start(now);
    
    osc1.stop(now + 3.1);
    osc2.stop(now + 3.1);
    noiseNode.stop(now + 3.1);
    lfo.stop(now + 3.1);
  }

  // Dashboard sequencer and controller
  function initIntroLoader() {
    var loader = document.getElementById("intro-loader");
    var startBtn = document.getElementById("ignition-btn");
    var statusText = document.getElementById("loader-status-text");
    var rpmVal = document.getElementById("rpm-val");
    var gaugeFill = document.getElementById("rpm-gauge-fill");
    var logsContainer = document.getElementById("cyber-logs");
    
    if (!loader || !startBtn) return;
    
    document.body.classList.add("is-loading");
    
    function addLog(text, type) {
      if (!logsContainer) return;
      var p = document.createElement("div");
      p.className = "log-line" + (type ? " log-line--" + type : "");
      p.textContent = "> " + text;
      logsContainer.appendChild(p);
      logsContainer.scrollTop = logsContainer.scrollHeight;
    }
    
    // SVG gauge config
    var maxDash = 534; // 2 * PI * r = 2 * 3.14159 * 85 = 534
    
    function setRPM(rpm) {
      if (rpmVal) {
        // Display as decimal format e.g. "8.5"
        rpmVal.textContent = (rpm / 1000).toFixed(1);
      }
      if (gaugeFill) {
        // Gauge visual max is 9000 RPM
        var pct = Math.min(rpm / 9000, 1);
        var offset = maxDash - (pct * maxDash);
        gaugeFill.style.strokeDashoffset = offset;
      }
    }
    
    startBtn.addEventListener("click", function startSequence() {
      // Prevent double trigger
      startBtn.disabled = true;
      startBtn.style.pointerEvents = "none";
      loader.classList.add("is-igniting");
      
      // Start audio synth
      try {
        playEngineStartSound();
      } catch (e) {
        console.error("Audio Synthesis error: ", e);
      }
      
      // Phase 1: Starter Crank (0.0s - 0.7s)
      statusText.textContent = "CRANKING STARTER...";
      addLog("ENGAGED IGNITION PROTOCOL...", "accent");
      addLog("CRANKING STARTER MOTOR...", "accent");
      
      var rpm = 0;
      var crankInterval = setInterval(function() {
        // Starter slightly fluctuates RPM around 300-600
        rpm = Math.floor(Math.random() * 300) + 300;
        setRPM(rpm);
      }, 80);
      
      // Phase 2: Combustion Roar (0.7s - 1.5s)
      setTimeout(function() {
        clearInterval(crankInterval);
        
        statusText.textContent = "V12 COMBUSTION ACTIVE";
        addLog("V12 N/A ENGINE IGNITED!", "success");
        addLog("CYLINDERS 1-12 ACTIVE - SYMMETRIC SPARK", "success");
        addLog("HPEV TRIPLE ELECTRIC MOTOR SYSTEM ENGAGED", "success");
        
        // Rev up rapidly from current to 8500 RPM
        var startRpm = rpm;
        var endRpm = 8500;
        var duration = 400; // ms
        var startTime = performance.now();
        
        function revUp(time) {
          var elapsed = time - startTime;
          var progress = Math.min(elapsed / duration, 1);
          // Ease-out quad
          var ease = progress * (2 - progress);
          var curRpm = startRpm + (endRpm - startRpm) * ease;
          setRPM(curRpm);
          
          if (progress < 1) {
            requestAnimationFrame(revUp);
          }
        }
        requestAnimationFrame(revUp);
      }, 700);
      
      // Phase 3: Decel to Idle & Ready (1.3s - 2.4s)
      setTimeout(function() {
        addLog("OUTPUT CAPABILITY: 1015 CV COMBINED POWER", "success");
        addLog("DYNAMIC FLUID TEMPERATURES: SECURE", "success");
        addLog("ALL GEARBOX ACTUATORS CALIBRATED", "success");
        addLog("SYSTEM CHECK: 100% OK", "success");
        addLog("IGNITION SEQUENCE COMPLETED.", "success");
        statusText.textContent = "IGNITION SEQUENCE COMPLETED";
        
        // Drop RPM back to idle (1200 RPM)
        var startRpm = 8500;
        var endRpm = 1200;
        var duration = 900; // ms
        var startTime = performance.now();
        
        function revDown(time) {
          var elapsed = time - startTime;
          var progress = Math.min(elapsed / duration, 1);
          // Ease-in-out quad
          var ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
          var curRpm = startRpm + (endRpm - startRpm) * ease;
          setRPM(curRpm);
          
          if (progress < 1) {
            requestAnimationFrame(revDown);
          }
        }
        requestAnimationFrame(revDown);
      }, 1300);
      
      // Phase 4: Launch Scissor Door slide open and clean up (2.6s - 3.7s)
      setTimeout(function() {
        statusText.textContent = "LAUNCHING COCKPIT...";
        addLog("DRIVETRAIN ENGAGED. ENJOY THE RIDE.", "success");
        
        // Trigger reveal
        loader.classList.add("is-launched");
        document.body.classList.remove("is-loading");
      }, 2600);
    });
  }

  function initMoreInfoModal() {
    var modal = document.getElementById("info-modal");
    var overlay = document.getElementById("info-modal-overlay");
    var closeBtn = document.getElementById("info-modal-close");
    
    // Modal fields
    var modalImg = document.getElementById("modal-img");
    var modalTag = document.getElementById("modal-tag");
    var modalTitle = document.getElementById("modal-title");
    var modalPriceInr = document.getElementById("modal-price-inr");
    var modalPriceUsd = document.getElementById("modal-price-usd");
    var modalStory = document.getElementById("modal-story");
    var specEngine = document.getElementById("modal-spec-engine");
    var specTrans = document.getElementById("modal-spec-trans");
    var specChassis = document.getElementById("modal-spec-chassis");
    var specSpeed = document.getElementById("modal-spec-speed");
    
    // Views
    var modalSpecsView = document.getElementById("modal-specs-view");
    var modalBookingView = document.getElementById("modal-booking-view");
    var modalSuccessView = document.getElementById("modal-success-view");
    
    // Buttons and Form inside Modal
    var modalCtaBtn = document.getElementById("modal-cta"); // "Book a Test Drive"
    var bookingForm = document.getElementById("modal-booking-form");
    var bookingBackBtn = document.getElementById("modal-booking-back");
    var successCloseBtn = document.getElementById("modal-success-close");
    var thumbnailsContainer = document.getElementById("modal-thumbnails");
    
    // Ticket fields
    var ticketId = document.getElementById("ticket-id");
    var ticketName = document.getElementById("ticket-name");
    var ticketEmail = document.getElementById("ticket-email");
    var ticketCar = document.getElementById("ticket-car");

    var activeCar = null;

    if (!modal || !closeBtn) return;
    
    function resetModalViews() {
      if (modalSpecsView) modalSpecsView.style.display = "";
      if (modalBookingView) modalBookingView.style.display = "none";
      if (modalSuccessView) modalSuccessView.style.display = "none";
      if (bookingForm) bookingForm.reset();
    }

    function openModal(slug) {
      var models = window.LAMBORGHINI_MODELS;
      if (!models || !models[slug]) return;
      var car = models[slug];
      activeCar = car;
      
      resetModalViews();

      // Update DOM values
      if (modalImg) {
        modalImg.src = car.panelImg;
        modalImg.alt = car.name;
      }
      if (modalTag) modalTag.textContent = car.tag;
      if (modalTitle) modalTitle.textContent = car.name;
      
      // Fixed dynamic prices load
      if (modalPriceInr) modalPriceInr.textContent = car.priceINR || "₹0.00 Crore";
      if (modalPriceUsd) modalPriceUsd.textContent = car.price ? "~" + car.price : "~$000,000 USD";
      
      if (modalStory) modalStory.textContent = car.story || car.panel.desc;
      
      if (car.specs) {
        if (specEngine) specEngine.textContent = car.specs.engine || "";
        if (specTrans) specTrans.textContent = car.specs.transmission || "";
        if (specChassis) specChassis.textContent = car.specs.chassis || "";
        if (specSpeed) specSpeed.textContent = car.specs.topSpeed || "";
      }
      
      // Dynamic thumbnails for side views
      if (thumbnailsContainer && car.galleryImages && car.galleryImages.length) {
        thumbnailsContainer.innerHTML = "";
        car.galleryImages.forEach(function(imgSrc, index) {
          var btn = document.createElement("button");
          btn.type = "button";
          btn.className = "modal-thumbnail-btn" + (index === 1 ? " is-active" : ""); // Default to side view panelImg (index 1)
          
          var thumbImg = document.createElement("img");
          thumbImg.src = imgSrc;
          thumbImg.alt = car.name + " view " + (index + 1);
          btn.appendChild(thumbImg);
          
          btn.addEventListener("click", function() {
            thumbnailsContainer.querySelectorAll(".modal-thumbnail-btn").forEach(function(b) {
              b.classList.remove("is-active");
            });
            btn.classList.add("is-active");
            if (modalImg) {
              modalImg.src = imgSrc;
            }
          });
          thumbnailsContainer.appendChild(btn);
        });
        
        // Show panelImg by default (usually index 1 in our array)
        if (modalImg) {
          modalImg.src = car.panelImg;
        }
      }
      
      // Open modal
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("is-modal-open");
    }
    
    function closeModal() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("is-modal-open");
      resetModalViews();
    }
    
    // Listen to "More Info" buttons
    document.querySelectorAll(".more-info-btn").forEach(function(btn) {
      btn.addEventListener("click", function() {
        var slug = btn.getAttribute("data-model");
        if (slug) {
          openModal(slug);
        }
      });
    });
    
    // Wire up booking navigation
    if (modalCtaBtn) {
      modalCtaBtn.addEventListener("click", function() {
        if (modalSpecsView) modalSpecsView.style.display = "none";
        if (modalBookingView) modalBookingView.style.display = "";
      });
    }
    
    if (bookingBackBtn) {
      bookingBackBtn.addEventListener("click", function() {
        if (modalBookingView) modalBookingView.style.display = "none";
        if (modalSpecsView) modalSpecsView.style.display = "";
      });
    }
    
    if (bookingForm) {
      bookingForm.addEventListener("submit", function(e) {
        e.preventDefault();
        var nameInput = document.getElementById("booking-name");
        var emailInput = document.getElementById("booking-email");
        if (!nameInput || !emailInput || !activeCar) return;
        
        var name = nameInput.value.trim();
        var email = emailInput.value.trim();
        if (!name || !email) return;
        
        // Generate security verify pass details
        var randomId = "LMB-" + activeCar.id.slice(0, 3).toUpperCase() + "-" + Math.floor(1000 + Math.random() * 9000);
        
        if (ticketId) ticketId.textContent = "ID: " + randomId;
        if (ticketName) ticketName.textContent = name;
        if (ticketEmail) ticketEmail.textContent = email;
        if (ticketCar) ticketCar.textContent = activeCar.name + " " + activeCar.tag;
        
        if (modalBookingView) modalBookingView.style.display = "none";
        if (modalSuccessView) modalSuccessView.style.display = "";
      });
    }
    
    if (successCloseBtn) {
      successCloseBtn.addEventListener("click", closeModal);
    }
    
    // Close triggers
    closeBtn.addEventListener("click", closeModal);
    if (overlay) overlay.addEventListener("click", closeModal);
    
    window.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
      }
    });
  }

  initIntroLoader();
  initMoreInfoModal();
  initTilt();
  initGalleryFallbacks();
  initModelExplorer();

  var revealEls = document.querySelectorAll("[data-reveal]");
  if (!revealEls.length || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  revealEls.forEach(function (el) {
    io.observe(el);
  });

  var filmUnmuteBtn = document.getElementById("film-unmute-btn");
  var cinemaVideo = document.getElementById("cinema-video-el");

  if (filmUnmuteBtn && cinemaVideo) {
    // Start unmuted
    cinemaVideo.muted = false;
    filmUnmuteBtn.textContent = "Mute Sound 🔇";

    filmUnmuteBtn.addEventListener("click", function() {
      cinemaVideo.muted = !cinemaVideo.muted;
      filmUnmuteBtn.textContent = cinemaVideo.muted ? "Unmute Sound 🔊" : "Mute Sound 🔇";
    });
  }
})();
