/**
 * Editorial expansion for compliance and comparison guides (November 24).
 * Appends to the original resource text; general terms only — no clause numbers,
 * figures or certification claims that are not already on the site.
 */
import type { Faq, Section } from "@/data/resources";

export type ResourceExpansion = {
  summary: string; // one-line summary shown under hub cards
  answer: string; // direct answer shown at the top of the article
  table?: { head: [string, string, string]; rows: [string, string, string][] };
  sections: Section[];
  india: { p: string; steps: string[] };
  helps: { p: string; links: { slug: string; anchor: string }[] };
  faqs: Faq[];
};

export const resourceExpansion: Record<string, ResourceExpansion> = {
  "nabh-guidelines-modular-ot": {
    summary: "How NABH accreditation relates to OT zoning, air quality, surfaces and records.",
    answer: "In short, NABH does not approve an operation theatre as a product. It accredits the hospital, and the theatre is reviewed as part of infection control, facility management and patient safety. A modular OT supports those expectations when its zoning, airflow, surfaces and maintenance records are planned together from the start, and when the hospital's own processes keep the theatre in that condition after handover.",
    table: { head: ["Planning area", "What hospitals typically review", "Who usually decides"], rows: [
      ["Zoning", "Protective, clean, sterile and disposal zones with clear movement paths", "Hospital, architect and accreditation consultant"],
      ["Air quality", "Air changes, filtration, pressure relationships and monitoring", "HVAC consultant with the hospital"],
      ["Surfaces", "Cleanable, non-porous walls, ceilings and floors with coved junctions", "Design team with infection control committee"],
      ["Doors and openings", "Controlled entry, sealed doors and pass-through points", "Design team and OT in-charge"],
      ["Records", "Validation, maintenance logs and cleaning schedules", "Hospital quality and engineering teams"],
    ] },
    sections: [
      { h: "Why the theatre is judged as part of the whole hospital", p: ["Assessors look at whether processes are documented, followed and reviewed. A well-built theatre with no cleaning schedule, no maintenance log or no clear entry protocol will not support accreditation on its own. Equally, good processes are harder to follow in a theatre where surfaces crack, doors leak or clean and dirty traffic cross. Construction and operation have to be planned together."] },
      { h: "Common gaps found during planning", p: ["Hospitals preparing for accreditation often find the same practical gaps: the brief does not state which areas form the OT complex, the HVAC design is fixed before the room layout, the disposal route crosses the clean corridor, or nobody has decided who keeps validation records. Resolving these before panels are ordered avoids rework later."] },
    ],
    india: { p: "For hospitals in India planning a new or upgraded theatre, the practical sequence is usually:", steps: [
      "Appoint or consult the accreditation consultant before the OT layout is frozen.",
      "Write a short design brief listing theatres, specialities, zones and movement paths.",
      "Agree air system requirements with the HVAC consultant and record them in the brief.",
      "Choose wall, ceiling, floor and door finishes that suit the hospital's cleaning chemicals.",
      "Decide who keeps validation, cleaning and maintenance records after handover.",
    ] },
    helps: { p: "As modular operation theatre manufacturers, we plan panels, doors, ceilings and service integration around the brief your hospital and consultant approve. We do not certify or accredit hospitals; we build to the requirements you share and hand over the documents for the scope we supply.", links: [
      { slug: "modular-operation-theatre", anchor: "modular operation theatre manufacturers" },
      { slug: "laminar-air-flow", anchor: "laminar air flow system for operation theatres" },
      { slug: "hermetic-ot-door", anchor: "hermetically sealed OT doors" },
    ] },
    faqs: [
      { q: "When should the accreditation consultant be involved in OT planning?", a: "Ideally before the layout is frozen, so zoning, movement paths and air system requirements are agreed before materials are ordered." },
      { q: "Can an existing conventional theatre be upgraded for accreditation?", a: "Often yes. A semi-modular or full modular upgrade can improve surfaces and services, but the hospital's processes and records must also meet the assessment." },
      { q: "Which documents should a hospital keep for its theatres?", a: "Typically design drawings, validation and test records, cleaning schedules and maintenance logs, as advised by the hospital's accreditation consultant." },
    ],
  },
  "mgps-standards": {
    summary: "The standards commonly named for medical gas pipelines and what they broadly cover.",
    answer: "A medical gas pipeline system in India is usually designed to whichever recognised standard the hospital or its consultant names in the tender, most often ISO 7396-1, HTM 02-01 or NFPA 99. These documents broadly cover gas sources, pipeline materials, zoning valves, alarms, outlets and testing. The important step for a hospital is to name one standard and edition clearly, so every bidder designs and tests to the same requirement.",
    table: { head: ["Standard", "Origin", "Typical use in Indian projects"], rows: [
      ["ISO 7396-1", "International standard", "Named in many tenders for pipeline design and testing"],
      ["HTM 02-01", "UK Department of Health guidance", "Referenced by some consultants for design and operational management"],
      ["NFPA 99", "US Health Care Facilities Code", "Referenced by some hospitals for gas and vacuum systems"],
      ["ISO 9170-1", "International standard", "Referenced for terminal units (outlets)"],
    ] },
    sections: [
      { h: "Why mixing standards causes problems", p: ["When a tender lists several standards without saying which one governs, bidders interpret it differently. One may size alarms and valves to one document and test to another. Comparing quotes then becomes difficult, and disagreements appear at commissioning. A single governing standard, with any agreed exceptions written down, keeps design, installation and testing consistent."] },
      { h: "What the hospital still owns", p: ["Standards describe the system, but the hospital decides gas types, the number and location of outlets, source arrangements and who is authorised to operate the system after handover. These decisions belong in the brief before the pipeline design is drawn."] },
    ],
    india: { p: "Practical steps for Indian hospitals specifying a medical gas pipeline:", steps: [
      "Name one governing standard and its edition in the tender documents.",
      "List gases, outlet locations and quantities room by room.",
      "Decide the source arrangement, such as manifold room, cylinders or liquid oxygen, with the consultant.",
      "Ask every bidder for a testing and commissioning plan to the named standard.",
      "Plan statutory approvals for gas storage early, as advised by your consultant.",
    ] },
    helps: { p: "We design and install medical gas pipelines to the standard your project names, and plan testing accordingly. Related systems we supply are listed below.", links: [
      { slug: "medical-gas-pipeline-system", anchor: "medical gas pipeline system" },
      { slug: "agss", anchor: "anaesthetic gas scavenging system (AGSS)" },
      { slug: "bed-head-panel", anchor: "bed head panels with gas outlets" },
    ] },
    faqs: [
      { q: "Can one project follow more than one MGPS standard?", a: "It is better to name one governing standard and record any agreed exceptions, so design and testing are consistent." },
      { q: "Who decides which MGPS standard applies?", a: "Usually the hospital or its consultant, through the tender or design brief." },
    ],
  },
  "htm-02-01": {
    summary: "UK guidance on medical gas pipelines and how Indian tenders sometimes reference it.",
    answer: "HTM 02-01 is UK Department of Health guidance on medical gas pipeline systems. It is not mandatory in India, but some Indian hospitals and consultants reference it in tenders because it covers both design and day-to-day operational management. If your specification names HTM 02-01, confirm the edition and which parts apply, then make sure the pipeline design, testing and the hospital's own operating procedures follow it consistently.",
    table: { head: ["Part", "Broad focus", "Main audience"], rows: [
      ["Part A", "Design, installation, validation and verification", "Designers, installers and consultants"],
      ["Part B", "Operational management", "Hospital estates, engineering and clinical users"],
      ["Both parts", "Safe supply of medical gases to patients", "Hospital management"],
    ] },
    sections: [
      { h: "Why operational management matters", p: ["Many pipeline problems arise after handover: unplanned shutdowns, work carried out without isolation, or alarms that nobody responds to. HTM 02-01 gives weight to how a hospital manages its system, including who is authorised to carry out work and how permits for work are controlled. Hospitals that adopt it for design should consider adopting its operational approach as well."] },
      { h: "Adapting UK guidance to an Indian project", p: ["Local regulations, available materials and site conditions differ from the UK. Where the tender references HTM 02-01, the consultant should say whether it governs fully or is used as a reference, and how local statutory requirements fit alongside it."] },
    ],
    india: { p: "Steps for Indian hospitals considering HTM 02-01:", steps: [
      "Confirm with the consultant whether HTM 02-01 is the governing document or a reference.",
      "Specify the edition and the parts that apply to the project.",
      "Ask bidders to describe how their testing and commissioning follows the named guidance.",
      "Assign hospital staff responsibilities for operating the system after handover.",
      "Keep test records and drawings together for future work and audits.",
    ] },
    helps: { p: "Where a tender names HTM 02-01, we plan the pipeline design and testing to the relevant guidance and hand over records for our scope.", links: [
      { slug: "medical-gas-pipeline-system", anchor: "medical gas pipeline system" },
      { slug: "manifold-room-system", anchor: "manifold room system for oxygen supply" },
      { slug: "oxygen-outlet", anchor: "medical gas and oxygen outlets" },
    ] },
    faqs: [
      { q: "What is the difference between Part A and Part B of HTM 02-01?", a: "Part A covers design, installation, validation and verification; Part B covers operational management of the system." },
      { q: "Can HTM 02-01 be used together with Indian regulations?", a: "Yes. It is guidance; local statutory requirements still apply, and the consultant should explain how the two fit together." },
      { q: "Does HTM 02-01 cover outlets and alarms?", a: "Yes. It broadly addresses terminal units and alarm and warning systems as part of the pipeline." },
    ],
  },
  "nfpa-99": {
    summary: "The US Health Care Facilities Code and its medical gas, vacuum and electrical topics.",
    answer: "NFPA 99 is the US Health Care Facilities Code from the National Fire Protection Association. Despite the name, it is not only about fire: it covers medical gas and vacuum systems, electrical systems and risk categories in healthcare buildings. It is not mandatory in India, but some hospitals and consultants reference it for pipeline design and testing. When it is named, the edition in the project documents should be followed.",
    table: { head: ["Topic", "What it broadly addresses", "Relevance to Indian projects"], rows: [
      ["Gas and vacuum systems", "Sources, distribution, alarms, outlets and testing", "Referenced by some tenders for MGPS"],
      ["Electrical systems", "Power arrangements for patient care areas", "Referenced by some consultants for OT and ICU design"],
      ["Risk categories", "Classifying systems by the consequence of failure", "Helps prioritise redundancy decisions"],
    ] },
    sections: [
      { h: "How a risk-based approach helps planning", p: ["NFPA 99 encourages hospitals to think about what happens if a system fails and who would be affected. This way of thinking is useful even where the code is not formally adopted: it helps a hospital decide where backup supplies, alarms and isolation valves matter most."] },
      { h: "Points to confirm in the tender", p: ["If NFPA 99 is named, the tender should state the edition, which chapters apply and whether local requirements take priority where they differ. Without this, bidders may assume different scopes."] },
    ],
    india: { p: "Steps for Indian hospitals referencing NFPA 99:", steps: [
      "State the edition and applicable chapters in the specification.",
      "Clarify how local statutory requirements apply alongside it.",
      "Identify critical areas such as OTs and ICUs where failure has the greatest impact.",
      "Ask bidders for a testing plan aligned to the named code.",
      "Keep commissioning and test records with the as-built drawings.",
    ] },
    helps: { p: "We plan medical gas and theatre work to the code your consultant specifies, including projects referencing NFPA 99.", links: [
      { slug: "medical-gas-pipeline-system", anchor: "medical gas pipeline system" },
      { slug: "modular-operation-theatre", anchor: "modular operation theatre manufacturers" },
      { slug: "modular-icu-nicu", anchor: "modular ICU and NICU solutions" },
    ] },
    faqs: [
      { q: "Is NFPA 99 mandatory in India?", a: "No. It is a US code that some Indian projects reference voluntarily through their specifications." },
      { q: "Does NFPA 99 cover operation theatre electrical systems?", a: "It includes electrical systems for healthcare facilities, which consultants may reference for patient care areas." },
      { q: "Which edition of NFPA 99 should be used?", a: "The edition named in the project documents, as confirmed by the hospital's consultant." },
    ],
  },
  "iso-13485": {
    summary: "What a medical device quality management certificate covers and how to check it.",
    answer: "ISO 13485 is the international standard for quality management systems in organisations that design, make, install or service medical devices. It certifies how an organisation manages quality, not an individual product. For hospitals, the practical use is simple: when buying equipment such as surgical lights or pendants, ask for the manufacturer's current certificate and check that its scope covers the product being supplied.",
    table: { head: ["Question", "What to check", "Why it matters"], rows: [
      ["Who holds the certificate?", "Manufacturer's legal name and site", "Should match the maker of the supplied product"],
      ["Is it current?", "Validity dates on the certificate", "Expired certificates give no assurance"],
      ["What is the scope?", "Products and activities listed", "Must include the product being bought"],
      ["Product evidence", "Separate product standard test reports", "ISO 13485 does not test the product itself"],
    ] },
    sections: [
      { h: "Certificate versus product evidence", p: ["A quality management certificate shows the manufacturer has controlled processes for design, purchasing, production and complaint handling. It does not show that a particular light or pendant meets a performance or safety standard. Hospitals should ask for both: the management system certificate and the product's own test evidence."] },
      { h: "Suppliers, distributors and installers", p: ["The organisation selling or installing equipment may not be the manufacturer. In that case, the certificate that matters for the product is the manufacturer's. Ask clearly who makes the product and whose documents are being provided."] },
    ],
    india: { p: "Steps for Indian hospitals reviewing quality documents:", steps: [
      "List the medical equipment in the project and its manufacturers.",
      "Request each manufacturer's current quality management certificate.",
      "Check that the certificate scope covers the supplied product.",
      "Request product test reports or declarations separately.",
      "Ask for applicable regulatory registration or licence details for each device.",
    ] },
    helps: { p: "We help hospitals compare equipment and gather the manufacturer documents available for the models offered. We do not claim certifications we do not hold.", links: [
      { slug: "led-surgical-light", anchor: "LED surgical lights for operation theatres" },
      { slug: "ot-pendant", anchor: "OT pendant systems" },
    ] },
    faqs: [
      { q: "Who should hold the ISO 13485 certificate?", a: "The organisation that designs or manufactures the device; for a product purchase, the manufacturer's certificate is the relevant one." },
      { q: "How can a hospital check a certificate's scope?", a: "Read the products and activities listed on the certificate and confirm they include the item being purchased." },
      { q: "Is ISO 13485 the same as ISO 9001?", a: "No. Both are quality management standards, but ISO 13485 is specific to medical devices." },
    ],
  },
  "cdsco-mdr-2017": {
    summary: "India's Medical Devices Rules, 2017, risk classes and what buyers should ask for.",
    answer: "Medical devices in India are regulated under the Medical Devices Rules, 2017, with CDSCO as the national regulator and state authorities handling some lower-risk categories. Devices are classified by risk from Class A to Class D. For hospitals, the key point is that equipment such as surgical lights may be regulated devices, while building infrastructure such as wall panels generally is not, so ask suppliers for registration or licence details device by device.",
    table: { head: ["Item type", "Generally a medical device?", "What to ask the supplier"], rows: [
      ["OT wall and ceiling panels", "Generally no", "Material and finish details"],
      ["Surgical lights", "May be, depending on notifications", "Applicable registration or licence"],
      ["OT pendants and ICU equipment", "May be, depending on the product", "Applicable registration or licence"],
      ["Pipeline outlets and accessories", "Depends on the product", "Manufacturer documents and regulatory status"],
    ] },
    sections: [
      { h: "Why classification matters to buyers", p: ["The risk class influences which authority licenses a device and what documents the manufacturer or importer must hold. A buyer does not need to classify devices personally, but should know which items in a project may be regulated and request the relevant documents before purchase."] },
      { h: "Imported versus Indian-made devices", p: ["Both imported and Indian-made devices fall under the rules where they apply. The importer or manufacturer holds the relevant licence. Ask who that is for each product, rather than assuming the reseller or installer holds it."] },
    ],
    india: { p: "Practical steps for hospitals buying equipment:", steps: [
      "Separate infrastructure items from medical equipment in the project list.",
      "For each device, ask whether it is notified and which licence applies.",
      "Request the licence or registration details from the manufacturer or importer.",
      "Check current notifications with your consultant, as coverage changes over time.",
      "Keep regulatory documents with the purchase records.",
    ] },
    helps: { p: "We supply theatre infrastructure and equipment and help hospitals collect the manufacturer documents available for each product offered.", links: [
      { slug: "led-surgical-light", anchor: "LED surgical lights" },
      { slug: "ot-pendant", anchor: "ceiling-mounted OT pendants" },
      { slug: "modular-icu-nicu", anchor: "modular ICU and NICU solutions" },
    ] },
    faqs: [
      { q: "What are the risk classes under the Medical Devices Rules, 2017?", a: "Class A (low), Class B (low to moderate), Class C (moderate to high) and Class D (high risk)." },
      { q: "Are modular OT panels medical devices?", a: "Building infrastructure such as wall panels is generally not a medical device, while some theatre equipment may be." },
      { q: "Who holds the licence for an imported device?", a: "Generally the importer or manufacturer; ask the supplier who holds it for each product." },
    ],
  },
  "iec-60601-2-41-surgical-lights": {
    summary: "The particular safety and performance standard for surgical and diagnostic luminaires.",
    answer: "IEC 60601-2-41 is the particular standard for the basic safety and essential performance of surgical and diagnostic luminaires. It sits within the IEC 60601 family for medical electrical equipment and addresses illuminance, light field, shadow dilution, colour rendering, radiant energy and behaviour on a single fault. When buying a surgical light, ask for the manufacturer's test report or declaration for the exact model, together with its rated performance data.",
    table: { head: ["Topic", "What it describes", "Why surgeons care"], rows: [
      ["Central illuminance", "Light level at the centre of the field", "Visibility in deep cavities"],
      ["Light field size", "Area that is usefully lit", "Coverage of the incision"],
      ["Shadow dilution", "Light remaining when heads or hands block part of it", "Fewer working shadows"],
      ["Colour rendering", "How true tissue colours appear", "Distinguishing tissue types"],
      ["Single fault behaviour", "Performance if a light source fails", "Surgery can continue safely"],
    ] },
    sections: [
      { h: "Comparing models on equal terms", p: ["Catalogue figures are only comparable when they are measured the same way. Asking for data declared to IEC 60601-2-41 helps hospitals compare models from different manufacturers on a consistent basis rather than relying on brochure wording."] },
      { h: "Installation and room fit", p: ["Even a well-tested light must suit the room: ceiling height and structure, pendant and laminar air flow positions, and the number of light heads all affect the result. These are planned together with the theatre layout."] },
    ],
    india: { p: "Steps for Indian hospitals buying surgical lights:", steps: [
      "Decide the number of light heads by speciality and theatre size.",
      "Request IEC 60601-2-41 test reports or declarations for each shortlisted model.",
      "Compare rated illuminance, light field and colour rendering data side by side.",
      "Check the ceiling structure and coordinate with pendants and LAF positions.",
      "Confirm local service support and spare part availability.",
    ] },
    helps: { p: "We supply surgical lights and plan their position with the theatre ceiling and services.", links: [
      { slug: "led-surgical-light", anchor: "LED surgical light suppliers" },
      { slug: "modular-operation-theatre", anchor: "modular operation theatre manufacturers" },
      { slug: "ot-pendant", anchor: "OT pendant systems" },
    ] },
    faqs: [
      { q: "Is IEC 60601-2-41 part of a larger standard family?", a: "Yes. It is a particular standard within the IEC 60601 series for medical electrical equipment." },
      { q: "What should a buyer request from the supplier?", a: "The manufacturer's test report or declaration for the specific model, with its rated performance data." },
      { q: "Does the standard decide how many light heads an OT needs?", a: "No. The number of heads is a clinical and design decision based on speciality and room layout." },
    ],
  },
  "modular-ot-vs-conventional-ot": {
    summary: "Cleaning, site work, upgrades and cost factors compared for both theatre types.",
    answer: "A modular OT uses factory-made panels with sealed joints and planned services, while a conventional OT is built with masonry, plaster and site finishes. Modular theatres are usually easier to clean, involve less wet site work and are simpler to upgrade, but generally cost more at the start. Conventional theatres cost less initially but need more site work and are harder to modify. The right choice depends on budget, timeline and infection control priorities.",
    sections: [
      { h: "Cost over the life of the theatre", p: ["Comparing only the initial quotation can mislead. Hospitals should also consider repainting and repair of cracked plaster, downtime during maintenance, and the cost of breaking walls to reroute services later. A modular theatre often reduces these later disruptions, while a conventional theatre may suit projects with tight initial budgets and stable long-term use."] },
      { h: "Timeline and site disruption", p: ["In a working hospital, dust, noise and curing time affect neighbouring departments. Modular construction moves much of the work to the factory, so site activity is mostly assembly. Exact durations depend on the scope and site readiness and are confirmed in the project plan."] },
    ],
    india: { p: "Practical steps for Indian hospitals choosing between the two:", steps: [
      "Define the specialities and number of theatres in the brief.",
      "Decide whether the project is new construction or an upgrade of an existing OT.",
      "Ask for quotes covering the same scope: walls, ceiling, floor, doors, HVAC interface and services.",
      "Compare long-term maintenance and upgrade needs, not just the initial price.",
      "Consider a semi-modular upgrade where budget or structure limits a full modular OT.",
    ] },
    helps: { p: "We build full and semi-modular theatres and can help you compare both routes on the same scope.", links: [
      { slug: "modular-operation-theatre", anchor: "modular operation theatre manufacturers" },
      { slug: "hermetic-ot-door", anchor: "hermetic sliding OT doors" },
      { slug: "laminar-air-flow", anchor: "laminar air flow ceiling" },
    ] },
    faqs: [
      { q: "Can a conventional OT be converted into a modular OT?", a: "Often yes, through a semi-modular or full modular upgrade, depending on the structure and services in the existing room." },
      { q: "Is a modular OT easier to clean?", a: "Generally yes, because panels have smooth, non-porous surfaces with sealed joints and coved corners." },
      { q: "Does a modular OT need less site work?", a: "Usually, since panels are made in the factory and assembled at site, reducing wet civil work and curing time." },
    ],
  },
  "puf-vs-hpl-ot-panels": {
    summary: "Insulating panel cores versus hard-wearing laminate finishes for modular OT walls.",
    answer: "PUF and HPL are not direct alternatives. PUF is an insulating foam core used inside sandwich panels with metal skins, while HPL is a hard, decorative laminate surface used for wall cladding. A modular OT wall may use one or both, depending on insulation needs, impact resistance, the hospital's cleaning chemicals and budget. The right panel is chosen after reviewing the room, the HVAC design and how the theatre will be cleaned.",
    sections: [
      { h: "Questions that decide the panel", p: ["Does the wall need insulation because it faces an unconditioned space? Will trolleys and equipment strike it often? Which disinfectants will be used daily? Is the hospital upgrading an existing room where wall thickness is limited? The answers usually point clearly to a construction and finish."] },
      { h: "Joints and finishing details", p: ["Whatever the panel, joints, corners and service penetrations decide how cleanable the room is. Sealed joints, coved junctions and properly finished cut-outs for switches, outlets and viewing windows matter as much as the panel material itself."] },
    ],
    india: { p: "Practical steps for Indian hospitals choosing panels:", steps: [
      "Share the room layout and adjoining spaces with the panel supplier.",
      "List the cleaning chemicals your infection control team uses.",
      "Identify impact zones such as trolley routes and door surrounds.",
      "Ask for samples of the proposed panel and finish.",
      "Compare quotes for the same panel build-up and joint details.",
    ] },
    helps: { p: "We recommend a panel system after reviewing your room and HVAC design. See our modular theatre options below.", links: [
      { slug: "modular-operation-theatre", anchor: "modular operation theatre manufacturers" },
      { slug: "hermetic-ot-door", anchor: "matching hermetic OT doors" },
    ] },
    faqs: [
      { q: "What does PUF stand for?", a: "Polyurethane foam, an insulating core used inside sandwich panels." },
      { q: "What does HPL stand for?", a: "High-pressure laminate, a hard-wearing decorative surface sheet used for wall cladding." },
      { q: "Can PUF and HPL be used in the same theatre?", a: "Yes. Some designs combine an insulating panel construction with a laminate finish where the project requires it." },
    ],
  },
  "laf-vs-conventional-hvac": {
    summary: "How a laminar air flow ceiling differs from mixed-flow HVAC in an operation theatre.",
    answer: "Laminar air flow and conventional HVAC are not either-or choices. Conventional HVAC conditions the theatre and mixes supply air with room air, while a laminar air flow ceiling delivers HEPA-filtered air in a unidirectional flow over the operating table. LAF is usually specified for speciality theatres and always works with the HVAC system, which still conditions and supplies the air. The surgical speciality and design brief decide whether LAF is needed.",
    sections: [
      { h: "How the two work together", p: ["The air handling unit, ducting and controls condition the air for temperature and humidity. The LAF ceiling is the terminal that delivers that air over the surgical zone in a controlled pattern. Planning them separately often causes mismatched airflow, so both should be designed as one system."] },
      { h: "Room layout considerations", p: ["The LAF ceiling position fixes where the operating table, surgical lights and pendants can go. Return air paths, door positions and staff movement also affect performance. These are agreed in the layout before installation."] },
    ],
    india: { p: "Practical steps for Indian hospitals planning theatre air systems:", steps: [
      "List the specialities each theatre will serve.",
      "Agree with the consultant which theatres need a laminar air flow ceiling.",
      "Design HVAC and LAF together as one system.",
      "Coordinate table, light and pendant positions with the LAF ceiling.",
      "Plan validation and filter maintenance before handover.",
    ] },
    helps: { p: "We plan the theatre and its air terminals together with your HVAC consultant.", links: [
      { slug: "laminar-air-flow", anchor: "laminar air flow system for operation theatres" },
      { slug: "modular-operation-theatre", anchor: "modular operation theatre manufacturers" },
    ] },
    faqs: [
      { q: "Does LAF replace the HVAC system?", a: "No. The HVAC system still conditions and supplies the air; LAF delivers it over the surgical zone." },
      { q: "Which theatres commonly specify LAF?", a: "Speciality theatres such as orthopaedic, joint replacement and cardiac theatres, as decided by the design brief." },
      { q: "Does the LAF ceiling affect equipment layout?", a: "Yes. Its position guides where the table, surgical lights and pendants are placed." },
    ],
  },
  "single-arm-vs-double-arm-ot-pendant": {
    summary: "Reach, flexibility, ceiling load and cost compared for OT pendant configurations.",
    answer: "Choose a single-arm pendant for smaller theatres, ICUs and fixed workflows, and a double-arm pendant for larger or multi-speciality theatres that need wider reach and flexible positioning. Both bring medical gases, power and equipment shelves down from the ceiling. Double-arm pendants cost more and place more load on the ceiling structure, so the structure must be checked. Room size, devices carried and table position decide the final configuration.",
    sections: [
      { h: "What the pendant carries", p: ["List the gases, electrical sockets, data points and equipment each pendant must hold. Anaesthesia pendants and surgical pendants often carry different items, so many theatres use separate pendants for each side of the table."] },
      { h: "Ceiling coordination", p: ["Pendants share the ceiling with the laminar air flow ceiling, surgical lights and lighting fixtures. Their mounting points and swing areas must be planned so arms do not collide with lights or block airflow over the table."] },
    ],
    india: { p: "Practical steps for Indian hospitals choosing pendants:", steps: [
      "Measure the room and mark the operating table position.",
      "List devices, gases and sockets needed on each side of the table.",
      "Have the ceiling structure checked for the proposed pendant load.",
      "Coordinate pendant positions with surgical lights and the LAF ceiling.",
      "Compare quotes for the same configuration and accessories.",
    ] },
    helps: { p: "We supply OT pendants and plan them with the theatre ceiling and gas supply.", links: [
      { slug: "ot-pendant", anchor: "OT pendant suppliers" },
      { slug: "medical-gas-pipeline-system", anchor: "medical gas pipeline system" },
      { slug: "led-surgical-light", anchor: "LED surgical lights" },
    ] },
    faqs: [
      { q: "Can a pendant be used in an ICU?", a: "Yes. Single-arm pendants are often used in ICUs where workflows are fixed." },
      { q: "Does a double-arm pendant need a stronger ceiling?", a: "It places more load on the ceiling, so the structure must be checked before installation." },
      { q: "Should anaesthesia and surgical pendants be separate?", a: "Many theatres use separate pendants because each side of the table needs different gases and devices." },
    ],
  },
  "indian-vs-imported-surgical-lights": {
    summary: "Performance data, compliance documents, service and spares to compare before buying.",
    answer: "Neither Indian-made nor imported surgical lights are automatically better. Good and poor models exist in both groups. Compare documented performance such as illuminance, light field and colour rendering, check IEC 60601-2-41 test evidence and applicable CDSCO registration, and weigh local service response and spare part lead times. The best value is the model that meets your theatre's needs at a sensible total cost over its working life.",
    sections: [
      { h: "Service and downtime", p: ["A surgical light that fails can delay a list of operations. Ask who will attend a breakdown, how quickly, and whether common spares are stocked locally. Imported spares may take longer to arrive, while local manufacturers may respond faster; confirm this for each supplier rather than assuming."] },
      { h: "Comparing total cost", p: ["Total cost includes purchase price, installation, maintenance visits, spare parts and expected downtime. A lower purchase price can be outweighed by long repair waits, and a higher price is only justified if the performance and support are documented."] },
    ],
    india: { p: "Practical steps for Indian hospitals comparing surgical lights:", steps: [
      "Shortlist models from both Indian and imported sources.",
      "Request performance data and IEC 60601-2-41 evidence for each model.",
      "Ask for applicable regulatory registration or licence details.",
      "Confirm service response arrangements and spare part availability.",
      "Compare total cost over the expected working life.",
    ] },
    helps: { p: "We help hospitals compare suitable surgical lights for their theatres and budget.", links: [
      { slug: "led-surgical-light", anchor: "LED surgical lights for operation theatres" },
      { slug: "modular-operation-theatre", anchor: "modular operation theatre manufacturers" },
      { slug: "ot-pendant", anchor: "OT pendant systems" },
    ] },
    faqs: [
      { q: "What documents should come with a surgical light?", a: "Performance data, IEC 60601-2-41 test evidence or declaration, and applicable regulatory registration details." },
      { q: "Are spare parts easier to get for Indian-made lights?", a: "Often, but it varies by supplier; confirm spare availability and lead times for each model." },
      { q: "Should price be the main deciding factor?", a: "No. Compare total cost, including service, spares and downtime, alongside documented performance." },
    ],
  },
};

export const complianceHubExtra = [
  "Each guide now follows the same structure: a short answer to the main question, a summary table, the topics the reference broadly covers, practical steps for Indian hospitals and the related products we supply. The intention is to help a hospital team arrive at a design meeting with clear questions rather than assumptions.",
];
export const comparisonHubExtra = [
  "Each comparison starts with a direct answer, then sets out a side-by-side table, the factors that usually decide the choice, practical steps for Indian hospitals and links to the related products. None of the comparisons declares a universal winner, because the right option depends on the clinical brief, the room and the budget.",
];
