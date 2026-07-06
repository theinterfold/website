import { useEffect, useRef, useState } from "react";
import homeHero768 from "../../imports/Desktop/the-interfold-home-hero-768.webp";
import homeHero1440 from "../../imports/Desktop/the-interfold-home-hero-1440.webp";
import homeHero2160 from "../../imports/Desktop/the-interfold-home-hero-2160.webp";
import homeHero2912 from "../../imports/Desktop/the-interfold-home-hero-2912.webp";
import participateHero768 from "../../imports/Desktop/the-interfold-participate-hero-768.webp";
import participateHero1440 from "../../imports/Desktop/the-interfold-participate-hero-1440.webp";
import participateHero1672 from "../../imports/Desktop/the-interfold-participate-hero-1672.webp";
import auctionHero768Avif from "../../imports/Desktop/the-interfold-auction-hero-768.avif";
import auctionHero1440Avif from "../../imports/Desktop/the-interfold-auction-hero-1440.avif";
import auctionHero1672Avif from "../../imports/Desktop/the-interfold-auction-hero-1672.avif";
import auctionHero768Webp from "../../imports/Desktop/the-interfold-auction-hero-768.webp";
import auctionHero1440Webp from "../../imports/Desktop/the-interfold-auction-hero-1440.webp";
import auctionHero1672Webp from "../../imports/Desktop/the-interfold-auction-hero-1672.webp";

type HeroImageFormat = {
  srcSet: string;
  type: string;
};

type HeroImagePreload = HeroImageFormat & {
  href: string;
};

type HeroImageSources = {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  type?: string;
  formats?: HeroImageFormat[];
  preload?: HeroImagePreload;
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

const auctionHeroAvifSrcSet = `${auctionHero768Avif} 768w, ${auctionHero1440Avif} 1440w, ${auctionHero1672Avif} 1672w`;
const auctionHeroWebpSrcSet = `${auctionHero768Webp} 768w, ${auctionHero1440Webp} 1440w, ${auctionHero1672Webp} 1672w`;

export const auctionHeroSources: HeroImageSources = {
  src: auctionHero1440Webp,
  srcSet: auctionHeroWebpSrcSet,
  width: 1672,
  height: 941,
  type: "image/webp",
  formats: [
    { srcSet: auctionHeroAvifSrcSet, type: "image/avif" },
    { srcSet: auctionHeroWebpSrcSet, type: "image/webp" },
  ],
  preload: {
    href: auctionHero1440Avif,
    srcSet: auctionHeroAvifSrcSet,
    type: "image/avif",
  },
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
  const preload = sources.preload ?? {
    href: sources.src,
    srcSet: sources.srcSet,
    type: sources.type ?? "image/webp",
  };

  link.href = preload.href;
  link.type = preload.type;
  link.setAttribute("data-interfold-hero-preload", sources.src);
  link.setAttribute("fetchpriority", "high");
  link.setAttribute("imagesrcset", preload.srcSet);
  link.setAttribute("imagesizes", "100vw");
  document.head.appendChild(link);
}

export function HeroImage({
  alt = "",
  className,
  fadeIn = true,
  pictureClassName = "contents",
  sources,
}: {
  alt?: string;
  className: string;
  fadeIn?: boolean;
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
      {sources.formats?.map((format) => (
        <source key={format.type} sizes="100vw" srcSet={format.srcSet} type={format.type} />
      )) ?? (
        <source sizes="100vw" srcSet={sources.srcSet} type={sources.type ?? "image/webp"} />
      )}
      <img
        alt={alt}
        className={`${className} ${fadeIn ? `transition-opacity duration-300 ease-out motion-reduce:transition-none ${isLoaded ? "opacity-100" : "opacity-0"}` : "opacity-100"}`}
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
