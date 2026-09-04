# AHAD Softtech --- CMS Architecture

> **Document:** CMS-ARCHITECTURE.md\
> **Product:** AHAD Softtech Corporate Website + CMS\
> **CMS Recommendation:** Strapi 5\
> **Database:** PostgreSQL\
> **Frontend:** HTML + Tailwind CSS + JavaScript\
> **API:** REST-first\
> **Status:** Implementation-ready architecture proposal

------------------------------------------------------------------------

## 1. Purpose

This document defines the technical CMS architecture for the AHAD
Softtech corporate website.

The CMS must allow authorized administrators and content managers to
maintain the website without requiring developer intervention for
routine content updates.

The architecture is designed around:

-   Corporate website content
-   BPO service pages
-   Software and digital solution pages
-   Blog / insights
-   Case studies
-   Client logos and testimonials
-   Careers and job openings
-   Website enquiries and quote requests
-   SEO metadata
-   Media management
-   Controlled reusable page sections

The CMS should remain flexible while preventing unrestricted
page-builder behavior that can create inconsistent layouts.

------------------------------------------------------------------------

# 2. Recommended Architecture

``` text
                           USERS
                             |
                             v
                  +----------------------+
                  |  AHAD SOFTTECH       |
                  |  PUBLIC WEBSITE      |
                  +----------+-----------+
                             |
                       HTTPS / REST
                             |
                             v
                  +----------------------+
                  |      STRAPI 5        |
                  |       CMS/API        |
                  +----------+-----------+
                             |
          +------------------+------------------+
          |                  |                  |
          v                  v                  v
     PostgreSQL           Media             Leads
       Database          Storage          / Forms
          |
          +------------------+
          |
          v
       Backups
```

### Technology stack

  Layer             Technology
  ----------------- -----------------------------------------------------
  CMS               Strapi 5
  Database          PostgreSQL
  Frontend          HTML + Tailwind CSS + JavaScript
  API               REST
  Authentication    Strapi Admin Authentication
  Media             Strapi Media Library + object storage when required
  Hosting           VPS / managed cloud
  CDN               Optional Cloudflare/CDN
  Analytics         Google Analytics 4 + Search Console
  Email             Transactional email provider
  Spam protection   Honeypot + rate limiting + CAPTCHA when required
  Monitoring        Application + server monitoring
  Backup            Automated database + media backups

------------------------------------------------------------------------

# 3. Architecture Principles

## 3.1 API-first

The frontend must consume published content through the CMS API.

The frontend should not directly access the PostgreSQL database.

``` text
Frontend
   |
   | HTTPS
   v
Strapi REST API
   |
   v
PostgreSQL
```

## 3.2 Controlled page composition

Do **not** implement a completely unrestricted visual page builder.

Instead, provide approved reusable components such as:

-   Hero
-   Rich Text
-   Service Grid
-   Feature Split
-   Statistics
-   Process Steps
-   FAQ
-   Testimonials
-   Case Study
-   Logo Cloud
-   Image
-   Video
-   CTA
-   Contact Form
-   Quote Form

This provides CMS flexibility while preserving the website's visual
system.

## 3.3 Structured content over duplicated content

Services, authors, categories, FAQs, testimonials and other reusable
content should be stored once and referenced where needed.

## 3.4 SEO as first-class content

Every indexable page should have structured SEO fields.

## 3.5 No fabricated social proof

Client logos, testimonials, certifications, awards and metrics must only
be published after verified information is entered into the CMS.

------------------------------------------------------------------------

# 4. Content Model Overview

``` text
SITE SETTINGS
     |
     +---- Navigation
     +---- Footer
     +---- Contact Information
     +---- Social Links
     +---- Global SEO

PAGES
     |
     +---- Home
     +---- About
     +---- Services
     +---- Contact
     +---- Quote
     +---- Other CMS Pages

SERVICES
     |
     +---- BPO Services
     +---- Customer Support
     +---- Technical Support
     +---- Back-office Operations
     +---- Data & Operations
     +---- Software Development
     +---- Digital Solutions

CONTENT
     |
     +---- Blog Posts
     +---- Categories
     +---- Case Studies
     +---- FAQs
     +---- Testimonials
     +---- Client Logos

CAREERS
     |
     +---- Jobs
     +---- Applications

LEADS
     |
     +---- Contact Leads
     +---- Quote Leads

SYSTEM
     |
     +---- Media
     +---- SEO
     +---- Redirects
     +---- Audit / operational logs
```

------------------------------------------------------------------------

# 5. Content Types

## 5.1 Site Settings

**Type:** Single Type

Stores global website configuration.

### Fields

  Field                  Type        Required
  ---------------------- ----------- ----------
  Site name              String      Yes
  Site description       Text        Yes
  Logo                   Media       Yes
  Favicon                Media       Yes
  Primary phone          String      Yes
  Primary email          Email       Yes
  WhatsApp number        String      Yes
  Address                Text        Yes
  Google Maps URL        String      No
  LinkedIn URL           String      No
  Facebook URL           String      No
  Instagram URL          String      No
  YouTube URL            String      No
  Default SEO            Component   Yes
  Default social image   Media       No
  Footer copyright       String      Yes

------------------------------------------------------------------------

# 6. Navigation

## 6.1 Header Navigation

**Type:** Collection Type

### Fields

  Field             Type
  ----------------- ---------------------------
  Label             String
  URL               String
  Open in new tab   Boolean
  Order             Integer
  Active            Boolean
  Parent item       Relation / self-reference

Recommended MVP navigation:

``` text
Home
About
Services
  - BPO Services
  - Customer Support
  - Technical Support
  - Back-office Operations
  - Data & Operations
  - Software Development
  - Digital Solutions
Case Studies
Careers
Blog
Contact
Request a Quote
```

------------------------------------------------------------------------

# 7. Pages

## 7.1 Generic Page

**Type:** Collection Type

Use for CMS-managed static pages that require controlled composition.

### Fields

  Field               Type            Required
  ------------------- --------------- ----------
  Title               String          Yes
  Slug                UID             Yes
  Short description   Text            No
  Hero                Component       No
  Sections            Dynamic Zone    No
  SEO                 Component       Yes
  Published           Draft/Publish   Yes

### Example

``` text
/about
/contact
/request-a-quote
```

------------------------------------------------------------------------

# 8. Page Components

All page components should be reusable.

## 8.1 Hero

``` text
eyebrow
heading
description
primary CTA
secondary CTA
image/video
alignment
background variant
```

## 8.2 Feature Split

``` text
heading
description
features[]
image
image_position
CTA
```

## 8.3 Service Grid

``` text
heading
description
services[]
display_variant
```

## 8.4 Statistics

``` text
heading
stats[]
  value
  label
  supporting_text
```

Only verified metrics should be entered.

## 8.5 Process Steps

``` text
heading
steps[]
  number
  title
  description
  icon
```

## 8.6 FAQ

``` text
heading
faqs[]
```

FAQ items should preferably reference the central FAQ content type
rather than duplicate entries.

## 8.7 Testimonial

``` text
testimonial
person_name
job_title
company
photo
rating
```

Do not publish until approved and verified.

## 8.8 Client Logo Cloud

``` text
heading
logos[]
  client
  logo
  URL
  display_order
```

## 8.9 Case Study Highlight

``` text
heading
case_studies[]
```

## 8.10 CTA

``` text
heading
description
primary_button
secondary_button
background_variant
```

## 8.11 Rich Text

Use for editorial content.

## 8.12 Image

``` text
image
alt_text
caption
credit
```

## 8.13 Video

``` text
video_url
poster
title
caption
```

## 8.14 Form Block

Supported form types:

``` text
contact
request_quote
career
```

Forms must submit through controlled frontend/API endpoints.

------------------------------------------------------------------------

# 9. Services Architecture

## 9.1 Service Content Type

**Type:** Collection Type

### Fields

  Field               Type        Required
  ------------------- ----------- ----------
  Name                String      Yes
  Slug                UID         Yes
  Short description   Text        Yes
  Icon                Media       No
  Hero                Component   Yes
  Overview            Rich Text   Yes
  Key capabilities    Component   No
  Benefits            Component   No
  Process             Component   No
  FAQs                Relation    No
  Related services    Relation    No
  CTA                 Component   Yes
  SEO                 Component   Yes
  Sort order          Integer     Yes
  Active              Boolean     Yes

### Initial services

``` text
BPO Services
Customer Support
Technical Support
Back-office Operations
Data & Operations
Software Development
Digital Solutions
```

------------------------------------------------------------------------

# 10. Blog Architecture

## 10.1 Blog Post

**Type:** Collection Type

### Fields

  Field            Type
  ---------------- ---------------
  Title            String
  Slug             UID
  Excerpt          Text
  Content          Rich Text
  Featured image   Media
  Author           Relation
  Category         Relation
  Tags             Relation
  Reading time     Integer
  Published date   DateTime
  Updated date     DateTime
  SEO              Component
  Status           Draft/Publish

## 10.2 Author

``` text
name
job_title
bio
photo
social_links
```

## 10.3 Category

``` text
name
slug
description
SEO
```

------------------------------------------------------------------------

# 11. Case Studies

## 11.1 Case Study

### Fields

``` text
title
slug
client_display_name
client_logo
summary
challenge
solution
implementation
results
metrics[]
technology[]
services[]
featured_image
gallery[]
testimonial
published_date
SEO
```

### Important rule

Never expose confidential client information.

Provide a field:

``` text
client_visibility:
  public_name
  anonymized
  confidential
```

------------------------------------------------------------------------

# 12. Testimonials

## Testimonial Content Type

``` text
quote
person_name
designation
company
company_logo
photo
rating
approved
display_order
```

Add an internal approval field so unpublished testimonials cannot
accidentally appear.

------------------------------------------------------------------------

# 13. Client Logos

## Client

``` text
name
logo
website_url
description
display_order
active
```

Client logos should only be displayed after permission/approval.

------------------------------------------------------------------------

# 14. FAQ Architecture

## FAQ

``` text
question
answer
category
service
sort_order
active
```

FAQs can be reused across:

-   Service pages
-   Contact page
-   Quote page
-   Blog
-   Landing pages

------------------------------------------------------------------------

# 15. Careers Architecture

Careers should be separated from sales leads.

## 15.1 Job Opening

``` text
title
slug
department
location
employment_type
experience
description
responsibilities
requirements
skills[]
salary_display
application_deadline
active
SEO
```

## 15.2 Job Application

``` text
job
full_name
email
phone
resume
cover_letter
experience
consent
source
created_at
```

### Security

Resume files and candidate information must not be publicly accessible.

------------------------------------------------------------------------

# 16. Lead Architecture

## 16.1 Lead

Use a dedicated Lead content type rather than mixing sales leads with
CMS content.

### Fields

  Field                      Type
  -------------------------- -------------------
  Full name                  String
  Company                    String
  Work email                 Email
  Phone                      String
  Country                    String
  Service                    Relation
  Lead type                  Enum
  Message                    Text
  Business challenge         Text
  Expected team size         String
  Timeline                   String
  Preferred contact method   Enum
  Budget                     String / optional
  Current provider           String / optional
  Status                     Enum
  Owner                      User relation
  Notes                      Text
  Follow-up date             Date
  Source                     String
  UTM source                 String
  UTM medium                 String
  UTM campaign               String
  Created at                 DateTime
  Updated at                 DateTime

### Lead types

``` text
Contact
Request Quote
Service Enquiry
Partnership
Other
```

### Lead statuses

``` text
New
Contacted
Qualified
Proposal / Quote
Negotiation
Won
Lost
```

------------------------------------------------------------------------

# 17. Lead Workflow

``` text
Website Form
     |
     v
Validate
     |
     v
Spam Protection
     |
     v
Create Lead
     |
     v
Status = NEW
     |
     v
Notify Sales / Admin
     |
     v
CONTACTED
     |
     v
QUALIFIED
     |
     +---------> LOST
     |
     v
PROPOSAL / QUOTE
     |
     v
NEGOTIATION
     |
     +---------> LOST
     |
     v
WON
```

------------------------------------------------------------------------

# 18. Lead API Security

Public users must **not** receive unrestricted access to the Lead API.

Recommended architecture:

``` text
Browser
   |
   | POST /api/forms/contact
   v
Controlled Form Endpoint
   |
   +--> validation
   +--> rate limit
   +--> honeypot
   +--> CAPTCHA when needed
   |
   v
Lead Service
   |
   v
Strapi Lead Content Type
```

Avoid exposing a generic public endpoint that allows arbitrary Lead
creation or querying.

------------------------------------------------------------------------

# 19. SEO Component

Create a reusable `seo` component.

### Fields

``` text
meta_title
meta_description
canonical_url
robots_index
robots_follow
og_title
og_description
og_image
twitter_title
twitter_description
twitter_image
structured_data
```

### Recommended defaults

If page-specific SEO is missing:

``` text
Page SEO
   ↓
Site default SEO
```

Never allow empty critical metadata on indexable pages.

------------------------------------------------------------------------

# 20. Redirect Management

Create a Redirect content type.

### Fields

``` text
source_path
destination_url
status_code
active
```

Supported:

``` text
301
302
```

This is important when replacing the existing website so old URLs do not
unnecessarily produce 404 errors.

------------------------------------------------------------------------

# 21. Media Architecture

Use Strapi Media Library for CMS-managed assets.

### Folder structure

``` text
Media
├── Brand
│   ├── Logo
│   └── Icons
├── Website
│   ├── Home
│   ├── About
│   └── Services
├── Services
├── Blog
├── Case Studies
├── Clients
├── Testimonials
├── Careers
└── Social
```

### Image rules

Prefer:

``` text
AVIF
WebP
```

Use appropriately sized responsive images.

Every meaningful image must have useful alternative text.

------------------------------------------------------------------------

# 22. Roles & Permissions

Recommended initial roles:

## 22.1 Super Admin

Full system access.

Use only for:

-   IT administrator
-   Technical administrator

Avoid using Super Admin for routine content editing.

## 22.2 Content Manager

Can manage:

-   Pages
-   Services
-   Blog
-   FAQs
-   Case studies
-   Testimonials
-   Client logos
-   Media
-   SEO

Cannot manage:

-   System settings
-   Database
-   Security configuration
-   Admin users
-   Sensitive candidate/lead data unless explicitly authorized

## 22.3 Sales / Lead Manager

Can manage:

-   Leads
-   Lead status
-   Notes
-   Follow-ups

Should not have unrestricted access to CMS configuration.

## 22.4 Recruitment Manager

Can manage:

-   Job openings
-   Job applications

Should not automatically have access to sales leads.

## 22.5 Editor / Contributor

Can create and edit assigned content but should have limited publishing
permissions if a review workflow is implemented.

------------------------------------------------------------------------

# 23. Recommended Permission Matrix

  Capability        Super Admin   Content Manager     Sales   Recruitment
  --------------- ------------- ----------------- --------- -------------
  Pages                      ✅                ✅        ❌            ❌
  Services                   ✅                ✅        ❌            ❌
  Blog                       ✅                ✅        ❌            ❌
  Case Studies               ✅                ✅        ❌            ❌
  FAQs                       ✅                ✅        ❌            ❌
  Client Logos               ✅                ✅        ❌            ❌
  Media                      ✅                ✅   Limited       Limited
  Leads                      ✅          Optional        ✅            ❌
  Job Openings               ✅          Optional        ❌            ✅
  Applications               ✅                ❌        ❌            ✅
  SEO                        ✅                ✅        ❌            ❌
  Site Settings              ✅                ❌        ❌            ❌
  Admin Users                ✅                ❌        ❌            ❌

------------------------------------------------------------------------

# 24. Employee / IT Integration

The corporate CMS should not become the HRMS.

Keep responsibilities separated:

``` text
                    HRMS
                     |
              Employee Lifecycle
                     |
                     v
              Identity Platform
                     |
          +----------+----------+
          |                     |
          v                     v
   Microsoft 365            ITSM / ITAM
          |                     |
          v                     v
 Email / Teams             Laptop / Tickets
```

The corporate CMS should only handle:

-   Careers
-   Job openings
-   Applications
-   Website content
-   Website leads

Employee operational data belongs in the HRMS/IT systems.

------------------------------------------------------------------------

# 25. API Architecture

Use REST APIs.

Example public endpoints:

``` text
GET /api/pages
GET /api/services
GET /api/blog-posts
GET /api/case-studies
GET /api/faqs
GET /api/jobs
GET /api/site-setting
```

Form endpoints:

``` text
POST /api/forms/contact
POST /api/forms/request-quote
POST /api/forms/career
```

Protected admin APIs:

``` text
/api/leads
/api/job-applications
/api/users
```

These must require appropriate authentication and permissions.

------------------------------------------------------------------------

# 26. Frontend Data Strategy

The frontend should consume only the fields required for rendering.

Example:

``` text
Frontend
   |
   v
GET /api/services/customer-support
   |
   v
Service JSON
   |
   v
Tailwind UI
```

Do not expose internal fields such as:

-   Lead owner
-   Internal notes
-   Candidate evaluation
-   Admin-only metadata
-   Internal security configuration

------------------------------------------------------------------------

# 27. Caching Strategy

For public content:

``` text
Browser
   ↓
CDN / Cache
   ↓
Frontend
   ↓
CMS API
```

Recommended caching candidates:

-   Services
-   Blog posts
-   Case studies
-   FAQs
-   Navigation
-   Site settings

Do not cache private lead/application responses publicly.

------------------------------------------------------------------------

# 28. Form Notifications

When a new form is submitted:

``` text
Form
  ↓
Validation
  ↓
Lead/Application Created
  ↓
Email Notification
  ↓
Optional Slack/Teams Notification
```

Example:

``` text
New Quote Request

Company: Example Ltd
Contact: John Smith
Service: Customer Support
Country: USA
Team Size: 25
```

Notifications should never expose unnecessary sensitive candidate
information.

------------------------------------------------------------------------

# 29. Email Architecture

Corporate email should be separate from CMS transactional email.

Recommended:

``` text
Corporate Email
Microsoft 365 / Google Workspace
        |
        +--> employee@ahadsofttech.com

Website Transactional Email
Email delivery provider
        |
        +--> contact/request notifications
```

Do not use employee mailboxes as the website application's SMTP
infrastructure if a dedicated transactional provider is available.

------------------------------------------------------------------------

# 30. WhatsApp Integration

The website should support a floating WhatsApp CTA.

Service-aware example:

``` text
Hello AHAD Softtech,
I am interested in your Customer Support
services and would like to discuss my requirements.
```

The CMS should optionally store:

``` text
whatsapp_number
default_message
service_message_template
```

------------------------------------------------------------------------

# 31. Analytics

Track:

``` text
page_view
service_view
cta_click
whatsapp_click
phone_click
email_click
contact_form_start
contact_form_submit
quote_form_start
quote_form_submit
career_application_start
career_application_submit
```

Recommended tools:

-   Google Analytics 4
-   Google Search Console
-   Optional Microsoft Clarity / equivalent session analytics subject to
    privacy requirements

Never send sensitive form contents to analytics platforms.

------------------------------------------------------------------------

# 32. Audit & Data Protection

Sensitive information includes:

-   Lead contact information
-   Candidate information
-   Resumes
-   Phone numbers
-   Email addresses
-   Internal notes

Requirements:

-   Least-privilege permissions
-   HTTPS everywhere
-   Strong admin passwords
-   MFA for CMS administrators
-   Secure file access
-   Database backups
-   Media backups
-   Retention policy
-   Access logging where supported
-   Regular permission review

------------------------------------------------------------------------

# 33. Backup Strategy

Minimum recommendation:

``` text
Daily PostgreSQL backup
+
Daily media backup
+
Off-site backup
+
Periodic restore test
```

Suggested retention:

``` text
Daily: 14–30 days
Weekly: 8–12 weeks
Monthly: 6–12 months
```

Exact retention should be finalized with business/legal requirements.

------------------------------------------------------------------------

# 34. Environment Architecture

Use separate environments.

``` text
Development
     |
     v
Staging
     |
     v
Production
```

### Development

Used by developers.

### Staging

Used for:

-   QA
-   Content review
-   Integration testing
-   Client approval

### Production

Public website and live CMS.

Never develop directly against production.

------------------------------------------------------------------------

# 35. Deployment Architecture

Recommended:

``` text
Git Repository
      |
      v
CI/CD
      |
      +----> Staging
      |
      +----> Production
```

Environment variables should contain:

``` text
DATABASE_URL
APP_KEYS
API_TOKEN_SALT
ADMIN_JWT_SECRET
JWT_SECRET
SMTP credentials
Storage credentials
Analytics IDs
```

Secrets must never be committed to Git.

------------------------------------------------------------------------

# 36. Production Security Checklist

Before production:

-   [ ] HTTPS configured
-   [ ] Admin MFA enabled
-   [ ] Strong admin passwords
-   [ ] Unused admin accounts removed
-   [ ] Public API permissions reviewed
-   [ ] Lead API protected
-   [ ] Career application data protected
-   [ ] Upload restrictions configured
-   [ ] Rate limiting configured
-   [ ] Spam protection configured
-   [ ] Database not publicly exposed
-   [ ] Firewall configured
-   [ ] Backups enabled
-   [ ] Backup restoration tested
-   [ ] Server updates scheduled
-   [ ] Monitoring configured
-   [ ] Error logging configured
-   [ ] Production secrets secured

------------------------------------------------------------------------

# 37. CMS Admin Navigation

Recommended admin structure:

``` text
AHAD CMS
│
├── Dashboard
│
├── Website
│   ├── Pages
│   ├── Navigation
│   └── Site Settings
│
├── Services
│   ├── BPO Services
│   ├── Customer Support
│   ├── Technical Support
│   ├── Back-office Operations
│   ├── Data & Operations
│   ├── Software Development
│   └── Digital Solutions
│
├── Content
│   ├── Blog
│   ├── Categories
│   ├── Case Studies
│   ├── Testimonials
│   ├── FAQs
│   └── Client Logos
│
├── Careers
│   ├── Jobs
│   └── Applications
│
├── Leads
│   ├── All Leads
│   ├── New
│   ├── Contacted
│   ├── Qualified
│   ├── Proposal / Quote
│   ├── Negotiation
│   ├── Won
│   └── Lost
│
├── Media
│
├── SEO
│
└── Settings
```

------------------------------------------------------------------------

# 38. MVP vs Future

## MVP

Implement:

-   Pages
-   Services
-   Blog
-   Categories
-   Case Studies
-   FAQs
-   Client Logos
-   Testimonials
-   Careers
-   Job Applications
-   Contact Leads
-   Quote Leads
-   SEO
-   Media Library
-   Navigation
-   Site Settings
-   Roles and permissions
-   REST API
-   Backup
-   Security controls

## Phase 2

Consider:

-   Content approval workflow
-   Scheduled publishing
-   Live preview
-   Advanced revision/history
-   Advanced analytics dashboards
-   CRM integration
-   HRMS integration
-   WhatsApp API
-   Marketing automation
-   Advanced lead scoring
-   Multi-language content

Do not add these unless there is a business requirement.

------------------------------------------------------------------------

# 39. Acceptance Criteria

The CMS architecture is considered ready when:

-   [ ] Content managers can update website content without developer
    assistance.
-   [ ] Services can be created and updated from CMS.
-   [ ] Blog posts can be created and published.
-   [ ] Case studies can be managed.
-   [ ] FAQs can be reused across pages.
-   [ ] Careers can be managed independently.
-   [ ] Applications are separated from sales leads.
-   [ ] Contact and quote submissions create leads.
-   [ ] Leads have a defined sales pipeline.
-   [ ] Sensitive data is permission-protected.
-   [ ] SEO metadata is configurable per page.
-   [ ] Navigation can be changed without code deployment.
-   [ ] Media can be managed centrally.
-   [ ] Public API does not expose private information.
-   [ ] Admin roles follow least privilege.
-   [ ] Production has automated backups.
-   [ ] Staging and production are separated.
-   [ ] Website can consume all required content through REST APIs.
-   [ ] No fabricated testimonials, logos, certifications or business
    metrics are included.

------------------------------------------------------------------------

# 40. Recommended Implementation Order

``` text
1. Strapi 5 project
        ↓
2. PostgreSQL
        ↓
3. Admin roles
        ↓
4. Site Settings
        ↓
5. Navigation
        ↓
6. SEO Component
        ↓
7. Services
        ↓
8. Pages + Dynamic Zones
        ↓
9. Blog + Categories
        ↓
10. Case Studies
        ↓
11. FAQs
        ↓
12. Client Logos / Testimonials
        ↓
13. Careers + Applications
        ↓
14. Leads + Pipeline
        ↓
15. Form APIs + spam protection
        ↓
16. Media architecture
        ↓
17. REST API permissions
        ↓
18. Frontend integration
        ↓
19. Analytics
        ↓
20. Security + backups
        ↓
21. Staging QA
        ↓
22. Production deployment
```

------------------------------------------------------------------------

# 41. Final Architecture Decision

## Recommended

**CMS:** Strapi 5\
**Database:** PostgreSQL\
**Frontend:** HTML + Tailwind CSS + JavaScript\
**API:** REST\
**Deployment:** Development → Staging → Production\
**Content model:** Structured content + controlled dynamic zones\
**Lead management:** Dedicated Lead content type\
**Careers:** Separate Job + Application models\
**SEO:** Reusable SEO component\
**Media:** Strapi Media Library + scalable object storage\
**Authentication:** Strapi admin authentication + MFA where
available/appropriate\
**Security:** HTTPS + least privilege + rate limiting + backups\
**Analytics:** GA4 + Search Console\
**Corporate email:** Separate Microsoft 365 / Google Workspace
environment

The CMS should be the **content and website management layer**, not the
company's HRMS, payroll system, IT asset management system or BPO
operations platform.

------------------------------------------------------------------------

# 42. Related Documents

-   `REQUIREMENTS.md`
-   `WEBSITE-REQUIREMENTS.md`
-   `CMS-REQUIREMENTS.md`
-   `LEAD-REQUIREMENTS.md`
-   `SEO-REQUIREMENTS.md`
-   `README.md`
