# Vue Static Site Demo (Bootstrap 5 + Vue Router + AWS S3)

A basic Vue 3 project scaffold that builds to a fully static bundle, suitable
for hosting on an AWS S3 static-website bucket.

## Stack

- **Vue 3** (`<script setup>` SFCs)
- **Vue Router 4** using `createWebHashHistory()` (works on plain S3 hosting,
  no server rewrite rules required)
- **Bootstrap 5** (CSS + JS bundle) for styling and interactive components
  (collapse, accordion, tabs, modals)
- **Vite** as the build tool

## Project structure

```
public/
  data/                 # JSON "APIs" served as static files
    common-links.json
    faqs.json
    gallery.json
  templates/reply/      # HTML partials loaded via v-template-url (see below)
src/
  assets/styles/         custom.css        - overrides on top of Bootstrap
  components/            AppHeader.vue     - nav + 3 modal-triggering icons
  composables/            useFetch.js      - reusable local/remote JSON fetch helper
  directives/             templateUrl.js   - Angular-style templateUrl directive
  router/                 index.js         - the 5 routes
  views/
    Home.vue
    CommonLinks.vue       - collapsible cards (Bootstrap "panels")
    CommonReply.vue       - 3 tabs, each with a 4-item accordion
    Faqs.vue              - 5 topics, each a card with its own accordion
    Gallery.vue           - dynamic image grid from JSON + preview modal
  App.vue
  main.js
```

## Local development

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

This produces a `dist/` folder containing everything needed: `index.html`,
`assets/*.js`, `assets/*.css`, plus the copied `data/` and `templates/`
folders from `public/`.

## Deploying to AWS S3

1. Create an S3 bucket (bucket name doesn't need to match a domain unless
   you're using it directly as your site's URL).
2. Enable **Static website hosting** on the bucket:
   - Index document: `index.html`
   - Error document: `index.html`
     (not strictly required with hash-history routing, but harmless to set)
3. Upload the **contents** of `dist/` to the bucket root (not the `dist`
   folder itself) - e.g. `aws s3 sync dist/ s3://your-bucket-name --delete`
4. Make the bucket contents publicly readable (bucket policy) or, better,
   put **CloudFront** in front of it with an Origin Access Control - this
   also gets you HTTPS and a custom domain.
5. Visit the S3 website endpoint (or your CloudFront/custom domain). Routes
   will look like `.../index.html#/faqs` thanks to hash-history routing.

If you'd rather have clean URLs (`/faqs` instead of `/#/faqs`), switch the
router to `createWebHistory()` in `src/router/index.js` and configure
CloudFront to return `index.html` with a 200 status for 403/404 responses
from the S3 origin (S3 alone can't do this rewrite).

## Notable functionality

- **Reading remote resources**: `src/composables/useFetch.js` is a small
  reusable fetch wrapper (loading/error/data state) used by CommonLinks,
  Faqs and Gallery. Point any of the URLs at a real HTTPS API and it works
  identically.
- **templateUrl-style includes**: `src/directives/templateUrl.js` registers
  a global `v-template-url` directive. Bind it to a URL and it fetches that
  HTML file and injects it into the element - conceptually the same as
  AngularJS's `templateUrl` on a directive/component. Used throughout the
  Common Reply accordion items (`public/templates/reply/*.html`).
