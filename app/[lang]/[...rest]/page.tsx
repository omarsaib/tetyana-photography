import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, localize, locales } from "@/lib/i18n";
import { bookingPath, contact, menuLinks, menuSecondary } from "@/lib/site";

// Placeholder for every page that hasn't been designed yet.
const placeholders = [...new Set([...menuLinks, ...menuSecondary].map((l) => l.href).concat(bookingPath, "/privacy"))];

export function generateStaticParams() {
  return locales.flatMap((lang) => placeholders.map((path) => ({ lang, rest: path.slice(1).split("/") })));
}

export const metadata: Metadata = { robots: { index: false } };

export default async function InPreparation({ params }: PageProps<"/[lang]/[...rest]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang).notFound;

  return (
    <section className="mx-auto flex min-h-[80svh] max-w-[1680px] flex-col justify-center px-5 pb-24 pt-40 md:px-10">
      <p className="label text-taupe">{t.kicker}</p>
      <h1 className="display mt-6 max-w-[16ch] text-[2.75rem] leading-[1.04] sm:text-6xl lg:text-[5rem]">
        {t.titleA}
        <em className="italic">{t.titleB}</em>
      </h1>
      <div className="mt-12 flex flex-wrap items-center gap-8">
        <Link href={localize(lang, "/")} className="label underline-link">
          {t.home}
        </Link>
        <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="outline-btn">
          {t.whatsapp}
        </a>
      </div>
    </section>
  );
}
