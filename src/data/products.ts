import modularOt from "@/assets/modular-ot.jpg";
import gas from "@/assets/gas-pipeline.jpg";
import laminar from "@/assets/laminar.jpg";
import cssd from "@/assets/cssd.jpg";
import scrub from "@/assets/scrub-sink.jpg";
import curtain from "@/assets/curtain.jpg";
import furniture from "@/assets/furniture.jpg";
import bhp from "@/assets/bed-head-panel.jpg";
import agss from "@/assets/agss.jpg";

export type Category =
  | "Operation Theatre"
  | "Medical Gas Systems"
  | "Critical Care"
  | "CSSD"
  | "Hospital Furniture"
  | "Hospital Infrastructure";

export const categories: Category[] = [
  "Operation Theatre",
  "Medical Gas Systems",
  "Critical Care",
  "CSSD",
  "Hospital Furniture",
  "Hospital Infrastructure",
];

export type PriceInfo =
  | { type: "on_request" }
  | { type: "starting"; amount: string }
  | { type: "range"; from: string; to: string };

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  category: Category;
  image: string;
  short: string;
  intro: string;
  price: PriceInfo;
  features: string[];
  specs: [string, string][];
  applications: string[];
  benefits: string[];
  faqs: { q: string; a: string }[];
  keyword: string; // used for location pages: "{keyword} Manufacturers in {State}"
};

const onRequest: PriceInfo = { type: "on_request" };

export const products: Product[] = [
  {
    slug: "modular-operation-theatre",
    name: "Modular Operation Theatre",
    shortName: "Modular OT",
    category: "Operation Theatre",
    image: modularOt,
    keyword: "Modular Operation Theatre",
    short: "Complete modular OT design, manufacturing and installation with wall and ceiling panels, laminar airflow, pendants and control systems.",
    intro:
      "A modular operation theatre is a pre-engineered surgical environment built from factory-made wall and ceiling panels, integrated with HVAC, laminar air flow, medical gas, lighting and control systems. Unicare plans, manufactures and installs modular OTs for new hospitals and for upgrades of existing theatres.",
    price: onRequest,
    features: [
      "Wall and ceiling panel system with coved corners for easy cleaning",
      "Laminar air flow ceiling with HEPA filtration",
      "Hermetically sealed sliding doors",
      "Surgeon control panel for temperature, humidity and lighting",
      "Integration of surgical lights, pendants and medical gas outlets",
      "X-ray viewer, storage cabinets and pass box options",
      "Antistatic or seamless flooring options",
    ],
    specs: [
      ["Wall panel material", "Configurable per project (e.g. GI powder coated, SS, HPL)"],
      ["Ceiling", "Panelled ceiling with laminar air flow unit"],
      ["Doors", "Hermetic sliding doors, manual or automatic"],
      ["Control", "Surgeon control panel"],
      ["Size", "Designed to the room dimensions of your project"],
    ],
    applications: ["General surgery", "Orthopaedic OT", "Cardiac OT", "Neuro OT", "Gynaecology & obstetrics", "Day-care surgery"],
    benefits: [
      "Faster installation compared with conventional civil construction",
      "Smooth, non-porous surfaces that support infection control",
      "Easier future upgrades and maintenance",
      "Single-point responsibility from design to handover",
    ],
    faqs: [
      { q: "What is the price of a modular operation theatre?", a: "Modular OT price depends on the room size, panel material, laminar air flow specification, doors, control systems and installation scope. Share your drawings or room size and we will prepare a project-specific quotation." },
      { q: "How long does modular OT installation take?", a: "Timelines depend on project size and site readiness. Our team shares a schedule after the site assessment and technical planning stage." },
      { q: "Can an existing OT be converted into a modular OT?", a: "Yes. Most existing theatres can be upgraded after a site assessment of the room, HVAC and services." },
    ],
  },
  {
    slug: "medical-gas-pipeline-system",
    name: "Medical Gas Pipeline System",
    shortName: "Medical Gas Pipeline",
    category: "Medical Gas Systems",
    image: gas,
    keyword: "Medical Gas Pipeline",
    short: "Centralised oxygen, nitrous oxide, medical air and vacuum distribution with manifolds, alarms, valve boxes and outlets.",
    intro:
      "A Medical Gas Pipeline System (MGPS) delivers oxygen, nitrous oxide, medical air, vacuum and other gases from a central source to wards, ICUs and operation theatres. Unicare supplies and installs complete MGPS from source equipment to terminal outlets.",
    price: onRequest,
    features: ["Copper pipeline distribution", "Manifold and source equipment", "Area valve service units", "Gas alarm panels", "Terminal outlets for wards, ICU and OT", "Testing and commissioning"],
    specs: [["Gases", "O₂, N₂O, medical air, vacuum, others as required"], ["Pipeline", "Medical-grade copper"], ["Outlets", "As per project requirement"], ["Alarms", "Area and master alarm panels"]],
    applications: ["ICU & critical care", "Operation theatres", "Wards", "Emergency departments", "Recovery rooms"],
    benefits: ["Continuous, centralised gas supply", "Reduced cylinder handling in clinical areas", "Monitored pressure with alarms"],
    faqs: [{ q: "What is the cost of a medical gas pipeline?", a: "Cost depends on the number of outlets, gases, pipeline length, source equipment and building layout. We quote after reviewing your drawings." }],
  },
  {
    slug: "agss",
    name: "AGSS (Anaesthetic Gas Scavenging System)",
    shortName: "AGSS",
    category: "Operation Theatre",
    image: agss,
    keyword: "AGSS",
    short: "Safe removal of waste anaesthetic gases from operation theatres to protect surgical staff.",
    intro: "An Anaesthetic Gas Scavenging System (AGSS) collects waste anaesthetic gases from the breathing circuit and safely exhausts them outside the operation theatre, reducing exposure for clinical staff.",
    price: onRequest,
    features: ["Terminal units for OT walls or pendants", "Receiver and transfer system", "Dedicated exhaust plant", "Integration with MGPS"],
    specs: [["Installation", "Wall or pendant mounted terminal units"], ["Plant", "Sized per number of theatres"]],
    applications: ["Operation theatres", "Anaesthesia induction rooms", "Recovery areas"],
    benefits: ["Improved staff safety", "Cleaner OT environment"],
    faqs: [{ q: "What is AGSS?", a: "AGSS stands for Anaesthetic Gas Scavenging System — a system that removes waste anaesthetic gases from the OT." }],
  },
  {
    slug: "cubicle-curtain-system",
    name: "Cubicle Curtain System / ICU Track & Curtain",
    shortName: "Cubicle Curtain System",
    category: "Critical Care",
    image: curtain,
    keyword: "ICU Curtain Track",
    short: "Ceiling-mounted aluminium curtain tracks and hospital curtains for patient privacy in ICUs and wards.",
    intro: "Cubicle curtain systems provide patient privacy and separation in ICUs, wards and emergency areas using ceiling-mounted aluminium tracks and washable hospital-grade curtains.",
    price: onRequest,
    features: ["Aluminium ceiling tracks", "Straight, L and U configurations", "Smooth-gliding runners", "Washable hospital curtains"],
    specs: [["Track", "Aluminium profile"], ["Mounting", "Ceiling or suspended"], ["Curtain", "Fabric options on request"]],
    applications: ["ICU", "Wards", "Emergency", "Day care", "Recovery"],
    benefits: ["Patient privacy", "Flexible layouts", "Easy curtain replacement"],
    faqs: [{ q: "Can tracks be installed in existing wards?", a: "Yes, tracks can be fitted to most existing ceilings after a site check." }],
  },
  {
    slug: "laminar-air-flow",
    name: "Laminar Air Flow",
    shortName: "Laminar Air Flow",
    category: "Operation Theatre",
    image: laminar,
    keyword: "Laminar Air Flow",
    short: "Laminar air flow ceiling systems with HEPA filtration for operation theatres and clean areas.",
    intro: "Laminar air flow systems deliver a unidirectional flow of HEPA-filtered air over the operating zone, helping maintain a clean field during surgery.",
    price: onRequest,
    features: ["HEPA filter modules", "Stainless or powder-coated housing", "Uniform low-turbulence airflow", "Integration with OT HVAC"],
    specs: [["Filtration", "HEPA"], ["Size", "As per OT dimensions"], ["Housing", "SS / powder coated"]],
    applications: ["Operation theatres", "Clean rooms", "IVF labs", "Pharmacy compounding"],
    benefits: ["Clean operating field", "Supports infection control protocols"],
    faqs: [{ q: "What is laminar air flow in an operation theatre?", a: "It is a ceiling-mounted system that sends HEPA-filtered air downward in a steady stream over the surgical area." }],
  },
  {
    slug: "surgical-scrub-sink-station",
    name: "Surgical Scrub Sink Station",
    shortName: "Scrub Sink Station",
    category: "Operation Theatre",
    image: scrub,
    keyword: "Surgical Scrub Sink",
    short: "Stainless steel scrub stations with sensor, elbow or knee-operated taps for pre-surgery hand washing.",
    intro: "Surgical scrub sink stations allow surgical teams to scrub hands-free before procedures. Available in single, double and triple-bay stainless steel configurations.",
    price: onRequest,
    features: ["Stainless steel construction", "Sensor / knee / elbow operation", "1, 2 or 3 bay options", "Splash-reducing design"],
    specs: [["Material", "Stainless steel"], ["Bays", "1 / 2 / 3"], ["Operation", "Sensor, knee or elbow"]],
    applications: ["OT scrub areas", "Labour rooms", "Cath labs"],
    benefits: ["Hands-free hygiene", "Durable, easy to clean"],
    faqs: [{ q: "Which tap operation is best?", a: "Sensor taps are most common in new OTs; knee and elbow operation are reliable non-electric options." }],
  },
  {
    slug: "cssd-systems",
    name: "CSSD Systems",
    shortName: "CSSD Systems",
    category: "CSSD",
    image: cssd,
    keyword: "CSSD System",
    short: "Central Sterile Services Department planning, workflow design and equipment for hospitals.",
    intro: "A Central Sterile Services Department (CSSD) cleans, sterilises and supplies surgical instruments. Unicare supports CSSD planning, zoning and equipment supply for new and existing hospitals.",
    price: onRequest,
    features: ["Workflow and zoning planning", "Sterilisers and washers", "Stainless work tables and racks", "Pass boxes and storage"],
    specs: [["Scope", "Planning, equipment and installation"], ["Zones", "Dirty, clean/assembly, sterile storage"]],
    applications: ["Multispecialty hospitals", "Medical colleges", "Surgical centres"],
    benefits: ["Organised instrument workflow", "Supports infection control"],
    faqs: [{ q: "What is CSSD in a hospital?", a: "It is the department responsible for decontaminating, sterilising and distributing reusable medical devices." }],
  },
  {
    slug: "hospital-furniture",
    name: "Hospital Furniture",
    shortName: "Hospital Furniture",
    category: "Hospital Furniture",
    image: furniture,
    keyword: "Hospital Furniture",
    short: "Beds, lockers, overbed tables, trolleys and ward furniture for new and expanding hospitals.",
    intro: "Unicare supplies hospital furniture for wards, ICUs and OTs — from ICU beds and bedside lockers to instrument trolleys and overbed tables.",
    price: onRequest,
    features: ["ICU and ward beds", "Bedside lockers", "Overbed tables", "Instrument and dressing trolleys"],
    specs: [["Range", "Ward, ICU and OT furniture"], ["Finish", "Powder coated / stainless"]],
    applications: ["New hospitals", "Nursing homes", "Clinics", "ICUs"],
    benefits: ["Complete furnishing from one supplier"],
    faqs: [{ q: "Do you supply furniture for complete hospital projects?", a: "Yes, we can supply furniture packages for full projects. Share your bed count and departments." }],
  },
  {
    slug: "bed-head-panel",
    name: "Bed Head Panel",
    shortName: "Bed Head Panel",
    category: "Critical Care",
    image: bhp,
    keyword: "Bed Head Panel",
    short: "Aluminium bed head panels with integrated gas outlets, power sockets, nurse call and lighting.",
    intro: "Bed head panels bring medical gas outlets, electrical sockets, nurse call and lighting together in one wall-mounted unit above each bed.",
    price: onRequest,
    features: ["Integrated gas outlets", "Electrical and data sockets", "Nurse call provision", "Reading / examination light"],
    specs: [["Profile", "Aluminium"], ["Length", "As per requirement"], ["Configuration", "Customisable per bed"]],
    applications: ["ICU", "HDU", "Wards", "Recovery"],
    benefits: ["Neat, organised bedside services", "Easy cleaning"],
    faqs: [{ q: "Can bed head panels be customised?", a: "Yes — number of outlets, sockets and accessories are configured per project." }],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export type ModularOtOption = {
  slug: string;
  name: string;
  menuName: string;
  description: string;
  image: string;
};

export const modularOtOptions: ModularOtOption[] = [
  { slug: "stainless-steel", name: "Stainless Steel Modular Operation Theatre", menuName: "Stainless Steel Modular OT", description: "A modular OT option with stainless-steel internal surfaces selected around project and cleaning requirements.", image: modularOt },
  { slug: "ppgi", name: "PPGI Modular Operation Theatre", menuName: "PPGI Modular OT", description: "A practical panel-based theatre option configured to the room layout and hospital project scope.", image: modularOt },
  { slug: "hospital", name: "Hospital Modular Operation Theatre", menuName: "Hospital Modular OT", description: "A coordinated operation theatre solution for new hospitals, extensions and theatre upgrades.", image: modularOt },
  { slug: "glass", name: "Glass Modular Operation Theatre", menuName: "Glass Modular OT", description: "A modular theatre option using suitable glass surfaces where specified in the project design.", image: modularOt },
  { slug: "bioclad", name: "Bioclad Modular Operation Theatre", menuName: "Bioclad Modular OT", description: "A wall-cladding based modular OT option planned to suit the clinical environment and project brief.", image: modularOt },
  { slug: "semi-modular", name: "Semi Modular Operation Theatre", menuName: "Semi Modular OT", description: "A selective modular upgrade for hospitals adapting an existing operation theatre within a defined scope.", image: modularOt },
];

export const priceLabel = (p: PriceInfo) =>
  p.type === "starting" ? `Starting from ₹${p.amount}` : p.type === "range" ? `₹${p.from} – ₹${p.to}` : "Price available on request";
