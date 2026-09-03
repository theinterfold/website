import { useEffect } from 'react';

import { ROUTES, SITE } from '../../../seo/routes.mjs';

// Each route ships its own <head> — seo/route-html-plugin.mjs writes one
// document per route at build time, and that is what a crawler or a link
// preview reads. But a click on "Participate" never fetches a document: the
// router swaps the tree in place and the head stays on whatever page the tab
// was opened at. The tab title, the bookmark and the history entry all keep
// naming the wrong page.
//
// So the same manifest that writes the head at build time re-applies it here on
// every route change. One list, two moments.
const BY_PATH = new Map(ROUTES.map((route) => [route.path, route]));

function findRoute(routePath: string) {
  return BY_PATH.get(routePath === '' ? '/' : `/${routePath}`);
}

export function useRouteDocumentHead(routePath: string) {
  useEffect(() => {
    const route = findRoute(routePath);

    // An unknown path renders the homepage today and is served 404.html, which
    // is already titled and already noindex. Leaving its head alone is the
    // honest answer — better than relabelling it as a page that exists.
    if (!route) {
      return;
    }

    document.title = route.title;

    const url = route.path === '/' ? `${SITE.origin}/` : `${SITE.origin}${route.path}`;
    const set = (selector: string, attribute: string, value: string) => {
      document.head.querySelector(selector)?.setAttribute(attribute, value);
    };

    set('link[rel="canonical"]', 'href', url);
    set('meta[name="description"]', 'content', route.description);
    set('meta[property="og:url"]', 'content', url);
    set('meta[property="og:title"]', 'content', route.title);
    set('meta[property="og:description"]', 'content', route.description);
    set('meta[name="twitter:title"]', 'content', route.title);
    set('meta[name="twitter:description"]', 'content', route.description);
  }, [routePath]);
}
