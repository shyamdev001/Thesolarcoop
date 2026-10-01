"use client";

import { useLanguage } from "@/lib/i18n/context";
import { SectionHead } from "@/components/ui/SectionHead";
import { PinIcon } from "@/components/ui/aboutIcons";
import { PhoneIcon, EmailIcon } from "@/components/ui/contactIcons";
import { CONTACT } from "@/lib/site";
import { CONTACT_METHODS } from "@/lib/content";

const HREF: Record<string, string> = {
  maps: CONTACT.mapsHref,
  email: CONTACT.emailHref,
  phone: CONTACT.phoneHref,
};

const VALUE: Record<string, string> = {
  address: CONTACT.address,
  email: CONTACT.email,
  phone: CONTACT.phoneDisplay,
};

const ICON: Record<string, typeof PinIcon> = {
  address: PinIcon,
  email: EmailIcon,
  phone: PhoneIcon,
};

export function ContactMethods() {
  const { t } = useLanguage();

  return (
    <section className="section section-tight">
      <SectionHead
        align="left"
        eyebrow={t("ct_ways_eyebrow")}
        title={t("ct_ways_h2")}
        sub={t("ct_ways_sub")}
      />
      <div className="contact-methods">
        {CONTACT_METHODS.map((method, i) => {
          const Icon = ICON[method.value];
          return (
            <div className="contact-method" data-reveal key={method.label}>
              <span className="cm-index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="cm-icon" aria-hidden="true">
                <Icon />
              </span>
              <span className="cm-label">{t(method.label)}</span>
              <a
                className="cm-value"
                href={HREF[method.href]}
                {...(method.external
                  ? { target: "_blank", rel: "noopener" }
                  : {})}
              >
                {VALUE[method.value]}
              </a>
              <p>{t(method.note)}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
