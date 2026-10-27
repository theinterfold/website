import type { ReactNode } from "react";
import type { SiteFooterProps } from "./types";
import { GhostSignupForm } from "./signup";

function StaticReveal({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

/** The main website's footer. Both applications consume this structure. */
export function SiteFooter({
  siteUrl = "",
  background = "#d9fce8",
  linkGroups,
  showUpdates = true,
  copyright = "All Rights Reserved © 2026",
  Reveal = StaticReveal,
}: SiteFooterProps) {
  const origin = siteUrl.replace(/\/$/, "");
  const groups = linkGroups ?? [
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: `${origin}/privacy` },
        { label: "Terms & Conditions", href: `${origin}/terms` },
      ],
    },
    {
      title: "Follow us",
      links: [
        { label: "Telegram", href: "https://t.me/enclave_e3" },
        { label: "Github", href: "https://github.com/theinterfold/interfold" },
        { label: "X", href: "https://x.com/theinterfold" },
      ],
    },
  ];

  return (
    <footer id="site-footer" className="site-footer" style={{ backgroundColor: background }}>
      <div className="site-footer-grid">
        <div className="site-footer-brand">
          <Reveal>
            <p className="site-footer-wordmark"><span>The</span><span>Interfold</span></p>
          </Reveal>
        </div>
        {groups.map((group, index) => (
          <div key={index} className={`${index === 0 ? "site-footer-legal" : "site-footer-social"} site-footer-group`}>
            <Reveal delay={0.1}><p className="site-footer-label">{group.title}</p></Reveal>
            <div className="site-footer-links">
              {group.links.map((link, linkIndex) => (
                <Reveal key={link.href} delay={(linkIndex + 2) / 10}>
                  <a href={link.href}>{link.label}</a>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
        {showUpdates && (
          <div className="interfold-footer-baseline-item interfold-footer-signup">
            <Reveal delay={0.5}><GhostSignupForm className="interfold-footer-signup-form" /></Reveal>
          </div>
        )}
        <div className="interfold-footer-baseline-item site-footer-copyright">
          <Reveal delay={0.7}><p className="site-footer-label">{copyright}</p></Reveal>
        </div>
      </div>
    </footer>
  );
}
