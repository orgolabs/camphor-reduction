// Live stoichiometry & yield calculator for the NaBH4 reduction of camphor.
(function () {
  "use strict";

  var MW_CAMPHOR = 152.23;  // g/mol, C10H16O
  var MW_PRODUCT = 154.25;  // g/mol, C10H18O (borneol = isoborneol)
  var MW_NABH4   = 37.83;   // g/mol
  var MEOH_ML_PER_G = 5.0;  // representative solvent volume
  var ISO_FRACTION = 0.90;  // ~90:10 isoborneol:borneol (see references)

  var els = {};
  ["in-camphor", "in-equiv", "in-isolated",
   "o-mmol", "o-nabh4", "o-meoh", "o-theory", "o-iso", "o-bor", "o-yield"
  ].forEach(function (id) { els[id] = document.getElementById(id); });

  function num(el) {
    var v = parseFloat(el && el.value);
    return isFinite(v) && v >= 0 ? v : 0;
  }

  function set(el, value, digits) {
    if (el) el.textContent = value > 0 ? value.toFixed(digits == null ? 2 : digits) : "—";
  }

  function update() {
    var camphorG = num(els["in-camphor"]);
    var equiv    = num(els["in-equiv"]);
    var isolated = num(els["in-isolated"]);

    var mmol      = (camphorG / MW_CAMPHOR) * 1000;
    var nabh4G    = (camphorG / MW_CAMPHOR) * equiv * MW_NABH4;
    var meohML    = camphorG * MEOH_ML_PER_G;
    var theoryG   = (camphorG / MW_CAMPHOR) * MW_PRODUCT;
    var isoG      = theoryG * ISO_FRACTION;
    var borG      = theoryG * (1 - ISO_FRACTION);

    set(els["o-mmol"],   mmol, 2);
    set(els["o-nabh4"],  nabh4G, 3);
    set(els["o-meoh"],   meohML, 2);
    set(els["o-theory"], theoryG, 3);
    set(els["o-iso"],    isoG, 3);
    set(els["o-bor"],    borG, 3);

    if (isolated > 0 && theoryG > 0) {
      els["o-yield"].textContent = ((isolated / theoryG) * 100).toFixed(1);
    } else {
      els["o-yield"].textContent = "—";
    }
  }

  ["in-camphor", "in-equiv", "in-isolated"].forEach(function (id) {
    if (els[id]) els[id].addEventListener("input", update);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", update);
  } else {
    update();
  }
})();
