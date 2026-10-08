/**
 * Resource content (compliance overviews and comparisons).
 * General educational overviews only — never a claim that Unicare holds any certification.
 * Facts are limited to what each standard/regulation is and what it broadly covers.
 */
export type Section = { h: string; p: string[]; list?: string[] };
export type Faq = { q: string; a: string };
export type Resource = {
  slug: string;
  title: string; // H1
  metaTitle: string;
  description: string;
  intro: string;
  sections: Section[];
  table?: { head: [string, string, string]; rows: [string, string, string][] };
  faqs: Faq[];
  products: string[]; // related product slugs
};

const disclaimer = "This page is a general overview for planning purposes. It is not legal or regulatory advice. Always refer to the current official text of the standard or regulation and your hospital's accreditation consultant.";
export const complianceDisclaimer = disclaimer;

export const compliance: Resource[] = [
  {
    slug: "nabh-guidelines-modular-ot",
    title: "NABH Guidelines for Modular Operation Theatres – An Overview",
    metaTitle: "NABH Guidelines for Modular OT – Overview | Unicare",
    description: "A general overview of how NABH hospital accreditation relates to operation theatre planning: zoning, air quality, infection control and documentation.",
    intro: "NABH (National Accreditation Board for Hospitals & Healthcare Providers) is India's accreditation body for hospitals. Its standards focus on patient safety and quality of care. Operation theatre design is not accredited on its own, but the way a theatre is planned and maintained supports the hospital in meeting NABH expectations.",
    sections: [
      { h: "What NABH assesses", p: ["NABH accreditation assesses the hospital as a whole — processes, infection control, facility management and patient safety. The theatre is reviewed as part of these chapters, not as a standalone product."] },
      { h: "OT planning points hospitals commonly review", p: ["During planning, hospitals typically discuss the following with their accreditation consultant and engineering team:"], list: ["Zoning of the OT complex (protective, clean, sterile and disposal zones)", "Air changes, filtration and pressure relationships", "Temperature and humidity control", "Cleanable, non-porous wall, ceiling and floor surfaces", "Separate clean and dirty movement paths", "Documentation of validation and maintenance"] },
      { h: "How a modular OT can help", p: ["Factory-made panels with sealed joints and coved corners are easier to clean than plastered walls, and modular construction allows HVAC, laminar air flow and services to be coordinated in one design. The final compliance outcome still depends on hospital processes and validation."] },
      { h: "Important", p: [disclaimer] },
    ],
    faqs: [
      { q: "Does a modular OT make a hospital NABH accredited?", a: "No. NABH accredits the hospital and its processes. A well-planned modular OT can support infection control and facility requirements, but accreditation depends on the full assessment." },
      { q: "Is Unicare NABH certified?", a: "NABH accredits hospitals, not OT suppliers. We plan theatres around the requirements your hospital and consultant share with us." },
    ],
    products: ["modular-operation-theatre", "laminar-air-flow", "hermetic-ot-door"],
  },
  {
    slug: "mgps-standards",
    title: "Medical Gas Pipeline System (MGPS) Standards – An Overview",
    metaTitle: "MGPS Standards Explained – Overview | Unicare",
    description: "An overview of the standards commonly referenced when designing a medical gas pipeline system in India, including ISO 7396-1, HTM 02-01 and NFPA 99.",
    intro: "A Medical Gas Pipeline System (MGPS) supplies oxygen, nitrous oxide, medical air and vacuum to clinical areas. Because patients depend on it, its design, installation and testing are guided by recognised standards. Hospitals and consultants usually specify which standard a project should follow.",
    sections: [
      { h: "Standards commonly referenced", p: ["The following documents are widely referenced for MGPS projects:"], list: ["ISO 7396-1 — international standard for medical gas pipeline systems for compressed medical gases and vacuum", "HTM 02-01 — UK Department of Health technical memorandum on medical gas pipeline systems", "NFPA 99 — US Health Care Facilities Code, which includes gas and vacuum systems", "ISO 9170-1 — terminal units for medical gas pipeline systems"] },
      { h: "What these standards broadly cover", p: ["Although each document differs in detail, they generally address:"], list: ["Source equipment and supply redundancy", "Pipeline materials, cleaning and jointing", "Area valve service units and zoning", "Alarm systems", "Terminal units and gas-specific connections", "Testing, commissioning and documentation"] },
      { h: "Choosing a standard for your project", p: ["The applicable standard is normally set in the hospital's tender or by its consultant. Tell us which standard your project specifies and we will plan the system and its testing accordingly."] },
      { h: "Important", p: [disclaimer] },
    ],
    faqs: [
      { q: "Which MGPS standard is used in India?", a: "Projects in India commonly reference ISO 7396-1, HTM 02-01 or NFPA 99, as specified by the hospital or its consultant." },
      { q: "Why is MGPS testing important?", a: "Testing confirms the pipeline is clean, leak-free, correctly identified and delivering the right gas at each outlet before patients are connected." },
    ],
    products: ["medical-gas-pipeline-system", "agss", "bed-head-panel"],
  },
  {
    slug: "htm-02-01",
    title: "HTM 02-01 for Medical Gas Pipeline Systems – An Overview",
    metaTitle: "HTM 02-01 Medical Gas Guidance – Overview | Unicare",
    description: "What HTM 02-01 is, what it broadly covers for medical gas pipeline systems and why Indian hospital projects sometimes reference it.",
    intro: "HTM 02-01 is a Health Technical Memorandum published by the UK Department of Health on medical gas pipeline systems. It is UK guidance, but hospital projects in other countries, including India, sometimes reference it in their specifications.",
    sections: [
      { h: "Structure", p: ["HTM 02-01 is published in two parts: Part A covers design, installation, validation and verification; Part B covers operational management."] },
      { h: "Topics it addresses", p: ["Broadly, the guidance addresses:"], list: ["Supply sources such as cylinder manifolds, liquid oxygen and compressors", "Pipeline distribution and zoning", "Area valve service units", "Alarm and warning systems", "Terminal units", "Testing, commissioning and permits for work"] },
      { h: "Using HTM 02-01 in India", p: ["Where a tender references HTM 02-01, design and testing are planned to the relevant clauses. Hospitals should confirm the edition specified."] },
      { h: "Important", p: [disclaimer] },
    ],
    faqs: [{ q: "Is HTM 02-01 mandatory in India?", a: "No. It is UK guidance. Indian projects may reference it voluntarily through their specifications." }],
    products: ["medical-gas-pipeline-system"],
  },
  {
    slug: "nfpa-99",
    title: "NFPA 99 Health Care Facilities Code – An Overview",
    metaTitle: "NFPA 99 Health Care Facilities Code – Overview | Unicare",
    description: "A general overview of NFPA 99, the US Health Care Facilities Code, and the medical gas and vacuum topics it covers.",
    intro: "NFPA 99 is the Health Care Facilities Code published by the National Fire Protection Association (USA). It covers several systems in healthcare buildings, including medical gas and vacuum systems, electrical systems and related risk categories.",
    sections: [
      { h: "Relevant chapters for hospital infrastructure", p: ["For hospital infrastructure, the chapters most often referenced are:"], list: ["Gas and vacuum systems", "Electrical systems", "Health care facility risk categories"] },
      { h: "Use in Indian projects", p: ["NFPA 99 is a US code. Some Indian hospitals and consultants reference it for MGPS design and testing. The edition specified in the project documents should be followed."] },
      { h: "Important", p: [disclaimer] },
    ],
    faqs: [{ q: "Does NFPA 99 apply only to fire safety?", a: "No. Despite being published by NFPA, it covers healthcare systems including medical gases, vacuum and electrical systems." }],
    products: ["medical-gas-pipeline-system", "modular-operation-theatre"],
  },
  {
    slug: "iso-13485",
    title: "ISO 13485 Quality Management for Medical Devices – An Overview",
    metaTitle: "ISO 13485 Explained – Medical Device QMS | Unicare",
    description: "What ISO 13485 is, who it applies to and what hospitals can ask suppliers about quality management for medical devices.",
    intro: "ISO 13485 is the international standard for quality management systems for organisations involved in the design, production, installation or servicing of medical devices. It is a management-system standard; it does not certify an individual product.",
    sections: [
      { h: "What it covers", p: ["The standard sets requirements for:"], list: ["Documented quality management processes", "Design and development controls", "Purchasing and supplier control", "Production and traceability", "Handling of complaints and corrective actions"] },
      { h: "What hospitals can ask a supplier", p: ["When buying equipment such as surgical lights or pendants, hospitals can ask for the manufacturer's quality management certificate and the scope it covers. Check that the certificate is current and that its scope includes the product supplied."] },
      { h: "Important", p: [disclaimer] },
    ],
    faqs: [{ q: "Does ISO 13485 certify a product?", a: "No. It certifies an organisation's quality management system. Product safety is addressed by product standards such as the IEC 60601 series." }],
    products: ["led-surgical-light", "ot-pendant"],
  },
  {
    slug: "cdsco-mdr-2017",
    title: "CDSCO and Medical Devices Rules 2017 – An Overview",
    metaTitle: "CDSCO & Medical Devices Rules 2017 – Overview | Unicare",
    description: "A general overview of India's Medical Devices Rules, 2017, the role of CDSCO and the risk-based classification of medical devices.",
    intro: "In India, medical devices are regulated under the Medical Devices Rules, 2017, framed under the Drugs and Cosmetics Act, 1940. The Central Drugs Standard Control Organisation (CDSCO) is the national regulator, with state authorities handling some lower-risk categories.",
    sections: [
      { h: "Risk-based classification", p: ["The rules classify medical devices by risk:"], list: ["Class A — low risk", "Class B — low to moderate risk", "Class C — moderate to high risk", "Class D — high risk"] },
      { h: "What this means for buyers", p: ["Whether a specific item is a notified medical device, and which licence applies, depends on the product and current notifications. Hospitals should ask the supplier or manufacturer for the applicable registration or licence details for each device. Building infrastructure such as wall panels is generally not a medical device, while equipment such as surgical lights may be."] },
      { h: "Important", p: [disclaimer] },
    ],
    faqs: [{ q: "Who regulates medical devices in India?", a: "CDSCO under the Medical Devices Rules, 2017, together with state licensing authorities for certain classes." }],
    products: ["led-surgical-light", "ot-pendant", "modular-icu-nicu"],
  },
  {
    slug: "iec-60601-2-41-surgical-lights",
    title: "IEC 60601-2-41 for Surgical Lights – An Overview",
    metaTitle: "IEC 60601-2-41 Surgical Light Standard | Unicare",
    description: "An overview of IEC 60601-2-41, the particular standard for the safety and performance of surgical and diagnostic luminaires.",
    intro: "IEC 60601-2-41 is part of the IEC 60601 family of medical electrical equipment standards. It sets particular requirements for the basic safety and essential performance of surgical luminaires and luminaires for diagnosis.",
    sections: [
      { h: "Topics it addresses", p: ["The standard addresses performance characteristics of surgical lights such as:"], list: ["Central illuminance and light field size", "Shadow dilution", "Colour rendering and colour temperature", "Limits on radiant energy reaching the surgical field", "Behaviour on single fault, such as failure of a light source"] },
      { h: "What to ask when buying", p: ["Ask the supplier for the manufacturer's test report or declaration of conformity to IEC 60601-2-41 for the specific model, along with its rated illuminance and light-field data."] },
      { h: "Important", p: [disclaimer] },
    ],
    faqs: [{ q: "Is IEC 60601-2-41 only for LED lights?", a: "No. It applies to surgical and diagnostic luminaires regardless of light source." }],
    products: ["led-surgical-light", "modular-operation-theatre"],
  },
];

export const comparisons: Resource[] = [
  {
    slug: "modular-ot-vs-conventional-ot",
    title: "Modular OT vs Conventional OT",
    metaTitle: "Modular OT vs Conventional OT – Comparison | Unicare",
    description: "Compare modular operation theatres with conventional civil-built OTs on cleaning, installation, services integration, upgrades and cost factors.",
    intro: "A conventional OT is built with brick or block walls, plaster and paint or tiles. A modular OT uses factory-made wall and ceiling panels with integrated services. Both can work; the right choice depends on budget, timeline and how the theatre will be used and maintained.",
    table: { head: ["Factor", "Modular OT", "Conventional OT"], rows: [
      ["Wall surface", "Factory-finished panels with sealed joints", "Plaster with paint, tiles or coatings"],
      ["Cleaning", "Smooth, non-porous surfaces, coved corners", "Grout lines and cracks can be harder to clean"],
      ["Site work", "Less wet civil work at site", "More wet work and curing time"],
      ["Services integration", "Planned with HVAC, LAF and gases in one design", "Coordinated separately across trades"],
      ["Future upgrades", "Panels can be opened or replaced", "Usually requires breaking and rebuilding"],
      ["Initial cost", "Generally higher", "Generally lower"],
    ] },
    sections: [{ h: "Which should you choose?", p: ["Hospitals focused on infection control, faster site timelines and easier future upgrades often choose modular OTs. Where budget is the main constraint, a conventional OT with good finishes and HVAC may be chosen. A semi-modular upgrade is a middle path for existing theatres."] }],
    faqs: [{ q: "Is a modular OT more expensive than a conventional OT?", a: "The initial cost is usually higher, but it varies with materials and scope. See the pricing guide for indicative ranges." }],
    products: ["modular-operation-theatre"],
  },
  {
    slug: "puf-vs-hpl-ot-panels",
    title: "PUF vs HPL OT Panels",
    metaTitle: "PUF vs HPL OT Panels – Comparison | Unicare",
    description: "Understand the difference between PUF-insulated panels and HPL (high-pressure laminate) panels used in modular operation theatres.",
    intro: "PUF and HPL describe different things. PUF (polyurethane foam) is an insulating core used inside sandwich panels. HPL (high-pressure laminate) is a decorative, hard-wearing surface sheet. A panel may combine an insulating core with a chosen facing, so the comparison is really about panel construction and finish.",
    table: { head: ["Factor", "PUF sandwich panel", "HPL panel"], rows: [
      ["What it is", "Metal skins (e.g. PPGI/GI) with polyurethane foam core", "Compact or bonded high-pressure laminate sheet"],
      ["Main strength", "Thermal insulation and rigidity", "Hard, decorative, impact-resistant surface"],
      ["Typical use", "Walls and ceilings needing insulation", "Wall cladding where finish and impact resistance matter"],
      ["Joints", "Tongue-and-groove or sealed joints", "Sealed joints with profiles"],
      ["Cost factor", "Depends on skin material and thickness", "Depends on laminate grade and thickness"],
    ] },
    sections: [{ h: "How to decide", p: ["Selection depends on wall build-up, insulation needs, cleaning chemicals used by the hospital, impact zones and budget. We recommend a panel system after reviewing the room and HVAC design."] }],
    faqs: [{ q: "Which panel is best for a modular OT?", a: "There is no single best panel. The choice depends on insulation, durability, cleaning regime and budget for your project." }],
    products: ["modular-operation-theatre"],
  },
  {
    slug: "laf-vs-conventional-hvac",
    title: "Laminar Air Flow vs Conventional HVAC in Operation Theatres",
    metaTitle: "LAF vs Conventional HVAC for OT – Comparison | Unicare",
    description: "How a laminar air flow ceiling differs from conventional mixed-flow HVAC in an operation theatre, and when each is typically used.",
    intro: "Conventional HVAC in an OT mixes supply air with room air through diffusers. A laminar air flow (LAF) system supplies HEPA-filtered air in a unidirectional, low-turbulence flow over the operating table. LAF is usually part of the theatre HVAC design rather than a replacement for it.",
    table: { head: ["Factor", "Laminar air flow", "Conventional HVAC"], rows: [
      ["Air pattern", "Unidirectional downflow over the surgical zone", "Mixed (turbulent) airflow"],
      ["Filtration at terminal", "HEPA filters in the LAF ceiling", "Depends on design; may use HEPA terminals"],
      ["Typical use", "Orthopaedic, joint replacement, cardiac and other speciality OTs", "General areas, minor OTs as specified"],
      ["Cost", "Higher", "Lower"],
    ] },
    sections: [{ h: "Which is needed?", p: ["The requirement depends on the surgical speciality and the hospital's design brief. The HVAC system (air handling unit, ducting, controls) is still needed with LAF to condition and supply air."] }],
    faqs: [{ q: "Does every OT need laminar air flow?", a: "Not necessarily. It is commonly specified for speciality theatres. The hospital's design brief and consultant decide." }],
    products: ["laminar-air-flow", "modular-operation-theatre"],
  },
  {
    slug: "single-arm-vs-double-arm-ot-pendant",
    title: "Single Arm vs Double Arm OT Pendant",
    metaTitle: "Single Arm vs Double Arm OT Pendant | Unicare",
    description: "Compare single-arm and double-arm OT pendants on reach, flexibility, ceiling requirements and cost to choose the right pendant for your theatre.",
    intro: "Both pendant types bring gases, power and equipment shelves to the surgical team from the ceiling. The difference is reach and positioning flexibility.",
    table: { head: ["Factor", "Single arm", "Double arm"], rows: [
      ["Movement", "Rotates around one joint", "Two articulated arms for wider positioning"],
      ["Reach", "Shorter", "Longer"],
      ["Best for", "Smaller OTs, fixed workflows, ICU", "Larger or multi-speciality OTs"],
      ["Ceiling load", "Lower", "Higher — structure must be checked"],
      ["Indicative price", "Lower end of range", "Higher end of range"],
    ] },
    sections: [{ h: "Choosing", p: ["Room size, number of devices, anaesthesia vs surgical side and table position decide the configuration. See the OT pendant page and pricing guide for indicative costs."] }],
    faqs: [{ q: "How much does an OT pendant cost?", a: "Indicatively ₹30,000 to ₹1 Lakh per unit, depending on configuration and accessories." }],
    products: ["ot-pendant"],
  },
  {
    slug: "indian-vs-imported-surgical-lights",
    title: "Indian vs Imported Surgical Lights",
    metaTitle: "Indian vs Imported Surgical Lights – Buying Guide | Unicare",
    description: "Factors to compare when choosing between Indian-made and imported LED surgical lights: performance data, compliance documents, service and spares.",
    intro: "Good and poor surgical lights exist in both categories, so origin alone does not decide quality. A fair comparison looks at documented performance, compliance, service support and total cost.",
    table: { head: ["Factor", "What to check", "Why it matters"], rows: [
      ["Performance data", "Rated illuminance, light field, colour rendering", "Defines what the surgeon actually sees"],
      ["Standards", "IEC 60601-2-41 test report or declaration", "Evidence of safety and performance testing"],
      ["Regulatory", "Applicable CDSCO registration or licence", "Required for notified medical devices in India"],
      ["Service", "Local service team and response time", "Downtime affects theatre schedules"],
      ["Spares", "Availability and lead time of parts", "Imported spares may take longer"],
      ["Cost", "Purchase plus maintenance over life", "Compare total cost, not just price"],
    ] },
    sections: [{ h: "Our approach", p: ["We help hospitals compare suitable models against these factors for their budget and theatre use."] }],
    faqs: [{ q: "Are imported surgical lights always better?", a: "No. Compare documented performance, compliance and local service support for each model rather than origin." }],
    products: ["led-surgical-light"],
  },
];

export const getCompliance = (slug: string) => compliance.find((c) => c.slug === slug);
export const getComparison = (slug: string) => comparisons.find((c) => c.slug === slug);
