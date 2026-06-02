import { useEffect, useRef, useState } from "react";
import homeHero768 from "../../imports/Desktop/the-interfold-home-hero-768.webp";
import homeHero1440 from "../../imports/Desktop/the-interfold-home-hero-1440.webp";
import homeHero2160 from "../../imports/Desktop/the-interfold-home-hero-2160.webp";
import homeHero2912 from "../../imports/Desktop/the-interfold-home-hero-2912.webp";
import participateHero768 from "../../imports/Desktop/the-interfold-participate-hero-768.webp";
import participateHero1440 from "../../imports/Desktop/the-interfold-participate-hero-1440.webp";
import participateHero1672 from "../../imports/Desktop/the-interfold-participate-hero-1672.webp";

type HeroImageSources = {
  src: string;
  srcSet: string;
  width: number;
  height: number;
};

export const homeHeroSources: HeroImageSources = {
  src: homeHero1440,
  srcSet: `${homeHero768} 768w, ${homeHero1440} 1440w, ${homeHero2160} 2160w, ${homeHero2912} 2912w`,
  width: 2912,
  height: 1632,
};

export const participateHeroSources: HeroImageSources = {
  src: participateHero1440,
  srcSet: `${participateHero768} 768w, ${participateHero1440} 1440w, ${participateHero1672} 1672w`,
  width: 1672,
  height: 941,
};

export function preloadHeroImage(sources: HeroImageSources) {
  if (typeof document === "undefined") {
    return;
  }

  if (document.querySelector(`link[data-interfold-hero-preload="${sources.src}"]`)) {
    return;
  }

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = sources.src;
  link.type = "image/webp";
  link.setAttribute("data-interfold-hero-preload", sources.src);
  link.setAttribute("fetchpriority", "high");
  link.setAttribute("imagesrcset", sources.srcSet);
  link.setAttribute("imagesizes", "100vw");
  document.head.appendChild(link);
}

export function HeroImage({
  alt = "",
  className,
  pictureClassName = "contents",
  sources,
}: {
  alt?: string;
  className: string;
  pictureClassName?: string;
  sources: HeroImageSources;
}) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const image = imageRef.current;
    setIsLoaded(false);

    if (image?.complete && image.naturalWidth > 0) {
      requestAnimationFrame(() => setIsLoaded(true));
    }
  }, [sources.src]);

  return (
    <picture className={pictureClassName}>
      <source sizes="100vw" srcSet={sources.srcSet} type="image/webp" />
      <img
        alt={alt}
        className={`${className} transition-opacity duration-300 ease-out motion-reduce:transition-none ${isLoaded ? "opacity-100" : "opacity-0"}`}
        decoding="async"
        fetchPriority="high"
        height={sources.height}
        loading="eager"
        onLoad={(event) => {
          if (event.currentTarget.naturalWidth > 0) {
            setIsLoaded(true);
          }
        }}
        ref={imageRef}
        sizes="100vw"
        src={sources.src}
        srcSet={sources.srcSet}
        width={sources.width}
      />
    </picture>
  );
}
