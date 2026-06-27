# Abdur Rahman Razu Portfolio

A personal photography and videography portfolio for Abdur Rahman Razu, built with Next.js App Router, React, TypeScript, Tailwind CSS, and shadcn-ui components.

## Local Development

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Build for production:

```sh
npm run build
```

Run lint checks:

```sh
npm run lint
```

## Project Structure

- `src/app/page.tsx` contains the main portfolio page.
- `src/data/media.ts` contains the photo and video data.
- `src/components/` contains the hero, gallery, about, contact, navigation, and footer sections.
- `src/assets/` stores source images used by the React app.
- `public/` stores static files served from the site root, including the CV and social preview image.

## Social Preview

The website link preview uses `public/og-image.jpg`, referenced by the Open Graph and Twitter metadata in `index.html`.

When replacing the preview image, keep it at `1200x630` for best compatibility with social platforms.

## Deployment

Deploy the production build output from `npm run build` to the hosting provider connected to the public portfolio URL:

```txt
https://photographer-abdur-rahman-nt5b.vercel.app
```
