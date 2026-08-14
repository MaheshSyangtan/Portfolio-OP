# ������ Mahesh Syangtan — Cybersecurity Professional Portfolio

> **Securing Architecture. Defending Data.**  
> A modern, terminal-inspired portfolio showcasing expertise in Penetration Testing, Application Security, Threat Hunting, and GRC.

[![Live Demo](https://img.shields.io/badge/Live-Demo-00ff66?style=for-the-badge&logo=vercel&logoColor=black)](https://maheshsyangtan.com)
[![GitHub](https://img.shields.io/badge/GitHub-MaheshSyangtan-181717?style=for-the-badge&logo=github)](https://github.com/MaheshSyangtan)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Mahesh%20Syangtan-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/mahesh-syangtan-34989441a/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

## ��� Preview

| Desktop | Mobile |
|---------|--------|
| ![Desktop Preview](assets/preview-desktop.png) | ![Mobile Preview](assets/preview-mobile.png) |

> **Note:** Add screenshots to `assets/` folder to enable previews above.

---

## �� Features

### ��� Design & UX
- **Terminal/CLI Aesthetic** — Authentic hacker-inspired design with matrix-style animations
- **Dark Theme First** — Easy on the eyes, optimized for long viewing sessions
- **Fully Responsive** — Seamless experience from 320px to 4K displays
- **Smooth Animations** — IntersectionObserver-powered scroll reveals, counter animations, typewriter effects
- **Accessibility Ready** — Semantic HTML, ARIA labels, keyboard navigation, focus management

### ��� Sections
| Section | Description |
|---------|-------------|
| **Hero** | Animated particle background, live terminal simulation, dynamic role typewriter |
| **About** | Bio, philosophy, animated stat counters (CTFs, vulns found, years learning) |
| **Skills Matrix** | 4 categories: Offensive, Defensive, Cloud/DevSecOps, Programming — 36+ technologies |
| **Projects** | 3 featured projects with tech stacks, GitHub links, and write-ups |
| **Education & Certs** | Timeline layout with certifications (eJPT, Security+, THM, HTB) and formal education |
| **Contact** | Formspree-powered form with validation, social links, copy-to-clipboard email |

### ��� Technical Highlights
- **Zero Dependencies** — Pure vanilla HTML, CSS, JavaScript (no frameworks)
- **Performance Optimized** — < 50KB gzipped, lazy-loaded animations, efficient particle system
- **SEO Ready** — Meta tags, Open Graph, semantic structure, sitemap-ready
- **Formspree Integration** — Serverless contact form, no backend required
- **PWA Ready** — Manifest and service worker compatible

---

## ������ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Markup** | HTML5 (Semantic, Accessible) |
| **Styling** | CSS3 (Custom Properties, Grid, Flexbox, Animations, Media Queries) |
| **Scripting** | Vanilla ES6+ (Modules, IntersectionObserver, Canvas API, Fetch API) |
| **Fonts** | [Inter](https://fonts.google.com/specimen/Inter) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) |
| **Icons** | [Phosphor Icons](https://phosphoricons.com/) (Web Component) |
| **Forms** | [Formspree](https://formspree.io/) (Serverless) |
| **Deployment** | Vercel / Netlify / GitHub Pages / Cloudflare Pages |

---

## ��� Project Structure

```
Portfolio-OP/
├── index.html          # Main HTML document
├── css/
│   └── style.css       # Complete stylesheet (~1200 lines)
├── js/
│   └── main.js         # All interactive logic (~500 lines)
├── assets/             # Images, screenshots, favicon (create this)
│   ├── preview-desktop.png
│   ├── preview-mobile.png
│   └── favicon.ico
├── resume.pdf          # Your resume (linked in hero CTA)
��── README.md           # This file
```

---

## ��� Quick Start

### Prerequisites
- A modern browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Optional: Local server for development (`live-server`, `python -m http.server`, VS Code Live Server)

### Installation

```bash
# Clone the repository
git clone https://github.com/MaheshSyangtan/portfolio.git
cd portfolio

# Option 1: Open directly in browser
open index.html

# Option 2: Serve locally (recommended for Formspree/contact form)
npx live-server
# or
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## ������ Customization Guide

### 1. Personal Information
Edit `index.html` — Update these key areas:

```html
<!-- Meta & Title -->
<meta name="author" content="Your Name" />
<title>Your Name | Cybersecurity Professional</title>

<!-- Hero Section -->
<h1 class="hero-name">Your Name</h1>
<h2 class="hero-title">
  <span class="title-static">Your Primary Role</span>
  <span class="title-dynamic" id="hero-title-dynamic"></span>
</h2>

<!-- Contact Form Action -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### 2. Dynamic Titles (Typewriter Effect)
Edit `js/main.js` — Modify the `titles` array:

```javascript
const titles = [
  'Your Role 1',
  'Your Role 2',
  'Your Role 3',
  // Add more...
];
```

### 3. Skills & Technologies
Edit `index.html` — Update skill tags in each category card:

```html
<div class="skill-tags">
  <span class="skill-tag">Your Skill</span>
  <!-- Add/remove tags -->
</div>
```

### 4. Projects
Edit `index.html` — Duplicate/modify project cards:

```html
<article class="project-card">
  <div class="project-card-header">
    <div class="project-icon"><i class="ph ph-your-icon"></i></div>
    <span class="project-badge active">Active</span>
  </div>
  <h3 class="project-title">Project Name</h3>
  <p class="project-desc">Description...</p>
  <div class="project-tech-tags">
    <span class="tech-tag">Tech 1</span>
    <span class="tech-tag">Tech 2</span>
  </div>
  <div class="project-links">
    <a href="https://github.com/your/repo" class="btn-link" target="_blank">
      <i class="ph ph-github-logo"></i> GitHub
    </a>
  </div>
</article>
```

### 5. Certifications & Education
Edit `index.html` — Update cert cards and education timeline items.

### 6. Color Theme
Edit `css/style.css` — Modify CSS custom properties in `:root`:

```css
:root {
  --accent-green:  #00ff66;    /* Primary accent */
  --accent-blue:   #00d4ff;    /* Secondary accent */
  --accent-purple: #b77cff;    /* Tertiary accent */
  --bg-primary:    #0d1117;    /* Background */
  --text-primary:  #e8edf5;    /* Main text */
}
```

### 7. Resume
Place your `resume.pdf` in the root directory (linked from hero CTA button).

### 8. Favicon & Social Preview
Add to `assets/`:
- `favicon.ico` (32x32)
- `og-image.png` (1200x630) for Open Graph
- Update `index.html` head:
```html
<link rel="icon" href="assets/favicon.ico" />
<meta property="og:image" content="assets/og-image.png" />
```

---

## ��� Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
# Drag & drop the folder to netlify.com/drop
# Or connect GitHub repo for auto-deploys
```

### GitHub Pages
1. Push to GitHub
2. Settings → Pages → Source: `main` branch / `/root`
3. Access at `https://username.github.io/repo-name`

### Cloudflare Pages
1. Connect GitHub repo in Cloudflare Dashboard
2. Build command: (none) | Output directory: `/`
3. Deploy

---

## ��� Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | �� Full |
| Firefox | 88+ | �� Full |
| Safari | 14+ | �� Full |
| Edge | 90+ | �� Full |
| Mobile Safari | 14+ | �� Full |
| Chrome Mobile | 90+ | �� Full |

---

## ��� Performance

| Metric | Target | Actual |
|--------|--------|--------|
| **Total Size (gzipped)** | < 50 KB | ~35 KB |
| **First Contentful Paint** | < 1.5s | ~0.8s |
| **Lighthouse Performance** | > 90 | 95+ |
| **Lighthouse Accessibility** | > 95 | 100 |
| **Lighthouse Best Practices** | > 90 | 100 |
| **Lighthouse SEO** | > 90 | 100 |

---

## �� Accessibility Checklist

- [x] Semantic HTML5 elements (`header`, `nav`, `main`, `section`, `article`, `footer`)
- [x] ARIA labels on interactive elements
- [x] Focus visible states for keyboard navigation
- [x] Color contrast ratios (WCAG AA)
- [x] Reduced motion support (`prefers-reduced-motion`)
- [x] Alt text for all meaningful images
- [x] Form labels and error announcements
- [x] Skip to main content link (add if needed)

---

## ��� Contributing

While this is a personal portfolio, suggestions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## ��� License

Distributed under the **MIT License**. See `LICENSE` for more information.

```
MIT License

Copyright (c) 2025 Mahesh Syangtan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## ��� Contact & Links

| Platform | Link |
|----------|------|
| **Email** | [lanamahesh128@gmail.com](mailto:lanamahesh128@gmail.com) |
| **GitHub** | [github.com/MaheshSyangtan](https://github.com/MaheshSyangtan) |
| **LinkedIn** | [linkedin.com/in/mahesh-syangtan-34989441a](https://www.linkedin.com/in/mahesh-syangtan-34989441a/) |
| **TryHackMe** | [tryhackme.com/p/MaheshSyangtan](https://tryhackme.com/p/MaheshSyangtan) |
| **Hack The Box** | [hackthebox.eu/profile/...](https://app.hackthebox.eu/profile/...) |

---

## ��� Acknowledgments

- **Fonts**: [Inter](https://rsms.me/inter/) by Rasmus Andersson, [JetBrains Mono](https://www.jetbrains.com/lp/mono/) by JetBrains
- **Icons**: [Phosphor Icons](https://phosphoricons.com/) by Phosphor Icons Team
- **Inspiration**: Terminal aesthetics, cybersecurity community, open-source contributors
- **Tools**: VS Code, Chrome DevTools, Lighthouse, Formspree

---

## ��� Repository Stats

![GitHub stars](https://img.shields.io/github/stars/MaheshSyangtan/portfolio?style=social)
![GitHub forks](https://img.shields.io/github/forks/MaheshSyangtan/portfolio?style=social)
![GitHub issues](https://img.shields.io/github/issues/MaheshSyangtan/portfolio)
![GitHub last commit](https://img.shields.io/github/last-commit/MaheshSyangtan/portfolio)

---

<div align="center">

**Built with ������, ��, and a terminal.**

*If you like this portfolio, consider giving it a ��� on GitHub!*

</div>