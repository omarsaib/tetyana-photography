import type { Metadata, Viewport } from "next";
import { Amiri, Bodoni_Moda, IBM_Plex_Sans_Arabic, Jost } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { dir, getDictionary, hasLocale, localize, locales } from "@/lib/i18n";
import "../globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

// Arabic faces: a classical Naskh for headings, a light humanist sans for text.
// Not preloaded, so the English pages never download them.
const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
  preload: false,
});

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["300", "400"],
  display: "swap",
  preload: false,
});

// The public address used for canonical links and share previews. Set
// NEXT_PUBLIC_SITE_URL once a custom domain exists; until then Vercel's own
// production address (e.g. tetyana-photography.vercel.app) is used.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.meta.title, template: `%s — ${t.brand}` },
    description: t.meta.description,
    alternates: {
      canonical: localize(lang, "/"),
      languages: { en: "/", ar: "/ar" },
    },
    openGraph: {
      title: t.brand,
      description: t.meta.description,
      images: ["/photos/newborns/hero.jpg"],
      type: "website",
      locale: lang === "ar" ? "ar_EG" : "en_US",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#f6f1e9",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <html
      lang={lang}
      dir={dir(lang)}
      className={`${bodoni.variable} ${jost.variable} ${amiri.variable} ${plexArabic.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Enables reveal-on-scroll styles only when JS is available */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-full">
        <a
          href="#main"
          className="label sr-only z-[70] bg-ivory px-4 py-3 focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
        >
          {t.skip}
        </a>
        <Header lang={lang} t={t.nav} brand={t.brand} homeAria={t.homeAria} />
        <main id="main">{children}</main>
        <Footer lang={lang} t={t} />
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
