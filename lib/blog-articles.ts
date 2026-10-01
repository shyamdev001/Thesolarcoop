/**
 * Full body content for the 4 real posts from thesolarcoop.in/blog/1-4.
 * Sourced live from the real site and lightly re-organised for an editorial
 * layout (emoji bullets → clean headings/lists/notes) — wording and facts
 * are preserved, nothing invented. Not run through the i18n system: these
 * are large bodies of real-world copy, English-only for now, unlike the
 * rest of the site's UI chrome (which stays bilingual as normal).
 */

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "note"; text: string };

export type Article = {
  slug: string;
  category: string;
  title: string;
  dek: string;
  date: string;
  dateLabel: string;
  readMinutes: number;
  image: string;
  imageAlt: string;
  sourceUrl: string;
  blocks: ArticleBlock[];
};

export const ARTICLES: Article[] = [
  {
    slug: "best-solar-company-in-anand",
    category: "Solar Guide",
    title: "Best Solar Company in Anand — How to Choose the Right One",
    dek: "With rising electricity costs and attractive government subsidies, rooftop solar is becoming a smart investment for homeowners and businesses in Anand.",
    date: "2026-05-10",
    dateLabel: "10 May 2026",
    readMinutes: 5,
    image: "/assets/img/installer-portrait.webp",
    imageAlt: "A Solar Coop installer fastening a panel on a rooftop",
    sourceUrl: "https://www.thesolarcoop.in/blog/1",
    blocks: [
      {
        type: "p",
        text: "But one question matters more than anything else: which is the best solar company in Anand?",
      },
      {
        type: "p",
        text: "The honest answer: there isn't a single “best” company for everyone. The right choice depends on your needs, budget, and the quality of service offered. This guide will help you choose the right solar installer with confidence.",
      },
      { type: "h3", text: "Why going solar in Anand makes sense" },
      {
        type: "p",
        text: "Anand and nearby areas receive strong sunlight throughout the year, making solar highly efficient. With schemes like PM Surya Ghar Muft Bijli Yojana, homeowners can significantly reduce installation costs and enjoy long-term savings.",
      },
      { type: "h3", text: "1. Check experience and track record" },
      { type: "p", text: "A reliable solar company should have:" },
      {
        type: "list",
        items: [
          "Proven installations in Anand or nearby areas",
          "Good customer reviews and testimonials",
          "At least 2–5 years of experience in solar projects",
        ],
      },
      { type: "note", text: "Ask for site visit references before finalising." },
      { type: "h3", text: "2. Verify government approvals" },
      { type: "p", text: "Make sure the company:" },
      {
        type: "list",
        items: [
          "Works with your local DISCOM, like MGVCL",
          "Is familiar with net-metering procedures",
          "Helps with subsidy documentation",
        ],
      },
      { type: "note", text: "This ensures a smooth approval process without delays." },
      { type: "h3", text: "3. Quality of solar components" },
      {
        type: "p",
        text: "Not all solar systems are the same. A good company will offer high-efficiency solar panels, trusted inverters, and a proper mounting structure.",
      },
      { type: "note", text: "Avoid choosing only based on the lowest price — quality matters for 25+ years." },
      { type: "h3", text: "4. Transparent pricing, no hidden costs" },
      {
        type: "p",
        text: "A professional solar installer will provide a clear quotation, break down system cost, subsidy, and savings, and explain the return on investment (ROI).",
      },
      { type: "note", text: "Be cautious of “too cheap” offers — they often compromise on quality." },
      { type: "h3", text: "5. Installation and after-sales support" },
      {
        type: "p",
        text: "This is where many companies fail. Choose a company that offers proper installation with safety standards, system monitoring support, and quick service in case of issues.",
      },
      { type: "note", text: "Solar is a long-term investment — service matters more than sales." },
      { type: "h3", text: "6. Warranty and maintenance" },
      {
        type: "p",
        text: "Check for panel warranty (usually 25 years), inverter warranty (5–10 years), and an installation/workmanship warranty.",
      },
      { type: "note", text: "A reliable company stands behind its work." },
      { type: "h3", text: "Local expertise matters" },
      {
        type: "p",
        text: "A company familiar with Anand and nearby districts like Kheda understands local electricity rules, DISCOM approvals, and roof types and weather conditions. This helps in faster installation and fewer complications.",
      },
      { type: "h3", text: "Common mistakes to avoid" },
      {
        type: "list",
        items: [
          "Choosing the cheapest installer without checking quality",
          "Ignoring after-sales service",
          "Not understanding net-metering policy",
          "Skipping proper documentation",
        ],
      },
      { type: "h3", text: "The bottom line" },
      {
        type: "p",
        text: "The “best” solar company in Anand is the one that offers quality products, transparent pricing, strong local support, and a smooth subsidy and net-metering process. Take your time, compare options, and always prioritise long-term reliability over short-term savings.",
      },
    ],
  },
  {
    slug: "solar-panel-cost-in-gujarat-2026",
    category: "Solar Cost Guide",
    title: "Solar Panel Cost in Gujarat 2026 — Complete Guide",
    dek: "Solar power is becoming the top choice in Gujarat due to rising electricity costs and growing awareness about clean energy. With over 300 days of sunshine a year, the state offers ideal conditions for solar.",
    date: "2026-05-08",
    dateLabel: "08 May 2026",
    readMinutes: 7,
    image: "/assets/img/aerial-commercial-roof.webp",
    imageAlt: "Aerial view of a rooftop solar array",
    sourceUrl: "https://www.thesolarcoop.in/blog/2",
    blocks: [
      {
        type: "p",
        text: "Installing solar panels at home is no longer considered a luxury — it has become a smart long-term investment.",
      },
      { type: "h3", text: "Why more homeowners are choosing solar energy" },
      {
        type: "list",
        items: [
          "Huge savings on electricity bills",
          "Protection from rising electricity prices",
          "Net-metering benefits and export credits",
          "Increased property value",
          "Eco-friendly and sustainable energy generation",
        ],
      },
      { type: "note", text: "Many households can reduce electricity bills by up to 80–90%." },
      { type: "h3", text: "Solar panel cost in Gujarat (2026)" },
      {
        type: "p",
        text: "If you're planning to install a rooftop solar system, the first question is usually: what is the solar panel cost in Gujarat? The answer depends on system size, solar panel brand, inverter type, and installation quality.",
      },
      { type: "h3", text: "Estimated solar system prices" },
      {
        type: "list",
        items: [
          "1 kW system: ₹50,000 – ₹70,000",
          "2 kW system: ₹1,00,000 – ₹1,40,000",
          "3 kW system: ₹1,50,000 – ₹2,10,000",
          "5 kW system: ₹2,60,000 – ₹3,50,000",
          "10 kW system: ₹5,00,000 – ₹7,00,000",
        ],
      },
      { type: "note", text: "Prices may vary depending on panel quality, inverter technology, and rooftop structure." },
      { type: "h3", text: "PM Surya Ghar Muft Bijli Yojana — Gujarat subsidy guide" },
      {
        type: "p",
        text: "The PM Surya Ghar Muft Bijli Yojana is the biggest government scheme supporting residential rooftop solar adoption in India. This subsidy significantly reduces the upfront installation cost for homeowners.",
      },
      { type: "h3", text: "Government subsidy structure" },
      {
        type: "list",
        items: [
          "1 kW system — ₹30,000 subsidy",
          "2 kW system — ₹60,000 subsidy",
          "3 kW to 10 kW systems — up to ₹78,000 subsidy",
        ],
      },
      { type: "note", text: "The subsidy amount is directly transferred to your bank account." },
      { type: "h3", text: "Key highlights" },
      {
        type: "list",
        items: [
          "Applicable only for residential rooftop solar systems",
          "Only available for on-grid systems",
          "Direct benefit transfer (DBT) process",
          "Helps reduce overall installation cost significantly",
        ],
      },
      { type: "h3", text: "Electricity savings with solar" },
      {
        type: "list",
        items: [
          "3 kW solar system → ₹2,500 – ₹4,000/month",
          "5 kW solar system → ₹5,000 – ₹8,000/month",
        ],
      },
      { type: "note", text: "Savings depend on electricity usage and sunlight availability." },
      { type: "h3", text: "Return on investment (ROI)" },
      {
        type: "p",
        text: "Solar systems offer excellent long-term financial returns — an average payback period of 3–5 years, and a solar panel life of 25+ years. After recovering the installation cost, electricity generation becomes almost free for decades.",
      },
      { type: "h3", text: "Types of solar systems" },
      {
        type: "list",
        items: [
          "On-grid solar system — connected with the electricity grid and supports net metering",
          "Off-grid solar system — works with batteries and stores electricity for backup use",
          "Hybrid solar system — a combination of grid connection and battery backup",
        ],
      },
      { type: "note", text: "Government subsidy is mainly available for on-grid residential systems." },
      { type: "h3", text: "Eligibility criteria for solar subsidy" },
      {
        type: "p",
        text: "To apply for the PM Surya Ghar subsidy in Gujarat, you must be a residential electricity consumer with a self-owned property, install through an approved vendor, keep system capacity up to 10 kW, and have a valid Gujarat DISCOM connection.",
      },
      {
        type: "p",
        text: "Not eligible: commercial properties, industrial buildings, and off-grid solar systems.",
      },
      { type: "h3", text: "Documents required" },
      {
        type: "list",
        items: [
          "Latest electricity bill",
          "Aadhaar card",
          "Bank account details",
          "Passport-size photograph",
        ],
      },
      { type: "note", text: "Proper documentation helps avoid delays during approval." },
      { type: "h3", text: "Subsidy application process" },
      {
        type: "list",
        items: [
          "Visit the official portal: pmsuryaghar.gov.in",
          "Register using your electricity connection details",
          "Select your DISCOM",
          "Apply for rooftop solar installation",
          "Choose an approved vendor",
          "Complete the installation process",
          "DISCOM inspection and net-meter installation",
          "Subsidy gets credited directly to your bank account",
        ],
      },
      { type: "h3", text: "Why Gujarat is ideal for solar" },
      {
        type: "p",
        text: "Gujarat is one of the leading solar states in India because of strong sunlight throughout the year, supportive government policies, an easy net-metering process, and high electricity-cost savings potential. This makes rooftop solar highly profitable for homeowners.",
      },
      { type: "h3", text: "How PSSU Mandali makes solar easy" },
      {
        type: "p",
        text: "PSSU Mandali helps homeowners simplify the entire solar journey — from system selection to subsidy support, installation, and approvals, everything is handled professionally. Services include free consultation, site survey, solar system recommendation, documentation support, subsidy assistance, and installation and after-sales support.",
      },
      { type: "h3", text: "Service areas" },
      {
        type: "list",
        items: ["Kheda", "Vadodara", "Ahmedabad", "Panchmahal", "Dahod", "Mahisagar", "Bharuch", "Nearby Gujarat areas"],
      },
      { type: "h3", text: "Final thoughts" },
      {
        type: "p",
        text: "Solar energy is one of the smartest investments for homeowners in Gujarat in 2026. With government subsidies, lower installation costs, and long-term electricity savings, rooftop solar provides both financial and environmental benefits. Choosing the right solar partner ensures better performance, faster approvals, and reliable long-term support.",
      },
    ],
  },
  {
    slug: "solar-installation-anand-kheda-guide",
    category: "Solar Installation Guide",
    title: "Solar Panel Installation in Anand & Kheda Districts — Step-by-Step Guide",
    dek: "Installing solar panels in Anand and Kheda districts is becoming one of the smartest investments for homeowners, farmers, and businesses.",
    date: "2026-05-05",
    dateLabel: "05 May 2026",
    readMinutes: 6,
    image: "/assets/img/crew-installing.webp",
    imageAlt: "The Solar Coop team installing panels on a rooftop rail system",
    sourceUrl: "https://www.thesolarcoop.in/blog/3",
    blocks: [
      {
        type: "p",
        text: "With rising electricity costs and strong government support, solar energy provides long-term savings and energy independence. This guide explains everything about solar installation, system cost, subsidy, and how to get started locally.",
      },
      { type: "h3", text: "Why go solar in Anand and Kheda?" },
      {
        type: "p",
        text: "Anand and Kheda districts receive strong sunlight throughout the year, making them ideal locations for solar power generation.",
      },
      {
        type: "list",
        items: [
          "Reduce electricity bills by up to 80–90%",
          "Government subsidy support available",
          "Low maintenance requirements",
          "Long solar panel lifespan (25+ years)",
          "Eco-friendly and sustainable energy source",
        ],
      },
      { type: "h3", text: "Solar panel installation process, step by step" },
      { type: "h3", text: "1. Site survey" },
      {
        type: "p",
        text: "A technician visits your property to check roof size and direction, a shadow-free installation area, your monthly electricity usage, and structural safety.",
      },
      { type: "h3", text: "2. System design" },
      {
        type: "p",
        text: "Based on your electricity needs, the appropriate system size is selected — 1 kW, 2 kW, 3 kW, or 5 kW and above.",
      },
      { type: "h3", text: "3. Subsidy application" },
      { type: "p", text: "The installer helps you apply for the government rooftop solar subsidy scheme." },
      { type: "h3", text: "4. Solar installation" },
      {
        type: "p",
        text: "This includes mounting structure setup, solar panel fitting, inverter installation, and wiring and electrical safety checks.",
      },
      { type: "h3", text: "5. Net-metering setup" },
      { type: "p", text: "A net meter is installed to track imported and exported electricity." },
      { type: "h3", text: "6. System activation" },
      { type: "p", text: "After DISCOM approval, the solar system starts generating electricity." },
      { type: "h3", text: "Solar system cost in Anand and Kheda (2026)" },
      {
        type: "list",
        items: [
          "1 kW system → ₹50,000 – ₹70,000",
          "2 kW system → ₹1,00,000 – ₹1,40,000",
          "3 kW system → ₹1,50,000 – ₹2,10,000",
        ],
      },
      { type: "note", text: "Final pricing may vary based on solar panel brand, inverter type, rooftop structure, and installation quality." },
      { type: "h3", text: "Government subsidy (2026)" },
      {
        type: "p",
        text: "Under the national rooftop solar scheme, subsidy up to ₹78,000 is available, applicable for residential rooftop systems, with the amount directly transferred to your bank account.",
      },
      { type: "h3", text: "Who can install solar?" },
      {
        type: "list",
        items: ["Residential homes", "Farmers and rural households", "Shops and small businesses", "Schools and institutions", "Commercial properties"],
      },
      { type: "h3", text: "Choosing the right solar installer in Anand and Kheda" },
      { type: "p", text: "Before selecting a solar company, check:" },
      {
        type: "list",
        items: [
          "Local installation experience",
          "Quality of solar panels and inverter",
          "Warranty coverage",
          "Subsidy and documentation support",
          "After-sales service availability",
        ],
      },
      { type: "h3", text: "Solar maintenance tips" },
      {
        type: "list",
        items: [
          "Clean panels every 15–20 days",
          "Check wiring and connections annually",
          "Monitor electricity generation regularly",
        ],
      },
      { type: "h3", text: "Is solar worth it in Anand and Kheda?" },
      {
        type: "p",
        text: "Yes — rooftop solar is highly beneficial in these regions. Most solar systems recover their installation cost within a 3–5 year average payback period. After that, the electricity generated is nearly free for decades.",
      },
      { type: "h3", text: "Final thoughts" },
      {
        type: "p",
        text: "Solar panel installation in Anand and Kheda is a future-ready investment for homeowners and businesses. With strong sunlight availability, government subsidy support, and long-term electricity savings, now is the perfect time to switch to solar energy.",
      },
    ],
  },
  {
    slug: "solar-system-cost-anand-district-2026",
    category: "Solar Cost Guide",
    title: "Solar System Cost in Anand District 2026 — Complete Price Guide",
    dek: "If you're planning to install rooftop solar in Anand, understanding the latest solar system cost, subsidy, and savings in 2026 is essential.",
    date: "2026-05-02",
    dateLabel: "02 May 2026",
    readMinutes: 6,
    image: "/assets/img/aerial-farm.webp",
    imageAlt: "Aerial view of a ground-mounted solar array beside farm buildings",
    sourceUrl: "https://www.thesolarcoop.in/blog/4",
    blocks: [
      {
        type: "p",
        text: "This guide gives you a clear and updated breakdown so you can make the right long-term investment decision.",
      },
      { type: "h3", text: "Average solar system cost in 2026 (Anand & Gujarat)" },
      {
        type: "p",
        text: "In 2026, the cost of rooftop solar systems in Gujarat, including Anand district, generally ranges between ₹55,000 and ₹85,000 per kW (complete installation). In many residential cases, systems typically cost ₹40,000 to ₹65,000 per kW, depending on panel quality, inverter type, and installation standards.",
      },
      { type: "h3", text: "System-wise solar price breakdown (2026)" },
      { type: "h3", text: "1 kW solar system" },
      {
        type: "list",
        items: [
          "Price before subsidy → ₹70,000 – ₹1,10,000",
          "Government subsidy → ₹30,000",
          "Final price → ₹40,000 – ₹80,000",
        ],
      },
      { type: "h3", text: "2 kW solar system" },
      {
        type: "list",
        items: [
          "Price before subsidy → ₹1.5 – ₹1.75 lakh",
          "Government subsidy → ₹60,000",
          "Final price → ₹1.1 – ₹1.45 lakh",
        ],
      },
      { type: "h3", text: "3 kW solar system" },
      {
        type: "list",
        items: [
          "Price before subsidy → ₹1.5 – ₹2.5 lakh",
          "Government subsidy → ₹78,000",
          "Final price → ₹1.27 – ₹2.22 lakh",
        ],
      },
      { type: "h3", text: "5 kW solar system" },
      {
        type: "list",
        items: [
          "Price before subsidy → ₹2.8 – ₹3.1 lakh",
          "Government subsidy → ₹78,000",
          "Final price → ₹2.07 – ₹2.32 lakh",
        ],
      },
      {
        type: "note",
        text: "Example: a standard 3 kW rooftop solar system in Gujarat costs around ₹2.05 lakh and can reduce to approximately ₹1.27 lakh after subsidy benefits.",
      },
      { type: "h3", text: "Government subsidy (2026)" },
      {
        type: "p",
        text: "Under the PM Surya Ghar Muft Bijli Yojana: 1 kW system → ₹30,000 subsidy, 2 kW system → ₹60,000 subsidy, 3 kW and above (up to 10 kW) → ₹78,000 subsidy.",
      },
      {
        type: "list",
        items: [
          "Subsidy available only for residential users",
          "Applicable only on on-grid systems",
          "Amount directly credited to your bank account",
        ],
      },
      { type: "h3", text: "Monthly savings in Anand" },
      {
        type: "p",
        text: "A typical 3 kW rooftop solar system generates around 360–400 units a month and saves approximately ₹2,500 – ₹2,800 every month, based on an average electricity tariff of ₹7 per unit.",
      },
      {
        type: "p",
        text: "That means an average payback period of 4–6 years, and a solar system lifespan of 25+ years. After recovering the installation cost, electricity generation becomes almost free for decades.",
      },
      { type: "h3", text: "Quick cost-per-kW summary" },
      {
        type: "list",
        items: [
          "Budget solar system → ₹40,000/kW",
          "Standard solar system → ₹55,000 – ₹70,000/kW",
          "Premium solar system → ₹75,000 – ₹85,000/kW",
        ],
      },
      { type: "h3", text: "Factors that affect solar system cost" },
      {
        type: "p",
        text: "Solar panel quality: premium brands offer better efficiency, higher electricity generation, and longer durability — higher quality usually means a higher upfront cost but better long-term performance.",
      },
      {
        type: "p",
        text: "Inverter type: a string inverter costs less; a hybrid inverter costs more but adds battery support.",
      },
      {
        type: "p",
        text: "Roof type: an RCC roof is standard installation cost; an elevated or sheet roof needs a higher structure cost.",
      },
      {
        type: "p",
        text: "Installation quality: experienced installers may charge slightly more but provide better safety, reliable installation, and long-term support.",
      },
      { type: "h3", text: "On-grid vs off-grid solar cost difference" },
      {
        type: "p",
        text: "On-grid solar: lower installation cost, no battery required, best for cities like Anand. Off-grid solar: higher cost, requires battery backup, suitable for rural or low-power areas.",
      },
      { type: "note", text: "Most homes in Anand prefer on-grid systems with net-metering support." },
      { type: "h3", text: "Common mistakes to avoid" },
      {
        type: "list",
        items: [
          "Choosing the cheapest installer without checking quality",
          "Ignoring subsidy eligibility rules",
          "Not understanding net-metering policy",
          "Installing the wrong system size",
        ],
      },
      { type: "h3", text: "Final thoughts" },
      {
        type: "p",
        text: "Installing rooftop solar in Anand district in 2026 is more affordable than ever because of falling solar prices and strong government subsidy support. Most homes can install solar for around ₹1–2.5 lakh after subsidy, monthly electricity bills can reduce drastically, solar systems provide long-term savings for 25+ years, and payback is usually completed within 4–6 years.",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
