export const site = {
  name: "Unicare Medical Solutions",
  legalName: "Unicare Medical Solution",
  tagline: "Hospital Infrastructure & Medical Equipment",
  phone: "+91-7736077740",
  phoneHref: "tel:+917736077740",
  secondaryPhone: "+91-7678443838",
  secondaryPhoneHref: "tel:+917678443838",
  whatsapp: "917678443838",
  email: "unicaremedical2023@gmail.com",
  officeAddress: "357, Malkhan Singh Complex, Opp. Ambedkar Bhawan, Dasna Road, Ghaziabad – 201001, U.P., India",
  worksAddress: "Plot No. B/260, Adarsh Nagar, Subedar Colony, Ballabhgarh, District Faridabad – 121004, Haryana, India",
  hours: "Mon – Sat, 9:30 AM – 6:30 PM",
};

export const whatsappLink = (text = "Hello Unicare Medical Solutions, I am interested in your Modular Operation Theatre solutions. Please share more details.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
