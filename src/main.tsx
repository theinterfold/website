
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import { homeHeroSources, participateHeroSources, preloadHeroImage } from "./app/components/HeroImage.tsx";
  import "./styles/index.css";

  preloadHeroImage(window.location.pathname.replace(/^\/+|\/+$/g, "") === "participate" ? participateHeroSources : homeHeroSources);

  createRoot(document.getElementById("root")!).render(<App />);
  
