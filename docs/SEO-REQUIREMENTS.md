# AHAD Softtech SEO, Analytics & Discoverability Requirements

## 1. Objective

Build an SEO foundation capable of attracting international B2B traffic
for BPO and technology services, with priority relevance to the USA, UK
and UAE.

The strategy should prioritize useful service content, technical
quality, credibility and conversion intent rather than keyword stuffing.

------------------------------------------------------------------------

## 2. SEO Architecture

Priority pages:

1.  Homepage
2.  BPO Services
3.  Customer Support
4.  Technical Support
5.  Back-office Operations
6.  Data & Operations
7.  Software Development
8.  Digital Solutions
9.  About
10. Case Studies
11. Careers
12. Blog
13. Contact
14. Request Quote

------------------------------------------------------------------------

## 3. URL Requirements

Use:

-   Lowercase URLs.
-   Hyphens.
-   Stable slugs.
-   No unnecessary query parameters for indexable pages.
-   Canonical URLs.

Examples:

``` text
/services/bpo/
/services/customer-support/
/services/technical-support/
/services/back-office-operations/
/services/software-development/
/request-a-quote/
```

------------------------------------------------------------------------

## 4. Metadata

Every indexable page must have CMS fields for:

-   SEO title
-   Meta description
-   Canonical
-   Robots
-   OG title
-   OG description
-   OG image

Recommended title pattern:

``` text
Primary Topic | AHAD Softtech
```

------------------------------------------------------------------------

## 5. Structured Data

Implement relevant schema types where content genuinely qualifies.

Potential types:

-   Organization
-   WebSite
-   BreadcrumbList
-   Service
-   Article
-   JobPosting
-   FAQPage only where appropriate and supported by visible page content

Do not generate misleading structured data.

------------------------------------------------------------------------

## 6. International SEO

Initial site should remain one global experience.

Do not create separate country sites unless there is sufficient unique
content and business justification.

Messaging may naturally mention:

-   Global delivery
-   India-based operations
-   USA
-   UK
-   UAE

Avoid creating thin country pages simply for search rankings.

------------------------------------------------------------------------

## 7. Technical SEO

Required:

-   XML sitemap
-   Robots configuration
-   Canonical URLs
-   404 page
-   Redirect strategy
-   Semantic HTML
-   Crawlable navigation
-   Image alt text
-   Fast pages
-   Mobile-friendly layout
-   HTTPS in production
-   Clean heading hierarchy

------------------------------------------------------------------------

## 8. Core Web Vitals / Performance

Requirements:

-   Optimize hero images.
-   Use responsive image sizes.
-   Prefer WebP/AVIF when appropriate.
-   Lazy-load non-critical images.
-   Minimize render-blocking resources.
-   Defer non-essential scripts.
-   Avoid heavy animation libraries unless necessary.
-   Keep third-party scripts controlled.

Animation must not compromise page usability or loading.

------------------------------------------------------------------------

## 9. Content Strategy

Blog topics should support commercial intent.

Potential themes:

-   BPO outsourcing
-   Customer support outsourcing
-   Technical support outsourcing
-   Scaling customer operations
-   Outsourcing best practices
-   CX operations
-   Back-office efficiency
-   Technology-enabled support
-   Outsourcing in India

Articles should link naturally to relevant service pages.

------------------------------------------------------------------------

## 10. On-Page Requirements

Each major service page should contain:

-   One clear H1.
-   Search-intent-aligned introduction.
-   Relevant H2 sections.
-   Internal links.
-   Descriptive images.
-   FAQ where useful.
-   Strong CTA.
-   Unique metadata.

Avoid keyword repetition.

------------------------------------------------------------------------

## 11. Internal Linking

Create contextual links between:

``` text
Blog
 ↓
Service
 ↓
Case Study
 ↓
Quote
```

Service pages should link to:

-   Related services
-   Case studies
-   Relevant articles
-   Contact/quote

------------------------------------------------------------------------

## 12. Analytics Events

Recommended event names:

``` text
cta_click
quote_form_start
quote_form_submit
contact_form_start
contact_form_submit
career_application_start
career_application_submit
whatsapp_click
phone_click
email_click
service_view
case_study_view
blog_view
```

Event payload may include:

-   Page
-   Service
-   CTA label
-   Source
-   Campaign

Avoid collecting unnecessary personal data in analytics.

------------------------------------------------------------------------

## 13. Conversion Measurement

Primary conversions:

-   Quote submitted
-   BPO enquiry submitted

Secondary:

-   Contact submitted
-   WhatsApp clicked
-   Phone clicked
-   Email clicked
-   Career application submitted

Dashboard reporting should allow the business to identify which pages
and channels generate leads.

------------------------------------------------------------------------

## 14. SEO CMS Features

Content Manager should be able to edit:

-   SEO title
-   Meta description
-   Slug
-   Canonical
-   Social title
-   Social description
-   Social image
-   Indexability

Admin should control site-wide defaults.

------------------------------------------------------------------------

## 15. Search Console / Webmaster Setup

Production deployment should include appropriate webmaster verification
and sitemap submission.

The implementation team should document:

-   Verification method
-   Sitemap location
-   Domain property
-   Preferred canonical configuration

------------------------------------------------------------------------

## 16. SEO Acceptance Criteria

-   All public indexable pages have unique metadata.
-   Sitemap is generated.
-   Robots configuration is correct.
-   Canonicals are correct.
-   No accidental noindex on important pages.
-   Broken links are resolved before launch.
-   404 page works.
-   Structured data validates where implemented.
-   Mobile layout is search-engine friendly.
-   Core performance is monitored after launch.
-   CMS editors can maintain metadata without developer intervention.
