import jointLessPhoto from "@/assets/joint-less-modular-ot.webp.asset.json";
import hplPhoto from "@/assets/hpl-modular-ot.png.asset.json";
import ppgiPhoto from "@/assets/ppgi-modular-ot.png.asset.json";
import glassPhoto from "@/assets/glass-modular-ot.png.asset.json";
import semiPhoto from "@/assets/semi-modular-ot.png.asset.json";
import manifoldPhoto from "@/assets/manifold-room-system.png.asset.json";
import biocladPhoto from "@/assets/bioclad-modular-ot.png.asset.json";
import stainlessPhoto from "@/assets/stainless-steel-modular-ot.png.asset.json";
import icuPhoto from "@/assets/modular-icu.png.asset.json";
import bedHeadPhoto from "@/assets/bed-head-panel-upload.png.asset.json";
import mgpsCopperPhoto from "@/assets/mgps-copper-pipeline.png.asset.json";
import laminar from "@/assets/laminar.webp";
import cssd from "@/assets/cssd.webp";
import scrubPhoto from "@/assets/surgical-scrub-sink-upload.png.asset.json";
import curtainPhoto from "@/assets/cubicle-curtain-tracks-upload.png.asset.json";
import furniture from "@/assets/furniture.webp";
import agss from "@/assets/agss.webp";
import otPendantPhoto from "@/assets/ot-pendant-real.png.asset.json";
import ledLight from "@/assets/led-surgical-light.jpg";
import hermeticDoor from "@/assets/hermetic-door.jpg";
import passBox from "@/assets/pass-box.jpg";

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
  installation?: string[];
  keyword: string; // used for location pages: "{keyword} Manufacturers in {State}"
};

const onRequest: PriceInfo = { type: "on_request" };

export const products: Product[] = [
  {
    slug: "modular-operation-theatre",
    name: "Modular Operation Theatre",
    shortName: "Modular OT",
    category: "Operation Theatre",
    image: jointLessPhoto.url,
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
    image: mgpsCopperPhoto.url,
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
    name: "Cubicle Curtain Tracks",
    shortName: "Cubicle Curtain Tracks",
    category: "Critical Care",
    image: curtainPhoto.url,
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
    name: "Surgical Scrub Sink",
    shortName: "Surgical Scrub Sink",
    category: "Operation Theatre",
    image: scrubPhoto.url,
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
    image: bedHeadPhoto.url,
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
  {
    slug: "ot-pendant",
    name: "OT Pendant",
    shortName: "OT Pendant",
    category: "Operation Theatre",
    image: otPendantPhoto.url,
    keyword: "OT Pendant",
    short: "Ceiling-mounted surgical and anaesthesia pendants that bring medical gases, power and equipment shelves to the operating table.",
    intro: "An OT pendant is a ceiling-mounted supply unit that carries medical gas outlets, electrical sockets, data points and equipment shelves close to the surgical team. It keeps cables and hoses off the floor and positions equipment where the anaesthetist and surgeon need it. Unicare supplies and installs OT pendants as part of modular OT and theatre-upgrade projects.",
    price: { type: "range", from: "₹30,000", to: "₹1 Lakh" },
    features: ["Single-arm, double-arm and fixed-column configurations", "Medical gas outlets as per the hospital gas list", "Electrical sockets and data points", "Equipment shelves, drawers and accessory rails", "Rotation with arm brakes for positioning", "Coordination with ceiling, laminar air flow and surgical light positions"],
    specs: [["Mounting", "Ceiling mounted on a structural support plate"], ["Configuration", "Single arm, double arm or fixed, as specified"], ["Gas outlets", "Number and type selected per project"], ["Electrical", "Sockets and data points selected per project"], ["Accessories", "Shelves, drawers, IV pole, rails as required"]],
    applications: ["Operation theatres (surgical and anaesthesia pendants)", "ICU and critical care beds", "Recovery and pre-operative areas", "Endoscopy and procedure rooms"],
    benefits: ["Clear floor space around the operating table", "Reduced trip hazards from cables and hoses", "Faster equipment positioning between cases", "Easier cleaning of the theatre floor"],
    installation: ["Ceiling structure and support plate are checked before installation", "Pendant position is coordinated with the laminar air flow ceiling and surgical light", "Medical gas and electrical services are routed to the pendant head", "Outlets are tested and the pendant is handed over with user guidance"],
    faqs: [
      { q: "What is the price of an OT pendant in India?", a: "An OT pendant is indicatively ₹30,000 to ₹1 Lakh per unit. The final price depends on single or double arm configuration, the number of gas outlets, sockets and the accessories selected." },
      { q: "What is the difference between a single-arm and a double-arm OT pendant?", a: "A single-arm pendant rotates around one joint and suits smaller theatres or fixed workflows. A double-arm pendant has two articulated arms, giving a wider reach and more positioning flexibility." },
      { q: "Can an OT pendant be installed in an existing theatre?", a: "Usually yes, after checking the ceiling structure, ceiling height and the routing of gas and electrical services." },
    ],
  },
  {
    slug: "led-surgical-light",
    name: "LED Surgical Light",
    shortName: "LED Surgical Light",
    category: "Operation Theatre",
    image: ledLight,
    keyword: "LED Surgical Light",
    short: "Ceiling-mounted LED operating lights in single and double dome options for clear, shadow-reduced illumination of the surgical field.",
    intro: "An LED surgical light (OT light) illuminates the surgical field with bright, low-heat light while reducing shadows from the surgical team. Unicare supplies and installs single-dome and double-dome LED surgical lights for new modular OTs and for upgrades of existing theatres.",
    price: onRequest,
    features: ["Single dome and double dome (main and satellite) options", "LED light source with low radiant heat compared with halogen", "Intensity adjustment from the control panel", "Sterilisable handle for positioning by the surgical team", "Ceiling mounting coordinated with pendants and laminar air flow", "Optional camera or monitor arm where specified"],
    specs: [["Configuration", "Single dome or double dome"], ["Light source", "LED"], ["Mounting", "Ceiling mounted"], ["Controls", "Intensity control on the light or wall panel"], ["Applicable standard", "Manufacturer conformity to IEC 60601-2-41 should be confirmed for the selected model"]],
    applications: ["General and speciality operation theatres", "Day-care surgery", "Minor OT and procedure rooms", "Labour and delivery rooms"],
    benefits: ["Clear visibility of the surgical field", "Less heat at the surgeon's head compared with halogen lights", "Long LED service life with low maintenance", "Easy positioning during surgery"],
    installation: ["Ceiling support and height are verified", "Light position is coordinated with the OT table, pendants and laminar air flow", "Electrical connection, testing of intensity and movement", "User demonstration at handover"],
    faqs: [
      { q: "Single dome or double dome — which surgical light do I need?", a: "Major and speciality theatres commonly use a double-dome light so a second head is available. Minor OTs and procedure rooms often use a single dome. We recommend after reviewing the theatre use." },
      { q: "What standard applies to surgical lights?", a: "IEC 60601-2-41 is the international particular standard for surgical and diagnostic luminaires. Ask for the manufacturer's conformity documentation for the model being supplied." },
      { q: "What is the price of an LED surgical light?", a: "Price depends on dome configuration, light output and features such as camera arms. Share your requirement and we will quote for suitable models." },
    ],
  },
  {
    slug: "hermetic-ot-door",
    name: "Hermetic OT Door",
    shortName: "Hermetic OT Door",
    category: "Operation Theatre",
    image: hermeticDoor,
    keyword: "Hermetic OT Door",
    short: "Hermetically sealed sliding doors for operation theatres that help maintain room pressure and clean conditions.",
    intro: "A hermetic OT door is a sliding door designed to seal against the frame when closed, helping the operation theatre hold its positive pressure and limit air leakage. Unicare supplies and installs manual and automatic hermetic sliding doors as part of modular OT projects.",
    price: onRequest,
    features: ["Sliding operation that saves space and reduces air turbulence", "Perimeter gaskets that press the leaf against the frame when closed", "Manual or automatic (sensor or foot/elbow switch) operation", "Vision panel options", "Finish coordinated with the OT wall panels", "Hands-free opening options for infection control"],
    specs: [["Type", "Single or double leaf sliding"], ["Operation", "Manual or automatic"], ["Seal", "Perimeter gasket seal"], ["Vision panel", "Optional"], ["Size", "Made to the clear opening required"]],
    applications: ["Operation theatres", "Clean rooms and CSSD sterile zones", "ICU and isolation rooms", "Cath labs and procedure rooms"],
    benefits: ["Supports room pressure control", "Hands-free entry for scrubbed staff (automatic option)", "Smooth, cleanable surfaces", "Matches modular OT wall panels"],
    installation: ["Opening size and wall build-up are verified", "Frame and track are fixed and aligned with the wall panels", "Gaskets and closing action are adjusted for sealing", "Automatic operators are wired and tested"],
    faqs: [
      { q: "Why are hermetic doors used in an operation theatre?", a: "They seal against the frame when closed, which helps the theatre hold its pressure difference against corridors and reduces uncontrolled air movement." },
      { q: "Manual or automatic hermetic door?", a: "Automatic doors allow hands-free entry for scrubbed staff. Manual doors cost less and suit lower-traffic rooms. The choice depends on workflow and budget." },
    ],
  },
  {
    slug: "pass-box",
    name: "Pass Box",
    shortName: "Pass Box",
    category: "Hospital Infrastructure",
    image: passBox,
    keyword: "Pass Box",
    short: "Stainless steel pass boxes with interlocked doors for transferring materials between clean and less-clean zones.",
    intro: "A pass box is a wall-mounted transfer chamber with two doors that are interlocked so both cannot be open at the same time. It lets instruments, linen and samples move between an operation theatre, CSSD or lab and the adjoining area without staff walking through. Unicare supplies and installs static and dynamic pass boxes.",
    price: onRequest,
    features: ["Stainless steel construction", "Mechanical or electromagnetic door interlock", "Static (no airflow) and dynamic (with filtered airflow) types", "Optional UV lamp where specified", "Glass vision panels on doors", "Flush fitting with modular OT wall panels"],
    specs: [["Body", "Stainless steel"], ["Type", "Static or dynamic"], ["Interlock", "Mechanical or electromagnetic"], ["Size", "As per material to be transferred"], ["Mounting", "Through-wall"]],
    applications: ["Operation theatre to sterile corridor", "CSSD sterile and non-sterile zones", "Laboratories", "Pharmacy and clean rooms"],
    benefits: ["Reduces movement of staff between zones", "Interlock prevents both doors opening together", "Easy to clean stainless steel surfaces"],
    installation: ["Wall opening is prepared to the pass box size", "Unit is fixed, levelled and sealed to the wall panels", "Interlock (and UV/airflow if fitted) is wired and tested"],
    faqs: [
      { q: "What is the difference between a static and a dynamic pass box?", a: "A static pass box is a sealed chamber without airflow. A dynamic pass box has a fan and filter to supply filtered air inside the chamber and is used where higher cleanliness is needed." },
      { q: "Where is a pass box installed in a hospital?", a: "Typically between the operation theatre and the sterile or dirty corridor, between CSSD zones, and in laboratories and pharmacies." },
    ],
  },
  {
    slug: "modular-icu-nicu",
    name: "Modular ICU",
    shortName: "Modular ICU",
    category: "Critical Care",
    image: icuPhoto.url,
    keyword: "Modular ICU",
    short: "Planning and fit-out of ICU and NICU areas with bed head panels, medical gases, pendants, curtain tracks and cleanable wall finishes.",
    intro: "A modular ICU or NICU fit-out brings together the infrastructure a critical-care bed needs — medical gas outlets, power, bed head panels or pendants, curtain tracks, lighting and cleanable wall and ceiling finishes — in a coordinated layout. Unicare plans and installs this infrastructure for new ICUs, NICUs and upgrades. Medical equipment such as ventilators and monitors is outside this scope unless agreed.",
    price: onRequest,
    features: ["Bed layout and clearance planning", "Bed head panels or ICU pendants", "Medical gas outlets connected to the hospital MGPS", "Ceiling curtain tracks for privacy", "Cleanable wall and ceiling finishes", "Isolation room planning where required", "NICU layouts for incubators and warmers"],
    specs: [["Scope", "Infrastructure fit-out per bed and per area"], ["Gas outlets", "As per hospital gas schedule per bed"], ["Bed services", "Bed head panel or pendant"], ["Finishes", "Selected per project"], ["Bed count", "Planned to your drawings"]],
    applications: ["Medical and surgical ICU", "NICU and PICU", "Cardiac care units", "High dependency units", "Isolation rooms"],
    benefits: ["Coordinated services at every bed", "Layouts planned for staff access and visibility", "Infection-control friendly finishes", "One team for gases, panels and fit-out"],
    installation: ["Review of drawings, bed count and services", "Layout and services coordination with MGPS and electrical", "Installation of panels, pendants, tracks and finishes", "Testing of outlets and handover"],
    faqs: [
      { q: "What does a modular ICU include?", a: "Typically bed head panels or pendants, medical gas outlets, electrical points, curtain tracks and cleanable finishes. The exact scope is agreed per project." },
      { q: "How is a NICU different from an adult ICU?", a: "NICU layouts are planned around incubators, warmers and phototherapy units, with attention to space per cot, gas outlets and parent access. Your clinical team's requirements guide the layout." },
    ],
  },
  {
    slug: "manifold-room-system",
    name: "Manifold Room System",
    shortName: "Manifold Room System",
    category: "Medical Gas Systems",
    image: manifoldPhoto.url,
    keyword: "Manifold Room System",
    short: "Medical gas cylinder manifold systems for centralised hospital gas supply.",
    intro: "A manifold room system connects medical gas cylinders to a hospital's central gas distribution system. The gas type, cylinder capacity, changeover arrangement and installation scope are confirmed for each project.",
    price: onRequest,
    features: ["Cylinder manifold arrangement selected for the project", "Integration with the hospital medical gas pipeline", "Project-specific pressure regulation and monitoring"],
    specs: [["Configuration", "Confirmed against the hospital gas requirements"], ["Capacity", "Selected per project"]],
    applications: ["Hospital medical gas supply rooms", "Medical gas pipeline projects"],
    benefits: ["Centralised cylinder connections", "Organised gas supply infrastructure"],
    faqs: [{ q: "How is a manifold room system selected?", a: "Selection depends on the medical gas, hospital demand, cylinder arrangement and site requirements. Share your requirements for a project-specific proposal." }],
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
  { slug: "joint-less-modular-ot", name: "Joint Less Modular Operation Theatre", menuName: "Joint Less Modular OT", description: "A joint-less modular operation theatre finish planned around the room layout and approved project requirements.", image: jointLessPhoto.url },
  { slug: "hpl-modular-ot", name: "HPL Modular Operation Theatre", menuName: "HPL Modular OT", description: "A modular operation theatre with HPL panel finishes selected to suit the hospital's project requirements.", image: hplPhoto.url },
  { slug: "stainless-steel-modular-ot", name: "Stainless Steel Modular Operation Theatre", menuName: "Stainless Steel Modular OT", description: "A modular OT option with stainless-steel internal surfaces selected around project and cleaning requirements.", image: stainlessPhoto.url },
  { slug: "ppgi-modular-ot", name: "PPGI Modular Operation Theatre", menuName: "PPGI Modular OT", description: "A practical panel-based theatre option configured to the room layout and hospital project scope.", image: ppgiPhoto.url },
  { slug: "hospital-modular-ot", name: "Hospital Modular Operation Theatre", menuName: "Hospital Modular OT", description: "A coordinated operation theatre solution for new hospitals, extensions and theatre upgrades.", image: jointLessPhoto.url },
  { slug: "glass-modular-ot", name: "Glass Modular Operation Theatre", menuName: "Glass Modular OT", description: "A modular theatre option using suitable glass surfaces where specified in the project design.", image: glassPhoto.url },
  { slug: "bioclad-modular-ot", name: "Bioclad Modular Operation Theatre", menuName: "Bioclad Modular OT", description: "A wall-cladding based modular OT option planned to suit the clinical environment and project brief.", image: biocladPhoto.url },
  { slug: "semi-modular-ot", name: "Semi Modular Operation Theatre", menuName: "Semi Modular OT", description: "A selective modular upgrade for hospitals adapting an existing operation theatre within a defined scope.", image: semiPhoto.url },
];

export const getModularOtOption = (slug: string) => modularOtOptions.find((option) => option.slug === slug);

export const priceLabel = (p: PriceInfo) =>
  p.type === "starting" ? `Starting from ₹${p.amount}` : p.type === "range" ? `₹${p.from} – ₹${p.to}` : "Price available on request";
