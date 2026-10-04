export type Location = { slug: string; name: string; type: "State" | "Union Territory"; cities: string[]; context: string };

const s = (name: string, cities: string[], context: string, type: Location["type"] = "State"): Location => ({
  slug: name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  name, type, cities, context,
});

export const locations: Location[] = [
  s("Uttar Pradesh", ["Lucknow", "Kanpur", "Noida", "Ghaziabad", "Agra", "Meerut", "Varanasi", "Prayagraj", "Gorakhpur", "Bareilly"], "India's most populous state, with a large and growing network of private hospitals, medical colleges and district hospitals across both the NCR belt and eastern UP."),
  s("Delhi", ["New Delhi", "Dwarka", "Rohini", "Saket", "Janakpuri", "Pitampura"], "a dense hub of multispecialty and super specialty hospitals where OT upgrades often have to be completed inside running facilities.", "Union Territory"),
  s("Haryana", ["Gurugram", "Faridabad", "Panipat", "Karnal", "Hisar", "Rohtak", "Ambala"], "home to fast-growing healthcare corridors in Gurugram and Faridabad and expanding hospitals in tier-2 cities."),
  s("Rajasthan", ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner"], "a large state where new hospital projects are spread across distant cities, making planned logistics and installation scheduling important."),
  s("Maharashtra", ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Thane"], "one of India's largest healthcare markets, from metro super specialty hospitals to growing district facilities."),
  s("Gujarat", ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Gandhinagar"], "a state with strong private hospital growth across Ahmedabad, Surat and Vadodara."),
  s("Madhya Pradesh", ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Sagar"], "where new medical colleges and private hospitals in Indore and Bhopal are driving infrastructure demand."),
  s("Punjab", ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali"], "with a dense network of nursing homes and multispecialty hospitals across its major cities."),
  s("Uttarakhand", ["Dehradun", "Haridwar", "Haldwani", "Rudrapur", "Rishikesh"], "where hill terrain makes careful transport of panels and equipment part of project planning."),
  s("Bihar", ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga"], "with expanding private and government healthcare investment, particularly around Patna."),
  s("Jharkhand", ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"], "where industrial cities support a growing number of hospitals and critical care units."),
  s("West Bengal", ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol"], "with Kolkata as a major healthcare destination for eastern India."),
  s("Odisha", ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Berhampur"], "where Bhubaneswar and Cuttack anchor a growing hospital sector."),
  s("Chhattisgarh", ["Raipur", "Bhilai", "Bilaspur", "Korba"], "with new hospitals and medical colleges coming up around Raipur and Bilaspur."),
  s("Karnataka", ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi"], "a leading healthcare market led by Bengaluru's large hospital networks."),
  s("Tamil Nadu", ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"], "one of India's most developed healthcare states, including a major medical tourism base in Chennai."),
  s("Kerala", ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Kannur"], "with high hospital density and a strong focus on quality healthcare infrastructure."),
  s("Telangana", ["Hyderabad", "Warangal", "Karimnagar", "Nizamabad"], "where Hyderabad is a major centre for corporate hospitals."),
  s("Andhra Pradesh", ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Nellore"], "with growing hospital development across its coastal cities."),
  s("Goa", ["Panaji", "Margao", "Vasco da Gama", "Mapusa"], "a compact state with private hospitals and nursing homes serving residents and visitors."),
  s("Himachal Pradesh", ["Shimla", "Mandi", "Dharamshala", "Solan"], "where mountain access requires careful installation planning."),
  s("Jammu & Kashmir", ["Srinagar", "Jammu", "Anantnag", "Baramulla"], "with expanding hospital infrastructure in Jammu and Srinagar.", "Union Territory"),
  s("Assam", ["Guwahati", "Dibrugarh", "Silchar", "Jorhat"], "the healthcare gateway of the North East, centred on Guwahati."),
  s("Chandigarh", ["Chandigarh"], "a planned city and regional medical hub for Punjab, Haryana and Himachal.", "Union Territory"),
];

export const getLocation = (slug: string) => locations.find((l) => l.slug === slug);
