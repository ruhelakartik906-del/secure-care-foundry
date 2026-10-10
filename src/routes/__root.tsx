import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { EnquiryProvider } from "@/components/site/EnquiryDialog";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/common";
import { site } from "@/data/site";
import { SITE_URL } from "@/lib/site-url";
import { captureUtm } from "@/lib/utm";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

export function NotFoundComponent() {
  return (
    <div className="site-wrap flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-3 text-4xl font-bold text-foreground md:text-5xl">Page Not Found</h1>
      <p className="mt-4 max-w-lg text-muted-foreground">The page you are looking for may have been moved or no longer exists.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/" className="bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Go Home</Link>
        <Link to="/products" className="border border-border px-5 py-3 text-sm font-semibold">View Products</Link>
        <Link to="/contact" className="border border-border px-5 py-3 text-sm font-semibold">Contact Us</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

type Tracking = { gsc_verification: string | null; bing_verification: string | null; ga4_id: string | null; gtm_id: string | null; meta_pixel_id: string | null; latitude: number | null; longitude: number | null; google_maps_url: string | null };
const safeId = (v: string | null | undefined, re: RegExp) => (v && re.test(v.trim()) ? v.trim() : null);

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => {
    const t = null as Tracking | null;
    const ga = safeId(t?.ga4_id, /^G-[A-Z0-9]{4,20}$/);
    const gtm = safeId(t?.gtm_id, /^GTM-[A-Z0-9]{4,12}$/);
    const pixel = safeId(t?.meta_pixel_id, /^\d{8,20}$/);
    const gsc = safeId(t?.gsc_verification, /^[A-Za-z0-9_-]{10,100}$/);
    const bing = safeId(t?.bing_verification, /^[A-Za-z0-9]{10,100}$/);
    return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Unicare Medical Solutions" },
      { name: "description", content: "Modular operation theatres, medical gas pipeline systems and hospital infrastructure." },
      { property: "og:site_name", content: "Unicare Medical Solutions" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(gsc ? [{ name: "google-site-verification", content: gsc }] : []),
      ...(bing ? [{ name: "msvalidate.01", content: bing }] : []),
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=Manrope:wght@600;700;800&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: site.name,
          legalName: site.legalName,
          url: `${SITE_URL}/`,
          logo: `${SITE_URL}/favicon.png`,
          email: site.email,
          telephone: site.phone,
          address: [
            { "@type": "PostalAddress", streetAddress: "357, Malkhan Singh Complex, Opp. Ambedkar Bhawan, Dasna Road", addressLocality: "Ghaziabad", postalCode: "201001", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
            { "@type": "PostalAddress", streetAddress: "Plot No. B/260, Adarsh Nagar, Subedar Colony", addressLocality: "Ballabhgarh", postalCode: "121004", addressRegion: "Haryana", addressCountry: "IN" },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: site.name, url: `${SITE_URL}/`, publisher: { "@id": `${SITE_URL}/#organization` } }),
      },
      ...(ga ? [{ src: `https://www.googletagmanager.com/gtag/js?id=${ga}`, async: true }, { children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga}');` }] : []),
      ...(gtm ? [{ children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');` }] : []),
      ...(pixel ? [{ children: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixel}');fbq('track','PageView');` }] : []),
    ],
  };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="pb-12 md:pb-0">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const isAdmin = false;
  useEffect(() => { captureUtm(); }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <EnquiryProvider>
        {isAdmin ? (
          <Outlet />
        ) : (
          <>
            <Header />
            <main><Outlet /></main>
            <Footer />
            <FloatingActions />
          </>
        )}
      </EnquiryProvider>
    </QueryClientProvider>
  );
}
