# jona42-ui.github.io

Personal site of Thembo Jonathan — built with [Astro](https://astro.build), deployed to GitHub Pages.

## Updating content

Everything lives in two data files; pages and PDFs are generated from them.

| What | Where |
| --- | --- |
| CV (summary, skills, jobs, education, certs…) | `src/data/resume.ts` |
| Portfolio cards, stats, filters | `src/data/projects.ts` |
| Blog posts (Markdown) | `src/content/blog/*.md` |
| Images, static files | `public/` |

Bullet text supports `**bold lead-in:**` and `` `code` ``.

## Commands

```bash
npm install          # once
npm run dev          # local dev server at http://localhost:4321
npm run build        # build to dist/
npm run pdf          # print resume & portfolio PDFs into dist/ (needs Chrome)
npm run pdf -- public  # …and refresh the committed fallback copies in public/
```

Pushing to `main` builds the site, regenerates both PDFs and deploys (`.github/workflows/deploy.yml`).

## Structure

```
src/
  data/        resume.ts, projects.ts   ← edit content here
  content/     blog posts
  components/  Nav, Footer, ProjectCard, SocialIcon
  layouts/     Base.astro (head/SEO, nav, footer)
  pages/       index, resume, portfolio, blog, 404
  styles/      global.css (screen + print/PDF styles)
public/        images, PDFs, manifest, robots.txt
_archive/      unused source files kept out of the deployed site
```
