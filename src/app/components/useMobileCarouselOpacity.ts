import { useEffect, useRef } from "react";

const DIMMED_SLIDE_OPACITY = 0.64;
const FULL_OPACITY_CENTER_RADIUS = 0.5;
const TRACKING_WINDOW_MS = 650;

export function useMobileCarouselOpacity() {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    const list = carousel?.querySelector<HTMLElement>(".slick-list");
    const track = carousel?.querySelector<HTMLElement>(".slick-track");

    if (!carousel || !list || !track) {
      return undefined;
    }

    let animationFrame = 0;
    let trackingUntil = 0;

    const updateSlideOpacity = () => {
      const listRect = list.getBoundingClientRect();
      const listCenter = listRect.left + listRect.width / 2;

      carousel.querySelectorAll<HTMLElement>(".slick-slide").forEach((slide) => {
        const slideRect = slide.getBoundingClientRect();

        if (!slideRect.width) {
          return;
        }

        const slideCenter = slideRect.left + slideRect.width / 2;
        const centerDistance = Math.min(Math.abs(slideCenter - listCenter) / slideRect.width, 1);
        const fadeProgress = Math.max(
          0,
          (centerDistance - FULL_OPACITY_CENTER_RADIUS) / (1 - FULL_OPACITY_CENTER_RADIUS),
        );
        const opacity = 1 - fadeProgress * (1 - DIMMED_SLIDE_OPACITY);

        // Position already changes continuously during swipe; a second CSS
        // tween makes the card reaching center visibly lag behind.
        slide.style.transition = "none";
        slide.style.opacity = opacity.toFixed(3);
      });
    };

    const trackWhileMoving = (time: number) => {
      updateSlideOpacity();

      if (time < trackingUntil) {
        animationFrame = window.requestAnimationFrame(trackWhileMoving);
        return;
      }

      animationFrame = 0;
    };

    const followTrackMotion = () => {
      trackingUntil = window.performance.now() + TRACKING_WINDOW_MS;

      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(trackWhileMoving);
      }
    };

    const trackObserver = new MutationObserver(followTrackMotion);
    const resizeObserver = new ResizeObserver(followTrackMotion);

    trackObserver.observe(track, {
      attributeFilter: ["class", "style"],
      attributes: true,
    });
    resizeObserver.observe(list);
    resizeObserver.observe(track);

    list.addEventListener("pointerdown", followTrackMotion);
    list.addEventListener("pointermove", followTrackMotion);
    list.addEventListener("touchstart", followTrackMotion, { passive: true });
    list.addEventListener("touchmove", followTrackMotion, { passive: true });
    track.addEventListener("transitionrun", followTrackMotion);
    track.addEventListener("transitionend", followTrackMotion);

    followTrackMotion();

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      trackObserver.disconnect();
      resizeObserver.disconnect();
      list.removeEventListener("pointerdown", followTrackMotion);
      list.removeEventListener("pointermove", followTrackMotion);
      list.removeEventListener("touchstart", followTrackMotion);
      list.removeEventListener("touchmove", followTrackMotion);
      track.removeEventListener("transitionrun", followTrackMotion);
      track.removeEventListener("transitionend", followTrackMotion);
      carousel.querySelectorAll<HTMLElement>(".slick-slide").forEach((slide) => {
        slide.style.removeProperty("opacity");
        slide.style.removeProperty("transition");
      });
    };
  }, []);

  return carouselRef;
}
