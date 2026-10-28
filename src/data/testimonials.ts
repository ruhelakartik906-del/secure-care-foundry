export type Testimonial = { id: string; client_name: string; designation: string | null; company: string | null; city: string | null; testimonial: string; rating: number };

/** Only company-supplied, real testimonials. The homepage shows the section only when there are at least 3. */
// TODO(testimonials): add real entries (name, designation, hospital, city, quote) when the company supplies them.
export const testimonials: Testimonial[] = [];
