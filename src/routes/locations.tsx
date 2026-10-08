import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { locations } from "@/data/locations";
import { PageHero, CtaBand } from "@/components/site/common";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/locations")({
  head: () => seo("Modular Operation Theatre Service Locations | Unicare", "Explore modular operation theatre manufacturing and installation support across Indian states and union territories.", "/locations"),
  component: LocationsDirectory,
});

function LocationsDirectory() {
  return (
    <>
      <PageHero title="Modular Operation Theatre Service Locations" intro="State-specific information for hospitals and healthcare projects planning modular operation theatre manufacturing and installation." crumbs={[{ label: "Service Locations" }]} />
      <section className="site-wrap py-14">
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