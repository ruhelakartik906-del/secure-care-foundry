import { PageHero } from "./common";

export function LegalPage({ title, sections }: { title: string; sections: [string, string][] }) {
  return (
    <>
      <PageHero title={title} crumbs={[{ label: title }]} />
      <section className="site-wrap prose-unicare max-w-3xl py-14">
        <p className="!text-xs">This page is a general template and should be reviewed by the company before publishing.</p>
        {sections.map(([h, p]) => (<div key={h}><h2>{h}</h2><p>{p}</p></div>))}
      </section>
    </>
  );
}
