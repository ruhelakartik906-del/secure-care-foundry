/**
 * Long-form product page content (requested SEO expansion, Oct 2026).
 * Rules: no invented specs, prices or certifications. Unknown figures are
 * shown as "confirmed per project" and carry a TODO comment for the company.
 */
import { ppgiPanelSection, stainlessPanelSection, type ContentBlock } from "./content-blocks";

export type LongForm = {
  whatTitle?: string;
  what?: string[];
  image?: { src: string; alt: string; w: number; h: number };
  typesTitle?: string;
  typesIntro?: string;
  types?: { name: string; text: string }[];
  specsTitle?: string;
  specs?: [string, string][];
  installTitle?: string;
  install?: string[];
  steps?: string[];
  priceTitle?: string;
  price?: string[];
  priceFactors?: string[];
  /** Company-supplied verbatim body; replaces the standard sections when present. */
  body?: ContentBlock[];
  /** Company-supplied verbatim sections rendered after the standard sections, before FAQs. */
  extra?: ContentBlock[];
  faqs: { q: string; a: string }[];
  related: string[];
};

const perProject = "Confirmed per project";
const timeline = "Shared in writing after the site assessment";

export const productLongForm: Record<string, LongForm> = {
  // TODO(image): confirm the current cubicle curtain photo is a real Unicare installation; replace if not.
  "cubicle-curtain-system": {
    whatTitle: "What Is a Cubicle Curtain System and Where Is It Used?",
    what: [
      "A cubicle curtain system is a ceiling-mounted hospital curtain track with washable curtains that divides a shared clinical space into private patient bays. Hospital curtains are drawn around a bed during examinations, nursing care, procedures and conversations, and pulled back again so staff can see and reach the patient quickly. Unicare supplies and installs hospital curtain track and cubicle curtain systems for new hospitals and for refurbishment of existing wards.",
      "You will find cubicle curtains in ICUs and high dependency units, general and private wards, emergency and triage bays, day-care and dialysis areas, recovery rooms, labour rooms and outpatient examination rooms. In each of these areas the curtain track has to follow the bed layout, leave clearance for bed head panels, lights and ceiling services, and allow curtains to be removed for laundering without tools wherever possible.",
      "A well-planned curtain track layout gives every bed dependable privacy, keeps the ward flexible when bed positions change, and makes it simple for housekeeping to change curtains on the hospital's infection-control schedule.",
    ],
    typesTitle: "Types of Hospital Curtain Track and Curtain Options",
    types: [
      { name: "Straight curtain track", text: "A single straight run, used to screen one side of a bed or to divide a room into two zones." },
      { name: "L-shaped curtain track", text: "Two sides of a bed are screened, typical for beds placed against a wall or at the end of a bay." },
      { name: "U-shaped curtain track", text: "Three sides are screened to create a complete cubicle around a bed in an open ward or ICU." },
      { name: "Ceiling-fixed or suspended track", text: "Tracks are fixed directly to the ceiling or hung on suspension rods where there is a false ceiling or a high slab." },
      { name: "Curtain fabric", text: "Fabric type, colour, mesh top panel and fire-performance requirements are selected with the hospital. Fabric options are offered on request." },
    ],
    specsTitle: "Cubicle Curtain System Specifications",
    specs: [
      ["Track", "Aluminium profile"],
      ["Track shapes", "Straight, L and U configurations"],
      ["Mounting", "Ceiling or suspended"],
      ["Runners", "Smooth-gliding runners"],
      ["Curtain", "Fabric options on request"],
      // TODO(specs): confirm track profile dimensions, bend radius, runner type and curtain fabric/fire rating from the supplier.
      ["Profile size and finish", perProject],
      ["Curtain drop and fabric rating", perProject],
    ],
    installTitle: "Curtain Track Installation and Timeline",
    install: [
      "Installation starts with the ward drawings or a site visit to mark bed positions, ceiling type and any obstructions such as lights, diffusers, sprinklers or pendants. The track route is set out on the ceiling, fixings or suspension rods are installed, tracks and bends are fitted, and runners and curtains are hung and checked for smooth movement.",
      "Hospital curtain tracks can usually be fitted in existing wards after a site check, and work can be phased bay by bay so the ward stays partly in use. The installation timeline depends on the number of beds, ceiling type and site access, and is shared once the site assessment is complete.",
    ],
    // TODO(timeline): add the company's typical installation duration per ward/bed count.
    steps: ["Bed layout and ceiling check", "Track route marking", "Fixing tracks, bends and runners", "Hanging curtains and handover"],
    priceTitle: "Cubicle Curtain Price: What Affects the Cost",
    // TODO(price): add an indicative cubicle curtain / curtain track price range (per running metre or per bed) if the company approves one.
    price: [
      "Cubicle curtain price is quoted per project because it depends on how much track is needed and which curtain fabric is chosen. Share your ward drawings or bed count and we will prepare a quotation.",
    ],
    priceFactors: ["Running length of track and number of bends", "Straight, L or U layout per bed", "Ceiling-fixed or suspended mounting", "Curtain fabric, colour and mesh panel", "Number of spare curtain sets", "Site access and working hours"],
    faqs: [
      { q: "Can tracks be installed in existing wards?", a: "Yes, tracks can be fitted to most existing ceilings after a site check." },
      { q: "What is a cubicle curtain used for in a hospital?", a: "It gives patients privacy around a bed or examination couch in shared areas such as ICUs, wards and emergency bays, while letting staff open the bay quickly when needed." },
      { q: "Which layout do I need: straight, L or U track?", a: "It depends on where the bed sits. A bed against a wall usually needs an L track, a bed in an open bay usually needs a U track, and a straight run is used to screen one side or split a room." },
      { q: "Can hospital curtains be removed for washing?", a: "Yes. Curtains hang from runners so housekeeping can take them down and rehang them for laundering on the hospital's schedule." },
      { q: "How do I get a quote for hospital curtain tracks?", a: "Send the ward drawing or bed count and ceiling type. We confirm the layout and fabric with you and then share a quotation." },
    ],
    related: ["bed-head-panel", "modular-icu-nicu", "hospital-furniture"],
  },

  // TODO(image): confirm the current LED surgical light photo shows a model Unicare supplies; replace with a real product photo if not.
  "led-surgical-light": {
    whatTitle: "What Is an OT Light and Where Is It Used?",
    what: [
      "An OT light, also called an LED surgical light or operating light, is a ceiling-mounted lamp that lights the surgical field brightly while reducing the shadows cast by the surgeon's head and hands. Modern OT lights use LEDs, which give a white light with less radiant heat at the surgeon's head than older halogen lights. Unicare supplies and installs single-dome and double-dome LED OT lights for new modular OTs and for upgrades of existing theatres.",
      "OT lights are used in general and speciality operation theatres, day-care surgery units, minor OTs and procedure rooms, and labour and delivery rooms. The light is positioned using a sterilisable handle, and its intensity can be adjusted on the light head or from a wall control panel.",
      "Because the light is fixed to the ceiling above the operating table, its position has to be planned together with the laminar air flow ceiling, OT pendants and the room's structural support.",
    ],
    typesTitle: "Single Dome vs Double Dome OT Light",
    types: [
      { name: "Single dome OT light", text: "One light head on a ceiling arm. Commonly chosen for minor OTs, procedure rooms and labour rooms." },
      { name: "Double dome OT light", text: "A main and a satellite head on one ceiling mount, so a second light is available for the surgical field. Commonly chosen for major and speciality theatres." },
      { name: "Camera or monitor arm", text: "An optional additional arm can be specified where the theatre needs a camera or display near the field." },
    ],
    specsTitle: "LED Surgical Light Specifications",
    specs: [
      ["Configuration", "Single dome or double dome"],
      ["Light source", "LED"],
      ["Mounting", "Ceiling mounted"],
      ["Controls", "Intensity control on the light or wall panel"],
      ["Handle", "Sterilisable positioning handle"],
      // TODO(specs): add model-specific illuminance (lux), colour temperature, CRI, field diameter and LED life from the manufacturer datasheet.
      ["Illuminance, colour temperature and field size", "As per the selected model's datasheet"],
      ["Applicable standard", "Manufacturer conformity to IEC 60601-2-41 should be confirmed for the selected model"],
    ],
    installTitle: "OT Light Installation and Timeline",
    install: [
      "Before installation we verify the ceiling support and the floor-to-ceiling height, then fix the light position against the operating table, pendants and laminar air flow so the arms can move freely without clashing. The mounting is fixed to the structure, the electrical connection is made, and intensity and arm movement are tested.",
      "At handover the surgical and nursing team is shown how to position the light and adjust intensity. The installation timeline depends on whether the theatre is new or in use and on site readiness, and is confirmed after the site assessment.",
    ],
    // TODO(timeline): add the typical installation duration for one OT light.
    steps: ["Ceiling support and height check", "Position coordinated with table, pendant and LAF", "Electrical connection and testing", "User demonstration at handover"],
    priceTitle: "OT Light Price: What Affects the Cost",
    // TODO(price): add an indicative OT light price range (single and double dome) if the company approves one.
    price: [
      "OT light price depends on the dome configuration, light output and the features chosen. We quote for suitable models once we understand how the theatre will be used.",
    ],
    priceFactors: ["Single dome or double dome", "Light output and field size of the model", "Camera or monitor arm", "Control panel type", "Ceiling height and support work", "Number of theatres in the project"],
    extra: [
      { kind: "h2", text: "Choosing a surgical light" },
      { kind: "p", text: ["For a major OT, if the budget allows, we recommend a premium double-dome LED surgical light. What to look for:"] },
      {
        kind: "ul",
        items: [
          ["Brightness: up to 160,000 lux from each dome"],
          ["Colour temperature: 3,500 K to 4,200 K"],
          ["Light field: 150 mm to 200 mm"],
          ["Low heat at the surgeon's head and minimal shadows"],
          ["Easy positioning of the light heads"],
          ["Optional camera: built into the handle or mounted separately"],
          ["Standards: CE, IEC and ISO"],
        ],
      },
      { kind: "p", text: ["Premium lights cost more at the start, but over their life their total cost can be similar or even lower, thanks to reliability, warranty and service terms. For minor OTs, or where the budget is tight, we also supply economy LED lights with a similar configuration, warranty and AMC or CMC options. They are widely used across India and do the job well, even if they do not match every feature or standard of a premium light."] },
    ],
    faqs: [
      { q: "Single dome or double dome — which surgical light do I need?", a: "Major and speciality theatres commonly use a double-dome light so a second head is available. Minor OTs and procedure rooms often use a single dome. We recommend after reviewing the theatre use." },
      { q: "What standard applies to surgical lights?", a: "IEC 60601-2-41 is the international particular standard for surgical and diagnostic luminaires. Ask for the manufacturer's conformity documentation for the model being supplied." },
      { q: "What is the price of an LED surgical light?", a: "Price depends on dome configuration, light output and features such as camera arms. Share your requirement and we will quote for suitable models." },
      { q: "Why choose an LED OT light instead of halogen?", a: "LED lights give less radiant heat at the surgeon's head and have a long service life with low maintenance compared with halogen lights." },
      { q: "Can an OT light be fitted in an existing theatre?", a: "Usually yes, after checking the ceiling structure, ceiling height and the positions of the pendant and laminar air flow." },
    ],
    related: ["ot-pendant", "laminar-air-flow", "modular-operation-theatre"],
  },

  // TODO(image): replace the hospital furniture photo with a real photo of furniture Unicare supplies, if the current one is not.
  "hospital-furniture": {
    whatTitle: "What Hospital Furniture Includes and Where It Is Used",
    what: [
      "Hospital furniture is the beds, lockers, tables, trolleys and other fittings that wards, ICUs and operation theatres need to care for patients every day. Unicare supplies hospital furniture for new hospitals, expansions and nursing homes, from ICU and ward beds and bedside lockers to overbed tables and instrument trolleys, so the project can be furnished from one supplier.",
      "Furniture is used in almost every clinical area: ICU and ward beds with lockers and overbed tables at each bedside, dressing and instrument trolleys in OTs and procedure rooms, and general furniture in nursing stations and clinics. Choosing it together with the rest of the infrastructure — bed head panels, curtain tracks and medical gas outlets — helps make sure beds fit the bays and services stay within reach.",
      "Furniture for clinical areas should have surfaces that can be cleaned with the hospital's routine disinfectants and be robust enough for constant daily use.",
      "When you plan hospital furniture early, room sizes, door widths and bed bays can be checked against the furniture you intend to buy. This avoids beds that do not fit a bay, trolleys that cannot turn in a corridor, or lockers that block access to bed head panel outlets. We review these points with your team before finalising the schedule.",
    ],
    typesTitle: "Types of Hospital Furniture",
    types: [
      { name: "ICU and ward beds", text: "Beds selected to suit critical-care or general ward use. Bed functions are confirmed for each model." },
      { name: "Bedside lockers", text: "Storage for patient belongings at each bed." },
      { name: "Overbed tables", text: "Tables that slide over the bed for meals, reading and care." },
      { name: "Instrument and dressing trolleys", text: "Mobile trolleys for OTs, procedure rooms and wards." },
      { name: "Finishes", text: "Powder-coated or stainless-steel finishes, chosen by area and budget." },
    ],
    specsTitle: "Hospital Furniture Specifications",
    specs: [
      ["Range", "Ward, ICU and OT furniture"],
      ["Finish", "Powder coated / stainless"],
      // TODO(specs): add the actual product list with model dimensions, bed functions (manual/motorised sections) and load ratings from the supplier catalogue.
      ["Bed functions and dimensions", "As per the selected model"],
      ["Quantities", "Planned to the bed count and departments"],
    ],
    installTitle: "Supply, Installation and Timeline",
    install: [
      "We start with your bed count, departments and room drawings, prepare a furniture schedule for each area, and agree models and finishes with you. Furniture is then supplied, assembled on site where required, placed in each room and checked before handover.",
      "For full hospital projects, delivery can be phased to match the readiness of each floor or department. The supply timeline depends on quantities and the models chosen and is confirmed with the quotation.",
      "After handover, our team can help with additional items or replacements as your wards expand, so new furniture stays consistent with what is already in use.",
    ],
    // TODO(timeline): add typical supply lead time for standard furniture packages.
    steps: ["Bed count and department review", "Furniture schedule and model selection", "Supply and on-site assembly", "Placement and handover"],
    priceTitle: "Hospital Furniture Price: What Affects the Cost",
    // TODO(price): add indicative price ranges for key items (e.g. ICU bed, ward bed) if the company approves them.
    price: [
      "Hospital furniture price depends on the items, models and quantities in your schedule. Share your bed count and departments and we will prepare a package quotation.",
    ],
    priceFactors: ["Type of bed and its functions", "Powder-coated or stainless finish", "Quantities per department", "Accessories per bed", "Delivery location and phasing", "Assembly on site"],
    faqs: [
      { q: "Do you supply furniture for complete hospital projects?", a: "Yes, we can supply furniture packages for full projects. Share your bed count and departments." },
      { q: "What hospital furniture does a ward bed need?", a: "Typically a bed, a bedside locker and an overbed table, with trolleys and other items planned per ward. The final list is agreed with your team." },
      { q: "Powder-coated or stainless steel — which finish is better?", a: "Both are used. Stainless steel is often chosen for OT and procedure-room items, powder-coated finishes for many ward items. The choice depends on area, cleaning routine and budget." },
      { q: "Can furniture be supplied in phases?", a: "Yes. Delivery can be planned floor by floor or department by department to match your project schedule." },
      { q: "How do I get a hospital furniture quotation?", a: "Send your bed count, departments and any preferred items. We prepare a furniture schedule, agree models and finishes with you, and then share a package quotation." },
    ],
    related: ["bed-head-panel", "cubicle-curtain-system", "modular-icu-nicu"],
  },

  // TODO(image): confirm the pass box photo is a real Unicare unit; add separate static and dynamic pass box photos when available.
  "pass-box": {
    whatTitle: "What Is a Pass Box and Where Is It Used?",
    what: [
      "A pass box is a stainless-steel transfer chamber built into a wall, with a door on each side. The two doors are interlocked so that both cannot be open at the same time, which lets instruments, linen, samples and supplies pass between a clean area and the adjoining area without staff walking through or air flowing freely between the two rooms. Unicare supplies and installs both static pass boxes and dynamic pass boxes.",
      "In hospitals, a pass box is typically installed between an operation theatre and the sterile or dirty corridor, between CSSD zones, and in laboratories, pharmacies and clean rooms. It reduces staff movement between zones and supports the room pressure and cleanliness that clean areas depend on.",
      "The size of the pass box is chosen around the largest item that has to pass through it, and the unit is fitted flush with the modular OT wall panels so its surfaces are easy to clean.",
    ],
    typesTitle: "Dynamic Pass Box vs Static Pass Box",
    typesIntro: "The two main types differ in whether air is supplied inside the chamber.",
    types: [
      { name: "Static pass box", text: "A sealed chamber without airflow. It is used where materials only need to move between areas of similar cleanliness, for example between a theatre and a sterile corridor." },
      { name: "Dynamic pass box", text: "Has a fan and filter that supply filtered air inside the chamber. It is used where higher cleanliness is needed during the transfer." },
      { name: "Interlock type", text: "Mechanical or electromagnetic interlock, so only one door can open at a time." },
      { name: "UV lamp option", text: "An optional UV lamp can be specified where the project requires it." },
    ],
    specsTitle: "Pass Box Specifications",
    specs: [
      ["Body", "Stainless steel"],
      ["Type", "Static or dynamic"],
      ["Interlock", "Mechanical or electromagnetic"],
      ["Doors", "Glass vision panels on doors"],
      ["Size", "As per material to be transferred"],
      ["Mounting", "Through-wall"],
      // TODO(specs): add standard sizes, steel grade, filter grade and fan details for the dynamic model from the supplier datasheet.
      ["Steel grade, filter grade and standard sizes", perProject],
    ],
    installTitle: "Pass Box Installation and Timeline",
    install: [
      "The wall opening is prepared to the pass box size, the unit is fixed, levelled and sealed to the wall panels on both sides, and the interlock is wired and tested. For a dynamic pass box, the fan and filter are also checked, and any UV lamp is tested before handover.",
      "In a new modular OT the pass box is planned with the wall panel layout; in an existing room the opening is checked against services in the wall. The timeline is confirmed after the site assessment.",
    ],
    // TODO(timeline): add the typical installation duration for one pass box.
    steps: ["Wall opening prepared to size", "Unit fixed, levelled and sealed", "Interlock wired and tested", "Airflow and UV checked (if fitted)"],
    priceTitle: "Pass Box Price: What Affects the Cost",
    // TODO(price): add indicative static and dynamic pass box price ranges if the company approves them.
    price: [
      "Pass box price depends mainly on the type and size. A dynamic pass box includes a fan and filter, so it is a higher-specification item than a static pass box of the same size.",
    ],
    priceFactors: ["Static or dynamic type", "Internal chamber size", "Mechanical or electromagnetic interlock", "UV lamp option", "Wall type and opening work", "Number of units"],
    extra: [
      { kind: "h2", text: "Why an OT complex needs a pass box" },
      { kind: "p", text: ["An OT with HEPA-filtered air usually works as a Class 100 (ISO 5) clean room. In a complex with several theatres, the space is divided into protected, clean, aseptic (inside the OT) and disposal zones. A pass box (also called a hatch box) lets staff send used instruments, dirty linen and biomedical waste from the theatre to the disposal zone without walking through clean areas, so contamination does not cross over."] },
      { kind: "h2", text: "Features" },
      {
        kind: "ul",
        items: [
          ["Magnetic door interlock: only one door opens at a time"],
          ["Indicator lights for lock status and power"],
          ["IR light inside the chamber"],
          ["LED interior lighting"],
        ],
      },
    ],
    faqs: [
      { q: "What is the difference between a static and a dynamic pass box?", a: "A static pass box is a sealed chamber without airflow. A dynamic pass box has a fan and filter to supply filtered air inside the chamber and is used where higher cleanliness is needed." },
      { q: "Where is a pass box installed in a hospital?", a: "Typically between the operation theatre and the sterile or dirty corridor, between CSSD zones, and in laboratories and pharmacies." },
      { q: "Why are pass box doors interlocked?", a: "The interlock stops both doors opening together, so air and contamination do not pass freely between the two rooms." },
      { q: "What size of pass box do I need?", a: "It depends on the largest item you need to transfer, such as instrument trays or linen. Tell us what will pass through and we will suggest a size." },
    ],
    related: ["cssd-systems", "modular-operation-theatre", "hermetic-ot-door"],
  },

  // TODO(image): confirm the MGPS outlet photo is from a Unicare installation; replace if not.
  "medical-gas-pipeline-system": {
    whatTitle: "What Is a Medical Gas Pipeline System and Where Is It Used?",
    what: [
      "A medical gas pipeline system replaces bedside cylinders with a central supply. Gases are generated or stored at a plant room, distributed through cleaned medical-grade copper pipework and delivered at gas-specific terminal outlets. MGPS in hospital buildings typically serves operation theatres, ICUs, wards, emergency departments and recovery rooms. We plan the system around your bed count, departments and the standard specified in your tender.",
      "With a pipeline system, gas is available at every outlet without moving cylinders through clinical areas, pressure is monitored by alarm panels, and each department can be isolated with zone valves for maintenance or emergencies.",
    ],
    image: { src: "/images/mgps-plant-room.webp", alt: "Medical gas plant room with medical air compressors, vacuum plant and cylinder manifold pipework", w: 1128, h: 716 },
    typesTitle: "MGPS Components and Gas Options",
    typesIntro: "Typical sources include oxygen cylinder manifolds, liquid oxygen tanks or PSA oxygen plants, medical air compressors, vacuum pumps and nitrous oxide manifolds. Manifolds are normally duplex (duty and standby) so supply continues during cylinder changeover.",
    types: [
      { name: "Gases", text: "Oxygen, nitrous oxide, medical air, vacuum and others as required by the hospital." },
      { name: "Copper distribution pipeline", text: "Cleaned and jointed for medical gas service." },
      { name: "Zone (area) valve service units", text: "Isolate departments for maintenance or emergencies." },
      { name: "Area alarm panels", text: "Show high/low pressure for each gas in a department; a master alarm panel monitors the plant room sources." },
      { name: "Terminal outlets", text: "Gas-specific medical gas and oxygen outlets on walls, bed head panels or OT pendants." },
    ],
    specsTitle: "Medical Gas Pipeline System Specifications",
    specs: [
      ["Gases", "O₂, N₂O, medical air, vacuum, others as required"],
      ["Pipeline", "Medical-grade copper"],
      ["Outlets", "As per project requirement"],
      ["Alarms", "Area and master alarm panels"],
      ["Isolation", "Zone valve service units"],
      ["Design standard", "As specified in the hospital's tender"],
      // TODO(specs): add pipe sizes/standard, outlet type and alarm panel model details used by the company.
      ["Outlet type and pipe sizing", perProject],
    ],
    installTitle: "MGPS Installation, Testing and Timeline",
    install: [
      "Installation follows the approved drawings: plant room equipment and manifolds, pipeline routes, zone valve boxes, alarm panels and terminal outlets. Before handover the system is pressure tested for leaks, purged, checked for cross-connection and gas identity at every outlet, and alarms are verified. Test records are shared with the hospital.",
      "Routine checks cover plant equipment, manifold changeover, alarm function, valve operation and outlet condition, at intervals set by the hospital's maintenance plan. The project timeline depends on the size of the building and site readiness and is shared after the site assessment.",
    ],
    // TODO(timeline): add typical MGPS project duration by hospital size.
    steps: ["Drawings and gas schedule review", "Plant room and pipeline installation", "Valve boxes, alarms and outlets", "Testing, commissioning and handover"],
    priceTitle: "MGPS Price Range",
    price: [
      "Cost depends on the number of beds and outlets, gases required, source equipment, pipeline length and building layout. Indicatively, MGPS inside one OT is ₹60,000 – ₹1 Lakh and a hospital MGPS project ₹5 Lakh – ₹30 Lakh. These are indicative ranges, not a quotation; we quote after reviewing your drawings.",
    ],
    priceFactors: ["Number of beds and outlets", "Gases required", "Source equipment (manifold, LOX or PSA, compressors, vacuum)", "Pipeline length and building layout", "Alarm and valve box quantities"],
    extra: [
      { kind: "h2", text: "Medical gas pipeline inside the operation theatre" },
      { kind: "p", text: ["The part of the gas system that runs inside the OT, from the point where it enters through the wall, has to be built as part of the theatre itself. It can include:"] },
      {
        kind: "ul",
        items: [
          ["Zone valve box and control panels"],
          ["Pressure regulators and pressure switches"],
          ["Copper piping, connectors and hoses"],
          ["Gas outlets at the pendants and walls"],
        ],
      },
      { kind: "p", text: ["When the same team builds the OT and the gas system inside it, the two fit together properly and the theatre gets an uninterrupted supply of gases and medical air. These parts need after-sales service, spare parts and AMC or CMC cover over the years. We prepare a detailed offer for each site after studying your requirements."] },
    ],
    faqs: [
      { q: "What is the cost of a medical gas pipeline?", a: "Cost depends on the number of outlets, gases, pipeline length, source equipment and building layout. Indicatively, MGPS inside one OT is ₹60,000 – ₹1 Lakh and a hospital project ₹5 Lakh – ₹30 Lakh. We quote after reviewing your drawings." },
      { q: "What is MGPS in a hospital?", a: "It is the central system that supplies oxygen, nitrous oxide, medical air and vacuum through pipelines to outlets in OTs, ICUs, wards and emergency areas." },
      { q: "Which gases can an MGPS supply?", a: "Typically oxygen, nitrous oxide, medical air and vacuum, with other gases added as the hospital requires." },
      { q: "How is a medical gas pipeline tested before use?", a: "It is pressure tested for leaks, purged, checked for cross-connection and gas identity at every outlet, and the alarms are verified before handover." },
      { q: "Can MGPS be added to an existing hospital?", a: "Usually yes, after a site survey of pipe routes, the plant room location and the departments to be served." },
    ],
    related: ["oxygen-outlet", "manifold-room-system", "bed-head-panel"],
  },

  "bed-head-panel": {
    whatTitle: "What Is a Bed Head Panel and Where Is It Used?",
    what: [
      "A bed head panel is a wall-mounted aluminium unit above each bed that brings medical gas outlets, electrical and data sockets, nurse call and lighting together in one place. Instead of separate outlets scattered on the wall, every service the patient and nurse need is arranged neatly in a single panel that is easy to clean. Unicare supplies and installs bed head panels for ICUs, HDUs, wards and recovery areas.",
      "Bed head panels are connected to the hospital's medical gas pipeline system and electrical system, so they are planned at the same time as MGPS and the ward layout. The number and type of outlets is decided for each bed according to the clinical area.",
      "A consistent panel at every bed helps nurses find services quickly, keeps cables and hoses organised, and gives the ward a clean, uniform appearance.",
      "When planning a new ICU or ward, the bed head panel height and length are agreed with the clinical team so that outlets are within easy reach of the bed and do not clash with the bed, curtain tracks or wall-mounted equipment. Spare capacity for future outlets can also be discussed at this stage.",
    ],
    typesTitle: "Bed Head Panel Configurations",
    types: [
      { name: "ICU and HDU panels", text: "Configured with the gas outlets, sockets and accessories needed for critical-care beds." },
      { name: "Ward panels", text: "Configured for general ward beds with the services agreed for that ward." },
      { name: "Single-bed or multi-bed length", text: "Panel length is made as per requirement, for one bed or a continuous run." },
      { name: "Accessories", text: "Reading or examination light, nurse call provision and other accessories configured per project." },
    ],
    specsTitle: "Bed Head Panel Specifications",
    specs: [
      ["Profile", "Aluminium"],
      ["Length", "As per requirement"],
      ["Configuration", "Customisable per bed"],
      ["Services", "Gas outlets, electrical and data sockets, nurse call, lighting"],
      // TODO(specs): add profile dimensions, finish, outlet types and lighting details from the supplier datasheet.
      ["Profile size, finish and outlet type", perProject],
    ],
    installTitle: "Bed Head Panel Installation and Timeline",
    install: [
      "We review the ward drawings and the gas and electrical schedule for each bed, then fix the panels at the agreed height. Gas pipework from the MGPS and electrical wiring are brought into the panel, outlets and sockets are fitted, and every outlet is tested before handover.",
      "In existing wards, installation is planned around the existing services and can be phased. The timeline depends on the number of beds and site readiness and is confirmed after the site assessment.",
      "After handover, the hospital's maintenance team is shown how outlets and sockets are arranged in the panel, so routine checks and later additions are straightforward.",
    ],
    // TODO(timeline): add typical installation duration per bed/ward.
    steps: ["Bed and services schedule", "Panel fixing at agreed height", "Gas and electrical connection", "Outlet testing and handover"],
    priceTitle: "Bed Head Panel Price: What Affects the Cost",
    // TODO(price): add an indicative bed head panel price range per bed if the company approves one.
    price: ["Bed head panel price is quoted per project because each panel is configured to its bed. Share the bed count and services per bed for a quotation."],
    priceFactors: ["Panel length", "Number and type of gas outlets", "Number of electrical and data sockets", "Lighting and nurse call accessories", "Number of beds", "Connection work to existing services"],
    faqs: [
      { q: "Can bed head panels be customised?", a: "Yes — number of outlets, sockets and accessories are configured per project." },
      { q: "What does a bed head panel include?", a: "Typically medical gas outlets, electrical and data sockets, nurse call provision and a reading or examination light, as agreed for each bed." },
      { q: "Is a bed head panel connected to the medical gas pipeline?", a: "Yes. Its gas outlets are fed from the hospital MGPS, so the two are planned together." },
      { q: "Bed head panel or ICU pendant — which is better?", a: "Bed head panels suit most wards and many ICUs. Pendants give more reach and floor clearance. The choice depends on the clinical use and the room." },
      { q: "How do I get a bed head panel quotation?", a: "Share the number of beds and the gas outlets, sockets and accessories needed at each bed. We confirm the configuration with you and then send a quotation." },
    ],
    related: ["medical-gas-pipeline-system", "modular-icu-nicu", "cubicle-curtain-system"],
  },

  // TODO(image): confirm the scrub sink photo is a real Unicare scrub station; replace if not.
  "surgical-scrub-sink-station": {
    whatTitle: "What Is a Surgical Scrub Station and Where Is It Used?",
    what: [
      "A surgical scrub station is a stainless-steel sink where surgeons and theatre staff wash and scrub their hands and forearms before a procedure. The taps are operated by sensor, knee or elbow so the team can scrub hands-free and not touch the tap after washing. Unicare supplies and installs scrub sink stations in single, double and triple-bay stainless-steel configurations.",
      "Scrub stations are installed in the scrub area just outside the operation theatre, and also in labour rooms and cath labs. The number of bays is chosen by how many staff scrub at the same time and how many theatres share the scrub area.",
      "A splash-reducing design and smooth stainless surfaces help keep the scrub area clean and dry.",
      "Planning the scrub area together with the operation theatre layout helps the surgical team move straight from scrubbing into the theatre without touching doors or surfaces. Space in front of each bay, splash control, drainage and the position of soap and brush dispensers are all considered so that several staff can scrub at once without crowding.",
      "For hospitals upgrading an existing theatre, a scrub station can usually be replaced or added within the existing scrub area after checking water supply, drainage and power for sensor taps.",
    ],
    typesTitle: "Scrub Station Mounting Options",
    types: [
      { name: "Wall-mounted or free-standing", text: "The mounting arrangement is chosen to suit the scrub area wall, plumbing points and the space available in front of each bay." },
    ],
    specsTitle: "Surgical Scrub Sink Specifications",
    specs: [
      ["Material", "Stainless steel"],
      ["Bays", "1 / 2 / 3"],
      ["Operation", "Sensor, knee or elbow"],
      ["Design", "Splash-reducing"],
      // TODO(specs): add steel grade, unit dimensions, water connections and accessories (soap/brush dispensers, timer) from the supplier datasheet.
      ["Steel grade, dimensions and accessories", perProject],
    ],
    installTitle: "Scrub Station Installation and Timeline",
    install: [
      "We confirm the scrub area layout, number of bays, water supply and drainage points, and power for sensor taps. The station is fixed and levelled, water and drainage are connected, sensor taps are wired, and flow and drainage are tested before handover.",
      "The timeline depends on whether services are already in place and is confirmed after the site assessment.",
      "At handover, staff are shown how the taps operate and how to clean the stainless surfaces. For sensor taps, the power supply and sensor response are checked so water flows reliably when hands are placed under the spout. Where several theatres share one scrub area, the bays are positioned so staff can enter each theatre directly after scrubbing.",
    ],
    // TODO(timeline): add typical installation duration for one scrub station.
    steps: ["Scrub area layout and services check", "Station fixed and levelled", "Water, drain and sensor connection", "Flow and drainage testing"],
    priceTitle: "Scrub Station Price: What Affects the Cost",
    // TODO(price): add indicative scrub station price ranges by bay count if the company approves them.
    price: ["Scrub sink price depends mainly on the number of bays and tap operation. Share your requirement for a quotation."],
    priceFactors: ["Number of bays", "Sensor, knee or elbow operation", "Accessories required", "Plumbing and drainage work on site", "Number of units"],
    extra: [
      { kind: "h2", text: "Hands-free scrub stations for operation theatres" },
      { kind: "p", text: ["Surgical hand scrubbing is the last line of defence before an incision, so the scrub station has to be completely hands-free and easy to keep clean. Our scrub sinks are made from heavy-gauge stainless steel with rounded (coved) inner corners, so there are no sharp joints where bacteria can form a film."] },
      { kind: "h2", text: "Models" },
      {
        kind: "table",
        head: ["Model", "Users at a time"],
        rows: [
          ["Single station (1 bay)", "1"],
          ["Double station (2 bay)", "2"],
          ["Triple station (3 bay)", "3"],
        ],
      },
      { kind: "h2", text: "Features" },
      {
        kind: "ul",
        items: [
          ["Hands-free water control: infrared sensor, knee panel, foot pedal, or a combination with manual override"],
          ["Deep anti-splash basin with sloping sides and rounded corners"],
          ["Scrub timer: LED countdown display (3 to 5 minutes) that starts automatically"],
          ["Thermostatic mixing valve (TMV) for a safe, steady water temperature"],
          ["Optional water treatment: UV steriliser and 0.2-micron filter to remove waterborne germs"],
          ["Accessories: touch-free soap and iodine dispensers, LED mirror canopy, tall side splash guards"],
        ],
      },
      { kind: "h2", text: "Material and compliance" },
      { kind: "p", text: ["1.5 mm AISI 304 stainless steel (AISI 316 on request) with a satin hairline finish. Compliant with NABH, BIS / IS, CDSCO and ISO 13485 requirements."] },
    ],
    faqs: [
      { q: "Which tap operation is best?", a: "Sensor taps are most common in new OTs; knee and elbow operation are reliable non-electric options." },
      { q: "How many bays does a scrub station need?", a: "It depends on how many staff scrub at the same time and how many theatres share the area. Single, double and triple-bay units are available." },
      { q: "Where is a scrub station installed?", a: "In the scrub area just outside the operation theatre, and also in labour rooms and cath labs." },
      { q: "Why are scrub sinks made of stainless steel?", a: "Stainless steel is durable and easy to clean, which suits the frequent washing in a scrub area." },
      { q: "Can a scrub station be added to an existing OT?", a: "Usually yes, after checking space in the scrub area, water supply, drainage and power for sensor taps." },
    ],
    related: ["modular-operation-theatre", "hermetic-ot-door", "pass-box"],
  },

  "manifold-room-system": {
    whatTitle: "What Is an Oxygen Manifold Room System and Where Is It Used?",
    what: [
      "An oxygen manifold is the equipment in a hospital gas room that connects a bank of medical gas cylinders to the hospital's central pipeline. A manifold room system brings the cylinders, manifold, pressure regulation and monitoring together so oxygen and other medical gases are supplied to the medical gas pipeline continuously. The gas type, cylinder capacity, changeover arrangement and installation scope are confirmed for each project.",
      "Manifold rooms are used in hospitals of all sizes, either as the main source of a gas or as a reserve alongside a liquid oxygen tank or PSA plant. They are planned together with the medical gas pipeline project so the pipe connection, alarm monitoring and room location suit the building.",
      "A clearly organised manifold room makes cylinder changes easier for staff and keeps the gas supply dependable.",
      "The manifold room location matters as much as the equipment. It should allow cylinders to be delivered and changed easily, keep full and empty cylinders organised, and give a practical pipe route to the hospital's distribution pipeline. These points are reviewed with your team and the building drawings before the manifold arrangement is finalised.",
    ],
    typesTitle: "Oxygen Manifold and Medical Gas Manifold Options",
    types: [
      { name: "Oxygen manifold", text: "Connects oxygen cylinders to the hospital oxygen pipeline." },
      { name: "Other medical gas manifolds", text: "Manifolds for other gases, such as nitrous oxide, as the project requires." },
      { name: "Duty and standby banks", text: "Manifolds are normally duplex (duty and standby) so supply continues during cylinder changeover." },
      { name: "Changeover arrangement", text: "The changeover method is confirmed against the hospital gas requirements." },
      { name: "Pressure regulation and monitoring", text: "Regulation and pressure monitoring are selected per project so the pipeline receives gas at the pressure the hospital system is designed for." },
    ],
    specsTitle: "Manifold Room System Specifications",
    specs: [
      ["Configuration", "Confirmed against the hospital gas requirements"],
      ["Capacity", "Selected per project"],
      ["Connection", "Integrated with the hospital medical gas pipeline"],
      ["Regulation and monitoring", "Project-specific pressure regulation and monitoring"],
      // TODO(specs): add number of cylinders per bank, changeover type (manual/semi-automatic/automatic), outlet pressure and alarm details used by the company.
      ["Cylinders per bank and changeover type", perProject],
    ],
    installTitle: "Manifold Room Installation and Timeline",
    install: [
      "We review the gas demand, room location and pipeline connection, then install the manifold, cylinder connections, regulation and monitoring, and connect the manifold to the pipeline. The system is tested for leaks and correct operation, and staff are shown the changeover procedure at handover.",
      "The timeline depends on the room's readiness and the wider MGPS project and is confirmed after the site assessment.",
      "At handover, the hospital team is shown how to change cylinders on each bank, read the pressure monitoring and respond to alarms. Routine checks of the manifold, regulators and connections are then carried out at intervals set by the hospital's maintenance plan, so the gas supply stays dependable.",
    ],
    // TODO(timeline): add typical manifold room installation duration.
    steps: ["Gas demand and room review", "Manifold and cylinder connection", "Pipeline connection and monitoring", "Testing and handover"],
    priceTitle: "Oxygen Manifold Price: What Affects the Cost",
    // TODO(price): add an indicative oxygen manifold price range if the company approves one.
    price: ["Manifold price is quoted per project because it depends on the gas, demand and cylinder arrangement. Share your requirement for a project-specific proposal."],
    priceFactors: ["Gas type", "Hospital demand and capacity", "Cylinders per bank", "Changeover arrangement", "Monitoring and alarms", "Pipeline connection work"],
    faqs: [
      { q: "How is a manifold room system selected?", a: "Selection depends on the medical gas, hospital demand, cylinder arrangement and site requirements. Share your requirements for a project-specific proposal." },
      { q: "What is an oxygen manifold?", a: "It is equipment that connects a bank of oxygen cylinders to the hospital's central oxygen pipeline." },
      { q: "Why are manifolds duty and standby?", a: "So one bank supplies the hospital while the other is ready, keeping supply continuous during cylinder changeover." },
      { q: "Is a manifold needed if the hospital has a PSA plant or LOX tank?", a: "Often a manifold is planned as a reserve supply. The arrangement is decided with the hospital's gas plan." },
      { q: "Can an oxygen manifold be installed in an existing hospital?", a: "Usually yes, after checking the room location, cylinder access and the connection to the existing medical gas pipeline." },
    ],
    related: ["medical-gas-pipeline-system", "bed-head-panel", "agss"],
  },

  // TODO(image): confirm the AGSS photo shows a real Unicare installation; replace if not.
  agss: {
    whatTitle: "What Is AGSS and Where Is It Used?",
    what: [
      "AGSS, the Anaesthetic Gas Scavenging System, collects waste anaesthetic gases from the anaesthesia breathing circuit and safely exhausts them outside the operation theatre. Without scavenging, exhaled anaesthetic gas can build up in the room, so AGSS reduces exposure for surgeons, anaesthetists and nurses. Unicare supplies and installs AGSS as part of OT and medical gas projects.",
      "AGSS is used in operation theatres, anaesthesia induction rooms and recovery areas — wherever anaesthetic gases are delivered. Terminal units are mounted on the OT wall or on an OT pendant, and connect to a dedicated exhaust plant.",
      "Because AGSS terminal units sit alongside medical gas outlets, it is usually planned together with the MGPS and the theatre layout.",
      "Planning AGSS early in an OT project means the terminal units can be placed where the anaesthesia machine will stand, the pipe route to the exhaust plant can be kept short, and the plant can be located where its exhaust is safely discharged outside the building. In theatre upgrades, the existing ceiling, pendants and service routes are checked to find a practical way to add scavenging.",
      "Regular checks of terminal units and the exhaust plant, at intervals set by the hospital's maintenance plan, help keep the system working as intended.",
    ],
    typesTitle: "AGSS Components and Options",
    types: [
      { name: "Terminal units", text: "Wall or pendant mounted, where the anaesthesia machine connects." },
      { name: "Receiver and transfer system", text: "Carries the waste gas from the terminal unit to the exhaust plant." },
      { name: "Dedicated exhaust plant", text: "Sized per number of theatres." },
      { name: "Integration with MGPS", text: "Planned with the medical gas pipeline and OT pendants." },
      { name: "Coordination with the OT layout", text: "Terminal units are placed near the anaesthesia machine position and coordinated with pendants, wall panels and medical gas outlets." },
    ],
    specsTitle: "AGSS Specifications",
    specs: [
      ["Installation", "Wall or pendant mounted terminal units"],
      ["Plant", "Sized per number of theatres"],
      ["Integration", "With MGPS and OT pendants"],
      // TODO(specs): add plant type, flow rates and terminal unit standard used by the company.
      ["Plant type and flow rates", perProject],
    ],
    installTitle: "AGSS Installation and Timeline",
    install: [
      "We confirm the number of theatres and terminal positions, then install the terminal units, transfer pipework and exhaust plant. The system is tested for correct operation at every terminal before handover.",
      "The timeline depends on the number of theatres and whether the work is part of a new modular OT or an upgrade, and is confirmed after the site assessment.",
      "At handover, the anaesthesia and maintenance teams are shown how terminal units connect to the anaesthesia machine and how the exhaust plant is switched and monitored. Where AGSS is part of a modular OT, the terminal unit positions are coordinated with the OT pendant, wall panels and medical gas outlets so that the anaesthetist has every connection within easy reach.",
    ],
    // TODO(timeline): add typical AGSS installation duration.
    steps: ["Theatre count and terminal positions", "Terminal units and pipework", "Exhaust plant installation", "Testing and handover"],
    priceTitle: "AGSS Price: What Affects the Cost",
    // TODO(price): add an indicative AGSS price range if the company approves one.
    price: ["AGSS price is quoted per project and depends mainly on how many theatres and terminal units it serves."],
    priceFactors: ["Number of theatres", "Number of terminal units", "Wall or pendant mounting", "Exhaust plant size", "Pipe route length"],
    faqs: [
      { q: "What is AGSS?", a: "AGSS stands for Anaesthetic Gas Scavenging System — a system that removes waste anaesthetic gases from the OT." },
      { q: "Why does an operation theatre need AGSS?", a: "It removes waste anaesthetic gas so it does not build up in the room, reducing exposure for clinical staff." },
      { q: "Where are AGSS terminal units mounted?", a: "On the OT wall or on an OT pendant, next to the anaesthesia machine position." },
      { q: "Is AGSS installed with the medical gas pipeline?", a: "Usually yes. It is planned together with MGPS and the theatre layout." },
      { q: "Can AGSS be added to an existing operation theatre?", a: "Usually yes, after a site check of the ceiling, pendants and a route to the exhaust plant." },
    ],
    related: ["medical-gas-pipeline-system", "ot-pendant", "modular-operation-theatre"],
  },

  // TODO(image): replace the CSSD photo with a real Unicare CSSD project photo when available.
  "cssd-systems": {
    whatTitle: "What Is CSSD and What Equipment Does It Use?",
    what: [
      "A Central Sterile Services Department (CSSD) cleans, sterilises and supplies reusable surgical instruments for the whole hospital. CSSD equipment includes washers, sterilisers, stainless work tables and racks, pass boxes and sterile storage, arranged so instruments move in one direction from dirty to clean to sterile. Unicare supports CSSD planning, zoning and equipment supply for new and existing hospitals.",
      "CSSDs are found in multispecialty hospitals, medical colleges and surgical centres. Good planning keeps the dirty, clean/assembly and sterile storage zones separate, which supports infection control and an organised instrument workflow.",
      "The equipment list depends on the hospital's surgical volume and the instruments it processes, so CSSD design starts with understanding that workload.",
      "Planning CSSD equipment together with the building helps make sure there is enough space for each zone, that water, drainage, power and ventilation are available where the equipment will stand, and that trolleys can move instruments from operation theatres to CSSD and back along clean and dirty routes. Pass boxes between zones reduce staff crossing from dirty to clean areas.",
      "For existing hospitals, an older sterilisation room can often be reorganised into proper zones with a revised equipment list, depending on the space available.",
    ],
    typesTitle: "CSSD Zones and Equipment",
    types: [
      { name: "Dirty (decontamination) zone", text: "Receiving and washing of used instruments." },
      { name: "Clean / assembly zone", text: "Inspection, assembly and packing of instrument sets on stainless work tables." },
      { name: "Sterilisation", text: "Sterilisers selected for the hospital's workload." },
      { name: "Sterile storage", text: "Racks and storage for sterile sets before issue." },
      { name: "Pass boxes", text: "Transfer between zones without staff crossing over." },
      { name: "Trolleys and transport", text: "Closed or covered trolleys for moving used and sterile instruments between operation theatres and CSSD, as agreed with the hospital." },
    ],
    specsTitle: "CSSD System Specifications",
    specs: [
      ["Scope", "Planning, equipment and installation"],
      ["Zones", "Dirty, clean/assembly, sterile storage"],
      ["Equipment", "Sterilisers and washers, stainless work tables and racks, pass boxes and storage"],
      // TODO(specs): add steriliser/washer types and capacities, and brands/models the company supplies.
      ["Steriliser and washer capacity", perProject],
    ],
    installTitle: "CSSD Planning, Installation and Timeline",
    install: [
      "We review the CSSD area, surgical workload and drawings, prepare a zoning layout with one-way workflow, and agree the equipment list. Equipment is then supplied, installed and connected to the required services, and tested before handover.",
      "The timeline depends on the size of the department, the equipment chosen and site readiness, and is confirmed after the site assessment.",
      "At handover, the CSSD team is shown the workflow through each zone, how equipment is operated according to the manufacturer's instructions, and how instruments move between zones and pass boxes. Routine servicing and validation of sterilisers and washers are then carried out at intervals set by the hospital's quality and maintenance plan, using the manufacturer's documentation.",
    ],
    // TODO(timeline): add typical CSSD project duration.
    steps: ["Workload and area review", "Zoning layout and equipment list", "Equipment supply and installation", "Testing and handover"],
    priceTitle: "CSSD Equipment Price: What Affects the Cost",
    // TODO(price): add indicative CSSD project or equipment price ranges if the company approves them.
    price: ["CSSD cost is quoted per project because it depends on the equipment list and department size."],
    priceFactors: ["Surgical workload", "Steriliser and washer type and capacity", "Number of work tables and racks", "Pass boxes between zones", "Services and civil work required", "Department area"],
    faqs: [
      { q: "What is CSSD in a hospital?", a: "It is the department responsible for decontaminating, sterilising and distributing reusable medical devices." },
      { q: "What equipment is needed in a CSSD?", a: "Typically washers, sterilisers, stainless work tables and racks, pass boxes and sterile storage. The list depends on the hospital's workload." },
      { q: "What are the zones of a CSSD?", a: "A dirty (decontamination) zone, a clean/assembly zone and sterile storage, arranged for one-way movement of instruments." },
      { q: "Can you plan a CSSD for an existing hospital?", a: "Yes. We review the available area and workload and suggest a zoning layout and equipment list." },
      { q: "How do I get a CSSD equipment quotation?", a: "Share the CSSD area drawing and an idea of your surgical workload. We prepare a zoning layout and equipment list and then send a quotation." },
    ],
    related: ["pass-box", "modular-operation-theatre", "surgical-scrub-sink-station"],
  },
  // TODO(image): no dedicated oxygen outlet photo yet; page shares the MGPS outlet photo.
  "oxygen-outlet": {
    whatTitle: "What Is an Oxygen Outlet and Where Is It Used?",
    what: [
      "An oxygen outlet is the point on a hospital wall, bed head panel or OT pendant where a flowmeter, humidifier or ventilator hose is plugged into the central oxygen pipeline. The same idea applies to every pipeline gas, so a hospital usually has a family of medical gas outlets: oxygen, medical air, vacuum (suction) and, in theatres, nitrous oxide. Each medical gas outlet accepts only the probe for its own gas, which prevents equipment from being connected to the wrong supply.",
      "Oxygen wall outlets are found at almost every bed in an ICU, HDU, ward, emergency department and recovery area, and on the walls or pendants of operation theatres. The number of outlets per bed and the gases needed are set out in the hospital's gas schedule, which is prepared together with the medical gas pipeline design.",
      "Because the outlet is the part of the MGPS that nurses and doctors use every day, it needs to be easy to identify, easy to connect and disconnect with one hand, and easy to clean.",
    ],
    typesTitle: "Types of Medical Gas Outlets",
    typesIntro: "Outlets are chosen by gas and by where they will be mounted.",
    types: [
      { name: "Oxygen outlet", text: "Supplies oxygen for flowmeters, ventilators and anaesthesia machines." },
      { name: "Medical air outlet", text: "Supplies medical air, often used with ventilators and nebulisers." },
      { name: "Vacuum (suction) outlet", text: "Connects suction regulators and jars for clinical suction." },
      { name: "Nitrous oxide outlet", text: "Used mainly in operation theatres for anaesthesia." },
      { name: "Wall-mounted, panel-mounted or pendant-mounted", text: "Outlets can be fixed directly on the wall, built into a bed head panel, or fitted to an OT or ICU pendant." },
      { name: "Outlet standard", text: "The probe and socket standard is selected to match the hospital's equipment and the specification in its tender." },
    ],
    specsTitle: "Oxygen Outlet Specifications",
    specs: [
      ["Gases", "Oxygen, medical air, vacuum, nitrous oxide as required"],
      ["Mounting", "Wall, bed head panel or pendant"],
      ["Gas identification", "Colour coding and labelling per gas"],
      ["Connection", "Gas-specific, non-interchangeable"],
      // TODO(specs): add outlet standard(s) supplied (e.g. BS / DIN / AFNOR), body material and model details from the supplier datasheet.
      ["Outlet standard and body material", perProject],
      ["Quantity per bed", "As per the hospital's gas schedule"],
    ],
    installTitle: "Oxygen Outlet Installation and Timeline",
    install: [
      "Outlet positions are agreed from the gas schedule and bed layout so they sit within reach of the bed without clashing with sockets, lights or curtain tracks. The pipeline is brought to each position, the outlet back box is fixed, and the outlet is connected and labelled for its gas.",
      "Before handover every outlet is checked for gas identity and flow as part of MGPS testing and commissioning, so that the gas coming out of each outlet is the gas marked on it. Test records are shared with the hospital.",
      "Outlets can also be added or replaced in an existing hospital after checking the pipeline routes and isolation valves for the area. The timeline depends on the number of outlets and site readiness and is confirmed after the site assessment.",
    ],
    // TODO(timeline): add typical installation duration per ward or per number of outlets.
    steps: ["Gas schedule and outlet positions", "Pipeline brought to each point", "Outlet fixing, connection and labelling", "Gas identity and flow testing"],
    priceTitle: "Oxygen Outlet Price: What Affects the Cost",
    // TODO(price): add an indicative per-outlet price range if the company approves one.
    price: [
      "Outlet price is usually quoted as part of the medical gas pipeline project, because the pipework to each point is a large part of the cost. Share the number of beds and gases per bed for a quotation. For overall pipeline budgets, see the MGPS cost guide.",
    ],
    priceFactors: ["Number of outlets and gases", "Outlet standard selected", "Wall, panel or pendant mounting", "Pipeline length to each point", "New building or existing hospital", "Testing and commissioning scope"],
    faqs: [
      { q: "What is an oxygen outlet?", a: "It is the terminal point on the wall, panel or pendant where equipment connects to the hospital oxygen pipeline." },
      { q: "Why can't an oxygen probe fit a vacuum or air outlet?", a: "Medical gas outlets are gas-specific and non-interchangeable, so equipment can only be connected to the gas it is meant for." },
      { q: "How many oxygen outlets does an ICU bed need?", a: "It is set by the hospital's gas schedule and clinical team. ICU beds usually have more outlets than ward beds; we plan the number with you." },
      { q: "Can oxygen wall outlets be added to an existing ward?", a: "Usually yes, after checking pipeline routes and isolation valves for that area." },
      { q: "Are outlets tested before use?", a: "Yes. Every outlet is checked for gas identity and flow during MGPS testing and commissioning before handover." },
    ],
    related: ["medical-gas-pipeline-system", "bed-head-panel", "manifold-room-system"],
  },
};

export const getLongForm = (slug: string) => productLongForm[slug];
