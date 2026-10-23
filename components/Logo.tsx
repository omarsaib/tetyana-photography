import Image from "next/image";

type LogoProps = {
  alt?: string;
  tone?: "espresso" | "ivory";
  className?: string;
  preload?: boolean;
};

// The logo artwork is espresso on transparent; the ivory tone is a CSS filter
// so the same /brand/logo.png file serves both states.
export function Logo({ alt = "Tetyana Photography", tone = "espresso", className = "", preload = false }: LogoProps) {
  return (
    <Image
      src="/brand/logo.png"
      alt={alt}
      width={2988}
      height={2563}
      sizes="140px"
      preload={preload}
      className={`h-full w-auto transition-[filter] duration-700 ease-[var(--ease-silk)] ${
        tone === "ivory" ? "[filter:brightness(0)_invert(1)_sepia(0.14)]" : ""
      } ${className}`}
    />
  );
}
