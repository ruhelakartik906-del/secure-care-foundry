import { products } from "./products";

export type FaqGroup = { title: string; link?: { label: string; to: string }; faqs: { q: string; a: string }[] };

export const generalFaqs = [
  { q: "What does Unicare Medical Solutions do?", a: "We design, manufacture and install modular operation theatres, medical gas pipeline systems and related hospital infrastructure such as OT pendants, surgical lights, hermetic doors, pass boxes and ICU fit-outs." },
  { q: "Do you provide a fixed price list?", a: "No. Our pricing guide shows indicative ranges only. A final quotation is prepared after reviewing your drawings, specifications and site." },
  { q: "How do I start a project with you?", a: "Send your requirement through the enquiry form, call or WhatsApp. We discuss the scope, review drawings or visit the site, and then share a technical proposal and quotation." },
  { q: "Can you upgrade an existing operation theatre?", a: "Yes. Existing theatres can often be upgraded to modular or semi-modular after a site assessment of the room, HVAC and services." },
];

export const homeFaqs = [
  generalFaqs[0]!,
  { q: "What is the cost of a modular OT in India?", a: "A complete modular operation theatre is indicatively ₹8.5 Lakh to ₹35 Lakh. The final price depends on size, materials, laminar air flow, doors, equipment and installation scope." },
  generalFaqs[3]!,
  { q: "Is Unicare certified by NABH?", a: "NABH accredits hospitals, not suppliers. We plan theatres around the requirements your hospital and accreditation consultant share with us." },
];

export const productFaqGroups: FaqGroup[] = products.map((p) => ({ title: p.name, link: { label: `View ${p.shortName}`, to: `/products/${p.slug}` }, faqs: p.faqs }));
