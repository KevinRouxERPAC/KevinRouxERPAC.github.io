# ERPAC Website

This repository hosts the source code for **ERPAC**, a company specialised in electronic board design, automation and electrotechnical solutions. The website provides an overview of our services and showcases our know‑how.

## Directory structure

- `css/` – Stylesheets used by all pages
- `js/` – JavaScript files handling the menu, contact form, map and carousel
- `images/` – Images organised in subfolders for each section
- HTML pages (`index.html`, `about.html`, `electronique.html`, etc.)
- `.github/workflows/` – Continuous deployment configuration

## Deployment with GitHub Actions

A workflow defined in `.github/workflows/deploy.yml` deploys the site automatically via FTP whenever changes are pushed to the `main` branch. The action uses `SamKirkland/FTP-Deploy-Action` and requires the `FTP_PASSWORD` secret to be set in your repository settings.
