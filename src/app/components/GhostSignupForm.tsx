import { useEffect, useRef } from "react";

const GHOST_SIGNUP_SCRIPT = "https://cdn.jsdelivr.net/ghost/signup-form@~0.3/umd/signup-form.min.js";
const GHOST_SITE = "https://blog.theinterfold.com/";
const GHOST_FRAME_STYLE_ID = "interfold-ghost-signup-frame-style";
const GHOST_FRAME_STYLES = `
  html,
  body {
    background: transparent !important;
    color: #3a5e3c !important;
    font-family: "ABC_Gramercy", Georgia, serif !important;
    margin: 0 !important;
  }

  * {
    box-sizing: border-box !important;
    font-family: "ABC_Gramercy", Georgia, serif !important;
  }

  form,
  .gh-signup-form,
  .gh-form {
    align-items: flex-end !important;
    background: transparent !important;
    border: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    display: flex !important;
    gap: 8px !important;
    padding: 0 !important;
  }

  input,
  input[type="email"] {
    background: transparent !important;
    border: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    color: #3a5e3c !important;
    flex: 1 1 auto !important;
    font-size: 14.429px !important;
    height: auto !important;
    line-height: 1.3 !important;
    min-height: 29px !important;
    outline: 0 !important;
    padding: 0 0 8px !important;
  }

  input::placeholder {
    color: #3a5e3c !important;
    opacity: 1 !important;
  }

  button,
  button[type="submit"] {
    background: #3a5e3c !important;
    border: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    color: #d9fce8 !important;
    flex: 0 0 auto !important;
    font-size: 14.429px !important;
    height: auto !important;
    line-height: 1.075 !important;
    min-height: 29px !important;
    min-width: 96px !important;
    padding: 4px 12px !important;
    text-transform: capitalize !important;
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

      try {
        const frameDocument = iframe.contentDocument ?? iframe.contentWindow?.document;

        if (!frameDocument?.head) {
          return;
        }

        if (!frameDocument.getElementById(GHOST_FRAME_STYLE_ID)) {
          const style = frameDocument.createElement("style");
          style.id = GHOST_FRAME_STYLE_ID;
          style.textContent = GHOST_FRAME_STYLES;
          frameDocument.head.appendChild(style);
        }

        const input = frameDocument.querySelector<HTMLInputElement>("input[type='email'], input");
        const button = frameDocument.querySelector<HTMLButtonElement>("button[type='submit'], button");

        if (input) {
          input.placeholder = "Email";
        }

        if (button) {
          button.textContent = "Join";
        }
      } catch {
        // Ghost may lock down the iframe in some browsers; the official embed still handles signup.
      }
    };

    const observer = new MutationObserver(styleGhostFrame);
    observer.observe(embed, { childList: true, subtree: true });

    embed.innerHTML = "";

    const script = document.createElement("script");
    script.async = true;
    script.src = GHOST_SIGNUP_SCRIPT;
    script.dataset.backgroundColor = "#d9fce8";
    script.dataset.buttonColor = "#3a5e3c";
    script.dataset.buttonText = "Join";
    script.dataset.buttonTextColor = "#d9fce8";
    script.dataset.placeholder = "Email";
    script.dataset.site = GHOST_SITE;
    script.dataset.textColor = "#3a5e3c";
    script.dataset.locale = "en";

    embed.appendChild(script);
    window.requestAnimationFrame(styleGhostFrame);

    return () => {
      observer.disconnect();
      embed.innerHTML = "";
    };
  }, []);

  return (
    <div className={`interfold-ghost-signup relative -mx-3 px-3 py-2 transition-colors duration-300 focus-within:bg-[rgba(193,217,191,0.34)] hover:bg-[rgba(193,217,191,0.2)] ${className}`}>
      <p className="mb-3 font-['Office_Code_Pro:Medium',sans-serif] text-[14px] uppercase leading-[1.075] tracking-[1.4px] text-[#252525] whitespace-nowrap">
        Updates
      </p>
      <div
        className="interfold-ghost-signup__embed"
        ref={embedRef}
        style={{ minHeight: 58, maxWidth: 440, margin: "0 auto", width: "100%" }}
      />
    </div>
  );
}
