export interface LegalProcedure {
  id: string;
  title: string;
  description: string;
  steps: string[];
  timeframes: string[];
  consequences: string[];
  rights: string[];
  appeals: string[];
  documentation: string[];
  fees: string[];
  url: string;
}

export class LegalProceduresService {
  private static procedures: LegalProcedure[] = [
    {
      id: 'dui-admin-per-se',
      title: 'DUI Administrative Per Se (APS) Process',
      description: 'The administrative license suspension program for DUI arrests, separate from criminal court proceedings.',
      steps: [
        'Arrest for DUI triggers immediate license suspension notice',
        'You have 10 days from arrest to request administrative hearing',
        'If no hearing requested, suspension begins on 30th day after arrest',
        'Hearing conducted by Driver Safety Hearing Officer',
        'Decision rendered based on preponderance of evidence',
        'If suspension upheld, reinstatement requirements must be met'
      ],
      timeframes: [
        '10 days to request hearing after arrest',
        '30 days from arrest until suspension begins (if no hearing)',
        'Hearing typically held within 45 days of request',
        'Suspension periods: 4 months (first offense), 1 year (subsequent)'
      ],
      consequences: [
        'Immediate license suspension regardless of criminal case outcome',
        'Required completion of DUI education program',
        'Installation of ignition interlock device (if required)',
        'SR-22 insurance filing requirement',
        'Reinstatement fees and penalties'
      ],
      rights: [
        'Right to administrative hearing within 10 days',
        'Right to attorney representation (at your expense)',
        'Right to review evidence against you',
        'Right to present evidence and testimony',
        'Right to cross-examine witnesses',
        'Right to interpreter if needed'
      ],
      appeals: [
        'File writ of mandate in superior court within 94 days',
        'Must exhaust administrative remedies first',
        'Court reviews for legal errors, not factual disputes',
        'Stay of suspension may be available pending appeal'
      ],
      documentation: [
        'Notice of suspension from arresting officer',
        'Copy of arrest report and chemical test results',
        'DMV hearing request form (DS-367)',
        'Evidence of completion of DUI program',
        'SR-22 insurance certificate',
        'Proof of ignition interlock installation (if required)'
      ],
      fees: [
        'Administrative hearing fee: $125',
        'Reissue fee: $125',
        'DUI program costs: $500-$1,800',
        'Ignition interlock device: $2.50-$3.50 per day',
        'SR-22 filing fee: varies by insurance company'
      ],
      url: 'https://www.dmv.ca.gov/portal/driver-education-and-safety/dmv-safety-guidelines-actions/driving-under-the-influence/'
    },
    {
      id: 'license-suspension-appeal',
      title: 'Driver License Suspension Appeal Process',
      description: 'Legal procedures for challenging DMV actions against your driving privileges.',
      steps: [
        'Receive notice of DMV action against license',
        'Request administrative hearing within specified timeframe',
        'Prepare evidence and witnesses for hearing',
        'Attend hearing before Driver Safety Officer',
        'Receive written decision from hearing officer',
        'If unsuccessful, may file writ of mandate in court'
      ],
      timeframes: [
        '10 days to request hearing for most actions',
        '15 days for some commercial license actions',
        'Hearings typically scheduled within 45 days',
        '94 days to file court appeal after final DMV decision'
      ],
      consequences: [
        'Automatic suspension if no hearing requested',
        'Continued suspension if hearing unsuccessful',
        'Points may remain on driving record',
        'Increased insurance premiums',
        'Potential impact on employment'
      ],
      rights: [
        'Right to administrative hearing',
        'Right to legal representation',
        'Right to review DMV evidence',
        'Right to present defense evidence',
        'Right to cross-examine DMV witnesses',
        'Right to court appeal of final decision'
      ],
      appeals: [
        'File writ of mandate in superior court',
        'Must be filed within 94 days of final DMV decision',
        'Court reviews for procedural errors and legal issues',
        'May request stay of suspension pending appeal'
      ],
      documentation: [
        'Original notice of DMV action',
        'Request for hearing form',
        'Evidence supporting your case',
        'Witness statements or testimony',
        'Driving record and history',
        'Court filing documents for appeals'
      ],
      fees: [
        'Hearing request fee: varies by action type',
        'Attorney fees (if represented)',
        'Court filing fees for appeals: $435-$450',
        'Reinstatement fees if suspension upheld'
      ],
      url: 'https://www.dmv.ca.gov/portal/driver-education-and-safety/dmv-safety-guidelines-actions/administrative-hearings/'
    },
    {
      id: 'negligent-operator-procedure',
      title: 'Negligent Operator Treatment System (NOTS)',
      description: 'Legal procedures for drivers who accumulate excessive violation points.',
      steps: [
        'DMV monitors point accumulation on driving record',
        'Warning letter sent when approaching point threshold',
        'Order of probation issued if threshold exceeded',
        'Hearing may be required for license suspension',
        'Probationary period with restrictions imposed',
        'License suspension if violations continue'
      ],
      timeframes: [
        'Point thresholds: 4 points in 12 months, 6 in 24 months, 8 in 36 months',
        'Probation typically lasts 12 months',
        'Hearing scheduled within 45 days of request'
      ],
      consequences: [
        'License suspension (30 days to 6 months)',
        'Probationary restrictions on driving',
        'Required traffic violator school attendance',
        'Increased insurance premiums',
        'Impact on commercial driving privileges'
      ],
      rights: [
        'Right to administrative hearing',
        'Right to challenge point assessments',
        'Right to present mitigating evidence',
        'Right to legal representation',
        'Right to review driving record for accuracy'
      ],
      appeals: [
        'Request hearing to challenge NOTS action',
        'Present evidence of safe driving efforts',
        'Show completion of traffic school or defensive driving',
        'Appeal final decision through writ of mandate'
      ],
      documentation: [
        'Complete driving record printout',
        'Traffic violation citations and court records',
        'Proof of traffic school completion',
        'Evidence of financial responsibility',
        'Medical reports if applicable'
      ],
      fees: [
        'Hearing fee: $125',
        'Reissue fee after suspension: $125',
        'Traffic violator school: $50-$100',
        'Court costs for violations'
      ],
      url: 'https://www.dmv.ca.gov/portal/driver-education-and-safety/dmv-safety-guidelines-actions/'
    }
  ];

  static getAllProcedures(): LegalProcedure[] {
    return this.procedures;
  }

  static getProcedureById(id: string): LegalProcedure | undefined {
    return this.procedures.find(procedure => procedure.id === id);
  }

  static getProceduresByType(type: string): LegalProcedure[] {
    return this.procedures.filter(procedure => 
      procedure.title.toLowerCase().includes(type.toLowerCase()) ||
      procedure.description.toLowerCase().includes(type.toLowerCase())
    );
  }

  static searchProcedures(query: string): LegalProcedure[] {
    const searchTerm = query.toLowerCase();
    return this.procedures.filter(procedure =>
      procedure.title.toLowerCase().includes(searchTerm) ||
      procedure.description.toLowerCase().includes(searchTerm) ||
      procedure.steps.some(step => step.toLowerCase().includes(searchTerm)) ||
      procedure.rights.some(right => right.toLowerCase().includes(searchTerm))
    );
  }
}