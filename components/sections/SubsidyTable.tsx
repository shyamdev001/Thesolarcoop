"use client";

import { useLanguage } from "@/lib/i18n/context";
import { SectionHead } from "@/components/ui/SectionHead";
import { PM_TABLE } from "@/lib/content";

export function SubsidyTable() {
  const { t } = useLanguage();

  return (
    <section className="section section-tight">
      <SectionHead
        align="left"
        eyebrow={t("pm_table_eyebrow")}
        title={t("pm_table_h2")}
        sub={t("pm_table_sub")}
      />
      <div className="subsidy-table-card" data-reveal>
        <div className="subsidy-table">
          <table>
            <thead>
              <tr>
                {PM_TABLE.headers.map((h) => (
                  <th key={h}>{t(h)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PM_TABLE.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell) => (
                    <td key={cell}>{t(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="section-head-sub" data-reveal style={{ marginTop: 16 }}>
        {t("pm_table_note")}
      </p>
    </section>
  );
}
