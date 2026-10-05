// OT component/system pages from the master brief. Content avoids invented specs, counts or certifications.
export type SystemPage = {
  path: "/modular-ot-wall-panels" | "/modular-ot-ceiling" | "/operation-theatre-hvac-system" | "/hepa-filtration-system-for-operation-theatre" | "/modular-ot-doors" | "/operation-theatre-electrical-system";
  name: string;
  title: string;
  description: string;
  intro: string;
  overview: string[];
  scope: string[];
  considerations: string[];
  faqs: { q: string; a: string }[];
};

export const systemPages: SystemPage[] = [
  {
    path: "/modular-ot-wall-panels",
    name: "Modular OT Wall Panels",
    title: "Modular OT Wall Panels for Operation Theatres | Unicare",
    description: "Modular OT wall panel systems planned around your theatre layout, cleaning needs and integration with doors, pendants, gases and controls. Request a quote.",
    intro: "Wall panel systems that form the clean, jointed inner shell of a modular operation theatre.",
    overview: [
      "Wall panels are the most visible part of a modular OT. They define the room shell, hide services behind a clean surface and carry cut-outs for doors, view panels, gas outlets, switches and control panels.",
      "Unicare plans the panel layout from your room drawings so that every opening, junction and service point is fixed before manufacturing begins.",
    ],
    scope: ["Panel layout drawings matched to room dimensions", "Material options such as stainless steel, PPGI, glass or cladding, as specified for the project", "Coved corners and flush junctions for easier cleaning", "Pre-planned cut-outs for doors, gases, electrical and control panels", "Installation, sealing and handover on site"],
    considerations: ["Final room height and false ceiling level", "Location of medical gas outlets and pendants", "Door positions and view-panel requirements", "Cleaning and disinfection routine followed by the hospital"],
    faqs: [
      { q: "Which wall panel material should we choose?", a: "It depends on budget, cleaning practice and the clinical use of the room. We discuss the options against your project brief before finalising." },
      { q: "Can panels be fitted into an existing OT?", a: "Often yes, after a site survey confirms room dimensions, wall condition and service routing." },
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
  },
];

export const getSystemPage = (path: SystemPage["path"]) => systemPages.find((p) => p.path === path)!;
