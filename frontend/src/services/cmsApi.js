const CMS_URL = (import.meta.env.VITE_CMS_URL || import.meta.env.PUBLIC_CMS_URL || 'http://localhost:1337').replace(/\/$/, '');

function buildQuery(params = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    if (typeof value === 'object') search.set(key, JSON.stringify(value));
    else search.set(key, String(value));
  });
  return search.toString();
}

export async function cmsFetch(path, options = {}) {
  const response = await fetch(`${CMS_URL}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(options.headers || {})
    }
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload?.error?.message || `CMS request failed: ${response.status}`;
    throw new Error(message);
  }
  return payload;
}

export async function getCollection(type, params = {}) {
  const query = buildQuery(params);
  return cmsFetch(`/api/${type}${query ? `?${query}` : ''}`);
}

export async function getBySlug(type, slug, params = {}) {
  return getCollection(type, {
    ...params,
    'filters[slug][$eq]': slug,
    'pagination[pageSize]': 1
  });
}

export async function getSingle(type, params = {}) {
  const query = buildQuery(params);
  return cmsFetch(`/api/${type}${query ? `?${query}` : ''}`);
}

export function mediaUrl(media) {
  const url = media?.url || media?.data?.attributes?.url;
  if (!url) return '';
  return url.startsWith('http') ? url : `${CMS_URL}${url}`;
}

export function unwrap(entry) {
  return entry?.attributes ? { id: entry.id, ...entry.attributes } : entry;
}

export function unwrapList(payload) {
  return Array.isArray(payload?.data) ? payload.data.map(unwrap) : [];
}

export { CMS_URL, buildQuery };
