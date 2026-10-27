import { useEffect, useRef } from "react";

const GHOST_SIGNUP_SCRIPT =
  "https://cdn.jsdelivr.net/ghost/signup-form@~0.3/umd/signup-form.min.js";
const GHOST_SITE = "https://blog.theinterfold.com/";
const GHOST_FORM_BACKGROUND = "#f2fff7";
const GHOST_FORM_BUTTON = "#82f5ad";
const GHOST_FORM_BUTTON_TEXT = "#121718";
const GHOST_FORM_TEXT = "#3a5e3c";
const GHOST_FRAME_STYLE_ID = "interfold-ghost-signup-color-style";
// Retain the script's parent while an asynchronous download finishes, including
// Strict Mode cleanup and switching between the desktop and mobile footers.
let retainedEmbed: HTMLDivElement | undefined;
const mountedEmbeds = new WeakSet<HTMLDivElement>();
const GHOST_FRAME_COLOR_STYLES = `
  html,
  body {
    background: transparent !important;
  }

  form,
  .gh-signup-form,
  .gh-form,
  input,
  input[type="email"] {
    background: ${GHOST_FORM_BACKGROUND} !important;
    color: ${GHOST_FORM_TEXT} !important;
  }

  input::placeholder {
    color: #687d71 !important;
    opacity: 0.72 !important;
  }

  button,
  button[type="submit"] {
    background: ${GHOST_FORM_BUTTON} !important;
    color: ${GHOST_FORM_BUTTON_TEXT} !important;
  }
`;

export function GhostSignupForm({ className = "" }: { className?: string }) {
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = embedRef.current;

    if (!mount) {
      return;
    }

    // SSR briefly mounts desktop and mobile footers together. An active
    // form must stay with its owner when the unused layout unmounts.
    const embed = retainedEmbed && !mountedEmbeds.has(retainedEmbed)
      ? retainedEmbed
      : document.createElement("div");
    mountedEmbeds.add(embed);
    retainedEmbed = embed;
    mount.appendChild(embed);
    let active = true;
    let listeningFrame: HTMLIFrameElement | null = null;
    const animationFrames = new Set<number>();

    const styleGhostFrame = () => {
      if (!active) return;
      const iframe = embed.querySelector<HTMLIFrameElement>("iframe");

      if (!iframe) {
        return;
      }

      iframe.style.background = "transparent";
      iframe.style.border = "0";
      iframe.style.display = "block";
      iframe.style.minHeight = "58px";
      iframe.style.width = "100%";

      if (listeningFrame !== iframe) {
        listeningFrame?.removeEventListener("load", styleGhostFrame);
        listeningFrame = iframe;
        iframe.addEventListener("load", styleGhostFrame);
      }

      try {
        const frameDocument =
          iframe.contentDocument ?? iframe.contentWindow?.document;

        if (!frameDocument?.head) {
          return;
        }

        if (!frameDocument.getElementById(GHOST_FRAME_STYLE_ID)) {
          const style = frameDocument.createElement("style");
          style.id = GHOST_FRAME_STYLE_ID;
          style.textContent = GHOST_FRAME_COLOR_STYLES;
          frameDocument.head.appendChild(style);
        }
      } catch {
        // Keep the official embed usable if the iframe becomes inaccessible.
      }
    };

    const observer = new MutationObserver(styleGhostFrame);
    observer.observe(embed, { childList: true, subtree: true });

    if (!embed.querySelector("script")) {
      const script = document.createElement("script");
      script.async = true;
      script.src = GHOST_SIGNUP_SCRIPT;
      script.dataset.backgroundColor = GHOST_FORM_BACKGROUND;
      script.dataset.buttonColor = GHOST_FORM_BUTTON;
      script.dataset.buttonText = "Subscribe";
      script.dataset.buttonTextColor = GHOST_FORM_BUTTON_TEXT;
      script.dataset.placeholder = "Your email address";
      script.dataset.site = GHOST_SITE;
      script.dataset.textColor = GHOST_FORM_TEXT;
      script.dataset.locale = "en";

      embed.appendChild(script);
    }
    const scheduleRestyle = () => {
      if (!active) return;
      const frame = window.requestAnimationFrame(() => {
        animationFrames.delete(frame);
        styleGhostFrame();
      });
      animationFrames.add(frame);
    };
    const retryDelays = [0, 120, 400, 1000, 2000];
    const retryTimers = retryDelays.map((delay) =>
      window.setTimeout(styleGhostFrame, delay),
    );

    document.addEventListener("visibilitychange", scheduleRestyle);
    window.addEventListener("focus", scheduleRestyle);
    scheduleRestyle();

    return () => {
      active = false;
      retryTimers.forEach((timer) => window.clearTimeout(timer));
      animationFrames.forEach((frame) => window.cancelAnimationFrame(frame));
      document.removeEventListener("visibilitychange", scheduleRestyle);
      window.removeEventListener("focus", scheduleRestyle);
      listeningFrame?.removeEventListener("load", styleGhostFrame);
      observer.disconnect();
      mountedEmbeds.delete(embed);
      retainedEmbed = embed;
      if (embed.parentElement === mount) embed.remove();
    };
  }, []);

  return (
    <div className={`interfold-ghost-signup ${className}`}>
      <p className="site-footer-label interfold-ghost-signup__label">Updates</p>
      <div
        className="interfold-ghost-signup__embed"
        ref={embedRef}
        style={{ minHeight: 58, width: "100%" }}
      />
    </div>
  );
}
