export type BlogSection = {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Blog = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  image?: string;
  imageAlt?: string;
  /** Product slugs shown in the "Related products" box. */
  relatedProducts?: string[];
  sections: BlogSection[];
};

const AUTHOR = "Unicare Medical Solutions Team";

export const blogs: Blog[] = [
  {
    slug: "what-is-cssd-hospital-sterilisation-department-guide",
    title: "What is CSSD? Guide to Hospital Sterilisation Departments",
    excerpt: "What is CSSD? A practical guide to the Central Sterile Services Department: how instruments flow through it, the zones it needs and how to plan one.",
    publishedAt: "2026-10-28",
    updatedAt: "2026-10-28",
    author: AUTHOR,
    image: "/images/cssd-systems.webp",
    imageAlt: "CSSD equipment for hospital sterilisation",
    relatedProducts: ["cssd-systems", "pass-box", "surgical-scrub-sink-station"],
    sections: [
      { paragraphs: [
        "Every surgical instrument, dressing tray and reusable device used in a hospital has to be cleaned, checked, packed and sterilised before it touches the next patient. In most hospitals this work is done in one place: the Central Sterile Services Department, usually called the CSSD. It is rarely seen by patients, yet the operation theatres, ICUs, labour rooms and wards all depend on it every day.",
        "This guide explains what a CSSD is, what happens inside it, how it is laid out, which equipment it uses and what hospital owners, administrators and planners should think about when building or upgrading one. It is written for people planning a new facility or improving an existing one, not as a substitute for the infection-control standards and guidelines your hospital follows.",
      ] },
      { heading: "What does CSSD stand for?", paragraphs: [
        "CSSD stands for Central Sterile Services Department. You may also see it called CSSU (Central Sterile Supply Unit), SPD (Sterile Processing Department) or simply the sterilisation department. The names differ, but the idea is the same: instead of each department cleaning and sterilising its own instruments, the hospital centralises the work in a single controlled area with trained staff, proper equipment and documented processes.",
        "Centralisation matters because sterilisation is not just about putting instruments in an autoclave. It is a chain of steps, and a weak link anywhere in that chain can undo the rest. A dedicated department makes it easier to control each step, train people properly, maintain equipment and keep records that show what was processed, when and how.",
      ] },
      { heading: "What does a CSSD actually do?", paragraphs: [
        "The core job of a CSSD is to receive used items, make them safe and return them ready for use. In practice this covers several distinct activities:",
      ], bullets: [
        "Collecting used instruments and devices from the operation theatres, wards, ICUs and other departments.",
        "Sorting, cleaning and decontaminating them, manually and with washing equipment.",
        "Inspecting each item for cleanliness, damage and correct function.",
        "Assembling instrument sets and trays, then packing and labelling them.",
        "Sterilising the packed items using a method suited to the material.",
        "Storing sterile items under controlled conditions and issuing them to departments.",
        "Keeping records so each set can be traced back through the process.",
      ] },
      { paragraphs: [
        "Some CSSDs also manage linen packs, dressing drums and supplies for specific departments. The exact scope depends on the size of the hospital and how it chooses to organise its services.",
      ] },
      { heading: "The one-way flow: dirty to clean to sterile", paragraphs: [
        "The most important design principle in a CSSD is one-way flow. Used, contaminated items should move in only one direction, from the dirty area through cleaning and packing to the sterile store, and never travel back the way they came. Clean and sterile items should never share a path, a counter or a trolley with contaminated ones.",
        "This principle shapes the whole department. It decides where the doors go, where the washers and sterilisers sit, how staff move between areas and where trolleys are parked. Many sterilisers and washers used in CSSDs are double-door units built into a wall: dirty or unsterile items are loaded on one side and removed from the other, so the machine itself becomes part of the barrier between zones.",
        "Pass boxes play a similar role for smaller items. A pass box is a cabinet set into a partition wall with interlocked doors on each side, so items can move from one zone to the next without staff walking between them or both doors being open at the same time.",
      ] },
      { heading: "The main zones of a CSSD", paragraphs: [
        "Although layouts vary, most CSSDs are divided into a sequence of zones that follow the one-way flow.",
      ] },
      { heading: "1. Receiving and decontamination (dirty) zone", paragraphs: [
        "This is where used items arrive. Staff wear suitable protective equipment, sort instruments, dismantle them where needed and begin cleaning. Typical fittings include deep sinks, pre-cleaning stations, ultrasonic cleaners, washer-disinfectors and drying equipment. Because this area handles contaminated items, it needs washable surfaces, good drainage, adequate ventilation and a layout that stops dirty items or staff from straying into clean areas.",
      ] },
      { heading: "2. Inspection, assembly and packing (clean) zone", paragraphs: [
        "Cleaned items pass into the clean zone, often through the washer-disinfector itself or a pass box. Here staff inspect each instrument under good lighting, sometimes with magnification, to check that it is clean, undamaged and working. Instruments are then assembled into sets according to checklists, wrapped or placed into containers, and labelled. Work tables, instrument racks, packing materials, sealing machines and labelling systems belong here.",
      ] },
      { heading: "3. Sterilisation zone", paragraphs: [
        "Packed items are loaded into sterilisers. Steam sterilisation with autoclaves is the most common method for heat-tolerant items. Heat- or moisture-sensitive devices may need low-temperature methods, such as those based on ethylene oxide or hydrogen peroxide, which have their own space, ventilation and safety requirements. Each cycle is monitored, and indicators are used to confirm that conditions were met.",
      ] },
      { heading: "4. Sterile storage and issue zone", paragraphs: [
        "Sterile items are unloaded, allowed to cool and moved to a clean, dry, controlled storage area. Shelving should keep packs off the floor and away from walls, with first-in, first-out rotation. Issue to departments is usually through a separate window, hatch or pass box so that sterile goods leave the department without crossing the dirty side.",
        "Supporting spaces, such as staff changing rooms, a supervisor's office, a store for consumables and, in larger facilities, a trolley wash area, sit around these core zones.",
      ] },
      { heading: "Key equipment in a hospital CSSD", paragraphs: [
        "The exact equipment list depends on the hospital's size, case mix and chosen processes, but most departments will need some combination of the following:",
      ], bullets: [
        "Sinks and pre-cleaning stations for manual cleaning and soaking.",
        "Ultrasonic cleaners for instruments with joints, hinges or fine detail.",
        "Washer-disinfectors for automated, repeatable cleaning and thermal disinfection.",
        "Drying cabinets so instruments are fully dry before packing.",
        "Inspection tables with task lighting and magnifiers.",
        "Packing tables, wrapping materials, containers and heat sealers.",
        "Steam sterilisers (autoclaves) and, where needed, low-temperature sterilisers.",
        "Pass boxes and double-door units between zones.",
        "Sterile storage racks and closed transport trolleys.",
        "A tracking and record-keeping system, on paper or software.",
      ] },
      { paragraphs: [
        "Rather than buying equipment item by item, it usually pays to plan the department as a whole. The equipment, the room sizes, the services (water, steam, drainage, electrical load, ventilation) and the flow all affect each other.",
      ] },
      { heading: "How the CSSD connects to the operation theatre", paragraphs: [
        "The operation theatre complex is normally the CSSD's biggest customer. Instrument sets go out to the theatres, come back after surgery and must be turned around in time for the next list. That makes the relationship between the two departments a planning question in its own right.",
        "Some hospitals place the CSSD directly next to or below the theatre suite, connected by dedicated clean and dirty lifts or corridors. Others locate it further away and rely on closed trolleys and scheduled collections. Either can work, provided clean and dirty movement is kept separate and transport times are realistic for the theatre schedule. When a hospital is planning modular operation theatres, it is worth planning the CSSD route at the same time instead of treating it as an afterthought.",
      ] },
      { heading: "Planning a new CSSD or upgrading an existing one", paragraphs: [
        "Whether you are building a new hospital, adding theatres or improving an older sterilisation room, a few practical questions will shape the project:",
      ], bullets: [
        "Workload: how many theatres, procedures and departments will the CSSD serve, now and in the next few years?",
        "Scope: will it handle only theatre instruments, or also ward items, linen and dressings?",
        "Space: is there enough area for separate dirty, clean, sterile and storage zones with a true one-way flow?",
        "Services: are water quality, drainage, power, steam and ventilation adequate for the equipment you plan?",
        "Location: how will items move between the CSSD and the theatres, ICUs and wards?",
        "Staffing and training: who will run the department, and how will procedures be documented?",
        "Standards: which national guidelines, accreditation requirements and manufacturer instructions apply to your hospital?",
      ] },
      { paragraphs: [
        "Answering these questions early helps avoid common problems, such as cramped rooms where dirty and clean work overlap, sterilisers installed without the right services, or storage that is too small for the number of sets in circulation.",
      ] },
      { heading: "Common mistakes to avoid", paragraphs: [
        "A few issues come up again and again when sterilisation areas are planned in a hurry:",
      ], bullets: [
        "Treating the CSSD as a single room with an autoclave rather than a sequence of zones.",
        "Allowing clean and dirty trolleys or staff to share the same corridor or door.",
        "Choosing equipment before confirming room sizes and building services.",
        "Leaving too little space for inspection and packing, which is where many errors are caught.",
        "Underestimating sterile storage needs.",
        "Skipping documentation, which makes it hard to trace a set if there is ever a problem.",
      ] },
      { heading: "Final thoughts", paragraphs: [
        "A well-run CSSD protects patients, supports surgeons and keeps the operation theatres running on time. Its success depends less on any single machine and more on a sensible layout, a strict one-way flow, suitable equipment and trained staff following clear procedures.",
        "If you are planning a sterilisation department as part of a new hospital or a modular OT project, Unicare Medical Solutions can discuss CSSD systems, pass boxes and related hospital infrastructure with your team. Share your drawings and requirements and we will respond with options suited to your facility.",
      ] },
    ],
  },
  {
    slug: "dynamic-vs-static-pass-box",
    title: "Dynamic vs Static Pass Box: Which Does Your Hospital Need?",
    excerpt: "How static and dynamic pass boxes work, where each one fits in a hospital, and the practical questions to ask before choosing one for your OT, CSSD or lab.",
    publishedAt: "2026-10-28",
    updatedAt: "2026-10-28",
    author: AUTHOR,
    image: "/images/pass-box.webp",
    imageAlt: "Stainless steel hospital pass box set into a wall",
    relatedProducts: ["pass-box", "cssd-systems", "modular-operation-theatre"],
    sections: [
      { paragraphs: [
        "A pass box looks like a simple cabinet set into a wall, but it does an important job. It lets materials move between two areas without people walking between them and without both sides being open to each other at the same time. In hospitals, pass boxes are common between operation theatres and corridors, between CSSD zones, and in laboratories, pharmacies and other controlled spaces.",
        "When you start looking at pass boxes, you will quickly come across two main types: static and dynamic. This guide explains the difference in plain language, where each type usually fits, and what to consider before you decide which one your hospital needs.",
      ] },
      { heading: "What is a pass box?", paragraphs: [
        "A pass box, sometimes called a pass-through box or transfer hatch, is a chamber mounted in a partition wall with a door on each side. Items are placed inside from one room, the door is closed, and staff in the other room open their door to collect them.",
        "Most hospital pass boxes have interlocked doors. The interlock, mechanical or electrical, prevents both doors from opening at once, so air and contamination cannot flow directly from one room to the other through the opening. Many units also include a UV lamp for use between transfers, indicator lights showing whether a door is open or a cycle is running, and smooth stainless steel interiors that are easy to wipe clean.",
        "The purpose is the same in every setting: reduce the number of times people cross between rooms, keep doors closed, and help maintain the cleanliness and pressure difference of the cleaner room.",
      ] },
      { heading: "What is a static pass box?", paragraphs: [
        "A static pass box has no fan or filtration system of its own. It is essentially a sealed, interlocked chamber. The air inside the box is whatever air was there when the door last closed.",
        "Because it has no moving air system, a static pass box is simpler, has fewer parts to maintain and generally needs no ongoing filter replacement. It is typically used between two areas of similar cleanliness, or where the items being transferred are already wrapped or packed, so the box only needs to act as a controlled, closed hatch.",
      ], bullets: [
        "No blower or HEPA filter inside the chamber.",
        "Interlocked doors to stop both sides opening at once.",
        "Often fitted with a UV lamp and door-status indicators.",
        "Simpler construction and maintenance.",
      ] },
      { heading: "What is a dynamic pass box?", paragraphs: [
        "A dynamic pass box adds an air system to the chamber. A blower draws air through a pre-filter and a HEPA filter and pushes filtered air through the chamber, so the space inside is actively flushed with clean air. Some designs recirculate the air; others exhaust it.",
        "Dynamic pass boxes are typically used when materials move from a less clean area into a cleaner one and the cleaner side needs extra protection, or where the cleaner room is under a controlled pressure that should not be disturbed. The filtered air helps clear particles that may have entered with the item or when the outer door was opened.",
      ], bullets: [
        "Built-in blower with pre-filter and HEPA filter.",
        "Filtered air flushes the chamber before the inner door is opened.",
        "Interlocked doors, usually with a timed cycle and indicators.",
        "Needs electrical supply and periodic filter checks and replacement.",
      ] },
      { heading: "Static vs dynamic pass box: side-by-side", paragraphs: [
        "Put simply, a static pass box is a closed, interlocked hatch, while a dynamic pass box is an interlocked hatch that also cleans the air inside it. Comparing them across a few practical points makes the choice easier:",
      ], bullets: [
        "Air handling: static has none; dynamic has a blower and HEPA filtration.",
        "Typical use: static between areas of similar cleanliness or for wrapped items; dynamic from a less clean to a cleaner area.",
        "Power: static usually needs power only for UV, interlock and indicators; dynamic also needs it to run the blower.",
        "Maintenance: static mainly needs cleaning and lamp checks; dynamic also needs filter checks and replacement.",
        "Space: dynamic units are usually deeper or taller to house the blower and filter, so the wall opening may differ.",
        "Cost: static units are generally simpler and cost less; dynamic units cost more because of the air system.",
      ] },
      { heading: "Where each type fits in a hospital", paragraphs: [
        "There is no single rule for every hospital, and the final decision should follow your infection-control team's requirements and the classification of the rooms involved. Still, some common patterns help.",
      ] },
      { heading: "Operation theatres", paragraphs: [
        "Pass boxes are often installed between the operation theatre and the clean or dirty corridor, so supplies can go in and used items can come out without opening the main OT doors. Where the theatre is a controlled, positively pressurised clean room and items are coming from a less clean area, a dynamic pass box is commonly considered. Where both sides are similarly clean, or only sealed packs are transferred, a static pass box may be enough. Planning pass boxes together with the modular OT layout, wall panels and HVAC design avoids awkward retrofits later.",
      ] },
      { heading: "CSSD", paragraphs: [
        "In a Central Sterile Services Department, pass boxes help maintain the one-way flow from the dirty decontamination zone to the clean packing zone and on to the sterile store and issue point. They are also used as issue hatches for sterile goods. The choice between static and dynamic depends on which zones the box connects and on the department's own protocols.",
      ] },
      { heading: "Laboratories, pharmacies and ICUs", paragraphs: [
        "Microbiology labs, IVF labs, compounding pharmacies, isolation rooms and some ICUs also use pass boxes to limit traffic through doors. The cleaner and more controlled the receiving room, the more likely it is that a dynamic unit will be specified.",
      ] },
      { heading: "Questions to ask before choosing", paragraphs: [
        "Before you request quotations, it helps to have answers to these questions:",
      ], bullets: [
        "Which two rooms will the pass box connect, and how clean is each one?",
        "Is either room pressure-controlled, and which way should air flow?",
        "What kind of items will be transferred: wrapped sterile packs, open instruments, samples, medicines or waste?",
        "What internal size do you need for the largest item or tray?",
        "What wall type will it be fitted into: modular panel, brick or another partition?",
        "Do you need a UV lamp, a timed cycle, a mechanical or electrical interlock, or extra indicators?",
        "Is a power point available at the location, and who will maintain filters?",
        "What does your infection-control team or the standards your hospital follows require?",
      ] },
      { heading: "Construction details worth checking", paragraphs: [
        "Whichever type you choose, the build quality affects how well the pass box works over time. Smooth, crevice-free interiors with rounded corners are easier to clean. Stainless steel inside surfaces stand up to frequent wiping. Door seals, hinges and interlocks should operate reliably after repeated use. The unit should sit flush and sealed with the wall so the joint does not become a gap for air or dirt.",
        "For dynamic units, ask how filters are accessed and replaced, whether the airflow can be checked, and what routine maintenance is recommended. A pass box that is difficult to service is more likely to be neglected.",
      ] },
      { heading: "Common mistakes", paragraphs: [
        "Problems with pass boxes usually come from planning rather than the product itself:",
      ], bullets: [
        "Choosing a static unit where the receiving room really needs filtered transfer.",
        "Choosing a dynamic unit but not planning for power or filter maintenance.",
        "Making the internal chamber too small for the trays actually used.",
        "Installing at an awkward height or in a corridor where staff cannot reach it easily.",
        "Bypassing the interlock or leaving doors open, which defeats the purpose.",
      ] },
      { heading: "So which one does your hospital need?", paragraphs: [
        "If you are moving already-packed items between rooms of similar cleanliness and want a simple, low-maintenance solution, a static pass box is often the practical choice. If you are moving items into a cleaner, controlled room such as an operation theatre or clean lab and want the chamber itself to be flushed with filtered air, a dynamic pass box is usually the better fit.",
        "Many hospitals use both: dynamic units at the most sensitive transfer points and static units elsewhere. Unicare Medical Solutions supplies dynamic and static pass boxes as part of modular OT, CSSD and hospital infrastructure projects. Share your room layout and requirements and we will help you choose the right type and size.",
      ] },
    ],
  },
];

export function findBlog(slug: string, articles: readonly Blog[] = blogs) {
  return articles.find((article) => article.slug === slug);
}

export const sectionId = (heading: string) =>
  heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
