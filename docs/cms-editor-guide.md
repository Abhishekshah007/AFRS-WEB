# CMS Editor Guide

How to manage content in **Payload Admin** (`/admin`) for the AFRS public website.

## Admin basics

- **Published** items appear on the live site; drafts do not (where applicable).
- **Order** controls sort position (lower numbers first).
- Upload images via **Media** first, then link them in other collections.
- After saving, check the public page (may need a hard refresh).

## Site-wide settings

| Global | What it controls |
|--------|------------------|
| **Site Settings** | Phone, email, address, map, visitor counter |
| **Header / Footer Settings** | Navigation and footer content |
| **Home Page** | Hero, section text, FAQs |
| **About Page** | About copy and sections |
| **Services Page** | AFSL page text, kits, legal links |
| **Programmes Catalog** | Course/training catalogue structure |
| **Registration Form** | Shared registration field settings |
| **Student Hub Content** | UGC NET, FACT, CUET page content & achievers |

## Gallery items (photos)

**Collection:** Content → **Gallery Items**

Each photo powers multiple places on the site depending on how you tag it.

### Fields

| Field | Purpose |
|-------|---------|
| **Title** | Internal name + alt text |
| **Label** | Short caption |
| **Image** | Upload (Media library) |
| **Category** | Lab, Training, Events, or Other |
| **Brand** | AFRS, AFSL, or Both |
| **Service** | Optional — links photo to one AFSL service detail page |
| **Exam program** | Optional — UGC NET, FACT, or CUET |
| **Featured** | Preferred cover for category hub tiles |
| **Published** | Must be on for public display |
| **Order** | Sort order within lists |

### Where photos appear

| Page | What shows | How to tag |
|------|------------|------------|
| **Home** | Lab / Training / Events hub tiles | Brand: AFRS or Both; Category: lab, training, or events; **Featured** for tile cover |
| **About** | Awards gallery hub | Same as home |
| **Student Hub** | Training + Events hub | Brand: AFRS; Category: training or events |
| **Courses** | Events preview widget | Brand: AFRS; Category: events |
| **Events page** | Full hub | Brand: AFRS; all three hub categories |
| **AFSL /services** | Lab photo preview grid | Brand: AFSL or Both; Category: **lab** |
| **Service detail** (`/services/[slug]`) | That service’s gallery | Set **Service** relationship to the service |
| **/gallery** | Full filterable gallery | Respects category, brand, service filters |

### Examples

**AFSL lab photo on Services page:**

- Category: Lab  
- Brand: AFSL (or Both)  
- Published: ✓  

**Photo on Crime Scene Investigation service page:**

- Category: Lab (or relevant)  
- Brand: AFSL  
- Service: Crime Scene Investigation  
- Published: ✓  

**Homepage “Training” tile cover:**

- Category: Training  
- Brand: AFRS  
- Featured: ✓  
- Published: ✓  

Public gallery URL patterns:

- All: `/gallery`
- Lab only: `/gallery?category=lab`
- AFSL lab: `/gallery?category=lab&brand=afsl`
- One service: `/gallery?service=service-slug`

## Services (AFSL)

**Collection:** Content → **Services**

- Each service has a **slug** used in URLs (`/services/[slug]`).
- **Published** must be on.
- **Order** controls listing on `/services`.
- Link gallery images via Gallery Items → **Service** field.

## Events

**Collection:** Events & Programmes → **Events**

- Set dates, registration settings, and custom registration fields.
- Publish when ready; registration flows read from this collection.

## Testimonials

**Collection:** Content → **Testimonials**

- Set **Display on** (AFRS home, AFSL services page, etc.).
- Only published testimonials appear.

## Scientists vs resource persons

| Collection | Used on |
|------------|---------|
| **Scientists** | Homepage “Experts” section |
| **Resource Persons** | Courses page widget |

Both support photo, title, bio, order, and published flag.

## Contact & registrations inbox

| Collection | Source |
|------------|--------|
| **Contact Messages** | Contact form, lab inquiry, service consult |
| **Event Registrations** | Event registration flow |
| **Course Registrations** | Course/training registration |

Staff receive email alerts when `SUBMISSION_NOTIFY_EMAIL` is configured. DOCX exports may attach to records when applicable.

## Notices & partners

- **Notices** → Homepage “Latest news” strip  
- **Partners Logo** → Partner logo carousel  

## Tips

1. Upload high-quality images; they are served from Cloudinary.
2. Use **Featured** sparingly — one strong image per category hub.
3. For AFSL, use Brand **AFSL** or **Both** so photos are not hidden on `/services`.
4. After bulk uploads, spot-check `/gallery`, `/services`, and the homepage.

## Need help?

Technical issues (deploy, env vars, broken pages): see [deployment.md](./deployment.md) or contact your developer.
