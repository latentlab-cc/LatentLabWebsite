import { useEffect, useState } from 'react';

// Tiny hash router: returns the normalized hash route (e.g. "/contact" for "#/contact").
// Returns "/" for the home view.
export function useHashRoute(): string {
  const [route, setRoute] = useState(() => normalize(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setRoute(normalize(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route;
}

function normalize(hash: string): string {
  // "#/contact" -> "/contact". Anchor links like "#about" stay as home view.
  if (hash.startsWith('#/')) return hash.slice(1) || '/';
  return '/';
}
