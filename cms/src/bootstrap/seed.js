const services = [
  ['BPO Services', 'bpo'],
  ['Customer Support', 'customer-support'],
  ['Technical Support', 'technical-support'],
  ['Back-office Services', 'back-office'],
  ['Data & Operations', 'data-operations'],
  ['Software Development', 'software-development'],
  ['Digital Solutions', 'digital-solutions']
];

async function findBySlug(strapi, uid, slug) {
  return strapi.db.query(uid).findOne({ where: { slug } });
}

async function seedCmsFoundation(strapi) {
  const siteSettings = strapi.db.query('api::site-settings.site-settings');
  const existingSettings = await siteSettings.findOne({});
  if (!existingSettings) {
    await siteSettings.create({
      data: {
        siteName: 'AHAD Softtech',
        tagline: 'BPO & Technology Solutions',
        description: 'Corporate website content settings. Verify production contact and brand details before launch.'
      }
    });
  }

  const navigation = strapi.db.query('api::navigation.navigation');
  const navItems = [
    ['Home', '/', 'header', 0],
    ['About', '/about', 'header', 10],
    ['Services', '/services', 'header', 20],
    ['Case Studies', '/case-studies', 'header', 30],
    ['Careers', '/careers', 'header', 40],
    ['Blog', '/blog', 'header', 50],
    ['Contact', '/contact', 'header', 60]
  ];
  for (const [label, url, location, order] of navItems) {
    const slug = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const existing = await navigation.findOne({ where: { slug, location } });
    if (!existing) {
      await navigation.create({ data: { label, slug, location, url, order, isVisible: true } });
    }
  }

  const serviceQuery = strapi.db.query('api::service.service');
  for (const [name, slug] of services) {
    const existing = await findBySlug(strapi, 'api::service.service', slug);
    if (!existing) {
      await serviceQuery.create({
        data: {
          name,
          slug,
          shortDescription: `${name} service content placeholder for editorial review.`,
          featured: false,
          sortOrder: services.findIndex((item) => item[1] === slug),
          publishedAt: null
        }
      });
    }
  }

  const pageQuery = strapi.db.query('api::page.page');
  const pages = [
    ['Home', 'home', 'home'],
    ['About', 'about', 'standard'],
    ['Services', 'services', 'standard'],
    ['Case Studies', 'case-studies', 'standard'],
    ['Careers', 'careers', 'standard'],
    ['Blog', 'blog', 'standard'],
    ['Contact', 'contact', 'standard'],
    ['Request a Quote', 'request-quote', 'landing']
  ];
  for (const [title, slug, pageType] of pages) {
    const existing = await findBySlug(strapi, 'api::page.page', slug);
    if (!existing) {
      await pageQuery.create({
        data: {
          title,
          slug,
          pageType,
          excerpt: 'Editorial placeholder. Replace with approved website content before publishing.',
          showInSitemap: true,
          sortOrder: pages.findIndex((item) => item[1] === slug),
          publishedAt: null
        }
      });
    }
  }

  strapi.log.info('CMS foundation seed completed. Seeded content remains unpublished for review.');
}

module.exports = { seedCmsFoundation };
