function upsertMeta(name, content, attr = 'name') {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
  el.setAttribute('content', content);
}
function upsertLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) { el = document.createElement('link'); el.rel = rel; document.head.appendChild(el); }
  el.href = href;
}
export function applySeo(seo, siteSettings) {
  const title = seo?.title || siteSettings?.siteName || 'AHAD Softtech';
  document.title = title;
  upsertMeta('description', seo?.description || siteSettings?.description || '');
  upsertMeta('robots', seo?.robots || 'index,follow');
  upsertMeta('og:title', title, 'property');
  upsertMeta('og:description', seo?.description || '', 'property');
  if (seo?.image) upsertMeta('og:image', seo.image, 'property');
  upsertMeta('og:type', 'website', 'property');
  upsertMeta('og:url', window.location.href, 'property');
  upsertMeta('twitter:card', 'summary_large_image');
  upsertMeta('twitter:title', title);
  upsertMeta('twitter:description', seo?.description || '');
  if (seo?.image) upsertMeta('twitter:image', seo.image);
  upsertLink('canonical', seo?.canonical || window.location.href.split('#')[0]);
  if (seo?.jsonLd) {
    document.head.querySelectorAll('script[data-seo-jsonld]').forEach(el => el.remove());
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.seoJsonld = 'true';
    script.textContent = JSON.stringify(seo.jsonLd);
    document.head.appendChild(script);
  }
}
