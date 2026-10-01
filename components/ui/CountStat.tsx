import { AnimatedNumber } from "@/components/motion/AnimatedNumber";

type CountStatProps = {
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
};

/**
 * A statistic that counts up once when scrolled into view. Thin wrapper over
 * <AnimatedNumber> so section markup stays unchanged.
 */
export function CountStat({
  value,
  suffix = "",
  decimals = 0,
  className,
}: CountStatProps) {
  return (
    <AnimatedNumber
      className={className}
      value={value}
      suffix={suffix}
      decimals={decimals}
    />
  );
}
