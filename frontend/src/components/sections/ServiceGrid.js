const services = [
  ['BPO Services','Scalable customer and business operations.','/services/bpo-services'],
  ['Customer Support','Voice, chat and email support built around customer experience.','/services/customer-support'],
  ['Technical Support','Tiered support, troubleshooting, ticket handling and escalation.','/services/technical-support'],
  ['Back-office Operations','Data processing, administration, documentation and process support.','/services/back-office-operations'],
  ['Data & Operations','Data handling, operations support, reporting and process optimization.','/services/data-operations'],
  ['Software Development','Web, applications, APIs, integrations and maintenance.','/services/software-development'],
  ['Digital Solutions','Flexible digital capabilities that can evolve with verified offerings.','/services/digital-solutions']
];
export function renderServiceGrid(items = services) {
  return `<div class="service-grid">${items.map(([title, desc, href], i) => `<a class="service-card" href="${href}"><span class="service-index">0${i+1}</span><div><h3>${title}</h3><p>${desc}</p></div><span class="card-arrow">↗</span></a>`).join('')}</div>`;
}
