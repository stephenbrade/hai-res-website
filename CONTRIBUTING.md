# Contributing to the HAI-RES website

Each profile, blog post, and music piece lives in **its own folder**. You only edit your folder, then open a pull request.

## Workflow

1. Clone the repo and create a branch: `git checkout -b my-update`
2. Copy the relevant `_template` folder:
   - Profile: `profiles/_template/` → `profiles/your_name/`
   - Blog: `blog_posts/_template/` → `blog_posts/my_post/`
   - Music: `music/_template/` → `music/piece_slug/`
3. Edit `index.html` and add files under `assets/`
4. Push and open a PR — Anna or Stephen will review and merge
5. CI regenerates listing pages automatically

## Required metadata

Every listable `index.html` must include these tags in `<head>`:

```html
<meta name="hai-res:type" content="profile">
<meta name="hai-res:date" content="2026-05-25">
<meta name="hai-res:title" content="Your Name">
<meta name="hai-res:subtitle" content="Role · tagline">
<meta name="hai-res:thumbnail" content="./assets/photo.svg">
```

For blog posts, also add:

```html
<meta name="hai-res:excerpt" content="One-line summary.">
<meta name="hai-res:thumbnail" content="./assets/thumbnail.jpg">
```

Blog posts **require** a thumbnail image at the path given in `hai-res:thumbnail` (used on the home page carousel and blog listing). Recommended size: roughly 1200×675 (16:9).

Use `content="blog"` or `content="music"` for other types.

## Blog posts: keep site navigation

Every blog post **must** include the lab site header with links back to the main site (copy from `templates/snippets/blog_site_header.html`). The build script validates:

- `class="site-header"`
- `href="../../blog.html"`
- `href="../../index.html"`

Listings link to `./blog_posts/your_slug/index.html` so assets under `./assets/` resolve correctly.

## Video (YouTube only)

Do **not** commit `.mp4` files — they are gitignored and exceed GitHub’s file size limits.

Upload videos to **YouTube**, then embed them with a privacy-friendly iframe:

```html
<iframe
  src="https://www.youtube-nocookie.com/embed/VIDEO_ID"
  title="Short description"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
  loading="lazy"></iframe>
```

See `blog_posts/live_music_diffusion_models/index.html` for working examples.

## Rich blog posts

See `blog_posts/live_music_diffusion_models/` for a full supplementary-page example (audio, YouTube embeds, local CSS).

## Local check

Before opening a PR:

```bash
python3 scripts/build_listings.py
```

Fix any metadata errors reported by the script.
