"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/context";
import { GALLERY_PHOTOS, GALLERY_VIDEOS } from "@/lib/gallery";

/** Photos/Videos tabs (same idea as the original gallery), a reveal grid,
 * and a small self-contained lightbox for the photos — arrow keys + Escape,
 * no library. */
export function GalleryGrid() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<"photos" | "videos">("photos");
  const [openAt, setOpenAt] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpenAt(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpenAt((i) => (i === null ? null : (i + delta + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length)),
    [],
  );

  // Focus management: a modal dialog needs focus moved inside it on open,
  // trapped there while open (so Tab can't escape to the page behind it),
  // and returned to whatever opened it on close — none of that is free with
  // a plain <div role="dialog">.
  useEffect(() => {
    if (openAt === null) return;
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Tab") {
        const focusable = Array.from(
          document.querySelectorAll<HTMLElement>(".gallery-lightbox button"),
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      openerRef.current?.focus();
    };
  }, [openAt, close, step]);

  return (
    <section className="section gallery-section">
      <div className="gallery-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "photos"}
          className="gallery-tab"
          onClick={() => setTab("photos")}
          suppressHydrationWarning
        >
          {t("gallery_tab_photos")}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "videos"}
          className="gallery-tab"
          onClick={() => setTab("videos")}
          suppressHydrationWarning
        >
          {t("gallery_tab_videos")}
        </button>
      </div>

      {tab === "photos" ? (
        <div className="gallery-grid">
          {GALLERY_PHOTOS.map((photo, i) => (
            <button
              type="button"
              className="gallery-item"
              data-reveal
              key={photo.src}
              onClick={(e) => {
                openerRef.current = e.currentTarget;
                setOpenAt(i);
              }}
              aria-label={photo.alt}
              suppressHydrationWarning
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 620px) 50vw, (max-width: 900px) 33vw, 25vw"
              />
            </button>
          ))}
        </div>
      ) : (
        <div className="gallery-videos-grid">
          {GALLERY_VIDEOS.map((video) => (
            <div className="gallery-video" data-reveal key={video.src}>
              <video src={video.src} controls preload="none" aria-label={video.label} />
            </div>
          ))}
        </div>
      )}

      {openAt !== null && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={GALLERY_PHOTOS[openAt].alt}
          onClick={close}
        >
          <button
            type="button"
            ref={closeBtnRef}
            className="gallery-lightbox-close"
            onClick={close}
            aria-label="Close"
          >
            ×
          </button>
          <button
            type="button"
            className="gallery-lightbox-nav gallery-lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <img
            src={GALLERY_PHOTOS[openAt].src}
            alt={GALLERY_PHOTOS[openAt].alt}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            className="gallery-lightbox-nav gallery-lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
