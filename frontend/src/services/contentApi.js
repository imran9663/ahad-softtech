import { getCollection, getBySlug, getSingle, unwrap, unwrapList } from './cmsApi.js';

const publicPopulate = {
  'populate[seo]': '*',
  'populate[featuredImage]': '*',
  'populate[heroImage]': '*'
};

export async function getSiteSettings() {
  const result = await getSingle('site-settings', { populate: '*' });
  return unwrap(result?.data);
}

export async function getNavigation(location = 'header') {
  const result = await getCollection('navigations', {
    'filters[location][$eq]': location,
    'filters[isVisible][$eq]': true,
    'sort[0]': 'order:asc',
    'populate[parent]': '*'
  });
  return unwrapList(result);
}

export async function getPageBySlug(slug) {
  const result = await getBySlug('pages', slug, {
    populate: '*'
  });
  return unwrap(result?.data?.[0]);
}

export async function getServices(params = {}) {
  const result = await getCollection('services', {
    ...params,
    sort: 'sortOrder:asc',
    populate: '*'
  });
  return unwrapList(result);
}

export async function getServiceBySlug(slug) {
  const result = await getBySlug('services', slug, { populate: '*' });
  return unwrap(result?.data?.[0]);
}

export async function getCaseStudies(params = {}) {
  const result = await getCollection('case-studies', { ...params, populate: '*' });
  return unwrapList(result);
}

export async function getCaseStudyBySlug(slug) {
  const result = await getBySlug('case-studies', slug, { populate: '*' });
  return unwrap(result?.data?.[0]);
}

export async function getBlogPosts(params = {}) {
  const result = await getCollection('blog-posts', { ...params, populate: '*' });
  return unwrapList(result);
}

export async function getBlogPostBySlug(slug) {
  const result = await getBySlug('blog-posts', slug, { populate: '*' });
  return unwrap(result?.data?.[0]);
}

export async function getFaqs(params = {}) {
  const result = await getCollection('faqs', {
    ...params,
    'filters[approved][$eq]': true,
    sort: 'sortOrder:asc',
    populate: '*'
  });
  return unwrapList(result);
}

export async function getJobs(params = {}) {
  const result = await getCollection('job-openings', {
    ...params,
    'filters[active][$eq]': true,
    sort: 'applicationDeadline:asc',
    populate: '*'
  });
  return unwrapList(result);
}

export async function getJobBySlug(slug) {
  const result = await getBySlug('job-openings', slug, { populate: '*' });
  return unwrap(result?.data?.[0]);
}

export async function getRedirect(path) {
  const result = await getCollection('redirects', {
    'filters[sourcePath][$eq]': path,
    'filters[active][$eq]': true,
    'pagination[pageSize]': 1
  });
  return unwrap(result?.data?.[0]);
}

export { publicPopulate };

export async function getTestimonials(params = {}) {
  const result = await getCollection('testimonials', { ...params, 'filters[approved][$eq]': true, 'filters[active][$eq]': true, sort: 'displayOrder:asc', populate: '*' });
  return unwrapList(result);
}
export async function getClientLogos(params = {}) {
  const result = await getCollection('client-logos', { ...params, 'filters[approved][$eq]': true, 'filters[active][$eq]': true, sort: 'displayOrder:asc', populate: '*' });
  return unwrapList(result);
}
export async function getCategories(params = {}) { const result = await getCollection('categories', { ...params, 'filters[active][$eq]': true, sort: 'name:asc', populate: '*' }); return unwrapList(result); }
export async function getTags(params = {}) { const result = await getCollection('tags', { ...params, 'filters[active][$eq]': true, sort: 'name:asc', populate: '*' }); return unwrapList(result); }
