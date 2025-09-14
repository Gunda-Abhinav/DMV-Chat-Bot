import { DocumentChunk } from './DocumentProcessor';
import { LegalProceduresService } from './LegalProceduresService';

export interface GeneratedResponse {
  message: string;
  confidence: number;
  reasoning?: string;
}

export class ResponseGenerator {
  
  static generateContextualResponse(query: string, docs: DocumentChunk[]): GeneratedResponse {
    if (docs.length === 0) {
      return {
        message: "I couldn't find specific information about that in the California DMV documents. Could you please rephrase your question or ask about something more specific related to DMV services?",
        confidence: 0.1
      };
    }

    const queryLower = query.toLowerCase();
    const intent = this.classifyDetailedIntent(queryLower);
    const bestDocs = docs.slice(0, 3); // Use top 3 most relevant documents
    
    // Generate response based on intent and content
    let response: GeneratedResponse;
    
    switch (intent.type) {
      case 'dmv_services':
        response = this.generateDMVServicesResponse(bestDocs, queryLower, intent.specifics);
        break;
      case 'license_renewal':
        response = this.generateLicenseRenewalResponse(bestDocs, queryLower, intent.specifics);
        break;
      case 'real_id':
        response = this.generateRealIdResponse(bestDocs, queryLower, intent.specifics);
        break;
      case 'appointment':
        response = this.generateAppointmentResponse(bestDocs, queryLower, intent.specifics);
        break;
      case 'vehicle_registration':
        response = this.generateVehicleRegistrationResponse(bestDocs, queryLower, intent.specifics);
        break;
      case 'fees':
        response = this.generateFeesResponse(bestDocs, queryLower, intent.specifics);
        break;
      case 'office_locations':
        response = this.generateOfficeLocationResponse(bestDocs, queryLower, intent.specifics);
        break;
      case 'eligibility':
        response = this.generateEligibilityResponse(bestDocs, queryLower, intent.specifics);
        break;
      case 'documents_required':
        response = this.generateDocumentsRequiredResponse(bestDocs, queryLower, intent.specifics);
        break;
      case 'process_steps':
        response = this.generateProcessStepsResponse(bestDocs, queryLower, intent.specifics);
        break;
      case 'legal_procedures':
        response = this.generateLegalProceduresResponse(bestDocs, queryLower, intent.specifics);
        break;
      default:
        response = this.generateIntelligentGenericResponse(bestDocs, queryLower);
    }
    
    // Enhance confidence based on document relevance scores
    const avgRelevance = docs.reduce((sum, doc) => sum + (doc.metadata?.relevanceScore || 0), 0) / docs.length;
    response.confidence = Math.min(response.confidence * (1 + avgRelevance), 1.0);
    
    return response;
  }

  private static classifyDetailedIntent(query: string): { type: string; specifics: string[] } {
    const specifics: string[] = [];
    
    // General DMV services inquiry
    if (query.includes('dmv service') || query.includes('services') || query.toLowerCase() === 'dmv services') {
      return { type: 'dmv_services', specifics };
    }
    
    // License renewal intents
    if (query.includes('renew') && (query.includes('license') || query.includes('id'))) {
      if (query.includes('online')) specifics.push('online');
      if (query.includes('mail')) specifics.push('mail');
      if (query.includes('person') || query.includes('office')) specifics.push('in_person');
      if (query.includes('eligib')) specifics.push('eligibility');
      if (query.includes('expire') || query.includes('expir')) specifics.push('expiration');
      return { type: 'license_renewal', specifics };
    }
    
    // REAL ID intents
    if (query.includes('real id') || query.includes('realid')) {
      if (query.includes('document') || query.includes('proof')) specifics.push('documents');
      if (query.includes('appointment')) specifics.push('appointment');
      if (query.includes('difference') || query.includes('vs') || query.includes('versus')) specifics.push('comparison');
      return { type: 'real_id', specifics };
    }
    
    // Appointment intents
    if (query.includes('appointment') || query.includes('schedule')) {
      if (query.includes('cancel')) specifics.push('cancel');
      if (query.includes('reschedule') || query.includes('change')) specifics.push('reschedule');
      if (query.includes('wait') || query.includes('time')) specifics.push('wait_time');
      return { type: 'appointment', specifics };
    }
    
    // Vehicle registration intents - Fixed to catch "renew vehicle registration"
    if (query.includes('vehicle') || query.includes('car') || 
        (query.includes('registration') && !query.includes('license'))) {
      if (query.includes('renew')) specifics.push('renewal');
      if (query.includes('smog')) specifics.push('smog');
      if (query.includes('fee') || query.includes('cost')) specifics.push('fees');
      if (query.includes('late') || query.includes('penalty')) specifics.push('penalties');
      return { type: 'vehicle_registration', specifics };
    }
    
    // Fee intents
    if (query.includes('fee') || query.includes('cost') || query.includes('price') || query.includes('payment')) {
      if (query.includes('license')) specifics.push('license');
      if (query.includes('registration')) specifics.push('registration');
      if (query.includes('real id')) specifics.push('real_id');
      return { type: 'fees', specifics };
    }
    
    // Office location intents
    if (query.includes('office') || query.includes('location') || query.includes('address') || query.includes('hours')) {
      if (query.includes('near') || query.includes('close')) specifics.push('nearby');
      if (query.includes('hours') || query.includes('time')) specifics.push('hours');
      return { type: 'office_locations', specifics };
    }
    
    // Legal procedures intents
    if (query.includes('dui') || query.includes('admin per se') || query.includes('aps') || 
        query.includes('license suspension') || query.includes('hearing') || 
        query.includes('legal procedure') || query.includes('appeal')) {
      if (query.includes('dui')) specifics.push('dui');
      if (query.includes('suspension')) specifics.push('suspension');
      if (query.includes('hearing')) specifics.push('hearing');
      if (query.includes('appeal')) specifics.push('appeal');
      if (query.includes('rights')) specifics.push('rights');
      return { type: 'legal_procedures', specifics };
    }
    
    // Additional intent types
    if (query.includes('eligib') || query.includes('qualif')) {
      return { type: 'eligibility', specifics };
    }
    
    if (query.includes('document') || query.includes('bring') || query.includes('need')) {
      return { type: 'documents_required', specifics };
    }
    
    if (query.includes('how') || query.includes('step') || query.includes('process')) {
      return { type: 'process_steps', specifics };
    }
    
    return { type: 'general', specifics };
  }

  private static generateLicenseRenewalResponse(docs: DocumentChunk[], query: string, specifics: string[]): GeneratedResponse {
    let response = "California Driver's License Renewal\n\n";
    let confidence = 0.9;
    
    const content = docs.map(doc => doc.content).join(' ');
    
    if (specifics.includes('online') || content.includes('online')) {
      response += "Online Renewal:\n";
      response += "Available if eligible and not expired for more than 12 months\n";
      response += "Need your license number and last 4 digits of SSN\n";
      response += "Available 24/7 with immediate confirmation\n\n";
    }
    
    if (specifics.includes('mail') || content.includes('mail')) {
      response += "Mail Renewal:\n";
      response += "Available for eligible applicants who receive a renewal notice\n";
      response += "Allow 2-3 weeks for processing\n\n";
    }
    
    if (specifics.includes('in_person') || content.includes('office') || content.includes('person')) {
      response += "In-Person Renewal:\n";
      response += "Visit any DMV office with proper identification\n";
      response += "Appointment recommended for faster service\n";
      response += "Required if you need to update photo or information\n\n";
    }
    
    if (specifics.includes('eligibility') || query.includes('eligib')) {
      response += "Eligibility Requirements:\n";
      response += "License must not be expired for more than 12 months for online renewal\n";
      response += "No address changes or other updates needed\n\n";
    }
    
    response += "Fees and Processing:\n";
    response += "Standard license renewal: $39\n";
    response += "Senior/disabled veterans may qualify for reductions\n";
    response += "New license mailed within 2-3 weeks\n\n";
    
    response += "Pro Tip: Check your renewal eligibility online first to save time!";
    
    return { message: response, confidence };
  }

  private static generateRealIdResponse(docs: DocumentChunk[], query: string, specifics: string[]): GeneratedResponse {
    let response = "California REAL ID Information\n\n";
    let confidence = 0.9;
    
    response += "What is REAL ID?\n";
    response += "A federally compliant ID required for domestic flights and federal facilities starting May 7, 2025.\n\n";
    
    if (specifics.includes('documents') || query.includes('document') || query.includes('bring')) {
      response += "Required Documents:\n";
      response += "Identity: Valid passport, certified birth certificate, or permanent resident card\n";
      response += "California Residency: Utility bill, lease agreement, or bank statement (last 90 days)\n";
      response += "Social Security: SSN card or W-2 form\n";
      response += "Important: Must bring ORIGINAL or CERTIFIED documents (no copies)\n\n";
    }
    
    if (specifics.includes('appointment') || query.includes('appointment')) {
      response += "Appointment Requirements:\n";
      response += "REAL ID requires an in-person visit (cannot be done online)\n";
      response += "Appointment strongly recommended\n";
      response += "Walk-ins accepted but expect longer wait times\n\n";
    }
    
    if (specifics.includes('comparison') || query.includes('difference') || query.includes('vs')) {
      response += "REAL ID vs Standard License:\n";
      response += "REAL ID: Has a gold bear and star in upper right corner\n";
      response += "REAL ID: Required for domestic flights after May 2025\n";
      response += "REAL ID: Access to federal facilities\n";
      response += "Standard: Lower compliance, no federal requirements\n\n";
    }
    
    response += "Cost and Processing:\n";
    response += "Fee: $39 (same as standard license)\n";
    response += "Processing: 2-3 weeks (mailed to your address)\n";
    response += "Can upgrade existing license when renewing\n\n";
    
    response += "Remember: The REAL ID has a gold bear and star marking for federal compliance.";
    response += "\n\nVisit the official DMV page: https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/";
    
    return { message: response, confidence };
  }

  private static generateAppointmentResponse(docs: DocumentChunk[], query: string, specifics: string[]): GeneratedResponse {
    let response = "DMV Appointment Information:\n\n";
    let confidence = 0.85;
    
    response += "Scheduling an Appointment:\n";
    response += "Visit the official DMV website's appointment system\n";
    response += "Call DMV customer service: 1-800-777-0133\n";
    response += "Select your preferred office and available time slot\n\n";
    
    if (specifics.includes('cancel') || specifics.includes('reschedule')) {
      response += "Managing Your Appointment:\n";
      response += "Cancel or modify appointments online\n";
      response += "Use your confirmation number for changes\n";
      response += "Cancel at least 24 hours in advance to avoid penalties\n\n";
    }
    
    if (specifics.includes('wait_time')) {
      response += "Wait Times:\n";
      response += "Appointments typically have minimal wait\n";
      response += "Walk-ins may experience 1-3 hour waits\n";
      response += "Check current wait times on DMV website\n\n";
    }
    
    response += "Pro Tip: Many services are available online - check if you can complete your task without visiting!";
    response += "\n\nVisit the official DMV page: https://www.dmv.ca.gov/portal/dmv-online/";
    
    return { message: response, confidence };
  }

  private static generateVehicleRegistrationResponse(docs: DocumentChunk[], query: string, specifics: string[]): GeneratedResponse {
    let response = "Vehicle Registration in California:\n\n";
    let confidence = 0.9;
    
    response += "Registration Options:\n";
    response += "• Online: Fastest option for eligible vehicles\n";
    response += "• Mail: Send renewal notice and payment\n";
    response += "• In-Person: Visit any DMV office\n\n";
    
    if (specifics.includes('smog') || query.includes('smog')) {
      response += "Smog Check Requirements:\n";
      response += "• Required for most vehicles 8+ years old\n";
      response += "• Some vehicles are exempt (electric, hybrid, new cars)\n";
      response += "• Must be completed before registration renewal\n";
      response += "• Choose a certified smog station\n\n";
    }
    
    if (specifics.includes('fees')) {
      response += "Registration Fees:\n";
      response += "• Base fee varies by vehicle type and value\n";
      response += "• Additional local fees may apply\n";
      response += "• Use DMV's fee calculator for exact amount\n\n";
    }
    
    if (specifics.includes('penalties')) {
      response += "Late Penalties:\n";
      response += "• Penalty fees increase the longer you wait\n";
      response += "• Register before expiration to avoid extra costs\n";
      response += "• Driving with expired registration is illegal\n\n";
    }
    
    response += "Remember: Keep your registration current to avoid penalties and legal issues!";
    
    return { message: response, confidence };
  }

  private static generateFeesResponse(docs: DocumentChunk[], query: string, specifics: string[]): GeneratedResponse {
    let response = "DMV Fee Information:\n\n";
    let confidence = 0.8;
    
    response += "Common DMV Fees:\n\n";
    
    if (specifics.includes('license') || query.includes('license')) {
      response += "License/ID Fees:\n";
      response += "Driver's License: $39\n";
      response += "REAL ID: $39\n";
      response += "ID Card: $33\n";
      response += "Senior/Disabled discounts available\n\n";
    }
    
    if (specifics.includes('registration') || query.includes('registration')) {
      response += "Vehicle Registration:\n";
      response += "Base registration fee + vehicle license fee\n";
      response += "Varies by vehicle type, weight, and value\n";
      response += "Additional county/district fees may apply\n\n";
    }
    
    response += "Fee Calculator:\n";
    response += "Use DMV's online fee calculator for exact amounts\n";
    response += "Fees subject to change - verify current rates\n\n";
    
    response += "Payment Methods: Cash, check, money order, or credit/debit card (service fees may apply online)";
    
    return { message: response, confidence };
  }

  private static generateOfficeLocationResponse(docs: DocumentChunk[], query: string, specifics: string[]): GeneratedResponse {
    let response = "Finding DMV Office Locations:\n\n";
    let confidence = 0.85;
    
    response += "Locate DMV Offices:\n";
    response += "Use DMV website's office locator tool\n";
    response += "Search by ZIP code, city, or address\n";
    response += "Filter by services offered at each location\n\n";
    
    if (specifics.includes('hours')) {
      response += "Office Hours:\n";
      response += "Most offices: Monday-Friday, 8 AM - 5 PM\n";
      response += "Some Saturday hours available\n";
      response += "Holiday closures - check calendar\n\n";
    }
    
    response += "Choosing the Right Office:\n";
    response += "Check services available at each location\n";
    response += "Some offices specialize in certain services\n";
    response += "Consider current wait times\n\n";
    
    response += "Time-Saving Tip: Complete services online when possible to avoid office visits entirely!";
    
    return { message: response, confidence };
  }

  private static generateEligibilityResponse(docs: DocumentChunk[], query: string, specifics: string[]): GeneratedResponse {
    const content = docs.map(doc => doc.content).join(' ');
    let response = "Eligibility Information:\n\n";
    
    if (query.includes('license') || query.includes('renew')) {
      response += "License Renewal Eligibility:\n";
      response += "License expired less than 12 months for online renewal\n";
      response += "No address or name changes needed\n";
      response += "Valid Social Security number on file\n\n";
    }
    
    response += "For specific eligibility requirements, please check the official DMV website or contact your local office.";
    
    return { message: response, confidence: 0.75 };
  }

  private static generateDocumentsRequiredResponse(docs: DocumentChunk[], query: string, specifics: string[]): GeneratedResponse {
    let response = "Required Documents:\n\n";
    
    response += "General Document Requirements:\n";
    response += "Bring ORIGINAL or CERTIFIED copies only\n";
    response += "Photocopies are typically not accepted\n";
    response += "All documents must be current and valid\n\n";
    
    response += "Pro Tip: Check the specific document requirements for your service on the DMV website before visiting!";
    
    return { message: response, confidence: 0.7 };
  }

  private static generateProcessStepsResponse(docs: DocumentChunk[], query: string, specifics: string[]): GeneratedResponse {
    const content = docs.map(doc => doc.content).join(' ');
    let response = "Process Steps:\n\n";
    
    response += "General DMV Process:\n";
    response += "1. Determine what service you need\n";
    response += "2. Check if it's available online\n";
    response += "3. Gather required documents\n";
    response += "4. Make an appointment (if visiting in person)\n";
    response += "5. Complete the transaction\n\n";
    
    response += "Visit the DMV website for detailed step-by-step guides for specific services.";
    
    return { message: response, confidence: 0.7 };
  }

  private static generateDMVServicesResponse(docs: DocumentChunk[], query: string, specifics: string[]): GeneratedResponse {
    let response = "California DMV Services:\n\n";
    let confidence = 0.95;
    
    response += "Driver Services:\n";
    response += "• Driver license applications and renewals\n";
    response += "• REAL ID applications and renewals\n";
    response += "• Driving tests and permit applications\n";
    response += "• Address changes and duplicate licenses\n\n";
    
    response += "Vehicle Services:\n";
    response += "• Vehicle registration and renewal\n";
    response += "• Title transfers and duplicates\n";
    response += "• Smog check information\n";
    response += "• Disabled parking placards\n\n";
    
    response += "Online Services:\n";
    response += "• License and vehicle registration renewals\n";
    response += "• Fee calculations and payments\n";
    response += "• Appointment scheduling\n";
    response += "• Address changes\n\n";
    
    response += "Office Services:\n";
    response += "• In-person transactions\n";
    response += "• Documentation verification\n";
    response += "• Testing services\n";
    response += "• Special needs assistance\n\n";
    
    response += "For specific information about any service, visit the official DMV website at dmv.ca.gov";
    
    return { message: response, confidence };
  }

  private static generateLegalProceduresResponse(docs: DocumentChunk[], query: string, specifics: string[]): GeneratedResponse {
    let response = "🏛️ **California DMV Legal Procedures** 🏛️\n\n";
    let confidence = 0.95;
    
    if (specifics.includes('dui') || query.includes('dui')) {
      const duiProcedure = LegalProceduresService.getProcedureById('dui-admin-per-se');
      if (duiProcedure) {
        response += "**DUI Administrative Per Se (APS) Process:**\n\n";
        response += "⚖️ **Critical Legal Facts:**\n";
        response += "• Two separate proceedings: Criminal court AND DMV administrative\n";
        response += "• DMV action is independent of criminal case outcome\n";
        response += "• You have ONLY 10 days from arrest to request DMV hearing\n";
        response += "• Missing this deadline results in automatic suspension\n\n";
        
        response += "**Your Legal Rights:**\n";
        duiProcedure.rights.forEach(right => response += `• ${right}\n`);
        response += "\n";
        
        response += "**Legal Consequences:**\n";
        duiProcedure.consequences.forEach(consequence => response += `• ${consequence}\n`);
        response += "\n";
        
        response += "**Appeal Process:**\n";
        duiProcedure.appeals.forEach(appeal => response += `• ${appeal}\n`);
        response += "\n";
      }
    }
    
    if (specifics.includes('suspension') || query.includes('suspension')) {
      const suspensionProcedure = LegalProceduresService.getProcedureById('license-suspension-appeal');
      if (suspensionProcedure) {
        response += "**License Suspension Appeal Process:**\n\n";
        response += "**Legal Steps:**\n";
        suspensionProcedure.steps.forEach((step, index) => response += `${index + 1}. ${step}\n`);
        response += "\n";
        
        response += "**Critical Timeframes:**\n";
        suspensionProcedure.timeframes.forEach(timeframe => response += `• ${timeframe}\n`);
        response += "\n";
      }
    }
    
    if (specifics.includes('hearing') || query.includes('hearing')) {
      response += "**Administrative Hearing Legal Framework:**\n";
      response += "• Conducted by Driver Safety Hearing Officer (not a judge)\n";
      response += "• Less strict evidence standards than criminal court\n";
      response += "• Preponderance of evidence standard applies\n";
      response += "• You may present witnesses and cross-examine DMV witnesses\n";
      response += "• Decision is binding unless appealed through court system\n\n";
    }
    
    response += "⚠️ **LEGAL DISCLAIMER:** This information is for educational purposes only. For specific legal advice regarding your case, consult with a qualified attorney who specializes in DMV law.\n\n";
    response += "**Official DMV Legal Resources:**\n";
    response += "• DUI Information: https://www.dmv.ca.gov/portal/driver-education-and-safety/dmv-safety-guidelines-actions/driving-under-the-influence/\n";
    response += "• Administrative Hearings: https://www.dmv.ca.gov/portal/driver-education-and-safety/dmv-safety-guidelines-actions/administrative-hearings/";
    
    return { message: response, confidence };
  }

  private static generateIntelligentGenericResponse(docs: DocumentChunk[], query: string): GeneratedResponse {
    const bestDoc = docs[0];
    let response = "Based on California DMV information:\n\n";
    
    // Extract key information intelligently
    const content = bestDoc.content;
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20);
    
    // Find the most relevant sentences
    const queryWords = query.toLowerCase().split(/\s+/);
    const scoredSentences = sentences.map(sentence => {
      const sentenceLower = sentence.toLowerCase();
      const matchCount = queryWords.filter(word => sentenceLower.includes(word)).length;
      return { sentence: sentence.trim(), score: matchCount };
    }).sort((a, b) => b.score - a.score);
    
    // Use top 2-3 most relevant sentences
    const relevantInfo = scoredSentences.slice(0, 3).map(s => s.sentence).join('. ');
    
    response += relevantInfo;
    response += "\n\nFor complete and up-to-date information, please visit the official DMV website.";
    
    return { message: response, confidence: 0.6 };
  }
}