export type City = {
  slug: string; // URL is /modular-ot-manufacturer-{slug}
  name: string;
  state: string;
  intro: string;
  context: string;
  coverage: string;
  logistics: string;
  faqs: { q: string; a: string }[];
};

export const cityPath = (c: Pick<City, "slug">) => `/modular-ot-manufacturer-${c.slug}`;

export const cities: City[] = [
  {
    slug: "ghaziabad", name: "Ghaziabad", state: "Uttar Pradesh",
    intro: "Unicare Medical Solutions has its office in Ghaziabad, on Dasna Road, which makes site visits, design meetings and after-installation support in the city quick to arrange. We plan, manufacture and install modular operation theatres for hospitals and nursing homes across Ghaziabad and nearby NCR areas.",
    context: "Many Ghaziabad projects are upgrades of running hospitals, where an existing OT has to be converted with minimum downtime. Our team plans the work in phases so that other theatres and departments keep working while one room is converted.",
    coverage: "We cover Ghaziabad city, Indirapuram, Vaishali, Raj Nagar, Kaushambi, Modinagar, Muradnagar, Loni and the wider NCR, including Noida and Delhi, from our Ghaziabad office.",
    logistics: "Because our office is in the city and our works are in Faridabad, panels and equipment reach Ghaziabad sites by road without long transit, and our team can attend site meetings at short notice.",
    faqs: [
      { q: "Do you have an office in Ghaziabad?", a: "Yes. Our office is at 357, Malkhan Singh Complex, Opp. Ambedkar Bhawan, Dasna Road, Ghaziabad. You can visit by appointment or ask us to visit your hospital site." },
      { q: "Can you convert an existing OT in a running Ghaziabad hospital?", a: "Yes. After a site assessment we plan the conversion in stages so that the rest of the hospital continues to function during the work." },
      { q: "Do you also serve Noida and Delhi from Ghaziabad?", a: "Yes. Our Ghaziabad team also handles modular OT and MGPS projects across Noida, Delhi and the rest of NCR." },
    ],
  },
  {
    slug: "kanpur", name: "Kanpur", state: "Uttar Pradesh",
    intro: "Unicare designs, manufactures and installs modular operation theatres for hospitals in Kanpur, from single-theatre nursing homes to multi-OT surgical blocks. Every project is planned around the actual room size, departments and budget of the hospital.",
    context: "Kanpur hospitals often ask for a complete package in one contract: OT panels, laminar air flow, HVAC coordination and the medical gas pipeline. Handling these together reduces coordination between multiple vendors and keeps one team responsible for handover.",
    coverage: "We take up projects across Kanpur Nagar, Kanpur Dehat and nearby districts such as Unnao, Fatehpur and Etawah.",
    logistics: "Panels are manufactured at our Faridabad works and transported to Kanpur by road. Installation is carried out by our own team, who stay on site until testing and handover.",
    faqs: [
      { q: "Do you install modular OTs in Kanpur?", a: "Yes. We manufacture the OT panels and systems and install them on site in Kanpur with our own installation team." },
      { q: "Can MGPS and modular OT be done together in a Kanpur hospital?", a: "Yes. We can plan the medical gas pipeline together with the modular OT so outlets, pendants and alarms are placed correctly from the start." },
      { q: "How do I get a quote for a Kanpur project?", a: "Share your room size or drawings by call, WhatsApp or the quote form. We prepare a project-specific quotation after reviewing the requirement." },
    ],
  },
  {
    slug: "varanasi", name: "Varanasi", state: "Uttar Pradesh",
    intro: "Unicare provides modular operation theatre design, manufacturing and installation for hospitals in Varanasi and eastern Uttar Pradesh. We work with hospital owners, doctors and architects to plan theatres that suit both the room and the surgical work being done.",
    context: "Older buildings in Varanasi can have limited ceiling height and irregular room shapes. A site survey before design lets us plan the ceiling, laminar air flow unit and ducting so that the theatre fits the available space.",
    coverage: "We serve Varanasi city and nearby districts including Chandauli, Ghazipur, Jaunpur, Mirzapur and Bhadohi.",
    logistics: "OT panels are factory-made and shipped to site ready for assembly, which keeps on-site civil work and dust lower than conventional construction.",
    faqs: [
      { q: "Can a modular OT be fitted in an older building in Varanasi?", a: "In most cases, yes. We check ceiling height, room shape and services during a site survey and design the OT around them." },
      { q: "Which districts near Varanasi do you cover?", a: "We take up projects in Varanasi, Chandauli, Ghazipur, Jaunpur, Mirzapur, Bhadohi and other parts of eastern UP." },
      { q: "Do you supply laminar air flow systems in Varanasi?", a: "Yes. Laminar air flow with HEPA filtration can be supplied as part of the modular OT or as a separate upgrade." },
    ],
  },
  {
    slug: "prayagraj", name: "Prayagraj", state: "Uttar Pradesh",
    intro: "Unicare is a modular operation theatre manufacturer serving hospitals in Prayagraj. We handle the complete scope, from layout planning and panel manufacturing to installation, testing and handover.",
    context: "Hospitals in Prayagraj planning new surgical wings often need the OT, recovery area and ICU planned together. We can coordinate the modular OT with bed head panels, medical gas outlets and cubicle curtain tracks for the connected areas.",
    coverage: "We work in Prayagraj city and nearby districts including Kaushambi, Pratapgarh, Fatehpur and Mirzapur.",
    logistics: "Projects are delivered by our own team, and the schedule is shared after site assessment so the hospital can plan around the installation.",
    faqs: [
      { q: "Do you do complete OT projects in Prayagraj?", a: "Yes. We cover design, manufacturing, installation, testing and handover of modular OTs in Prayagraj." },
      { q: "Can you also supply ICU bed head panels and curtain tracks?", a: "Yes. Bed head panels, cubicle curtain systems and MGPS outlets can be added to the same project." },
      { q: "Is the price the same for every OT?", a: "No. Price depends on room size, panel material, air flow system, doors and scope. See our pricing guide for indicative ranges." },
    ],
  },
  {
    slug: "gorakhpur", name: "Gorakhpur", state: "Uttar Pradesh",
    intro: "Unicare manufactures and installs modular operation theatres for hospitals and nursing homes in Gorakhpur and the surrounding region. We help facilities set up new theatres or replace conventional OTs with modular systems.",
    context: "For hospitals in Gorakhpur far from metro suppliers, having one supplier for panels, doors, air flow and medical gas reduces repeat site visits and makes later maintenance simpler.",
    coverage: "We cover Gorakhpur and nearby districts including Deoria, Kushinagar, Maharajganj, Basti and Sant Kabir Nagar.",
    logistics: "Material is dispatched from our Faridabad works in planned lots so that installation can proceed without waiting for missing items at site.",
    faqs: [
      { q: "Do you serve hospitals in Gorakhpur?", a: "Yes. We take up modular OT and MGPS projects in Gorakhpur and the nearby districts of eastern UP." },
      { q: "Can a nursing home in Gorakhpur get a single modular OT?", a: "Yes. We design single-theatre projects as well as multi-OT blocks." },
      { q: "Who maintains the OT after installation?", a: "Maintenance support can be discussed with us at the quotation stage, depending on the systems installed." },
    ],
  },
  {
    slug: "agra", name: "Agra", state: "Uttar Pradesh",
    intro: "Unicare provides modular operation theatre solutions for hospitals in Agra, including OT wall and ceiling panels, hermetic doors, laminar air flow and medical gas pipeline systems.",
    context: "Agra is within road reach of our Faridabad works, which helps with quicker material dispatch and site visits during planning and installation.",
    coverage: "We serve Agra city and nearby areas including Mathura, Firozabad, Etah and Fatehabad.",
    logistics: "Being close to our manufacturing unit, Agra projects can get faster site surveys and shorter material transit compared with distant locations.",
    faqs: [
      { q: "Do you install modular OTs in Agra?", a: "Yes. We design, manufacture and install modular OTs for hospitals in Agra and nearby districts." },
      { q: "Can you visit our Agra hospital for a survey?", a: "Yes. Contact us with your location and requirement and we will arrange a site visit." },
      { q: "Do you also cover Mathura and Firozabad?", a: "Yes. Projects in Mathura, Firozabad, Etah and nearby areas are covered by the same team." },
    ],
  },
  {
    slug: "dehradun", name: "Dehradun", state: "Uttarakhand",
    intro: "Unicare designs, manufactures and installs modular operation theatres for hospitals in Dehradun and other parts of Uttarakhand. We plan each OT around the room, the type of surgery and the hospital's budget.",
    context: "Dehradun sees cooler winters and humid monsoons, so OT temperature and humidity control matter through the year. We coordinate the modular OT with the HVAC design so that the surgeon control panel can manage conditions inside the theatre.",
    coverage: "We take up projects in Dehradun, Rishikesh, Haridwar, Roorkee and other parts of Uttarakhand.",
    logistics: "Material is sent by road from our Faridabad works, and the installation plan takes into account hill-area access where relevant.",
    faqs: [
      { q: "Do you take up modular OT projects in Dehradun?", a: "Yes. We serve hospitals in Dehradun and across Uttarakhand, including Rishikesh, Haridwar and Roorkee." },
      { q: "Is HVAC included with the modular OT?", a: "HVAC is coordinated with the OT design. The exact scope is agreed in the quotation based on your requirement." },
      { q: "How long does an installation in Dehradun take?", a: "It depends on project size and site readiness. We share a schedule after the site assessment." },
    ],
  },
];

export const getCity = (slug: string) => cities.find((c) => c.slug === slug);
