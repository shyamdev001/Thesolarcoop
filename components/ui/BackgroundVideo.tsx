"use client";

import { useEffect, useRef } from "react";

type BackgroundVideoProps = {
  src: string;
  poster: string;
  className?: string;
};

/**
 * Muted, looping background video. Autoplays, pauses when scrolled out of
 * view, and honours prefers-reduced-motion (the CSS hides <video> there and
 * shows a dark overlay instead). Ported from main.js.
 */
export function BackgroundVideo({ src, poster, className }: BackgroundVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      video.removeAttribute("autoplay");
      video.pause();
      return;
    }

    const play = () => {
      const p = video.play();
      if (p) p.catch(() => {});
    };
    play();

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
        else video.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(video);

    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
