import { mediaUrl } from '../services/cmsApi.js';
export const esc = (value = '') => String(value).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
export function resolveSeo(item, siteSettings) { const seo=item?.seo||siteSettings?.defaultSeo||{}; return { title:seo.metaTitle||item?.title||siteSettings?.siteName||'AHAD Softtech', description:seo.metaDescription||item?.excerpt||siteSettings?.description||'', canonical:seo.canonicalURL||'', image:mediaUrl(seo.metaImage||seo.ogImage||item?.featuredImage||siteSettings?.logo), robots:seo.robots||'index,follow', jsonLd:seo.jsonLd||null }; }
export function normalizePage(page){return page?{...page,content:Array.isArray(page.content)?page.content:[]}:null;}
