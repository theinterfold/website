// The three ways into the network, shared by both homepages.
//
// Marvin: this section was repeating the hero's CTAs. It is now a compact
// version of the three participation paths from the Participate page —
// title, one line, one link — and a text link to the page itself.
//
// Desktop and mobile are separate trees, so this array was written out twice,
// word for word, from the day Figma Make generated the two files. Nothing had
// drifted, but only because every copy change was applied to both by hand. It
// lives here now so the next one cannot land on half the site.
export const participationPaths = [
  {
    body: "Operate infrastructure for confidential coordination.",
    cta: "Get started",
    href: "https://dashboard.theinterfold.com/#operator",
    title: "Run a ciphernode",
  },
  {
    body: "Build applications using private inputs and verifiable outcomes.",
    cta: "Explore docs",
    href: "https://docs.theinterfold.com/getting-started",
    title: "Build and integrate",
  },
  {
    body: "Bring a live use case to Interfold and deploy it in practice.",
    cta: "Reach out",
    href: "mailto:comms@gnosisguild.org",
    title: "Partner on a pilot",
  },
];
