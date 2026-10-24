// 3D molecular viewers powered by 3Dmol.js, using real PubChem geometries (js/structures.js).
(function () {
  "use strict";

  var MOLS = [
    { id: "view-camphor",    key: "camphor" },
    { id: "view-isoborneol", key: "isoborneol" },
    { id: "view-borneol",    key: "borneol" }
  ];

  var STYLE_SPECS = {
    stick:     { stick: { radius: 0.14 } },
    ballstick: { stick: { radius: 0.12 }, sphere: { scale: 0.25 } },
    sphere:    { sphere: {} } // full van der Waals = space-filling
  };

  var state = { style: "ballstick", spin: false, showH: true, highlightO: false };
  var viewers = [];

  function ready() {
    // 3Dmol failed to load (CDN blocked / offline)?
    if (typeof window.$3Dmol === "undefined" || !window.STRUCTURES) {
      var fb = document.getElementById("viewer-fallback");
      if (fb) fb.hidden = false;
      return;
    }

    MOLS.forEach(function (m) {
      var el = document.getElementById(m.id);
      if (!el) return;
      var v = window.$3Dmol.createViewer(el, { backgroundAlpha: 0 });
      var sdf = window.STRUCTURES[m.key];
      v.addModel(sdf, "sdf");
      viewers.push(v);
      applyStyle(v);
      v.zoomTo();
      v.render();
    });

    // Re-fit on container resize (3Dmol needs a nudge).
    window.addEventListener("resize", debounce(function () {
      viewers.forEach(function (v) { v.resize(); v.render(); });
    }, 150));

    wireControls();
  }

  function applyStyle(v) {
    var base = STYLE_SPECS[state.style];
    v.setStyle({}, base);                         // all atoms (incl. H)
    if (!state.showH) v.setStyle({ elem: "H" }, {}); // hide hydrogens
    if (state.highlightO) {                        // emphasise the O (C=O or –OH)
      var hi = { sphere: { scale: state.style === "sphere" ? 1.0 : 0.5, color: "magenta" } };
      if (state.style !== "sphere") hi.stick = { radius: 0.14 };
      v.setStyle({ elem: "O" }, hi);
    }
  }

  function renderAll() {
    viewers.forEach(function (v) { applyStyle(v); v.render(); });
  }

  function wireControls() {
    // Display style (mutually exclusive buttons)
    document.querySelectorAll(".btn[data-style]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.style = btn.getAttribute("data-style");
        document.querySelectorAll(".btn[data-style]").forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
        renderAll();
      });
    });

    bindToggle("spinBtn", function (on) {
      state.spin = on;
      viewers.forEach(function (v) { v.spin(on ? "y" : false); });
    });
    bindToggle("hBtn", function (on) { state.showH = on; renderAll(); });
    bindToggle("ohBtn", function (on) { state.highlightO = on; renderAll(); });
  }

  function bindToggle(id, fn) {
    var btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener("click", function () {
      var on = btn.getAttribute("aria-pressed") !== "true";
      btn.setAttribute("aria-pressed", String(on));
      fn(on);
    });
  }

  function debounce(fn, ms) {
    var t;
    return function () { clearTimeout(t); t = setTimeout(fn, ms); };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
  }
})();
