import { products } from "@/data/products";
import { Activity, BedDouble, Armchair, PanelsTopLeft, ShieldCheck, Wrench, AirVent, DoorOpen, Droplets, Fan, Grid3x3, Hospital, LayoutPanelTop, Wind, Zap } from "lucide-react";

export type SolutionItem = { label: string; desc: string; path: string; productSlug?: string; icon: typeof Activity };
const p = (slug: string) => `/products/${slug}`;

/** Single source for desktop mega menu and mobile accordion. */
export const solutionGroups: { title: string; items: SolutionItem[] }[] = [
  { title: "Operation Theatre", items: [
    { label: "Modular Operation Theatre", desc: "Complete modular OT design and installation for hospitals.", path: p("modular-operation-theatre"), productSlug: "modular-operation-theatre", icon: Hospital },
    { label: "Modular OT Wall Panels", desc: "Factory-made wall panel systems for clean OT interiors.", path: "/modular-ot-wall-panels", icon: LayoutPanelTop },
    { label: "Modular OT Ceiling", desc: "Panelled ceiling systems integrated with OT services.", path: "/modular-ot-ceiling", icon: Grid3x3 },
    { label: "OT Doors", desc: "Hermetic and swing doors suited to operation theatres.", path: "/modular-ot-doors", icon: DoorOpen },
  ] },
  { title: "Air & Filtration", items: [
    { label: "OT HVAC System", desc: "Air management designed for operation theatre environments.", path: "/operation-theatre-hvac-system", icon: Fan },
    { label: "HEPA Filtration", desc: "Filtration for controlled, cleaner theatre air.", path: "/hepa-filtration-system-for-operation-theatre", icon: AirVent },
    { label: "Laminar Air Flow", desc: "Ceiling-mounted unidirectional airflow over the surgical zone.", path: p("laminar-air-flow"), productSlug: "laminar-air-flow", icon: Wind },
  ] },
  { title: "OT Equipment & Infrastructure", items: [
    { label: "Medical Gas Pipeline", desc: "Oxygen, vacuum and air pipeline systems for hospitals.", path: p("medical-gas-pipeline-system"), productSlug: "medical-gas-pipeline-system", icon: Activity },
    { label: "Surgical Scrub Stations", desc: "Stainless steel scrub sinks for pre-surgery hand washing.", path: p("surgical-scrub-sink-station"), productSlug: "surgical-scrub-sink-station", icon: Droplets },
    { label: "OT Electrical Infrastructure", desc: "Power, lighting and control panels for theatres.", path: "/operation-theatre-electrical-system", icon: Zap },
  ] },
];

// Any product in the catalogue not listed above is added automatically, so new products appear in the menu.
const extraIcons: Record<string, typeof Activity> = { agss: ShieldCheck, "cssd-systems": Wrench, "hospital-furniture": Armchair, "bed-head-panel": BedDouble, "cubicle-curtain-system": PanelsTopLeft };
const listed = new Set(solutionGroups.flatMap((g) => g.items.map((i) => i.productSlug).filter(Boolean)));
const extraDesc: Record<string, string> = { agss: "Removal of waste anaesthetic gases from theatres.", "cssd-systems": "Planning and equipment for sterile services.", "hospital-furniture": "Beds and furniture for wards and ICUs.", "bed-head-panel": "Bed head panels with integrated gas outlets.", "cubicle-curtain-system": "Ceiling curtain tracks for wards and ICUs." };
const shortDesc = (t: string) => { const w = t.split(" "); let o = ""; for (const x of w) { if ((o + " " + x).length > 60) break; o = o ? o + " " + x : x; } return o.replace(/[.,;]$/, "") + "."; };
solutionGroups.push({ title: "Hospital Infrastructure", items: [] });
solutionGroups[3]!.items.push(...products.filter((x) => !listed.has(x.slug)).map((x) => ({
  label: x.name.replace(/\s*\(.*\)$/, "").split(" / ")[0]!, desc: extraDesc[x.slug] ?? shortDesc(x.short), path: `/products/${x.slug}`, productSlug: x.slug, icon: extraIcons[x.slug] ?? Activity,
})));

export const solutionPaths = solutionGroups.flatMap((g) => g.items.map((i) => i.path));
export const isSolutionPath = (pathname: string) =>
  pathname.startsWith("/solutions") || pathname.startsWith("/products") || solutionPaths.some((x) => pathname === x || pathname.startsWith(x + "/"));
export const isActiveItem = (pathname: string, path: string) => pathname === path || pathname.startsWith(path + "/");
