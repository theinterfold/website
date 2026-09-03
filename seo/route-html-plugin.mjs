import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import { ROUTES, SITE } from "./routes.mjs";

const MARKER_START = "<!-- interfold:seo:start -->";
const MARKER_END = "<!-- interfold:seo:end -->";

// Only five characters are unsafe inside an HTML attribute or a text node, and
// escaping them by hand beats pulling a dependency in for four routes.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// The canonical is the no-slash form, so /participate and /participate/ — which
// Vercel both serve from the same file — collapse to one URL in the index.
function canonicalUrl(path) {
  return path === "/" ? `${SITE.origin}/` : `${SITE.origin}${path}`;
}

function structuredData(route) {
  const url = canonicalUrl(route.path);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.origin}/#organization`,
        name: SITE.name,
        // The one place on the whole site that says Enclave and The Interfold
        // are the same thing. Every citation, backlink and model weight built
        // under the old name has no other bridge to the new one.
        alternateName: "Enclave",
        url: `${SITE.origin}/`,
        logo: `${SITE.origin}/brand/interfold-wordmark-dark.svg`,
        // SITE.description, not a richer one written for this node. A fuller
        // sentence would serve an AI assistant better -- it is what gets quoted
        // -- and one is proposed in SEO-COPY-PROPOSALS.md, but it would be new
        // copy and this is not the place to slip it in.
        description: SITE.description,
        sameAs: [
          "https://github.com/theinterfold/interfold",
          "https://x.com/theinterfold",
          "https://t.me/enclave_e3",
          "https://docs.theinterfold.com/",
          "https://blog.theinterfold.com/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.origin}/#website`,
        name: SITE.name,
        url: `${SITE.origin}/`,
        inLanguage: "en",
        publisher: { "@id": `${SITE.origin}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: route.title,
        description: route.description,
        isPartOf: { "@id": `${SITE.origin}/#website` },
        about: { "@id": `${SITE.origin}/#organization` },
      },
    ],
  };
}

function headFor(route, { noindex = false } = {}) {
  const url = canonicalUrl(route.path);
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);

  return [
    MARKER_START,
    noindex ? `<meta name="robots" content="noindex, follow" />` : null,
    `<title>${title}</title>`,
    noindex ? null : `<link rel="canonical" href="${url}" />`,
    `<meta name="description" content="${description}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE.name)}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:locale" content="en" />`,
    `<meta property="og:image" content="${SITE.image}" />`,
    `<meta property="og:image:width" content="${SITE.imageWidth}" />`,
    `<meta property="og:image:height" content="${SITE.imageHeight}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="${SITE.twitter}" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${SITE.image}" />`,
    `<script type="application/ld+json">`,
    JSON.stringify(structuredData(route), null, 2),
    `</script>`,
    MARKER_END,
  ]
    .filter(Boolean)
    .map((line) => `    ${line}`)
    .join("\n");
}

// Vercel serves dist/participate/index.html for /participate and /participate/
// off the filesystem, which is checked before rewrites. Emitting one file per
// route is therefore also what lets the catch-all rewrite go away — and with it
// the soft 404, where every invented URL answered 200 with the homepage.
function outputPathFor(path) {
  return path === "/" ? "index.html" : `${path.replace(/^\//, "")}/index.html`;
}

export function routeHtmlPlugin() {
  return {
    name: "interfold-route-html",
    apply: "build",
    async closeBundle() {
      const outDir = "dist";
      const shell = await readFile(join(outDir, "index.html"), "utf8");
      const start = shell.indexOf(MARKER_START);
      const end = shell.indexOf(MARKER_END);

      if (start === -1 || end === -1) {
        // Failing loudly beats shipping four pages that all claim to be the
        // homepage, which is what silently skipping this would produce.
        throw new Error(
          `[interfold-route-html] ${MARKER_START} / ${MARKER_END} not found in index.html — the per-route head cannot be written.`,
        );
      }

      const before = shell.slice(0, start);
      const after = shell.slice(end + MARKER_END.length);
      const write = async (relativePath, head) => {
        const target = join(outDir, relativePath);
        await mkdir(dirname(target), { recursive: true });
        await writeFile(target, `${before}${head.trimStart()}${after}`, "utf8");
      };

      for (const route of ROUTES) {
        await write(outputPathFor(route.path), headFor(route));
      }

      // Vercel serves this for anything that is not a route or a file, with a
      // real 404 status. It boots the same app, so a visitor who mistypes a URL
      // still lands on something rather than a wall of Vercel's own text; the
      // noindex is what keeps a crawler from filing it as a fifth page.
      await write("404.html", headFor(
        {
          path: "/404",
          title: SITE.name,
          description: SITE.description,
        },
        { noindex: true },
      ));

      console.log(
        `[interfold-route-html] wrote ${ROUTES.length} route documents + 404.html`,
      );
    },
  };
}
