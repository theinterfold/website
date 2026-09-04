import { useEffect, useRef, useState } from "react";
import homeHero768Webp from "../../imports/Desktop/the-interfold-home-hero-768.webp";
import homeHero1440Webp from "../../imports/Desktop/the-interfold-home-hero-1440.webp";
import homeHero2160Webp from "../../imports/Desktop/the-interfold-home-hero-2160.webp";
import homeHero2912Webp from "../../imports/Desktop/the-interfold-home-hero-2912.webp";
import homeHero768Avif from "../../imports/Desktop/the-interfold-home-hero-768.avif";
import homeHero1440Avif from "../../imports/Desktop/the-interfold-home-hero-1440.avif";
import homeHero2160Avif from "../../imports/Desktop/the-interfold-home-hero-2160.avif";
import homeHero2912Avif from "../../imports/Desktop/the-interfold-home-hero-2912.avif";
import participateHero768Webp from "../../imports/Desktop/the-interfold-participate-hero-768.webp";
import participateHero1440Webp from "../../imports/Desktop/the-interfold-participate-hero-1440.webp";
import participateHero1672Webp from "../../imports/Desktop/the-interfold-participate-hero-1672.webp";
import participateHero768Avif from "../../imports/Desktop/the-interfold-participate-hero-768.avif";
import participateHero1440Avif from "../../imports/Desktop/the-interfold-participate-hero-1440.avif";
import participateHero1672Avif from "../../imports/Desktop/the-interfold-participate-hero-1672.avif";
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

// AVIF first, WebP behind it. The auction hero has shipped this pair since it
// was added; these two were the ones still on WebP alone, and the home hero is
// the heaviest thing the site loads -- 900kB at 2912w, and it is the LCP element
// on the page most people arrive at. Re-encoded at crf 23, which lands between
// 29% and 39% smaller across the seven files at SSIM 0.995-0.997 against the
// WebP it replaces. Checked at 1:1 on the densest part of the point cloud, where
// smearing would show first: the dots keep their shape and their separation.
const homeHeroAvifSrcSet = `${homeHero768Avif} 768w, ${homeHero1440Avif} 1440w, ${homeHero2160Avif} 2160w, ${homeHero2912Avif} 2912w`;
const homeHeroWebpSrcSet = `${homeHero768Webp} 768w, ${homeHero1440Webp} 1440w, ${homeHero2160Webp} 2160w, ${homeHero2912Webp} 2912w`;

export const homeHeroSources: HeroImageSources = {
  src: homeHero1440Webp,
  srcSet: homeHeroWebpSrcSet,
  width: 2912,
  height: 1632,
  type: "image/webp",
  formats: [
    { srcSet: homeHeroAvifSrcSet, type: "image/avif" },
    { srcSet: homeHeroWebpSrcSet, type: "image/webp" },
  ],
  preload: {
    href: homeHero1440Avif,
    srcSet: homeHeroAvifSrcSet,
    type: "image/avif",
  },
};

const participateHeroAvifSrcSet = `${participateHero768Avif} 768w, ${participateHero1440Avif} 1440w, ${participateHero1672Avif} 1672w`;
const participateHeroWebpSrcSet = `${participateHero768Webp} 768w, ${participateHero1440Webp} 1440w, ${participateHero1672Webp} 1672w`;

export const participateHeroSources: HeroImageSources = {
  src: participateHero1440Webp,
  srcSet: participateHeroWebpSrcSet,
  width: 1672,
  height: 941,
  type: "image/webp",
  formats: [
    { srcSet: participateHeroAvifSrcSet, type: "image/avif" },
    { srcSet: participateHeroWebpSrcSet, type: "image/webp" },
  ],
  preload: {
    href: participateHero1440Avif,
    srcSet: participateHeroAvifSrcSet,
    type: "image/avif",
  },
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
