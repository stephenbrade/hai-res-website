# Live Music Diffusion Models: supplementary website

Static GitHub Pages site for audio samples and LMDM generative delay interaction video embeds.

## Publish on GitHub Pages

1. Push this repository to `https://github.com/lmdm-anon/lmdm-anon-submission`.
2. On GitHub: **Settings → Pages**.
3. **Source**: Deploy from a branch.
4. **Branch**: `main`, folder **`/ (root)`**, Save.

Site URL: `https://lmdm-anon.github.io/lmdm-anon-submission/`

## Adding assets

- **Audio**: Place files under `audio/` in the subfolders that match each section, then update `src` on each `<audio>` element in `index.html` (search for `REPLACE_AUDIO`).
- **Sketch images**: Place PNG/WebP under `images/sketch-conditioned/` and set `<img src="...">` (search for `REPLACE_IMAGE`).
- **YouTube**: “LMDM Generative Delay Interactions” embeds are set in `index.html`; swap iframe URLs there if you re-upload clips (optional privacy URL: `https://www.youtube-nocookie.com/embed/VIDEO_ID`).

## Local preview

From this directory:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.
