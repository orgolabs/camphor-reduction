# Reduction of Camphor — an interactive, fact-checked explainer

An open educational resource on the **sodium borohydride (NaBH₄) reduction of camphor** to its two
diastereomeric alcohols, **isoborneol** (major) and **borneol** (minor). It explains *why* the reaction is
selective — a textbook case of **steric approach control** — with:

- **Real 3D structures** you can rotate and zoom (ball-and-stick / stick / space-fill), loaded from actual
  PubChem geometries via [3Dmol.js](https://3dmol.csb.pitt.edu/). All three molecules use the natural
  **(1R,4R)** series with *defined* stereochemistry, so isoborneol (exo-OH) and borneol (endo-OH) differ
  **only at C2** — exactly as the lab manual draws them.
- A **step-by-step mechanism** (exo vs. endo hydride attack, plus the borate-ester delivery and why water is
  added at the end) and the **real Week-3 micro-scale procedure** from the course lab manual
  (`docs/reduction-of-camphor-lab-manual.pdf`, also downloadable from the page).
- A **live stoichiometry & yield calculator** pre-filled with the manual's micro-scale amounts.
- **Verified references** with access labels (open vs. subscription) and resolvable DOIs.

It is a single static site — no build step, no framework — so it runs by opening `index.html` or from GitHub Pages.

## The chemistry in one paragraph

Camphor (1,7,7-trimethylbicyclo[2.2.1]heptan-2-one, C₁₀H₁₆O, 152.23 g/mol) is reduced by NaBH₄ to
C₁₀H₁₈O alcohols (154.25 g/mol). The reduction is fast and essentially irreversible, so the ratio is set
kinetically by **which face of the carbonyl the hydride can reach**. The 7,7-*gem*-dimethyl bridge roofs the
**exo** face, so hydride adds preferentially from the open **endo** face — placing the new –OH **exo** and
giving **isoborneol** as the major product (commonly reported ≈ 90 : 10 isoborneol : borneol; exact values
vary with solvent/conditions). The minor **endo-OH** product is **borneol**.

## Project structure

```
.
├── index.html          # the page (content + layout)
├── css/
│   └── styles.css       # light/dark, responsive styling
├── js/
│   ├── structures.js    # embedded SDF geometries (camphor, isoborneol, borneol)
│   ├── viewer.js        # 3Dmol.js viewers + display controls
│   ├── calculator.js    # live scale & yield math
│   └── references.js    # reference list (rendered into the page)
├── data/
│   ├── camphor.sdf      # source 3D structures from PubChem (PUG-REST), (1R,4R) series
│   ├── isoborneol.sdf
│   └── borneol.sdf
├── docs/
│   └── reduction-of-camphor-lab-manual.pdf   # the course lab manual (downloadable from the page)
├── .nojekyll            # tell GitHub Pages to serve files as-is
├── LICENSE              # MIT
└── README.md
```

The 3D coordinates are **embedded** in `js/structures.js` (generated from the files in `data/`) so the viewer
works offline and over `file://` without any fetch/CORS setup. The `data/*.sdf` files are kept as the
human-readable source of truth.

## Run it locally

Just open `index.html` in a browser. (For a local server instead: `python3 -m http.server` then visit
`http://localhost:8000`.) An internet connection is needed only to load 3Dmol.js from the CDN; if that fails,
the page shows a clear fallback message and the rest of the content still works.

## References

Full citations with DOIs are listed on the page and in `js/references.js`. The key sources:

1. Brown, H. C.; Muzzio, J. *J. Am. Chem. Soc.* **1966**, 88, 2811–2822. — "steric approach control," the
   primary camphor data. doi:10.1021/ja00964a034
2. Wigfield, D. C. *Tetrahedron* **1979**, 35, 449–462. — review of the mechanism/stereochemistry debate.
   doi:10.1016/0040-4020(79)80140-4
3. Markgraf, J. H. *J. Chem. Educ.* **1967**, 44, 36. — exo/endo correlations in the camphor series.
   doi:10.1021/ed044p36
4. PubChem (NLM) — compound records & 3D conformers: camphor CID 159055, isoborneol CID 6321405, borneol CID 6552009.
5. Course organic chemistry laboratory manual — *Reduction of Camphor with Sodium Borohydride* (Week 3, micro
   scale): the procedure, amounts and background reproduced on the page. See `docs/`.

## Credits & licensing

- Site content and code: **MIT License** (see [`LICENSE`](LICENSE)).
- Molecular data: **PubChem**, U.S. National Library of Medicine — **public domain**.
- 3D rendering: **3Dmol.js** (Rego & Koes, *Bioinformatics* 2015) — **BSD-3-Clause**, loaded from a CDN.

> Educational summary only — not a substitute for a supervised laboratory standard operating procedure.
> NaBH₄ releases flammable H₂ and is corrosive; methanol is flammable and toxic. Use appropriate PPE and a fume hood.
