
  import { createRoot, hydrateRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import { auctionHeroSources, homeHeroSources, participateHeroSources, preloadHeroImage } from "./app/components/HeroImage.tsx";
  import "./styles/index.css";

  const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
  const hero = path === "" ? homeHeroSources : path === "participate" ? participateHeroSources : path === "fold-auction" ? auctionHeroSources : null;
  if (hero) preloadHeroImage(hero);

  const root = document.getElementById("root")!;
  if (root.hasAttribute("data-prerendered")) {
    hydrateRoot(root, <App initialPath={root.dataset.route} />);
  } else {
    createRoot(root).render(<App />);
  }
  
