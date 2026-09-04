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
  // Every string below already exists on the site today. Nothing here is new
  // copy: / and /participate carry exactly the title and description they ship
  // with now, and the two auction pages carry theirs verbatim from the
  // useEffects this replaced. The wiring is what changed, not the words.
  //
  // Which is also the limitation: / and /participate are still indistinguishable
  // from each other in a search result. Fixing that means writing four strings,
  // and those four strings are with Marvin. When they come back approved, this
  // file is the only one that needs editing.
  {
    path: "/",
    title: "The Interfold",
    description: SITE.description,
  },
  {
    path: "/participate",
    title: "The Interfold",
    description: SITE.description,
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
