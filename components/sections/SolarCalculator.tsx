"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Magnetic";
import { LiveNumber } from "@/components/motion/LiveNumber";
import { calculate, formatINR } from "@/lib/calculator";

const MIN_UNITS = 50;
const MAX_UNITS = 600;
const DEFAULT_UNITS = 220;

const inr = (n: number) => `₹${formatINR(n)}`;

/**
 * The interactive solar savings estimator — one slider, everything else
 * recalculated live (lib/calculator.ts). Every number it shows comes from
 * a constant already disclosed elsewhere on the site (the FAQ's own cost/
 * generation figures, PM Surya Ghar's real subsidy tiers), never invented
 * for this component — see the disclosure at the bottom.
 */
export function SolarCalculator({ showHeading = true }: { showHeading?: boolean }) {
  const { t } = useLanguage();
  const [units, setUnits] = useState(DEFAULT_UNITS);
  const result = useMemo(() => calculate({ monthlyUnits: units }), [units]);

  const subsidyShare = result.systemCostMid > 0 ? result.subsidyMid / result.systemCostMid : 0;
  const sliderPercent = ((units - MIN_UNITS) / (MAX_UNITS - MIN_UNITS)) * 100;

  return (
    <section className="section calc-section" id="calculator">
      {showHeading && (
        <SectionHead
          align="left"
          eyebrow={t("calc_eyebrow")}
          title={t("calc_h1")}
          sub={t("calc_lead")}
        />
      )}

      <div className="calc-layout">
        <div className="calc-input-panel" data-reveal>
          <label className="calc-slider-label" htmlFor="calc-units">
            {t("calc_input_label")}
          </label>
          <div className="calc-slider-value">
            <LiveNumber value={units} format={(n) => Math.round(n).toString()} className="calc-slider-num" />
            <span className="calc-slider-suffix">{t("calc_units_suffix")}</span>
          </div>
          <input
            id="calc-units"
            type="range"
            className="calc-slider"
            min={MIN_UNITS}
            max={MAX_UNITS}
            step={10}
            value={units}
            onChange={(e) => setUnits(Number(e.target.value))}
            aria-valuetext={`${units} ${t("calc_units_suffix")}`}
            style={{ "--_p": `${sliderPercent}%` } as React.CSSProperties}
            suppressHydrationWarning
          />
          <div className="calc-slider-scale">
            <span>{MIN_UNITS}</span>
            <span>{MAX_UNITS}+</span>
          </div>
          <p className="calc-bill-estimate">
            {t("calc_bill_estimate").replace("{amount}", inr(result.estimatedBill))}
          </p>
        </div>

        <div className="calc-results-panel" data-reveal>
          <div className="calc-result-hero">
            <span className="calc-result-hero-label">{t("calc_result_size_label")}</span>
            <span className="calc-result-hero-value">
              <LiveNumber value={result.recommendedKw} format={(n) => n.toFixed(1)} />
              <span className="calc-result-hero-unit"> kW</span>
            </span>
            <span className="calc-result-hero-tag">{result.sizeLabel}</span>
          </div>

          <div className="calc-cost-bar" aria-hidden="true">
            <span
              className="calc-cost-bar-subsidy"
              style={{ "--_share": subsidyShare } as React.CSSProperties}
            />
          </div>
          <div className="calc-cost-legend">
            <span>
              <i className="calc-dot calc-dot-subsidy" />
              {t("calc_result_subsidy_label")}: <strong><LiveNumber value={result.subsidyMid} format={inr} /></strong>
            </span>
            <span>
              <i className="calc-dot calc-dot-net" />
              {t("calc_result_net_label")}: <strong><LiveNumber value={result.netCostMid} format={inr} /></strong>
            </span>
          </div>

          <dl className="calc-result-grid">
            <div>
              <dt>{t("calc_result_cost_label")}</dt>
              <dd><LiveNumber value={result.systemCostMid} format={inr} /></dd>
            </div>
            <div>
              <dt>{t("calc_result_savings_label")}</dt>
              <dd><LiveNumber value={result.monthlySavings} format={(n) => `${inr(n)}/mo`} /></dd>
            </div>
            <div>
              <dt>{t("calc_result_payback_label")}</dt>
              <dd>
                <LiveNumber value={result.paybackYears} format={(n) => n.toFixed(1)} />{" "}
                {t("calc_years_suffix")}
              </dd>
            </div>
            <div>
              <dt>{t("calc_result_lifetime_label")}</dt>
              <dd><LiveNumber value={result.lifetimeSavings25yr} format={inr} /></dd>
            </div>
          </dl>

          <Magnetic strength={0.2}>
            <Button href="/contact/" className="calc-cta">
              {t("calc_cta")}
            </Button>
          </Magnetic>

          <details className="calc-disclosure">
            <summary>{t("calc_disclosure_title")}</summary>
            <p>{t("calc_disclosure_body")}</p>
          </details>
        </div>
      </div>
    </section>
  );
}
