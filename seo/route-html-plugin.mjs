import { readFile, stat } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { ROUTES, canonicalUrl, findRoute, outputPath } from './routes.mjs';
import { escapeHtml, replaceHead, START } from './document-head.mjs';

export function sitemapXml() {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${ROUTES.map((route) => `  <url><loc>${escapeHtml(canonicalUrl(route))}</loc></url>`).join('\n')}\n</urlset>\n`;
}

export function routeHtmlPlugin() {
  return {
    name: 'interfold-route-html',
    apply: (_config, { isSsrBuild }) => !isSsrBuild,
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html, context) {
        if (!html.includes(START)) return html; // Independent development catalogue.
        const pathname = new URL(context.originalUrl ?? context.path, 'http://localhost').pathname;
        return replaceHead(html, findRoute(pathname === '/index.html' ? '/' : pathname));
      },
    },
    generateBundle(_options, bundle) {
      const index = bundle['index.html'];
      if (!index || index.type !== 'asset') throw new Error('Missing built index.html');
      const shell = String(index.source);
      for (const route of ROUTES) {
        const source = replaceHead(shell, route);
        if (route.path === '/') index.source = source;
        else this.emitFile({ type: 'asset', fileName: outputPath(route), source });
      }
      this.emitFile({ type: 'asset', fileName: '404.html', source: replaceHead(shell, undefined) });
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml() });
    },
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        if (request.url?.split('?')[0] !== '/sitemap.xml') return next();
        response.setHeader('Content-Type', 'application/xml; charset=utf-8');
        response.end(sitemapXml());
      });
    },
    configurePreviewServer(server) {
      // Match Vercel's static clean URLs and custom 404 locally; Vite's default
      // SPA fallback would mask missing routes with a 200 homepage response.
      const root = resolve(server.config.root, server.config.build.outDir);
      server.middlewares.use(async (request, response, next) => {
        if (request.method !== 'GET' && request.method !== 'HEAD') return next();
        const url = new URL(request.url ?? '/', 'http://localhost');
        const path = url.pathname;
        const cleanPath = path === '/index.html' ? '/' : path.replace(/\.html$/, '').replace(/\/+$/, '') || '/';
        if (path !== cleanPath) {
          response.writeHead(308, { Location: cleanPath + url.search });
          response.end();
          return;
        }
        const route = findRoute(path);
        if (route) {
          request.url = `/${outputPath(route)}${url.search}`;
          return next();
        }
        try {
          const file = resolve(root, `.${decodeURIComponent(path)}`);
          if (file.startsWith(root + sep) && (await stat(file)).isFile() && file !== resolve(root, '404.html')) return next();
        } catch { /* Missing or malformed path: serve the error document. */ }
        try {
          const html = await readFile(resolve(root, '404.html'));
          response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
          response.end(request.method === 'HEAD' ? undefined : html);
        } catch (error) { next(error); }
      });
    },
  };
}
