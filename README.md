# HIVE – Hub for Innovation and Entrepreneurship, SRIT

Website for **HIVE at Sri Ramakrishna Institute of Technology, Coimbatore**. It is designed to sit under [sritcbe.ac.in/hive](https://www.sritcbe.ac.in/hive).

## Pages
| Page | Content |
|---|---|
| `index.html` | 3D honeycomb hero, about, vision and mission, products with TRL ratings, IIC star rating, ecosystem, achievements, publications, gallery, contact |
| `industry-connect.html` | *Intelligent Systems – AI Innovation Showcase*: 15 AI projects, services, engagement process |
| `publications.html` | 3D book library with downloads: HIVE Report 2026, NISP & Start-ups, KAPILA & IPR Cell, HIVE Annual Report, IIC records and more |

## Tech
Plain static HTML, CSS and JavaScript, with no build step. three.js r160 is bundled in `assets/js/vendor`.
The theme matches sritcbe.ac.in: Roboto, SRIT green `#02775A` and gold `#C8A736`.

## Run locally
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Hosting
Works on GitHub Pages (Settings → Pages → Deploy from branch → `main` / root) or any static host.
See `README_FOR_WEB_ADMIN.txt` for how to integrate it with the college website.

© HIVE, Sri Ramakrishna Institute of Technology · hive@sritcbe.ac.in
