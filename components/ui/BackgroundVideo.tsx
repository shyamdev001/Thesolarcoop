"use client";

import { useEffect, useRef, useState } from "react";

type BackgroundVideoProps = {
  src: string;
  poster: string;
  className?: string;
};

/**
 * Muted, looping background video. Autoplays, pauses when scrolled out of
 * view, and honours prefers-reduced-motion (the CSS hides <video> there and
 * shows a dark overlay instead). Ported from main.js.
 *
 * The <source> isn't attached until the element is within 600px of the
 * viewport. These clips run 7-9MB each, and three of them sit on the home
 * page alone (Hero, Numbers, Process) — the old `autoPlay` + an immediate
 * `.play()` call on mount made every one of them start downloading the
 * instant the page loaded, Hero's video included, whether a visitor ever
 * scrolled far enough to see the other two or not. Arming on intersection
 * instead means only the video(s) actually in view ever get fetched.
 */
export function BackgroundVideo({ src, poster, className }: BackgroundVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(([entry]) => entry.isIntersecting && setArmed(true), {
      rootMargin: "600px 0px",
    });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || !armed) return;

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
  }, [armed]);

  return (
    <video ref={ref} className={className} muted loop playsInline poster={poster} preload="none">
      {armed && <source src={src} type="video/mp4" />}
    </video>
  );
}
