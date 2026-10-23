import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { getDictionary, hasLocale, localize, type Dictionary, type Locale } from "@/lib/i18n";
import { bookingPath, contact, gallery } from "@/lib/site";

const shell = "mx-auto max-w-[1680px] px-5 md:px-10";

/** Section/review numbers: "01" in English, "١" in Arabic (a padded Arabic zero reads as a dot). */
const num = (lang: Locale, n: number) =>
  lang === "ar" ? n.toLocaleString("ar-EG") : n.toLocaleString("en", { minimumIntegerDigits: 2 });

type SectionProps = { lang: Locale; t: Dictionary };

function SectionLabel({ n, children }: { n: string; children: ReactNode }) {
  return (
    <p className="label flex items-center gap-4 text-taupe">
      <span className="text-espresso">{n}</span>
      <span aria-hidden className="h-px w-10 bg-aqua" />
      {children}
    </p>
  );
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <Hero lang={lang} t={t} />
      <Intro lang={lang} t={t} />
      <Portfolio lang={lang} t={t} />
      <Interlude lang={lang} t={t} />
      <KindWords lang={lang} t={t} />
      <Booking lang={lang} t={t} />
    </>
  );
}

/* ---------- Hero ---------- */

function Hero({ lang, t }: SectionProps) {
  const h = t.hero;
  return (
    <section className="relative h-[100svh] min-h-[600px] overflow-hidden bg-espresso text-ivory">
      <Image
        src="/photos/newborns/hero.jpg"
        alt={h.alt}
        fill
        preload
        sizes="100vw"
        className="hero-image object-cover object-[80%_center] md:object-center"
      />
      <div aria-hidden className="absolute inset-0 bg-espresso/35 md:bg-espresso/30" />

      <div className={`${shell} relative flex h-full flex-col justify-end pb-10 md:pb-16`}>
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="label hero-rise text-ivory/85" style={{ "--rise-delay": "0.5s" } as CSSProperties}>
              {h.kicker}
            </p>
            <h1
              className="display hero-rise mt-6 text-[3.4rem] leading-[0.95] sm:text-[5.5rem] lg:text-[7.75rem]"
              style={{ "--rise-delay": "0.75s" } as CSSProperties}
            >
              {h.titleA}
              <br />
              <em className="italic">{h.titleB}</em>
            </h1>
          </div>
          <div
            className="hero-rise md:col-span-3 md:col-start-10 md:pb-3"
            style={{ "--rise-delay": "1.1s" } as CSSProperties}
          >
            <p className="max-w-[30ch] text-[0.9375rem] leading-relaxed text-ivory/85">{h.body}</p>
            <Link href={localize(lang, "/portfolio")} className="label underline-link mt-6">
              {h.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 01 · Introduction ---------- */

function Intro({ lang, t }: SectionProps) {
  const s = t.intro;
  const [before, emphasis, after] = s.lead;
  return (
    <section className={`${shell} py-28 md:py-44`}>
      <div className="grid gap-y-10 md:grid-cols-12">
        <Reveal className="md:col-span-3">
          <SectionLabel n={num(lang, 1)}>{s.label}</SectionLabel>
        </Reveal>
        <Reveal className="md:col-span-8 md:col-start-4" delay={150}>
          <p className="display text-[2rem] leading-[1.14] sm:text-[2.75rem] lg:text-[3.6rem]">
            {before}
            <em className="italic">{emphasis}</em>
            {after}
          </p>
        </Reveal>
      </div>

      <div className="mt-20 grid gap-y-14 md:mt-32 md:grid-cols-12">
        <Reveal
          variant="image"
          className="relative ms-[18%] aspect-[4/5] overflow-hidden bg-stone md:col-span-4 md:col-start-2 md:ms-0"
        >
          <Image
            src="/photos/newborns/detail.jpg"
            alt={s.alt}
            fill
            sizes="(min-width: 768px) 33vw, 82vw"
            className="object-cover"
          />
        </Reveal>

        <div className="md:col-span-5 md:col-start-7 md:self-end">
          <Reveal>
            <p className="max-w-[46ch] text-[1rem] leading-[1.8] text-espresso-soft">{s.body}</p>
            <p className="display mt-8 text-[1.75rem] italic">{s.signature}</p>
            <Link href={localize(lang, "/about")} className="label underline-link mt-8">
              {s.cta}
            </Link>
          </Reveal>

          <Reveal delay={200}>
            <dl className="mt-16 grid grid-cols-3 border-t border-line">
              {s.stats.map(({ figure, label }) => (
                <div key={label} className="border-e border-line pe-3 pt-5 last:border-e-0 [&:not(:first-child)]:ps-4">
                  <dt className="display text-[2.25rem] leading-none md:text-[2.75rem]">{figure}</dt>
                  <dd className="label mt-3 text-[0.625rem] text-taupe">{label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- 02 · Portfolio ---------- */

// A tightly packed mosaic: two columns on phones, four on desktop. Each
// position has its own span (one large square, one tall, one wide) and dense
// packing fills the gaps, so the gallery always closes into a clean block.
const tiles = [
  { span: "col-span-2 row-span-2", sizes: "(min-width: 768px) 50vw, 100vw" },
  { span: "", sizes: "(min-width: 768px) 25vw, 50vw" },
  { span: "row-span-2", sizes: "(min-width: 768px) 25vw, 50vw" },
  { span: "", sizes: "(min-width: 768px) 25vw, 50vw" },
  { span: "", sizes: "(min-width: 768px) 25vw, 50vw" },
  { span: "col-span-2 [&_img]:object-[35%_center]", sizes: "(min-width: 768px) 50vw, 100vw" },
  { span: "", sizes: "(min-width: 768px) 25vw, 50vw" },
];

function Portfolio({ lang, t }: SectionProps) {
  const s = t.portfolio;
  const href = localize(lang, "/portfolio");
  return (
    <section className="border-t border-line pb-28 pt-24 md:pb-40 md:pt-32">
      <div className={shell}>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <SectionLabel n={num(lang, 2)}>{s.label}</SectionLabel>
            </Reveal>
            <Reveal delay={150}>
              <h2 className="display mt-8 text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[5rem]">
                {s.titleA}
                <em className="italic">{s.titleB}</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={300}>
            <Link href={href} className="label underline-link">
              {s.cta}
            </Link>
          </Reveal>
        </div>

        <ul className="mt-12 grid auto-rows-[46vw] grid-flow-dense grid-cols-2 gap-1.5 md:mt-16 md:auto-rows-[min(23vw,400px)] md:grid-cols-4 md:gap-2">
          {gallery.map((src, i) => {
            const tile = tiles[i % tiles.length];
            return (
              <li key={src} className={tile.span}>
                <Link href={href} className="block h-full">
                  <Reveal
                    variant="image"
                    delay={(i % 4) * 120}
                    className="image-hover relative h-full overflow-hidden bg-stone"
                  >
                    <Image src={src} alt={s.alts[i] ?? ""} fill sizes={tile.sizes} className="object-cover" />
                  </Reveal>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Interlude — full-bleed pause ---------- */

function Interlude({ lang, t }: SectionProps) {
  const s = t.interlude;
  return (
    <section aria-label={s.aria} className="relative h-[78svh] min-h-[480px] overflow-hidden bg-stone text-ivory">
      <Reveal variant="image" className="absolute inset-0">
        <Image
          src="/photos/newborns/window.jpg"
          alt={s.alt}
          fill
          sizes="100vw"
          className="object-cover object-[40%_center]"
        />
        <div aria-hidden className="absolute inset-0 bg-espresso/20" />
      </Reveal>
      <div className={`${shell} relative flex h-full items-end pb-10 md:pb-14`}>
        <Reveal className="flex w-full flex-col gap-6 md:flex-row md:items-end md:justify-between" delay={600}>
          <p className="display max-w-[18ch] text-[2rem] leading-[1.1] md:text-[3rem]">{s.text}</p>
          <Link href={localize(lang, "/studio")} className="label underline-link self-start md:self-auto">
            {s.cta}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 03 · Reviews ---------- */

function KindWords({ lang, t }: SectionProps) {
  const s = t.reviews;
  const [open, close] = lang === "ar" ? ["«", "»"] : ["“", "”"];
  return (
    <section className="bg-paper py-28 md:py-44">
      <div className={shell}>
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <Reveal>
            <SectionLabel n={num(lang, 3)}>{s.label}</SectionLabel>
          </Reveal>
          <Reveal delay={150}>
            <Link href={localize(lang, "/reviews")} className="label underline-link">
              {s.cta}
            </Link>
          </Reveal>
        </div>

        {/* Featured quote, set large */}
        <Reveal className="mt-16 grid md:mt-24 md:grid-cols-12" delay={150}>
          <figure className="md:col-span-10 md:col-start-2 lg:col-span-9 lg:col-start-3">
            <blockquote className="display relative text-[2.1rem] leading-[1.12] sm:text-5xl lg:text-[4rem]">
              <span aria-hidden className="absolute -start-[0.55em] top-0 hidden text-aqua md:inline">
                {open}
              </span>
              <span aria-hidden className="text-aqua md:hidden">
                {open}
              </span>
              {s.featured.quote}
              <span aria-hidden className="text-aqua">
                {close}
              </span>
            </blockquote>
            <figcaption className="label mt-8 flex items-center gap-4 text-taupe">
              <span aria-hidden className="h-px w-10 bg-aqua" />
              {s.featured.session}
            </figcaption>
          </figure>
        </Reveal>

        {/* Wall of reviews — balanced columns divided by hairlines */}
        <div className="mt-20 border-t border-line pt-14 md:mt-28 md:pt-16">
          <ul className="gap-x-14 [column-rule:1px_solid_var(--color-line)] md:columns-2 lg:columns-3 lg:gap-x-16">
            {s.list.map((review, i) => (
              <li
                key={i}
                className="mb-14 break-inside-avoid md:mb-16 [&:nth-child(n+6)]:hidden md:[&:nth-child(n+6)]:block"
              >
                <Reveal delay={(i % 3) * 120}>
                  <figure>
                    <span className="label text-cyan-deep">{num(lang, i + 1)}</span>
                    <blockquote className="display mt-4 text-[1.4rem] leading-[1.3] md:text-[1.55rem]">
                      {review.quote}
                    </blockquote>
                    <figcaption className="label mt-5 text-taupe">{review.session}</figcaption>
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- 04 · Booking ---------- */

function Booking({ lang, t }: SectionProps) {
  const s = t.booking;
  const details: [string, ReactNode][] = [
    [
      s.telephone,
      <a key="phone" href={contact.phoneHref} className="hairline-link" dir="ltr">
        {contact.phoneDisplay}
      </a>,
    ],
    [s.studio, t.address.join(lang === "ar" ? "، " : ", ")],
    [
      s.follow,
      <a key="ig" href={contact.instagram} target="_blank" rel="noreferrer" className="hairline-link" dir="ltr">
        {contact.handle}
      </a>,
    ],
  ];
  return (
    <section className="bg-cyan-mist">
      <div className={`${shell} py-28 md:py-44`}>
        <Reveal>
          <SectionLabel n={num(lang, 4)}>{s.label}</SectionLabel>
        </Reveal>

        <div className="mt-12 grid gap-y-12 md:mt-16 md:grid-cols-12">
          <Reveal className="md:col-span-8" delay={150}>
            <h2 className="display text-[2.6rem] leading-[1] sm:text-7xl lg:text-[6.5rem]">
              {s.titleA}
              <br />
              <em className="italic">{s.titleB}</em>
            </h2>
          </Reveal>

          <Reveal className="md:col-span-3 md:col-start-10 md:self-end" delay={300}>
            <p className="max-w-[34ch] text-[1rem] leading-[1.8] text-espresso-soft">{s.body}</p>
            <div className="mt-8 flex flex-col items-start gap-6">
              <Link href={localize(lang, bookingPath)} className="outline-btn">
                {s.cta}
              </Link>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="label underline-link">
                {s.whatsapp}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <ul className="mt-20 grid border-t border-espresso/20 md:mt-28 md:grid-cols-3">
            {details.map(([title, body]) => (
              <li
                key={title}
                className="border-b border-espresso/20 py-5 md:border-b-0 md:border-e md:px-6 md:first:ps-0 md:last:border-e-0"
              >
                <p className="label text-taupe">{title}</p>
                <p className="mt-2 text-[0.9375rem]">{body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
