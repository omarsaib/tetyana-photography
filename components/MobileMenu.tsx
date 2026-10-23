"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import { Logo } from "./Logo";
import { localize, type Dictionary, type Locale } from "@/lib/i18n";
import { bookingPath, contact, menuLinks, menuSecondary } from "@/lib/site";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  lang: Locale;
  t: Dictionary["nav"];
  brand: string;
  homeAria: string;
  /** The current page in the other language. */
  alternateHref: string;
};

export function MobileMenu({ open, onClose, lang, t, brand, homeAria, alternateHref }: MobileMenuProps) {
  const panel = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Keep keyboard focus inside the overlay
      if (e.key === "Tab" && panel.current) {
        const focusable = panel.current.querySelectorAll<HTMLElement>("a, button");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      returnFocus.current?.focus();
    };
  }, [open, onClose]);

  const stagger = (i: number) => ({ "--d": `${180 + i * 70}ms` }) as CSSProperties;
  const item = `transition-[opacity,transform] duration-[1100ms] ease-[var(--ease-silk)] [transition-delay:var(--d)] ${
    open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
  }`;

  return (
    <div
      id="mobile-menu"
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-label={t.menu}
      className={`fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ivory text-espresso transition-[opacity,visibility] duration-700 ease-[var(--ease-silk)] lg:hidden ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="grid h-[4.75rem] shrink-0 grid-cols-[1fr_auto_1fr] items-center border-b border-line px-5 md:px-10">
        <button ref={closeButton} type="button" onClick={onClose} className="label hairline-link justify-self-start">
          {t.close}
        </button>
        <Link href={localize(lang, "/")} onClick={onClose} aria-label={homeAria} className="block h-12">
          <Logo alt={brand} />
        </Link>
        <a
          href={alternateHref}
          hrefLang={lang === "en" ? "ar" : "en"}
          lang={lang === "en" ? "ar" : "en"}
          aria-label={t.languageAria}
          className="label hairline-link justify-self-end"
        >
          {t.language}
        </a>
      </div>

      <nav aria-label={t.menu} className="flex-1 px-5 pb-10 pt-10 md:px-10">
        <ol className="space-y-1">
          {menuLinks.map((link, i) => (
            <li key={link.href} className={item} style={stagger(i)}>
              <Link href={localize(lang, link.href)} onClick={onClose} className="group flex items-baseline gap-5 py-1.5">
                <span className="label w-6 text-taupe">{lang === "ar" ? (i + 1).toLocaleString("ar-EG") : String(i + 1).padStart(2, "0")}</span>
                <span className="display text-[2.5rem] leading-[1.15] transition-colors duration-700 group-hover:text-cyan-deep sm:text-5xl">
                  {t[link.key]}
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <div className={`mt-10 border-t border-line pt-6 ${item}`} style={stagger(menuLinks.length)}>
          <p className="label text-taupe">{t.forPros}</p>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
            {menuSecondary.map((link) => (
              <li key={link.href}>
                <Link href={localize(lang, link.href)} onClick={onClose} className="label underline-link">
                  {t[link.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div
        className={`border-t border-line px-5 py-6 md:px-10 ${item}`}
        style={stagger(menuLinks.length + 1)}
      >
        <Link href={localize(lang, bookingPath)} onClick={onClose} className="outline-btn w-full">
          {t.book}
        </Link>
        <div className="mt-6 flex items-center justify-between">
          <a href={contact.phoneHref} className="label" dir="ltr">
            {contact.phoneDisplay}
          </a>
          <a href={contact.instagram} className="label" target="_blank" rel="noreferrer">
            {contact.handle}
          </a>
        </div>
      </div>
    </div>
  );
}
