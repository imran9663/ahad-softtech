export function renderFAQ(items = [
  ['What services does AHAD Softtech provide?','AHAD Softtech combines BPO, customer support, technical support, back-office operations, data and operations support, software development and digital solutions.'],
  ['Can services be tailored to our operation?','The service architecture is designed around reusable capabilities and configurable delivery sections, allowing the engagement to be shaped around the business requirement.'],
  ['How do I start a conversation?','Use the Request a Quote or Contact page to share your requirement and the context needed to evaluate the right next step.']
]) { return `<section class="faq-section"><div class="container narrow"><p class="eyebrow">Questions</p><h2>Frequently asked questions</h2><div class="faq-list">${items.map(([q,a])=>`<details><summary>${q}<span>+</span></summary><p>${a}</p></details>`).join('')}</div></div></section>`; }
