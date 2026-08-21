import { useEffect, useState } from "react";

// =============================================================================
// PREVIEW NOTES — REMOVE BEFORE THIS GOES LIVE
//
// Two things at once, both only for reviewing:
//
//   1. Changed copy is highlighted in place. Hover a highlight to see what it
//      said before. Any element with data-preview-was gets this.
//   2. Numbered pins sit next to anything new or still open. Click a pin to
//      read the note. Any element with data-preview-note gets one.
//
// Flip SHOW_PREVIEW_NOTES to false to hide all of it at once.
//
// To remove for good: delete this file, the <PreviewNotes /> line in
// ResponsiveLayout, and every data-preview-note / data-preview-was attribute in
// the markup. Nothing else depends on it.
//
// The pins never touch the layout. They are drawn by a fixed overlay that
// measures the anchors, and the anchors are bare data attributes on elements
// that already existed — they render nothing.
// =============================================================================
export const SHOW_PREVIEW_NOTES = true; // TODO: set to false before deploying

export type PreviewNote = {
  n: number;
  title: string;
  body: readonly string[];
};

export type PreviewNotes = Readonly<Record<string, PreviewNote>>;

type Pin = { id: string; x: number; y: number };

// -----------------------------------------------------------------------------
// Changed-text highlighting.
//
// Put data-preview-was="the previous wording" on any element whose text changed.
// It gets highlighted, and hovering it shows what it used to say. The attribute
// renders nothing on its own, so as with the pins the markup is unaffected once
// SHOW_PREVIEW_NOTES is off.
// -----------------------------------------------------------------------------
const HIGHLIGHT_STYLE = `
[data-preview-was] {
  background-color: rgba(253, 186, 116, 0.38);
  box-shadow: 0 0 0 2px rgba(253, 186, 116, 0.38);
  border-radius: 2px;
  cursor: help;
}
[data-preview-was]:hover {
  background-color: rgba(251, 146, 60, 0.55);
  box-shadow: 0 0 0 2px rgba(251, 146, 60, 0.55);
}
`;

function ChangedTextHighlights() {
  const [hovered, setHovered] = useState<{ was: string; x: number; y: number } | null>(null);

  useEffect(() => {
    if (!SHOW_PREVIEW_NOTES) {
      return;
    }

    const style = document.createElement("style");
    style.textContent = HIGHLIGHT_STYLE;
    document.head.appendChild(style);

    const show = (event: Event) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-preview-was]");
      if (!target) {
        return;
      }
      const rect = target.getBoundingClientRect();
      setHovered({
        was: target.dataset.previewWas ?? "",
        x: rect.left + rect.width / 2,
        y: rect.bottom,
      });
    };
    const hide = (event: Event) => {
      const related = (event as MouseEvent).relatedTarget as HTMLElement | null;
      if (related?.closest?.("[data-preview-was]")) {
        return;
      }
      setHovered(null);
    };

    document.addEventListener("mouseover", show);
    document.addEventListener("mouseout", hide);
    window.addEventListener("scroll", () => setHovered(null), { passive: true });

    return () => {
      document.removeEventListener("mouseover", show);
      document.removeEventListener("mouseout", hide);
      style.remove();
    };
  }, []);

  if (!SHOW_PREVIEW_NOTES || !hovered) {
    return null;
  }

  const width = Math.min(420, window.innerWidth * 0.86);
  const left = Math.min(Math.max(hovered.x - width / 2, 12), window.innerWidth - width - 12);
  const top = Math.min(hovered.y + 8, window.innerHeight - 60);

  return (
    <div
      className="pointer-events-none fixed z-[90] rounded-[8px] border-2 border-[#c2410c] bg-[#fff7ed] px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
      style={{ left, top, width }}
    >
      <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[9px] uppercase leading-none tracking-[1.4px] text-[#c2410c]">
        Previously
      </p>
      <p className="mt-2 font-['Office_Code_Pro:Medium',sans-serif] text-[11px] leading-[1.5] text-[#7c2d12]">
        {hovered.was || "(not on the page before)"}
      </p>
    </div>
  );
}

export function PreviewNotesOverlay({ notes }: { notes: PreviewNotes }) {
  const [pins, setPins] = useState<Pin[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (!SHOW_PREVIEW_NOTES) {
      return;
    }

    let frame = 0;
    const measure = () => {
      frame = 0;
      const next: Pin[] = [];
      document.querySelectorAll<HTMLElement>("[data-preview-note]").forEach((anchor) => {
        const rect = anchor.getBoundingClientRect();
        // Skip anchors that are not being displayed: the mobile header exists in
        // the tree at desktop widths, so its copy of an anchor measures 0x0 and
        // would otherwise put a duplicate pin in the top-left corner.
        if (rect.width === 0 && rect.height === 0) {
          return;
        }
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          return;
        }
        (anchor.dataset.previewNote ?? "")
          .split(",")
          .map((key) => key.trim())
          .filter((key) => key in notes)
          .forEach((id, index) => {
            next.push({
              id,
              x: Math.min(rect.right + 12 + index * 28, window.innerWidth - 30),
              y: Math.min(Math.max(rect.top, 10), window.innerHeight - 30),
            });
          });
      });
      setPins(next);
    };

    const schedule = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(measure);
      }
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);

    // The homepage sets its own min-height, so the body never resizes as the hero
    // images land and the sections settle — the observer above stays silent while
    // every anchor moves. A few re-measures after mount cover that.
    const settleTimers = [250, 800, 2000].map((ms) => window.setTimeout(schedule, ms));

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule);
      observer.disconnect();
      settleTimers.forEach(window.clearTimeout);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [notes]);

  if (!SHOW_PREVIEW_NOTES) {
    return null;
  }

  const openPin = pins.find((pin) => pin.id === openId);
  const note = openId ? notes[openId] : null;
  const width = Math.min(380, window.innerWidth * 0.8);
  const left = openPin
    ? Math.min(Math.max(openPin.x - width / 2, 12), window.innerWidth - width - 12)
    : 0;

  return (
    <div className="pointer-events-none fixed inset-0 z-[80]">
      <ChangedTextHighlights />
      {pins.map((pin, index) => {
        const isOpen = pin.id === openId;

        return (
          <button
            aria-expanded={isOpen}
            aria-label={`Preview note ${notes[pin.id].n}: ${notes[pin.id].title}`}
            className={`pointer-events-auto fixed flex size-[22px] cursor-pointer items-center justify-center rounded-full border-[1.5px] border-[#c2410c] font-['Office_Code_Pro:Medium',sans-serif] text-[11px] leading-none shadow-[0_2px_8px_rgba(0,0,0,0.25)] transition-colors ${
              isOpen ? "bg-[#c2410c] text-[#fff7ed]" : "bg-[#fff7ed] text-[#c2410c] hover:bg-[#fed7aa]"
            }`}
            key={`${pin.id}-${index}`}
            onClick={() => setOpenId((current) => (current === pin.id ? null : pin.id))}
            style={{ left: pin.x, top: pin.y }}
            type="button"
          >
            {notes[pin.id].n}
          </button>
        );
      })}

      {note && openPin && (
        <div
          className="pointer-events-auto fixed max-h-[70vh] overflow-y-auto rounded-[8px] border-2 border-[#c2410c] bg-[#fff7ed] px-4 py-3 text-left shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
          style={{ left, top: Math.min(openPin.y + 30, window.innerHeight - 40), width }}
        >
          <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[9px] uppercase leading-none tracking-[1.4px] text-[#c2410c]">
            Note {note.n}
          </p>
          <p className="mt-2 font-['ABC_Gramercy:Regular',sans-serif] text-[16px] leading-[1.1] text-[#7c2d12]">
            {note.title}
          </p>
          {note.body.map((paragraph) => (
            <p
              className="mt-2 font-['Office_Code_Pro:Medium',sans-serif] text-[11px] leading-[1.5] text-[#7c2d12]"
              key={paragraph}
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// This round's notes. Numbered per page, in reading order.
// -----------------------------------------------------------------------------
const homeNotes: PreviewNotes = {
  strip: {
    n: 1,
    title: "The live strip moved into the header",
    body: [
      "It used to be a homepage section sitting under the hero. It is now part of the header, so it travels with the nav and shows on every page.",
      "Copy is Marvin's: LIVE NOW / ARAGON DEMO / NETWORK DASHBOARD became NETWORK ALPHA · LIVE ON MAINNET, with Governance and Network dashboard.",
      "Marvin wrote \u201cNot sure\u201d next to this one. It is a single commit, so it can be dropped without touching anything else.",
      "On a phone his wording is wider than the screen, so it wraps to two lines: status on top, both links underneath.",
    ],
  },
  nav: {
    n: 2,
    title: "Auction is gone from the nav",
    body: [
      "The auction page itself is still live and is still where people claim. It is reachable by direct link only.",
    ],
  },
  heroCtas: {
    n: 3,
    title: "Three CTAs, all relinked",
    body: [
      "Build on Interfold now points at docs /getting-started instead of the docs home.",
      "The old auction CTA became Participate.",
      "Run a ciphernode is new here, pointing at the dashboard operator tab. It replaced a Telegram link.",
      "Labels are no longer title-cased: it was rendering \u201cRun A Ciphernode\u201d.",
    ],
  },
  howItWorks: {
    n: 4,
    title: "New CTA",
    body: [
      "Marvin suggested this one as \u201cadd if useful\u201d. It was amber while it was under review; it is now styled like every other secondary button.",
    ],
  },
  footerGithub: {
    n: 5,
    title: "GitHub moved",
    body: [
      "Was gnosisguild/enclave, now theinterfold/interfold. Telegram and X are unchanged.",
    ],
  },
};

const participateNotes: PreviewNotes = {
  computeProviders: {
    n: 1,
    title: "New fourth role \u2014 borrowed drawing",
    body: [
      "Compute providers is Marvin's, and the copy is his.",
      "The drawing is the Requesters one, borrowed so the role could ship with the copy. Tiago is drawing the real one.",
      "The row also gained a one-line description under each role, and Requesters/Ciphernode committees were relabelled (\u201cSubmitting programs\u201d to \u201cInitiating E3s\u201d, \u201cCoordinating Execution\u201d to \u201cDKG + threshold decryption\u201d).",
    ],
  },
  howItWorksParticipate: {
    n: 2,
    title: "New CTA",
    body: ["Marvin asked for this under the roles row."],
  },
  foldSection: {
    n: 3,
    title: "New section \u2014 What You Can Do With FOLD",
    body: [
      "Whole section is new: bond, lock, transfer, two CTAs each.",
      "Two things to check with Marvin. His intro says \u201ctwo forms of network participation\u201d but there are three cards \u2014 transferring is not participation.",
      "And the View market link is a 64-character Dexscreener id rather than a normal address. Probably a Uniswap v4 pool, but worth clicking once.",
      "The Swap link uses the same token address as the auction page.",
    ],
  },
  continues: {
    n: 4,
    title: "New continuation marker",
    body: [
      "Marvin's \u201cNETWORK FORMATION CONTINUES\u201d after stage 03.",
      "Deliberately not a stage 04: no number, hollow square and dot, muted colour.",
      "The row went from three columns to four to hold it, so the dotted connectors were re-derived.",
    ],
  },
  alphaCtas: {
    n: 5,
    title: "Two new CTAs below this",
    body: [
      "Explore Network Alpha and Read the launch post, both from Marvin's notes.",
      "The old closing section at the bottom of the page is gone: its eyebrow and headline moved up to Help form the network, and its only button is now the Reach out button on card 03.",
    ],
  },
};

export function PreviewNotes({ routePath }: { routePath: string }) {
  // Only the two pages this round touched. The auction pages carry their own
  // changes on a different branch.
  const notes = routePath === "" ? homeNotes : routePath === "participate" ? participateNotes : null;

  if (!SHOW_PREVIEW_NOTES || !notes) {
    return null;
  }

  return <PreviewNotesOverlay notes={notes} />;
}
