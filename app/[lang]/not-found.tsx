import Link from "next/link";

// Rendered without route params, so it speaks both languages.
export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80svh] max-w-[1680px] flex-col justify-center gap-10 px-5 pb-24 pt-40 md:px-10">
      <h1 className="display text-[2.75rem] leading-[1.04] sm:text-6xl">
        Page not found<span className="text-taupe"> · </span>
        <span lang="ar" dir="rtl">
          الصفحة غير موجودة
        </span>
      </h1>
      <div className="flex flex-wrap gap-8">
        <Link href="/" className="label underline-link">
          Return home
        </Link>
        <Link href="/ar" lang="ar" className="label underline-link">
          العودة إلى الرئيسية
        </Link>
      </div>
    </section>
  );
}
