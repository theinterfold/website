# The Interfold Website

Website for The Interfold, a system for confidential coordination.

The site introduces the Interfold execution model, explains how private inputs can produce shared, verifiable outcomes, and provides routes into the protocol, documentation, blog, and participation.

## Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal.

## Design notes

This project uses the Interfold homepage as the source of truth for visual style, typography, spacing, colors, animations, and responsive behavior.

When adding or editing pages, reuse existing styles and components where possible. Avoid introducing one-off values unless strictly necessary.

## Technical SEO

`seo/routes.mjs` is the route and metadata registry. When adding a page, add its
entry here and render its key in `ResponsiveLayout.tsx`. The build generates one
HTML document per route plus `sitemap.xml` and `404.html`. `public/robots.txt`
references the generated sitemap; do not add a separate static sitemap.

`public/llms.txt` is the curated guide for AI assistants, served unchanged at
`/llms.txt` and linked from each generated document with `rel="describedby"`.
Keep its summary and annotated links aligned with the official documentation;
link to current requirements and deployment details rather than copying values
that can go stale. The docs maintain their own index at
`https://docs.theinterfold.com/llms.txt`. When updating this guide, verify its
links and confirm the build serves it as plain text, not an HTML fallback.

```bash
npm run build
npm run check:seo
npm run preview
```

For a custom build directory, run `node scripts/check-seo.mjs /path/to/output`.
The checker validates the prerendered body content, canonical URLs, structured data,
sitemap, robots, asset references, analytics and the noindex error document.

Vercel serves the generated HTML with `cleanUrls` and `trailingSlash: false`.
Keep the catch-all SPA rewrite removed: unmatched paths must return the custom
404 rather than the homepage with status 200. The local preview follows the same
routing rules. Verify HTTP statuses and redirects again on a deployment preview.

`useRouteDocumentHead` owns all metadata during client navigation. Page components
must not independently modify or restore the document head. Verify navigation
from 404 to home, home to participate, auction to home, and browser back/forward;
canonical URLs, robots and the WebPage JSON-LD must all describe the current page.

`npm run build` also renders the existing React components into each document via
`src/entry-server.tsx` and `scripts/prerender.mjs`. The temporary server bundle is
removed after rendering and is never deployed. React hydrates the resulting HTML;
development continues to use the regular client entry point.

The homepage has separate existing mobile and desktop layouts. The static HTML
includes both, selected by CSS; hydration removes the unused layout. Keep the
initial server/client tree identical to avoid hydration errors. Text reveal
components expose their existing content through `data-content-reveal` when
JavaScript is disabled; the normal animation timings and sequencer are unchanged.
Test all routes with JavaScript disabled at mobile and desktop widths, then with
JavaScript enabled for hydration, resizing, menus, accordions, transitions and
reduced motion. Error documents must also contain readable content.
