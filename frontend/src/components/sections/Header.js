const nav = [
  ['About', '/about'],
  ['Services', '/services'],
  ['Case Studies', '/case-studies'],
  ['Careers', '/careers'],
  ['Insights', '/blog']
];

export function renderHeader(activePath = '/') {
  return `<header class="site-header" data-header>
    <div class="container header-inner">
      <a class="brand" href="/" aria-label="AHAD Softtech home"><span class="brand-mark">A</span><span>AHAD<span class="brand-soft">Softtech</span></span></a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-menu-toggle><span></span><span></span><span></span><span class="sr-only">Open navigation</span></button>
      <nav id="site-nav" class="site-nav" aria-label="Primary navigation">
        ${nav.map(([label, href]) => `<a class="nav-link ${activePath === href ? 'is-active' : ''}" href="${href}">${label}</a>`).join('')}
        <a class="button button-small button-primary" href="/request-quote" data-track="request_quote">Request a Quote</a>
      </nav>
    </div>
  </header>`;
}

export function bindHeader() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const navEl = document.querySelector('#site-nav');
  if (!toggle || !navEl) return;
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    navEl.classList.toggle('is-open', !open);
    document.body.classList.toggle('nav-open', !open);
  });
  navEl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    navEl.classList.remove('is-open');
    document.body.classList.remove('nav-open');
  }));
}
