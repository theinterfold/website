import { useEffect, useState } from "react";

// =============================================================================
// PREVIEW NOTES — REMOVE BEFORE THIS GOES LIVE
//
// Numbered pins rendered next to the parts of a page that are still open
// questions, or that changed in this round, so they can be read straight off
// the preview. Flip SHOW_PREVIEW_NOTES to false to hide every pin on every
// page at once.
//
// To remove them for good: delete this file, the notes object and
// <PreviewNotesOverlay /> in each page that uses it, and the data-preview-note
// attributes in the markup.
//
// The pins never touch the layout. They are drawn by a fixed overlay that
// measures [data-preview-note] anchors, and those anchors are bare data
// attributes on elements that already existed — they render nothing.
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
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
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
      {pins.map((pin) => {
        const isOpen = pin.id === openId;

        return (
          <button
            aria-expanded={isOpen}
            aria-label={`Preview note ${notes[pin.id].n}: ${notes[pin.id].title}`}
            className={`pointer-events-auto fixed flex size-[22px] cursor-pointer items-center justify-center rounded-full border-[1.5px] border-[#c2410c] font-['Office_Code_Pro:Medium',sans-serif] text-[11px] leading-none shadow-[0_2px_8px_rgba(0,0,0,0.25)] transition-colors ${
              isOpen ? "bg-[#c2410c] text-[#fff7ed]" : "bg-[#fff7ed] text-[#c2410c] hover:bg-[#fed7aa]"
            }`}
            key={pin.id}
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
            Note {note.n} · for Marvin
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
