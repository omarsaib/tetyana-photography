"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode, type Ref } from "react";

type RevealProps = {
  children: ReactNode;
  /** "fade" lifts and fades content; "image" draws a veil upward and settles the photo (the wrapper must be positioned and sized). */
  variant?: "fade" | "image";
  delay?: number;
  className?: string;
  as?: "div" | "section" | "figure" | "li" | "p" | "span";
};

/**
 * Reveals its children once they scroll into view. Hidden state only applies
 * when JS is running (the `js` class on <html>), so content is never lost.
 */
export function Reveal({ children, variant = "fade", delay = 0, className, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.visible = "true";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as as "div";
  const style = delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined;

  return (
    <Tag ref={ref as Ref<HTMLDivElement>} data-reveal={variant} className={className} style={style}>
      {variant === "image" ? (
        <div className="reveal-veil absolute inset-0 overflow-hidden">
          <div className="reveal-inner relative h-full w-full">{children}</div>
        </div>
      ) : (
        children
      )}
    </Tag>
  );
}
