// OT component/system pages from the master brief. Content avoids invented specs, counts or certifications.
import { paintingSection, ppgiPanelSection, stainlessPanelSection, type ContentBlock } from "./content-blocks";

export type SystemPage = {
  path: "/modular-ot-wall-panels" | "/modular-ot-ceiling" | "/operation-theatre-hvac-system" | "/hepa-filtration-system-for-operation-theatre" | "/modular-ot-doors" | "/operation-theatre-electrical-system" | "/modular-ot-flooring" | "/ot-accessories" | "/digital-operation-theatre";
  name: string;
  title: string;
  description: string;
  intro: string;
  overview: string[];
  scope: string[];
  considerations: string[];
  faqs: { q: string; a: string }[];
  /** Company-supplied verbatim body; replaces overview/scope/considerations when present. */
  body?: ContentBlock[];
  /** Company-supplied verbatim sections appended after the standard sections, before FAQs. */
  append?: ContentBlock[];
};

export const systemPages: SystemPage[] = [
  {
    path: "/modular-ot-wall-panels",
    name: "Modular OT Wall Panels",
    title: "Modular OT Wall Panels for Operation Theatres | Unicare",
    description: "Modular OT wall panel systems planned around your theatre layout, cleaning needs and integration with doors, pendants, gases and controls. Request a quote.",
    intro: "Wall panel systems that form the clean, jointed inner shell of a modular operation theatre.",
    overview: [],
    scope: [],
    considerations: [],
    faqs: [
      { q: "Which wall panel material should we choose?", a: "It depends on budget, cleaning practice and the clinical use of the room. We discuss the options against your project brief before finalising." },
      { q: "Can panels be fitted into an existing OT?", a: "Often yes, after a site survey confirms room dimensions, wall condition and service routing." },
    ],
    body: [
      { kind: "h2", text: "Choosing the right OT panel" },
      {
        kind: "p",
        text: ["Walls and ceilings decide much of whether an operation theatre can meet NABH requirements, so the panel choice matters. The best panel is the one that balances build quality, budget and what your surgeons need. We usually start with the most economical option that is easy to maintain, and then show premium alternatives if the project calls for them."],
      },
      {
        kind: "p",
        text: ["Every option below is NABH-compliant, resists fungus and bacteria, stands up to OT disinfectants, insulates well (which lowers air-conditioning load and power bills), resists knocks and has good load-bearing strength."],
      },
      {
        kind: "table",
        head: ["Panel type", "Best for", "Typical life", "Cost"],
        rows: [
          ["PPGI / GI sandwich PUF", "Most hospitals; best value", "10–15 years (repaint every 4–5 years)", "Lowest initial and life-cycle cost"],
          ["Stainless steel sandwich PUF", "Hospitals wanting a premium metal finish", "10–15 years or more", "Higher initial cost; similar life-cycle cost"],
          ["Gypsum-backed (SS, PPGI, HPL, glass and more)", "Truly modular, free-standing walls", "10–15 years", "Economical life-cycle cost"],
          ["Graphic-printed (PPGI, SS, HPL, glass)", "A calmer, branded look", "10–15 years", "Economical"],
        ],
      },
      // PPGI and stainless steel panel sections are shared with the OT variant pages.
      ...ppgiPanelSection,
      ...stainlessPanelSection,
      { kind: "h2", text: "Gypsum-backed modular panels" },
      {
        kind: "p",
        text: ["Here the visible face (SS, PPGI, plasticised steel, HPL, SMS, painted SS or glass) is press-fitted onto 12.5 mm gypsum board fixed to a steel frame. The result is a genuinely modular, free-standing wall that can be reconfigured. Graphics can be printed on the back of glass or vinyl using sublimation, laser or UV printing."],
      },
      { kind: "h2", text: "Graphic-printed panels" },
      {
        kind: "p",
        text: ["A printed wall changes how an operating room feels for patients and staff. We print designs digitally (UV, sublimation or laser) on PPGI, SS, HPL or glass panels, without giving up any of the hygiene or durability of a standard panel."],
      },
      ...paintingSection,
    ],
  },
  {
    path: "/modular-ot-ceiling",
    name: "Modular OT Ceiling Systems",
    title: "Modular OT Ceiling Systems | Unicare Medical Solutions",
    description: "Modular OT ceiling systems coordinated with laminar air flow, HEPA terminals, OT lights and pendants for a clean, sealed theatre ceiling. Get a quote.",
    intro: "Sealed ceiling systems coordinated with airflow, lighting and pendant positions above the operating table.",
    overview: [
      "The OT ceiling carries the laminar air flow unit, HEPA terminals, surgical lights, pendants and light fixtures. Its layout has to be agreed early because these items share limited space above the operating zone.",
      "Unicare coordinates the ceiling grid with the airflow and equipment plan so that supports, access points and sealing are planned rather than adjusted on site.",
    ],
    scope: ["Ceiling layout coordinated with the airflow plan", "Openings and supports for laminar flow, OT lights and pendants", "Sealed joints matched to the wall panel system", "Access provisions for maintenance where required", "Installation and alignment on site"],
    considerations: ["Structural slab height and available plenum space", "Weight and mounting of OT lights and pendants", "Position of the laminar air flow canopy", "Return air and duct routing"],
    faqs: [
      { q: "Is the ceiling planned separately from the HVAC?", a: "No. The ceiling, laminar flow and HVAC ducting are planned together so their positions do not clash." },
      { q: "Can surgical lights be mounted on a modular ceiling?", a: "Mounting is planned through proper structural support, confirmed during design for the specific equipment." },
    ],
    append: [
      ...paintingSection,
      { kind: "p", text: ["Compare all panel options on our ", { to: "/modular-ot-wall-panels", label: "OT wall panels page" }, "."] },
    ],
  },
  {
    path: "/operation-theatre-hvac-system",
    name: "Operation Theatre HVAC System",
    title: "Operation Theatre HVAC System Design & Installation | Unicare",
    description: "Operation theatre HVAC systems planned for filtered air supply, pressure control, temperature and humidity as part of a complete modular OT project.",
    intro: "Air handling, ducting and controls that keep the theatre environment within the design conditions set for the project.",
    overview: [
      "The HVAC system is what makes an operation theatre a controlled clean environment. It supplies filtered air, maintains room pressure relative to adjacent areas and holds temperature and humidity at the levels chosen by the clinical team.",
      "Unicare plans HVAC together with the laminar air flow, HEPA filtration, ceiling and room shell, so the air system is designed for the theatre that is actually being built.",
    ],
    scope: ["Requirement study for the theatre and adjoining zones", "Air handling unit selection and duct routing", "Supply, return and exhaust planning", "Pressure, temperature and humidity control planning", "Installation, testing and balancing support"],
    considerations: ["Number of theatres served by each air handling unit", "Space for AHU and duct routes", "Required design conditions agreed with the hospital", "Power availability and backup arrangements"],
    faqs: [
      { q: "Does each OT need a separate air handling unit?", a: "This depends on the hospital's design brief, budget and the theatres involved. We discuss the options during planning." },
      { q: "Can you upgrade HVAC in an existing theatre?", a: "Yes, after a site survey to check space, existing ducting and power supply." },
    ],
    append: [
      { kind: "h2", text: "What an OT HVAC system includes" },
      {
        kind: "p",
        text: ["An operation theatre's air system is a chain of parts that work together to clean, cool and control the air:"],
      },
      {
        kind: "ul",
        items: [
          ["Outdoor unit (ODU) and air handling unit (AHU)"],
          ["Under-deck insulation and aluminium ducting"],
          ["Plenum box with HEPA filters and diffusers (see our ", { to: "/products/laminar-air-flow", label: "laminar air flow page" }, ")"],
          ["Return air ducts and air-balancing dampers"],
          ["Dehumidifier or humidifier"],
          ["A weather shed for the AHU when it is installed outdoors"],
        ],
      },
      { kind: "p", text: ["Plenum boxes are described on their own page. Smaller parts and consumables are quoted separately."] },
      { kind: "h2", text: "Why HVAC selection decides the cost of running an OT" },
      {
        kind: "p",
        text: ["The HVAC system is the part of the OT that most affects running cost. A poorly chosen system uses more electricity and breaks down more often, and each shutdown means cancelled surgeries. Over the years, that can make an OT expensive to run."],
      },
      {
        kind: "p",
        text: ["A well-designed system holds every NABH parameter the theatre is audited on:"],
      },
      {
        kind: "ul",
        items: [
          ["Temperature and controlled humidity"],
          ["Air changes per hour (ACH) and airflow"],
          ["Positive pressure inside the OT and static pressure"],
          ["Particle count and noise level"],
        ],
      },
      {
        kind: "p",
        text: ["When you compare HVAC offers, look beyond the purchase price: fast after-sales response, uptime commitments, spare-part availability and AMC or CMC cover all belong in the life-cycle cost."],
      },
      { kind: "h2", text: "Motorised pressure relief damper (PRD)" },
      {
        kind: "p",
        text: ["A pressure relief damper keeps the OT at its set positive pressure. Manual, gravity or weight-balanced dampers often stick or drift, letting air leak into other areas and putting extra load on the HVAC system. We recommend a motorised PRD: a pressure sensor opens and closes the louvres automatically, so the room stays at the right pressure and temperature without uncontrolled leakage. It is a small component, but it deserves a careful choice."],
      },
      { kind: "h2", text: "OT differential pressure gauge" },
      {
        kind: "p",
        text: ["Mounted flush on the corridor wall beside the OT door, the differential pressure gauge lets surgeons, technicians and infection-control staff confirm before they enter that the theatre is holding positive pressure against the corridor, as NABH requires. It aligns with ASHRAE 170 and ISO 14644-1 cleanroom classes 5 to 8."],
      },
      { kind: "h2", text: "Fire and smoke isolation for the OT" },
      {
        kind: "p",
        text: ["Patients under anaesthesia cannot be moved out quickly. In a fire, the AHU ducts can carry smoke straight into the theatre, and smoke usually reaches people well before flames do. That is why the OT's air supply must be shut off automatically in an emergency."],
      },
      {
        kind: "p",
        text: ["We recommend motorised combination fire and smoke dampers fitted in the supply ducts where they pass through OT walls:"],
      },
      {
        kind: "ul",
        items: [
          ["Ultra-low-leakage design with SS 304 blades that suit a clean environment"],
          ["Linked to the building's fire alarm control panel and the AHU fans"],
          ["When smoke or fire is detected, the fan trips and the damper closes in under 15 seconds, sealing the sterile zone"],
          ["Designed to NBC India 2016 (Part 4), which calls for automatic fire dampers rated for 1.5 to 2 hours, and to NFPA 90A and ASHRAE 170 smoke-containment guidance"],
          ["Hardware tested to UL 555 (fire) and UL 555S (smoke)"],
        ],
      },
      {
        kind: "p",
        text: ["Every hospital is different: duct sizes, wall fire ratings, control wiring and AHU interlocks all need site-specific engineering. Talk to our team to plan fire and smoke isolation for your OT."],
      },
      { kind: "quote-cta" },
    ],
  },
  {
    path: "/hepa-filtration-system-for-operation-theatre",
    name: "HEPA Filtration System for Operation Theatre",
    title: "HEPA Filtration System for Operation Theatre | Unicare",
    description: "HEPA filtration for operation theatres, planned with the laminar air flow and HVAC so filtered air reaches the surgical zone. Request project pricing.",
    intro: "Terminal HEPA filtration planned as part of the theatre air system, not as a stand-alone add-on.",
    overview: [
      "HEPA filters remove fine particles from the air supplied to the theatre. In a modular OT they are usually installed at the terminal point, often within the laminar air flow canopy over the operating table.",
      "Filter housings, sealing and access for replacement are planned with the ceiling and HVAC design so that filtration performs as intended and can be maintained.",
    ],
    scope: ["Filter housing and terminal planning", "Integration with laminar air flow and ceiling", "Pre-filter and fine-filter staging with the HVAC", "Access planning for filter replacement", "Installation and handover"],
    considerations: ["Filtration grade specified for the project", "Airflow volume and coverage area", "Filter replacement access", "Pressure monitoring requirements"],
    faqs: [
      { q: "How often are HEPA filters replaced?", a: "Replacement depends on usage, pre-filter maintenance and pressure readings. Your maintenance team should follow the monitoring plan set at handover." },
      { q: "Is HEPA filtration enough on its own?", a: "No. It works together with the HVAC, pressure control and room sealing to maintain a clean theatre." },
    ],
  },
  {
    path: "/modular-ot-doors",
    name: "Modular OT Doors",
    title: "Modular OT Doors – Hermetic & Sliding Doors | Unicare",
    description: "Modular OT doors including sliding and hinged options, planned with the wall panel system for sealing, clear opening and smooth patient movement.",
    intro: "Theatre doors selected and fitted to match the wall system, room pressure and patient movement.",
    overview: [
      "OT doors need to give enough clear width for trolleys and equipment, seal well against the room shell and support the pressure arrangement of the theatre.",
      "Unicare plans door type, size, view panel and operation together with the wall panels, so frames and seals sit cleanly in the finished room.",
    ],
    scope: ["Door type selection, such as sliding or hinged", "Clear opening sized for trolleys and equipment", "Integration with the wall panel system", "View panel and hardware options as specified", "Installation and adjustment on site"],
    considerations: ["Patient, staff and material flow", "Available wall space for sliding doors", "Manual or automatic operation", "Sealing needs for room pressure"],
    faqs: [
      { q: "Should OT doors be automatic?", a: "Automatic operation is helpful for hands-free movement. The choice depends on workflow and budget, and is decided during design." },
      { q: "Can doors be supplied without a full modular OT?", a: "Discuss your requirement with us; supply scope depends on the existing wall and frame conditions." },
    ],
    append: [
      { kind: "h2", text: "Why sliding doors are preferred" },
      {
        kind: "p",
        text: ["A hinged door swings air in and out every time it opens, which disturbs the theatre's controlled airflow. A sliding door moves along the wall and barely affects it, which is why NABH recommends sliding doors for operating rooms."],
      },
      { kind: "p", text: [{ to: "/products/hermetic-ot-door", label: "See door options and specifications" }] },
    ],
  },
  {
    path: "/operation-theatre-electrical-system",
    name: "Operation Theatre Electrical System",
    title: "Operation Theatre Electrical System & OT Control Panel | Unicare",
    description: "Operation theatre electrical systems including power distribution, lighting, OT control panels and earthing, coordinated with the modular OT build.",
    intro: "Power, lighting and control infrastructure planned around the equipment and staff working inside the theatre.",
    overview: [
      "An operation theatre depends on reliable power for lights, anaesthesia equipment, monitors and pendants. Outlets, distribution and controls have to be placed where the surgical team actually needs them.",
      "Unicare coordinates the electrical layout with the wall panels, pendants and control panel, so wiring is concealed and every point is planned before installation.",
    ],
    scope: ["Electrical layout matched to equipment positions", "Power outlets and distribution within the theatre", "OT lighting and room lighting coordination", "Surgeon control panel integration", "Earthing and installation as per the approved design"],
    considerations: ["Equipment list and power ratings", "Backup power arrangement at the hospital", "Pendant and wall outlet positions", "Applicable electrical codes and hospital standards"],
    faqs: [
      { q: "What does the OT control panel include?", a: "Typical panels bring together timers, room condition displays, lighting and other controls. Exact functions are agreed with the hospital during design." },
      { q: "Is electrical work included in a modular OT project?", a: "It can be. Scope is confirmed in the quotation based on your project." },
    ],
    append: [
      { kind: "h2", text: "Surgeon's control panel (SCP)" },
      {
        kind: "p",
        text: ["The surgeon's control panel puts the theatre's key readings and controls on one wall-mounted unit, so the team can check NABH parameters at a glance. A standard SCP shows and controls:"],
      },
      {
        kind: "ul",
        items: [
          ["Temperature and humidity (against the set level)"],
          ["Differential pressure"],
          ["HEPA filter status (air changes, static pressure and velocity are calculated values)"],
          ["OT light and ambient light selection"],
          ["Day clock and elapsed-time clock for procedures"],
          ["A cleanroom-grade telephone module"],
        ],
      },
      { kind: "p", text: ["Touch-screen and membrane-keypad versions are available."] },
      { kind: "h2", text: "Why the OT needs its own power design" },
      {
        kind: "p",
        text: ["Under BIS SP 30 and IS 17512 in India, and IEC 60364-7-710 internationally, an operation theatre is a Group 2 medical location: life-support equipment is connected to the patient, and a power cut is a direct risk to life."],
      },
      {
        kind: "p",
        text: ["A safe OT power system combines:"],
      },
      {
        kind: "ul",
        items: [
          ["A medical IT system (isolated power supply, IPS)"],
          ["A TN-S earthing system"],
          ["Automatic transfer switching (ATS) and an online UPS"],
          ["Good-quality switchgear, cabling and outlets"],
        ],
      },
      {
        kind: "p",
        text: ["We help design this architecture to meet your local electrical inspectorate's rules, which protects the hospital against shock, fire and equipment failure, and the legal problems that can follow."],
      },
      { kind: "h2", text: "Medical-grade online UPS" },
      {
        kind: "p",
        text: ["A diesel generator takes 10 to 15 seconds to pick up the load after a power cut. An online double-conversion UPS supplies power continuously, with no break, so life-support equipment, surgical lights and patient monitors never switch off. (Standards allow a maximum changeover of 0.5 seconds for this class of equipment; an online UPS meets it with zero break.)"],
      },
      {
        kind: "ul",
        items: [
          ["Handles high inrush currents from electrocautery and mobile C-arms (crest factor 3:1) without voltage dips"],
          ["Clean output (input current distortion THDi below 3%) that keeps ECG and neuro-monitoring screens free of interference"],
          ["Designed around NABH infrastructure guidelines, IS 17512 (Part 1):2021 / IEC 60364-7-710 and CEA regulations"],
        ],
      },
      {
        kind: "table",
        head: ["OT type", "Suggested online UPS"],
        rows: [
          ["Standard OT", "10 kVA"],
          ["Major OT with C-arm", "15–20 kVA"],
          ["Super-speciality OT", "30 kVA, N+1 parallel redundant"],
        ],
      },
      {
        kind: "p",
        text: ["The UPS is a sensitive machine that needs quick local service. We include it here to give you a complete picture of the OT, and recommend buying it locally with proper warranty and service support."],
      },
      { kind: "h2", text: "Medical isolated power system (IPS)" },
      {
        kind: "p",
        text: ["In an ordinary earthed (TN-S) supply, the first insulation fault trips the breaker. In an OT, that means equipment switches off mid-surgery, and a patient under anaesthesia can be exposed to micro-shock. An IPS separates the OT circuits from earth, so the first fault does not cut the power: equipment keeps running and staff are alerted instead."],
      },
      {
        kind: "ul",
        items: [
          ["No tripping on the first fault: power stays on through a first phase-to-earth fault."],
          ["Micro-shock protection: a medical insulation monitoring device (MED-IMD) watches insulation continuously and sounds an audio-visual alarm if resistance falls below 50 kΩ."],
          ["Within the statutory limit: each isolation transformer is kept at 10 kVA or below, which limits leakage current."],
        ],
      },
      {
        kind: "table",
        head: ["OT type", "Suggested IPS"],
        rows: [
          ["Standard OT", "1 × 6.3 kVA or 8 kVA panel"],
          ["Major OT with C-arm", "2 × 8 kVA (vitals and imaging on separate panels)"],
          ["Super-speciality OT", "3 × 8 or 10 kVA (vitals, perfusion and high-load equipment)"],
        ],
      },
      { kind: "h2", text: "Ambient (peripheral) lighting" },
      {
        kind: "p",
        text: ["Ambient lights fill the theatre with even, glare-free light around the surgical light. We use lights from established brands, sealed to IP54 against dust and water, and dimmable from the surgeon's control panel so the team can set the level they need. Because they need service over the years, we recommend certified lights from reputed manufacturers."],
      },
    ],
  },
  {
    path: "/modular-ot-flooring",
    name: "Modular OT Flooring",
    title: "Modular OT Flooring – Anti-Static Vinyl | Unicare",
    description: "Anti-static vinyl flooring for operation theatres, laid on prepared, self-levelled and cured base floors by trained installers. Get a project quote.",
    intro: "Anti-static vinyl flooring for operation theatres, laid over properly prepared and cured base floors.",
    overview: [],
    scope: [],
    considerations: [],
    faqs: [],
    body: [
      { kind: "h2", text: "Why OT flooring must be anti-static" },
      {
        kind: "p",
        text: ["NABH expects the floor inside an operation theatre to be anti-static and conductive, so that static charge cannot build up around sensitive equipment and anaesthetic gases. The flooring material is only half the job; the rest is how it is laid. A floor that lasts without lifting, cracking or bubbling depends on:"],
      },
      {
        kind: "ul",
        items: [
          ["Careful preparation of the base floor"],
          ["A correctly applied self-levelling compound"],
          ["Enough curing time before the vinyl goes down"],
          ["Skilled, experienced installers"],
        ],
      },
      { kind: "h2", text: "Our flooring" },
      {
        kind: "p",
        text: ["We use premium imported vinyl sheets from leading brands with a large, verifiable installed base in India, laid by technicians trained by the manufacturer and equipped with the right tools. For corridors and support rooms, where anti-static properties are not required, we supply standard medical-grade vinyl to the specification you need."],
      },
    ],
  },
  {
    path: "/ot-accessories",
    name: "Operation Theatre Accessories",
    title: "OT Accessories – Storage, X-Ray Viewer, Boards | Unicare",
    description: "Operation theatre accessories: clean utility storage units, LED X-ray film viewers and OT schedule boards, sized to your theatre. Get a quote.",
    intro: "Storage units, X-ray film viewers, schedule boards and the smaller components that complete an operation theatre.",
    overview: [],
    scope: [],
    considerations: [],
    faqs: [],
    body: [
      { kind: "h2", text: "Clean utility storage units" },
      {
        kind: "p",
        text: ["Sterile supplies need to be within reach the moment the team needs them. Storage units are available with an anti-fungal, anti-bacterial painted GI body and glass shelves and doors, in all stainless steel, or in a stainless steel body with glass shelves and doors. Sizes are made to suit your theatre."],
      },
      { kind: "h2", text: "X-ray film viewers" },
      {
        kind: "p",
        text: ["Ultra-slim LED viewers from 25 mm deep, with 7,500 to 10,000 lux brightness, 7,000 K to 10,000 K colour temperature, automatic film sensors and 220–240 V AC operation. The standard viewing area fits a 14\" × 17\" film, with double, triple and four-film versions. The body is powder-coated mild steel or lightweight aluminium, with an acrylic or toughened glass screen."],
      },
      { kind: "h2", text: "OT schedule board" },
      {
        kind: "p",
        text: ["A wall board for the day's operating list, patient IDs and instructions. The writing surface is smooth, scratch-resistant and non-porous (ceramic, laminate, steel or porcelain-enamelled steel) so microbes cannot settle in it. A magnetic backing holds printed lists, colour tags and status markers. The frame is anodised aluminium or SS 304, which resists rust and disinfectants. Sizes from 2 × 3 ft to 4 × 3 ft."],
      },
      { kind: "h2", text: "More OT components" },
      {
        kind: "p",
        text: ["The differential pressure gauge and pressure relief damper are on our ", { to: "/operation-theatre-hvac-system", label: "OT HVAC page" }, ", and the ", { to: "/products/pass-box", label: "pass box" }, " has its own page."],
      },
    ],
  },
  {
    path: "/digital-operation-theatre",
    name: "Digital Operation Theatre",
    title: "Digital OT – Recording, Integration & Streaming | Unicare",
    description: "Digital operation theatre with recording, imaging integration, two-way IP communication and live streaming for teaching, plus an economical BMS option.",
    intro: "Recording, integration and live streaming that connect the operation theatre to the rest of the hospital.",
    overview: [],
    scope: [],
    considerations: [],
    faqs: [],
    body: [
      { kind: "h2", text: "What a digital OT does" },
      {
        kind: "p",
        text: ["A digital OT records audio, video and data from every procedure and connects the theatre to the rest of the hospital. It can:"],
      },
      {
        kind: "ul",
        items: [
          ["Link the OT with imaging systems such as DR, MRI and the cath lab"],
          ["Record patient consent and keep digital records of surgeries"],
          ["Store, retrieve and display cases securely"],
          ["Support two-way communication over IP, including remote consultation with experts"],
          ["Stream live surgery to classrooms and conferences for teaching"],
        ],
      },
      { kind: "h2", text: "An economical alternative" },
      {
        kind: "p",
        text: ["Imported OT integration systems are expensive. We offer an economical digital OT system that works with the hospital's building management system (BMS)."],
      },
    ],
  },
];

// Kept as a function so the shared PPGI section array is not mutated between pages.
import { ppgiPanelSection, stainlessPanelSection } from "./content-blocks";
function ppgiSection(): ContentBlock[] {
  return [...ppgiPanelSection, ...stainlessPanelSection];
}

export const getSystemPage = (path: SystemPage["path"]) => systemPages.find((p) => p.path === path)!;
