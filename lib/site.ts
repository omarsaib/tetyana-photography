// Language-neutral site data. Copy lives in lib/i18n.ts.
// Photos live in /public/photos/<category>/ — replace a file with one of the
// same name to swap in a real photograph; nothing else changes.

import type { Dictionary } from "./i18n";

export const contact = {
  phoneDisplay: "+20 120 868 0092",
  phoneHref: "tel:+201208680092",
  whatsapp: "https://wa.me/201208680092",
  instagram: "https://www.instagram.com/tetyanaphotography",
  facebook: "https://www.facebook.com/tetyanaphotography",
  handle: "@tetyanaphotography",
};

export type NavKey = keyof Omit<
  Dictionary["nav"],
  "book" | "bookShort" | "menu" | "close" | "forPros" | "language" | "languageAria"
>;
export type NavLink = { key: NavKey; href: string };

export const navLeft: NavLink[] = [
  { key: "portfolio", href: "/portfolio" },
  { key: "sessions", href: "/sessions" },
  { key: "studio", href: "/studio" },
];

export const navRight: NavLink[] = [
  { key: "about", href: "/about" },
  { key: "masterClass", href: "/master-class" },
];

export const menuLinks: NavLink[] = [
  { key: "portfolio", href: "/portfolio" },
  { key: "sessions", href: "/sessions" },
  { key: "about", href: "/about" },
  { key: "studio", href: "/studio" },
  { key: "reviews", href: "/reviews" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
];

export const menuSecondary: NavLink[] = [
  { key: "masterClass", href: "/master-class" },
  { key: "workshop", href: "/parents-workshop" },
];

export const bookingPath = "/contact";

// Homepage portfolio gallery, in reading order (alt text is in lib/i18n.ts,
// same order). The layout gives the first image the large square, the third
// a tall frame and the sixth a wide one.
export const gallery = [
  "/photos/newborns/cover.jpg",
  "/photos/newborns/flokati.jpg",
  "/photos/babies/cover.jpg",
  "/photos/newborns/nest.jpg",
  "/photos/newborns/wrap.jpg",
  "/photos/1-year-olds/cover.jpg",
  "/photos/photobooks/cover.jpg",
];
