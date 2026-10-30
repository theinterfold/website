import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { SiteDropdownPanelProps } from "./motion.types";

// Scaena/DialKit select: grow from 95%, travel 8px, critically damped spring.
const closed = { opacity: 0, y: -8, scale: .95 };
const opened = { opacity: 1, y: 0, scale: 1 };
const spring = { type: "spring" as const, visualDuration: .15, bounce: 0 };

export function SiteDropdownPanel({ open, panelRef, children, className = "", ...props }: SiteDropdownPanelProps) {
  const reducedMotion = useReducedMotion();
  const [settledClosed, setSettledClosed] = useState(!open);
  const currentOpen = useRef(open);
  currentOpen.current = open;

  useEffect(() => {
    if (open) setSettledClosed(false);
  }, [open]);

  return (
    <motion.div
      {...props}
      ref={panelRef}
      className={`site-header-dropdown-panel ${className}`}
      data-open={open}
      aria-hidden={!open}
      initial={false}
      animate={open ? opened : reducedMotion ? { ...opened, opacity: 0 } : closed}
      transition={reducedMotion ? { duration: 0 } : spring}
      style={{ visibility: open || !settledClosed ? "visible" : "hidden", pointerEvents: open ? "auto" : "none" }}
      onAnimationComplete={() => {
        if (!currentOpen.current) setSettledClosed(true);
      }}
    >
      {children}
    </motion.div>
  );
}
