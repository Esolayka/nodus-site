# Nodus website

Standalone static landing page for [Nodus](https://github.com/Esolayka/Nodus).

## Preview

Run any local static server from this directory:

```sh
python3 -m http.server 4173
```

Then open <http://localhost:4173>.

## Deploy

The site has no build step or runtime dependencies. Deploy the directory as-is to GitHub Pages, Cloudflare Pages, Netlify, or any static web server.

Download links currently target Nodus `v0.1.1`. Update `RELEASE_BASE` in `script.js` and the platform links in `index.html` when publishing a new version.
