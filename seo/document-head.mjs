import { SITE, NOT_FOUND, canonicalUrl } from './routes.mjs';

export const START = '<!-- interfold:seo:start -->';
export const END = '<!-- interfold:seo:end -->';

export function structuredData(route) {
  const url = canonicalUrl(route);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization', '@id': `${SITE.origin}/#organization`,
        name: SITE.name, url: `${SITE.origin}/`, description: SITE.description,
        logo: `${SITE.origin}/brand/interfold-wordmark-dark.svg`,
        sameAs: ['https://github.com/theinterfold/interfold', 'https://x.com/theinterfold'],
      },
      {
        '@type': 'WebSite', '@id': `${SITE.origin}/#website`,
        name: SITE.name, url: `${SITE.origin}/`, inLanguage: 'en',
        publisher: { '@id': `${SITE.origin}/#organization` },
      },
      {
        '@type': 'WebPage', '@id': `${url}#webpage`, url,
        name: route.title, description: route.description, inLanguage: 'en',
        isPartOf: { '@id': `${SITE.origin}/#website` },
        about: { '@id': `${SITE.origin}/#organization` },
      },
    ],
  };
}

// Both build-time HTML and client navigation use the same complete head.
export function headEntries(route) {
  const { title, description } = route ?? NOT_FOUND;
  const meta = (key, content) => ({ tag: 'meta', attrs: { [key.startsWith('og:') ? 'property' : 'name']: key, content } });
  return [
    { tag: 'title', text: title },
    meta('robots', route ? 'index, follow' : 'noindex, follow'),
    ...(route ? [{ tag: 'link', attrs: { rel: 'canonical', href: canonicalUrl(route) } }] : []),
    meta('description', description),
    meta('og:title', title), meta('og:site_name', SITE.name),
    meta('og:description', description), meta('og:type', 'website'),
    ...(route ? [meta('og:url', canonicalUrl(route))] : []),
    meta('og:image', SITE.image), meta('og:image:width', '1200'), meta('og:image:height', '630'),
    meta('twitter:card', 'summary_large_image'),
    meta('twitter:title', title), meta('twitter:description', description), meta('twitter:image', SITE.image),
    ...(route ? [{ tag: 'script', attrs: { type: 'application/ld+json' }, text: JSON.stringify(structuredData(route)).replace(/</g, '\\u003c') }] : []),
  ];
}

export function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export function renderHead(route) {
  return headEntries(route).map(({ tag, attrs = {}, text = '' }) => {
    const attributes = Object.entries(attrs).map(([key, value]) => ` ${key}="${escapeHtml(value)}"`).join('');
    const opening = `<${tag} data-interfold-seo${attributes}>`;
    return tag === 'meta' || tag === 'link' ? opening : `${opening}${tag === 'script' ? text : escapeHtml(text)}</${tag}>`;
  }).join('\n    ');
}

export function replaceHead(html, route) {
  const start = html.indexOf(START);
  const end = html.indexOf(END);
  if (start < 0 || end < start) throw new Error('Missing Interfold SEO markers in index.html');
  return `${html.slice(0, start)}${START}\n    ${renderHead(route)}\n    ${html.slice(end)}`;
}
