import { Activity, AirVent, DoorOpen, Droplets, Fan, Grid3x3, Hospital, LayoutPanelTop, Wind, Zap } from "lucide-react";

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
  { title: "Air Management", items: [
    { label: "OT HVAC System", desc: "Air management designed for operation theatre environments.", path: "/operation-theatre-hvac-system", icon: Fan },
    { label: "HEPA Filtration", desc: "Filtration for controlled, cleaner theatre air.", path: "/hepa-filtration-system-for-operation-theatre", icon: AirVent },
    { label: "Laminar Air Flow", desc: "Ceiling-mounted unidirectional airflow over the surgical zone.", path: p("laminar-air-flow"), productSlug: "laminar-air-flow", icon: Wind },
  ] },
  { title: "Medical Infrastructure", items: [
    { label: "Medical Gas Pipeline", desc: "Oxygen, vacuum and air pipeline systems for hospitals.", path: p("medical-gas-pipeline-system"), productSlug: "medical-gas-pipeline-system", icon: Activity },
    { label: "Surgical Scrub Stations", desc: "Stainless steel scrub sinks for pre-surgery hand washing.", path: p("surgical-scrub-sink-station"), productSlug: "surgical-scrub-sink-station", icon: Droplets },
    { label: "OT Electrical Infrastructure", desc: "Power, lighting and control panels for theatres.", path: "/operation-theatre-electrical-system", icon: Zap },
  ] },
];

export const solutionPaths = solutionGroups.flatMap((g) => g.items.map((i) => i.path));
export const isSolutionPath = (pathname: string) =>
  pathname.startsWith("/solutions") || pathname.startsWith("/products") || solutionPaths.some((x) => pathname === x || pathname.startsWith(x + "/"));
export const isActiveItem = (pathname: string, path: string) => pathname === path || pathname.startsWith(path + "/");
