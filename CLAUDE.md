@AGENTS.md

## Design Replication
When an image or screenshot is attached, treat it as the pixel-level source of truth.
Match layout, spacing, typography, colors, and component structure exactly unless
told otherwise. Do not interpret loosely or take creative liberties.

## Content Guidelines

Source: https://design-platform.squarespace.net/docs/content-design/introduction/
Reference authorities: American Heritage Dictionary, Chicago Manual of Style.

### Guiding Principles
- **Inclusive** — speak to user needs; prefer plain language (≤8th grade reading level)
- **Concise** — keep copy as short as possible; long copy complicates localization
- **Consistent** — repeat terminology; defer to the Terminology glossary
- **Plain language** — avoid jargon, technical, or programming terms

---

### UX Content Pillars
Use these to decide *why* you're communicating at a given moment:
- **Support** — offer guidance and expertise to build user confidence
- **Autonomy** — give users space to explore and make decisions independently
- **Inspiration** — motivate users to express creativity and imagine their brand

During design, identify the primary pillar for the user's current mindset and maintain focus on it.

---

### Voice & Tone

**Voice** (consistent across all surfaces):
- **Confident** — self-assured, not arrogant; highlight benefits without over-promising
- **Straightforward** — direct without being condescending; succinct and empathetic
- **Professional** — polished and approachable; plain language over industry jargon; no colloquialisms

**Tone** (varies by context):
- **Instructional** *(most common)* — helpful without being overbearing; clear direction
- **Considerate** *(difficult moments)* — thoughtful and deliberate; acknowledges emotional state; sets expectations
- **Encouraging** *(supportive moments)* — motivating without cheerleading; celebrates wins

---

### Style

**Writing rules:**
- Use present tense ("can't open page" not "couldn't open page")
- Use American English (not British English)
- Avoid "input" as a verb — use direct action verbs: Add, Switch, Apply, Enter
- Don't use "please" in instructions unless an error was caused by the product
- Only ask questions in the UI when multiple selectable options exist or confirming between two opposing actions
- Don't ask questions where only one specific action is possible

**Inline CTA references:**
- Use sentence case with "select" as the action word
- Capitalize only the first word if the CTA exceeds one word

**"Add-on" vs. "Upgrade":**
- *Add-on* — an additional service/product/feature added to a primary offering; always hyphenated
- *Upgrade* — changing service level to a higher (usually more expensive) tier

**Product & feature naming:**
- Prefix with "Squarespace" only for: unique SQS-only products, widely-used products needing competitor differentiation, private-labeled products, subsidiary/ecosystem products, or L/XL-sized features
- Feature names are NOT capitalized unless officially named by Product Marketing
- Named exceptions (always capitalize): Fluid Engine, Squarespace Blueprint AI, Design Intelligence, Squarespace Payments

---

### Pronouns
- **I / Me / My** — avoid; implies speaking on behalf of the user, undermining autonomy
  - Allowed: FAQs ("How do I change my billing plan?"), T&C consent ("I agree…"), demo content ("About Me")
- **We / Our** — acceptable in dialogue with users, marketing, Frontsite, support docs
  - Avoid hedging language like "we recommend" when stating facts
  - Prefer naming Squarespace explicitly so users know which product is being referenced
- **You / Your** — preferred for user references and contextual help; often implied in CTAs (omit to save space)
- **She / He** — do not use; always use gender-neutral **they / them / their** for third-person
  - Exception: case studies featuring specific customers may use their actual pronouns

---

### Courtesy
- **Please** — minimize; use only when the product caused an error requiring user re-work
- **Sorry** — avoid entirely; undermines trust and appears disingenuous
- **Thank you** — reserve for: survey completions, purchase completions, and genuine user favors
  - Don't thank users for actions they may not have completed; include next steps where applicable

---

### User Types

**Squarespace ecosystem:**
| Term | Definition |
|---|---|
| Customer | People who pay for Squarespace |
| User | Anyone with a Squarespace account (including free trial) |
| Seller | Uses Commerce tools to sell; preferred over "Merchant" |
| Site owner | Owner of a Squarespace site; "owner" after first mention |
| Administrator | User with full site permissions (not ownership transfer) |
| Contributor | Umbrella term for invited collaborators |
| Billing manager | Can modify subscriptions, billing, and view invoices |
| Website editor | Can add products/blocks/content to existing pages |
| Domain manager | Can manage domains except payments |
| Domain owner | Registered domain controller with full settings access |
| Registrant | Listed owner in Whois domain contact info |
| Store manager | Manages products, orders, receives notifications |
| Squarespace Expert | Independent designer hireable via Squarespace Marketplace |

**Do not use:** Trial user (internal only), Vendor (use Seller/Merchant), Agent (use Advisor), Merchant (prefer Seller)

**Squarespace employees:**
- **Advisor** — Customer Support employees; always title case

**A Squarespace user's users:**
| Term | Definition |
|---|---|
| Client | People receiving services from a Squarespace seller |
| Customer | People buying products/services (not for member sites) |
| Member | People who purchased access to a member site |
| Subscriber | People on a mailing list via Email Campaigns |
| Donor | People who donate via a Squarespace site |
| Audience | A business's customer base (marketing/analytics contexts) |
| Site visitor | A person visiting a Squarespace user's site |

---

### Writing for AI

**Labeling & framing:**
- Write "AI" (not "Artificial Intelligence," "A.I.," or "machine learning")
- In product, emphasize what users do *with* AI, not what Squarespace does *for* them
- Use "generate," "draft," "suggest" for user actions with AI features
- Frame as: "Draft a product description with AI" ✓ / "Let AI write your product description for you" ✗
- Don't suggest AI-generated content is final; prompt users to review/edit before saving or publishing

**Avoiding personification:**
- Never use "I," "we," "us," "let's," or "together" as AI
- Reserve "we" and "let's" for Squarespace human voice
- Don't use emojis, casual idioms, or language implying emotion or opinion
- Don't apologize unless there's an unresolvable error; offer alternative paths instead

**Transparency:**
- Clearly indicate when a feature uses AI, visible before user action (not hidden in hover states)
- At AI entry points: label explicitly ("Explore AI-generated campaigns")
- Once inside an AI flow: stop over-labeling — context makes it clear
- Briefly explain source or rationale: "Generated using patterns from similar products" ✓ / "Automatically created" ✗
- Check with Legal for required disclosures

**AI voice traits:**
- **Curious** — positions AI as co-investigator; invites exploration; softens all-knowing perception
- **Approachable** — plain, human-friendly language; lowers barriers; encourages exploration
- **Insightful** — surfaces patterns/trends; connects data to user context and potential decisions
- **Transparent** — briefly explains source or rationale; distinguishes AI from general UI

**Tone:** Avoid passive voice; reframe around the action or output.

---

### Capitalization

**Title case** (first letter of every word except articles, conjunctions, prepositions ≤4 letters):
- Nav menus, breadcrumbs, buttons, drawer nav items, page headers, tabs

**Sentence case** (first word + proper nouns only):
- Accordion labels, banner titles, card titles, dialog titles, key figure titles, text input labels/descriptions/errors, text links, toasts
- Default to sentence case for any component not listed above

**Always capitalize:**
- Standalone products: Acuity Scheduling, Squarespace Domains, Bio Sites
- Core products: Website, Marketing, Contacts, Analytics, Finance
- Selling products: Online Store, Services, Content & Memberships, Donations, Invoicing
- Platforms/communities: Squarespace Marketplace, Squarespace Expert, Squarespace Circle
- Pricing plans (but "plan" and "add-on" are lowercase): Personal plan, Business plan, Commerce Basic plan
- Team names, Privacy Policy, Terms of Service
- Feature exceptions: Fluid Engine, Squarespace Blueprint AI, Design Intelligence, Squarespace Payments

---

### CTAs (Buttons & Links)

**Button labels:**
- Use verbs or verb phrases; max 3 words
- Be specific ("Select Image" not "Select")
- No "now," no articles (a/an/the), no "please"
- Use "Cancel" as secondary CTA for decision-requiring actions

**Approved verbs:** Confirm, Publish, Save, Select, Cancel, Delete, Undo, Continue, Done, Next, Learn more, Upgrade
**Use with caution:** Enter, OK, Discard, Dismiss, Remove, Exit, Verify
**Do not use:** Close (use X icon), Disable (use Turn On/Off)

**Link text:**
- The object of interest becomes the link (not "click here")
- Use shortest possible text that clearly explains the destination
- Remove `https://www.` and trailing slashes from URLs; keep URLs lowercase
- All-caps acceptable only in Desktop/Action components, never in full sentences

---

### Punctuation
- **Ampersands (&)** — only in product/brand names or severely space-constrained components
- **Serial comma** — always include before final conjunction in lists
- **Contractions** — most OK; avoid: it'll, shouldn't, should've, couldn't, could've, wouldn't, would've, weren't, wasn't
- **Colons** — avoid unless introducing a bulleted list
- **Hyphens (-)** — link words without spaces; don't use with -ly adverbs
- **En dashes (–)** — replace "to" in ranges, no spaces (June 20 – October 20)
- **Em dashes (—)** — offset asides without spaces
- **Ellipses** — only in status/loading messages; not in placeholder text
- **Exclamation points** — sparingly, one at a time, only for celebrations; never for warnings or errors
- **Periods** — omit at end of: UI titles, checkbox/toggle labels, radio labels, headers, toast messages

---

### Abbreviations
- Spell out on first use unless space is limited or abbreviation is more recognizable
- Plurals: lowercase "s" without apostrophe (PDFs, not PDF's) — except terms with periods (Ph.D.'s)
- Use English equivalents for Latin: "for example" (not e.g.), "that is" (not i.e.), "and so on" (not etc.)
- Common abbreviated units: KB, MB, GB, TB (no periods); metric units closed up (mm, cm, g, kg)

---

### Date & Time
- Use "Today," "Tomorrow," "Yesterday" for dates within ±1 day
- Use day name for future dates within the same week
- For dates older than one week: use abbreviated date format with year
- Capitalize AM/PM with a space before the meridian
- Use "month, date, year" — not "month, day, year" (ambiguous in other languages)
- Avoid adding weekday names except within the same week or for added clarity

---

### Internationalization (i18n)
- Products on Frontsite, Account, or Support Center require i18n preparation
- Text in other languages is on average **30% longer** than English (up to 300% in some cases)
- Keep sentences under 20 words; one concept per sentence; use active voice
- Design flexible layouts allowing text wrapping; no fixed-width content
- Avoid: idioms, metaphors, jargon, slang, puns, cultural references, forced case transformations
- Don't embed text in images
- Use locale-appropriate date formats: MM/DD/YY (USA), DD/MM/YYYY (most others)
- Use currency codes (USD, EUR, GBP) not symbols ($) to avoid ambiguity

---

### Units of Measure
- Spell out units when not preceded by a number ("many terabytes")
- Spell out most units when preceded by a number; abbreviate KB/MB/GB/TB
- Add space between numeral and unit (noun); hyphenate when compound adjective
- Spell out storage/data units on first use; abbreviate thereafter
- Use currency codes (USD, EUR, CAD, GBP, JPY, AUD) rather than symbols

---

### Error Messages

**Types:**
- *User-generated* — user controls resolution; lower courtesy required
- *System-generated* — system at fault; higher courtesy warranted; show in empty states or dialogs

**Structure (Header / Body / CTA):**
- **Header** — short, clear; state what happened; be specific for known errors
- **Body** — max 2 sentences; plain language; no jargon; don't blame user; focus on solution
  - Avoid "sorry" (liability concern); say "please" only if Squarespace caused re-work
  - Reference Help Center; don't suggest contacting support as primary resolution
- **CTA** — reinforce remedial action; use "OK" for acknowledgment-only; offer "Cancel" as secondary

**Additional:**
- Be empathetic; plan for failure scenarios upfront
- Don't rely on color alone to indicate errors (accessibility requirement)
