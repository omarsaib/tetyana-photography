// All page copy in both languages. English is served at "/", Arabic at "/ar".

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

export const dir = (lang: Locale) => (lang === "ar" ? "rtl" : "ltr");

/** Prefix an internal path for the given language ("/studio" → "/ar/studio"). */
export function localize(lang: Locale, path: string) {
  if (lang === "en") return path;
  return path === "/" ? "/ar" : `/ar${path}`;
}

/** Strip any language prefix from a browser pathname. */
export function basePath(pathname: string) {
  const stripped = pathname.replace(/^\/(ar|en)(?=\/|$)/, "");
  return stripped === "" ? "/" : stripped;
}

export type Review = { quote: string; session: string };

const en = {
  meta: {
    title: "Tetyana Photography — Newborn & Baby Photographer in Cairo",
    description:
      "Newborn, baby and first-birthday portraits made with patience in a private, light-filled studio in 6th of October, Cairo.",
  },
  brand: "Tetyana Photography",
  homeAria: "Tetyana Photography — home",
  skip: "Skip to content",
  nav: {
    portfolio: "Portfolio",
    sessions: "Sessions & Prices",
    studio: "Studio",
    about: "About",
    masterClass: "Master Class",
    reviews: "Reviews",
    faq: "FAQ",
    contact: "Contact",
    workshop: "Parents' Workshop",
    book: "Book a session",
    bookShort: "Book",
    menu: "Menu",
    close: "Close",
    forPros: "For photographers & parents",
    language: "عربي",
    languageAria: "الموقع باللغة العربية",
  },
  address: ["4th Touristic Area, Building 35", "6th of October City, Cairo"],
  hero: {
    kicker: "Newborn & Baby Photography — 6th of October, Cairo",
    titleA: "The first days,",
    titleB: "held still.",
    body: "Portraits of newborns, babies and first birthdays — made with patience, in a warm and light-filled private studio.",
    cta: "Discover the portfolio",
    alt: "A mother cradling her sleeping newborn beside a sheer, sunlit curtain",
  },
  intro: {
    label: "Introduction",
    lead: ["I create lifetime memories of ", "the most wonderful time", " — the arrival of your baby, and their very first years."],
    body: "Five years of newborn and baby portraits, made slowly in my own light-filled studio in 6th of October — kept warm for the smallest guests.",
    signature: "— Tetyana",
    cta: "About Tetyana",
    alt: "Close detail of a sleeping newborn’s face and tiny curled hand",
    stats: [
      { figure: "05", label: "Years with newborns" },
      { figure: "01", label: "Private studio" },
      { figure: "21", label: "Days to your gallery" },
    ],
  },
  portfolio: {
    label: "Portfolio",
    titleA: "The first ",
    titleB: "year.",
    cta: "View the portfolio",
    alts: [
      "A newborn asleep in an ivory romper on a knitted oatmeal blanket",
      "A swaddled newborn in a white headband resting on a flokati rug",
      "A smiling baby in a grey knitted romper sitting on a sheepskin rug",
      "A sleeping newborn wrapped in grey, curled in a woven nest",
      "A newborn asleep in a mustard wrap, hands folded under the chin",
      "A one-year-old leaning into a white naked cake on a wooden board",
      "An open photobook resting on a linen ottoman beside a window",
    ],
  },
  interlude: {
    aria: "The studio",
    alt: "A parent holding a sleeping newborn in soft window light",
    text: "Window light, warm rooms, and all the time your baby needs.",
    cta: "Visit the studio",
  },
  reviews: {
    label: "Kind words",
    cta: "Read all reviews",
    // Lightly edited from reviews left by families on the current site.
    featured: {
      quote:
        "Trust me, I’ve tried a few photographers before — and she is different. Tetyana will be our family photographer from now on.",
      session: "Baby session, six months",
    } as Review,
    list: [
      {
        quote:
          "I highly recommend Tetyana for her great taste, her talent in soothing our baby during the whole session, and her cozy, well-equipped studio.",
        session: "Baby session",
      },
      {
        quote:
          "She gave me all the time I needed to feed and calm my baby — we took five hours, and it never felt long. I loved the photos.",
        session: "Newborn session",
      },
      {
        quote:
          "Couldn’t have wished for a more beautiful first birthday. She sent one picture fully edited a few hours after we left — in time for the party.",
        session: "Cake smash, first birthday",
      },
      {
        quote: "Professional, talented and very patient, with a unique, elegant taste. I had the best experience.",
        session: "Newborn session",
      },
      {
        quote:
          "My first baby was photographed by Tetyana in 2017, and my second in 2019. A gentle, kind photographer — and a beautiful person, inside and out.",
        session: "Two children, 2017 & 2019",
      },
      {
        quote:
          "She was keen to take many different shots and gave us the photos before the due date. The studio is so comfortable for babies, and beautifully equipped.",
        session: "Newborn session",
      },
      {
        quote:
          "I watched her through the whole session, amazed at her patience with my little one — and wished my older daughter’s first days had been documented like this.",
        session: "Newborn session",
      },
      {
        quote: "So friendly with babies — they love her. The atmosphere was wonderful; we will be back with our next baby.",
        session: "Newborn session",
      },
      {
        quote:
          "The studio is neat and warm, with a changing table, and I had all the time and freedom to nurse my baby. The photos are beautiful, and the video too.",
        session: "Newborn session",
      },
    ] as Review[],
  },
  booking: {
    label: "Booking",
    titleA: "Reserve your date",
    titleB: "before baby arrives.",
    body: "Newborn portraits are made in the first weeks, and each month has only a few places. Share your due date and I will hold one for you.",
    cta: "Book a session",
    whatsapp: "Message on WhatsApp",
    telephone: "Telephone",
    studio: "Studio",
    follow: "Follow",
  },
  footer: {
    tagline: "Newborn & baby portraits, made slowly in Cairo.",
    studio: "Studio",
    contact: "Contact",
    explore: "Explore",
    byAppointment: "By appointment",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    facebook: "Facebook",
    privacy: "Privacy Policy",
  },
  notFound: {
    kicker: "In preparation",
    titleA: "This page is ",
    titleB: "still being composed.",
    home: "Return home",
    whatsapp: "Book on WhatsApp",
  },
};

export type Dictionary = typeof en;

const ar: Dictionary = {
  meta: {
    title: "تيتيانا للتصوير — تصوير حديثي الولادة والأطفال في القاهرة",
    description:
      "صور لحديثي الولادة والأطفال وأعياد الميلاد الأولى، تُلتقط بصبر في استوديو خاص يغمره الضوء الطبيعي في مدينة ٦ أكتوبر، القاهرة.",
  },
  brand: "تيتيانا للتصوير",
  homeAria: "تيتيانا للتصوير — الصفحة الرئيسية",
  skip: "انتقل إلى المحتوى",
  nav: {
    portfolio: "الأعمال",
    sessions: "الجلسات والأسعار",
    studio: "الاستوديو",
    about: "عن تيتيانا",
    masterClass: "الدورة الاحترافية",
    reviews: "آراء العائلات",
    faq: "الأسئلة الشائعة",
    contact: "التواصل",
    workshop: "ورشة الآباء والأمهات",
    book: "حجز جلسة",
    bookShort: "الحجز",
    menu: "القائمة",
    close: "إغلاق",
    forPros: "للمصورين والأهالي",
    language: "English",
    languageAria: "View the site in English",
  },
  address: ["المنطقة السياحية الرابعة، مبنى ٣٥", "مدينة ٦ أكتوبر، القاهرة"],
  hero: {
    kicker: "تصوير حديثي الولادة والأطفال — ٦ أكتوبر، القاهرة",
    titleA: "الأيام الأولى،",
    titleB: "محفوظةٌ بهدوء.",
    body: "صور لحديثي الولادة والأطفال وأعياد الميلاد الأولى — تُلتقط بصبر، في استوديو خاص دافئ يغمره الضوء الطبيعي.",
    cta: "معرض الأعمال",
    alt: "أم تحتضن مولودها النائم بجوار ستارة شفافة يتسلل منها الضوء",
  },
  intro: {
    label: "مقدمة",
    lead: ["أصنع ذكرياتٍ تدوم مدى الحياة من ", "أجمل لحظات العمر", " — قدوم طفلكم، وسنواته الأولى."],
    body: "خمس سنوات من تصوير حديثي الولادة والأطفال، بتأنٍّ، في الاستوديو الخاص بي في ٦ أكتوبر — مكانٌ مضيء ودافئ يليق بأصغر الضيوف.",
    signature: "— تيتيانا",
    cta: "عن تيتيانا",
    alt: "لقطة قريبة لوجه مولود نائم ويده الصغيرة",
    stats: [
      { figure: "٥", label: "سنوات مع حديثي الولادة" },
      { figure: "١", label: "استوديو خاص" },
      { figure: "٢١", label: "يومًا لاستلام الصور" },
    ],
  },
  portfolio: {
    label: "الأعمال",
    titleA: "العام ",
    titleB: "الأول.",
    cta: "معرض الأعمال كاملًا",
    alts: [
      "مولود نائم بملابس عاجية على بطانية محبوكة بلون الشوفان",
      "مولود ملفوف بقماط أبيض يرتدي عصابة رأس على سجادة صوف",
      "طفل مبتسم بملابس رمادية محبوكة يجلس على فرو ناعم",
      "مولود نائم ملفوف بالرمادي داخل سلة منسوجة",
      "مولود نائم بقماط خردلي اللون ويداه تحت ذقنه",
      "طفل في عامه الأول يغوص في كعكة بيضاء على لوح خشبي",
      "ألبوم صور مفتوح على مقعد من الكتان بجوار النافذة",
    ],
  },
  interlude: {
    aria: "الاستوديو",
    alt: "أحد الوالدين يحمل مولودًا نائمًا في ضوء النافذة الناعم",
    text: "ضوء النوافذ، وغرف دافئة، وكل الوقت الذي يحتاجه طفلكم.",
    cta: "زيارة الاستوديو",
  },
  reviews: {
    label: "كلمات لطيفة",
    cta: "جميع الآراء",
    featured: {
      quote: "صدقوني، جرّبت مصورين كثيرين من قبل — وهي مختلفة. ستكون تيتيانا مصورة عائلتنا من الآن فصاعدًا.",
      session: "جلسة طفل، ستة أشهر",
    },
    list: [
      {
        quote: "أنصح بتيتيانا بشدة لذوقها الرفيع، وموهبتها في تهدئة طفلنا طوال الجلسة، واستوديوها الدافئ المجهّز بكل شيء.",
        session: "جلسة طفل",
      },
      {
        quote: "منحتني كل الوقت الذي احتجته لإرضاع طفلي وتهدئته — استغرقنا خمس ساعات ولم نشعر بطولها. أحببت الصور.",
        session: "جلسة حديث الولادة",
      },
      {
        quote: "لم أكن لأتمنى عيد ميلاد أول أجمل من هذا. أرسلت لنا صورة معدّلة بالكامل بعد ساعات من مغادرتنا — في الوقت المناسب للحفلة.",
        session: "كيكة سماش، عيد الميلاد الأول",
      },
      {
        quote: "محترفة وموهوبة وصبورة جدًا، وذوقها أنيق ومميز. كانت أجمل تجربة.",
        session: "جلسة حديث الولادة",
      },
      {
        quote: "صوّرت تيتيانا طفلي الأول عام ٢٠١٧، والثاني عام ٢٠١٩. مصورة رقيقة ولطيفة — وإنسانة جميلة من الداخل والخارج.",
        session: "طفلان، ٢٠١٧ و٢٠١٩",
      },
      {
        quote: "حرصت على التقاط لقطات كثيرة ومتنوعة، وسلّمتنا الصور قبل الموعد. الاستوديو مريح جدًا للأطفال ومجهّز بعناية.",
        session: "جلسة حديث الولادة",
      },
      {
        quote: "راقبتها طوال الجلسة مندهشة من صبرها مع صغيري — وتمنيت لو وُثّقت أيام ابنتي الكبرى الأولى بهذا الجمال.",
        session: "جلسة حديث الولادة",
      },
      {
        quote: "ودودة جدًا مع الأطفال — يحبونها كثيرًا. كانت الأجواء رائعة، وسنعود مع طفلنا القادم.",
        session: "جلسة حديث الولادة",
      },
      {
        quote: "الاستوديو نظيف ودافئ، وفيه طاولة لتغيير الحفاضات، وكان لدي كل الوقت والحرية لإرضاع طفلي. الصور جميلة، والفيديو كذلك.",
        session: "جلسة حديث الولادة",
      },
    ],
  },
  booking: {
    label: "الحجز",
    titleA: "احجزوا موعدكم",
    titleB: "قبل وصول طفلكم.",
    body: "تُلتقط صور حديثي الولادة في الأسابيع الأولى، والأماكن محدودة كل شهر. شاركوني موعد الولادة المتوقع، وسأحجز لكم مكانًا.",
    cta: "حجز جلسة",
    whatsapp: "راسلوني عبر واتساب",
    telephone: "الهاتف",
    studio: "الاستوديو",
    follow: "تابعوني",
  },
  footer: {
    tagline: "صور حديثي الولادة والأطفال، تُصنع بتأنٍّ في القاهرة.",
    studio: "الاستوديو",
    contact: "التواصل",
    explore: "تصفّح",
    byAppointment: "بموعد مسبق",
    whatsapp: "واتساب",
    instagram: "إنستغرام",
    facebook: "فيسبوك",
    privacy: "سياسة الخصوصية",
  },
  notFound: {
    kicker: "قيد الإعداد",
    titleA: "هذه الصفحة ",
    titleB: "ما زالت قيد الإعداد.",
    home: "العودة إلى الرئيسية",
    whatsapp: "الحجز عبر واتساب",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, ar };

export const getDictionary = (lang: Locale) => dictionaries[lang];
