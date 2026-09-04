import './styles/global.css';
import { getPageBySlug, getSiteSettings } from './services/contentApi.js';
import { renderPageSections } from './utils/renderPage.js';
import { resolveSeo } from './utils/content.js';
import { renderHeader, bindHeader } from './components/sections/Header.js';
import { renderFooter } from './components/sections/Footer.js';
import { renderHero } from './components/sections/Hero.js';
import { renderServiceGrid } from './components/sections/ServiceGrid.js';
import { renderCTA } from './components/sections/CTA.js';
import { renderProofStrip } from './components/sections/Statistics.js';
import { renderFAQ } from './components/sections/FAQ.js';
import { renderProcess } from './components/sections/ProcessSteps.js';
import { renderWhy } from './components/sections/FeatureSplit.js';

const app = document.querySelector('#app');
const fallback = {
  home: `<main>
    ${renderHero({eyebrow:'Global BPO & Technology Solutions', title:'Scale customer operations without scaling complexity.', description:'AHAD Softtech helps global businesses with BPO, customer support, technical support and complementary technology capabilities.', secondary:'/services', secondaryLabel:'Explore BPO Services'})}
    <section class="trust-strip"><div class="container trust-inner"><span>India-based delivery</span><span>Built for global businesses</span><span>Human + technology</span><span>Outcome-focused operations</span></div></section>
    <section class="intro-section"><div class="container intro-grid"><div><p class="eyebrow">BPO capability</p><h2>Reliable support for the work your customers and teams depend on.</h2></div><p class="lead">From customer conversations to back-office workflows, AHAD brings people, process and technology together around the operation you need to run.</p></div></section>
    <section class="services-section"><div class="container"><div class="section-heading"><p class="eyebrow">Service pillars</p><h2>Capabilities that flex with your business.</h2></div>${renderServiceGrid()}</div></section>
    ${renderWhy()}${renderProcess()}
    <section class="technology-section section-dark"><div class="container split-dark"><div><p class="eyebrow">Technology-enabled delivery</p><h2>Use technology to make good operations easier to scale.</h2></div><div><p>AHAD combines operational delivery with complementary technology capabilities across web development, applications, APIs, integrations and maintenance.</p><a class="text-link" href="/services/software-development">Explore technology capability →</a></div></div></section>
    <section class="careers-teaser"><div class="container two-column"><div><p class="eyebrow">Careers</p><h2>Build meaningful work with a growing team.</h2></div><div><p>Explore current opportunities and find where your skills can contribute.</p><a class="button button-dark" href="/careers">View careers <span>↗</span></a></div></div></section>
    ${renderFAQ()}${renderCTA()}
  </main>`,
  about: `<main>${renderHero({eyebrow:'About AHAD Softtech',title:'A human, operational and technology-enabled partner.',description:'AHAD Softtech is an India-based global BPO and technology solutions provider focused on dependable service delivery for international businesses.',primary:'/contact',primaryLabel:'Talk to AHAD',secondary:'/services',secondaryLabel:'Explore capabilities'})}<section class="intro-section"><div class="container two-column"><div><p class="eyebrow">Who we are</p><h2>Built to make business operations more dependable.</h2></div><p class="lead">Our offering spans customer-facing operations, back-office work, data and operations support, and complementary software and digital capabilities.</p></div></section>${renderWhy()}<section class="values-section"><div class="container"><div class="section-heading"><p class="eyebrow">Our values</p><h2>Principles that shape delivery.</h2></div><div class="value-grid"><article><b>01</b><h3>Reliability</h3><p>Make dependable delivery the foundation of every engagement.</p></article><article><b>02</b><h3>Human</h3><p>Keep people and customer experience at the centre of operations.</p></article><article><b>03</b><h3>Clarity</h3><p>Design work around clear ownership, process and outcomes.</p></article><article><b>04</b><h3>Adaptability</h3><p>Build capabilities that can evolve as the business changes.</p></article></div></div></section>${renderCTA('Let’s discuss what your operation needs next.')}</main>`,
  services: `<main>${renderHero({eyebrow:'Services',title:'BPO and technology capabilities for modern operations.',description:'Choose the capability that matches your business need, or combine services into a delivery model built around your operation.',primary:'/request-quote',secondary:'/services/bpo-services',secondaryLabel:'Explore BPO Services'})}<section class="services-section"><div class="container"><div class="section-heading"><p class="eyebrow">What we provide</p><h2>Seven core capability areas.</h2></div>${renderServiceGrid()}</div></section>${renderProcess()}${renderCTA()}</main>`
};

const serviceData = {
  'bpo-services':['BPO Services','Scalable customer and business operations across voice, chat, email and back-office workflows.','BPO value proposition'],
  'customer-support':['Customer Support','Voice, chat and email support designed around customer experience, escalation and quality.','Customer experience'],
  'technical-support':['Technical Support','Tiered technical support with troubleshooting, ticket handling, escalation and reporting.','Technical expertise'],
  'back-office-operations':['Back-office Operations','Data processing, administration, documentation and order/process support with quality control.','Operational support'],
  'data-operations':['Data & Operations','Data handling, process optimization, reporting and operational support.','Data + operations'],
  'software-development':['Software Development','Complementary technology capability across web development, applications, APIs, integrations and maintenance.','Technology capability'],
  'digital-solutions':['Digital Solutions','Flexible digital capabilities that can evolve as verified offerings and client needs develop.','Digital capability']
};
function servicePage(key){ const d=serviceData[key] || (key === 'back-office' ? serviceData['back-office-operations'] : null); if(!d)return null; return `<main>${renderHero({eyebrow:d[2],title:d[0],description:d[1],primary:'/request-quote',secondary:'/services',secondaryLabel:'All services'})}<section class="intro-section"><div class="container two-column"><div><p class="eyebrow">Business problem</p><h2>Turn operational work into a clearer, more dependable capability.</h2></div><p class="lead">A reusable service model lets the engagement focus on the work, the customer experience, quality and the systems required to support delivery.</p></div></section><section class="capability-section"><div class="container"><div class="section-heading"><p class="eyebrow">What we provide</p><h2>Designed around practical delivery needs.</h2></div><div class="capability-grid"><article><span>01</span><h3>People</h3><p>Human delivery aligned to the workflows and service experience required.</p></article><article><span>02</span><h3>Process</h3><p>Structured workflows, escalation and quality practices that create consistency.</p></article><article><span>03</span><h3>Technology</h3><p>Tools and complementary technology capability that support efficient operations.</p></article><article><span>04</span><h3>Reporting</h3><p>Clear visibility into work, issues and improvement opportunities.</p></article></div></div></section>${renderProcess()}${renderFAQ()}${renderCTA('Have a specific service requirement?','Share the operation, customer journey or workflow you need support with.','/request-quote')}</main>`; }

async function boot(){
  const path=window.location.pathname.replace(/^\/+|\/+$/g,''); const slug=path||'home';
  app.innerHTML='<div class="loading-screen"><span class="loader"></span><p>Loading AHAD Softtech…</p></div>';
  let settings=null, cmsPage=null;
  try { [cmsPage,settings]=await Promise.all([getPageBySlug(slug),getSiteSettings()]); } catch(e){ console.info('CMS unavailable; using frontend fallback.',e); }
  const active='/' + (slug==='home'?'':slug.split('/')[0]);
  const content = cmsPage ? `<main class="cms-rendered"><section class="page-title"><div class="container"><p class="eyebrow">AHAD Softtech</p><h1>${cmsPage.title||''}</h1></div></section>${renderPageSections(cmsPage.content||[])}</main>` : servicePage(slug.split('/')[1]) || fallback[slug] || `<main>${renderHero({eyebrow:'404',title:'The page could not be found.',description:'The page you requested is not available. Explore our capabilities or return home.',primary:'/',primaryLabel:'Back to home',secondary:'/contact',secondaryLabel:'Contact us'})}</main>`;
  const seo=resolveSeo(cmsPage||{},settings||{}); document.title=seo.title;
  app.innerHTML=renderHeader(active)+content+renderFooter();
  bindHeader();
}
boot();
