export const aboutFaqs = [
  { q: "What does Unicare Medical Solutions supply?", a: "The company works on modular operation theatres, medical gas pipelines, critical-care fit-outs, CSSD and connected hospital infrastructure. The final supply and installation scope is agreed for each project." },
  { q: "Where are the office and works?", a: "The office is on Dasna Road in Ghaziabad. The works are in Adarsh Nagar, Ballabhgarh, District Faridabad. The complete addresses are shown on this page and on Contact." },
  { q: "Can I see the company history and project references?", a: "Project references can be discussed directly with our team during an enquiry, subject to client permission." },
  { q: "What should I send for a quotation?", a: "Send the hospital location, drawings, intended clinical use, equipment list and whether the work is new construction or renovation. Include the standards specified by your consultant." },
  { q: "Does choosing a supplier establish hospital accreditation?", a: "No. Accreditation concerns the hospital and its operations. Materials, systems and acceptance procedures should be reviewed against the requirements specified for the actual project." },
];

export const planningFaqs: Record<string, { q: string; a: string }[]> = {
  "/modular-ot-flooring": [
    { q: "How should an OT floor be selected?", a: "Review room use, cleaning requirements, the electrical design and the condition of the base. Specify a compatible flooring, adhesive, preparation and junction system." },
    { q: "Can flooring be replaced in an existing theatre?", a: "The existing base, retained finishes and authorised shutdown arrangements must be assessed before the replacement scope and programme are agreed." },
    { q: "Is there a published standalone flooring rate?", a: "No company-approved standalone rate is available here. Ask for a quotation separating material, preparation, installation and any agreed testing." },
    { q: "How should the installed floor be maintained?", a: "Follow the selected supplier's cleaning instructions, inspect seams and coving, and use an approved repair process for damage. Agree any electrical-performance checks with the responsible engineer." },
    { q: "What is the typical flooring lead time?", a: "Lead time is confirmed after the subfloor survey, because preparation, curing and installation depend on the existing site." },
  ],
  "/digital-operation-theatre": [
    { q: "What is a digital operation theatre?", a: "It brings selected imaging, display, recording and communication functions into a coordinated theatre workflow. The exact functions depend on the approved configuration." },
    { q: "Can existing imaging equipment be connected?", a: "Compatibility must be checked using actual equipment models and interfaces. Do not assume every source can be connected or controlled by the proposed system." },
    { q: "What should be agreed before recording procedures?", a: "The hospital must approve consent, access, retention and any authorised teaching or external transmission, with its clinical and IT teams." },
    { q: "What determines digital OT pricing?", a: "Sources, displays, compatibility, cabling, storage, licences, installation and support affect the scope. No company-approved integration-system price is published here." },
    { q: "How long does digital OT installation take?", a: "The programme is agreed once equipment compatibility, cabling routes and site readiness have been reviewed for the approved configuration." },
  ],
  "/hepa-filtration-system-for-operation-theatre": [
    { q: "Is a HEPA filter sufficient to establish room performance?", a: "No. The housing, seals, air delivery, upstream filtration and room conditions must work together and be reviewed against the approved project requirements." },
    { q: "How is the correct filter selected?", a: "The HVAC designer reviews the specified filtration requirements, airflow, housing compatibility and maintenance access using the proposed product documentation." },
    { q: "How often should filters be replaced?", a: "There is no fixed interval that fits every room. Follow product guidance, monitoring and the hospital's maintenance and validation plan." },
    { q: "Does a filter certificate replace installed-system checks?", a: "No. Agree the installed-system test scope and acceptance criteria with the hospital before work begins, and retain the relevant records." },
    { q: "What are the price and lead time?", a: "Both are quoted for the specific filter, housing and room scope after the HVAC requirements have been reviewed." },
  ],
};