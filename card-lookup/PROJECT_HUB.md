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


---

# PART II — CROSS-CONVERSATION FORENSIC REQUIREMENTS REGISTER
**Expanded historical reconstruction: 2026-11-26.** This section supplements Part I, with the original current public app preserved. It records both the small Card Finder and the larger Trading Card Headquarters ecosystem. It is intentionally verbose: this is the **source-of-truth working documentation**, not a child-facing cheat sheet.

## 14. Coverage, method, and what the source record can support

### Sources directly inspected for this expansion
1. **Current GitHub repository** \`damienreilley/fantasy-baseball-2026\`: \`card-lookup/config.js\`, \`main.js\`, \`index.html\`, \`media/base-cards/base-examples.json\`, current earlier central-hub text; older inspection additionally covered \`packs.html\`, \`education.html\`, \`style.css\`, \`data/stadium25.json\`, \`sw.js\`, \`base-gallery.html\` and the base images.
2. **Murphy_Finn_Baseball_Card_Notes_Intake_2026-10-22.txt**: October 22 requirements, purchase boundaries, product hierarchy, educational questions, raw text appendix.
3. **Murphy_Finn_Baseball_Notes_Organized_2026-10-23.md**: October 23 raw unsaved notes and named historical conversation crosswalk, current versus unresearched suggestions and product priorities.
4. **School_of_Topps_Knocks_Raw_Word_Cloud.txt**: learning vocabulary and future topics (readable retrieved content).
5. **School_of_Topps_Knocks_Official_Cheat_Sheet_2026.pdf**: two-page study guide, three source-document categories and four-step “Guapo pack-opening” method.
6. **Trading_Card_Headquarters_Recovery_and_Setup_Guide_2026-10-29.docx**: architectural roles, folder locations, project governance, source quality and recovery policy.
7. **01_Start_Here_Project_Setup.docx (Oct 30)**: final project structure, named chat categories, verification limits and continuity procedure.
8. **Topps_Card_Identifier_Design_Specification_2026-10-31.docx/PDF**: full nine-page formal design specification of the *private, not-yet-built* camera identifier; implementation boundary, data model, UI, validation, privacy and accessibility.
9. **Topps_Collector_Card_Profiles_v6.pdf**: six rendered sample card profiles and exact visual/collector fields. Samples, not blanket independent validation of all underlying facts.
10. **2025 Onyx Vintage Extended Baseball notes.txt**: actual user questions, copied checklist/parallel figures and original source links.
11. **Pasted text(8).txt**, the Pro Debut workbook execution prompt: authoritative player universe, fields, checklist-to-player/subset mapping, complete QA and benchmark/pricing separation. Requirements are historical; older \`v4→v5\` instructions are not an instruction to regress newer workbook versions.
12. **Current conversation**: Oct 24 base-photo/Stadium Club requirements, Nov 26 cross-chat consolidation, the request for a real Markdown download, and the explicit demand for comprehensive—not partial—documentation.
13. **Retrieved past-conversation context**: Oct 23 Pack Room seven-product expansion, Oct 31 photo identifier request, May 29 Finn/Murphy preferences and requested card types, and other named conversations summarized or reproduced in the intake.
14. **Relevant Nov 2026 conversation history** made available to this session: Pro Debut spreadsheet & checklist design; card collector profiles and revisions; new Trading Card Headquarters; product education and sell sheets; packaging/parallel discussions; purchase and catalog preferences.

### Audit integrity
- **Directly read** means actual content was retrieved or source code inspected this session.
- **Preserved quoted user requirement** means exact original user text was present in a directly read source's verbatim appendix or visible current/prior conversation.
- **Reconstructed from conversation context** means the historical message was summarized by the available retrieval system or conversation digest; this is not the original verbatim transcript.
- **Not exhaustively accessible**: this interface did not yield complete verbatim exports of every historical chat and all connected OneDrive records. **Never falsely assert those specific artifacts were all read.** The best-accessible material and explicit provenance are nevertheless consolidated below, rather than discarded or represented as a completed exhaustive transcript audit.
- **No source-content guessing from filenames.** A file named “Verified” is not proof of verification and a pasted link is not proof it works now.

### Named historical chat navigation index
These names are **traceable chat-search titles**, not fabricated direct URLs: “Topps Knocks Crash Course”; “Baseball Cards Learning Topics”; “Identify Topps Card”; “2026 Topps Chrome Baseball LogoFractor Edition” pilot; “Card Identification & Pulls”; “Topps MVP Buyback Program”; “00- Baseball Card products w prices”; “01- Baseball Card products w prices” (one conversation reached maximum length); “Baseball Cards Dual-Priority Watch”; “Topps Drop Strategy”; “Topps Pro Debut Baseball”; “2026 Topps Chrome Update Series”; “Trading Card App”; “Design Card Lookup Guide”; “School of Topps Knocks”; “Growing Word Cloud”; “Gmail Card Audit”; “2025 onyx”; “Compare Penny Sleeves”; “Topps Collector Card Profiles”; “2026 Onyx Hobby Price Watch”. Their inclusion **does not claim each complete transcript was opened**.

## 15. Complete goal hierarchy: what is core, what is adjacent
| Workstream | Primary goal | Location / product boundary | Current decision |
|---|---|---|---|
| **Card Finder / Pack Room** | During a live pack opening, find exact card and recognize unusual finish, insert, numbering, auto, relic, redemption | **Existing public GitHub Pages website**, links directly to image and sources | **PRIMARY PUBLIC PRODUCT** |
| **School of Topps Knocks** | Teach product-family distinctions and how to recognize the exciting or unusual pull | Reference pages, visual guides, official sheet links, simple curricula | One coherent school; not duplicate “Baseball Cards 101” |
| **Collector Card Profiles** | Rich, compact, screenshot-friendly description and exact search/copy link for a specific card | Can become improved Card Finder result layout | Desired next evolution, source-backed |
| **Private photo-assisted identifier** | One photo → candidate card identity with explicit uncertainty and follow-up view | **Private prototype** proposal from Oct 31, separate auth/security from public site | **DESIGN ONLY**, not permission to publish private pictures |
| **Trading Card Headquarters research app** | Research, purchases, orders, inventory, sell sheets, gifts | Private app / HQ; not automatically public Pack Room | Distinct larger aspirational program |
| **Box research and buying scout** | Evaluate excitement/chases/odds against MSRP and current seller price | Separate research workbook/automation; not primary Card Finder result | Retain standards, no unsolicited alerts |
| **Product release tracking** | Topps preorder, EQL, launch events, availability | Separate ongoing scout and HQ records | No duplicate notifications |
| **Inventory / ownership / gifts** | Separate purchased, delivered, possessed, gifted, opened and actual cards | Private records; current site local saved pulls are not cross-device inventory | Never infer ownership from research or a cart |

**User's explicit Oct 23 formulation:** “for all the product lines I got my nephews — I want the online tools to check what we opened, similar (but much better) than what we did for 2026 Topps Chrome LogoFractor.” That is a product-wide scope, not a request for one-off novelty pages. 
**User's later explicit instruction:** images should be **accessible on the public site**; storage discussion is irrelevant to the user experience.
**Public/private conflict resolution:** the public manual finder remains accessible without authentication; private photo capture and purchase records are **not** to be exposed on public GitHub Pages.

## 16. Detailed functional inventory and gap matrix
| ID | Capability / behavior | Actual historical requirement | Current support / gap | Priority |
|---|---|---|---|---|
| F-001 | One public launch page | One bookmark for all the nephews' products | Menu for nine products in \`index.html\` **in repo**; newer special routes present | P0 |
| F-002 | Product-specific selection | Show year + set/release + format, avoid confusing related lines | Current \`config.js\` supports title, line, year, format | P0 |
| F-003 | Card number search | Search exact printed ID, e.g. \`USC178\`, \`#557\`, \`BLCL-01\` | \`main.js\` normalizes case and #; preserve prefixes/zeroes | P0 |
| F-004 | Player/name search | Find card with little typing | Present in JS; verify aliases, accented names and duplicates | P0 |
| F-005 | Multiple candidates | Same number can occur in inserts or even collisions | JS shows matching entries; **audit whether it hides collisions when exact code found** | P0 |
| F-006 | Checklist coverage | Base, insert, autos, relics, variations, specialty subsets | JSONs exist; **not all manufacturer-verified** | P0 |
| F-007 | Base design picture | View regular base from every tracked set on the actual page | Image index/gallery/render logic in repo; **public QA outstanding** | P0 |
| F-008 | Enlarge/reference | Tap photograph → enlarged photo; seller/promotional truth labels | Code paths exist | P0 |
| F-009 | Physical variant decision | Decide whether same player/# is base, parallel, SP/SSP, insert variation | **Not fully automated**; guides only | P0/P1 |
| F-010 | Format-specific parallel odds | Mega versus Hobby, SE versus EA, etc.; state unit | Guides, external links; **not yet a verified full odds resolver** | P1 |
| F-011 | Real vs facsimile autograph | Inspect on-card/sticker and whether authentic signature is possible | Basic guidance; full illustrated workflow open | P1 |
| F-012 | Number stamp meaning | Show copy x of y, avoid assuming parallel from \`/y\` alone | Educational guidance present; exact matching open | P0 |
| F-013 | Rookie indicators | Display RC separately from rarity or guaranteed market value | Data supports \`rookie\` field where loaded | P1 |
| F-014 | Multi-player card identity | Dual/triple autos show all subjects, one physical checklist ID | **Required by Pro Debut**; generic model not fully validated | P0 Pro Debut |
| F-015 | Searchable seller/manufacturer sources | Official checklist, odds, education & source links; reader can inspect | Sources tab exists; verify all URLs/format correspondence | P0 |
| F-016 | Quick cheat sheet | Immediate “what’s good?”, parallel cues, special warnings | Guide tab/education pages exist; verify clarity | P1 |
| F-017 | Printable/offline materials | Work on phone/laptop, usable without ChatGPT and optionally offline | SW and offline single-file backup exist; test offline | P1 |
| F-018 | Save pull | Save selected card, remove, back up CSV | Current localStorage only; **not globally shared or synchronized** | Current, with warnings |
| F-019 | Exact Google copy string | Set/year/card/verified treatment in one line | Existing \`Topps_Collector_Card_Profiles_v6.pdf\` demonstrates; **not broadly live** | P1 |
| F-020 | Card profile identity | Year, brand, product family, set, number, type, player, position/team | Profile examples exist; full live UI not verified | P1 |
| F-021 | Card profile parallel section | Physical appearance, foil/X-pattern, serial stamp, run, rainbow | v6 sample layout; not blanket live implementation | P1 |
| F-022 | Source-aware rarity | Per-pack odds of any parallel family vs odds of specific player | v6 model; require exact format and source | P1 |
| F-023 | Camera/photo upload | Take or upload image, automatically propose identity | **DESIGNED ONLY** in Oct 31 private prototype | P2 |
| F-024 | Back/closer photo follow-up | Ask once for only what resolves uncertainty | Proposed, not implemented | P2 |
| F-025 | Session next card/copy | After result, process next without restarting; preserve short recent list | Proposed in photo prototype | P2 |
| F-026 | 2025 Onyx Extended and 2026 Pro Debut | Add actual owned products to lookup | Not in inspected original nine-product menu | P0 |
| F-027 | Educational PDFs/sell sheets | Original official assets discoverable from set's guide | Some links/pages exist; catalog all owned sets | P1 |
| F-028 | Human-readable search issue | Don't label a missing checklist match worthless | Explicit error copy in JS | Must retain |
| F-029 | Cross-device collection | Sync inventories and actual card photos | **Not present**; future feature, requires privacy model | P3 |
| F-030 | Source/decision hub | One durable Markdown changelog and reconciled requirement baseline | This file; future updates required | P0 governance |

### Key UI risk revealed by code
\`main.js\` computes \`exact=cards.filter(...code===search)\` and, if exact exists, uses only those exact hits. This is reasonable for exact ID but can mask a player-name match when a search term happens to be a card number; acceptance testing must cover this. The search returns a maximum of 25 rows and encourages narrowing. “Save pull” appends checklist identity, **not a validated exact parallel or photograph**; do not call that a full collection/valuation database.

### Distinguish interface “photo-first” phrases
The current \`flagship-v2.html\` link is described in HTML as “photo-first” but the visible site copy says “**Enter card number → see base-card photo**.” That is a **reference-photo-first visual manual lookup**, **not** proof the site can recognize the user’s uploaded photograph. A future demo must not confuse these two experiences.

## 17. Exact release/product scope, including unbuilt and low-priority ideas
### Current nine public product keys (see Part I)
\`stadium25\`, \`chrome25\`, \`pulse26\`, \`panini26\`, \`logo26\`, \`series1\`, \`asg26\`, \`series2\`, \`update26\`.

### Explicitly requested earlier as new lookup tools (October 23, original paste)
- **2025 Topps Chrome Update Series Baseball Mega Box** — originally high, now in repo.
- **2026 Pulse Big League Chew Baseball Blaster Box** — originally high, now in repo and specialist route.
- **2026 Panini USA Stars & Stripes Prizm Baseball Mega Box** — originally high, now in repo.
- **2026 Topps Chrome Baseball LogoFractor Edition Pack** — earlier pilot, should not be rebuilt from scratch.
- **2026 Panini Halloween Multi Sport Trick or Treat Bundle Pack** — “if easy”, low priority and **not required** for MVP.
- **2026 Topps Allen & Ginter MLB Baseball Value Box** — “if easy”, low priority for lookup then; nonetheless it is educationally important for minis/rip cards.
- **2025 Topps Stadium Club Baseball Mega Box** — subsequently urgent; in repo. Remember shared box experience but don't prescribe how nephews split/open packs.
- **2026 Series 1, Series 2, Update, Philadelphia All-Star Series 2 Mega** — site product scope.
- **2025 Onyx Vintage Extended Series Hobby** — current P0 missing lookup, with special manufacturer-specific autograph/inscription concerns.
- **2026 Topps Pro Debut Hobby/Jumbo** — current P0 missing lookup, multi-player subset matrix and prospect metadata.
- **2026 Topps Chrome Baseball** ordinary base / Mega parallels — appears in profile v6 and requested exact card examples; **audit whether a separate product finder is on live site**, rather than assuming a plain LogoFractor lookup covers it.

### Future products and teaching subjects, not automatically approved builds
Bowman Baseball, Bowman Chrome, Bowman Draft, Bowman’s Best, Bowman Sterling, Topps Chrome Black, Chrome Sapphire, Chrome Platinum, Allen & Ginter X, Cosmic Chrome, Museum Collection, Five Star, Topps Hoops Basketball (separate sport), older Bowman Mega editions. Future inclusion depends on actual owned products and reliable set-specific source data. The Card Finder should not inherit the *shopping* watchlist as the site menu.

### Explicit exclusions / deferrals
- 2026 Panini Halloween: low priority when requested, not an urgent mandatory site launch.
- Holiday-card buying recommendations were paused, do not reinsert as personal favorites.
- 2026 Topps Cosmic Chrome was later explicitly **excluded from purchase watch/recommendations** because user would not pay above acceptable retail; this does **not** prevent identifying an already-owned card if such a product ever becomes part of inventory.
- An unavailable autograph in a Mega pack is not assumed a guaranteed chase; distinguish “look for”, “average”, and “guaranteed”.

## 18. School of Topps Knocks — retained curriculum and exact question bank
**Canonical name:** “SCHOOL OF TOPPS KNOCKS!” (established Oct 16). “Funcle Guide”, “Baseball Cards 101”, “School of Base Knocks” are aliases/older formulations. “The Growing Word Cloud” is an existing module, identified historically as **Course #4**, not a second school or a separate new app.

### Learning progression and deliverables
1. **Product tree**, with explicit year/manufacturer/brand/product line/family/release/edition/series/packaging format separation. Start with flagship Series 1, 2, Update, then Chrome, LogoFractor, Sapphire, Bowman, Stadium Club, Allen & Ginter, Pro Debut and specialty releases.
2. **Base card and set**: what the main numbered checklist is; repeated visual design with player/team accents and meaningful exceptions.
3. **Parallel versus insert**: a parallel modifies an existing base *or insert*, while insert has separate themed design/checklist; rare photograph variants may keep same number.
4. **Refractors and textures**: true/standard Refractor, X-Fractor, Prism, Mojo, Atomic, Wave, RayWave, Shimmer, Negative, Sepia, colored refractors, Superfractor, foil/foils, filigree, gold and other print treatments; distinguish what is universal versus release-specific.
5. **Serial numbering**: \`0142/2026\`, \`03/76\`, \`09/25\`, \`1/1\`; numerator is copy, denominator is print run for *that version*, not whole base-card universe. Distinguish pack odds from print run.
6. **Rarity classes**: SP/SSP, image variations, case hits, rare/chase inserts, blaster/mega exclusives, redemptions; do not mistake rookies for automatic hit.
7. **Autographs**: real on-card ink, sticker autos, printed facsimiles, certified/uncertified and inscriptions; relic/memorabilia, auto relic, patches, one-of-one.
8. **Pack detective routine**: Read the back and card number → match *exact release* checklist → inspect physical finish, serial, signature/material/photo → consult *correct box/pack odds* before classifying. This is documented as “The Guapo Pack-Opening Check” in the 2026 two-page sheet.
9. **Official three-document reference system**: \`CHECKLIST = what exists\`; \`ODDS SHEET = difficulty per pack by exact configuration\`; \`EDUCATION SHEET = photographs, parallel styling, product features\`. Sell sheets and Topps Ripped guides supplement these, they do not replace checklists/odds.
10. **Special product lessons**: Allen & Ginter standard and mini cards, variants and rip cards (deciding to rip is a distinct decision); 75 Years of Topps redemption; Stadium Club photo-centric design; 2026 All-Star event-logo parallels; Topps Chrome/LogoFractor/Sapphire relation; Bowman “1st Bowman” and prospect/MLB debut; full Bowman/Draft/Chrome conceptual contrast.
11. **Programs changing value after pull**: Topps Chrome MVP Buyback and similar eligibility rules; explain what program rules matter without asserting an unverified universal buyback.
12. **Next lessons by cards actually held**: use authentic examples or clearly labeled mockups; student sees base/parallel side-by-side; avoid text-only wall of jargon.

### Historical question bank to answer with sources, not guessed answers
- How many kinds of refractor? Are they all parallels?
- Can X-Fractor be a standalone card or only a parallel? Are all colored parallels numbered?
- Which patterned refractors appear in **each specific release** and **which box**? Do retail/hobby/mega contain distinct treatments?
- How does a rainbow differ from an insert checklist? What if a family has 58 possible treatments?
- Is the Topps Chrome LogoFractor edition a separate checklist or Chrome checklist with additional surface finishes? Does *every* card in its pack carry the logos? How does Sapphire fit?
- Do 2025 Chrome / Chrome Platinum / Chrome Update share a base checklist or numbering? Verify instead of repeating pasted claims.
- Which Bowman line is for current MLB players versus prospects; what exactly is “1st Bowman Chrome Auto”? How does Pro Debut fit?
- Blaster vs Value vs Mega vs Hobby vs Jumbo vs Super Box vs Hanger vs Fat Pack vs Delight/International — what differs: card count, hits, exclusives, odds, cost?
- What distinguishes on-card ink from printed facsimile? Are auto print runs equal for all players?
- What can a gold-colored back indicate? How do Golden Mirror and /25 numbered colored parallels differ?
- If a rare player hit has already appeared on social media, how does that affect realistic box choices? **Do not imply the complete inventory of unopened hits is knowable.**
- When are stored cards eligible for redemptions, store-credit buybacks or future award-driven programs?
- What does an official education sheet show versus a sell sheet versus a checklist?

### Word cloud terminology preserved for future lesson glossary
\`Base\`, \`insert\`, \`parallel\`, \`variation\`, \`SP\`, \`SSP\`, \`Refractor\`, \`X-Fractor\`, \`Prism\`, \`Wave\`, \`RayWave\`, \`Shimmer\`, \`Negative\`, \`Sepia\`, \`Atomic\`, \`Superfractor\`, \`Mojo\`, \`rainbow\`, \`Foil Filigree\`, \`Glossy\`, \`Daguerreotype variation\`, \`LogoFractor\`, \`relic\`, \`auto\`, \`1st Bowman\`, \`redemption\`, \`mini\`, \`rip card\`, \`numbered\`, \`case hit\`, \`checklist\`, \`odds\`, \`education sheet\`, \`sell sheet\`, \`fat pack\`, \`value\`, \`hanger\`, \`blaster\`, \`mega\`, \`hobby\`, \`jumbo\`, \`display box\`, \`Super Box\`, \`Club Super Box\`, \`Japan exclusive\`, \`Delight Box\`, \`Fanatics\`, \`Ripped\`, \`MVP Buyback\`, \`Population report\`. These are **topics** and do not establish that all are applicable to every release.

## 19. Collector card profile: exact design requirements extracted from v6 and chat feedback
**Desired profile is more than a Google search result and more than a checklist row.** It should lead with player/card identity and what makes this exact physical card distinctive.

### Required visible layout, in recommended reading order
1. **Title:** player name, team, position; “NUMBERED” or honest \`unnumbered\` indicator; observed exact stamp (e.g. \`49/50\`) and properly explained print run.
2. **Variant hero:** large named treatment (e.g. Gold X-Fractor) only when supported by physical/reference evidence; prominently show front image and back, or the right cropped detail if available.
3. **COPY THIS TO SEARCH**: readable full line, one-tap copy; Google search link using the same exact string. The v6 example is \`Roki Sasaki — 2026 Topps Chrome #199, Gold X-Fractor /50\`.
4. **Card identity matrix:** Year, brand, product line, series/edition, exact card # including suffix/prefix, base vs insert vs parallel, rookie and multi-player details.
5. **Parallel design:** what to visually look for: stars-and-stripes border, repeated event logo, gold border, X-pattern, surface texture; *where* numbering lives, front/back.
6. **Pack odds:** \`1 in N packs\`, specify **family of cards**, applicable box/pack format and exact odds-sheet row; never imply probability of one player or misapply Hobby odds to Mega.
7. **“Chasing the rainbow”:** neighboring finishes/serial tiers for that *same exact subset* only, not a generic all-releases rainbow.
8. **Card stock / finish:** paper, chromium paper if justified; authentic autograph or relic (or explicit none when confirmed).
9. **Checklist and odds cross-references:** exact manufacturer checklist section, matching number and subject, relevant PDF + row identifier; source retrieval date; source links should actually open.
10. **Profile verification status:** confirmed vs image-estimated; no false confidence or silently invented serial family.

### Six v6 profile examples (examples from the inspected PDF, not endorsements of every claim)
| Page | Card example | Reference text and notes |
|---|---|---|
| 1 | Dylan Beavers 2026 Topps Series 1 #339 RC | Independence Day **03/76**, stars-and-stripes border; format-dependent odds unrecorded |
| 2 | Kyle Higashioka 2026 Topps Series 2 #557 | **All-Star Game Orange 09/25**, repeated ASG 2026 pattern; v6 cites two Mega odds columns |
| 3 | Roki Sasaki 2026 Topps Chrome #199 | **Gold X-Fractor 49/50**, front stamp, Mega-X pattern |
| 4 | Jesús Sánchez 2026 Topps Series 2 #477 | **Gold 0131/2026**, border and back stamp |
| 5 | Lars Nootbaar 2026 Topps Chrome #292 | **Aqua X-Fractor 058/199**, horizontal card example; repeated X pattern |
| 6 | Kyle Higashioka Series 2 #557 | **Golden Mirror** image variation, **unnumbered**; alternate photo and gold back |

**Important historical update:** An earlier learner question about Higashioka's \`09/25\` was unresolved and emphatically **not** proof of Golden Mirror. The later v6 PDF contrasts a claimed ASG Orange /25 and a separate Golden Mirror image variation. Preserve *both records and their dates*; don't silently reinterpret the first photo without direct source/photo review. The examples are design guidance; any transfer into live indexed facts requires independent verification.

**Quality feedback from Nov 18–21 card profile conversation:** move information into logical clusters, visually surface year/brand/product line/release/type/number/parallel/insert/auto/relic, explain special shiny/foil treatments, and use actual **Topps glossary wording**. A collector should instantly know how to search for the exact card and how to locate it in the manufacturer's checklist and odds sheet. Iterate layout, not just add more text.

## 20. Product-specific knowledge and outstanding identification logic
### 20.1. 2025 Stadium Club Mega — priority preserved and current code
- Standard photo-centric base design; one actual base-photo reference is labeled Matt Shaw #65.
- Mega metadata in \`config.js\`: 18 × 8 = 144 cards, 200-card base checklist, nine Light Blue parallels and two Sepia, nine inserts per box; additional “Beam Team”, “Concentration”, “Savage Sluggers”, “Yours for the Taking”, “In Case of Emergency”.
- Separate **parallel, base, insert and auto checklists** must remain distinct. A Mega-exclusive tint is not the same as a serial-numbered foil tier.
- Prior user specifically said **Stadium Club missing**; it was added to repo after that feedback. Current outstanding task is **verify public functionality and exact official source matching**, not call it absent.
- Existing retrieved file \`card-lookup/data/stadium25.json\` showed 640 searchable entries from an independent reference; the official manufacturer's PDF has not been fully row-audited in this pass.
- User liked high-quality photography and the nephews enjoyed sharing a prior Stadium Club product; this is product preference context, not a requirement to buy another.

### 20.2. 2025 Chrome Update Mega — duplicate-number handling
- Mega context: seven packs × six cards, ten X-Fractors claimed in current configuration. Ordinary base ≠ X-Fractor; check repeating X surface.
- User and source notes flag \`USC45\` as Tommy Pham **or** Cal Raleigh and \`USC80\` as Tyler Locklear **or** Dustin May because of a printed-number anomaly. Verify against manufacturer's issue/corrected list and disambiguate player.
- \`USC1\` and \`USC167\` reportedly not printed numbers in historical source. Verify before blindly treating absence as error.
- Existing data may contain independent checklist entries including inserts; ensure a search distinguishes an insert code from a base number.

### 20.3. 2026 Chrome LogoFractor — original October 23 pilot
- Exact user purchase/use: **individual five-card pack**, not six-pack Mega Box. A pack can have ordinary Chrome cards with no MLB logo pattern.
- Historical user-pasted references: 300 base cards, image variations, 1991 Topps, Big Ticket Players, Future Stars, Perspectives, Wrecking Crew; separate autograph sections. Another independent source claimed 495 total checklist cards / 58 parallels; neither count was fully reconciled when pasted.
- User-pasted approximate box-level frequencies are **not pack odds**; never present as verified chance for a five-card loose pack.
- Pasted possible base parallel run: Pink /250, Blue /150, Green /99, Purple /75, Gold /50, Orange /25, Black /10, Red /5, Rose Gold 1/1; validate exact availability per subset before showing a definitive rainbow.
- Pilot already produced a dedicated quick reference, interactive identifier, printable/offline versions. Preserve as previous work; audit and link rather than recreate or overwrite it.
- **Core unresolved comparative teaching question:** Chrome regular vs LogoFractor vs Sapphire: actual checklist/photographic relationship, finish and box restriction.

### 20.4. 2026 Topps Flagship and Philadelphia ASG
- Series 1 base: #1–350; Series 2 #351–700; Update US1–US350. Distinct original source checklists, same broad flagship family.
- All-Star Mega is **Series 2 base** with additional ASG-logo-foil variation family and some themed 1991 Topps insert parallels; not an entirely new 350-player checklist. Ordinary non-event base is possible in the same box.
- **Avoid exact name from serial alone**. A \`/25\` could map to different subset families. Verify repeating foil logo, color, photo, back and manufacturer odds.
- Existing flagship v2 is a simplified manual number/visual lookup; independently test before claiming camera reading.
- Series 1/2/Update referenced Education Sheets and original collector guides; preserve original PDFs for compare/side-by-side, not merely a generated color swatch.

### 20.5. 2026 Pulse × Big League Chew
- User explicitly requested a separate tool, and current \`main.js\` routes the product to \`pulse.html\`.
- Existing configuration says 100-card base checklist, six packs × eight cards, six numbered cards expected per blaster; autos not guaranteed. This is current **code metadata**, not fresh manufacturer audit.
- The existing Roman Anthony picture is **retailer promotional artwork; base designation unverified**. Do not show it as a photograph of the definitive BLCL standard base card.
- Special case hit and flavor-card subsets require careful numbering/unique-variant handling. Verify \`pulse.html\` separately from the nine generic product tools.

### 20.6. 2026 Panini USA Stars & Stripes Prizm Mega
- USA national-team and college/youth players; not interchangeable with MLB mainline rookie numbering. Ice pattern ≠ automatically rare/serial-numbered.
- Configuration stated in current code: 10 packs × four; average three autographs/memorabilia **not exact guaranteed three**. Cross-check source if published to users.
- Its inclusion for owned cards does **not** relax Topps/Bowman-only scope of separate *future baseball purchasing scout*.

### 20.7. 2025 Onyx Vintage Extended — critical missing specialist tool
**Read directly from user's Onyx notes (not all independently verified):**
- Bought “2025 Onyx Vintage Extended Series Baseball Hobby Box”; user wants lookup *before nephews open it*.
- Questions to address: what to look up when mainly base and autos; set design photographs; announced versus **unannounced** inscriptions; market-discovered surprises; “how many discovered?”; rarity by player; whether every player has same numbered autograph tiers; interpretation of \`/x\`; difference between Base Series and Mega Series packaging.
- The notes claim a **56-card base checklist** and **34-player autograph list**. Treat numbers as copied source *pending independent manufacturer reconciliation*.
- Claimed **Base Series** autograph parallels: Yellow /150, Slate /50, Blue /35, Burgundy /10, Gold Inscribed /10, Silver /10; other shared levels may include Black /5. Do not copy the same probabilities to another format.
- Claimed Gold Bordered Inscribed /10 autograph entries for each of 34 signers, with both Base and Mega distribution; needs exact source support.
- Reported unannounced ink inscription variants (blue/red ink; examples of nicknames/draft years and anecdotal /12). **Unannounced discovery accounts are NOT manufacturer-confirmed counts**. Maintain a separately sourced \`reported sightings\` section with listing date/photo/uncertainty.
- Source candidates from original notes (not independently checked today): \`https://degreegrading.com/checklists/2025-onyx-vintage-extended-baseball/#sec-111418\`; \`https://www.blowoutcards.net/images/ss/25onyxvintexBBcl.pdf\`.
- **MVP requirement:** searchable base/auto subjects and actual physical auto color/number, with meaningful inscriptions warnings. “All 34 auto signers have exactly same print run” must **not** be assumed.

### 20.8. 2026 Topps Pro Debut — data architecture already specified
- **Player universe user target:** **227 unique players across whole checklist**, **200 base** and **27 checklist-only**. These are expected counts to confirm against official PDF, not a permission to falsely claim verified.
- **Identity and source model:** one unique checklist card ID per physical card; multi-player dual and triple autograph cards list **all players** in a single ID and link to each person's profile.
- **Required new \`Checklist IDs\` tab:** one row per manufacturer ID; exact ID; player(s), subset type (Base / Insert / Autograph / Autograph Relic / etc.), official subset name. Preserve \`Player × Subset\` matrix as different lens; do not use one row per player as the only lookup data source.
- Base Card # and Base Set? separate; when no base number, explicit \`No — checklist-only\` not a fake base ID. Count of valid base numbers must equal 200.
- Player Master fields: player, checklist team, current parent organization, current club, MLB/Minors status/debut/date, current level, MLB Pipeline Top 100 rank, FanGraphs 2026 rank, draft year/overall pick/drafted by, autograph Y/N, relic Y/N, subset list/count, source links and verification status. Never mistake MiLB club on card for current club; never infer a current ranking from old season list.
- Official subset titles recorded in execution prompt include Base Cards, Base Chrome Variation, Base Autograph Parallel, Base Chrome Autographs, Arizona Fall League Stars Auto Parallel, Pro Debut Gamers Auto Parallel, Stars of MiLB Auto Parallel, Future Cornerstones, Pro Debut Dual Autographs, Triple Autographs, Jumbo Autograph Relic (verify actual source before import).
- Previous work reached at least **v8** of saved spreadsheet by user report (Nov 18): \`2026_Topps_Pro_Debut_Baseball_Research_v8.xlsx\`. The historical \`v4→v5\` task prompt must **not** overwrite or supersede newer version.
- Separate **manufacturer checklist**, **odds** and **prospect rankings**; only manufacturer cards affect ID lookup, whereas current player and draft facts are enrichment.
- User requested source-verified strong prospects with current rankings and team context. Keep official MLB Pipeline and FanGraphs rankings dated; mark unresolved flags accurately, not bogus “verified” sheet labels.
- Purchase/research records for this set: preserve preorder MSRP **$139.99** and separate Nov 18 Topps release-day **$149.99** plus tax as historical purchasing context; **do not publish private checkout totals/receipts on public finder**. Do not use price sheet as proof of card checklist.
- Already ordered product => focus on cards in hand, not redundant secondary-market shopping; learn pack format directly from order/product evidence.

## 21. Private prototype photo identifier — exact October 31 functional specification
This is a **separate optional development track**, not a claim that the current public site can scan cards.

### Input and capture
- On supported phones, trigger rear camera **or** choose from library; no mandatory product picker or number input before taking photo.
- JPEG/PNG/WebP, investigate iPhone HEIC; design targets were up to 20 MiB per photo, one front, optional back, optional detail. Those figures are implementation/QA targets, **not field-tested limits**.
- Correct orientation, reduce size and strip location metadata; provide oversized Rotate/Replace buttons and no precision cropping requirement.
- If multiple cards or unreadable glare/blur, ask for replacement or more targeted photo rather than choosing arbitrarily.
- If recognition fails, offer one simple manual player/code input while preserving any fields that *are* known.

### Resolution
- OCR/vision text clues + graphical design clues; combine year, set, code, player and photographed image.
- Checklist resolver must validate candidates, not accept ungrounded model vision output as fact.
- Keep \`observed printed code\` separate from normalized search key; preserve leading zeroes and prefixes.
- Identify **identity** separately from **physical finish/rarity**.
- Field-specific statuses: \`Read from photo\`, \`Matched to checklist\`, \`Possible\`, \`Not determined\`, \`User confirmed\` with conflicts and sources. No made-up confidence score.
- For SP/SSP/image variation, only claim proof when photo/source match; \`not detected\` is not \`absent\`.
- Only show format-specific numerical odds if actual format and specific parallel family are known; otherwise “Odds need a format” in Details.

### Result layout and actions
- Phone: one column; optional desktop: photo / identity / base-reference columns.
- Lead with player, card number, year and exact checklist; base or insert; finish; serial; possible rarity.
- Show source evidence behind one \`Details\` affordance, not an overwhelming first view.
- **Compare** uploaded front versus source-backed regular base image of same product; enlarge by tap, no fine drag.
- \`Copy result\` should include unknowns and sources, not falsely omit uncertainty; \`Next card\` clears image and keeps up to ten text-only recent results in tab as **proposed**, not implemented.
- Handle progress with text, Cancel, retry, failed provider, unsupported set, stale/late response, uncertain match. Never fake processing percentage.

### Accessibility, device tests, acceptance criteria
- 360–430 CSS px single-column; main body ≥18px; controls ≥48×48px; 200% browser zoom without sideways scrolling; keyboard focus, screen-reader status; reduced motion.
- Test at least 20 independently known cards across Chrome Update/LogoFractor plus 10 hard/unrecognized images. Coverage should include base, insert, insert parallel, serial/nonserial, duplicate numbers, blurry/glare, unsupported, cancellation.
- Confirm iOS Safari camera/library, Android Chrome, desktop upload, real HEIC, orientation and error behavior.
- Security: authenticated owner-private access; protected server endpoint; credentials server-side, no public photo URL/repository/storage; retain no originals by default; establish third-party analysis provider data retention policy before real-user testing.
- **As of the Oct 31 spec**, photos/recognition service/hosting were NOT connected, mockups were visual plans and the public site was not modified by that spec. No later retrieved evidence established a shipped recognition service.

## 22. Source register: usable high-quality content and risk ratings
### Primary manufacturer + authoritative data — prefer
| Source | Intended evidence | Notes |
|---|---|---|
| [Topps product pages](https://www.topps.com/) | Release, exact product and variants, configuration | Check correct year and packaging; page can change |
| [Topps checklist/odds hubs](https://www.topps.com/pages/series-1) | Official CSV/PDF card IDs, subsets, odds by format | Archive original version/date |
| [Topps Ripped glossary](https://ripped.topps.com/glossary/) | Official terminology and definitions | Use term wording for card profiles |
| [Topps Ripped collector guides](https://ripped.topps.com/) | Images, set highlights, history and examples | Not a substitute for full checklist |
| Official Topps Education Sheets | Manufacturer card appearance, visual parallel guide | Could be illustrative rather than exhaustive |
| Manufacturer sell sheets | Set configurations, hit categories and product pitch | Marketing language not a guaranteed outcome |
| Official MLB / MiLB / MLB Pipeline | Player org, debut, draft, ranking | Dated; separate from card checklist fact |
| FanGraphs dated rankings | Additional prospect context | Ranking year/list must be identified |
| Official Onyx/Panini/Pulse documents | Their respective cards and formats | Topps glossary may not map to proprietary terminology |

### Independent indexing, images and background — cross-check
| Source | Best use | Limitation |
|---|---|---|
| [Beckett](https://www.beckett.com/news/) | Parallel picture comparison; checklists and guides | Confirm year and edition |
| [CardboardChecklist](https://www.cardboardchecklist.com/) | Indexed search datasets & alternate checklists | Independent counts may diverge from official |
| [Checklist Insider](https://www.checklistinsider.com/) | Odds/parallel tables and feature explanations | Validate every release/format and print tier |
| [TCDB](https://www.tcdb.com/) | Set records and card catalog references | Checklist may be community maintained |
| [Degree Grading](https://degreegrading.com/) | Onyx and specialty checklist references | Source context and update date needed |
| [Blowout Cards](https://www.blowoutcards.com/) | Dealer-hosted manufacturer PDF/sell sheet links | Verify PDF authenticity, not just dealer branding |
| [Baseball America](https://www.baseballamerica.com/) | Bowman/Topps product overview and prospect context | Editorial guide not official card checklist |
| [Cardlines](https://cardlines.com/) | Refractor educational background | Useful teaching aid; don't generalize across releases |
| Retailer product pages: Dave & Adam’s, other verified sellers | Exact sealed configuration, packaging images, historical facts | Listings may have stale price/config/stock |
| eBay/listing/pricecharting images | Actual physical photo reference, front/back evidence | Seller attribution ≠ permission; check exact variant and authenticity |

### Specific direct source URLs retained from originals
- Flagship Series 1: https://www.topps.com/pages/series-1
- Flagship Series 2: https://www.topps.com/pages/series-2
- 2026 Update: https://www.topps.com/pages/topps-updates-baseball
- 2026 Pro Debut: https://www.topps.com/pages/topps-pro-debut-baseball
- 2026 Allen & Ginter: https://www.topps.com/pages/topps-allen-ginter-baseball
- Allen & Ginter education PDF (historical pasted link): https://cdn.shopify.com/s/files/1/0662/9749/5709/files/Allen_Ginter_-_Education_Sheet_8.5_x11__pdf.pdf?v=1791916537
- 2026 Topps Cosmic Chrome: https://www.topps.com/pages/topps-cosmic-chrome-baseball
- 2026 Topps Five Star: https://www.topps.com/pages/topps-five-star-baseball
- Release calendar: https://www.topps.com/release-calendar
- MVP Buyback: https://ripped.topps.com/mlb-mvp-buyback/
- Refractor background: https://cardlines.com/topps-refractors-guide/
- 2025 Onyx Extended third-party checklist: https://degreegrading.com/checklists/2025-onyx-vintage-extended-baseball/#sec-111418
- 2025 Onyx Extended dealer PDF: https://www.blowoutcards.net/images/ss/25onyxvintexBBcl.pdf
- Exact site product \`sources\` links, including Stadium Club official PDF, are enumerated in \`config.js\`; the exact image source/per-card metadata lives in \`media/base-cards/base-examples.json\`.

**This is a provenance index, NOT a claim that each external link was live-checked in this audit.** Source quality is judged per claim; preserve retrieved dates for any future independent verification. For public images, copyright/license/use permission needs explicit review; an on-site source link is no guarantee of redistribution rights.

## 23. Governance and continuity — no more competing “hubs”
### Decision chronology
1. **Oct 16**: School of Topps Knocks named; Growing Word Cloud a module and source of glossary ideas.
2. **Oct 22**: One umbrella project and separate themes proposed; rich buying-research and education requirements captured in master intake.
3. **Oct 23**: Existing LogoFractor identification pilot retained; additional high-priority product lookups named; raw notes archived without implying work completed.
4. **Oct 23–24**: Pack Room becomes a publicly usable multi-product site; flagship guides, source links and image requirements.
5. **Oct 24**: Direct public base-design image per release; 2025 Stadium Club urgent addition.
6. **Oct 29–30**: Trading Card Headquarters consolidates project architecture and source of truth; one ChatGPT Project, permanent OneDrive source records, GitHub public lookup; no destructive file moves.
7. **Oct 31**: Separate private photo-first prototype spec, no public implementation or real scanner validation.
8. **Nov 13–21**: Card profiles become collector-grade, sources and precise copyable search phrases; Pro Debut checklist ID universe and multi-player mapping work.
9. **Nov 26**: Central hub required; correct misleading “done” statements; prioritize Onyx and Pro Debut search and usable public images, not storage minutiae.
10. **Nov 26 later**: User rejected a partially consolidated archive and explicitly required **every recoverable decision and requirement** in one Markdown file. This expansion is the response; earlier Part I remains historical for comparison.

### Existing storage map (do not create duplicate folder structures blindly)
- Private permanent records: \`C:\Users\damie\OneDrive\Gifts-Presents\Baseball Cards\` and its existing children. Related archived \`C:\Users\damie\OneDrive\1-Sports-Fantasy-Betting\Baseball Cards\`.
- Historical proposed logical subfolders under existing card root: \`00_START_HERE\`, \`01_PURCHASES_AND_INVENTORY\`, \`02_RESEARCH_AND_PRICES\`, \`03_RELEASES_DROPS_EQL\`, \`04_SCHOOL_OF_TOPPS_KNOCKS\`, \`05_CARD_ID_LOOKUP_AND_SITE\`, \`06_CHECKLISTS_ODDS_AND_INDUSTRY\`, \`99_LEGACY_READ_ONLY\`. **Don't assume every proposed folder exists.**
- GitHub public site code + **this doc** in \`card-lookup/PROJECT_HUB.md\`. This is a project requirements document, not a public private-record dump.
- Original Pro Debut checklist, odds and player master under \`Gifts-Presents/Baseball Cards/cheat sheets - Info Sheets/2026 Topps Pro Debut Baseball/\` and \`Prospects Lists\`; inspect current versions.
- Onyx Extended original notes under \`Gifts-Presents/Baseball Cards/cheat sheets - Info Sheets/2025 Onyx Vintage Extended Series/\`.
- A ChatGPT Project is a **conversation/working context**, not automatically synchronized with OneDrive or GitHub.
- Historical old chats may remain outside project; do **not** delete chats or rename/move files merely to make an index look clean.

### Chat organization (from Oct 30 setup)
\`00 — HQ Dashboard & Decisions\`; \`01 — Purchases & Inventory\`; \`02 — Public Topps Sales & Preorders\`; \`03 — Older Boxes & Remaining Chases\`; \`04 — School of Topps Knocks\`; \`05 — Pack Room & Card Identification\`.
A previous five-lane list used slightly different names. Latest dated Oct 30 guide is the project-organization reference; existing chats need not be forcibly renamed.

### Status/lifecycle semantics that must be preserved in data
\`interested\` ≠ \`recommended\` ≠ \`in cart\` ≠ \`entered EQL\` ≠ \`ordered\` ≠ \`charged\` ≠ \`shipped\` ≠ \`delivered\` ≠ \`physically held\` ≠ \`gifted\` ≠ \`opened\` ≠ \`pulled\`.
Likewise \`official PDF exists\` ≠ \`independent summary correct\`; \`created workbook\` ≠ \`verified complete\`; \`code committed\` ≠ \`deployed\` ≠ \`functionally tested\`.

### Recommended source-of-truth ownership
- Public UI and source-link catalog: existing GitHub Pack Room.
- This design/decision corpus: **one** \`PROJECT_HUB.md\`, versioned in the same repository.
- Private purchase receipts, actual gifting, sensitive family and photo details: existing private OneDrive and/or private HQ, never copied to public website.
- Topps card checklists/odds: manufacturer's documents or clearly sourced copies, with revision/date.
- OneDrive backed-up source materials and lessons: original files retained separately; no accidental overwrite.
- The **public-site user experience** is the deliverable for Card Finder; do not confuse source file location with usability.

## 24. Shopping, prospect and opening-fun preferences — relevant adjacency, not public pricing design
These decisions may influence which products to prioritize for education/lookup, **not** a requirement to insert shopping prompts into every card result.

### Collector preferences and shared-gift constraints
- Finn prefers Topps/Topps Chrome MLB, regular MLB stars and colorful shiny Chrome; Murphy enjoys Bowman prospects/minors and 1st Bowman. They may split one box; do **not** assume two identical boxes or instruct them how to divide packs.
- The **“nephew coolness factor”** is a named criterion: distinctive appealing images, shiny patterns, chase excitement, cards they recognize, and meaningful realistic hit opportunities.
- Do not assume the set is valuable solely because rookie/prospect checklist includes star; weigh actual checklist, attainable chase odds, costs, manufacturing and format.
- A future *comprehensive collection* goal discussed in May: seek examples of insert, parallel/refractor, numbered, genuine auto, relic, auto-patch. That is an aspirational category coverage goal; no single sealed box should be falsely described as guaranteeing all.
- Kevin McGonigle is a major personal/family chase, but **not an exclusive requirement**; other attractive star autos, rare cards and player lists matter.
- Football, basketball and personal purchase discussions should not displace the MLB tool's primary job.

### Box research constraints (historical and still useful to HQ)
- Prefer Topps/Bowman for **new baseball purchases**, especially 2024–26 plus worthwhile older releases. Already-owned Panini/Pulse/Onyx remain included in educational/identification lookup.
- Typical gift budget under $200, ideally near $100; exact exceptions based on strong chase/value, not forced cheapness. Exclude boxes above $1,000, generally avoid 2× original MSRP. Original Topps preorder/MSRP is a permanent benchmark; modest 0–10% premium only if compelling, high markup requires exceptional justification.
- Best deal is **not merely lowest price**: compare exact format, pack count, cards, guaranteed versus average autos, cost per guaranteed autograph, original MSRP, present exact seller price, difference $/%, authentic dealer/stock, published odds/checklist and standout card chases.
- Prior asks requested three interoperable research lists: ranked recommended sealed products, Bowman-with-McGonigle universe, and bargain watchlist. Shared columns include original price, current price, % change, autos/box, cost/auto, packs×cards, total cards, checklist/odds URLs, Kevin autograph Y/N, autograph checklist size, other chases, inventory/availability and notes. **Those are HQ buying tables, not Pack Room card-result fields.**
- Source standards: reputable verified retailer links only, no group breaks, no counterfeit/unknown sellers, no invented stock. Investigate older “major chase already pulled” question but no complete worldwide pull registry exists.
- 2026 Cosmic Chrome: later **excluded** from ongoing purchasing watch; early Oct “very high priority” is **superseded**.
- 2026 Allen & Ginter X: interest only at or below original $219.99, after missed checkout, not above retail.
- 2026 Museum Collection: passed $419.99 EQL; preserve notes as historical reference, not current purchase recommendation.
- 2026 Pro Debut bought: stop redundant secondary price tracking; focus on understanding and identifying cards.
- 2025 Onyx Vintage Extended bought, arrived; actual printed guarantees and autograph configuration should be inspected, not inferred from product name.
- Historical 2024 Bowman Chrome, 2025 Bowman and Chrome Mega, 2025 Topps Chrome, 2025 Chrome Update, Stadium Club, Bowman's Best and Bowman Draft comparisons remain part of separate research, not automatically “current stock”.
- Price and inventory observations from old pasted Amazon/Mercari pages are timestamped *notes* and not present market facts.

### Notifications and workflow
- Existing watch/release scout was to remain one coordinated scheduled stream, normally **9:00 AM ET**, with no redundant alerts or routine no-news notifications. User later requested special Black Friday schedules for sneakers; unrelated to baseball Card Finder.
- Alerts must not be secretly created/duplicated just because an item appears in a discussion. Research reminders should align with the user's explicit choices.
- No automated changes to existing shopping/watch setup are part of this documentation task.

## 25. Detailed evidence-based QA and regression checklist for the existing website
### Route and content QA
- Main \`card-lookup/\` page loads without script errors; every current product card has correct year + exact product name + box format.
- \`packs.html?set=stadium25\`, \`...chrome25\`, \`...panini26\`, \`...logo26\`, \`...series1\`, \`...series2\`, \`...asg26\`, \`...update26\` work; \`pulse26\` routes to \`pulse.html\` successfully; verify \`flagship-v2.html\`.
- Every image index record's local path returns real image bytes; base example is visible on the intended product page, can enlarge, source link works and photo/promo label is honest. ASG uses *regular Series 2 base image*, with alert pointing out ASG-specific logo finish.
- Filter by exact \`USC178\`, \`USC45\`, \`USC80\`, \`#557\`, \`US1\`, \`BLCL-01\`, \`PD-...\` once added; check accents, prefixes, printed leading zeroes and multiple candidates.
- Empty match explains scope and alternate action, not “worthless”; loading and network failures preserve manual user guidance.
- Base/insert section and player name match; never state exact parallel based solely on code.
- “Save pull” state remains on one device only; CSV headers accurately describe what's saved. Delete confirmation and export work.
- Checklist/odds links resolve to the *same year/release and applicable format*; PDFs open in mobile browsers.
- Screen-reader status, keyboard focus, color contrast, 200% zoom, tap target sizes, phone viewport and no broken horizontal scroll.
- Print cheat sheet; revisit site offline after initial cache; switch versions and ensure stale service-worker cache does not serve obsolete product data.
- Confirm public deployment from published domain, not merely repository.
- Check no private receipts, family photos, order costs, addresses or API secrets in public assets.

### Source QA
- Compare official checklist counts and IDs line-by-line or programmatically, not against independent counts alone.
- Preserve distinct numbered versus unnumbered finishes and exact odds column; don't assign a single family's \`1:N\` to a specific player.
- Multi-player autos have one card ID but multiple player search matches; ensure no duplicates or dropped subjects.
- Where a printed manufacturer error produces card-number collision, return both candidates with name and source.
- Store per-row provenance and validation date; annotate disputed interpretations rather than silently correcting evidence.
- If no public redistribution permission is known for a source photograph, complete rights review and use an authorized or owner-owned alternative.

### Definition of a completed addition
**“Done” requires** (a) source facts actually read and reconciled, (b) deployed page, (c) actual public browser/mobile smoke test, (d) search test for representative base + insert + autograph + special/parallel, (e) source links verified, (f) no existing-product regressions, and (g) this master updated with PASS/FAIL and dates.

## 26. Explicit pain points and operational “never again” rules
1. **Assistant said complete when it was partial.** Status must disclose the exact corpus read and whether anything remains uninspected.
2. **Raw Markdown was linked as if downloading.** Browser may *display* raw \`.md\`; use an HTML link with \`download\`, or a verified direct file attachment. Never claim that opening raw.githubusercontent automatically saves it.
3. **Code existence mistaken for deployed feature.** GitHub file, service worker and generated page are not enough: test public URL.
4. **User had to repeat requirements already stated.** Read context and project master before asking, preserve last-named constraints across follow-ups.
5. **Storage/repository explanations distracted from the product.** The Card Finder must work publicly; implementation location need not become a user chore.
6. **Too many overlapping guides, aliases, spreadsheets and drafts.** This Markdown is canonical decision log, not a claim that all other original files can be deleted.
7. **Source-only assertion presented as independent verification.** Trust manufacturer checklist and specific format odds; visibly mark secondhand stats and unknowns.
8. **Incorrect shopping link, shipping condition, MSRP or price.** Distinguish live-checked facts versus historical user notes; source quality matters.
9. **Long, repetitive failure explanations.** Report corrected outcome and remaining blockers briefly; prioritize actual working product.
10. **Card profile lacked exact findability.** Copyable exact text and direct checklist/odds record are basic collector affordances.
11. **Text-heavy advice while children open packs.** Favor a large clear base photo, card identity and visual pattern clues; keep research behind details.
12. **Unclear set vs format.** Keep checklists scoped to release and odds scoped to product format; names should never silently substitute.
13. **A printed serial was treated as automatic parallel label.** Require physical color/logo/photo and applicable manufacturer evidence.
14. **Prior purchase notes were mistaken for owned product.** Use distinct statuses; never publish a child's inventory without explicit decision and private design.
15. **New version claimed verified but still provisional.** Spreadsheet and checklist testing must be count-based with actual sources; preserve versions.
16. **Data from file name not contents.** Every source file read and metadata identified before reuse.
17. **Too many unsolicited tasks/notifications.** Do not create auto alerts or duplicate scouts to support a one-time tool discussion.
18. **Late corrections treated as new competing task.** Last explicit decision supersedes older proposal only in its named scope, with old context preserved.

## 27. Full decision and source trail — dated matrix
| Date | Evidence type | User-requested decision or observed direction | Current interpretation |
|---|---|---|---|
| May 17–29 2026 | retrieved conversation | Finn Topps/Chrome; Murphy Bowman/prospects; specialty example cards | Product/educational preference; not fixed inventory |
| Jun 10 2026 | retrieved conversation | For a specific All-Star congratulatory gift, simplify and avoid long-term buying complexity | **Scoped one-time gift**, not overall Card Finder change |
| Oct 16 2026 | user notes/word cloud | Found School of Topps Knocks, “Growing Word Cloud” | Same education track |
| Oct 21–23 2026 | organized raw notes | “Identify Topps Card,” LogoFractor pilot, then additional purchased-product lookups | Preserve pilot, expand product roster |
| Oct 22 2026 | master notes intake | Official sources, set hierarchy, rarity teaching, product research rules | Current evidence policy |
| Oct 23 2026 | original notes | Chrome Update Mega, Pulse and Panini high; Panini Halloween/A&G if easy | Historical prioritization; some implemented |
| Oct 23 2026 | official cheat sheet PDF | Three document types and four-stage pack check | Education backbone |
| Oct 24 2026 | current conversation | Every product base card visible on public website; missing Stadium Club urgent | Implemented in repo; public QA needed |
| Oct 29 2026 | recovery guide | One HQ; preserve existing folder and public Pack Room; private receipts excluded | Governance |
| Oct 30 2026 | Start Here guide | Six focused project chats and no destructive file migration | Latest project navigation |
| Oct 31 2026 | formal design spec | Private phone photo scan with honest uncertainty, source checks, accessibility | Design-only, not publicly shipped |
| Nov 3–13 2026 | available conversation | Hobby vs Mega, guaranteed autos, realistic chase, direct Topps MSRP, tracked releases | Adjacent buying standards |
| Nov 13–21 2026 | visible conversation | Official sell/education sheets for purchased sets; exact collector-profile visuals; Pro Debut 227-player data/IDs | Reference and current tool requirements |
| Nov 18 2026 | research prompt and conversation | Pro Debut player universe, source priority and new spreadsheet version, cards per subset | Must inspect latest version, not copy v4 |
| Nov 21–26 2026 | conversation | Better site reference images, 2025 Onyx and Pro Debut need finder | P0 backlog |
| Nov 26 2026 | current conversation | “Consolidate content across chats”; central hub all decisions, functions, feedback, sources | This document |
| Nov 26 2026 | current conversation | User requires download to laptop in actual Markdown format | Dedicated download route; verify browser behavior |
| Nov 26 2026 | current conversation | “Not complete” status rejected; wants comprehensive consolidation **now** | This expanded master; transparent review limits |

## 28. Open conflicts, unknowns and explicit resolution tests
| Question | Conflicting material | Safe disposition and exact verification needed |
|---|---|---|
| Is 2025 Stadium Club “missing”? | Earlier complaint vs current \`config.js\` and \`stadium25.json\` | **Not missing from code**; test live lookup and official checklist |
| Does “photo-first” mean uploaded photo scanning? | Flagship v2 promotional wording vs private photo-identifier specification | Distinguish base-reference visual vs actual uploaded-photo recognition; test actual UI |
| All nine product images fully trustworthy? | Some seller photos and mockups | Label mockups; source identity & rights review; real public image-load test |
| Are all 640 Stadium Club entries manufacturer-verified? | Independent JSON vs official PDF | Count/ID/section reconciliation |
| 2026 LogoFractor total cards and parallel types | 300 base, 495 total, 58 parallels historical pasted sources | Reconcile original manufacturer checklist/odds; subset-specific data |
| Chrome Update number collisions | Source notes about USC45, USC80, USC1, USC167 | Original Topps printed-number issue/current correction plus physical examples |
| Onyx Extended each signer has same parallel distribution? | Historical secondary summary claims | Confirm manufacturer tiers; sightings separated from official |
| What do Onyx unannounced ink entries mean? | Secondary listing anecdotes vs no published counts | Provenance-rated sightings; never invent print run |
| Is Pro Debut 227/200/27 verified in current workbook? | Expected historical count vs actual v8 and checklist not re-opened now | Read newest workbook and official PDF; recount |
| Who is current team/rank for Pro Debut player? | Card depicts former MiLB affiliate; current roster moves | MLB/MiLB/MLB Pipeline dated lookup, never infer from card |
| Whether user has already given/received/opened all named boxes | Research chats vs receipt vs delivery | Private ledger evidence, not public assumption |
| Can site legally redistribute every image? | Attribution alone vs actual rights | Rights review and use authorized/owner-owned visuals |
| Which site version passes QA? | commits on \`main\` vs GitHub Pages caching | Browser acceptance tests and timestamped result |
| Does download-page HTML force a download? | \`download\` attribute generally works for same-origin local path; browser/platform exceptions | Test in actual user's browser or link clear fallback; don't claim it is universally forced |
| Which “master” spreadsheet is canonical? | v4, v8, UPDATED/UPDATED2 and older 2016 copies | Read contents, reconcile provenance, select current per task; preserve versions |

## 29. Handoff instructions — mandatory for future work
At the start of a relevant new assistant/Codex/Work conversation:

> Read \`card-lookup/PROJECT_HUB.md\` in \`damienreilley/fantasy-baseball-2026\` **in full** before modifying the Card Finder. Preserve existing public behavior. Look at actual source code and original manufacturer checklist/odds for the named product. Distinguish user decisions, design proposals, existing code and live tested functionality. Build the requested item with exact search IDs, proper base image, visual variants, manufacturer source links and accessible layout. Never assert successful deployment without a public browser test. Update this central Markdown's decisions, QA results and next action with any substantive change. Private purchases and nephew details are out of public site scope.

### Required completion report (not filler)
- **Completed:** exact files/page and functions changed.
- **Verified:** actual links/results/QA and device or test environment.
- **Unresolved:** only material missing data/limitations; show whether blocked by source, code, public deployment or rights.
- **Next:** maximum three specific actions, and only when not already requested/executed.
- **Canonical change:** exact link or filename, commit/version date.

### Change log
| Revision | Date | Action |
|---|---|---|
| 1 | 2026-11-26 | Original Part I central 13-section working draft committed |
| 2 | 2026-11-26 | Expanded entire recoverable history, source register, formal photo spec, education question bank, product-specific requirements, six profile examples, governance, QA, conflicts, dates and download expectations into **this single Markdown file** |

**End of consolidated master.** No assistant should claim this file proves an exhaustive export of every chat or perfect verification of every source. It documents every specific, recoverable requirement represented in the evidence reviewed above, and explicitly names unverifiable cases so they are not silently invented.
