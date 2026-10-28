import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Faqs, faqSchema, CtaBand } from "@/components/site/common";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { seo, breadcrumbSchema } from "@/lib/seo";
import { pageSeo } from "@/data/page-seo";

const path = "/mgps-cost-india";

/** Only the company-published MGPS figures from the pricing guide are used on this page. */
const ranges = [
  { item: "MGPS inside one operation theatre", range: "₹60,000 – ₹1 Lakh", unit: "per OT" },
  { item: "Hospital MGPS project", range: "₹5 Lakh – ₹30 Lakh", unit: "per project" },
];

const drivers = [
  { name: "Number of beds and outlets", text: "Every bed or theatre position needs its own outlets and a pipe run to reach them. More beds and more outlets per bed mean more pipework, more outlets and more testing, so this is usually the biggest single driver of a hospital MGPS budget." },
  { name: "Which gases are piped", text: "A small hospital may pipe only oxygen and vacuum. A hospital with operation theatres usually also needs medical air and nitrous oxide, and each extra gas adds its own pipeline, valves, alarms and outlets." },
  { name: "Gas source equipment", text: "The plant room can be built around cylinder manifolds, a liquid oxygen tank, a PSA oxygen plant, medical air compressors and vacuum pumps, or a mix. The source chosen has a large effect on the total, and some hospitals already own part of it." },
  { name: "Building layout and pipe length", text: "A compact single-floor building needs far less copper than a multi-storey hospital with the plant room at one end. Shafts, ceiling access and the route between floors all change the length and difficulty of the pipeline." },
  { name: "Zone valves and alarms", text: "Each department normally has zone valve boxes so it can be isolated, and area alarm panels that show gas pressures. A master alarm monitors the sources. The number of departments decides how many of these are needed." },
  { name: "New building or existing hospital", text: "In a new building the pipeline is planned with the civil and electrical work. In a running hospital, work has to be phased around patients, existing services and ceilings, which can affect the schedule and cost." },
  { name: "Testing and commissioning", text: "Pressure testing, purging, cross-connection checks and gas identity checks at every outlet are part of a proper handover. The scope of testing and documentation requested in the tender is included in the quotation." },
];

const faqs = [
  { q: "How much does a medical gas pipeline system cost in India?", a: "Indicatively, MGPS inside one operation theatre costs ₹60,000 to ₹1 Lakh, and a hospital MGPS project costs ₹5 Lakh to ₹30 Lakh. The final figure depends on beds, outlets, gases, source equipment and building layout." },
  { q: "Why is the hospital MGPS range so wide?", a: "A small nursing home piping two gases to a few beds and a multi-storey hospital piping four gases to ICUs, wards and theatres are very different projects. Bed count, gases, source equipment and pipe length move the budget across the range." },
  { q: "Does the one-OT figure include the oxygen plant?", a: "The ₹60,000 to ₹1 Lakh range is for MGPS inside one operation theatre. Source equipment such as manifolds, compressors or an oxygen plant is planned and quoted with the hospital project." },
  { q: "Is this a final quotation?", a: "No. These are indicative ranges only. A project-specific quotation is prepared after we review your drawings, gas schedule and site." },
  { q: "What do I need to share for an MGPS quote?", a: "Floor drawings, the number of beds by department, the gases you need, any existing source equipment, and whether the building is new or already running." },
];

export const Route = createFileRoute("/mgps-cost-india")({
  head: () => {
    const s = seo("MGPS Cost in India 2026: Price Guide | Unicare", "Indicative 2026 MGPS cost in India and the factors that decide the final quote.", path, "article");
    return { ...s, scripts: [breadcrumbSchema([{ name: "MGPS Cost Guide", path }]), faqSchema(faqs)] };
  },
  component: MgpsCost,
});

function MgpsCost() {
  return <>
    <PageHero title={pageSeo[path]?.h1 ?? "Medical Gas Pipeline System Cost in India 2026"} intro="Medical gas pipeline system cost in India depends on the size of the project. Indicatively, MGPS inside one operation theatre is ₹60,000 – ₹1 Lakh, and a hospital MGPS project is ₹5 Lakh – ₹30 Lakh." crumbs={[{ label: "MGPS Cost Guide" }]} />
    <section className="site-wrap grid gap-10 py-12 lg:grid-cols-[1fr_380px]">
      <div className="prose-unicare max-w-3xl">
        <h2>Indicative MGPS Price Range for 2026</h2>
        <p>Hospitals planning oxygen, medical air, vacuum and nitrous oxide supply usually want a budget figure before drawings are final. The two ranges below are the figures Unicare publishes for medical gas pipeline work. They give a starting point for planning; they are not a quotation, and your final price is confirmed only after we review your project.</p>
        <div className="not-prose mb-6 overflow-x-auto border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted"><tr><th className="p-3">Scope</th><th className="p-3">Indicative range</th><th className="p-3">Basis</th></tr></thead>
            <tbody>{ranges.map((r) => <tr key={r.item} className="border-t border-border"><td className="p-3 font-medium">{r.item}</td><td className="p-3 font-semibold text-brand-blue">{r.range}</td><td className="p-3 text-muted-foreground">{r.unit}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="border-l-4 border-accent bg-muted p-4 text-sm"><strong>Important:</strong> these prices are indicative only and are not a quotation.</p>

        <h2>What the One-OT Figure Covers</h2>
        <p>The ₹60,000 – ₹1 Lakh range applies to medical gas pipeline work inside a single operation theatre. In a theatre, gases are delivered at outlets on the wall or on an <Link to="/products/$slug" params={{ slug: "ot-pendant" }}>OT pendant</Link>, and an <Link to="/products/$slug" params={{ slug: "agss" }}>anaesthetic gas scavenging system</Link> is often planned alongside. Where the number falls within the range depends on how many gases and outlets the theatre needs and how the pipeline reaches the room.</p>
        <p>This figure is most useful when a hospital is adding or upgrading one theatre, or budgeting the gas portion of a <Link to="/products/$slug" params={{ slug: "modular-operation-theatre" }}>modular operation theatre</Link>. For the complete theatre, see the <Link to="/modular-ot-cost-india">modular OT cost guide</Link>.</p>

        <h2>What the Hospital Project Figure Covers</h2>
        <p>The ₹5 Lakh – ₹30 Lakh range applies to a hospital MGPS project, where gases are taken from a central source and distributed to several departments such as ICUs, wards, emergency, recovery and theatres. A typical project includes the source arrangement, the copper distribution pipeline, zone valve boxes, area and master alarms, and gas-specific <Link to="/products/$slug" params={{ slug: "oxygen-outlet" }}>oxygen and medical gas outlets</Link> on walls or <Link to="/products/$slug" params={{ slug: "bed-head-panel" }}>bed head panels</Link>.</p>
        <p>The lower end of the range reflects smaller buildings with fewer beds and gases; the upper end reflects larger buildings, more departments and more gases. Projects outside these sizes are quoted individually.</p>

        <h2>What Decides Your Final MGPS Cost</h2>
        <ul>{drivers.map((d) => <li key={d.name}><strong>{d.name}:</strong> {d.text}</li>)}</ul>

        <h2>How to Get an Accurate MGPS Quotation</h2>
        <p>The fastest way to move from an indicative range to a firm price is to share the information our team uses to size the system:</p>
        <ol>
          <li>Floor drawings showing departments and bed positions.</li>
          <li>A bed count by department and the gases needed in each area.</li>
          <li>Details of any existing source equipment, such as a <Link to="/products/$slug" params={{ slug: "manifold-room-system" }}>manifold room</Link> or oxygen plant.</li>
          <li>Whether the building is under construction or already running.</li>
          <li>The design standard or specification named in your tender, if any.</li>
        </ol>
        <p>With this, we prepare a gas schedule and pipeline layout, list the equipment and quantities, and send a project-specific quotation. If anything is still undecided, we can price options side by side, for example piping three gases now and leaving provision for a fourth.</p>

        <h2>Ways to Plan Your MGPS Budget</h2>
        <p>Planning gases early, while the building drawings are still flexible, usually avoids rework. Pipe routes can follow shafts and corridors, the plant room can be placed close to the main load, and outlets can be positioned in bed head panels from the start instead of being added later. In existing hospitals, phasing the work department by department keeps the hospital running while spreading the cost over time.</p>
        <p>Whatever the size of the project, ask for a clear scope in the quotation: the gases included, the number of outlets, the alarms and valve boxes, the source equipment, and the testing and commissioning that will be carried out before handover. Comparing quotations on the same scope is the only reliable way to compare prices.</p>
        <p>Learn more about the system itself on our <Link to="/products/$slug" params={{ slug: "medical-gas-pipeline-system" }}>medical gas pipeline system</Link> page, or read our general overview of <Link to="/resources/compliance/$slug" params={{ slug: "mgps-standards" }}>MGPS standards</Link>.</p>

        <h2>FAQs</h2>
        <Faqs faqs={faqs} />
      </div>
      <aside className="lg:sticky lg:top-28 lg:self-start"><div className="border border-border p-5"><p className="mb-4 font-bold">Request an MGPS Quote</p><EnquiryForm source="mgps-cost-guide" defaultProduct="Medical Gas Pipeline System" submitLabel="Request MGPS Quote" /></div></aside>
    </section>
    <CtaBand />
  </>;
}
