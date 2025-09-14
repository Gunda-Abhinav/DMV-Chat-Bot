export interface DMVDataItem {
  id: string;
  title: string;
  content: string;
  url: string;
  category: string;
}

const sampleDMVData: DMVDataItem[] = [
  {
    id: "dl-requirements-legal",
    title: "California Driver License Legal Requirements",
    content: "A California driver's license (DL) is a card which grants permission to an individual to operate a motor vehicle. A DL includes your true full name, birth date, mailing address, signature, photograph, and physical description. This card must be in your possession anytime you operate a motor vehicle. You may apply for a DL at a Department of Motor Vehicles (DMV) field office. If you become a California resident, you must get a California DL within 10 days. Residency is established by voting in a California election, paying resident tuition, filing for a homeowner's property tax exemption, or any other privilege or benefit not ordinarily extended to nonresidents. When applying for a DL, there are 2 types; commercial and noncommercial. There are 4 noncommercial DL classes: Basic Driver's License (Class C), Motorcycle (Class M1 or M2), Travel Trailer/Fifth Wheel (Noncommercial Class A), and Housecar/Motorhome (Noncommercial Class B). Commercial DL classes include Commercial A, Commercial B, and Commercial C with specific endorsements.",
    url: "https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/fast-facts/requirements-for-a-california-driver-license-ffdl-5/",
    category: "license"
  },
  {
    id: "identity-documents-legal",
    title: "Legal Identity Document Requirements",
    content: "When you apply for an original California DL, recertify your California Commercial DL, or convert to a REAL ID Compliant DL, you must present an acceptable identity document(s) to establish who you are. An acceptable document is one produced by an authority, such as a county, state, federal, or foreign agency. These are original or certified documents establishing birth date, true full name, and identity. DMV will only accept an original document or a certified copy of the original to establish identity. DMV will not accept photocopies, 'informational copies,' or documents with the statement, 'Informational, not a valid document to establish identity.' Your true full name is your current, complete legal name (first, middle, and last name) as it appears on your identity or name change document(s).",
    url: "https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/fast-facts/requirements-for-a-california-driver-license-ffdl-5/",
    category: "license"
  },
  {
    id: "dui-legal-procedures",
    title: "DUI Legal Procedures and Administrative Actions",
    content: "Driving Under the Influence means you were found to be driving with alcohol or other substances in your system. The administrative license suspension program, known as 'Admin Per Se' (APS) was implemented in 1990 as a stronger deterrent to drunk driving. When arrested for DUI, you face both criminal court proceedings and separate DMV administrative actions. The DMV action is independent of the court case and occurs regardless of the criminal court outcome. You have the right to request an administrative hearing within 10 days of your arrest to challenge the license suspension. Administrative hearings conducted by DMV are separate from criminal hearings held in a court. They are held before a Driver Safety (DS) Hearing Officer instead of a judge, and the standards used to admit and consider evidence are less strict than those of a criminal court.",
    url: "https://www.dmv.ca.gov/portal/driver-education-and-safety/dmv-safety-guidelines-actions/driving-under-the-influence/",
    category: "legal"
  },
  {
    id: "administrative-hearing-rights",
    title: "Legal Rights During Administrative Hearings",
    content: "When the Department of Motor Vehicles (DMV) takes an action against your driver's license you may be entitled to an administrative hearing. During an administrative hearing, you have specific legal rights: the right to be represented by an attorney at your own expense, the right to review the evidence that DMV will present against you, the right to present evidence and testimony on your behalf, the right to cross-examine witnesses, and the right to have the hearing conducted in a language other than English if you request an interpreter. You must request a hearing within the specified time limit or you will lose your right to challenge the DMV action. The hearing officer will make a decision based on the preponderance of evidence standard.",
    url: "https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/fast-facts/driver-safety-administrative-hearings-process-ffdl-26/",
    category: "legal"
  },
  {
    id: "title-transfer-legal-requirements",
    title: "Vehicle Title Transfer Legal Procedures",
    content: "Any change of the current registered owner or lienholder (legal owner) of a vehicle requires a title transfer. When you buy a vehicle, you need to transfer the vehicle's title to establish yourself as the new legal owner. You will need the California Certificate of Title or Application for Replacement or Transfer of Title (REG 227) form, signatures of the seller(s), buyer(s), and lienholder (if applicable), and transfer fee. The title must be properly signed and transferred within 10 days of purchase to avoid penalties. Before you begin, have the California Certificate of Title with you. Make sure the title has been signed by the buyer(s), seller(s), and lienholder (if applicable). If you do not have the title, complete an Application for Replacement or Transfer of Title (REG 227).",
    url: "https://www.dmv.ca.gov/portal/dmv-virtual-office/title-transfers/",
    category: "registration"
  },
  {
    id: "ab60-license-legal",
    title: "AB 60 Driver License Legal Framework",
    content: "AB 60 driver's licenses are for individuals who are unable to provide proof of legal presence in the United States, but who meet California DMV requirements and are able to provide proof of identity and California residency. Applicants applying for a DL pursuant to Assembly Bill (AB) 60 are unable to apply for a REAL ID Compliant DL card. These licenses are valid for driving purposes within California but cannot be used for federal identification purposes such as boarding aircraft or entering federal facilities. The legal framework ensures that all California residents can obtain driving privileges regardless of immigration status while maintaining federal compliance requirements.",
    url: "https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/assembly-bill-ab-60-driver-licenses/",
    category: "license"
  },
  {
    id: "license-renewal-comprehensive",
    title: "California Driver License Renewal - Complete Guide",
    content: "California driver's license renewal can be completed online, by mail, or in person at any DMV office. Online renewal is the most convenient option and is available for eligible drivers whose licenses are not expired for more than 12 months. To renew online, you need your driver license number, the last four digits of your Social Security number, and a valid payment method. The online system is available 24/7 and provides immediate confirmation. Mail renewal is available for eligible applicants who receive a renewal notice. Simply complete the form, include payment, and mail it back. Processing takes 2-3 weeks. In-person renewal is required for drivers who need to update their photo, address, or other information. Visit any DMV office with proper identification and payment. Appointments are recommended to reduce wait times. License renewal fees are $39 for a standard license and vary for commercial licenses. Senior citizens (62+) and disabled veterans may qualify for fee reductions. Your new license will be mailed within 2-3 weeks after processing.",
    url: "https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/driver-license-id-card-online-renewal/",
    category: "license_renewal"
  },
  {
    id: "real-id-complete-guide", 
    title: "California REAL ID - Requirements and Process",
    content: "A California REAL ID is a federally compliant driver license or identification card that will be required for domestic air travel and access to certain federal facilities starting May 7, 2025. To apply for a REAL ID, you must visit a DMV office in person as online applications are not accepted. You need to provide original or certified documents proving: (1) Identity - such as a valid U.S. passport, certified birth certificate, or permanent resident card, (2) California residency - utility bills, lease agreements, or bank statements from the last 90 days, (3) Social Security number - Social Security card, W-2, or paystub with full SSN. Photocopies are not accepted. The REAL ID has a gold bear and star in the upper right corner. The application process includes document verification, vision screening, thumbprint, and photo. Processing takes 2-3 weeks and the card is mailed to your address. The fee is $39, same as a standard license. You can upgrade your existing license to a REAL ID when you renew or apply separately. Appointments are strongly recommended due to the additional documentation review time required.",
    url: "https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/",
    category: "real_id"
  },
  {
    id: "dmv-appointments-system",
    title: "DMV Appointment Scheduling and Management",
    content: "DMV appointments can be scheduled online through the official DMV website appointment system or by calling 1-800-777-0133. The online system allows you to select your preferred office location, service type, and available time slot. Popular appointment times fill quickly, so book as early as possible. You can schedule appointments up to 90 days in advance. Walk-in service is available but expect significantly longer wait times, especially during peak hours and seasons. To schedule online, select your transaction type, choose a DMV office location, and pick an available date and time. You'll receive a confirmation number via email. Appointments can be cancelled or rescheduled online using your confirmation number, but changes must be made at least 24 hours in advance. Missing an appointment without cancellation may result in a brief restriction on scheduling future appointments. Some services like renewals, address changes, and REAL ID applications require appointments, while others accept walk-ins. Check the DMV website to determine if your specific service requires an appointment.",
    url: "https://www.dmv.ca.gov/portal/dmv-online/", 
    category: "appointment"
  },
  {
    id: "vehicle-registration-comprehensive",
    title: "California Vehicle Registration - Complete Process",
    content: "California vehicle registration must be renewed annually and can be completed online, by mail, or in person. Online renewal is available for most vehicles and is the fastest option, available 24/7 with immediate confirmation. You need your license plate number, last 5 digits of the VIN, and a valid payment method. Mail renewal requires completing the renewal notice form and mailing it with payment. Processing takes 2-3 weeks. In-person renewal is available at any DMV office or partner location. Most vehicles 8 years or older require a smog check before registration renewal. Exempt vehicles include electric cars, hybrids under certain conditions, and vehicles less than 8 model years old. Registration fees include a base fee, vehicle license fee (based on vehicle value), and various county and district fees. Use the DMV fee calculator for exact amounts. Late registration incurs penalty fees that increase over time. Driving with expired registration is illegal and subject to fines. New residents must register their vehicles within 20 days of establishing California residency. The registration card and stickers are mailed within 2-3 weeks and must be displayed on the vehicle.",
    url: "https://www.dmv.ca.gov/portal/vehicle-registration/",
    category: "vehicle_registration"
  },
  {
    id: "dmv-fees-comprehensive",
    title: "Complete DMV Fee Schedule and Payment Information",
    content: "California DMV fees vary by service type and are subject to periodic updates. Driver license fees: original license $39, renewal $39, duplicate $33, commercial license varies by class. Identification card fees: original $33, renewal $33, duplicate $28, senior/disabled reduced rates available. Vehicle registration fees include base registration fee ($54-$107 depending on vehicle type), vehicle license fee (0.65% of vehicle value), and additional county/district fees. Motorcycle registration is typically lower than passenger vehicles. Personalized license plates cost $50 initial fee plus annual renewal fees. Special interest plates have varying fees. Payment methods include cash, check, money order, and credit/debit cards. Online services may include convenience fees. Some DMV partner locations may charge additional service fees. Fee waivers or reductions are available for veterans with disabilities, seniors over 62, and certain low-income individuals. Commercial vehicle fees are significantly higher and based on vehicle weight and type. Title transfer fees, smog certificate fees, and penalty fees for late renewals are additional costs to consider.",
    url: "https://www.dmv.ca.gov/portal/dmv-fees/",
    category: "fees"
  },
  {
    id: "dmv-office-locations-services",
    title: "DMV Office Locations and Services Guide",
    content: "California has over 170 DMV office locations throughout the state, each offering different services and operating hours. Use the DMV office locator on the website to find locations by ZIP code, city, or address. Office hours typically run Monday through Friday, 8:00 AM to 5:00 PM, with some locations offering Saturday hours. Holiday schedules may differ. Not all offices provide the same services - some specialize in commercial licenses, others focus on registration services. Full-service offices handle all DMV transactions including driving tests, REAL ID applications, and complex title work. Limited-service locations may only handle basic renewals and registrations. Wait times vary significantly by location, time of day, and season. Check current wait times on the DMV website before visiting. Many services can be completed online to avoid office visits entirely, including renewals, address changes, and duplicate documents. Field offices in rural areas may have limited hours or services. Some offices require appointments for certain services while others accept walk-ins. AAA offices provide some DMV services for AAA members, including registration renewals and some license services.",
    url: "https://www.dmv.ca.gov/portal/office-locations/",
    category: "office_locations"
  },
  {
    id: "smog-check-requirements",
    title: "California Smog Check Requirements and Process",
    content: "California requires smog checks for most vehicles to register or renew registration. Vehicles 8 model years and older require smog checks every two years. New vehicles are exempt for the first 8 years, then require biennial testing. Hybrid and electric vehicles may have different requirements or exemptions. Smog checks must be performed at licensed smog check stations. The process includes visual inspection of emission control systems and exhaust testing. Results are electronically transmitted to the DMV. If your vehicle fails, you must have repairs done and retest before registration renewal. Some repair facilities can perform both repairs and retesting. The cost varies by location but typically ranges from $30-50 for the test. Additional fees apply for repairs if needed. Vehicles with gross vehicle weight over 14,000 pounds have different testing requirements. Military personnel stationed outside California may qualify for exemptions. Smog checks must be completed within 90 days before registration renewal. Keep your smog certificate as proof of compliance.",
    url: "https://www.dmv.ca.gov/portal/vehicle-registration/smog-inspections/",
    category: "vehicle_registration"
  },
  {
    id: "driving-test-requirements",
    title: "California Driving Test Requirements and Preparation",
    content: "California driving tests are required for new drivers, out-of-state transfers in certain situations, and license reinstatement after certain violations. The driving test includes a pre-drive safety check, basic vehicle operation, and on-road driving evaluation. You must provide a safe, properly registered and insured vehicle for the test. The vehicle must have valid registration, proof of insurance, working mirrors, signals, brakes, and horn. Both the applicant and a licensed driver (25+ years old) must sign the insurance verification form. The test route covers residential streets, business districts, and may include freeway driving. Evaluators assess vehicle control, traffic law compliance, safety awareness, and driving skills. Common test areas include parking, backing, turning, lane changes, and intersection navigation. Practice with an experienced driver before taking the test. Study the California Driver Handbook thoroughly. Appointment scheduling is required for driving tests. Bring your completed application, required identification documents, and fees. If you fail, you can retake the test after paying additional fees, with waiting periods between attempts.",
    url: "https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/behind-the-wheel-drive-test/",
    category: "driving_test"
  },
  {
    id: "address-change-process",
    title: "DMV Address Change Requirements and Process",
    content: "California law requires you to notify the DMV within 10 days of changing your address. You can update your address online, by mail, or in person at any DMV office. Online address changes are free for most services and take effect immediately. You'll need your driver license or ID card number and the last four digits of your Social Security number. If you have both a driver license and vehicle registration, you may need to update each separately. For vehicle registration address changes, you may need to pay additional fees if moving to a different county or fee area. After updating your address online, you can print a temporary address verification for immediate use. Your new documents with the updated address will be mailed within 2-3 weeks. If you're moving out of state, you'll need to surrender your California license and register in your new state. Military personnel may have different requirements and exemptions. Keep your address current to ensure you receive important notices from the DMV, including renewal notices and legal correspondence.",
    url: "https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/change-your-address/",
    category: "address_change"
  },
  {
    id: "commercial-license-info",
    title: "Commercial Driver License (CDL) Information",
    content: "A Commercial Driver License (CDL) is required to operate commercial vehicles in California. There are three classes of CDL: Class A (combination vehicles), Class B (large trucks), and Class C (small hazmat vehicles). To obtain a CDL, you must be at least 18 years old (21 for interstate driving), have a valid California driver license, and pass written and driving tests. The process includes studying the Commercial Driver Handbook, obtaining a Commercial Learner Permit (CLP), practicing with a qualified CDL holder, and taking the skills test. Medical certification is required and must be renewed periodically. CDL holders must follow stricter rules including lower blood alcohol limits and regular medical exams. Endorsements are available for specific vehicle types or cargo (passenger, school bus, hazmat, motorcycle). CDL renewal occurs every 5 years and requires medical certification. Violations in personal or commercial vehicles can affect your CDL status. Some violations result in immediate disqualification. Training programs are available through approved schools and some employers provide training.",
    url: "https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/commercial-driver-license-cdl/",
    category: "commercial_license"
  },
  {
    id: "dmv-services-overview",
    title: "Complete California DMV Services Overview",
    content: "The California Department of Motor Vehicles provides comprehensive services for drivers and vehicle owners throughout the state. Driver services include new license applications, renewals, REAL ID upgrades, duplicate licenses, and address changes. Vehicle services cover registration, renewals, title transfers, smog check coordination, and disabled parking placards. Online services are available 24/7 for eligible transactions including license renewals, vehicle registration renewals, address changes, and fee payments. Testing services include written knowledge tests, behind-the-wheel driving tests, and motorcycle skills tests. The DMV also handles commercial driver licenses, traffic violator school completion, and vehicle inspections. Special services include veteran designation, organ donor registration, and voter registration. Most routine services can be completed online or by mail to save time. Complex transactions requiring document verification must be done in person. The DMV website provides detailed information about eligibility requirements, required documents, and processing times for each service. Customer service is available by phone at 1-800-777-0133 for questions and assistance.",
    url: "https://www.dmv.ca.gov/portal/dmv-online/",
    category: "dmv_services"
  },
  {
    id: "vehicle-registration-renewal-detailed",
    title: "How to Renew Vehicle Registration in California",
    content: "Renewing your vehicle registration in California can be done online, by mail, or in person at a DMV office. Online renewal is the fastest method, available 24/7 at dmv.ca.gov. You need your license plate number, the last 5 digits of your Vehicle Identification Number (VIN), and a valid payment method. Most vehicles are eligible for online renewal unless there are special circumstances like smog check requirements or address changes. If your vehicle requires a smog check, complete it first before renewing registration. Mail renewal is available if you received a renewal notice. Complete the form, include payment, and mail it back using the prepaid envelope. Processing takes 2-3 weeks. In-person renewal can be done at any DMV office or authorized partner location. Bring your renewal notice, current registration, and payment. Registration fees vary based on vehicle type, value, and location. Late renewal incurs penalty fees that increase over time. Your new registration card and stickers will be mailed within 2-3 weeks. Display the new stickers on your license plate immediately upon receipt.",
    url: "https://www.dmv.ca.gov/portal/vehicle-registration/",
    category: "vehicle_registration"
  },
  {
    id: "new-driver-license-application",
    title: "How to Apply for a New California Driver License",
    content: "To apply for your first California driver license, you must be at least 15.5 years old to apply for a learner permit. Start by studying the California Driver Handbook and completing a driver education course if under 18. Gather required documents including proof of identity (birth certificate or passport), Social Security number, and California residency (two documents). Complete the DL 44 application form and bring it to a DMV office along with the required fee. You'll take a vision test, written knowledge test, and provide a thumbprint and photo. If you pass the written test and are under 18, you'll receive a learner permit. Practice driving with a licensed adult (25+) for the required period. Schedule and pass the behind-the-wheel driving test to receive your provisional or full license. New residents from other states may be exempt from some testing requirements if they have a valid out-of-state license. The entire process can take several weeks to months depending on practice time needed and appointment availability.",
    url: "https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/how-to-apply-for-a-new-dl-id/",
    category: "new_license"
  },
  
  // Comprehensive Vehicle Registration Data
  {
    id: "vehicle-registration-new-comprehensive",
    title: "New Vehicle Registration - Complete Guide",
    content: "California requires all vehicles used on public roads to be registered within 20 days of purchase or 10 days if moving from out-of-state. New registration process varies by vehicle type:\n\n**Dealership Purchase:** Licensed dealers typically handle initial registration, provide temporary tags, and transfer title. Verify all paperwork is complete.\n\n**Private-Party Purchase:** Buyer must complete registration within 20 days. Required documents: Application for Title/Registration (REG 343), vehicle title signed by seller, smog certificate (if required), insurance proof, and payment.\n\n**Vehicle Types Requiring Registration:**\n• Passenger vehicles, trucks, motorcycles\n• Boats/vessels over 8 feet or with motor\n• Commercial vehicles and trailers\n• Imported vehicles (additional requirements)\n• Specially-constructed/modified vehicles\n• Salvaged vehicles (special documentation)\n\n**Required Documents:**\n• Application for Title or Registration (REG 343)\n• Vehicle title or manufacturer's certificate\n• Smog certification (vehicles 8+ years, some exceptions)\n• Insurance verification (minimum liability coverage)\n• Valid identification\n• Bill of sale (private party purchases)\n\n**Fees Based On:**\n• Vehicle type and weight\n• Purchase price or declared value\n• County of residence\n• Special plates or circumstances\n\n**Timeline and Penalties:**\n• 20 days for in-state purchases\n• 10 days for new California residents\n• Late penalties increase over time\n• Cannot legally drive with expired/no registration",
    url: "https://www.dmv.ca.gov/portal/vehicle-registration/new-registration/",
    category: "vehicle_registration"
  },
  
  {
    id: "vehicle-registration-fees-detailed",
    title: "Vehicle Registration Fees - Complete Breakdown",
    content: "California vehicle registration fees include multiple components that vary by vehicle type, value, and location:\n\n**Base Registration Fee:**\n• Passenger vehicles: $54\n• Motorcycles: $24\n• Commercial vehicles: varies by weight\n• Trailers: $20-$100+ depending on type\n\n**Vehicle License Fee (VLF):**\n• 0.65% of vehicle's assessed value\n• Based on purchase price for new vehicles\n• DMV estimated value for used vehicles\n• Decreases as vehicle ages\n\n**Additional Required Fees:**\n• California Highway Patrol (CHP) fee: $32\n• Transportation improvement fee: varies by county\n• County/district fees: location-dependent\n• Smog abatement fee: $20 (if applicable)\n\n**Late Penalties:**\n• 1-10 days late: $10 additional\n• 11-30 days late: $15 additional\n• 31 days to 1 year: $32 additional\n• Over 1 year: $54 additional\n• Over 2 years: $100 additional\n\n**Special Circumstances:**\n• Personalized plates: $50 initial + annual renewal\n• Special interest plates: varies by design\n• Partial year registration available for commercial vehicles\n• Military overseas exemptions available\n\n**Payment Methods:**\n• Online: credit/debit cards (convenience fee may apply)\n• DMV offices: cash, check, money order, cards\n• Mail: check or money order only\n• Partner locations: varies by location\n\n**Fee Calculators Available:**\nDMV provides online calculators for new vehicles, used vehicles, renewals, and out-of-state transfers at dmv.ca.gov",
    url: "https://www.dmv.ca.gov/portal/vehicle-registration/registration-fees/",
    category: "vehicle_registration"
  },
  
  {
    id: "vehicle-title-transfer-complete",
    title: "Vehicle Title Transfer - Complete Process",
    content: "California requires title transfer for any change in vehicle ownership. Process must be completed within 10 days to avoid penalties:\n\n**Required Documents:**\n• California Certificate of Title (pink slip)\n• Application for Title/Registration (REG 343) if title unavailable\n• Signatures of all buyers and sellers\n• Lienholder signature (if applicable)\n• Bill of sale for private party transactions\n• Smog certificate (if required)\n• Insurance verification\n\n**Title Transfer Steps:**\n1. Complete title information accurately\n2. Both parties sign and date\n3. Buyer completes REG 343 application\n4. Provide required documentation\n5. Pay transfer fees and taxes\n6. Submit to DMV for processing\n\n**Common Issues to Avoid:**\n• Incomplete or incorrect signatures\n• Missing odometer disclosure\n• Liens not properly released\n• Address changes not updated\n• Missing bill of sale\n\n**Title Transfer Fees:**\n• Title transfer fee: $15\n• Registration fees apply separately\n• Use tax may be required (varies)\n• Late transfer penalties if over 10 days\n\n**Special Situations:**\n• Inherited vehicles require additional forms\n• Gift transfers between family members\n• Lien releases from financial institutions\n• Out-of-state title transfers\n• Lost or damaged title replacements\n\n**Processing Time:**\n• Standard processing: 2-3 weeks\n• Expedited service available for additional fee\n• Electronic lien processing faster\n\n**After Transfer:**\n• New owner receives title and registration\n• Update insurance immediately\n• Display new registration stickers\n• Keep all documentation for records",
    url: "https://www.dmv.ca.gov/portal/vehicle-registration/titles/",
    category: "vehicle_registration"
  },
  
  {
    id: "vehicle-insurance-requirements",
    title: "California Vehicle Insurance Requirements",
    content: "California requires all vehicles to maintain minimum liability insurance coverage:\n\n**Minimum Required Coverage:**\n• Bodily injury liability: $15,000 per person\n• Bodily injury liability: $30,000 per accident\n• Property damage liability: $5,000 per accident\n\n**Proof of Insurance Required:**\n• Valid insurance card or certificate\n• Electronic proof acceptable on mobile devices\n• Must be carried in vehicle at all times\n• Required for registration and renewals\n\n**Insurance Verification:**\n• DMV electronically verifies coverage\n• Lapses in coverage reported automatically\n• Penalties for driving without insurance\n• License suspension possible for violations\n\n**Additional Coverage Options:**\n• Comprehensive and collision coverage\n• Uninsured/underinsured motorist protection\n• Medical payments coverage\n• Gap coverage for financed vehicles\n\n**Special Circumstances:**\n• Antique vehicles may have different requirements\n• Commercial vehicles need higher coverage limits\n• Self-insurance options for large fleets\n• Non-resident vehicles need California coverage\n\n**Penalties for No Insurance:**\n• Fines ranging from $100-$200 for first offense\n• License suspension until insurance obtained\n• Vehicle impoundment possible\n• SR-22 filing required to reinstate\n\n**Insurance Companies:**\n• Must be licensed in California\n• Financial responsibility verification required\n• DMV maintains list of approved insurers\n• Compare rates and coverage options\n\n**Claims and Accidents:**\n• Report accidents to insurance and DMV if required\n• Maintain coverage throughout claims process\n• Update insurance for address or vehicle changes",
    url: "https://www.dmv.ca.gov/portal/vehicle-registration/insurance-requirements/",
    category: "vehicle_registration"
  },
  
  {
    id: "license-plates-placards-complete",
    title: "License Plates, Decals, and Placards - Complete Guide",
    content: "California license plates, decals, and placards serve multiple identification and authorization purposes:\n\n**Standard License Plates:**\n• Issued with new registrations\n• Sequential number/letter combinations\n• Must be displayed front and rear (except motorcycles)\n• Replace every 7-10 years or when damaged\n\n**Special Interest Plates:**\n• Environmental and organizational support plates\n• Additional fees support specific causes\n• Same legal requirements as standard plates\n• Over 100 designs available\n\n**Personalized Plates:**\n• Custom letter/number combinations\n• 2-7 characters maximum\n• $50 initial fee plus annual renewal\n• Subject to approval and content guidelines\n• Cannot duplicate existing combinations\n\n**Registration Stickers:**\n• Year and month stickers required\n• Display on rear plate (month on front where required)\n• Color-coded by expiration year\n• Replace immediately when renewed\n• Penalties for expired or missing stickers\n\n**Disabled Person Placards:**\n• Temporary (6 months) or permanent\n• Doctor certification required\n• Free issuance and renewal\n• Special parking privileges\n• Transferable between vehicles\n\n**Veteran and Military Plates:**\n• Honor military service\n• Proof of service required\n• Some plates provide fee exemptions\n• Purple Heart and disabled veteran options\n\n**Dealer and Manufacturer Plates:**\n• For licensed automotive businesses\n• Specific regulations and restrictions\n• Periodic renewal required\n• Not for personal use\n\n**Plate Replacement:**\n• Damaged, lost, or stolen plates\n• $22 replacement fee\n• Police report may be required for stolen plates\n• New numbers issued for stolen plates\n\n**Display Requirements:**\n• Plates must be securely fastened\n• Clear and visible positioning\n• No covers that obscure information\n• Proper lighting for rear plate",
    url: "https://www.dmv.ca.gov/portal/vehicle-registration/license-plates-decals-and-placards/",
    category: "vehicle_registration"
  }
];

export const getDMVDataByCategory = (category: string) => {
  return sampleDMVData.filter(item => item.category === category);
};

export const getAllDMVData = () => {
  return sampleDMVData;
};