const CMS_URL = (import.meta.env.PUBLIC_CMS_URL || 'http://localhost:1337').replace(/\/$/, '');

export async function cmsFetch(path, options = {}) {
  const response = await fetch(`${CMS_URL}${path}`, {
    ...options,
    headers: { Accept: 'application/json', ...(options.headers || {}) }
  });
  if (!response.ok) throw new Error(`CMS request failed: ${response.status}`);
  return response.json();
}

export { CMS_URL };
