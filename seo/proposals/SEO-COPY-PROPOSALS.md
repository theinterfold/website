# SEO: seven copy decisions

Two halves. The first is work that changes no words on the site and is going
ahead — it's listed here so you know what's happening, not because it needs your
sign-off. The second is seven places where words would have to change. Those are
yours.

---

## The words used below

**Crawler** — the automated readers that visit our site. Google's, but also the
ones behind ChatGPT, Claude and Perplexity. They are how both search results and
AI answers get written.

**Title and description** — the two lines that appear when our site shows up in
a Google result, or when someone pastes a link into Slack or X. They live in the
page's code, not on the page, so nobody browsing the site ever sees them.

**Canonical** — a line in a page's code naming its real address. Without it, a
search engine that reaches the same content by several routes treats them as
several near-identical pages and splits their standing between them instead of
adding it up.

**Sitemap** — a list of our addresses, written for crawlers, so they don't have
to discover pages by following links and hoping.

**robots.txt** — the file where a site tells crawlers what they may and may not
read. Every site is expected to have one at a fixed address.

**Structured data** — a block of machine-readable facts in the page's code: our
name, our former name, our official links. Invisible to a reader, and the most
reliable way to tell a search engine or a model who we are.

**Server-rendered vs. browser-rendered** — our docs and blog arrive as finished
pages. Our marketing site arrives as an empty shell that assembles itself in the
visitor's browser. Google can wait for that; the crawlers behind ChatGPT, Claude
and Perplexity cannot, and to them every page on `www` currently looks blank.

---

## Already done — no words changed

Verified against a build of the previous version: identical page heights,
heading positions and sizes on desktop and mobile. Nothing moved on screen.

- **robots.txt and sitemap.xml now exist.** Both addresses already answered
  "200 OK" — and returned the homepage's HTML. A crawler asking for our crawl
  rules got a web page.
- **Every page has its own canonical.** All four routes were served the same
  file, so the site had no way to say which address was which.
- **Real 404s.** Any invented address — `theinterfold.com/anything` — answered
  "200 OK" with the homepage. We looked to a crawler like a site with an
  infinite number of pages, all identical.
- **Structured data**, including our former name. See decision 1.
- **Each page carries its own title and description**, which is the machinery
  decision 2 needs. Right now they all still carry the old ones.
- **Page structure**: the homepage had no `main` region and the legal page's
  headings started at level two, so both read to a machine as fragments rather
  than documents.

---

## "Doesn't the docs site already cover this?"

Fair question, and for **facts**, largely yes. Ask an AI how the protocol works
and it will find and cite the docs — they arrive as finished pages, they are
detailed, they are accurate. Nothing there is lost. A technical search should
land on the docs; that is the right page.

For everything else, no, and for three separate reasons.

**Different reader.** The docs answer *how do I build with this*. Nobody deciding
whether to care reads a developer reference. An investor, a partner, a
journalist, someone weighing up running a node — they search differently, and
sending them to the docs is a poor outcome even when it ranks.

**Separate property.** Search engines treat `docs.theinterfold.com` and
`www.theinterfold.com` as different sites. Standing the docs earn does not lift
the homepage.

**The missing layer isn't on the docs either.** People link to and quote
`theinterfold.com`, not a docs page. And the thing that isn't written anywhere —
why this exists, who is behind it, that it was Enclave — is exactly what the
main site is for.

---

## Now the seven

Each says what we'd write, why it helps, and what we lose if you say no. They
stand alone — yes to some and no to others is a good answer.

---

### 1. Say somewhere that Enclave is now The Interfold

One line, in the footer is enough: `The Interfold was previously Enclave.`

The docs already say this. The site never does. Every AI model trained before the
rename knows this project as Enclave and has no way to connect the two names —
ask one what The Interfold is and it doesn't know. Every article, talk and
citation published as Enclave is credibility the new name can't inherit without
this.

*If no:* the structured data already carries the old name, so machines can make
the link. A person reading the page still can't.

---

### 2. Give the homepage and /participate their own title and description

Today both show the same title and the same sentence, so in a Google result they
are two entries with identical text. The two auction pages already have their own.

| page | proposed title |
|---|---|
| homepage | `The Interfold · Infrastructure for Confidential Coordination` |
| /participate | `Participate · The Interfold`, plus a sentence about the three paths |

A homepage title is the single strongest thing a search engine reads. Ours
currently spends it on a name nobody searches for unless they already know the
answer.

*If no:* the canonical work above already stopped the site from declaring these
pages copies of each other. The titles just stay identical.

---

### 3. "Multiplayer privacy" or "confidential coordination"?

A question, not a proposal.

The sentence that introduces us to every search engine says *multiplayer
privacy*. That phrase appears **once** in all of our copy, on the auction page.
*Confidential coordination* appears **thirteen times** and is what the homepage,
the participate page and the docs all say.

Either works. Both at once doesn't: a search engine deciding what we're about
weighs repetition heavily, and a model summarising us reaches for whatever it saw
most. Right now those are two different phrases. Worth choosing on purpose.

---

### 4. Name the technology somewhere on the site

FHE, zero-knowledge, MPC, E3 — **zero mentions** anywhere in the site's copy. The
docs describe the full stack. The front door names none of it.

Those are the words someone types when they need this and don't yet know we
exist. One sentence in the execution-model section would do it.

*If no:* the docs keep the information and crawlers can read them. It just isn't
on the page where a visitor decides whether to keep reading.

---

### 5. The auction page title still says "Auction 2"

The headline on that same page says `$FOLD Auctions are closed` — plural,
covering both, and deliberately so. The title never caught up. Left exactly as
it was.

---

### 6. llms.txt — written, not published

A plain-text file describing the protocol, written for the crawlers that feed AI
assistants. It matters here because of the rendering problem above: to those
crawlers our pages look blank, and a static text file is something they can
actually read.

It is roughly 380 words of new prose, drawn from the docs and our own copy. It
needs a read before it goes out, because it is written to be **quoted** — an
overstatement in it comes back as a misquotation in someone's AI answer.

Draft is at `seo/proposals/llms.txt`.

*Honest counterweight:* our docs and blog are already server-rendered and fully
readable by these crawlers. This is a summary and a map, not the only copy of
the information.

---

### 7. Answer the questions a stranger asks

This came up as a question — whether more FAQs would help. The recommendation
below is mine, so argue with me and not with whoever raised it.

Short answer: yes, but not because FAQs are good for SEO in the abstract. They
are not. It works here because of what is missing, not because of the format.

There are already fourteen FAQ entries on the docs — nine on the auction, five
on the token. Every one of them is about FOLD. There is no answer anywhere to:

- What is The Interfold?
- Was this Enclave?
- Who builds it?
- Has it been audited?
- How is this different from using a TEE, or from plain multiparty computation?

Those are the questions a stranger asks, and they are exactly the questions an AI
assistant gets asked. A question is the shape of what someone types into a chat
box, which is why FAQ content retrieves so well.

**The format is not the point.** An FAQ is just the cheapest container for those
answers — it lets us say "was this Enclave? yes" and "what cryptography is this?"
without reopening the homepage's copy. Put the same answers in an About page or
in the homepage itself and they work exactly as well. What matters is that the
answers exist somewhere on the main site, in the words someone would actually
search for.

Which also makes this the cheapest route to decisions 1 and 4, if either of those
feels like too much to write into the homepage directly.

**Natural split:** questions about the *project* live on the main site; questions
about *building with it* stay on the docs.

**Two things not to expect.** Google restricted FAQ rich results to government
and health sites in 2023, so the expandable answers under a search result are not
available to us — the markup buys almost nothing now, though the content still
buys a lot. And a page nobody links to does not rank on its own: this works
because it answers questions that currently have no answer anywhere, not because
adding an FAQ page lifts a site by itself.
