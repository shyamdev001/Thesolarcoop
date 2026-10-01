"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/i18n/context";
import type { TranslationKey } from "@/lib/i18n/translations";
import { SectionHead } from "@/components/ui/SectionHead";
import { useMarqueeDrag } from "@/components/motion/useMarqueeDrag";
import { HOME_REVIEWS } from "@/lib/content";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

/** First + last initial from a real name — no invented avatars, just a mark. */
function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

type ReviewCardData = { name: string; meta: TranslationKey; p: TranslationKey };

function ReviewCard({ review, t, className = "" }: { review: ReviewCardData; t: (k: TranslationKey) => string, className?: string }) {
  return (
    <article className={`marquee-card ${className}`}>
      <span className="marquee-card-quote" aria-hidden="true">
        &ldquo;
      </span>
      <p>{t(review.p)}</p>
      <footer className="marquee-card-who">
        <span className="review-avatar" aria-hidden="true">
          {initials(review.name)}
        </span>
        <span className="review-who">
          <span className="review-name">{review.name}</span>
          <span className="review-meta">{t(review.meta)}</span>
        </span>
      </footer>
    </article>
  );
}

function AnimatedStat({ value }: { value: string }) {
  const reduce = useReducedMotion();
  const spanRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (reduce || !spanRef.current) return;
    
    // Check if the value contains a number we can animate
    const numMatch = value.match(/(\d+)/);
    if (!numMatch) return;
    
    const num = parseInt(numMatch[1], 10);
    const prefix = value.substring(0, numMatch.index);
    const suffix = value.substring(numMatch.index! + numMatch[1].length);
    
    const obj = { val: 0 };
    
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: spanRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: num,
            duration: 1.2,
            ease: "power2.out",
            onUpdate: () => {
              if (spanRef.current) {
                spanRef.current.innerText = prefix + Math.floor(obj.val) + suffix;
              }
            }
          });
        }
      });
    }, spanRef);
    
    return () => ctx.revert();
  }, [value, reduce]);

  return <span ref={spanRef}>{value}</span>;
}

export function Reviews() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  
  useMarqueeDrag(trackRef);

  const ROW: ReviewCardData[] = HOME_REVIEWS;

  useEffect(() => {
    if (reduce || !sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      const statCard = sectionRef.current?.querySelector(".review-score");
      const marqueeCards = sectionRef.current?.querySelectorAll(".marquee-card-anim");
      
      if (!statCard || !marqueeCards || marqueeCards.length === 0) return;
      
      gsap.set(statCard, { opacity: 0, y: 20 });
      gsap.set(marqueeCards, { opacity: 0, y: 20 });
      
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          
          // Allow SectionHead a moment to start
          tl.to(statCard, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
          }, "+=0.2");
          
          tl.to(marqueeCards, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
          }, "-=0.3");
        }
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section className="section reviews" ref={sectionRef}>
      <SectionHead
        align="left"
        eyebrow={t("reviews_eyebrow")}
        title={t("reviews_h2")}
      />

      <div className="review-score">
        <span className="review-score-num">
          <AnimatedStat value={t("review_score_num")} />
        </span>
        <span className="review-score-label">{t("review_score_label")}</span>
        <span className="review-score-count">{t("review_score_count")}</span>
      </div>

      <div className="marquee-wrap">
        <div className="marquee-row">
          <div className="marquee-track" ref={trackRef}>
            <div className="marquee-set">
              {ROW.map((review, i) => (
                <ReviewCard review={review} t={t} key={`${review.name}-${i}`} className="marquee-card-anim" />
              ))}
            </div>
            <div className="marquee-set" aria-hidden="true">
              {ROW.map((review, i) => (
                <ReviewCard review={review} t={t} key={`dup-${review.name}-${i}`} className="marquee-card-anim" />
              ))}
            </div>
          </div>
        </div>
        <span className="marquee-fade marquee-fade-l" aria-hidden="true" />
        <span className="marquee-fade marquee-fade-r" aria-hidden="true" />
      </div>
    </section>
  );
}
