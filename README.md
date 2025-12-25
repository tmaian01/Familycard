# Interactive Christmas Card (GitHub Pages)

## What this is
A 3-page interactive card:
- Page 1 -> Page 2 -> Page 3 (tap/click or swipe to advance)
- On Page 3, the 🔍 buttons open zoomable views of the left/right inside pages
- Music attempts to autoplay on Page 3 and loops (subject to browser autoplay rules)
- Music toggle button (♪ / ⏸)

## Add your music
Place an MP3 at:
`assets/audio/music.mp3`

## Run locally
Open `index.html` in a browser, or serve the folder:
- Python: `python -m http.server 8000`
- Then visit: http://localhost:8000

## Publish on GitHub Pages
1. Create a GitHub repo (e.g., `christmas-card`)
2. Upload the contents of this folder to the repo root
3. In GitHub: **Settings → Pages**
   - Source: `Deploy from a branch`
   - Branch: `main` / root
4. Share the Pages URL GitHub shows.

## Replace images
Replace these files (keep names):
- `assets/images/page1.png`
- `assets/images/page2.png`
- `assets/images/page3.png`
- `assets/images/page3-left.png`
- `assets/images/page3-right.png`
