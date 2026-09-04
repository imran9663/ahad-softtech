export function renderHero({eyebrow, title, description, primary='/request-quote', secondary='/services', primaryLabel='Request a Quote', secondaryLabel='Explore BPO Services', kicker='India-based delivery. Built for global businesses.'}) {
  return `<section class="hero-section section-dark"><div class="container hero-grid">
    <div class="hero-copy"><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="hero-description">${description}</p><div class="hero-actions"><a class="button button-primary" href="${primary}" data-track="primary_cta">${primaryLabel}<span>↗</span></a><a class="button button-ghost" href="${secondary}">${secondaryLabel}<span>→</span></a></div><p class="hero-kicker">${kicker}</p></div>
    <div class="hero-art" aria-hidden="true"><div class="art-orbit orbit-one"></div><div class="art-orbit orbit-two"></div><div class="art-core"><span>AHAD</span><strong>OPS</strong></div><div class="art-card art-card-top">BPO + TECH</div><div class="art-card art-card-bottom">Scale / Support / Deliver</div></div>
  </div></section>`;
}
