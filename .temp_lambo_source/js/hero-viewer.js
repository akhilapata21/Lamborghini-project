/* Hero 3D (model-viewer) + drag 360° */
(function () {
  var reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var modelViewerEl = document.getElementById("hero-model-3d");
  var spinEl = document.getElementById("hero-spin-360");
  var spinImg = document.getElementById("hero-spin-img");
  var viewBtns = document.querySelectorAll("[data-hero-view]");
  var showcase = document.querySelector(".hero-showcase");
  var orbA = document.querySelector(".hero-orb-a");
  var orbB = document.querySelector(".hero-orb-b");
  var heroBgImg = document.getElementById("hero-bg-img");

  var state = {
    modelId: "revuelto",
    view: "3d",
    frame: 0,
    frames: [],
    dragging: false,
    lastX: 0,
    spinTimer: null,
  };

  function getModel(id) {
    var models = window.LAMBORGHINI_MODELS;
    if (!models) {
      return null;
    }
    return models[id] || models.revuelto;
  }

  function setTheme(model) {
    if (!model || !model.theme) {
      return;
    }
    document.documentElement.style.setProperty("--hero-orb-a-rgb", model.theme.orbA);
    document.documentElement.style.setProperty("--hero-orb-b-rgb", model.theme.orbB);
    if (orbA) {
      orbA.style.background =
        "radial-gradient(circle, rgba(" + model.theme.orbA + ", 0.55), transparent 68%)";
    }
    if (orbB) {
      orbB.style.background =
        "radial-gradient(circle, rgba(" + model.theme.orbB + ", 0.45), transparent 70%)";
    }
  }

  function setSpinFrame(index) {
    if (!spinImg || !state.frames.length) {
      return;
    }
    var len = state.frames.length;
    var i = ((index % len) + len) % len;
    state.frame = i;
    var src = state.frames[i];
    var fb = state.fallbackFrames && state.fallbackFrames[0];
    spinImg.onerror = function once() {
      spinImg.onerror = null;
      if (fb) {
        spinImg.src = fb;
      }
    };
    spinImg.src = src;
  }

  function loadGlb(model) {
    if (!modelViewerEl || !model) {
      return;
    }
    var flagship =
      window.LAMBORGHINI_FLAGSHIP_GLB || model.glb || "assets/models/revuelto/3d/model.glb";
    modelViewerEl.setAttribute("poster", model.hero.poster);
    modelViewerEl.setAttribute("alt", "Lamborghini Revuelto flagship 3D");
    fetch(flagship, { method: "HEAD" })
      .then(function (res) {
        modelViewerEl.src = res.ok ? flagship : model.glbFallback;
      })
      .catch(function () {
        modelViewerEl.src = model.glbFallback;
      });
  }

  function setImgWithFallback(img, primary, fallback) {
    if (!img) {
      return;
    }
    img.onerror = function once() {
      img.onerror = null;
      if (fallback) {
        img.src = fallback;
      }
    };
    img.src = primary;
  }

  function setView(view) {
    state.view = view;
    if (showcase) {
      showcase.setAttribute("data-active-view", view);
    }
    viewBtns.forEach(function (btn) {
      var on = btn.getAttribute("data-hero-view") === view;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    if (modelViewerEl) {
      modelViewerEl.toggleAttribute("hidden", view !== "3d");
    }
    if (spinEl) {
      spinEl.toggleAttribute("hidden", view !== "360");
    }
    if (modelViewerEl && !reduceMotion) {
      if (view === "3d") {
        modelViewerEl.setAttribute("auto-rotate", "");
      } else {
        modelViewerEl.removeAttribute("auto-rotate");
      }
    }
  }

  function applyModel(id) {
    var model = getModel(id);
    if (!model) {
      return;
    }
    state.modelId = model.id;
    state.frames = model.spin360Resolved.slice();
    state.fallbackFrames = model.spin360Fallback ? model.spin360Fallback.slice() : [];
    setTheme(model);
    setSpinFrame(0);
    loadGlb(model);
    setImgWithFallback(heroBgImg, model.hero.poster, model.panelImgFallback);
    if (spinImg) {
      spinImg.alt = model.hero.alt + " — 360° view";
    }
  }

  function initSpinDrag() {
    if (!spinEl) {
      return;
    }

    function onDown(e) {
      state.dragging = true;
      state.lastX = e.clientX || (e.touches && e.touches[0] && e.touches[0].clientX) || 0;
      spinEl.classList.add("is-dragging");
    }

    function onMove(e) {
      if (!state.dragging || !state.frames.length) {
        return;
      }
      var x = e.clientX || (e.touches && e.touches[0] && e.touches[0].clientX) || 0;
      var delta = x - state.lastX;
      if (Math.abs(delta) > 4) {
        setSpinFrame(state.frame + (delta > 0 ? 1 : -1));
        state.lastX = x;
      }
    }

    function onUp() {
      state.dragging = false;
      spinEl.classList.remove("is-dragging");
    }

    spinEl.addEventListener("mousedown", onDown);
    spinEl.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
  }

  function initViewToggle() {
    viewBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        setView(btn.getAttribute("data-hero-view") || "3d");
      });
    });
    setView("3d");
  }

  function initAutoSpin() {
    if (reduceMotion) {
      return;
    }
    state.spinTimer = window.setInterval(function () {
      if (state.view === "360" && !state.dragging && state.frames.length) {
        setSpinFrame(state.frame + 1);
      }
    }, 140);
  }

  window.HeroViewer = {
    applyModel: applyModel,
    setView: setView,
  };

  function boot() {
    applyModel("revuelto");
    initViewToggle();
    initSpinDrag();
    initAutoSpin();
    if (modelViewerEl && reduceMotion) {
      modelViewerEl.removeAttribute("auto-rotate");
      modelViewerEl.removeAttribute("camera-controls");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
