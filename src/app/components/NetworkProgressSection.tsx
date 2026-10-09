import { HoverArrowLink } from "./HoverArrowLink";
import { ScrollFadeIn } from "./ScrollFadeIn";
import { SectionLabel } from "./SectionLabel";
import "./NetworkProgressSection.css";

export function NetworkProgressSection() {
  return (
    <div className="network-progress">
      <section className="if-network" aria-labelledby="network-progress-title">
        <div className="if-content">
          <ScrollFadeIn>
            <header className="if-heading">
              <SectionLabel className="if-eyebrow">Now live</SectionLabel>
              <h2 id="network-progress-title">
                Network Alpha<br />on Ethereum mainnet.
              </h2>
              <p className="if-support">
                More operators join, more applications and E3s go live, and governance comes online from here.
              </p>
            </header>
          </ScrollFadeIn>

          <ScrollFadeIn className="if-timeline">
            <ol aria-label="Network development">
              <li>
                <span className="if-index">01</span>
                <h3>Internal<br /> devnet</h3>
              </li>
              <li>
                <span className="if-index">02</span>
                <h3>Public<br /> testnet</h3>
              </li>
              <li aria-current="step">
                <span className="if-index">03</span>
                <svg className="if-pending-link" aria-hidden="true" focusable="false">
                  <line className="if-link-horizontal" x1="0" y1=".5" x2="100%" y2=".5" />
                  <line className="if-link-vertical" x1=".5" y1="0" x2=".5" y2="100%" />
                </svg>
                <h3>Network<br /> Alpha</h3>
              </li>
              <li className="if-next" aria-label="Step 4, upcoming: Network formation continues">
                <span className="if-index">
                  04
                  <svg className="if-loading-outline" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
                    <rect x=".5" y=".5" width="31" height="31" />
                  </svg>
                </span>
                <h3>Network formation continues</h3>
              </li>
            </ol>
          </ScrollFadeIn>

          <ScrollFadeIn className="if-actions" delay={0.1}>
            <HoverArrowLink
              className="if-action"
              href="https://dashboard.theinterfold.com/"
              textClassName="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] leading-[1.075]"
            >
              Explore Network Alpha
            </HoverArrowLink>
            <HoverArrowLink
              className="if-action if-action-secondary"
              href="https://blog.theinterfold.com/network-alpha-mainnet/"
              textClassName="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] leading-[1.075]"
            >
              Read the launch post
            </HoverArrowLink>
          </ScrollFadeIn>
        </div>
      </section>
    </div>
  );
}
