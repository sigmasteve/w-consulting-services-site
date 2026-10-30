# W Consulting Services website

Single-page static landing site, no build step. Sections: hero, services, "Also from W Consulting" cards (Candid Table, Hound), about, find a time, contact.

Typeface: Plus Jakarta Sans (SIL Open Font License, see `fonts/OFL.txt`), self-hosted as a single variable font in `fonts/` so the stylistic sets work. Headings use ExtraBold with the Lancip alternates (`font-feature-settings: "ss01"` in `css/styles.css`); drop that line to go back to the default letterforms.

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
