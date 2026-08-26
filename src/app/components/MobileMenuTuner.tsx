import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

// =============================================================================
// MOBILE MENU TUNER — REMOVE BEFORE THIS GOES LIVE
//
// Three sliders for the mobile menu's titles: type size, leading, and the gap
// between them. Values survive a reload and the panel prints the Tailwind
// classes to paste back into SiteMobileHeader once they are settled.
//
// Flip SHOW_MOBILE_MENU_TUNER to false to hide it, or delete this file plus
// the three lines that reference it in SiteMobileHeader. With the flag off the
// hook never subscribes and never reads storage, so the menu renders on
// DEFAULT_MOBILE_MENU_TYPE for everyone.
// =============================================================================
export const SHOW_MOBILE_MENU_TUNER = false; // flip to true to tune in the browser

const STORE_KEY = "interfold-mobile-menu-type-v1";

export type MobileMenuType = {
  leading: number;
  size: number;
  spacing: number;
};

// The values as they stand in SiteMobileHeader: text-[56px], leading-[0.95],
// gap-y-2.
export const DEFAULT_MOBILE_MENU_TYPE: MobileMenuType = {
  leading: 0.95,
  size: 40,
  spacing: 14,
};

let current: MobileMenuType = { ...DEFAULT_MOBILE_MENU_TYPE };
const listeners = new Set<() => void>();

export function getMobileMenuType() {
  return current;
}

export function setMobileMenuType(next: Partial<MobileMenuType>) {
  current = { ...current, ...next };
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const NEVER_CHANGES = () => () => {};

export function useMobileMenuType(): MobileMenuType {
  return useSyncExternalStore(
    SHOW_MOBILE_MENU_TUNER ? subscribe : NEVER_CHANGES,
    getMobileMenuType,
    getMobileMenuType,
  );
}

function Slider({
  format,
  label,
  max,
  min,
  onChange,
  onDragStart,
  step,
  value,
}: {
  format: (value: number) => string;
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  onDragStart: () => void;
  step: number;
  value: number;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="flex items-center justify-between text-[10px] uppercase tracking-[0.08em] text-white/55">
        {label}
        <span className="text-[11px] normal-case tracking-normal text-[#82f5ad]">{format(value)}</span>
      </span>
      <input
        className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-[#82f5ad]"
        max={max}
        min={min}
        onChange={(event) => onChange(Number(event.target.value))}
        onPointerDown={onDragStart}
        step={step}
        type="range"
        value={value}
      />
    </label>
  );
}

export function MobileMenuTuner() {
  const type = useMobileMenuType();
  const [isOpen, setIsOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  // The panel has to sit over the menu on a phone-width viewport, and the one
  // moment you need to see what is underneath is while you are dragging. It
  // steps out of the way until you let go.
  const [isDragging, setIsDragging] = useState(false);
  // The menu itself only exists below xl — above it the sliders would move
  // nothing, which is worth saying rather than leaving someone to wonder.
  const [isNarrow, setIsNarrow] = useState(true);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORE_KEY);
    if (saved) {
      try {
        setMobileMenuType(JSON.parse(saved) as Partial<MobileMenuType>);
      } catch {
        window.localStorage.removeItem(STORE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (!isDragging) {
      return undefined;
    }
    const stop = () => setIsDragging(false);
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
    return () => {
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
  }, [isDragging]);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 1279px)");
    const read = () => setIsNarrow(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  const apply = (next: Partial<MobileMenuType>) => {
    setMobileMenuType(next);
    window.localStorage.setItem(STORE_KEY, JSON.stringify(getMobileMenuType()));
  };

  const snippet = `text-[${type.size}px] leading-[${type.leading}] / gap-y-[${type.spacing}px]`;

  return createPortal(
    <div className="pointer-events-auto fixed bottom-4 right-4 z-[9999] font-['Office_Code_Pro:Medium',monospace] text-white">
      {isOpen ? (
        <div
          className="w-[264px] max-w-[calc(100vw-32px)] rounded-[10px] border border-white/15 bg-[#12181a]/95 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur"
          style={{ opacity: isDragging ? 0.2 : 1, transition: "opacity 120ms ease" }}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.12em] text-white/55">Menu mobile</span>
            <button className="text-[14px] leading-none text-white/45 hover:text-white" onClick={() => setIsOpen(false)} type="button">
              &times;
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <Slider
              format={(value) => `${value}px`}
              label="Tamanho"
              max={88}
              min={24}
              onChange={(size) => apply({ size })}
              onDragStart={() => setIsDragging(true)}
              step={1}
              value={type.size}
            />
            <Slider
              format={(value) => value.toFixed(2)}
              label="Entrelinha"
              max={1.6}
              min={0.7}
              onChange={(leading) => apply({ leading })}
              onDragStart={() => setIsDragging(true)}
              step={0.01}
              value={type.leading}
            />
            <Slider
              format={(value) => `${value}px`}
              label="Espacamento"
              max={56}
              min={0}
              onChange={(spacing) => apply({ spacing })}
              onDragStart={() => setIsDragging(true)}
              step={1}
              value={type.spacing}
            />
            <p className="-mt-1 text-[9px] leading-[1.3] text-white/35">
              Entrelinha e um multiplo do tamanho. Espacamento e a distancia entre os cinco titulos.
            </p>

            {!isNarrow ? (
              <p className="rounded-[4px] border border-[#ff3d81]/40 bg-[#ff3d81]/10 p-2 text-[9px] leading-[1.3] text-[#ff3d81]">
                O menu so existe abaixo dos 1280px. Estreita a janela e abre o hamburger para veres isto a mexer.
              </p>
            ) : null}

            <div className="mt-1 flex items-center justify-between gap-2 border-t border-white/10 pt-3">
              <span className="text-[9px] leading-[1.3] text-white/35">{snippet}</span>
              <div className="flex shrink-0 gap-2">
                <button
                  className="rounded-[4px] border border-white/15 px-2 py-1.5 text-[11px] text-white/70 transition-colors hover:border-[#82f5ad] hover:text-[#82f5ad]"
                  onClick={() => {
                    navigator.clipboard?.writeText(snippet);
                    setCopied(true);
                    window.setTimeout(() => setCopied(false), 1200);
                  }}
                  type="button"
                >
                  {copied ? "copiado" : "copiar"}
                </button>
                <button
                  className="rounded-[4px] border border-white/15 px-2 py-1.5 text-[11px] text-white/70 transition-colors hover:border-[#82f5ad] hover:text-[#82f5ad]"
                  onClick={() => apply({ ...DEFAULT_MOBILE_MENU_TYPE })}
                  type="button"
                >
                  reset
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button
          className="rounded-full border border-white/15 bg-[#12181a]/95 px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-white/70 shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:text-[#82f5ad]"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          Menu
        </button>
      )}
    </div>,
    document.body,
  );
}
