# W Consulting Services website

Single-page static landing site, no build step. Sections: hero, services, "Also from W Consulting" cards (Candid Table, Hound, WonderWired Learning), about, find a time, contact.

## Brand

Styled to the Stephen Washington brand kit (Nov 2026). Rules that matter when editing:

- **Blues carry the page.** Tokens `--b1` (pale, text and the one light section) through `--b5` (page background) in `css/styles.css`.
- **Gold is rare on purpose.** `--g1` and friends appear only in the angled divider bars between sections, the pull quote in About, the "No-BS November" label, and hover/active states on links and buttons. Do not add gold elsewhere.
- **Type.** Besley (Google Fonts) for headings and the quote; Plus Jakarta Sans (self-hosted in `fonts/`, SIL OFL) for everything else, with the ss03 alternates on body text and ss01 on small accents.
- **Dividers.** Each `<svg class="div">` in `index.html` is a slanted bar whose top fill matches the section above and polygon fill matches the section below. Keep them when reordering sections.
- **Lettermark.** The SW lettermark is an inline `<symbol id="lettermark">` at the top of `<body>`, reused in the header, hero watermark, and footer.
- **Favicons.** `favicon.svg` is the source (lettermark on the brand blue, rounded). `favicon.ico` (16/32/48), `apple-touch-icon.png` (180, square), `icon-192.png` and `icon-512.png` (manifest) are rendered from it. To regenerate after changing the mark: render the SVG at 1024px (QuickLook `qlmanage -t -s 1024` works on macOS), resize with `sips`, and rebuild the ICO.

- `index.html` — the page
- `css/styles.css` — styles; brand colors are CSS variables at the top
- `js/main.js` — **site config** (top of file) plus nav, scheduling embed, and contact form wiring

Advisory boards, dinners, panels, and roundtables are not on this site. They live at [candidtable.com](https://candidtable.com), which the page links to.

## Before launch: fill in `SITE_CONFIG` in `js/main.js`
| Key | What it does |
|---|---|
| `schedulingUrl` | Cal.com / Calendly / Google appointment page. When set, it is embedded in "Find a time". When empty, the section shows an email fallback. |
| `formEndpoint` | Where the contact form posts (e.g. a Formspree URL). When empty, submitting opens the visitor's mail client with a pre-filled message to `contactEmail`. |
| `contactEmail` | Public address shown on the page (contact@wconsulting.io). |

## Preview locally
```
python3 -m http.server 8765 --directory site
```
Then open http://localhost:8765

## Deploy
Upload the `site/` folder contents to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3).
