import './styles/global.css';
import { getPageBySlug, getSiteSettings, getNavigation, getRedirect, getServiceBySlug, getTestimonials, getFaqs } from './services/contentApi.js';
import { renderPageSections } from './utils/renderPage.js';
import { resolveSeo } from './utils/content.js';
import { applySeo } from './utils/seo.js';
import { renderHeader, bindHeader } from './components/sections/Header.js';
import { renderFooter } from './components/sections/Footer.js';
import { renderHero } from './components/sections/Hero.js';
import { renderServiceGrid } from './components/sections/ServiceGrid.js';
import { renderCTA } from './components/sections/CTA.js';
import { renderFAQ } from './components/sections/FAQ.js';
import { renderProcess } from './components/sections/ProcessSteps.js';
import { renderWhy } from './components/sections/FeatureSplit.js';
import { renderTestimonials, renderCaseStudiesPage, renderCaseStudyDetail, renderBlogPage, renderBlogDetail, renderCareersPage, renderJobDetail, renderFAQPage } from './pages/ContentPages.js';
import { renderContactForm, bindContactForm } from './components/forms/ContactForm.js';
import { renderQuoteForm, bindQuoteForm } from './components/forms/QuoteForm.js';
import { initAnalytics, trackPageView, trackEvent } from './services/analytics.js';
import { esc } from './utils/content.js';

const app=document.querySelector('#app');
const fallbackHome=()=>`<main>
${renderHero({eyebrow:'Global BPO & Technology Solutions',title:'Scale customer operations without scaling complexity.',description:'AHAD Softtech helps global businesses with BPO, customer support, technical support and complementary technology capabilities.',secondary:'/services',secondaryLabel:'Explore BPO Services'})}
<section class="trust-strip"><div class="container trust-inner"><span>India-based delivery</span><span>Built for global businesses</span><span>Human + technology</span><span>Outcome-focused operations</span></div></section>
<section class="intro-section"><div class="container intro-grid"><div><p class="eyebrow">BPO capability</p><h2>Reliable support for the work your customers and teams depend on.</h2></div><p class="lead">From customer conversations to back-office workflows, AHAD brings people, process and technology together around the operation you need to run.</p></div></section>
<section class="services-section"><div class="container"><div class="section-heading"><p class="eyebrow">Service pillars</p><h2>Capabilities that flex with your business.</h2></div>${renderServiceGrid()}</div></section>${renderWhy()}${renderProcess()}
<section class="technology-section section-dark"><div class="container split-dark"><div><p class="eyebrow">Technology-enabled delivery</p><h2>Use technology to make good operations easier to scale.</h2></div><div><p>AHAD combines operational delivery with complementary technology capabilities across web development, applications, APIs, integrations and maintenance.</p><a class="text-link" href="/services/software-development">Explore technology capability →</a></div></div></section>
<section class="careers-teaser"><div class="container two-column"><div><p class="eyebrow">Careers</p><h2>Build meaningful work with a growing team.</h2></div><div><p>Explore current opportunities and find where your skills can contribute.</p><a class="button button-dark" href="/careers">View careers <span>↗</span></a></div></div></section>${renderFAQ()}${renderCTA()}</main>`;

function simplePage(title,eyebrow,description,body=''){return `<main><section class="page-title"><div class="container"><p class="eyebrow">${esc(eyebrow)}</p><h1>${esc(title)}</h1>${description?`<p class="page-intro">${esc(description)}</p>`:''}</div></section>${body}</main>`;}
function fallbackService(slug){const data={
 'bpo-services':['BPO Services','Scalable customer and business operations across voice, chat, email and back-office workflows.'],
 'customer-support':['Customer Support','Voice, chat and email support designed around customer experience, escalation and quality.'],
 'technical-support':['Technical Support','Tiered technical support with troubleshooting, ticket handling, escalation and reporting.'],
 'back-office-operations':['Back-office Operations','Data processing, administration, documentation and order/process support with quality control.'],
 'data-operations':['Data & Operations','Data handling, process optimization, reporting and operational support.'],
 'software-development':['Software Development','Complementary technology capability across web development, applications, APIs, integrations and maintenance.'],
 'digital-solutions':['Digital Solutions','Flexible digital capabilities that can evolve as verified offerings and client needs develop.']}; const d=data[slug]; if(!d)return null; return `<main>${renderHero({eyebrow:'Capability',title:d[0],description:d[1],primary:'/request-quote',secondary:'/services',secondaryLabel:'All services'})}<section class="intro-section"><div class="container two-column"><div><p class="eyebrow">Business problem</p><h2>Turn operational work into a clearer, more dependable capability.</h2></div><p class="lead">A reusable service model lets the engagement focus on the work, customer experience, quality and the systems required to support delivery.</p></div></section><section class="capability-section"><div class="container"><div class="section-heading"><p class="eyebrow">What we provide</p><h2>Designed around practical delivery needs.</h2></div><div class="capability-grid"><article><span>01</span><h3>People</h3><p>Human delivery aligned to the workflows and service experience required.</p></article><article><span>02</span><h3>Process</h3><p>Structured workflows, escalation and quality practices that create consistency.</p></article><article><span>03</span><h3>Technology</h3><p>Tools and complementary technology capability that support efficient operations.</p></article><article><span>04</span><h3>Reporting</h3><p>Clear visibility into work, issues and improvement opportunities.</p></article></div></div></section>${renderProcess()}${renderFAQ()}${renderCTA()}</main>`;}

async function servicePage(slug){const item=await getServiceBySlug(slug).catch(()=>null);if(item){return `<main><section class="page-title"><div class="container"><p class="eyebrow">Service</p><h1>${esc(item.name)}</h1><p class="page-intro">${esc(item.shortDescription||item.description)}</p></div></section>${item.heroImage?`<section class="image-section"><div class="container"><img class="content-image" src="${esc(item.heroImage.url||item.heroImage.formats?.large?.url||'')}" alt="${esc(item.heroImage.alternativeText)}"></div></section>`:''}<section class="intro-section"><div class="container narrow"><div class="rich-copy">${item.description||''}</div></div></section>${item.features?.length?`<section class="capability-section"><div class="container"><div class="section-heading"><p class="eyebrow">Capabilities</p><h2>What this service can cover.</h2></div><div class="value-grid">${item.features.map((f,i)=>`<article><b>0${i+1}</b><h3>${esc(f.title||f.name||'Capability')}</h3><p>${esc(f.description||'')}</p></article>`).join('')}</div></div></section>`:''}${renderCTA()}</main>`;}return fallbackService(slug);}

async function route(path){
 const clean=path.replace(/^\/+|\/+$/g,'');
 if(!clean)return fallbackHome();
 if(clean==='about')return simplePage('A human, operational and technology-enabled partner.','About AHAD Softtech','AHAD Softtech is an India-based global BPO and technology solutions provider.',`${renderWhy()}<section class="values-section"><div class="container"><div class="section-heading"><p class="eyebrow">Our values</p><h2>Principles that shape delivery.</h2></div><div class="value-grid"><article><b>01</b><h3>Reliability</h3><p>Make dependable delivery the foundation of every engagement.</p></article><article><b>02</b><h3>Human</h3><p>Keep people and customer experience at the centre of operations.</p></article><article><b>03</b><h3>Clarity</h3><p>Design work around clear ownership, process and outcomes.</p></article><article><b>04</b><h3>Adaptability</h3><p>Build capabilities that can evolve as the business changes.</p></article></div></div></section>${renderCTA()}`);
 if(clean==='services')return simplePage('BPO and technology capabilities for modern operations.','Services','Choose the capability that matches your business need, or combine services into a delivery model built around your operation.',`<section class="services-section"><div class="container"><div class="section-heading"><p class="eyebrow">What we provide</p><h2>Seven core capability areas.</h2></div>${renderServiceGrid()}</div></section>${renderProcess()}${renderCTA()}`);
 if(clean.startsWith('services/'))return servicePage(clean.split('/')[1]);
 if(clean==='case-studies')return renderCaseStudiesPage(); if(clean.startsWith('case-studies/'))return renderCaseStudyDetail(clean.split('/')[1]);
 if(clean==='blog')return renderBlogPage(); if(clean.startsWith('blog/'))return renderBlogDetail(clean.split('/')[1]);
 if(clean==='careers')return renderCareersPage(); if(clean.startsWith('careers/'))return renderJobDetail(clean.split('/')[1]);
 if(clean==='faqs')return renderFAQPage();
 if(clean==='contact')return simplePage('Let’s talk about your operation.','Contact','Share your requirement and the context needed to evaluate the right next step.',`<section class="form-section"><div class="container two-column"><div><h2>Tell us what you need.</h2><p class="lead">We can start with a customer journey, workflow, support requirement or technology need.</p></div><div class="form-card">${renderContactForm()}</div></div></section>`);
 if(clean==='request-quote')return simplePage('Request a quote.','Start a conversation','Tell us what you need to improve, support or scale.',`<section class="form-section"><div class="container two-column"><div><h2>Build the right delivery model.</h2><p class="lead">Give us enough context to understand your requirement and we’ll help shape the next step.</p></div><div class="form-card">${renderQuoteForm()}</div></div></section>`);
 const page=await getPageBySlug(clean).catch(()=>null); if(page)return `<main class="cms-rendered"><section class="page-title"><div class="container"><p class="eyebrow">AHAD Softtech</p><h1>${esc(page.title||'')}</h1></div></section>${renderPageSections(page.content||[])}</main>`;
 return `<main>${renderHero({eyebrow:'404',title:'The page could not be found.',description:'The page you requested is not available. Explore our capabilities or return home.',primary:'/',primaryLabel:'Back to home',secondary:'/contact',secondaryLabel:'Contact us'})}</main>`;
}

async function boot(){
 initAnalytics();
 const path=window.location.pathname;
 app.innerHTML='<div class="loading-screen"><span class="loader"></span><p>Loading AHAD Softtech…</p></div>';
 const [settings,nav]=await Promise.all([getSiteSettings().catch(()=>null),getNavigation('header').catch(()=>[])]);
 const redirect=await getRedirect(path).catch(()=>null); if(redirect?.destinationPath && redirect.destinationPath!==path){ window.location.replace(redirect.destinationPath); return; }
 const content=await route(path);
 app.innerHTML=renderHeader(path,nav)+content+renderFooter(settings); bindHeader();
 bindContactForm(); bindQuoteForm();
 document.querySelectorAll('[data-track]').forEach(el=>el.addEventListener('click',()=>trackEvent(el.dataset.track,{page_path:path})));
 let page=null; if(path==='/'||path==='/home')page=await getPageBySlug('home').catch(()=>null);
 applySeo(resolveSeo(page||{},settings||{}),settings||{}); trackPageView(path);
}
boot().catch(err=>{console.error(err);app.innerHTML='<main class="error-page"><div class="container"><h1>Something went wrong.</h1><p>Please refresh the page or try again shortly.</p><a class="button button-dark" href="/">Back to home</a></div></main>';});
