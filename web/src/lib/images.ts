/**
 * Build an Unsplash image URL from a photo id. Centralised so imagery is easy
 * to swap for real assets later. `images.unsplash.com` is allowed in next.config.
 */
export function img(id: string, w = 1200, h = 800): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

export function avatar(id: string, size = 200): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${size}&h=${size}&q=80`;
}
