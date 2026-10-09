import hero from "@/assets/modular-ot-surgical-theatre.png.asset.json";
import otRoom from "@/assets/modular-ot-room.png.asset.json";
import gasImg from "@/assets/mgps-oxygen-outlet.png.asset.json";

/** Built-in homepage copy. Admin edits in `cms_pages` (slug "home") override individual fields; blank fields fall back here. */
export const homeDefaults = {
  heroEyebrow: "Medical Engineering · Manufacturing · Installation",
  heroTitle: "Modular OT & Hospital Infrastructure Solutions in India",
  heroText: "Unicare Medical Solutions designs, manufactures and installs modular operation theatres, medical gas pipeline systems and critical hospital infrastructure for hospitals and healthcare projects across India, with offices in Ghaziabad and works in Faridabad.",
  heroImage: hero.url,
  heroImageAlt: "Professional modular operation theatre by Unicare Medical Solutions",
  heroButton: "Get a Quote",
  productsTitle: "Complete Hospital Infrastructure & Medical Engineering Solutions",
  productsIntro: "Project-ready systems for operation theatres, medical gases, critical care, sterilisation and hospital wards.",
  otTitle: "Modular Operation Theatre Solutions",
  otText: "Unicare provides coordinated Modular OT design, manufacturing and installation for new hospitals and theatre upgrades. Every proposal is prepared around room size, selected materials, airflow requirements and site scope.",
  otImage: hero.url,
  otImageAlt: "Modular operation theatre design and installation",
  mgpsTitle: "Medical Gas Pipeline System (MGPS)",
  mgpsText: "Centralised oxygen, nitrous oxide, medical air and vacuum from source equipment to terminal outlets in wards, ICUs and operation theatres — including manifolds, area valve service units, alarm panels, AGSS and testing.",
  mgpsImage: gasImg.url,
  mgpsImageAlt: "Oxygen terminal outlet with flowmeter and humidifier bottle connected to the medical gas pipeline in a hospital ward",
};
export type HomeContent = typeof homeDefaults;
export type HomeKey = keyof HomeContent;

export const homeFields: { key: HomeKey; label: string; kind?: "area" | "image"; group: string }[] = [
  { group: "Top banner", key: "heroEyebrow", label: "Small line above heading" },
  { group: "Top banner", key: "heroTitle", label: "Main heading (H1)" },
  { group: "Top banner", key: "heroText", label: "Intro text", kind: "area" },
  { group: "Top banner", key: "heroButton", label: "Quote button text" },
  { group: "Top banner", key: "heroImage", label: "Photo", kind: "image" },
  { group: "Top banner", key: "heroImageAlt", label: "Photo ALT text" },
  { group: "Products section", key: "productsTitle", label: "Heading" },
  { group: "Products section", key: "productsIntro", label: "Intro", kind: "area" },
  { group: "Modular OT section", key: "otTitle", label: "Heading" },
  { group: "Modular OT section", key: "otText", label: "Text", kind: "area" },
  { group: "Modular OT section", key: "otImage", label: "Photo", kind: "image" },
  { group: "Modular OT section", key: "otImageAlt", label: "Photo ALT text" },
  { group: "Medical gas section", key: "mgpsTitle", label: "Heading" },
  { group: "Medical gas section", key: "mgpsText", label: "Text", kind: "area" },
  { group: "Medical gas section", key: "mgpsImage", label: "Photo", kind: "image" },
  { group: "Medical gas section", key: "mgpsImageAlt", label: "Photo ALT text" },
];

export function mergeHome(saved: unknown): HomeContent {
  const out = { ...homeDefaults };
  if (saved && typeof saved === "object") for (const k of Object.keys(homeDefaults) as HomeKey[]) {
    const v = (saved as Record<string, unknown>)[k];
    if (typeof v === "string" && v.trim()) out[k] = v;
  }
  return out;
}
