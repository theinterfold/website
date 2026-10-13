import { useEffect } from 'react';
import { findRoute } from '../../../seo/routes.mjs';
import { headEntries } from '../../../seo/document-head.mjs';

export function useRouteDocumentHead(routePath: string) {
  useEffect(() => {
    const fragment = document.createDocumentFragment();
    for (const { tag, attrs = {}, text } of headEntries(findRoute(`/${routePath}`))) {
      const element = document.createElement(tag);
      element.setAttribute('data-interfold-seo', '');
      for (const [key, value] of Object.entries(attrs)) element.setAttribute(key, String(value));
      if (text !== undefined) element.textContent = text;
      fragment.appendChild(element);
    }
    // Replace all owned tags together, including robots, canonical and JSON-LD.
    // This also clears noindex when navigating from a missing page to a real one.
    document.head.querySelectorAll('[data-interfold-seo]').forEach((node) => node.remove());
    document.head.appendChild(fragment);
  }, [routePath]);
}
