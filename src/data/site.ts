// Company details. Values marked as placeholders must be replaced with real information.
export const site = {
  name: "Unicare Medical Solutions",
  tagline: "Hospital Infrastructure & Medical Equipment",
  phone: "+91 00000 00000", // placeholder
  phoneHref: "tel:+910000000000",
  whatsapp: "910000000000", // placeholder, digits only
  email: "info@unicaremedical.example", // placeholder
  address: "Office address to be added", // placeholder
  hours: "Mon – Sat, 9:30 AM – 6:30 PM", // placeholder
};

export const whatsappLink = (text = "Hello Unicare, I would like to discuss a hospital project.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
