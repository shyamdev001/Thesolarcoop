"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/context";
import type { TranslationKey } from "@/lib/i18n/translations";
import { Button } from "@/components/ui/Button";
import { MaskText } from "@/components/motion/MaskText";
import { Magnetic } from "@/components/motion/Magnetic";
import { trackUnderlineOrigin } from "@/lib/underlineOrigin";
import { MARKS, type MarkKind } from "@/components/ui/marks";
import { SOCIAL_LINKS } from "@/lib/site";
import { SOCIAL_ICONS } from "@/components/ui/socialIcons";

type Action = {
  href: string;
  /** Either a translation key or a literal label. */
  labelKey?: TranslationKey;
  label?: string;
};

type PageHeroProps = {
  crumbKey: TranslationKey;
  titleKey: TranslationKey;
  leadKey: TranslationKey;
  primary: Action;
  secondary: Action;
  photo?: { src: string; alt: string };
  /** A quiet per-page signature mark (see components/ui/marks.tsx). */
  mark?: MarkKind;
  /** Show the site's social links under the hero actions (Contact page only). */
  showSocial?: boolean;
};

/** Inner-page hero: breadcrumb, h1, lead, two actions, optional wide photo. */
export function PageHero({
  crumbKey,
  titleKey,
  leadKey,
  primary,
  secondary,
  photo,
  mark,
  showSocial,
}: PageHeroProps) {
  const { t } = useLanguage();
  const label = (a: Action) => (a.labelKey ? t(a.labelKey) : a.label);
  const Mark = mark ? MARKS[mark] : null;

  return (
    <section className="page-hero" data-has-photo={photo ? "" : undefined}>
      {Mark && !photo && (
        <span className="page-mark" aria-hidden="true">
          <Mark />
        </span>
      )}
      <div className="page-hero-text">
        <p className="breadcrumb" data-reveal>
          <Link href="/">{t("crumb_home")}</Link>{" "}
          <span aria-hidden="true">/</span> <span>{t(crumbKey)}</span>
        </p>
        <MaskText as="h1" trigger="load">
          {t(titleKey)}
        </MaskText>
        <p className="lead" data-reveal>
          {t(leadKey)}
        </p>
        <div className="page-hero-actions" data-reveal>
          <Magnetic strength={0.25}>
            <Button href={primary.href}>{label(primary)}</Button>
          </Magnetic>
          <a
            href={secondary.href}
            className="link-underline"
            onPointerEnter={trackUnderlineOrigin}
            onPointerLeave={trackUnderlineOrigin}
          >
            {label(secondary)}
          </a>
        </div>
        {showSocial && (
          <div className="page-hero-social" data-reveal>
            {SOCIAL_LINKS.map((social) => {
              const Icon = SOCIAL_ICONS[social.name];
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="page-hero-social-link"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        )}
      </div>

      {photo && (
        <div className="page-hero-photo" data-reveal>
          {Mark && (
            <span className="page-mark page-mark--photo" aria-hidden="true">
              <Mark />
            </span>
          )}
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            priority
          />
        </div>
      )}
    </section>
  );
}
