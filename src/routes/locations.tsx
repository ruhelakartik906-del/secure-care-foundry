import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { locations } from "@/data/locations";
import { cities, cityPath } from "@/data/cities";
import { PageHero, CtaBand } from "@/components/site/common";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/locations")({
  head: () => seo("Modular Operation Theatre Service Locations | Unicare", "Explore modular operation theatre manufacturing and installation support across Indian states and union territories.", "/locations"),
  component: LocationsDirectory,
});

function LocationsDirectory() {
  return (
    <>
      <PageHero title="Modular OT Manufacturer – Service Locations in India" intro="City and state-specific information for hospitals and healthcare projects planning modular operation theatre manufacturing and installation." crumbs={[{ label: "Service Locations" }]} />
      <section className="site-wrap pt-14">
        <h2 className="text-2xl font-bold">Priority Cities</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((c) => <a key={c.slug} href={cityPath(c)} className="group flex gap-3 border border-border p-5 hover:border-brand-blue"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" /><div><h3 className="font-bold group-hover:text-brand-blue">Modular OT Manufacturer in {c.name}</h3><p className="mt-1 text-sm text-muted-foreground">{c.state}</p></div></a>)}
        </div>
        <h2 className="mt-14 text-2xl font-bold">States &amp; Union Territories</h2>
      </section>
      <section className="site-wrap py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <Link key={location.slug} to="/modular-operation-theatre-manufacturers-in/$state" params={{ state: location.slug }} className="group flex gap-4 border border-border p-5 hover:border-brand-blue">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
              <div><h2 className="text-base font-bold group-hover:text-brand-blue">Modular Operation Theatre Manufacturer in {location.name}</h2><p className="mt-2 text-sm text-muted-foreground">Serving {location.cities.slice(0, 4).join(", ")} and other project locations.</p></div>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand title="Planning a Modular OT Project?" />
    </>
  );
}