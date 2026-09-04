export function renderCTA(title='Ready to build a more scalable operation?', description='Tell us what you need to improve, support or scale. We will help shape the right delivery model.', href='/request-quote') {
  return `<section class="cta-section"><div class="container cta-inner"><div><p class="eyebrow">Start a conversation</p><h2>${title}</h2><p>${description}</p></div><a class="button button-primary" href="${href}">Request a Quote <span>↗</span></a></div></section>`;
}
