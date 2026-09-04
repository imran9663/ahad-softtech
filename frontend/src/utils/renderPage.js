import { mediaUrl } from '../services/cmsApi.js';

const esc = (value = '') => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function renderPageSections(sections = []) {
  return sections.map(section => {
    const type = section.__component || '';
    if (type === 'sections.hero') {
      return `<section class="hero"><div><p>${esc(section.eyebrow || '')}</p><h1>${esc(section.title || '')}</h1><p>${esc(section.description || '')}</p></div>${section.image ? `<img src="${esc(mediaUrl(section.image))}" alt="${esc(section.image.alternativeText || '')}">` : ''}</section>`;
    }
    if (type === 'sections.rich-text') return `<section class="rich-text"><div>${section.content || ''}</div></section>`;
    if (type === 'sections.feature-split') return `<section class="feature-split"><div><h2>${esc(section.title || '')}</h2><p>${esc(section.description || '')}</p></div></section>`;
    if (type === 'sections.statistics') return `<section class="statistics">${(section.items || []).map(item => `<article><strong>${esc(item.value)}</strong><span>${esc(item.label)}</span></article>`).join('')}</section>`;
    if (type === 'sections.process-steps') return `<section class="process">${(section.steps || []).map(step => `<article><strong>${esc(step.step || '')}</strong><h3>${esc(step.title || '')}</h3><p>${esc(step.description || '')}</p></article>`).join('')}</section>`;
    if (type === 'sections.cta-block') return `<section class="cta"><h2>${esc(section.title || '')}</h2><p>${esc(section.description || '')}</p></section>`;
    return '';
  }).join('');
}
