import modularOt from "@/assets/modular-ot.webp";
import gas from "@/assets/gas-pipeline.webp";
import laminar from "@/assets/laminar.webp";

export type Blog = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string; // ISO
  image: string;
  relatedProducts: string[];
  body: { h: string; p: string[] }[];
  faqs?: { q: string; a: string }[];
};

export const blogs: Blog[] = [
  {
    slug: "what-is-a-modular-operation-theatre",
    title: "What Is a Modular Operation Theatre?",
    category: "Modular OT",
    excerpt: "How modular OTs differ from conventional theatres, what they are made of, and when hospitals choose them.",
    date: "2026-09-20",
    image: modularOt,
    relatedProducts: ["modular-operation-theatre", "laminar-air-flow"],
    body: [
      { h: "Definition", p: ["A modular operation theatre is a surgical room built using pre-engineered wall and ceiling panels manufactured off-site and assembled at the hospital. Services such as HVAC, laminar air flow, medical gases, lighting and controls are integrated into the panel system."] },
      { h: "Key components", p: ["Typical components include wall and ceiling panels, a laminar air flow unit with HEPA filters, hermetic doors, a surgeon control panel, pendants, surgical lights, storage cabinets and appropriate flooring."] },
      { h: "Modular vs conventional OT", p: ["Compared with brick-and-plaster theatres, modular OTs offer seamless surfaces that are easier to clean, faster installation and simpler future upgrades."] },
    ],
    faqs: [{ q: "Is a modular OT suitable for small hospitals?", a: "Yes. Modular OTs are designed to the room size available, from single-theatre nursing homes to large hospital OT complexes." }],
  },
  {
    slug: "modular-operation-theatre-cost-in-india",
    title: "Modular Operation Theatre Cost in India: What Affects the Price",
    category: "Modular OT",
    excerpt: "The main factors that decide the cost of a modular OT project, and how to get an accurate quotation.",
    date: "2026-09-12",
    image: modularOt,
    relatedProducts: ["modular-operation-theatre"],
    body: [
      { h: "Why there is no single price", p: ["Modular OT cost varies from project to project. Room size, panel material, laminar air flow specification, door type, control systems, pendants, lights and HVAC scope all change the final figure."] },
      { h: "Main cost factors", p: ["Room dimensions and number of theatres; wall and ceiling panel material; laminar air flow size; hermetic doors; surgeon control panel; flooring; and installation conditions at site."] },
      { h: "Getting an accurate quote", p: ["Share your floor plan, room sizes, the type of surgeries planned and your timeline. A site assessment then allows a project-specific quotation."] },
    ],
  },
  {
    slug: "medical-gas-pipeline-system-explained",
    title: "Medical Gas Pipeline System (MGPS) Explained",
    category: "Medical Gas",
    excerpt: "Source equipment, pipelines, valves, alarms and outlets — how a hospital MGPS works.",
    date: "2026-09-02",
    image: gas,
    relatedProducts: ["medical-gas-pipeline-system", "bed-head-panel", "agss"],
    body: [
      { h: "What MGPS does", p: ["An MGPS supplies medical gases from a central plant room to the points of use in wards, ICUs and operation theatres."] },
      { h: "Main parts", p: ["Source equipment such as manifolds and compressors, copper distribution pipelines, area valve service units, alarm panels and terminal outlets."] },
      { h: "Installation process", p: ["Planning and drawings, pipeline installation, outlet fixing, pressure testing, purging and commissioning before handover."] },
    ],
  },
  {
    slug: "laminar-air-flow-in-operation-theatre",
    title: "Laminar Air Flow in the Operation Theatre",
    category: "Laminar Air Flow",
    excerpt: "What laminar air flow is, how it works with OT HVAC, and what to consider when specifying it.",
    date: "2026-08-25",
    image: laminar,
    relatedProducts: ["laminar-air-flow", "modular-operation-theatre"],
    body: [
      { h: "How it works", p: ["A laminar air flow unit above the operating table delivers HEPA-filtered air downward in a steady, low-turbulence stream over the surgical zone."] },
      { h: "What to specify", p: ["Unit size relative to the operating zone, filter type, housing material and integration with the theatre's air-handling unit."] },
    ],
  },
];

export const getBlog = (slug: string) => blogs.find((b) => b.slug === slug);
