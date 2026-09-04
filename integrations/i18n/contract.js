export const supportedLocales = ['en'];
export function resolveLocale(requested, fallback = 'en') {
  return supportedLocales.includes(requested) ? requested : fallback;
}
