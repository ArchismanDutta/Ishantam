// Bilingual content layer. Everything shown to the user lives here.
// Shared config (WhatsApp number, booking endpoint, prices, images) stays in
// ishantam.ts — this file is for user-facing strings in both languages.

export type Locale = "en" | "hi";

export interface Content {
  nav: {
    items: { label: string; href: string }[];
    cta: string;
  };
  hero: {
    eyebrow: string;
    invocation: string;
    titleTop: string;
    titleBottom: string;
    titleItalic: string;
    body: string;
    priceEyebrow: string;
    priceMain: string;
    priceStrike?: string;      // optional promo strike price
    priceSubline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    supporting: { label: string; value: string }[];
    brandNote: string;
    imageCaption: string;
    tagLine1: string;
    tagLine2: string;
  };
  inclusions: {
    eyebrow: string;
    titlePre: string;
    titleItalic: string;
    intro: string;
    items: { number: string; title: string; body: string }[];
    imageCaption: string;
    footnote?: string;
  };
  packages: {
    eyebrow: string;
    titlePre: string;
    titleItalic: string;
    intro: string;
    items: { id: "individual" | "couple" | "family"; name: string; forWhom: string; features: string[]; cta: string }[];
    footnote: string;
    selectedContinue: string;
  };
  about: {
    eyebrow: string;
    titlePre: string;
    titleItalic: string;
    invocation: string;
    paragraphs: string[];
    templeTitle: string;
    templeBody: string;
    disclaimer: string;
    imageCaption: string;
  };
  benefits: {
    eyebrow: string;
    titlePre: string;
    titleItalic: string;
    intro: string;
    list: string[];
  };
  rituals: {
    eyebrow: string;
    titlePre: string;
    titleItalic: string;
    intro: string;
    items: { number: string; title: string; body: string }[];
    imageCaption: string;
  };
  steps: {
    eyebrow: string;
    titlePre: string;
    titleItalic: string;
    items: { number: string; title: string; body: string }[];
  };
  form: {
    eyebrow: string;
    titlePre: string;
    titleItalic: string;
    intro: string;
    labels: {
      fullName: string;
      mobile: string;
      whatsapp: string;
      sameAsMobile: string;
      gotra: string;
      gotraOptional: string;
      pkg: string;
      members: string;
      notes: string;
      notesOptional: string;
      agree: string;
      submit: string;
      submitting: string;
      submitFootnote: string;
    };
    errors: {
      fullName: string;
      mobile: string;
      whatsapp: string;
      members: string;
      agree: string;
      submission: string;
    };
    placeholders: {
      mobile: string;
    };
    success: {
      eyebrow: string;
      titlePre: string;
      titleItalic: string;
      bodyEndpoint: string;
      bodyWhatsApp: string;
      note: string;
    };
  };
  faqs: {
    eyebrow: string;
    titlePre: string;
    titleItalic: string;
    intro: string;
    items: { q: string; a: string }[];
  };
  final: {
    eyebrow: string;
    titleTop: string;
    titleItalic: string;
    body: string;
    priceLabels: { individual: string; couple: string; family: string };
    ctaPrimary: string;
    ctaSecondary: string;
    devanagari: string;
  };
  footer: {
    brandBody: string;
    explore: string;
    packagesH: string;
    contact: string;
    whatsAppLabel: string;
    emailLabel: string;
    phoneLabel: string;
    privacy: string;
    terms: string;
    refund: string;
    copyright: (y: number) => string;
    disclaimer: string;
  };
  common: {
    representative: string;
    optional: string;
  };
}

// ─── Shared package definitions (prices, IDs — same across locales) ───

const PRICES = { individual: "₹801", couple: "₹1,201", family: "₹2,001" };

// Promotional strike price — brief originally flagged this; the Hindi copy
// explicitly provided it, so it is shown in the Hindi hero only.
const STRIKE_PRICE = "₹5,700";

// ─── English ──────────────────────────────────────────────────────────

const en: Content = {
  nav: {
    items: [
      { label: "About the Puja", href: "#about"    },
      { label: "Benefits",       href: "#benefits" },
      { label: "Rituals",        href: "#rituals"  },
      { label: "Packages",       href: "#packages" },
      { label: "FAQs",           href: "#faqs"     },
    ],
    cta: "Book Your Puja",
  },
  hero: {
    eyebrow: "At Mangalnath Temple · Ujjain · Madhya Pradesh",
    invocation: "॥ ॐ अंगारकाय नमः ॥",
    titleTop: "Mangal Bhat Puja",
    titleBottom: "& Mangal Dosha",
    titleItalic: "Shanti Puja.",
    body: "Participate in the sacred Mangal Dosha Shanti Puja through Ishantam, with devotion, faith, and respect for the timeless traditions of Sanatan Dharma. Experienced Vedic priests perform the prescribed rituals on your behalf using your name and Gotra. A video of the ceremony is shared via WhatsApp.",
    priceEyebrow: "Puja packages starting at",
    priceMain: PRICES.individual,
    priceSubline: `/ Individual · ${PRICES.couple} Couple · ${PRICES.family} Family`,
    ctaPrimary: "Book Your Puja",
    ctaSecondary: "Enquire on WhatsApp",
    supporting: [
      { label: "Location",      value: "Mangalnath Temple · Ujjain" },
      { label: "Sankalp",       value: "In your name & Gotra" },
      { label: "Performed by",  value: "Vedic priests" },
      { label: "Delivery",      value: "Video via WhatsApp" },
    ],
    brandNote: "ISHANTAM · A dedicated facilitator of Vedic puja for devotees across India and abroad.",
    imageCaption: "Mangalnath Temple entrance · Ujjain, Madhya Pradesh.",
    tagLine1: "Ujjain · The Eternal City",
    tagLine2: "उज्जैन",
  },
  inclusions: {
    eyebrow: "The ceremony",
    titlePre: "Your faith. Your name.",
    titleItalic: "Your puja.",
    intro: "Every ceremony is performed with devotion and according to the traditional religious procedures determined by the officiating priests.",
    items: [
      { number: "01", title: "Personalised Sankalp",         body: "The priest performs the sacred Sankalp while reciting the devotee's name and Gotra." },
      { number: "02", title: "Puja Performed on Your Behalf", body: "The priest represents the devotee during the prescribed group ceremony at Mangalnath Temple." },
      { number: "03", title: "Puja Video on WhatsApp",       body: "A recording of the ceremony is shared to the registered WhatsApp number, subject to recording arrangements on the day." },
      { number: "04", title: "Traditional Vedic Rituals",     body: "The ceremony includes Mangal Shanti, Bhat Puja, Navgraha Shanti, Rudrabhishek, and the concluding Havan." },
    ],
    imageCaption: "Traditional offerings — prasad, flowers, and the sacred diya.",
    footnote: "Puja Samagri, Havan Samagri, and Dakshina are included in the package.",
  },
  packages: {
    eyebrow: "Puja Packages",
    titlePre: "Choose your sacred",
    titleItalic: "puja offering.",
    intro: "Each package covers the identical traditional ceremony — the difference lies in the number of names and Gotras included in the Sankalp.",
    items: [
      { id: "individual", name: "Individual Puja", forWhom: "For a single devotee",   features: ["Booking for one individual", "Name and Gotra Sankalp", "Participation in the scheduled group puja", "Prescribed religious rituals", "Puja video shared via WhatsApp"], cta: "Select Individual Package" },
      { id: "couple",     name: "Couple Puja",     forWhom: "For two devotees",       features: ["Booking for two individuals", "Name & Gotra per priest's procedures", "Prescribed religious rituals", "Puja video shared via WhatsApp"], cta: "Select Couple Package" },
      { id: "family",     name: "Family Puja",     forWhom: "For 5 – 6 family members", features: ["Booking for 5 – 6 family members", "Name & Gotra per priest's procedures", "Prescribed religious rituals", "Puja video shared via WhatsApp"], cta: "Select Family Package" },
    ],
    footnote: "Prices shown are inclusive. The scheduled puja date, availability of priests, and temple permissions are subject to verification before booking confirmation.",
    selectedContinue: "Selected · Continue",
  },
  about: {
    eyebrow: "About the Puja",
    titlePre: "The sacred tradition of",
    titleItalic: "Mangal Shanti.",
    invocation: "॥ श्री मंगलाय नमः ॥",
    paragraphs: [
      "According to traditional Hindu astrology, certain positions of Mars (Mangal) in the birth chart are described as Mangal Dosha, also called Manglik Dosha. For generations, devotees have participated in the Mangal Dosha Shanti Puja as part of their spiritual practice to honour the planetary deity and seek peace.",
      "The ceremony is a traditional religious observance that includes the worship of Lord Shiva, Mangal Shanti, Navgraha Shanti, and the concluding Havan — performed in sequence under the guidance of Vedic priests.",
    ],
    templeTitle: "Mangalnath Temple, Ujjain",
    templeBody: "Mangalnath Temple in Ujjain is one of the sites traditionally associated in Hindu tradition with Mangal Graha. Devotees from across India visit the temple for the observance of Mangal-related rituals.",
    disclaimer: "This puja is a traditional religious observance based on scriptural practice and devotional belief. Ishantam does not claim official affiliation with the temple authority unless duly authorised, and no specific outcomes are guaranteed.",
    imageCaption: "Mangalnath Temple, Ujjain · Entrance gateway.",
  },
  benefits: {
    eyebrow: "Twenty-one",
    titlePre: "Traditional blessings associated with",
    titleItalic: "Mangal Shanti Puja.",
    intro: "The following are the prayer intentions traditionally cited for this ceremony. They are religious beliefs, not guaranteed outcomes.",
    list: [
      "Land and property acquisition",
      "Wealth and financial prosperity",
      "Blessings for children",
      "Early marriage",
      "Finding a suitable life partner",
      "Fame and recognition",
      "Mangal Dosha Nivaran",
      "Relief from illness",
      "Freedom from enemies",
      "Graha Dosha Nivaran",
      "Prosperity and abundance",
      "Long life",
      "Freedom from debt",
      "Victory over adversaries",
      "Fulfilment of desires",
      "Knowledge and education",
      "Health and well-being",
      "Removal of obstacles",
      "Navgraha harmony",
      "Fulfilment of sacred intentions",
      "Dharma · Artha · Kama · Moksha",
    ],
  },
  rituals: {
    eyebrow: "The Sequence",
    titlePre: "A ceremony rooted in",
    titleItalic: "Vedic tradition.",
    intro: "Eight ritual groups performed in prescribed order, each with its own place in the sacred sequence of Mangal Dosha Shanti.",
    items: [
      { number: "01", title: "Lord Shiva Rudrabhishek with Ganesha and Devi Puja", body: "Opening worship of Lord Shiva, Ganesha, and the Devi, invoking blessings for the ceremony ahead." },
      { number: "02", title: "Varuna Puja & Punyahavachan Kalash Puja", body: "Ceremonial purification and consecration of the sacred waters that will be used throughout the puja." },
      { number: "03", title: "Shodash Matrika, Sapta Ghrita Matrika & Kuldevi Puja", body: "Veneration of the sixteen Matrika mothers, the seven Ghrita Matrikas, and the family's Kuldevi." },
      { number: "04", title: "Nandi Shraddha & Pitru Puja", body: "Offerings in remembrance of ancestors, invoking their blessings for the devotee's intentions." },
      { number: "05", title: "Brahmin Varan Puja", body: "The formal invitation and honouring of the officiating priests who will conduct the ceremony." },
      { number: "06", title: "Mangal Shanti Kalash Puja & Bhat Puja", body: "The core Mangal Shanti ritual with Kalash and the traditional Bhat offering central to Mangal Dosha nivaran." },
      { number: "07", title: "Navgraha Shanti Puja & Rudra Kalash Puja", body: "Pacification prayers for the nine planetary deities and consecration of the Rudra Kalash." },
      { number: "08", title: "Dashansh Havan", body: "The concluding Havan — one-tenth of the chanted mantras offered into the sacred fire to complete the ceremony." },
    ],
    imageCaption: "Representative photograph of a Vedic ritual.",
  },
  steps: {
    eyebrow: "Booking",
    titlePre: "Your puja, arranged in",
    titleItalic: "five simple steps.",
    items: [
      { number: "01", title: "Enter Your Details",                   body: "Provide your name and contact information to begin." },
      { number: "02", title: "Choose Your Package",                  body: "Select Individual, Couple, or Family Puja." },
      { number: "03", title: "Share Your Name and Gotra",            body: "Provide the required details for the religious ceremony." },
      { number: "04", title: "Confirm Your Booking",                 body: "Review the package details, date, and payment arrangements." },
      { number: "05", title: "Receive Confirmation and Puja Video",  body: "Receive your booking confirmation and, after the ceremony, the recording through WhatsApp." },
    ],
  },
  form: {
    eyebrow: "Registration",
    titlePre: "Register for your",
    titleItalic: "sacred puja.",
    intro: "Share your details, choose a package, and pay securely through Razorpay to confirm your booking.",
    labels: {
      fullName: "Full Name",
      mobile: "Mobile Number",
      whatsapp: "WhatsApp Number",
      sameAsMobile: "Use my mobile number for WhatsApp.",
      gotra: "Gotra",
      gotraOptional: "(optional)",
      pkg: "Package",
      members: "Number of Family Members",
      notes: "Additional Puja-Related Questions",
      notesOptional: "(optional)",
      agree: "I agree to the Terms & Conditions and Privacy Policy. I understand that this is a traditional religious observance and no specific outcomes are guaranteed.",
      submit: "Book now",
      submitting: "Opening payment…",
      submitFootnote: "Your booking is confirmed after successful payment verification.",
    },
    errors: {
      fullName: "Please share your full name.",
      mobile: "Please enter a valid mobile number.",
      whatsapp: "Please enter a valid WhatsApp number.",
      members: "How many members will participate?",
      agree: "Please accept the Terms & Privacy to continue.",
      submission: "Something went wrong submitting the form. Please try again, or contact us on WhatsApp.",
    },
    placeholders: { mobile: "+91 98765 43210" },
    success: {
      eyebrow: "Received",
      titlePre: "Thank you for your",
      titleItalic: "intention.",
      bodyEndpoint: "Your details have been received. The Ishantam team will reach out via WhatsApp to confirm the booking, date, and payment arrangements.",
      bodyWhatsApp: "We've opened WhatsApp with your details prefilled. Please send the message to the Ishantam team — your booking will be confirmed over WhatsApp.",
      note: "A booking is only confirmed after the Ishantam team acknowledges the request. Please do not treat this acknowledgement as a confirmed booking.",
    },
  },
  faqs: {
    eyebrow: "Questions",
    titlePre: "Frequently",
    titleItalic: "asked.",
    intro: "Clear answers about the ceremony, participation, and what to expect from the Ishantam booking process.",
    items: [
      { q: "How much does Mangal Dosha Shanti Puja cost?",                     a: `Packages start at ${PRICES.individual} for an individual, ${PRICES.couple} for a couple, and ${PRICES.family} for a family of 5–6 members. The ceremony performed is identical across packages — the difference lies in the number of names and Gotras included in the Sankalp.` },
      { q: "Will the puja be performed using my name and Gotra?",              a: "Yes. The officiating priest performs the Sankalp while reciting your name and Gotra. For couple and family packages, the arrangements for multiple names follow the priest's traditional procedures." },
      { q: "Do I need to be physically present at the temple?",                a: "No. The puja is performed on your behalf by Vedic priests at Mangalnath Temple, Ujjain. You participate through the Sankalp and receive a video recording of the ceremony." },
      { q: "Will I receive a video of my puja?",                                a: "Yes. A recording of the ceremony is shared with your registered WhatsApp number, subject to the recording arrangements on the day of the puja." },
      { q: "Is there a puja package available for families?",                   a: `Yes. The Family Puja package covers 5–6 family members for ${PRICES.family}. Name and Gotra arrangements for multiple members follow the priest's procedures.` },
      { q: "Where will the puja be conducted?",                                 a: "The puja is conducted at Mangalnath Temple, Ujjain, Madhya Pradesh — a site traditionally associated with Mangal Graha in Hindu tradition." },
      { q: "Will Mangal Dosha be completely removed after performing this puja?", a: "This puja is a traditional religious ceremony performed according to Vedic scriptures and based on devotional belief. No specific outcomes are guaranteed. Devotees have participated in Mangal Shanti rituals for generations as part of their spiritual practice." },
    ],
  },
  final: {
    eyebrow: "Begin",
    titleTop: "Begin your sacred",
    titleItalic: "Mangal Shanti journey.",
    body: "Participate in the Mangal Dosha Shanti Puja at Mangalnath Temple, Ujjain. Choose your package and arrange for traditional rituals to be performed in your name and Gotra.",
    priceLabels: { individual: "Individual", couple: "Couple", family: "Family" },
    ctaPrimary: "Book Your Puja",
    ctaSecondary: "Contact on WhatsApp",
    devanagari: "॥ जय श्री महामंगल ॥",
  },
  footer: {
    brandBody: "A dedicated facilitator of traditional Vedic puja for devotees across India and abroad. Ishantam arranges ceremonies at Mangalnath Temple, Ujjain, performed in your name and Gotra.",
    explore: "Explore",
    packagesH: "Packages",
    contact: "Contact",
    whatsAppLabel: "Enquire on WhatsApp",
    emailLabel: "Email · to be published",
    phoneLabel: "Phone · to be published",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    refund: "Refund & Cancellation",
    copyright: (y) => `© ${y} Ishantam. All rights reserved.`,
    disclaimer: "The scheduled puja date, availability of priests, temple permissions, ceremony arrangements, and package terms are subject to verification before booking confirmation. Ishantam does not claim official affiliation with Mangalnath Temple unless duly authorised. Religious services are based on traditional beliefs, and no specific outcomes are guaranteed.",
  },
  common: { representative: "Representative", optional: "(optional)" },
};

// ─── Hindi ────────────────────────────────────────────────────────────

const hi: Content = {
  nav: {
    items: [
      { label: "पूजा के बारे में",   href: "#about"    },
      { label: "लाभ",                href: "#benefits" },
      { label: "अनुष्ठान",            href: "#rituals"  },
      { label: "पैकेज",              href: "#packages" },
      { label: "सामान्य प्रश्न",       href: "#faqs"     },
    ],
    cta: "अभी पूजा बुक करें",
  },
  hero: {
    eyebrow: "मंगलनाथ मंदिर · उज्जैन · मध्य प्रदेश",
    invocation: "॥ ॐ अंगारकाय नमः ॥",
    titleTop: "मंगल भात पूजन",
    titleBottom: "एवं दोष निवारण",
    titleItalic: "शांति पूजा।",
    body: "श्रद्धा, आस्था और सनातन परंपरा के साथ Ishantam के माध्यम से मंगल दोष निवारण शांति पूजा में सहभागी बनें। विद्वान पुरोहितों द्वारा निर्धारित धार्मिक विधि के अनुसार पूजा संपन्न की जाएगी। आपका नाम-गोत्र लेकर ब्राह्मण प्रतिनिधि के रूप में संकल्प किया जाएगा और पूजा का वीडियो WhatsApp पर साझा किया जाएगा।",
    priceEyebrow: "पूजा पैकेज अब मात्र",
    priceMain: PRICES.individual,
    priceStrike: STRIKE_PRICE,
    priceSubline: `से शुरू · कपल ${PRICES.couple} · परिवार ${PRICES.family}`,
    ctaPrimary: "अभी पूजा बुक करें",
    ctaSecondary: "WhatsApp पर जानकारी",
    supporting: [
      { label: "स्थान",       value: "मंगलनाथ मंदिर · उज्जैन" },
      { label: "संकल्प",      value: "आपके नाम व गोत्र से" },
      { label: "पुरोहित",     value: "विद्वान पुरोहित" },
      { label: "वीडियो",     value: "WhatsApp पर साझा" },
    ],
    brandNote: "ISHANTAM · देश-विदेश के श्रद्धालुओं के लिए पारंपरिक वैदिक पूजा की व्यवस्था।",
    imageCaption: "मंगलनाथ मंदिर का प्रवेश द्वार · उज्जैन, मध्य प्रदेश।",
    tagLine1: "उज्जैन · अनंत नगरी",
    tagLine2: "उज्जैन",
  },
  inclusions: {
    eyebrow: "पूजा में क्या-क्या शामिल है",
    titlePre: "आपकी श्रद्धा, आपके नाम",
    titleItalic: "से पूजा।",
    intro: "प्रत्येक पूजा श्रद्धा और भक्ति के साथ, पुरोहितों द्वारा निर्धारित पारंपरिक धार्मिक विधि के अनुसार संपन्न की जाती है।",
    items: [
      { number: "०१", title: "आपके नाम और गोत्र से संकल्प",   body: "विद्वान पुरोहितों द्वारा पूजा के दौरान आपके नाम एवं गोत्र का उच्चारण करते हुए निर्धारित धार्मिक विधि के अनुसार संकल्प किया जाएगा।" },
      { number: "०२", title: "आपकी ओर से पूजा संपन्न",        body: "पंडित जी आपके प्रतिनिधि के रूप में निर्धारित पूजा-विधि में बैठकर आपके नाम और गोत्र से पूजा संपन्न करेंगे। व्यक्तिगत संकल्प एवं पूजा की व्यवस्था संबंधित पुरोहित की विधि के अनुसार होगी।" },
      { number: "०३", title: "पूजा का वीडियो WhatsApp पर",      body: "पूजा संपन्न होने के बाद उसका वीडियो आपके WhatsApp नंबर पर साझा किया जाएगा, ताकि आप पूजा के अनुष्ठानों को देख सकें।" },
      { number: "०४", title: "निर्धारित धार्मिक अनुष्ठान",      body: "पैकेज में भगवान गणेश जी एवं माता जी के साथ भगवान शिव जी का अभिषेक, मंगल शांति कुंभ पूजन, भात पूजन, नवग्रह शांति पूजन, रुद्र कलश पूजन और दशांश हवन सहित निर्धारित अनुष्ठान शामिल होंगे।" },
    ],
    imageCaption: "पारंपरिक प्रसाद — पुष्प, मिष्ठान एवं पावन दीप।",
    footnote: "पूजा सामग्री, हवन सामग्री, दक्षिणा तथा अन्य संभावित शुल्क पैकेज में सम्मिलित हैं।",
  },
  packages: {
    eyebrow: "पूजा पैकेज एवं ऑफर",
    titlePre: "अपनी श्रद्धा के अनुसार",
    titleItalic: "पैकेज चुनें।",
    intro: "प्रत्येक पैकेज में वही पारंपरिक पूजा संपन्न होती है — भेद केवल संकल्प में सम्मिलित नाम और गोत्र की संख्या का है।",
    items: [
      { id: "individual", name: "व्यक्तिगत पूजा",  forWhom: "एक श्रद्धालु के लिए",            features: ["एक व्यक्ति के लिए बुकिंग", "नाम और गोत्र से संकल्प", "निर्धारित सामूहिक पूजा में सहभागिता", "पैकेज के अनुसार निर्धारित धार्मिक अनुष्ठान", "पूजा का वीडियो WhatsApp पर"], cta: "व्यक्तिगत पैकेज चुनें" },
      { id: "couple",     name: "कपल पूजा",       forWhom: "पति-पत्नी या दो श्रद्धालुओं के लिए", features: ["दो व्यक्तियों के लिए बुकिंग", "पुरोहित की विधि के अनुसार नाम-गोत्र संकल्प", "पैकेज के अनुसार निर्धारित धार्मिक अनुष्ठान", "पूजा का वीडियो WhatsApp पर"], cta: "कपल पैकेज चुनें" },
      { id: "family",     name: "परिवार पूजा",     forWhom: "5 – 6 पारिवारिक सदस्यों के लिए",   features: ["5 – 6 सदस्यों के परिवार के लिए बुकिंग", "पुरोहित की विधि के अनुसार नाम-गोत्र संकल्प", "पैकेज के अनुसार निर्धारित धार्मिक अनुष्ठान", "पूजा का वीडियो WhatsApp पर"], cta: "परिवार पैकेज चुनें" },
    ],
    footnote: "सभी पैकेजों में शामिल सुविधाओं, प्रति व्यक्ति या परिवार के संकल्प की व्यवस्था तथा अतिरिक्त शुल्क की पुष्टि बुकिंग से पहले की जाएगी।",
    selectedContinue: "चयनित · आगे बढ़ें",
  },
  about: {
    eyebrow: "पूजा के बारे में",
    titlePre: "मंगल शांति की",
    titleItalic: "पवित्र परंपरा।",
    invocation: "॥ श्री मंगलाय नमः ॥",
    paragraphs: [
      "हिंदू ज्योतिषीय मान्यताओं के अनुसार, जन्मकुंडली में मंगल ग्रह की कुछ स्थितियों को मंगल दोष या मांगलिक दोष कहा जाता है। मंगल दोष शांति पूजा पारंपरिक धार्मिक अनुष्ठान है, जिसमें मंगल शांति, भगवान शिव की आराधना, नवग्रह शांति और हवन जैसे अनुष्ठान शामिल हो सकते हैं।",
      "यह अनुष्ठान विद्वान पुरोहितों के मार्गदर्शन में, निर्धारित क्रम से संपन्न किया जाता है।",
    ],
    templeTitle: "मंगलनाथ मंदिर, उज्जैन",
    templeBody: "उज्जैन स्थित मंगलनाथ मंदिर को धार्मिक एवं ज्योतिषीय परंपराओं में मंगल ग्रह से विशेष रूप से संबंधित माना जाता है। इसी कारण अनेक श्रद्धालु यहां मंगल शांति से जुड़े अनुष्ठान कराने आते हैं।",
    disclaimer: "पूजा श्रद्धा और धार्मिक आस्था का विषय है। इससे किसी निश्चित ज्योतिषीय, वैवाहिक, स्वास्थ्य या व्यक्तिगत परिणाम की गारंटी नहीं दी जाती। Ishantam मंदिर की आधिकारिक साझेदारी का दावा केवल संबंधित अनुमति मिलने पर ही करेगा।",
    imageCaption: "मंगलनाथ मंदिर, उज्जैन · मुख्य प्रवेश द्वार।",
  },
  benefits: {
    eyebrow: "इक्कीस",
    titlePre: "मंगल शांति पूजा से जुड़े",
    titleItalic: "पारंपरिक लाभ।",
    intro: "निम्नलिखित प्रार्थना-कामनाएं पारंपरिक रूप से इस अनुष्ठान से जुड़ी हैं। ये धार्मिक मान्यताएँ हैं, कोई गारंटीकृत परिणाम नहीं।",
    list: [
      "भूमि प्राप्ति",
      "धन प्राप्ति",
      "पुत्र प्राप्ति",
      "शीघ्र विवाह",
      "शुभ वर व वधू प्राप्ति",
      "यश प्राप्ति",
      "मंगल दोष निवारण",
      "समस्त रोगों का नाश",
      "शत्रु रहित राज्य",
      "ग्रह दोष निवारण",
      "सम्पूर्ण ऐश्वर्य प्राप्ति",
      "दीर्घ आयु",
      "कर्ज से छुटकारा",
      "शत्रुओं पर पूर्ण विजय",
      "सर्वकामनाओं की प्राप्ति",
      "समस्त विद्या प्राप्ति",
      "पूर्ण आरोग्य",
      "समस्त विघ्न शांति",
      "नवग्रह अनुकूलता",
      "अभीष्ट सिद्धि",
      "धर्म · अर्थ · काम · मोक्ष",
    ],
  },
  rituals: {
    eyebrow: "अनुष्ठान क्रम",
    titlePre: "वैदिक परंपरा में",
    titleItalic: "निहित पूजा।",
    intro: "संबंधित पुरोहित द्वारा निर्धारित विधि के अनुसार निम्नलिखित आठ अनुष्ठान क्रमशः संपन्न किए जाते हैं।",
    items: [
      { number: "०१", title: "भगवान गणेश, माता जी एवं भगवान शिव का रुद्राभिषेक", body: "भगवान शिव, गणेश एवं माता जी की आराधना से पूजा का शुभारंभ।" },
      { number: "०२", title: "वरुण पूजन एवं पुण्याहवाचन कलश पूजन",                 body: "पूजा में प्रयोग होने वाले पवित्र जल का शुद्धिकरण एवं कलश प्रतिष्ठा।" },
      { number: "०३", title: "षोडश मातृका, सप्त घृत मातृका एवं कुलदेवी पूजन",      body: "सोलह मातृकाओं, सप्त घृत मातृकाओं तथा कुलदेवी की आराधना।" },
      { number: "०४", title: "नांदी श्राद्ध एवं पितृ पूजन",                        body: "पितरों के प्रति श्रद्धांजलि एवं उनके आशीर्वाद की कामना।" },
      { number: "०५", title: "ब्राह्मण वरण पूजन",                                    body: "अनुष्ठान संपन्न करने वाले पुरोहितों का विधिवत आमंत्रण एवं सम्मान।" },
      { number: "०६", title: "मंगल शांति कुंभ पूजन एवं भात पूजन",                   body: "कुंभ पूजन सहित मंगल शांति का मुख्य अनुष्ठान एवं पारंपरिक भात अर्पण।" },
      { number: "०७", title: "नवग्रह शांति पूजन एवं रुद्र कलश पूजन",                body: "नवग्रह की शांति हेतु प्रार्थना एवं रुद्र कलश की स्थापना।" },
      { number: "०८", title: "दशांश हवन",                                           body: "समस्त जप का दशांश हवन में अर्पित करके पूजा की पूर्णाहुति।" },
    ],
    imageCaption: "वैदिक अनुष्ठान का प्रतीकात्मक चित्र।",
  },
  steps: {
    eyebrow: "बुकिंग",
    titlePre: "आपकी पूजा —",
    titleItalic: "पाँच सरल चरणों में।",
    items: [
      { number: "०१", title: "अपना विवरण दर्ज करें",            body: "अपना नाम और संपर्क सूचना दर्ज करें।" },
      { number: "०२", title: "अपना पैकेज चुनें",                 body: "व्यक्तिगत, कपल या परिवार पैकेज चुनें।" },
      { number: "०३", title: "नाम एवं गोत्र साझा करें",           body: "धार्मिक अनुष्ठान हेतु आवश्यक विवरण साझा करें।" },
      { number: "०४", title: "अपनी बुकिंग की पुष्टि करें",         body: "पैकेज, तिथि एवं भुगतान व्यवस्था की समीक्षा करें।" },
      { number: "०५", title: "पुष्टि एवं पूजा वीडियो प्राप्त करें", body: "बुकिंग की पुष्टि, तत्पश्चात पूजा के बाद WhatsApp पर वीडियो।" },
    ],
  },
  form: {
    eyebrow: "रजिस्ट्रेशन",
    titlePre: "अपनी पवित्र पूजा के लिए",
    titleItalic: "रजिस्टर करें।",
    intro: "अपना विवरण भरें, पैकेज चुनें और बुकिंग की पुष्टि के लिए Razorpay से सुरक्षित भुगतान करें।",
    labels: {
      fullName: "पूरा नाम",
      mobile: "मोबाइल नंबर",
      whatsapp: "WhatsApp नंबर",
      sameAsMobile: "WhatsApp के लिए मेरे मोबाइल नंबर का उपयोग करें।",
      gotra: "गोत्र",
      gotraOptional: "(यदि ज्ञात हो)",
      pkg: "पैकेज",
      members: "परिवार के सदस्यों की संख्या",
      notes: "पूजा संबंधी अतिरिक्त प्रश्न",
      notesOptional: "(वैकल्पिक)",
      agree: "मैं नियम एवं गोपनीयता नीति से सहमत हूँ। मैं समझता/समझती हूँ कि यह एक पारंपरिक धार्मिक अनुष्ठान है और किसी निश्चित परिणाम की गारंटी नहीं दी जाती।",
      submit: "अभी बुक करें",
      submitting: "भुगतान खुल रहा है…",
      submitFootnote: "सफल भुगतान के सत्यापन के बाद आपकी बुकिंग की पुष्टि होगी।",
    },
    errors: {
      fullName: "कृपया अपना पूरा नाम दर्ज करें।",
      mobile: "कृपया एक मान्य मोबाइल नंबर दर्ज करें।",
      whatsapp: "कृपया एक मान्य WhatsApp नंबर दर्ज करें।",
      members: "कृपया सदस्यों की संख्या दर्ज करें।",
      agree: "आगे बढ़ने के लिए कृपया नियम एवं गोपनीयता नीति स्वीकार करें।",
      submission: "फॉर्म सबमिट करने में कोई समस्या हुई। कृपया पुनः प्रयास करें, या WhatsApp पर संपर्क करें।",
    },
    placeholders: { mobile: "+91 98765 43210" },
    success: {
      eyebrow: "प्राप्त हुआ",
      titlePre: "आपकी श्रद्धा के लिए",
      titleItalic: "धन्यवाद।",
      bodyEndpoint: "आपका विवरण प्राप्त हो गया है। Ishantam की टीम WhatsApp पर संपर्क कर बुकिंग, तिथि एवं भुगतान की पुष्टि करेगी।",
      bodyWhatsApp: "हमने WhatsApp में आपके विवरण के साथ संदेश तैयार किया है। कृपया इसे Ishantam टीम को भेज दें — आपकी बुकिंग WhatsApp पर पुष्ट की जाएगी।",
      note: "बुकिंग की पुष्टि केवल Ishantam टीम द्वारा स्वीकृति के बाद ही होगी। कृपया इस स्वीकृति को बुकिंग की पुष्टि न मानें।",
    },
  },
  faqs: {
    eyebrow: "सामान्य प्रश्न",
    titlePre: "अक्सर पूछे जाने वाले",
    titleItalic: "प्रश्न।",
    intro: "पूजा, सहभागिता एवं Ishantam की बुकिंग प्रक्रिया से जुड़े सामान्य प्रश्नों के स्पष्ट उत्तर।",
    items: [
      { q: "पूजा का मूल्य कितना है?",                                   a: `व्यक्तिगत पैकेज ${PRICES.individual}, कपल पैकेज ${PRICES.couple} और 5–6 सदस्यों के परिवार का पैकेज ${PRICES.family} है। पैकेज में शामिल सुविधाओं की पुष्टि बुकिंग से पहले की जाएगी।` },
      { q: "क्या पूजा मेरे नाम और गोत्र से होगी?",                     a: "हाँ, प्रस्तावित व्यवस्था के अनुसार पुरोहित आपके नाम और गोत्र का उच्चारण करते हुए निर्धारित धार्मिक विधि से संकल्प करेंगे। बुकिंग के समय आवश्यक विवरण साझा करें।" },
      { q: "क्या मुझे पूजा में व्यक्तिगत रूप से उपस्थित होना होगा?",     a: "यह सामूहिक पूजा की व्यवस्था पर निर्भर करेगा। प्रस्तावित सेवा में पुरोहित आपके प्रतिनिधि के रूप में आपके नाम-गोत्र से पूजा संपन्न करेंगे। अपनी उपस्थिति संबंधी आवश्यकता बुकिंग से पहले स्पष्ट कर लें।" },
      { q: "क्या पूजा का वीडियो मिलेगा?",                                a: "पूजा का वीडियो आपके WhatsApp नंबर पर साझा किया जाएगा, आयोजन और रिकॉर्डिंग की व्यवस्था के अधीन।" },
      { q: "क्या परिवार के लिए पैकेज उपलब्ध है?",                       a: `हाँ, 5–6 सदस्यों के परिवार के लिए प्रस्तावित पैकेज ${PRICES.family} है।` },
      { q: "पूजा कहाँ आयोजित होगी?",                                     a: "प्रस्तावित आयोजन स्थल मंगलनाथ मंदिर, उज्जैन, मध्य प्रदेश है। निश्चित तिथि, उपलब्धता एवं मंदिर परिसर में पूजा की अनुमति की पुष्टि के बाद ही बुकिंग सुनिश्चित होगी।" },
      { q: "क्या पूजा से मंगल दोष पूरी तरह समाप्त हो जाएगा?",            a: "पूजा धार्मिक एवं पारंपरिक ज्योतिषीय मान्यताओं पर आधारित है। किसी निश्चित परिणाम की गारंटी नहीं दी जाती।" },
    ],
  },
  final: {
    eyebrow: "शुरुआत",
    titleTop: "अपने नाम और गोत्र से",
    titleItalic: "मंगल शांति पूजा।",
    body: "मंगलनाथ मंदिर, उज्जैन में प्रस्तावित सामूहिक मंगल दोष शांति पूजा के लिए अपना पैकेज चुनें। विद्वान पुरोहितों द्वारा निर्धारित धार्मिक विधि से पूजा संपन्न की जाएगी और पूजा का वीडियो WhatsApp पर साझा किया जाएगा।",
    priceLabels: { individual: "व्यक्तिगत", couple: "कपल", family: "परिवार" },
    ctaPrimary: "अभी पूजा बुक करें",
    ctaSecondary: "WhatsApp पर संपर्क करें",
    devanagari: "॥ जय श्री महामंगल ॥",
  },
  footer: {
    brandBody: "देश-विदेश के श्रद्धालुओं के लिए पारंपरिक वैदिक पूजा की व्यवस्था। Ishantam मंगलनाथ मंदिर, उज्जैन में आपके नाम और गोत्र से पूजा संपन्न कराने की व्यवस्था करता है।",
    explore: "अन्वेषण",
    packagesH: "पैकेज",
    contact: "संपर्क",
    whatsAppLabel: "WhatsApp पर जानकारी",
    emailLabel: "ईमेल · जल्द ही",
    phoneLabel: "फोन · जल्द ही",
    privacy: "गोपनीयता नीति",
    terms: "नियम एवं शर्तें",
    refund: "रिफंड एवं रद्दीकरण",
    copyright: (y) => `© ${y} Ishantam · सर्वाधिकार सुरक्षित।`,
    disclaimer: "आयोजन की तिथि, पुरोहित की उपलब्धता, मंदिर की अनुमति, पूजा की वास्तविक व्यवस्था और पैकेज की शर्तें बुकिंग से पहले सत्यापित की जाएंगी। मंदिर की आधिकारिक साझेदारी का दावा केवल संबंधित अनुमति मिलने पर ही किया जाएगा। पूजा धार्मिक आस्था का विषय है और किसी निश्चित परिणाम की गारंटी नहीं दी जाती।",
  },
  common: { representative: "प्रतीकात्मक", optional: "(वैकल्पिक)" },
};

export const content: Record<Locale, Content> = { en, hi };
