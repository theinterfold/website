import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  DEFAULT_EXECUTION_FLOW_TIMING,
  ExecutionFlowTiming,
  getExecutionFlowTiming,
  onExecutionFlowTotal,
  replayExecutionFlow,
  setExecutionFlowTiming,
} from "./ExecutionFlowReveal";

// =============================================================================
// EXECUTION FLOW TUNER — REMOVE BEFORE THIS GOES LIVE
//
// A panel for dialling in the execution-model drawing: pen speed, how far one
// route overlaps the next, and the easing curve. Every change replays the
// drawing so it can be judged at once. Values survive a reload.
//
// Flip SHOW_EXECUTION_FLOW_TUNER to false to hide it, or delete this file plus
// the two lines that reference it in ExecutionFlowReveal. Nothing else depends
// on it, and the numbers it prints are the ones to paste into
// DEFAULT_EXECUTION_FLOW_TIMING once they are settled.
// =============================================================================
export const SHOW_EXECUTION_FLOW_TUNER = true; // flip to false to hide the panel

const STORE_KEY = "interfold-execution-flow-timing";

type Curve = [number, number, number, number];

const PRESETS: Array<{ curve: Curve; name: string }> = [
  { curve: [0, 0, 1, 1], name: "linear" },
  { curve: [0.45, 0.05, 0.3, 1], name: "atual" },
  { curve: [0.65, 0, 0.35, 1], name: "in-out" },
  { curve: [0.22, 1, 0.36, 1], name: "site" },
  { curve: [0.34, 0, 0.2, 1], name: "solto" },
];

function toCurve(easing: string): Curve {
  const numbers = easing.match(/-?\d*\.?\d+/g);
  if (!numbers || numbers.length < 4) {
    return [0.45, 0.05, 0.3, 1];
  }
  return [Number(numbers[0]), Number(numbers[1]), Number(numbers[2]), Number(numbers[3])] as Curve;
}

function toEasing(curve: Curve) {
  return `cubic-bezier(${curve.map((n) => Number(n.toFixed(2))).join(", ")})`;
}

function read(): ExecutionFlowTiming {
  try {
    const saved = window.localStorage.getItem(STORE_KEY);
    if (saved) {
      return { ...DEFAULT_EXECUTION_FLOW_TIMING, ...(JSON.parse(saved) as Partial<ExecutionFlowTiming>) };
    }
  } catch {
    // A blocked or corrupt store is not worth failing the page over.
  }
  return { ...DEFAULT_EXECUTION_FLOW_TIMING };
}

/** The bezier drawn out, so the curve can be read rather than guessed at. */
function CurvePreview({ curve }: { curve: Curve }) {
  const [x1, y1, x2, y2] = curve;
  return (
    <svg className="shrink-0" height="64" viewBox="0 0 100 100" width="64">
      <rect fill="rgba(255,255,255,0.06)" height="100" width="100" x="0" y="0" />
      <path d="M0 100 L100 0" stroke="rgba(255,255,255,0.18)" strokeDasharray="3 3" strokeWidth="1" />
      <path
        d={`M0 100 C ${x1 * 100} ${100 - y1 * 100}, ${x2 * 100} ${100 - y2 * 100}, 100 0`}
        fill="none"
        stroke="#82f5ad"
        strokeWidth="2.5"
      />
    </svg>
  );
}

function Slider({
  label,
  max,
  min,
  onChange,
  step,
  value,
}: {
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step: number;
  value: number;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="flex items-center justify-between text-[10px] uppercase tracking-[0.08em] text-white/55">
        {label}
        <span className="text-[11px] normal-case tracking-normal text-[#82f5ad]">{value.toFixed(2)}</span>
      </span>
      <input
        className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-[#82f5ad]"
        max={max}
        min={min}
        onChange={(event) => onChange(Number(event.target.value))}
        step={step}
        type="range"
        value={value}
      />
    </label>
  );
}

export function ExecutionFlowTuner() {
  const [timing, setTiming] = useState<ExecutionFlowTiming>(() => getExecutionFlowTiming());
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  // Load once, before anything is drawn, so a reload keeps the last settings.
  useEffect(() => {
    const saved = read();
    setExecutionFlowTiming(saved);
    setTiming(saved);
  }, []);

  useEffect(() => onExecutionFlowTotal(setTotal), []);

  const apply = (next: Partial<ExecutionFlowTiming>) => {
    const merged = { ...timing, ...next };
    setTiming(merged);
    setExecutionFlowTiming(merged);
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(merged));
    } catch {
      // Not worth failing over.
    }
    replayExecutionFlow();
  };

  const curve = toCurve(timing.easing);
  const setCurve = (index: number, value: number) => {
    const next = [...curve] as Curve;
    next[index] = value;
    apply({ easing: toEasing(next) });
  };

  const snippet = `penSpeed: ${timing.penSpeed}, routeOverlap: ${timing.routeOverlap}, easing: "${timing.easing}"`;

  return createPortal(
    <div className="pointer-events-auto fixed bottom-4 right-4 z-[9999] font-['Office_Code_Pro:Medium',monospace] text-white">
      {isOpen ? (
        <div className="w-[264px] rounded-[10px] border border-white/15 bg-[#12181a]/95 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.12em] text-white/55">Execution flow</span>
            <button className="text-[14px] leading-none text-white/45 hover:text-white" onClick={() => setIsOpen(false)} type="button">
              &times;
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <Slider
              label="Velocidade (un/ms)"
              max={4}
              min={0.4}
              onChange={(penSpeed) => apply({ penSpeed })}
              step={0.05}
              value={timing.penSpeed}
            />
            <Slider
              label="Sobreposicao"
              max={1}
              min={0.1}
              onChange={(routeOverlap) => apply({ routeOverlap })}
              step={0.01}
              value={timing.routeOverlap}
            />

            <div className="mt-1 flex items-start gap-3">
              <CurvePreview curve={curve} />
              <div className="flex w-full flex-col gap-1.5">
                {(["x1", "y1", "x2", "y2"] as const).map((name, index) => (
                  <Slider
                    key={name}
                    label={name}
                    max={index % 2 === 0 ? 1 : 1.6}
                    min={index % 2 === 0 ? 0 : -0.6}
                    onChange={(value) => setCurve(index, value)}
                    step={0.01}
                    value={curve[index]}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {PRESETS.map((preset) => (
                <button
                  className="rounded-[4px] border border-white/15 px-2 py-1 text-[10px] text-white/70 transition-colors hover:border-[#82f5ad] hover:text-[#82f5ad]"
                  key={preset.name}
                  onClick={() => apply({ easing: toEasing(preset.curve) })}
                  type="button"
                >
                  {preset.name}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px] text-white/45">
              <span>total</span>
              <span className="text-[#82f5ad]">{Math.round(total)}ms</span>
            </div>

            <div className="flex gap-1">
              <button
                className="flex-1 rounded-[4px] bg-[#82f5ad] px-2 py-1.5 text-[11px] text-[#12181a] transition-opacity hover:opacity-80"
                onClick={() => replayExecutionFlow()}
                type="button"
              >
                Replay
              </button>
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
                onClick={() => apply({ ...DEFAULT_EXECUTION_FLOW_TIMING })}
                type="button"
              >
                reset
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          className="rounded-full border border-white/15 bg-[#12181a]/95 px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-white/70 shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:text-[#82f5ad]"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          Tuner
        </button>
      )}
    </div>,
    document.body,
  );
}
