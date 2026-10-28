// Centralised content & configuration for the ISHANTAM site.
// Edit prices, copy, WhatsApp number, and endpoint here — nowhere else.

export const brand = {
  name: "ISHANTAM",
  tagline: "Mangal Bhat Puja & Mangal Dosha Shanti Puja at Mangalnath Temple, Ujjain.",
  location: "Mangalnath Temple, Ujjain, Madhya Pradesh",
  // CONFIGURE BEFORE LAUNCH — numeric country-code + number, no spaces.
  // e.g. "919876543210" for +91 98765 43210. Leave empty to disable WhatsApp.
  whatsappNumber: "",
  phone: "",
  email: "",
};

// Public endpoint the booking form POSTs to as JSON.
// Leave undefined and the form will fall back to opening WhatsApp with
// the devotee's details prefilled — no fake "booking confirmed" screen.
export const bookingEndpoint = process.env.NEXT_PUBLIC_BOOKING_ENDPOINT ?? "";

export const navigation = [
  { label: "About the Puja",   href: "#about"   },
  { label: "Benefits",         href: "#benefits" },
  { label: "Rituals",          href: "#rituals" },
  { label: "Packages",         href: "#packages" },
  { label: "FAQs",             href: "#faqs"    },
];

// ─── Packages ──────────────────────────────────────────────────────────
// NOTE: brief flags ₹2,100 vs ₹2,001 for the family package.
// Using ₹2,001 as instructed; change here once confirmed.

export type PackageId = "individual" | "couple" | "family";

export interface PujaPackage {
  id: PackageId;
  name: string;
  price: number;
  priceLabel: string;
  forWhom: string;
  features: string[];
  cta: string;
}

export const packages: PujaPackage[] = [
  {
    id: "individual",
    name: "Individual Puja",
    price: 801,
    priceLabel: "₹801",
    forWhom: "For a single devotee",
    features: [
      "Booking for one individual",
      "Name and Gotra Sankalp",
      "Participation in the scheduled group puja",
      "Prescribed religious rituals",
      "Puja video shared via WhatsApp",
    ],
    cta: "Select Individual Package",
  },
  {
    id: "couple",
    name: "Couple Puja",
    price: 1201,
    priceLabel: "₹1,201",
    forWhom: "For two devotees",
    features: [
      "Booking for two individuals",
      "Name & Gotra per priest's procedures",
      "Prescribed religious rituals",
      "Puja video shared via WhatsApp",
    ],
    cta: "Select Couple Package",
  },
  {
    id: "family",
    name: "Family Puja",
    price: 2001,
    priceLabel: "₹2,001",
    forWhom: "For 5 – 6 family members",
    features: [
      "Booking for 5 – 6 family members",
      "Name & Gotra per priest's procedures",
      "Prescribed religious rituals",
      "Puja video shared via WhatsApp",
    ],
    cta: "Select Family Package",
  },
];

// ─── Section 3 — Inclusions ────────────────────────────────────────────

export const inclusions = [
  {
    number: "01",
    title: "Personalised Sankalp",
    body: "The priest performs the sacred Sankalp while reciting the devotee's name and Gotra.",
  },
  {
    number: "02",
    title: "Puja Performed on Your Behalf",
    body: "The priest represents the devotee during the prescribed group ceremony at Mangalnath Temple.",
  },
  {
    number: "03",
    title: "Puja Video on WhatsApp",
    body: "A recording of the ceremony is shared to the registered WhatsApp number, subject to recording arrangements on the day.",
  },
  {
    number: "04",
    title: "Traditional Vedic Rituals",
    body: "The ceremony includes Mangal Shanti, Bhat Puja, Navgraha Shanti, Rudrabhishek, and the concluding Havan.",
  },
];

// ─── Section 6 — 21 Blessings ──────────────────────────────────────────

export const blessings21 = [
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
];

// ─── Section 7 — Rituals ───────────────────────────────────────────────

export const rituals = [
  {
    number: "01",
    title: "Lord Shiva Rudrabhishek with Ganesha and Devi Puja",
    body: "Opening worship of Lord Shiva, Ganesha, and the Devi, invoking blessings for the ceremony ahead.",
  },
  {
    number: "02",
    title: "Varuna Puja & Punyahavachan Kalash Puja",
    body: "Ceremonial purification and consecration of the sacred waters that will be used throughout the puja.",
  },
  {
    number: "03",
    title: "Shodash Matrika, Sapta Ghrita Matrika & Kuldevi Puja",
    body: "Veneration of the sixteen Matrika mothers, the seven Ghrita Matrikas, and the family's Kuldevi.",
  },
  {
    number: "04",
    title: "Nandi Shraddha & Pitru Puja",
    body: "Offerings in remembrance of ancestors, invoking their blessings for the devotee's intentions.",
  },
  {
    number: "05",
    title: "Brahmin Varan Puja",
    body: "The formal invitation and honouring of the officiating priests who will conduct the ceremony.",
  },
  {
    number: "06",
    title: "Mangal Shanti Kalash Puja & Bhat Puja",
    body: "The core Mangal Shanti ritual with Kalash and the traditional Bhat offering central to Mangal Dosha nivaran.",
  },
  {
    number: "07",
    title: "Navgraha Shanti Puja & Rudra Kalash Puja",
    body: "Pacification prayers for the nine planetary deities and consecration of the Rudra Kalash.",
  },
  {
    number: "08",
    title: "Dashansh Havan",
    body: "The concluding Havan — one-tenth of the chanted mantras offered into the sacred fire to complete the ceremony.",
  },
];

// ─── Section 8 — Steps ─────────────────────────────────────────────────

export const steps = [
  { number: "01", title: "Enter Your Details",                      body: "Provide your name and contact information to begin." },
  { number: "02", title: "Choose Your Package",                     body: "Select Individual, Couple, or Family Puja." },
  { number: "03", title: "Share Your Name and Gotra",               body: "Provide the required details for the religious ceremony." },
  { number: "04", title: "Confirm Your Booking",                    body: "Review the package details, date, and payment arrangements." },
  { number: "05", title: "Receive Confirmation and Puja Video",     body: "Receive your booking confirmation and, after the ceremony, the recording through WhatsApp." },
];

// ─── Section 10 — FAQs ─────────────────────────────────────────────────

export const faqs = [
  {
    q: "How much does Mangal Dosha Shanti Puja cost?",
    a: "Packages start at ₹801 for an individual, ₹1,201 for a couple, and ₹2,001 for a family of 5–6 members. The ceremony performed is identical across packages — the difference lies in the number of names and Gotras included in the Sankalp.",
  },
  {
    q: "Will the puja be performed using my name and Gotra?",
    a: "Yes. The officiating priest performs the Sankalp while reciting your name and Gotra. For couple and family packages, the arrangements for multiple names follow the priest's traditional procedures.",
  },
  {
    q: "Do I need to be physically present at the temple?",
    a: "No. The puja is performed on your behalf by Vedic priests at Mangalnath Temple, Ujjain. You participate through the Sankalp and receive a video recording of the ceremony.",
  },
  {
    q: "Will I receive a video of my puja?",
    a: "Yes. A recording of the ceremony is shared with your registered WhatsApp number, subject to the recording arrangements on the day of the puja.",
  },
  {
    q: "Is there a puja package available for families?",
    a: "Yes. The Family Puja package covers 5–6 family members. Name and Gotra arrangements for multiple members follow the priest's procedures.",
  },
  {
    q: "Where will the puja be conducted?",
    a: "The puja is conducted at Mangalnath Temple, Ujjain, Madhya Pradesh — a site traditionally associated with Mangal Graha in Hindu tradition.",
  },
  {
    q: "Will Mangal Dosha be completely removed after performing this puja?",
    a: "This puja is a traditional religious ceremony performed according to Vedic scriptures and based on devotional belief. No specific outcomes are guaranteed. Devotees have participated in Mangal Shanti rituals for generations as part of their spiritual practice.",
  },
];

// ─── Section 12 — Footer ───────────────────────────────────────────────

export const footerDisclaimer =
  "The scheduled puja date, availability of priests, temple permissions, ceremony arrangements, and package terms are subject to verification before booking confirmation. Ishantam does not claim official affiliation with Mangalnath Temple unless duly authorised. Religious services are based on traditional beliefs, and no specific outcomes are guaranteed.";

// ─── WhatsApp helper ───────────────────────────────────────────────────

export function whatsAppLink(packageName?: string) {
  const base = packageName
    ? `Namaste, I would like to enquire about the Mangal Dosha Shanti Puja at Mangalnath Temple, Ujjain. I am interested in the ${packageName} package. Please share the booking details.`
    : "Namaste, I would like to enquire about the Mangal Dosha Shanti Puja at Mangalnath Temple, Ujjain. Please share the booking details.";
  const encoded = encodeURIComponent(base);
  if (!brand.whatsappNumber) return `https://wa.me/?text=${encoded}`;
  return `https://wa.me/${brand.whatsappNumber}?text=${encoded}`;
}
