import { build } from 'vite';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROUTES, outputPath } from '../seo/routes.mjs';

// A temporary server bundle uses the same Vite asset names as the client.
// Only the resulting HTML is deployed; production remains a static site.
const temporary = await mkdtemp(resolve('node_modules/.interfold-prerender-'));
try {
  await build({
    ssr: { noExternal: ['react-slick', 'hamburger-react'] },
    build: { ssr: 'src/entry-server.tsx', outDir: temporary, emptyOutDir: true, minify: false },
    logLevel: 'warn',
  });
  const { render } = await import(pathToFileURL(resolve(temporary, 'entry-server.js')).href);
  for (const route of [...ROUTES, { path: '/404', error: true }]) {
    const filename = route.error ? '404.html' : outputPath(route);
    const destination = resolve('dist', filename);
    const html = await readFile(destination, 'utf8');
    const marker = '<div id="root"></div>';
    if (!html.includes(marker)) throw new Error(`Missing root in ${filename}`);
    const markup = render(route.path);
    if (!markup.includes('<h1')) throw new Error(`Missing page content in ${filename}`);
    const path = route.path.replace(/^\/+|\/+$/g, '');
    await writeFile(destination, html.replace(marker, `<div id="root" data-prerendered="" data-route="${path}">${markup}</div>`));
  }
  console.log(`Prerendered ${ROUTES.length} pages and the 404 using the existing React components.`);
} finally {
  await rm(temporary, { recursive: true, force: true });
}
