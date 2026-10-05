export const site = {
  name: "Unicare Medical Solutions",
  legalName: "Unicare Medical Solution",
  tagline: "Hospital Infrastructure & Medical Equipment",
  phone: "+91-7736077740",
  phoneHref: "tel:+917736077740",
  secondaryPhone: "+91-7678443838",
  secondaryPhoneHref: "tel:+917678443838",
  whatsapp: "917736077740",
  email: "unicaremedical2023@gmail.com",
  officeAddress: "357, Malkhan Singh Complex, Opp. Ambedkar Bhawan, Dasna Road, Ghaziabad – 201001, U.P., India",
  worksAddress: "Plot No. B/260, Adarsh Nagar, Subedar Colony, Ballabhgarh, District Faridabad – 121004, Haryana, India",
};

export const whatsappLink = (text = "Hello Unicare, I would like to discuss a hospital project.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
