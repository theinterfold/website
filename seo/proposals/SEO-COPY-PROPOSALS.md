# SEO: seven copy decisions

Work that changes no words is going ahead — listed below so you know, not to ask.
Then seven places where words would change. Those are yours.

---

## Words used below

- **Title and description** — the two lines in a Google result or a Slack preview. They live in the page's code, never on the page.
- **Canonical** — a line naming a page's real address, so several routes to one page aren't counted as several pages.
- **Sitemap** — a list of our addresses, written for crawlers.
- **robots.txt** — where a site tells crawlers what they may read.
- **Structured data** — machine-readable facts in the code: our name, our former name, our official links.
- **Server- vs browser-rendered** — the docs and blog arrive as finished pages. The main site assembles itself in the visitor's browser. Google waits for that; the crawlers behind ChatGPT, Claude and Perplexity don't, so our pages look blank to them.

---

## Already done — no words changed

Measured against a build of the previous version. Nothing moved on screen.

- `robots.txt` and `sitemap.xml` exist. Both addresses used to return the homepage instead.
- Every page has its own canonical. All four were served the same file.
- Real 404s. Any invented address used to answer "200 OK" with the homepage.
- Structured data, including our former name.
- Each page carries its own title and description — the machinery decision 2 needs.
- The homepage had no `main` region; the legal page's headings started at level two.

---

## "Doesn't the docs site already cover this?"

For **facts**, largely yes — the docs are detailed and fully readable by crawlers. Nothing there is lost. But:

- **Different reader.** The docs answer *how do I build with this*. Nobody deciding whether to care reads a developer reference.
- **Separate property.** Search engines treat `docs.theinterfold.com` and `www.theinterfold.com` as different sites. What the docs earn doesn't lift the homepage.
- **The missing layer isn't on the docs either.** Why this exists, who is behind it, that it was Enclave.

---

## The seven

They stand alone — yes to some and no to others is a good answer.

---

### 1. Say that Enclave is now The Interfold

**Now** — the docs say it. The site never does.
**Proposed** — one line, footer is enough: `The Interfold was previously Enclave.`
**Why** — every AI model trained before the rename knows us as Enclave and can't connect the two names. So can't every article and citation published under it.
**If no** — the structured data already makes the link for machines. A reader still can't.

---

### 2. Own titles for the homepage and /participate

**Now** — both say `The Interfold`, and share one description word for word:
> Infrastructure for multiplayer privacy, enabling independent parties to coordinate without revealing their inputs.

**Proposed**

| | today | proposed |
|---|---|---|
| homepage | `The Interfold` | `The Interfold · Infrastructure for Confidential Coordination` |
| /participate | `The Interfold` | `Participate · The Interfold` |

The description stays on the homepage; /participate gets its own sentence about the three paths.

**Why** — in a Google result they are two entries with identical text. A homepage title is the strongest thing a search engine reads, and ours spends it on a name nobody searches for unless they already know the answer.
**If no** — the canonical work already stopped them being read as copies of each other. The titles just stay identical.

---

### 3. "Multiplayer privacy" or "confidential coordination"?

A question, not a proposal.

**Now** — the sentence introducing us to every search engine says *multiplayer privacy*. That appears **once** in our copy. *Confidential coordination* appears **thirteen times**.
**Why it matters** — search engines and models both weigh repetition. Two phrases split it. Either works; both at once doesn't.

---

### 4. Name the technology somewhere

**Now** — FHE, zero-knowledge, MPC, E3: **zero mentions** on the site. The docs describe the full stack.
**Proposed** — one sentence in the execution-model section.
**Why** — those are the words someone types before they know we exist.
**If no** — the docs keep it. Just not where a visitor decides whether to keep reading.

---

### 5. The auction title still says "Auction 2"

The headline on that page says `$FOLD Auctions are closed` — plural, covering both, deliberately. The title never followed. Left as it was.

---

### 6. llms.txt — written, not published

**What** — a text file describing the protocol, for the crawlers that feed AI assistants. To them our pages look blank; a static file is something they can read.
**Needs** — a read, not a yes. Roughly 380 words of new prose, written to be **quoted**: an overstatement comes back as a misquotation in someone's AI answer.
**Counterweight** — the docs and blog are already readable by these crawlers. This is a map, not the only copy.

Draft at `seo/proposals/llms.txt`.

---

### 7. Answer the questions a stranger asks

The recommendation is mine, so argue with me — it came up as a question.

**Now** — fourteen FAQ entries on the docs, every one about FOLD. Nothing anywhere answers: *What is The Interfold? Was this Enclave? Who builds it? Has it been audited? How is this different from a TEE, or plain MPC?*
**Proposed** — those answers on the main site. FAQ page, About page, homepage — the container doesn't matter, the answers do. Cheapest route to decisions 1 and 4.
**Not** — FAQ markup no longer earns rich results (Google restricted them to government and health sites in 2023), and a page nobody links to won't rank on its own. This works because the questions have no answer today.
