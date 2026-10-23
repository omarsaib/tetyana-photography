import Link from "next/link";
import { Logo } from "./Logo";
import { localize, type Dictionary, type Locale } from "@/lib/i18n";
import { contact, menuLinks, menuSecondary } from "@/lib/site";

// Cached at build/revalidation so the footer stays part of the static shell.
async function CurrentYear({ lang }: { lang: Locale }) {
  "use cache";
  return <>{new Date().getFullYear().toLocaleString(lang === "ar" ? "ar-EG" : "en", { useGrouping: false })}</>;
}

export function Footer({ lang, t }: { lang: Locale; t: Dictionary }) {
  const f = t.footer;
  return (
    <footer className="bg-espresso text-ivory">
      <div className="mx-auto max-w-[1680px] px-5 pb-10 pt-20 md:px-10 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="h-24 md:h-28">
              <Logo alt={t.brand} tone="ivory" />
            </div>
            <p className="display mt-10 max-w-[16ch] text-[2rem] leading-[1.1] text-ivory/90 md:text-[2.5rem]">
              {f.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:col-span-7 md:grid-cols-3">
            <div>
              <p className="label text-aqua">{f.studio}</p>
              <address className="mt-5 text-[0.9375rem] not-italic leading-relaxed text-ivory/80">
                {t.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <span className="mt-3 block">{f.byAppointment}</span>
              </address>
            </div>

            <div>
              <p className="label text-aqua">{f.contact}</p>
              <ul className="mt-5 space-y-2 text-[0.9375rem] text-ivory/80">
                <li>
                  <a href={contact.phoneHref} className="hairline-link" dir="ltr">
                    {contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={contact.whatsapp} className="hairline-link" target="_blank" rel="noreferrer">
                    {f.whatsapp}
                  </a>
                </li>
                <li>
                  <a href={contact.instagram} className="hairline-link" target="_blank" rel="noreferrer">
                    {f.instagram}
                  </a>
                </li>
                <li>
                  <a href={contact.facebook} className="hairline-link" target="_blank" rel="noreferrer">
                    {f.facebook}
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <p className="label text-aqua">{f.explore}</p>
              <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 text-[0.9375rem] text-ivory/80 md:grid-cols-1">
                {[...menuLinks, ...menuSecondary].map((link) => (
                  <li key={link.href}>
                    <Link href={localize(lang, link.href)} className="hairline-link">
                      {t.nav[link.key]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-line-ivory pt-6 text-ivory/60 md:flex-row md:items-center md:justify-between">
          <p className="label">
            © <CurrentYear lang={lang} /> {t.brand}
          </p>
          <a
            href={localize(lang === "en" ? "ar" : "en", "/")}
            hrefLang={lang === "en" ? "ar" : "en"}
            lang={lang === "en" ? "ar" : "en"}
            aria-label={t.nav.languageAria}
            className="label hairline-link self-start md:self-auto"
          >
            {t.nav.language}
          </a>
          <Link href={localize(lang, "/privacy")} className="label hairline-link self-start md:self-auto">
            {f.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
