# Human-AI Resonance Lab Website

Static GitHub Pages site for the Human-AI Resonance (HAI-RES) lab at MIT.

## Structure

- **Maintainer pages**: `index.html`, `join.html`
- **Generated listings**: `people.html`, `blog.html`, `music.html`, `publications.html`
- **Modular content**: `profiles/`, `blog_posts/`, `music/` — one folder per person/post/piece

## Local preview

```bash
python3 -m http.server 8080
```

Open http://localhost:8080

## Regenerate listings

```bash
python3 scripts/build_listings.py
python3 scripts/sync_scholar.py   # requires: pip install scholarly
```

Or use the project venv after first setup:

```bash
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
.venv/bin/python scripts/sync_scholar.py
```

## GitHub Pages

1. Push to GitHub
2. Settings → Pages → Deploy from branch `main`, folder `/ (root)`
3. Optional: set repository variable `GOOGLE_SCHOLAR_ID` to `NRz_EVgAAAAJ` for Scholar sync

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
