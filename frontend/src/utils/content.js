import { mediaUrl } from '../services/cmsApi.js';

export function resolveSeo(item, siteSettings) {
  const seo = item?.seo || siteSettings?.defaultSeo || {};
  return {
    title: seo.metaTitle || item?.title || siteSettings?.siteName || 'AHAD Softtech',
    description: seo.metaDescription || item?.excerpt || siteSettings?.description || '',
    canonical: seo.canonicalURL || '',
    image: mediaUrl(seo.metaImage || seo.ogImage || item?.featuredImage || siteSettings?.logo),
    robots: seo.robots || 'index,follow'
  };
}

export function normalizePage(page) {
  if (!page) return null;
  return { ...page, content: Array.isArray(page.content) ? page.content : [] };
}
