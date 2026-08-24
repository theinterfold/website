import { useEffect, useRef } from "react";

const GHOST_SIGNUP_SCRIPT = "https://cdn.jsdelivr.net/ghost/signup-form@~0.3/umd/signup-form.min.js";
const GHOST_SITE = "https://blog.theinterfold.com/";
const GHOST_FORM_BACKGROUND = "#f2fff7";
const GHOST_FORM_BUTTON = "#82f5ad";
const GHOST_FORM_BUTTON_TEXT = "#121718";
const GHOST_FORM_TEXT = "#3a5e3c";
const GHOST_FRAME_STYLE_ID = "interfold-ghost-signup-color-style";
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
    const embed = embedRef.current;

    if (!embed) {
      return;
    }

    const styleGhostFrame = () => {
      const iframe = embed.querySelector<HTMLIFrameElement>("iframe");

      if (!iframe) {
        return;
      }

      iframe.style.background = "transparent";
      iframe.style.border = "0";
      iframe.style.display = "block";
      iframe.style.minHeight = "58px";
      iframe.style.width = "100%";

      if (iframe.dataset.interfoldSignupListener !== "true") {
        iframe.dataset.interfoldSignupListener = "true";
        iframe.addEventListener("load", styleGhostFrame);
      }

      try {
        const frameDocument = iframe.contentDocument ?? iframe.contentWindow?.document;

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

    embed.innerHTML = "";

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
    const restyleOnVisibility = () => {
      window.requestAnimationFrame(styleGhostFrame);
    };
    const restyleOnFocus = () => {
      window.requestAnimationFrame(styleGhostFrame);
    };
    const retryDelays = [0, 120, 400, 1000, 2000];
    const retryTimers = retryDelays.map((delay) => window.setTimeout(styleGhostFrame, delay));

    document.addEventListener("visibilitychange", restyleOnVisibility);
    window.addEventListener("focus", restyleOnFocus);
    window.requestAnimationFrame(styleGhostFrame);

    return () => {
      retryTimers.forEach((timer) => window.clearTimeout(timer));
      document.removeEventListener("visibilitychange", restyleOnVisibility);
      window.removeEventListener("focus", restyleOnFocus);
      observer.disconnect();
      embed.innerHTML = "";
    };
  }, []);

  return (
    <div className={`interfold-ghost-signup relative -mx-3 px-3 py-2 transition-colors duration-300 focus-within:bg-[rgba(193,217,191,0.34)] hover:bg-[rgba(193,217,191,0.2)] ${className}`}>
      <p className="mb-3 font-['Office_Code_Pro:Medium',sans-serif] text-[14px] uppercase leading-[1.075] tracking-[1.4px] text-[#3a5e3c] whitespace-nowrap">
        Updates
      </p>
      <div
        className="interfold-ghost-signup__embed md:mx-auto md:max-w-[440px]"
        ref={embedRef}
        style={{ minHeight: 58, width: "100%" }}
      />
    </div>
  );
}
