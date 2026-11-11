HIVE – Hub for Innovation and Entrepreneurship, SRIT
Website package for www.sritcbe.ac.in/hive
=====================================================

WHAT IS INSIDE
  index.html               Home: 3D hero, about, vision/mission, what HIVE offers,
                           products (TRL flip cards), IIC star rating, ecosystem,
                           achievements, publications, gallery, contact
  industry-connect.html    Industry Connect: content of the "Intelligent Systems –
                           AI Innovation Showcase" tri-fold brochure (15 AI projects,
                           services, engagement process, contact person, QR)
  publications.html        3D book library with filters, plus View / Download for every book
  downloads/               9 PDFs (books, annual report, IIC records, brochure)
  assets/css/hive.css      Theme: Roboto, SRIT green #02775A, gold #C8A736
  assets/js/hive.js        Animations: scroll reveal, counters, 3D tilt, flip, lightbox
  assets/js/hero3d.js      3D hero scenes (honeycomb / neural network / book field)
  assets/js/vendor/three.min.js   three.js r160 (bundled; no CDN needed)
  assets/img/              Logos, campus and event photos, project images, book covers

HOW TO PUBLISH
  It is a plain static site. There is no build step, no database and no server code.
  1. Upload the whole folder, keeping its structure, to any static location, e.g.
       https://www.sritcbe.ac.in/hive-portal/   or   https://hive.sritcbe.ac.in/
  2. Link to it from the existing HIVE page (for example a "Visit HIVE Portal" button),
     or point the /hive menu item to  <folder>/index.html
  3. All links are relative, so the site works in any sub-folder.

  If the main site is on Webflow (no folder hosting):
   - Host this folder on a sub-domain (hive.sritcbe.ac.in) using any static host
     (the college server, Netlify, GitHub Pages, Cloudflare Pages), then link it from Webflow, or
   - Upload the PDFs in /downloads to Webflow Assets and replace the "downloads/..."
     links if you rebuild the pages inside Webflow.

UPDATING CONTENT
  - To add a new book, put the PDF in /downloads and its cover (JPG, ~830 x 1170 px)
    in /assets/img/books, then copy one "book-card" block in publications.html and edit it.
  - To add photos, put them in /assets/img/gallery and copy a <figure> block in the gallery section.
  - Fonts load from Google Fonts (Roboto). If that is blocked, the site falls back to system fonts.

BROWSER SUPPORT
  Chrome, Edge, Firefox and Safari (desktop and mobile). The 3D scenes need WebGL. Without it
  the hero shows the green gradient instead. Visitors who set "reduce motion" see no animations.

Contact: Mr. R. Immanual, HIVE In-charge · +91 96778 17992 · hive@sritcbe.ac.in
