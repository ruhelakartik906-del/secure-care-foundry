/**
 * State-specific copy for the 48 state pages. The modular OT and MGPS pages of the same
 * state use separate notes and separate paragraph wording so they never share a paragraph.
 * Distances/drive times are approximate public road figures from Ballabhgarh, Faridabad,
 * not company delivery promises; project dates are confirmed in each programme.
 */
export type StateLocal = {
  cities: string[];
  hub: string;
  route: string;
  km: string;
  drive: string;
  hospitals: string;
  fire: string;
  pcb: string;
  ot: string;
  mgps: string;
};

const S = (pcbState: string) => `${pcbState} State Pollution Control Board`;

export const stateLocal: Record<string, StateLocal> = {
  "uttar-pradesh": {
    cities: ["Lucknow", "Kanpur", "Noida", "Ghaziabad", "Agra", "Varanasi"], hub: "Lucknow",
    route: "over the Yamuna Expressway and the Agra–Lucknow Expressway", km: "540", drive: "8 to 9 hours",
    hospitals: "The state mixes government medical colleges and district hospitals with private multispecialty hospitals in the NCR belt and a large number of surgeon-owned nursing homes in towns such as Bareilly, Aligarh and Jhansi.",
    fire: "Uttar Pradesh Fire and Emergency Services", pcb: S("Uttar Pradesh"),
    ot: "Western UP sites near Noida and Ghaziabad are close enough for frequent survey visits, while projects in Gorakhpur or Varanasi are planned so that panels, doors and the laminar air flow unit arrive in one consolidated lot. Many UP nursing homes convert an existing brick OT, so the survey checks slab height, beam positions and whether the room can take a false ceiling plenum.",
    mgps: "UP hospitals often move from portable cylinders at the bedside to a central manifold when they add ICU beds or a second theatre. In older buildings in Lucknow, Kanpur or Prayagraj the pipeline route usually follows corridor ceilings, so the survey records ceiling voids, shafts and where a ventilated manifold room can be placed at ground level with vehicle access for cylinder exchange.",
  },
  delhi: {
    cities: ["New Delhi", "Dwarka", "Rohini", "Saket", "Janakpuri", "Pitampura"], hub: "central Delhi",
    route: "along Mathura Road or the Delhi–Faridabad corridor of NH-19", km: "30 to 50", drive: "1 to 2 hours depending on traffic",
    hospitals: "Delhi has large corporate and trust hospitals, government institutions, and many small and mid-sized nursing homes in residential and commercial areas, often in buildings with limited parking and goods-lift access.",
    fire: "Delhi Fire Service", pcb: "Delhi Pollution Control Committee",
    ot: "Because Delhi is the nearest market to our Faridabad works, panels can be sent in smaller lots that match the hours when heavy vehicles may enter the area. Many projects replace an OT inside a running hospital, so work zones, dust screens and night or weekend shifts are agreed with the hospital before dismantling begins.",
    mgps: "In dense Delhi localities the manifold room and any liquid oxygen tank have to fit within tight plot boundaries and clear access for the supplier's vehicle. Pipeline extensions to new ICU or HDU floors are common, and they are planned so existing wards stay on supply through temporary isolation and staged tie-ins.",
  },
  haryana: {
    cities: ["Gurugram", "Faridabad", "Panipat", "Karnal", "Hisar", "Rohtak"], hub: "Gurugram",
    route: "via the Gurgaon–Faridabad road", km: "35 to 45", drive: "about 1 to 1.5 hours",
    hospitals: "Haryana combines large private hospitals in Gurugram and Faridabad with medical colleges such as those in Rohtak and Karnal, and nursing homes and mid-sized hospitals along the NH-44 towns of Panipat, Sonipat and Ambala.",
    fire: "Haryana Fire and Emergency Services", pcb: S("Haryana"),
    ot: "Haryana is our home state: the works in Ballabhgarh, Faridabad can arrange a survey, sample panel or mock-up review at short notice for nearby hospitals. For western districts such as Hisar and Sirsa, panels and the laminar air flow unit are dispatched together once civil work, ceiling supports and the HVAC duct openings are ready.",
    mgps: "Hospitals in Gurugram and Faridabad frequently expand floor by floor, so a pipeline is laid out with spare capacity and isolation valves at each zone. For hospitals in Karnal, Panipat or Hisar the manifold room location, cylinder storage and alarm positions are reviewed with the fire consultant before copper work begins.",
  },
  rajasthan: {
    cities: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner"], hub: "Jaipur",
    route: "via the KMP Expressway and the Delhi–Mumbai Expressway (Sohna–Dausa section)", km: "270", drive: "4 to 5 hours",
    hospitals: "Jaipur has large private multispecialty hospitals and medical colleges, Jodhpur and Udaipur serve wide surrounding regions, and Kota, Ajmer and Bikaner have a mix of government and private hospitals with many surgeon-run nursing homes.",
    fire: "Rajasthan fire services of the local urban body", pcb: S("Rajasthan"),
    ot: "Dry, dusty summers make sealing, pressure control and pre-filtration important in Rajasthan theatres. The survey looks at how outside air reaches the AHU and whether the room can be kept positive to the corridor; distant cities such as Bikaner and Jaisalmer are planned so that all panels, doors and consumables arrive in one vehicle.",
    mgps: "High summer temperatures affect cylinder storage, so the manifold room in a Rajasthan hospital is planned with ventilation and shade, away from kitchens and electrical rooms. For hospitals in Jodhpur, Udaipur or Bikaner that depend on cylinders from a distant filling plant, manifold sizing and reserve banks are discussed with the gas supplier.",
  },
  maharashtra: {
    cities: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Thane"], hub: "Mumbai",
    route: "via the Delhi–Mumbai Expressway and NH-48", km: "1,400", drive: "around 24 hours, so goods transit normally spans several days",
    hospitals: "Maharashtra has corporate and trust hospitals in Mumbai and Pune, government medical colleges across districts, Nagpur as a referral centre for Vidarbha, and many private nursing homes in Nashik, Aurangabad and Kolhapur.",
    fire: "Maharashtra Fire Services and municipal fire brigades", pcb: S("Maharashtra"),
    ot: "Mumbai sites often sit in high-rise buildings where lift sizes limit panel lengths, so the survey records lift cars, staircases and shaft openings before panels are cut. Humid coastal air is handled by coordinating the OT with the HVAC contractor's dehumidification plan; inland cities such as Nagpur face hot summers instead.",
    mgps: "For Mumbai and Thane hospitals with limited ground space, the manifold room and vacuum plant are sometimes placed on podium or basement levels, which needs clear ventilation and vehicle access planning. In Pune and Nagpur new hospital blocks are more often planned with a dedicated gas yard and a liquid oxygen tank from the start.",
  },
  gujarat: {
    cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Gandhinagar"], hub: "Ahmedabad",
    route: "via the Delhi–Mumbai Expressway and NH-48 through Rajasthan", km: "930", drive: "14 to 16 hours",
    hospitals: "Gujarat has large private hospitals in Ahmedabad, Surat and Vadodara, government medical colleges and civil hospitals in district towns, and many specialist nursing homes in Rajkot, Bhavnagar and Jamnagar.",
    fire: "Gujarat municipal fire and emergency services", pcb: S("Gujarat"),
    ot: "Fire safety inspections have received close attention in Gujarat hospitals, so OT partitions, doors and cable routes are discussed with the hospital's fire consultant early. Surat and coastal sites need humidity control, while Ahmedabad and Rajkot face very hot summers that load the OT air-conditioning.",
    mgps: "Gujarat has an established industrial gas sector, and hospitals in Ahmedabad, Vadodara and Surat often choose a liquid oxygen tank with a cylinder manifold as back-up. The pipeline layout is planned around the gas yard position, and smaller hospitals in Saurashtra commonly begin with a duplex cylinder manifold.",
  },
  "madhya-pradesh": {
    cities: ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Sagar"], hub: "Bhopal",
    route: "via NH-19 to Agra and NH-44/NH-46 through Gwalior", km: "750", drive: "12 to 13 hours",
    hospitals: "Indore and Bhopal have growing private hospitals and medical colleges, Jabalpur and Gwalior serve large surrounding regions, and many district towns rely on government hospitals and private nursing homes.",
    fire: "Madhya Pradesh municipal fire services", pcb: S("Madhya Pradesh"),
    ot: "Gwalior is the closest large MP city by road, while Jabalpur, Rewa and Sagar take longer, so dispatch for those cities is grouped to avoid split deliveries. New medical college buildings in MP often need several theatres in one block, and room-by-room drawings help the civil contractor prepare ceilings and floors in sequence.",
    mgps: "Medical colleges and private hospitals in Indore and Bhopal often install oxygen, medical air, vacuum and nitrous oxide together. In district hospitals the scope may start with oxygen and vacuum for the ICU and OT, with valves and capped branches left for later wards.",
  },
  punjab: {
    cities: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali"], hub: "Ludhiana",
    route: "via NH-44 through Panipat and Ambala", km: "340", drive: "about 6 hours",
    hospitals: "Punjab has a dense network of private nursing homes and multispecialty hospitals in Ludhiana, Jalandhar and Amritsar, medical colleges in Amritsar, Patiala and Faridkot, and an AIIMS in Bathinda.",
    fire: "Punjab fire and emergency services", pcb: S("Punjab"),
    ot: "Punjab's cold winters and hot summers mean the OT HVAC must handle both heating and cooling, and the surgeon control panel displays room conditions throughout the year. Many projects are additions to established family-run hospitals, so the survey checks how the new theatre connects to the existing recovery and CSSD rooms.",
    mgps: "Nursing homes in Ludhiana, Jalandhar and Amritsar commonly upgrade from bedside cylinders to a central manifold when they add ICU beds. The survey checks where cylinders can be unloaded off congested market streets and how far the pipeline must travel to upper floors.",
  },
  uttarakhand: {
    cities: ["Dehradun", "Haridwar", "Haldwani", "Rudrapur", "Rishikesh", "Roorkee"], hub: "Dehradun",
    route: "via the Delhi–Meerut Expressway and NH-334 through Roorkee", km: "270", drive: "5 to 6 hours",
    hospitals: "Uttarakhand's hospitals are concentrated in Dehradun, Haridwar, Rishikesh and the Kumaon plains around Haldwani and Rudrapur, with AIIMS Rishikesh, medical colleges and private hospitals, while hill districts depend on smaller government facilities.",
    fire: "Uttarakhand Fire and Emergency Services", pcb: S("Uttarakhand"),
    ot: "For hill destinations, panel lengths and vehicle size are chosen to suit narrow approach roads and hairpin bends, and the delivery is timed around monsoon road conditions. Plains sites in Dehradun, Haridwar and Rudrapur follow the normal sequence of survey, panel manufacture and assembly.",
    mgps: "Cylinder supply to hill hospitals can be interrupted in the monsoon, so hospitals beyond Dehradun often keep larger reserve banks or consider an oxygen generator with a manifold back-up. In Dehradun and Haldwani the manifold room position is planned for easy access by the gas supplier's vehicle.",
  },
  bihar: {
    cities: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga", "Purnia"], hub: "Patna",
    route: "via the Yamuna, Agra–Lucknow and Purvanchal Expressways and onward through Buxar", km: "1,050", drive: "17 to 19 hours",
    hospitals: "Patna is the main referral centre with AIIMS Patna, government medical colleges and many private hospitals, while Gaya, Muzaffarpur, Bhagalpur and Darbhanga have medical colleges and growing private nursing homes.",
    fire: "Bihar Fire Services", pcb: S("Bihar"),
    ot: "Many Bihar hospitals are in multi-storey buildings on narrow city roads, so the survey records how panels will be carried in and whether a crane or staircase route is needed. Hot, humid summers make the HVAC design and room sealing an important part of the OT scope.",
    mgps: "Flood-season road disruption in north Bihar makes reliable gas supply a planning issue, so hospitals in Darbhanga, Muzaffarpur or Purnia may keep a larger cylinder reserve. In Patna, hospitals adding ICU beds often extend an existing pipeline, which needs a pressure-drop check of the current system first.",
  },
  jharkhand: {
    cities: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh"], hub: "Ranchi",
    route: "via NH-19 towards Varanasi and onward through Aurangabad (Bihar)", km: "1,250", drive: "about 20 hours",
    hospitals: "Ranchi has RIMS and private hospitals, Jamshedpur, Bokaro and Dhanbad have industrial and private hospitals, and Deoghar has an AIIMS, alongside district hospitals across the state.",
    fire: "Jharkhand Fire Services", pcb: S("Jharkhand"),
    ot: "Hospitals linked to industrial townships in Jamshedpur and Bokaro often have their own engineering departments, and OT drawings are coordinated with them. The undulating plateau roads mean panels are packed with extra edge protection for the last stretch to the site.",
    mgps: "Industrial cities such as Jamshedpur and Bokaro have local gas plants, which can simplify liquid oxygen supply for larger hospitals. Smaller hospitals in Hazaribagh or Deoghar more often begin with a cylinder manifold sized for their ICU and OT load.",
  },
  "west-bengal": {
    cities: ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol", "Kharagpur"], hub: "Kolkata",
    route: "via NH-19 (the Grand Trunk Road corridor) through Varanasi and Dhanbad", km: "1,500", drive: "about 24 hours, so goods transit normally spans more than a day",
    hospitals: "Kolkata has large private and government teaching hospitals that draw patients from eastern India and neighbouring countries, while Durgapur, Asansol and Siliguri have growing private hospitals.",
    fire: "West Bengal Fire and Emergency Services", pcb: S("West Bengal"),
    ot: "High humidity for much of the year is a key consideration in Kolkata theatres, so the panel joints, ceiling seal and HVAC dehumidification are planned together. Siliguri projects are reached through a separate route from Bihar and are scheduled as their own dispatch.",
    mgps: "Older Kolkata hospital buildings may have existing pipelines in mild steel or undocumented layouts, so the survey traces the current lines before any extension. Corrosion risk from humid air is reduced by keeping copper pipe capped, dry and supported correctly until testing.",
  },
  odisha: {
    cities: ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Berhampur", "Balasore"], hub: "Bhubaneswar",
    route: "via NH-19 to Dhanbad and onward through Kharagpur and Balasore", km: "1,750", drive: "around 28 to 30 hours, so goods transit spans multiple days",
    hospitals: "Bhubaneswar and Cuttack host AIIMS Bhubaneswar, SCB Medical College and private hospitals, while Rourkela, Sambalpur and Berhampur have medical colleges and industrial hospitals.",
    fire: "Odisha Fire and Emergency Services", pcb: S("Odisha"),
    ot: "Coastal Odisha faces cyclone seasons and high humidity, so delivery is planned to avoid peak storm periods and the OT ceiling and HVAC are sealed against moisture. Rourkela and Sambalpur in the interior have hotter, drier summers.",
    mgps: "Hospitals on the coast plan gas yards and manifold rooms above flood level with secure roofing. Industrial hospitals in Rourkela often have their own gas supply arrangements, which the pipeline design connects to.",
  },
  chhattisgarh: {
    cities: ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Raigarh"], hub: "Raipur",
    route: "via NH-44 through Agra, Gwalior and Sagar and onward on NH-30", km: "1,200", drive: "about 20 hours",
    hospitals: "Raipur has AIIMS Raipur, a government medical college and private hospitals, Bhilai has industrial hospitals, and Bilaspur and Korba are growing with medical colleges and private hospitals.",
    fire: "Chhattisgarh fire services", pcb: "Chhattisgarh Environment Conservation Board",
    ot: "New hospital buildings around Raipur and Bilaspur often allow the OT to be planned before walls are built, which makes it easier to fix ceiling height and service shafts. Very hot summers make the OT air-conditioning load an early design discussion.",
    mgps: "Industrial towns such as Bhilai and Korba have nearby gas suppliers, while hospitals in Raigarh and smaller districts depend on cylinder deliveries, so the manifold reserve is sized accordingly.",
  },
  karnataka: {
    cities: ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi", "Kalaburagi"], hub: "Bengaluru",
    route: "via NH-44 through Agra, Nagpur and Hyderabad", km: "2,100", drive: "about 35 hours, so goods transit spans multiple days",
    hospitals: "Bengaluru has large corporate hospital networks and specialty centres, Mysuru and Mangaluru have medical colleges and private hospitals, and Hubballi, Belagavi and Kalaburagi serve north Karnataka.",
    fire: "Karnataka State Fire and Emergency Services", pcb: S("Karnataka"),
    ot: "Bengaluru's moderate climate reduces HVAC extremes, but many hospitals are in tall buildings where lifts limit panel length. Coastal Mangaluru is more humid, and the long transit from Faridabad means every panel lot is checked against the drawings before dispatch.",
    mgps: "Bengaluru hospitals frequently expand into adjoining buildings, so pipelines are designed with interconnections and zone valves. In north Karnataka districts, cylinder supply distance influences the size of the manifold reserve.",
  },
  "tamil-nadu": {
    cities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli"], hub: "Chennai",
    route: "via NH-44 to Nagpur and Hyderabad and onward through Andhra Pradesh", km: "2,200", drive: "about 36 to 38 hours, so goods transit spans multiple days",
    hospitals: "Chennai is a major centre for corporate hospitals and medical tourism, Coimbatore and Madurai have large private and teaching hospitals, and every district has government medical college hospitals.",
    fire: "Tamil Nadu Fire and Rescue Services", pcb: S("Tamil Nadu"),
    ot: "Chennai's hot, humid climate and the north-east monsoon make room sealing and dehumidification central to the OT design. Coimbatore's milder conditions change the HVAC load, so each city's theatre is designed for its own climate.",
    mgps: "Coastal humidity in Chennai calls for careful storage of copper and fittings on site. Larger hospitals in Coimbatore and Madurai often combine a liquid oxygen tank with cylinder manifolds for back-up.",
  },
  kerala: {
    cities: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Kannur", "Kollam"], hub: "Kochi",
    route: "via NH-44 to Bengaluru and onward through Coimbatore and the Palakkad gap", km: "2,650", drive: "about 44 hours, so goods transit spans multiple days",
    hospitals: "Kerala has a high density of private, cooperative and mission hospitals, medical colleges in most districts, and specialty hospitals in Kochi and Thiruvananthapuram.",
    fire: "Kerala Fire and Rescue Services", pcb: S("Kerala"),
    ot: "Heavy monsoons and high humidity are the main climate issues for Kerala theatres, so panel joints, ceiling seals and AHU dehumidification are planned carefully. Narrow roads in older towns can require panels to be delivered in shorter lengths.",
    mgps: "Kerala hospitals often sit on sloping or compact plots, so the manifold room and liquid oxygen tank location are planned with drainage and supplier access in mind.",
  },
  telangana: {
    cities: ["Hyderabad", "Warangal", "Karimnagar", "Nizamabad", "Khammam", "Secunderabad"], hub: "Hyderabad",
    route: "via NH-44 through Agra, Gwalior, Sagar and Nagpur", km: "1,550", drive: "about 25 hours, so goods transit normally spans more than a day",
    hospitals: "Hyderabad is a major centre for corporate hospitals, specialty institutes and medical colleges, while Warangal, Karimnagar and Khammam have teaching and private hospitals serving the districts.",
    fire: "Telangana State Disaster Response and Fire Services", pcb: S("Telangana"),
    ot: "Hyderabad's large hospital campuses often add theatres within existing blocks, so dust control and phased work around running OTs are discussed early. The hot, dry summer means HVAC cooling load is a main design factor.",
    mgps: "Hyderabad hospitals with several blocks may need a ring main or interconnected pipeline between buildings. District hospitals in Warangal or Nizamabad commonly start with a cylinder manifold serving the OT and ICU.",
  },
  "andhra-pradesh": {
    cities: ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Nellore", "Kurnool"], hub: "Vijayawada",
    route: "via NH-44 to Hyderabad and onward on NH-65", km: "1,800", drive: "about 30 hours, so goods transit spans multiple days",
    hospitals: "Andhra Pradesh has AIIMS Mangalagiri, government medical colleges, and private hospitals in Visakhapatnam, Vijayawada, Guntur and Tirupati.",
    fire: "Andhra Pradesh State Disaster Response and Fire Services", pcb: S("Andhra Pradesh"),
    ot: "Coastal cities such as Visakhapatnam and Nellore face high humidity and cyclone seasons, so delivery and room sealing are planned around them. Kurnool and Tirupati in the interior are hotter and drier.",
    mgps: "Hospitals near Visakhapatnam's industrial belt can source gas locally, while smaller towns rely on cylinders. Gas yards in coastal areas are planned above flood level.",
  },
  goa: {
    cities: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim"], hub: "Panaji",
    route: "via the Delhi–Mumbai Expressway and NH-48, then NH-66 along the Konkan", km: "1,900", drive: "about 32 hours, so goods transit spans multiple days",
    hospitals: "Goa has Goa Medical College, district hospitals, and private hospitals and nursing homes in Panaji, Margao and Mapusa serving residents and visitors.",
    fire: "Goa Directorate of Fire and Emergency Services", pcb: S("Goa"),
    ot: "Goa's heavy monsoon and salt air make humidity control and corrosion-resistant fixings important for OT panels and ceilings. Deliveries are scheduled outside peak monsoon weeks where possible.",
    mgps: "Compact hospital plots in Goa limit space for a gas yard, so a cylinder manifold room is often the practical choice. Salt air means outlet and valve box finishes are chosen for durability.",
  },
  "himachal-pradesh": {
    cities: ["Shimla", "Mandi", "Dharamshala", "Solan", "Baddi", "Hamirpur"], hub: "Shimla",
    route: "via NH-44 to Zirakpur and the Kalka–Shimla highway (NH-5)", km: "380", drive: "7 to 8 hours",
    hospitals: "Himachal has IGMC Shimla, AIIMS Bilaspur, medical colleges in Tanda, Mandi and Hamirpur, and private hospitals mainly in Solan, Baddi and the lower hills.",
    fire: "Himachal Pradesh Fire Services", pcb: S("Himachal Pradesh"),
    ot: "Hill roads, landslide-prone stretches and winter snow mean panel sizes and vehicles are selected for access, and deliveries are timed for good road conditions. Cold winters make heating part of the OT HVAC design.",
    mgps: "Cylinder deliveries to hill hospitals can be delayed by weather, so reserve banks or an oxygen generator with manifold back-up are worth discussing. Pipelines in unheated areas are routed to avoid exposure to freezing conditions.",
  },
  "jammu-and-kashmir": {
    cities: ["Jammu", "Srinagar", "Anantnag", "Baramulla", "Kathua", "Udhampur"], hub: "Jammu",
    route: "via NH-44 through Panipat, Ambala and Pathankot", km: "620", drive: "10 to 11 hours to Jammu, with Srinagar a further day over NH-44",
    hospitals: "The Union Territory has AIIMS Jammu and the institutes and medical colleges in Jammu and Srinagar, along with district hospitals and private hospitals in the main towns.",
    fire: "Jammu and Kashmir Fire and Emergency Services", pcb: "Jammu and Kashmir Pollution Control Committee",
    ot: "The Kashmir valley's cold winters make heating and humidity control essential for OT design, and highway closures in winter affect delivery timing. Jammu has hot summers instead, so each region's theatre is designed for its own conditions.",
    mgps: "Winter road closures make gas reserve planning important for Kashmir hospitals. Manifold rooms and pipelines in cold areas are planned so that equipment and exposed lines are protected from freezing.",
  },
  assam: {
    cities: ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Nagaon", "Tinsukia"], hub: "Guwahati",
    route: "via the East–West corridor (NH-27) through Lucknow, Gorakhpur and Siliguri", km: "1,950", drive: "about 35 hours, so goods transit spans multiple days",
    hospitals: "Guwahati is the main referral centre for the North East with AIIMS Guwahati, Gauhati Medical College and private hospitals, and Dibrugarh, Silchar and Jorhat have medical colleges.",
    fire: "Assam Fire and Emergency Services", pcb: S("Assam"),
    ot: "Very high monsoon rainfall and humidity in Assam make room sealing and HVAC dehumidification critical. Flood-season road conditions are considered when scheduling delivery, especially for Upper Assam towns.",
    mgps: "Flood risk influences where Assam hospitals place gas yards and manifold rooms. Upper Assam towns near the oil and gas belt may have local suppliers, while Barak Valley sites such as Silchar plan larger reserves.",
  },
  chandigarh: {
    cities: ["Chandigarh city sectors", "Mohali (Punjab, nearby)", "Panchkula (Haryana, nearby)", "Zirakpur (Punjab, nearby)"], hub: "Chandigarh",
    route: "via NH-44 through Panipat and Ambala", km: "280", drive: "about 5 hours",
    hospitals: "Chandigarh has PGIMER, the Government Medical College and Hospital in Sector 32 and private hospitals, and serves as a referral hub for patients from Punjab, Haryana and Himachal; Mohali and Panchkula are nearby but outside the Union Territory.",
    fire: "Chandigarh Fire and Emergency Services", pcb: "Chandigarh Pollution Control Committee",
    ot: "Chandigarh's planned sectors usually give reasonable vehicle access, but hospital buildings are often fully occupied, so OT upgrades are phased. Cold winters and hot summers both have to be handled by the OT HVAC.",
    mgps: "Chandigarh hospitals are often expanding within fixed sector plots, so pipeline extensions are planned with zone isolation to keep existing wards on supply. Nearby projects in Mohali or Panchkula are surveyed under their own state's requirements.",
  },
};
