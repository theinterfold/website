// The site's four routes, in one place.
//
// ResponsiveLayout.tsx decides which component renders for a path; this file
// decides what the document says about that path before React exists. They are
// two lists that have to agree, and this is the one a build can read.
//
// Add a route in ResponsiveLayout and it will render, but it will ship with the
// homepage's title, the homepage's description and a canonical pointing at the
// homepage — which tells Google it is a duplicate. Add it here too.

export const SITE = {
  origin: "https://www.theinterfold.com",
  name: "The Interfold",
  // Carried over from the head as-is. "multiplayer privacy" appears exactly
  // once in the site's own copy (the auction page) while "confidential
  // coordination" appears thirteen times, so the two are worth reconciling —
  // but that is a positioning call, not a build-script one.
  description:
    "Infrastructure for multiplayer privacy, enabling independent parties to coordinate without revealing their inputs.",
  image: "https://www.theinterfold.com/interfold-banner.jpg",
  imageWidth: 1200,
  imageHeight: 630,
  twitter: "@theinterfold",
};

export const ROUTES = [
  // / and /participate used to carry the same title as each other and the same
  // description, so a search result listed them twice with identical text and
  // nothing to tell them apart. The two auction pages had always had their own;
  // these two now do too.
  //
  // The homepage description is untouched -- whether "multiplayer privacy" or
  // "confidential coordination" is the phrase to lead with is a separate
  // question, and it is still open.
  {
    path: "/",
    // Brand alone is the weakest thing a homepage title can be. This one spent
    // it on a name nobody searches for unless they already know the answer.
    title: "The Interfold \u00b7 Infrastructure for Confidential Coordination",
    description: SITE.description,
  },
  {
    path: "/participate",
    // "Participate \u00b7 The Interfold" would have spent half the title
    // repeating a name the result already shows in the URL above it. The page
    // offers three concrete things; the title says which. One possibility, not
    // a settled wording -- Marvin has it.
    title: "Participate \u00b7 Run a Ciphernode, Build, or Partner",
    // The three paths, in the page's own order and its own words.
    description:
      "Three ways into the network: run a ciphernode, build applications on private inputs and verifiable outcomes, or bring a live use case to Interfold.",
  },
  {
    // TEMPORARY, and unlinked on purpose. The title and description are the
    // ones the blog page already carries; nothing here is new copy.
    path: "/how-it-works",
    title: "How Interfold Works \u00b7 The Interfold",
    description:
      "E3s, ciphernodes, and the five-phase flow that moves private inputs into shared, verifiable outcomes without concentrating execution authority in one place.",
  },
  {
    path: "/fold-auction",
    // Verbatim from the useEffect this replaced in FoldAuctionPage.tsx. Note
    // that the hero above it now reads "$FOLD Auctions are closed", plural and
    // covering both, while this title still names Auction 2 — worth deciding,
    // but not worth deciding silently inside a build script.
    title: "FOLD Auction 2 \u00b7 The Interfold",
    description:
      "The $FOLD auctions are closed. FOLD was distributed through a Continuous Clearing Auction on Uniswap, and successful bidders can now claim. Use official links only.",
  },
  {
    path: "/auction/legal",
    // Verbatim from the useEffect this replaced in AuctionLegalPage.tsx.
    title: "FOLD Auction Legal \u00b7 The Interfold",
    description:
      "Important information and terms governing participation in the FOLD auction.",
  },
];
