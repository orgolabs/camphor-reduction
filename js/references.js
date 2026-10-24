// References — verified against Crossref/PubChem on 2026-10-24.
// "access" marks how freely each source can be read: 'open' = free/public, 'paywall' = subscription (DOI still resolves to the record of record).
window.REFERENCES = [
  {
    title: "Rates of Reaction of Sodium Borohydride with Bicyclic Ketones. Steric Approach Control and Steric Departure Control in the Reactions of Rigid Bicyclic Systems",
    authors: "Brown, H. C.; Muzzio, J.",
    meta: "J. Am. Chem. Soc. 1966, 88 (12), 2811–2822.",
    note: "The primary source: introduces “steric approach control” using camphor and related bicyclics; the origin of the isoborneol-major result.",
    url: "https://doi.org/10.1021/ja00964a034",
    linkText: "doi.org/10.1021/ja00964a034",
    access: "paywall"
  },
  {
    title: "Stereochemistry and mechanism of ketone reductions by hydride reagents",
    authors: "Wigfield, D. C.",
    meta: "Tetrahedron 1979, 35 (4), 449–462.",
    note: "Classic review weighing steric approach, torsional strain and electronic effects — the nuance behind the simple picture.",
    url: "https://doi.org/10.1016/0040-4020(79)80140-4",
    linkText: "doi.org/10.1016/0040-4020(79)80140-4",
    access: "paywall"
  },
  {
    title: "Stereochemical correlations in the camphor series",
    authors: "Markgraf, J. H.",
    meta: "J. Chem. Educ. 1967, 44 (1), 36.",
    note: "Education-oriented treatment of exo/endo relationships in the bornane/camphor system.",
    url: "https://doi.org/10.1021/ed044p36",
    linkText: "doi.org/10.1021/ed044p36",
    access: "paywall"
  },
  {
    title: "Camphor (CID 2537), Isoborneol (CID 6321405), Borneol (CID 64685)",
    authors: "PubChem, U.S. National Library of Medicine.",
    meta: "Public-domain compound records: formulas, molar masses, computed 3D conformers (source of the viewers above).",
    note: "Free and public. The 3D coordinates on this page come directly from these records via the PUG-REST API.",
    url: "https://pubchem.ncbi.nlm.nih.gov/compound/2537",
    linkText: "pubchem.ncbi.nlm.nih.gov/compound/2537",
    access: "open"
  },
  {
    title: "Borneol / Isoborneol — diastereomer definitions and reduction methods",
    authors: "Wikipedia contributors.",
    meta: "Open reference used to corroborate exo/endo assignment and that NaBH₄ (fast, irreversible) favours isoborneol.",
    note: "Free and public; a convenient entry point with onward citations.",
    url: "https://en.wikipedia.org/wiki/Borneol",
    linkText: "en.wikipedia.org/wiki/Borneol",
    access: "open"
  },
  {
    title: "3Dmol.js: molecular visualization with WebGL",
    authors: "Rego, N.; Koes, D.",
    meta: "Bioinformatics 2015, 31 (8), 1322–1324.",
    note: "The open-source (BSD-3) library rendering the interactive structures on this page.",
    url: "https://doi.org/10.1093/bioinformatics/btu829",
    linkText: "doi.org/10.1093/bioinformatics/btu829",
    access: "open"
  }
];

(function renderRefs() {
  var ol = document.getElementById("ref-list");
  if (!ol || !window.REFERENCES) return;
  window.REFERENCES.forEach(function (r) {
    var li = document.createElement("li");
    var badge = '<span class="access ' + (r.access === "open" ? "open" : "paywall") + '">' +
      (r.access === "open" ? "open access" : "subscription") + "</span>";
    li.innerHTML =
      '<span class="ref-title">' + r.authors + "</span> " +
      "“" + r.title + "” " +
      '<span class="ref-meta">' + r.meta + "</span> " + badge +
      "<br>" + r.note +
      ' <br><a href="' + r.url + '" target="_blank" rel="noopener noreferrer">' + r.linkText + "</a>";
    ol.appendChild(li);
  });
})();
