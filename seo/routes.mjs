// Shared by the page router, document head, static HTML and sitemap.
export const SITE = {
  origin: 'https://www.theinterfold.com',
  name: 'The Interfold',
  description: 'Infrastructure for multiplayer privacy, enabling independent parties to coordinate without revealing their inputs.',
  image: 'https://www.theinterfold.com/interfold-banner.jpg',
};

export const ROUTES = [
  { key: 'home', path: '/', title: 'The Interfold · Infrastructure for Confidential Coordination', description: SITE.description },
  { key: 'participate', path: '/participate', title: 'Participate · The Interfold', description: 'Run a ciphernode, build applications on private inputs and verifiable outcomes, or partner with The Interfold on a pilot.' },
  { key: 'auction', path: '/fold-auction', title: 'FOLD Auctions · The Interfold', description: 'Official information, links and terms for the FOLD auctions on The Interfold.' },
  { key: 'auction-legal', path: '/auction/legal', title: 'FOLD Auction Legal · The Interfold', description: 'Important information and terms governing participation in the FOLD auction.' },
  { key: 'privacy', path: '/privacy', title: 'Privacy Policy · The Interfold', description: 'How The Interfold website uses information you choose to provide.' },
  { key: 'terms', path: '/terms', title: 'Terms & Conditions · The Interfold', description: 'Terms and conditions for using The Interfold website and its public resources.' },
];

export const NOT_FOUND = {
  title: 'Page not found · The Interfold',
  description: 'The page you are looking for could not be found.',
};

export function findRoute(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  return ROUTES.find((route) => route.path === path);
}

export function canonicalUrl(route) {
  return `${SITE.origin}${route.path}`;
}

export function outputPath(route) {
  return route.path === '/' ? 'index.html' : `${route.path.slice(1)}.html`;
}
