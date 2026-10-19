# Public forms matrix (stakeholder reference)

One-page map of every **public form** on the AFRS website: where the user fills it, where staff find it in **Payload Admin** (`/admin`), and who gets email.

**Last aligned with codebase:** October 2026.

---

## Legend

| Status | Meaning |
|--------|---------|
| **Live** | Implemented and in use today |
| **Partial** | Works, but not exactly as named in the Form Architecture notes (shared inbox, wrong label, or missing user email) |
| **Gap** | Requested in notes — not built yet |

**Email to office** uses Resend (`RESEND_API_KEY`, `SUBMISSION_NOTIFY_EMAIL` or `SITE_NOTIFY_EMAIL`). If those are missing, submissions still save in CMS; mail is skipped (check server logs).

---

## Master table

| # | Form (stakeholder name) | Public URL / entry point | Admin: where to look | Filter / how to separate | Office email | User email | Notes status |
|---|-------------------------|--------------------------|----------------------|---------------------------|--------------|------------|--------------|
| 1 | **Contact us** | [/contact](https://www.appliedforensicresearchsciences.in/contact) | **Inbox → Website inquiries** | Form type: **General Contact** | Yes | No | **Partial** — same collection as rows 2–4 |
| 2 | AFSL **lab inquiry** | [/services](https://www.appliedforensicresearchsciences.in/services) (lab inquiry section) | **Website inquiries** | Form type: **Lab Inquiry (AFSL)** | Yes | No | Live (not on original paper) |
| 3 | **Service consultation** | [/services/{slug}](https://www.appliedforensicresearchsciences.in/services) (consult form on service pages) | **Website inquiries** | Form type: **Service Consultation** | Yes | No | Live (not on original paper) |
| 4 | **Legal consultancy** | Legal-style service detail pages | **Website inquiries** | Form type: **Legal Consultancy** | Yes | No | Live (not on original paper) |
| 5 | **Course enquiry** (generic question) | No dedicated form — users use **Contact** or **Register interest** | **Website inquiries** or **Course requests** | By form type or programme title | Yes | Contact: no; Interest: yes | **Gap / Partial** — no type named “Course enquiry” |
| 6 | **AFRS Education → Register interest** | [/courses/education/…](https://www.appliedforensicresearchsciences.in/courses/education) → **Register Interest** → [/courses/register](https://www.appliedforensicresearchsciences.in/courses/register) | **Events & registrations → Course requests** | Programme type: **Education**; sort/filter by **Programme title** | Yes (`courseRequest`) | Yes (interest wording) | **Live** |
| 7 | **FSL Training & internship → Register interest** | [/courses/training/…](https://www.appliedforensicresearchsciences.in/courses/training) → **Register Interest** → `/courses/register` | **Course requests** | Programme type: **Training**; **Programme title** | Yes | Yes | **Live** |
| 8 | **Event registration** | [/events](https://www.appliedforensicresearchsciences.in/events) → event → **Register** → `/events/{slug}/register` | **Event registrations** | **Event title** / event link on each row | Yes | Yes | **Live** |
| 9 | **UGC-NET registration** | [/student-hub/ugc-net](https://www.appliedforensicresearchsciences.in/student-hub/ugc-net) — buttons to `/courses/register` or `/contact` | No dedicated list | — | Only if user uses contact or course flow | Depends on path | **Gap** |
| 10 | **FACT registration** | [/student-hub/fact](https://www.appliedforensicresearchsciences.in/student-hub/fact) | No dedicated list | — | Same as #9 | Same | **Gap** |
| 11 | **CUET UG/PG registration** | [/student-hub/cuet](https://www.appliedforensicresearchsciences.in/student-hub/cuet) | No dedicated list | — | Same as #9 | Same | **Gap** |
| 12 | **Student career guidance** | [/student-hub/career-guidance](https://www.appliedforensicresearchsciences.in/student-hub/career-guidance) → **Contact** | **Website inquiries** | Form type: **General Contact** (mixed with all contact) | Yes | No | **Gap / Partial** — no dedicated career form |
| 13 | Chat **“Talk to our team”** | Site chat widget | **Not stored in CMS** | — | Yes | Yes | Live (extra; not on paper) |

---

## Flow diagrams (by note topic)

### Contact us (note #7)

```
/contact  →  POST /api/contact-messages/submit  →  Website inquiries (contact)
                                              →  Office email + DOCX export
                                              →  No automatic reply to visitor
```

### AFRS Education & FSL Training — Register interest (notes #4–5)

```
/courses/education|training/{category}  →  Register Interest
       →  /courses/register?programmeTitle=…&type=…
       →  POST /api/course-registrations/initiate
       →  Course requests (course-wise fields)
       →  Office email + visitor confirmation (interest / no payment now)
```

### Upcoming events (note #6)

```
/events/{slug}/register  →  POST /api/event-registrations/submit (+ complete if payment)
       →  Event registrations (per event title)
       →  Office email + visitor confirmation
       →  CSV export available in admin list
```

### UGC-NET / FACT / CUET (note #2) — **not built as dedicated forms**

```
/student-hub/ugc-net|fact|cuet  →  links only:
       →  /courses/register   (generic course interest — not tagged as UGC/FACT/CUET)
       →  /contact            (general inquiry)
```

### Career guidance (note #3) — **contact only today**

```
/student-hub/career-guidance  →  /contact  →  Website inquiries (General Contact)
```

---

## What staff should do today (no new build)

| I need to find… | Go to admin | Tip |
|-----------------|-------------|-----|
| General contact messages | **Website inquiries** | Filter **Form type = General Contact**; status **New** |
| Lab / service / legal leads | **Website inquiries** | Filter by **Form type** |
| Education programme interest | **Course requests** | Column **Programme title**; type Education |
| Training / internship interest | **Course requests** | Type Training |
| Event sign-ups | **Event registrations** | Sort by date; match **event** name |
| Exam coaching (UGC/FACT/CUET) | No dedicated list | Search **Course requests** or **Website inquiries** by email/name |

**Exports:** Website inquiries get an auto **DOCX** on the record. Course and event registrations support **CSV export** from the list view.

---

## Phase 1 gaps (recommended build — from Form Architecture notes)

Priority order for implementation discussion:

| ID | Gap | Proposed fix (high level) | Admin outcome |
|----|-----|---------------------------|---------------|
| **G1** | No **UGC-NET / FACT / CUET** register forms | On-page forms on each exam hub; store as new **form type** or **exam registration** collection with `exam: ugcNet \| fact \| cuetUg \| cuetPg` | Separate filtered lists per exam |
| **G2** | **Career guidance** mixed with contact | Dedicated form on career page + `formType: careerGuidance` (or small extra collection) | “Career guidance” filter in inbox |
| **G3** | **Course enquiry** not named | Add `formType: courseEnquiry` on contact API **or** clear CTA: “Question only” → contact with subject; “Join a batch” → Register interest | Handlers know which button was used |
| **G4** | Contact forms: **no visitor auto-reply** | Optional Resend template on create for `contact` / `careerGuidance` | User gets “We received your message” |
| **G5** | Handlers want **separate left-nav** per form | Keep one collection per *family* (inquiries / courses / events); add **admin descriptions + default list filters** or Payload custom views | Feels like “separate spaces” without duplicate code |
| **G6** | Chat escalation **not in CMS** | Optional: create **Website inquiry** row on escalate (or lightweight “Chat leads” collection) | Searchable history in admin |

**Out of scope for Phase 1 unless requested:** paid course registration UI changes (complete/payment path exists in API; public course form is **interest-only** today).

---

## Technical reference (for developers)

| Collection slug | API route(s) | Hook / email |
|-----------------|--------------|--------------|
| `contactMessages` | `POST /api/contact-messages/submit` | `contactSubmissionExportHook` |
| `courseRegistrations` | `POST /api/course-registrations/initiate`, `…/complete` | `registrationSubmissionExportHook('courseRegistrations')` |
| `eventRegistrations` | `POST /api/event-registrations/submit`, `…/complete` | `registrationSubmissionExportHook('eventRegistrations')` |
| Chat escalate | `POST /api/chat/escalate` | `sendChatEscalationEmails` only |

Form types for inquiries: `contact`, `labInquiry`, `serviceConsult`, `legalConsultancy` — see `src/fields/submissionExport.ts`.

---

## Sign-off checklist (product / CMS handlers)

Use this in a short meeting to confirm Phase 1:

- [ ] Separate **nav item per form** required, or **one inbox + filters** acceptable?
- [ ] UGC / FACT / CUET: **same fields** as course interest, or exam-specific fields?
- [ ] CUET: **one form** (UG/PG dropdown) or **two** forms?
- [ ] Career guidance: **new form** vs **typed contact**?
- [ ] **Visitor auto-reply** for contact and career — yes/no?
- [ ] **Course enquiry**: always contact, or always register interest with optional “programme unknown”?

When answered, update the **G1–G6** table and implementation tickets.

---

**Related:** [cms-editor-guide.md](./cms-editor-guide.md) · [architecture-map.md](./architecture-map.md)
