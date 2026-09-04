import { mediaUrl } from '../services/cmsApi.js';
import { esc } from './content.js';
import { renderHero } from '../components/sections/Hero.js';
import { renderServiceGrid } from '../components/sections/ServiceGrid.js';
import { renderCTA } from '../components/sections/CTA.js';
import { renderProofStrip } from '../components/sections/Statistics.js';
import { renderFAQ } from '../components/sections/FAQ.js';
import { renderProcess } from '../components/sections/ProcessSteps.js';
import { renderWhy } from '../components/sections/FeatureSplit.js';

export function renderPageSections(sections=[]){ return sections.map(section=>{
 const type=section.__component||'';
 if(type==='sections.hero') return renderHero(section);
 if(type==='sections.rich-text') return `<section class="rich-text"><div class="container narrow rich-copy">${section.content||''}</div></section>`;
 if(type==='sections.feature-split') return renderWhy(section);
 if(type==='sections.service-grid') return `<section class="services-section"><div class="container"><div class="section-heading"><p class="eyebrow">Services</p><h2>${esc(section.title||'Capabilities')}</h2></div>${renderServiceGrid(section.services||[])}</div></section>`;
 if(type==='sections.statistics') return renderProofStrip(section.items||[]);
 if(type==='sections.process-steps') return renderProcess(section.steps||[]);
 if(type==='sections.faq-block') return renderFAQ(section.items||[]);
 if(type==='sections.cta-block') return renderCTA(section.title,section.description,section.cta?.url||'/request-quote');
 if(type==='sections.image') return section.image?`<section class="image-section"><div class="container"><img class="content-image" src="${esc(mediaUrl(section.image))}" alt="${esc(section.image.alternativeText)}" loading="lazy"></div></section>`:'';
 return '';
 }).join(''); }
