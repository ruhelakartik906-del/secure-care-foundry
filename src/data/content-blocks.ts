/**
 * Company-supplied verbatim content sections (Oct 2026 brief), shared across
 * product, system and variant pages. Text must stay exactly as supplied by the
 * company — do not add facts, numbers, certifications or claims.
 */
export type Inline = string | { to: string; label: string };
export type RichText = Inline[];

export type ContentBlock =
  | { kind: "h2" | "h3"; text: string }
  | { kind: "p"; text: RichText }
  | { kind: "ul" | "ol"; items: RichText[] }
  | { kind: "table"; head: string[]; rows: string[][] }
  | { kind: "quote-cta" };

/** Shared: anti-bacterial, anti-fungal painting (wall panels + OT ceiling pages). */
export const paintingSection: ContentBlock[] = [
  { kind: "h2", text: "Anti-bacterial, anti-fungal painting" },
  {
    kind: "p",
    text: ["The economy PPGI/GI panel option is finished on site with anti-bacterial, anti-fungal paint so that the walls and ceiling read as one seamless surface:"],
  },
  {
    kind: "ol",
    items: [
      ["All joints and gaps in the wall, ceiling, corner and slope panels are filled with metallic epoxy filler."],
      ["The surface is sanded flush and smooth."],
      ["A primer and water-based anti-bacterial, anti-fungal paint coats are applied to a total dry film thickness (DFT) of 300 microns, including the primer."],
    ],
  },
  {
    kind: "p",
    text: ["The finished surface has no joints for dirt or microbes to collect in. As it wears, a refresh coat about every four to five years keeps it in condition. Many hospitals, especially new ones, choose this route because it delivers a compliant OT at a lower cost."],
  },
];

/** Shared: PPGI / GI sandwich PUF panels (wall panels page + PPGI variant page). */
export const ppgiPanelSection: ContentBlock[] = [
  { kind: "h2", text: "PPGI / GI sandwich PUF panels" },
  {
    kind: "p",
    text: ["This is the panel most Indian hospitals choose. It keeps both the initial investment and the long-term cost low, installs quickly, and lasts 10 to 15 years. A fresh coat of anti-fungal, anti-bacterial paint every four to five years keeps the surface performing like new."],
  },
  { kind: "h3", text: "Specification" },
  {
    kind: "ul",
    items: [
      ["Overall panel thickness: 50 mm or 100 mm"],
      ["Facing sheets: PPGI, 0.80–1.00 mm on both sides"],
      ["OT GI sheet: 0.80–1.00 mm, finished with anti-fungal, anti-bacterial paint for a smooth, jointless surface"],
      ["Colours: standard shades or your choice"],
    ],
  },
];

/** Shared: stainless steel sandwich PUF panels (wall panels page + SS variant page). */
export const stainlessPanelSection: ContentBlock[] = [
  { kind: "h2", text: "Stainless steel sandwich PUF panels" },
  {
    kind: "p",
    text: ["Stainless steel facings give a harder-wearing, premium finish. The initial price is higher than PPGI, but because the panel lasts 10 to 15 years or more with little upkeep, the cost over its life works out about the same. It installs as easily as PPGI and carries the same hygiene and insulation benefits."],
  },
];

/** Shared: why sliding doors are preferred (hermetic door product page + OT doors page). */
export const slidingDoorsSection: ContentBlock[] = [
  { kind: "h2", text: "Why sliding doors are preferred" },
  {
    kind: "p",
    text: ["A hinged door swings air in and out every time it opens, which disturbs the theatre's controlled airflow. A sliding door moves along the wall and barely affects it, which is why NABH recommends sliding doors for operating rooms."],
  },
];
