# Pack Room / School of Topps Knocks — Central Product Hub
**Working baseline:** 2026-11-26 · **Scope:** nephews' baseball-card identification, lookup, cheat sheets, related educational content and supporting data · **Status:** living decision register, **not** a claim every old chat has been read verbatim.

> **START HERE FOR FUTURE CARD-TOOL WORK.** Preserve the existing public Pack Room; improve it in place. Card identification is the primary job. The public page is the deliverable—not where images happen to be stored. Do not publish receipts, addresses, purchase details, private photos, personal health information or private research files to this public repository.

**Public site:** https://damienreilley.github.io/fantasy-baseball-2026/card-lookup/  
**Repository:** https://github.com/damienreilley/fantasy-baseball-2026/tree/main/card-lookup  
**Live lookup:** `packs.html?set=...` / new specialist pages  
**Base design gallery:** `base-gallery.html`  
**Education:** `education.html?set=...`

## 1. What this hub is for
Centralize decisions, requirements, actual functionality, feedback/pain points, reliable source policy, known defects, priorities and audit checkpoints **for the card tool**. Preserve the difference between (a) something the user explicitly wants, (b) something a prior assistant proposed, (c) code that exists and (d) behavior tested on the deployed public site. Use this document as the handoff for new chats and development sessions; update it when a decision changes. Adjacent buying/release research is referenced only where it affects the card tool or the product roster; it does **not** turn this site into a shopping dashboard.

**Evidence/status vocabulary:** `DECIDED` = user requirement or accepted direction; `IMPLEMENTED IN REPO` = inspected source/code, not necessarily live verified; `DESIGNED ONLY` = specification/mockup; `OPEN` = needs data/build/audit; `HISTORICAL` = prior direction may be superseded; `VERIFY` = requires independent source or functional check.

## 2. Product vision and nonnegotiable experience
1. **DECIDED / highest priority:** A quick answer to **“What exact card did we pull?”** while opening packs. Card identification—not releases, shopping or price notifications—is the tool's core (Oct 2026; reaffirmed Nov 26).
2. **DECIDED:** A public, phone-friendly tool children and an adult can use without ChatGPT, complicated forms or lengthy research. A single bookmark and product-specific card lookup; simple descriptions, immediate visual clues, large tap-friendly controls and readable typography.
3. **DECIDED:** **Show a representative base-card picture directly on the public lookup page for each tracked release**, ideally also in product selection and cross-set gallery; tap to enlarge, with attribution and honest mockup/photo labeling. User explicitly does *not* want to leave the public site to open storage or download an image (Oct 24 conversation).
4. **DECIDED:** Identify hierarchy properly: year → manufacturer/brand → line/family → release/set/edition → buying format. A Mega, Value, Hobby or Jumbo box is generally **packaging format**, not automatically another base checklist; format can change odds/exclusive parallels.
5. **DECIDED:** **Card identity is not the same as physical variant.** Match exact printed checklist ID and player/subject first; then separately assess base versus insert, parallel, finish, pattern, photo variation, SP/SSP, RC mark, auto, relic, redemption, serial stamp. A checklist match must not be described as proof of exact rare parallel.
6. **DECIDED:** Make identification actionable and copyable. Provide **exact card-search string** (year + full set + player + printed number + verified variant), easy to paste into Google, and link to corresponding source/checklist/odds when possible. A collector card profile should be scannable, accurate and visually clean; use official Topps terminology.
7. **DECIDED:** Preserve uncertainty. An actual `009/025` serial stamp proves item 9 of 25, **not** the unique name of the parallel. A glossy surface doesn't prove Chrome/LogoFractor; rookie logo doesn't imply rarity; printed facsimile signature isn't a real autograph.
8. **DECIDED:** Don't reinvent the wheel; reuse Pack Room, original checked data, existing product-specific folders and the earlier Pull Tool. No parallel competing lookup app presented as a replacement without a clear reason.
9. **DECIDED:** Product-specific education sheets, manufacturer sell sheets, official checklists and **odds** belong alongside the lookup: practical “what is this?”, “what's special?”, “what should I protect?” explanations, not just raw database hits.
10. **DECIDED:** Avoid verbose error excuses. When something fails, say what's wrong and fix it; verify links, page rendering, data provenance and results instead of claiming a feature works merely because code was added.

## 3. Already represented in the public repository — source inspection 2026-11-26
| Product key | Product entry | Important distinction |
|---|---|---|
| `stadium25` | 2025 Topps Stadium Club Baseball — Mega | Full-bleed photography; Mega Light Blue and Sepia. **High-priority earlier addition**; do not describe it as still absent. |
| `chrome25` | 2025 Topps Chrome Update — Mega | X-Fractors; known printed-number collisions need precise player matching. |
| `pulse26` | 2026 Pulse × Big League Chew — Blaster | Specialized `pulse.html` route in current source; marketing art is not proof of exact base card. |
| `panini26` | 2026 Panini USA Stars & Stripes Prizm — Mega | Ice finish, national-team players; do not confuse prizm surface with guaranteed scarcity. |
| `logo26` | 2026 Topps Chrome LogoFractor — individual pack | Pack can include ordinary Chrome; photo reference is explicitly a promotional mockup. |
| `series1` | 2026 Topps Series 1 | Base #1–350. |
| `asg26` | 2026 Philadelphia All-Star Series 2 Mega | **Same Series 2 base checklist**, special ASG logo-foil variants. |
| `series2` | 2026 Topps Series 2 | Base #351–700, continuing Series 1. |
| `update26` | 2026 Topps Update | Separate US1–US350 numbered base checklist. |

**IMPLEMENTED IN REPO (source, not full browser acceptance test):**
- `config.js` product metadata, pack counts, guides, source links; `data/*.json` checklist datasets.
- `index.html` nine-product navigation and previews; `packs.html` + `main.js` manual search by number/player, result classifications, product guide, source links.
- In `main.js`, a base-card reference panel below product hero, enlarged image links, and the `media/base-cards/base-examples.json` catalog with **nine entries** (ASG shares ordinary Series 2 base image); `base-gallery.html` compare view.
- `education.html` quick parallel/color guides and curated education/sell-sheet links.
- Saved pulls in **browser localStorage on that device**, remove and CSV export; do not describe this as shared or synchronized collection.
- Offline/service-worker support and a standalone nine-product HTML backup exist, but re-test caches and actual offline behavior; source presence ≠ success.
- Newer source also links `flagship-v2.html` (2026 flagship simplified one-page flow) and routes Pulse to `pulse.html`. Audit these pages independently rather than assuming older `packs.html` covers their full behavior.
- `stadium25` contains a photo entry and current product metadata. The Stadium Club checklist file and special subset entries exist; **its independent checklist total is not complete manufacturer verification**.
- **NOT established by this inspection:** real camera vision recognition, exact physical parallel recognition, cross-device synchronization, live end-to-end GitHub Pages success, all images' public redistribution permission.

**Immediate acceptance test:** open site on iPhone and desktop; check all nine product links, each visible/enlargeable image, image-source link, checklist search by known card number and by name, subset labels, error/missing-image behavior, navigation, saved pull CSV, special Pulse flow, flagship v2 flow, and offline revisit. Record date, device and actual pass/fail. Do not equate GitHub files with public success.

## 4. Priority queue (as of Nov 26)
### P0 — exact physical-card lookup and completeness
- **2025 Onyx Vintage Extended**: latest user direction says this purchased release must have a usable **card finder**; focus on the 2025 **Extended** set (not 2026 Onyx price-watch product). **OPEN:** not in the inspected nine-product `config.js`; build from original Onyx manufacturer checklist and notes, identify 56 base subjects and 34 autograph-list subjects only if verified, preserve printed IDs and each official variation/serial family, and confirm current box configuration from records rather than assume.
- **2026 Topps Pro Debut**: similarly requested for the card finder. **OPEN:** not in inspected nine-product menu. Source of truth is official Topps PDF/checklist/odds and previously worked player/checklist ID dataset; respect multiple player names per multi-auto card, distinct subset IDs, player/organization facts and actual autograph/relic subset. User already invested in comprehensive Pro Debut master data, so reuse; don't recompute or misstate coverage.
- **Existing releases:** audit completeness and exactness of card IDs, collisions, base/insert determination and physical-variant narrowing. A working fast name/code search is the first deliverable; automatic vision **must not delay** this.
- **Stadium Club** remains an important QA focus: image + complete base set + accurate Mega-exclusive inserts/parallels + manufacturer odds evidence.
### P1 — card profile & parallel finder
- Surface **year / manufacturer / product family / release / card # / player / team / rookie / insert subset / parallel / foil-refractor-pattern / serial / auto/relic** as visible organized sections, not scattered prose.
- Provide a one-tap **copyable exact search title** such as `Roki Sasaki — 2026 Topps Chrome #199, Gold X-Fractor /50` **only when actual fields are verified**. Otherwise omit unknown variation; never generate a confident fake search string.
- Help locate the exact card in official checklist and odds PDF: printed set/subset code, manufacturer checklist section, pack format (only where odds are format-specific), source URL and review date.
- Base-vs-parallel visual comparison: regular base image alongside identified card where available; highlights or reference examples for special finishes, but don't treat a promotional rendering as confirmed physical reality.
- Optional more detailed collector profile may include position/organization, prospects ranking, draft/debut information, autograph ink, print-run, and provenance **when source-backed**. **Not required** for MVP; don't overload opening screen with data.
### P2 — photographic identification, separate design track
- A **DESIGN SPECIFICATION** was produced 2026-10-31 for a photo-first, **private** prototype. It proposes camera/upload, optional back/close-up, orientation handling, color/finish clues, evidence statuses, base comparison and one useful follow-up action. It is **not a working deployed photo scanner**.
- First test set ideas: 2025 Chrome Update and 2026 LogoFractor; confirm year, line, code, player together, never by number alone. Validate HEIC on iPhone, privacy, accessibility, hard cases and error handling **before** claiming support.
- **Precedence update 2026-11-26:** do not block searchable public Pack Room additions (especially Onyx and Pro Debut) while building vision recognition. Keep the private prototype boundary distinct from the existing public no-login manual lookup.
### P3 — curriculum & usability polish
- One coherent **School of Topps Knocks**, not several competing “101” courses. Explain product hierarchy, base vs insert, colored foil, numbered vs unnumbered, SP/SSP, real autos vs printed signatures, relics, redemption, prospects and how to check a checklist/odds. Include original Topps education/sell sheets when permitted.
- Better phone/desktop visual organization, plain language, fewer taps, no intrusive forms, printable cheatsheets and direct links back to lookup.
- Saved-pull/binder/collection features: local save already exists. Cross-device sync, photos and assignment to collector are **future ideas**, not confirmed active features.

## 5. Identification rules: authoritative behavior
**Required fields/data model:** manufacturer; year; line/family; release; optional box/format; printed card code **with prefixes/leading zeroes**; subject(s); team or organization; checklist subset and type; rookie badge if confirmed; physical parallel family, finish/pattern/color, image variation; exact serial numerator/denominator; genuine autograph vs facsimile; relic, redemption, other hit; evidence status and source per claim. Allow dual/triple-player cards without collapsing them into one player or duplicating a unique checklist ID.

**Evidence states proposed in Oct 31 spec:** `Read from photo`, `Matched to checklist`, `Possible`, `Not determined`, `User confirmed` (not equal to manufacturer-verified). Preserve uncertainty per field rather than produce invented confidence percentages. `No confirmed match` is not `worthless`.

**Notorious distinctions/test fixtures:**
- 2025 Chrome Update **USC45** may correspond to Tommy Pham or Cal Raleigh; **USC80** may correspond to Tyler Locklear or Dustin May according to current product notes. Match name as well as code; independently verify manufacturer correction.
- 2026 Series 1 base **#1–350** vs Series 2 **#351–700**, Update **US-prefixed**; All-Star Mega contains normal Series 2 cards plus event-logo treatment. Never tag every Series 2 base as ASG foil.
- 2026 LogoFractor: repeating MLB logo pattern matters. Ordinary Chrome card inside LogoFractor pack ≠ LogoFractor parallel.
- Kyle Higashioka 2026 Series 2 #557 with **09/25** was a lesson example: establish serial, **do not automatically name Golden Mirror**.
- Manufacturer odds are pack-/box-format-specific and often describe **a parallel family**, not the probability of one specific player or the total number printed.
- Photos of a base card show one **representative design**; exceptions, inserts, color accents, variations and layout differences remain possible.

## 6. Visual & accessibility specification
- Mobile-first, clear hierarchy, visible card image **on the same public product page** plus tap-to-enlarge; no storage-folder detour or forced download. Asset metadata: exact set, subject/card ID, image origin, actual photo versus mockup, date/reuse permission review; render fallback source link if missing.
- Proposed camera workflow (separate): photo action first, manual search fallback, optional back/closeup only when it resolves uncertainty; avoid mandatory crop/precision gestures. Label results and partial-state failures.
- Prior formal design target: **18px main text**, **48×48px tap targets**, **360–430px mobile layout**, 200% zoom, keyboard/screen-reader focus and clear text labels instead of color-only meanings. These are **requirements for future design QA**, not evidence current CSS passes.
- Easy next-card / copy-to-search action; no long research digression while opening packs.
- Don’t duplicate pages or design systems unnecessarily; inspect current `main.js`, `pulse.html`, `flagship-v2.html`, `education.html` before writing new UI.

## 7. Trustworthy sources, ranking, and usage rules
**Preferred primary:** official [Topps release/checklist/odds pages](https://www.topps.com/), official Topps PDFs; [Topps Ripped collectors' guides and glossary](https://ripped.topps.com/glossary/); manufacturer sell sheets, official pack/box configuration and odds sheets; official Panini/Pulse/Onyx disclosures for their own products. Archived original PDFs matter: manufacturer pages can change.

**Useful secondary for cross-checking:** Beckett set/parallel photographic galleries; CardboardChecklist for searchable checklist indexing; Checklist Insider for parallel/odds explanation; TCDB for set references; specific specialist checklist pages for details. Retailer/dealer pages or seller photographs may help **image/format examples**, not replace manufacturer checklist authority. Prices from listings are **not evidence** of exact checklist/rarity. Historical user-owned originals and verified photo of physical cards may be useful reference material but do not expose private documents or personal data publicly.

**Verification rules:**
- Distinguish **official** vs **secondary** vs **unverified promotional/seller image** and label in UI.
- **Read the actual file**, never guess its content from filename. Checklist count, listed players, series/format, odds denominator and print-run ladder must match specific documents.
- Link the exact checklist and odds source to exact set and packaging; preserve published odds unit and retrieval date.
- Verify linked pages and public images; image attribution is not by itself permission for public redistribution, so asset-rights review remains open.
- Do not fabricate serial parallels, checklist membership, full rainbow completeness or card values.
- Existing source URLs can be found in `config.js` per product and `media/base-cards/base-examples.json`; scrutinize rather than blindly copying.

## 8. Feedback and pain-point register
| Observation / complaint | Required response | Status |
|---|---|---|
| Images talked about but not actually available at public card lookup | Put on the page, enlarge locally, test public URLs, don't discuss storage | Code/image index exists; **live/browser QA open** |
| Missing Stadium Club Mega | Add complete product page/checklist/photo and special features | **In repo**; validate detail and public display |
| Too many project names, duplicate files, conflicting directions | One master hub, keep legacy links and version history; don't rebuild | **This document**; reconciliation ongoing |
| Generic card description isn't the **exact** variant | Separate checklist ID from physical treatment, show source/unknowns | Some guides exist; **exact-variant coverage open** |
| Unverified checklists, source links, inventory assumptions or pasted claims | Manufacturer cross-check and evidence statuses; don't overstate verification | **Ongoing** |
| Product-name confusion: brand vs release vs buying format | Explain hierarchy and format-dependent chase | Rules documented; UI review open |
| Long answers explaining failures instead of fixing products | Concise status, actual test, owner-actionable next step | Working rule |
| Photo-only aspiration might delay actual useful finder | Ship fast accurate text lookup first; photo later | **Nov 26 precedence decided** |
| Need visually pleasing collector card profiles, checklist/odds discoverability, exact Google phrase | Build scannable sections and one-click precise copy; only verified fields | **Open** |
| Failure to distinguish sourced file path from actually read content | Read all files, show evidence and uncertainty, no invented claims | Working rule |
| Public repository not suitable for private purchase receipts, nephew details or private photos | Document engineering-only public requirements here; retain private records off repo | Working rule |

## 9. Historical decisions and precedence
| Date / artifact | Substantive decision or evidence | Precedence |
|---|---|---|
| Oct 16–22, 2026 “School of Topps Knocks” / notes intake | Single educational stream; product hierarchy; how to spot real hits; product-specific official sources; consolidation over duplication | Retain |
| Oct 23–25, 2026 early Pack Room lookup discussions | Online multi-product identifier, checklist search, special parallel help, mobile/offline usage | Retain, re-test |
| Oct 24, 2026 base-picture / Stadium Club request | Every product needs direct public base photo; add Stadium Club Mega with full features immediately | Retain; current repo indicates present |
| Oct 29, 2026 Trading Card Headquarters recovery guide | Preserve public Pack Room; OneDrive remains authoritative for private originals; ChatGPT project organizes discussions; no destructive migration | Retain |
| Oct 31, 2026 Topps Card Identifier Design Specification | Photo-first private prototype, detailed data/evidence model and accessibility targets; mockups **not implementation** | Retain as proposed track |
| Nov 13–21, 2026 product/player profile and Pro Debut work | Topps glossary; exact copyable card-description text; checklist IDs; unique IDs for dual/triple cards; stronger visually structured collector profiles | Retain; implementation incomplete |
| Nov 26, 2026 Onyx/Pro Debut identification discussion | Card identity is the center; add 2025 Onyx Vintage Extended and later 2026 Pro Debut; reuse existing work, do not delay text search for camera recognition | Latest explicit priority |
| Nov 26, 2026 consolidation request | Cross-chat centralized decisions, features, requirements, feedback, pain points and source policy in a single living home | This file |

**Potential conflict resolution:** Old intake described 2026 Cosmic Chrome as a top gift candidate. Later user directions passed at retail and **exclude it from future watch/purchase consideration**. That pertains to the *shopping scout*, not card-lookup eligibility. Keep purchase decisions out of the public app. Earlier Oct 31 scanner spec aimed for a separate private app; Nov 26 requirement prioritizes the existing **public searchable finder**. Both can coexist, but the scanner is not the MVP gate. Older user opinions about splitting boxes must not turn into unsolicited instructions for children.

## 10. Private records / other relevant work to consult before implementation
The following prior artifacts are **references, not public inputs**. Read their contents rather than infer from names:
- `Murphy_Finn_Baseball_Card_Notes_Intake_2026-10-22.txt` — historical decisions and raw intake.
- `Trading_Card_Headquarters_Recovery_and_Setup_Guide_2026-10-29.docx` — architecture, provenance, consolidation policy and source locations.
- `Topps_Card_Identifier_Design_Specification_2026-10-31.docx` (also PDF) — 9-page prototype spec, examples and validation criteria.
- `2025 Onyx Vintage Extended Baseball notes.txt` — checklist and parallel evidence; investigate official source documents.
- 2026 Topps Pro Debut product-specific checklist/odds PDF, player master workbook / checklist-ID tab and education sheet. The archive includes per-player and subset metadata; verify version before using.
- Existing Pack Room GitHub JSON files, images, education material, specialist pages and QA tests. These **must** be inspected directly at implementation time.
- Other product collector-card profile mockups, original set sell sheets, School of Topps Knocks word cloud and notes. Avoid duplicating an old workbook or obsolete course.

**Do not claim an exhaustive verbatim audit of all chats.** This hub draws on retrievable prior conversation context, three reviewed archival documents, present request/feedback and inspected source files. Full line-by-line reconciliation of every historical chat, every OneDrive asset and every source URL has **not** been completed.

## 11. Definition of done for each new release
- [ ] Correct manufacturer, year, product, exact format description and distinct base checklist established.
- [ ] Complete, deduplicated base and targeted insert/autograph/relic checklist IDs; multi-player and prefix handling tested.
- [ ] Verified visual base design directly **visible on public site**, enlargement works, accurate photo/mockup label and legal reuse reviewed.
- [ ] Search by code, player and subset works, ambiguity or collision handled transparently.
- [ ] Physical parallel/finish identification stays separate from base identity; serial stamps and odds interpreted accurately for package.
- [ ] Official checklist/odds/education links resolve and correspond to actual product (not similar year or format).
- [ ] Accessible mobile and desktop page, print/guide, state handling, useful copyable exact card-search text.
- [ ] Existing products, saved pulls and offline functionality unchanged or regression-tested.
- [ ] Public GitHub Pages URL opened on real devices after deployment; record date, results and any exceptions.
- [ ] Update **this hub**: new decision, source, status and outstanding work.

## 12. Suggested next implementation order
1. Audit public site all nine entries and specialist flows; record evidence for image rendering and search.
2. **Build/finish 2025 Onyx Vintage Extended** lookup using existing authoritative original notes, followed by **2026 Topps Pro Debut**; do not guess checklists or claim live deployment without test.
3. Add concise collector-profile layout + exact search title + authoritative checklist/odds link to existing lookup, preserving source statuses.
4. Expand photographed base designs, verified parallels and quick visual cues; audit rights to publicly distributed images.
5. Separately develop camera recognition after fast manual identification is reliable.

## 13. Maintenance protocol for all future assistant/developer sessions
1. Read this document, current `config.js`, relevant product dataset, specialist route and the actual official source.
2. Identify what the user **decided**, what's **proposed**, what code currently **does**, and what's **unverified**. Explicitly reconcile new requests with older conflicting decisions.
3. Make minimal, non-destructive changes in the existing Pack Room; no competing project root, no surprise migrations.
4. Cite sources in change descriptions and preserve source/version metadata. Never replace a verified fact with an assumption.
5. Test code **and the deployed public page**; report any deployment/testing limitation plainly.
6. Update this hub's date, status table, resolved issues and change history at the same time as meaningful site changes.
