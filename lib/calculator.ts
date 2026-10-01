/**
 * Solar savings estimator — every constant here is a real figure already
 * disclosed elsewhere on this site (PM_TABLE in content.ts, the FAQ's own
 * cost/generation answers), not invented for this calculator. Where a
 * range exists (system cost, subsidy), we use the range's midpoint for the
 * headline number and expose the range too, rather than presenting one
 * precise-looking figure as more certain than the real data supports.
 */

// FAQ: "A 1 kW system generates about 4 to 5 units a day" — midpoint 4.5.
const UNITS_PER_KW_PER_DAY = 4.5;
const DAYS_PER_MONTH = 30;

// FAQ: "It usually works out to about ₹40,000 to ₹70,000 per kW."
export const COST_PER_KW_RANGE = { low: 40_000, high: 70_000 };

// PmImpact's own real stat: "80–90%" bill reduction from net-metered solar.
const BILL_REDUCTION = 0.85;

// A blended domestic-tariff estimate, used only to translate a units figure
// into a rupee bill for display — labelled as an estimate in the UI, never
// presented as a real discom rate.
const ASSUMED_RATE_PER_UNIT = 6.5;

// PM Surya Ghar tiers — identical to PM_TABLE in lib/content.ts (kept as
// plain numbers here since the calculator needs to do arithmetic with
// them, not render translated table cells).
const SUBSIDY_TIERS = [
  { maxUnits: 150, sizeLabel: "1–2 kW", subsidy: { low: 30_000, high: 60_000 } },
  { maxUnits: 300, sizeLabel: "2–3 kW", subsidy: { low: 60_000, high: 78_000 } },
  { maxUnits: Infinity, sizeLabel: "3 kW+", subsidy: { low: 78_000, high: 78_000 } },
] as const;

export type CalculatorInput = { monthlyUnits: number };

export type CalculatorResult = {
  monthlyUnits: number;
  estimatedBill: number;
  recommendedKw: number;
  sizeLabel: string;
  systemCostLow: number;
  systemCostHigh: number;
  systemCostMid: number;
  subsidyLow: number;
  subsidyHigh: number;
  subsidyMid: number;
  netCostMid: number;
  monthlySavings: number;
  paybackYears: number;
  lifetimeSavings25yr: number;
};

export function calculate({ monthlyUnits }: CalculatorInput): CalculatorResult {
  const units = Math.max(0, monthlyUnits);
  const tier = SUBSIDY_TIERS.find((t) => units <= t.maxUnits) ?? SUBSIDY_TIERS[SUBSIDY_TIERS.length - 1];

  const recommendedKw = Math.max(1, Math.round((units / (UNITS_PER_KW_PER_DAY * DAYS_PER_MONTH)) * 2) / 2);

  const systemCostLow = Math.round(recommendedKw * COST_PER_KW_RANGE.low);
  const systemCostHigh = Math.round(recommendedKw * COST_PER_KW_RANGE.high);
  const systemCostMid = Math.round((systemCostLow + systemCostHigh) / 2);

  const subsidyMid = Math.round((tier.subsidy.low + tier.subsidy.high) / 2);
  const netCostMid = Math.max(0, systemCostMid - subsidyMid);

  const estimatedBill = Math.round(units * ASSUMED_RATE_PER_UNIT);
  const monthlySavings = Math.round(estimatedBill * BILL_REDUCTION);

  const paybackYears = monthlySavings > 0 ? netCostMid / (monthlySavings * 12) : 0;
  const lifetimeSavings25yr = Math.round(monthlySavings * 12 * 25 - netCostMid);

  return {
    monthlyUnits: units,
    estimatedBill,
    recommendedKw,
    sizeLabel: tier.sizeLabel,
    systemCostLow,
    systemCostHigh,
    systemCostMid,
    subsidyLow: tier.subsidy.low,
    subsidyHigh: tier.subsidy.high,
    subsidyMid,
    netCostMid,
    monthlySavings,
    paybackYears,
    lifetimeSavings25yr,
  };
}

export function formatINR(n: number): string {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));
}
