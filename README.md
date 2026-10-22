# Certificate Static Website

This repository contains a static certificate page that can be deployed to
Render Static Sites, GitHub Pages, Netlify, Vercel, or Cloudflare Pages.

## Render settings

- **Branch:** `main`
- **Root Directory:** `static-site`
- **Build Command:** leave blank
- **Publish Directory:** `.`
- **Environment variables:** none

## Certificate URL

After deployment, open:

```text
/verify/NOC-E9RC-8P2V-TJ807/
```

The root URL redirects to the same certificate page. Clicking the certificate
image downloads:

```text
/lastpdf.pdf
```

The static site does not require Java, Spring Boot, Maven, Docker, MySQL, or
server-side environment variables.
