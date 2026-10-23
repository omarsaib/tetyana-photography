"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { basePath, localize, type Dictionary, type Locale } from "@/lib/i18n";
import { bookingPath, navLeft, navRight } from "@/lib/site";

const navText = "label tracking-[var(--tracking-nav)]";

type HeaderProps = {
  lang: Locale;
  t: Dictionary["nav"];
  brand: string;
  homeAria: string;
};

export function Header({ lang, t, brand, homeAria }: HeaderProps) {
  const path = basePath(usePathname());
  const isHome = path === "/";
  const otherLang: Locale = lang === "en" ? "ar" : "en";
  const alternateHref = localize(otherLang, path);

  const [atTop, setAtTop] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Solid after leaving the very top; hide on scroll down, return on scroll up.
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setAtTop(y < 40);
      if (y > lastY + 6 && y > 160) setHidden(true);
      else if (y < lastY - 6 || y < 160) setHidden(false);
      lastY = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const transparent = isHome && atTop;
  const isHidden = hidden && !mobileOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color,color] duration-[900ms] ease-[var(--ease-silk)] ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        } ${
          transparent
            ? "border-b border-transparent bg-transparent text-ivory"
            : "border-b border-line bg-ivory text-espresso"
        }`}
      >
        <div
          className={`mx-auto grid max-w-[1680px] grid-cols-[1fr_auto_1fr] items-center px-5 transition-[height] duration-[900ms] ease-[var(--ease-silk)] md:px-10 ${
            atTop ? "h-[4.75rem] lg:h-[6.5rem]" : "h-16 lg:h-[4.75rem]"
          }`}
        >
          {/* Start — mobile: Menu; desktop: primary nav */}
          <div className="flex items-center">
            <button
              type="button"
              className={`${navText} hairline-link lg:hidden`}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen(true)}
            >
              {t.menu}
            </button>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-10">
                {navLeft.map((link) => (
                  <li key={link.href}>
                    <Link href={localize(lang, link.href)} className={`${navText} hairline-link`}>
                      {t[link.key]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Centre — logo */}
          <Link
            href={localize(lang, "/")}
            aria-label={homeAria}
            className={`block transition-[height] duration-[900ms] ease-[var(--ease-silk)] ${
              atTop ? "h-12 lg:h-[4.5rem]" : "h-10 lg:h-12"
            }`}
          >
            <Logo alt={brand} tone={transparent ? "ivory" : "espresso"} preload />
          </Link>

          {/* End — secondary nav, language, booking */}
          <div className="flex items-center justify-end gap-10">
            <nav aria-label="Secondary" className="hidden lg:block">
              <ul className="flex items-center gap-10">
                {navRight.map((link) => (
                  <li key={link.href}>
                    <Link href={localize(lang, link.href)} className={`${navText} hairline-link`}>
                      {t[link.key]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            {/* Full page load so <html lang/dir> and fonts switch cleanly */}
            <a
              href={alternateHref}
              hrefLang={otherLang}
              lang={otherLang}
              aria-label={t.languageAria}
              className={`${navText} hairline-link hidden lg:inline-block`}
            >
              {t.language}
            </a>
            <Link href={localize(lang, bookingPath)} className={`${navText} hairline-link lg:hidden`}>
              {t.bookShort}
            </Link>
            <Link
              href={localize(lang, bookingPath)}
              className={`outline-btn hidden lg:inline-flex ${transparent ? "outline-btn--ivory" : ""}`}
            >
              {t.book}
            </Link>
          </div>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={closeMobile}
        lang={lang}
        t={t}
        brand={brand}
        homeAria={homeAria}
        alternateHref={alternateHref}
      />
    </>
  );
}
