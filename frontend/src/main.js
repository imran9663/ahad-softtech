import './styles/global.css';
import { getPageBySlug, getRedirect } from './services/contentApi.js';
import { renderPageSections } from './utils/renderPage.js';
import { resolveSeo } from './utils/content.js';
import { getSiteSettings } from './services/contentApi.js';

const app = document.querySelector('#app');

function slugFromPath(pathname) {
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  return clean || 'home';
}

function applySeo(seo) {
  document.title = seo.title;
  if (seo.description) {
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) { tag = document.createElement('meta'); tag.name = 'description'; document.head.appendChild(tag); }
    tag.content = seo.description;
  }
}

async function boot() {
  app.innerHTML = '<main><p>Loading AHAD Softtech…</p></main>';
  try {
    const path = window.location.pathname;
    const slug = slugFromPath(path);
    const [page, siteSettings] = await Promise.all([getPageBySlug(slug), getSiteSettings()]);

    if (page) {
      applySeo(resolveSeo(page, siteSettings));
      app.innerHTML = `<main>${renderPageSections(page.content)}<div class="cms-page-meta">${page.title ? `<h2>${page.title}</h2>` : ''}</div></main>`;
      return;
    }

    const redirect = await getRedirect(path);
    if (redirect) {
      window.location.replace(redirect.destinationPath);
      return;
    }

    app.innerHTML = '<main><h1>Page not found</h1><p>The requested page could not be found.</p></main>';
  } catch (error) {
    console.error(error);
    app.innerHTML = '<main><h1>Unable to load website</h1><p>Please try again shortly.</p></main>';
  }
}

boot();
