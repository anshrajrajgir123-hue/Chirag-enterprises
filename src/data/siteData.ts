export interface ProductItem {
  id: string;
  name: string;
  code: string;
  category: 'Parallel Thread' | 'Taper Thread' | 'Special Application' | 'Anchorage Systems';
  oneLineDescription: string;
  detailedDescription: string;
  barDiameterRange: string;
  threadType: string;
  installationMethod: string;
  keyApplications: string[];
  technicalSpecs: {
    parameter: string;
    value: string;
  }[];
  visualType:
    | 'p-bar'
    | 't-bar'
    | 'r-b'
    | 'position'
    | 'weld'
    | 'hd-anchor'
    | 'snapfit';
}

export interface TrustStat {
  id: string;
  metricPlaceholder: string;
  title: string;
  description: string;
}

export interface FeatureBenefit {
  id: string;
  index: string;
  title: string;
  description: string;
  engineeringNote: string;
}

export interface IndustryApplication {
  id: string;
  title: string;
  category: string;
  summary: string;
  typicalComponents: string;
  visualType: 'high-rise' | 'bridges' | 'metro' | 'tunnels' | 'industrial' | 'infrastructure';
}

export interface ProjectPlaceholder {
  id: string;
  projectName: string;
  applicationType: string;
  location: string;
  description: string;
  couplerSystemUsed: string;
  statusNote: string;
}

export interface ResourceDocument {
  id: string;
  title: string;
  category: string;
  documentCode: string;
  status: string;
  summary: string;
  contents: string[];
}

export const COMPANY_CONTACT = {
  companyName: 'Chirag Enterprises',
  phoneDisplay: '+91 99718 88588',
  phoneClean: '+919971888588',
  email: 'chiragentfbd@gmail.com',
  salesEmail: 'chiragentfbd@gmail.com',
  locationShort: 'Sanjay Colony, Sector 23, Faridabad, Haryana 121005',
  fullAddress:
    'Gali No. 46, Chirag Enterprises, 33 Feet Rd, Block D, Sanjay Colony, Sector 23, Faridabad, Haryana 121005',
  mapUrl: 'https://maps.app.goo.gl/V5cP8bP9kY1dswK59?g_st=ac',
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Gali%20no.%2046%2C%20Chirag%20Enterprises%2C%2033%20Feet%20Rd%2C%20Block%20D%2C%20Sanjay%20Colony%2C%20Sector%2023%2C%20Faridabad%2C%20Haryana%20121005&t=&z=16&ie=UTF8&iwloc=&output=embed',
  workingHours: 'Monday – Saturday: 08:30 AM – 06:30 PM',
};

export const TRUST_HIGHLIGHTS: TrustStat[] = [
  {
    id: 'experience',
    metricPlaceholder: '[XX]+ Yrs',
    title: 'Years of Industry Experience',
    description:
      'Dedicated engineering expertise in mechanical rebar splicing, reinforcement continuity, and structural anchorage systems.',
  },
  {
    id: 'manufacturing',
    metricPlaceholder: '[XX,000] Sq.Ft.',
    title: 'Manufacturing Capabilities',
    description:
      'Equipped with multi-spindle CNC threading lines, cold-forging upsetting stations, and automated batch traceability.',
  },
  {
    id: 'quality',
    metricPlaceholder: '100% Batch',
    title: 'Quality Assurance',
    description:
      'Comprehensive thread-gauge calibration, axial tensile verification, and raw material metallurgical inspection on every lot.',
  },
  {
    id: 'applications',
    metricPlaceholder: '12mm – 40mm',
    title: 'Infrastructure Applications',
    description:
      'Engineered for heavy civil works, high-rise cores, segmental bridges, metro viaducts, and underground containment structures.',
  },
];

export const WHY_CHOOSE_FEATURES: FeatureBenefit[] = [
  {
    id: 'strength-reliability',
    index: '01',
    title: 'Strength & Reliability',
    description:
      'Mechanical rebar couplers create a direct load-transfer path across reinforcement bars without relying on surrounding concrete bond stress, maintaining structural continuity across critical tension and compression zones.',
    engineeringNote: 'Direct axial load transfer across bar-to-bar mechanical splices',
  },
  {
    id: 'efficient-installation',
    index: '02',
    title: 'Efficient Installation',
    description:
      'Pre-threaded couplers and standardized torque wrenches streamline on-site assembly, helping site crews shorten cage fabrication cycles and reduce crane hook time on congested pours.',
    engineeringNote: 'Rapid assembly using standard pipe or torque wrenches',
  },
  {
    id: 'material-optimization',
    index: '03',
    title: 'Material Optimization',
    description:
      'Replacing long traditional lap splices with compact mechanical couplers reduces reinforcement congestion, improves concrete aggregate flow around cages, and eliminates lap-zone steel waste.',
    engineeringNote: 'Eliminates long lap lengths in high-density reinforcement columns',
  },
  {
    id: 'quality-precision',
    index: '04',
    title: 'Quality & Precision',
    description:
      'Each coupler is CNC-machined from tested carbon steel bar stock with controlled thread pitch, root radius, and concentricity, verified by Go/No-Go thread ring and plug gauges prior to dispatch.',
    engineeringNote: 'CNC pitch accuracy with documented heat-number traceability',
  },
];

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'p-bar-coupler',
    name: 'P-Bar Coupler',
    code: 'VSS-PBC-100',
    category: 'Parallel Thread',
    oneLineDescription:
      'Cold-forged parallel thread mechanical splicing system engineered for full-strength continuity in primary structural bars.',
    detailedDescription:
      'The P-Bar Coupler utilizes a three-step cold-forging (upsetting) and parallel thread-cutting process. Upsetting increases the bar end core diameter prior to threading so that the net root area of the thread remains greater than or equal to the nominal cross-sectional area of the parent reinforcing bar.',
    barDiameterRange: '12 mm to 40 mm (Custom 50 mm on request)',
    threadType: 'Metric Parallel Thread (60° thread profile)',
    installationMethod: 'Standard rotation of bar into coupler until full thread engagement',
    keyApplications: [
      'High-rise core shear walls and perimeter mega-columns',
      'Deep foundation pile cages and diaphragm walls',
      'Heavy transfer girders and mat foundations',
    ],
    technicalSpecs: [
      { parameter: 'Bar Size Range', value: '12, 16, 20, 25, 28, 32, 36, 40 mm' },
      { parameter: 'Coupler Material', value: 'Medium Carbon / Alloy Structural Steel (Verified Mill Certs)' },
      { parameter: 'Thread Pitch', value: '1.75 mm to 3.0 mm (Size Dependent)' },
      { parameter: 'Bar Preparation', value: 'Hydraulic Cold Upsetting + Parallel Chaser Threading' },
    ],
    visualType: 'p-bar',
  },
  {
    id: 't-bar-coupler',
    name: 'T-Bar Coupler',
    code: 'VSS-TBC-200',
    category: 'Taper Thread',
    oneLineDescription:
      'Self-aligning taper-threaded coupler designed for fast rotational lock-up with minimal turns on active construction sites.',
    detailedDescription:
      'The T-Bar Coupler features a precision-machined internal taper thread profile that mates with taper-threaded reinforcing bars. The tapered geometry guides the bar into rapid alignment and achieves full mechanical seating within 4 to 5 rotations using a calibrated torque wrench.',
    barDiameterRange: '12 mm to 40 mm',
    threadType: 'Tapered Mechanical Thread (6° – 8° taper angle)',
    installationMethod: 'Self-centering insertion followed by calibrated torque tightening',
    keyApplications: [
      'Precast column-to-column connections and bridge piers',
      'General commercial and residential tower columns',
      'Fast-track infrastructure pours requiring rapid cycle times',
    ],
    technicalSpecs: [
      { parameter: 'Bar Size Range', value: '12, 16, 20, 25, 28, 32, 36, 40 mm' },
      { parameter: 'Rotations to Lock', value: 'Approx. 4.0 – 4.5 turns after hand-tight seating' },
      { parameter: 'Inspection Method', value: 'Calibrated Torque Wrench Verification' },
      { parameter: 'Protection', value: 'Color-coded internal polymer thread protection caps' },
    ],
    visualType: 't-bar',
  },
  {
    id: 'r-b-coupler',
    name: 'R-B Coupler',
    code: 'VSS-RBC-300',
    category: 'Parallel Thread',
    oneLineDescription:
      'Roll-threaded parallel coupler featuring cold-rolled rib-peeling and work-hardened thread roots for fatigue resilience.',
    detailedDescription:
      'The R-B (Rib-Peel & Roll-Thread) Coupler system removes the transverse and longitudinal ribs at the bar end before cold-rolling parallel threads directly onto the bar surface. Cold-rolling compresses the steel grain flow along the thread contour, creating smooth, work-hardened thread roots without cutting across metal fibers.',
    barDiameterRange: '16 mm to 40 mm',
    threadType: 'Cold-Rolled Parallel Thread (60° or 75° profile)',
    installationMethod: 'Full thread engagement verified by zero-exposed-thread visual check',
    keyApplications: [
      'Railway and metro viaduct piers subject to cyclic loading',
      'Long-spanhighway flyovers and box-girder decks',
      'High-production centralized rebar yard prefabrication',
    ],
    technicalSpecs: [
      { parameter: 'Bar Size Range', value: '16, 20, 25, 28, 32, 36, 40 mm' },
      { parameter: 'Thread Forming', value: 'Rib Peeling + 3-Roller Cold Thread Rolling Head' },
      { parameter: 'Surface Finish', value: 'Smooth work-hardened root contour' },
      { parameter: 'Reducer Options', value: 'Transition couplers available (e.g., 32mm to 25mm)' },
    ],
    visualType: 'r-b',
  },
];

export const INDUSTRIES_DATA: IndustryApplication[] = [
  {
    id: 'high-rise',
    title: 'High-Rise Buildings',
    category: 'Commercial & Residential Towers',
    summary:
      'Eliminates vertical lap congestion in heavily loaded mega-columns, core shear walls, and outrigger transfer floors.',
    typicalComponents: 'P-Bar Coupler · T-Bar Coupler',
    visualType: 'high-rise',
  },
  {
    id: 'bridges',
    title: 'Bridges & Flyovers',
    category: 'Highway & River Crossings',
    summary:
      'Provides dependable reinforcement continuity across deep bored piles, pier caps, and segmental cantilever box girders.',
    typicalComponents: 'R-B Coupler · P-Bar Coupler',
    visualType: 'bridges',
  },
  {
    id: 'metro',
    title: 'Metro & Railway Infrastructure',
    category: 'Mass Rapid Transit Corridors',
    summary:
      'Supports rapid precast pier erection, elevated station concourses, and underground cut-and-cover diaphragm walls.',
    typicalComponents: 'R-B Coupler · P-Bar Coupler · T-Bar Coupler',
    visualType: 'metro',
  },
  {
    id: 'tunnels',
    title: 'Tunnels & Underground Works',
    category: 'Hydroelectric & Transit Tunnels',
    summary:
      'Facilitates reinforcement cage splicing, cross-passage breakouts, and deep shaft linings with reliable axial load transfer.',
    typicalComponents: 'P-Bar Coupler · T-Bar Coupler',
    visualType: 'tunnels',
  },
  {
    id: 'industrial',
    title: 'Industrial Structures',
    category: 'Power, Petrochemical & Manufacturing Plants',
    summary:
      'Engineered for heavy turbine foundations, silos, cooling towers, and high-capacity industrial framing nodes.',
    typicalComponents: 'P-Bar Coupler · R-B Coupler',
    visualType: 'industrial',
  },
  {
    id: 'infrastructure',
    title: 'Large-Scale Infrastructure Projects',
    category: 'Ports, Dams & Airport Terminals',
    summary:
      'Delivers batch-traceable mechanical splicing across high-volume foundations, marine jetties, and containment slabs.',
    typicalComponents: 'P-Bar · T-Bar · R-B Couplers (12mm – 40mm)',
    visualType: 'infrastructure',
  },
];

export const PROJECTS_PLACEHOLDERS: ProjectPlaceholder[] = [
  {
    id: 'proj-01',
    projectName: '[Project Reference Placeholder — Elevated Metro Corridor Phase II]',
    applicationType: 'Metro & Viaduct Pier Foundations',
    location: '[City / Region Placeholder]',
    description:
      'Supply of parallel-thread mechanical couplers and on-site bar threading machines for deep pile cages and precast pier caps. Replace this placeholder with verified project data once client release is finalized.',
    couplerSystemUsed: 'P-Bar & R-B Couplers (25mm – 40mm)',
    statusNote: 'Template Slot — Ready for Verified Project Entry',
  },
  {
    id: 'proj-02',
    projectName: '[Project Reference Placeholder — Commercial High-Rise Core & Podium]',
    applicationType: 'High-Rise Structural Core & Transfer Girder',
    location: '[City / Region Placeholder]',
    description:
      'Application of cold-forged and taper-threaded couplers to relieve reinforcement congestion in perimeter columns and beam-column joints. Editable template awaiting customer photography permission.',
    couplerSystemUsed: 'P-Bar & T-Bar Couplers (20mm – 36mm)',
    statusNote: 'Template Slot — Ready for Verified Project Entry',
  },
  {
    id: 'proj-03',
    projectName: '[Project Reference Placeholder — Six-Lane Cable-Stayed River Bridge]',
    applicationType: 'Bridges & Heavy Civil Pylons',
    location: '[City / Region Placeholder]',
    description:
      'High-volume mechanical splicing across main pylon shafts, well foundations, and approach viaduct girders. Populate with actual contract reference number and tonnage upon approval.',
    couplerSystemUsed: 'R-B Roll-Thread Couplers (28mm – 40mm)',
    statusNote: 'Template Slot — Ready for Verified Project Entry',
  },
];

export const QUALITY_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Raw Material Mill Verification & Chemical Analysis',
    description:
      'Every incoming batch of carbon and alloy steel bar stock is inspected against mill test certificates (MTC) for carbon equivalent, yield strength, and ultrasonic soundness before release to saw-cutting.',
  },
  {
    step: '02',
    title: 'Precision CNC Machining & Thread Forming',
    description:
      'Automated CNC lathes and multi-spindle tapping centers machine internal threads to strict pitch, flank angle, and minor diameter tolerances using flood coolant and automated tool-wear compensation.',
  },
  {
    step: '03',
    title: '100% Go / No-Go Thread Gauge Calibration',
    description:
      'Operators verify thread accuracy at the machine using calibrated Go/No-Go thread plug and ring gauges, followed by batch sampling for optical profile projection and surface finish inspection.',
  },
  {
    step: '04',
    title: 'Destructive Axial Tensile & Slip Testing',
    description:
      'Representative bar-and-coupler assemblies from production lots undergo static axial tensile testing and residual slip measurement on calibrated Universal Testing Machines (UTM) prior to lot release.',
  },
];

export const RESOURCE_DOCUMENTS: ResourceDocument[] = [
  {
    id: 'doc-catalogue',
    title: 'Master Rebar Coupler Product Catalogue',
    category: 'Product Catalogue',
    documentCode: 'DOC-CAT-01 (Placeholder)',
    status: 'Awaiting Verified PDF Upload',
    summary:
      'Complete dimensional tables, bar diameter compatibility charts (12mm–40mm), thread pitch specifications, and coupler selection guidelines.',
    contents: [
      'P-Bar, T-Bar, and R-B Coupler dimensional tables (Outer Diameter, Length, Weight)',
      'Parallel and taper thread profile specifications and bar sizing charts',
      'Bar preparation equipment overview (Cold Upsetting Press & Threading Machines)',
    ],
  },
  {
    id: 'doc-installation',
    title: 'Site Installation & Torque Wrench Field Manual',
    category: 'Site Engineering Manual',
    documentCode: 'DOC-MAN-02 (Placeholder)',
    status: 'Awaiting Verified PDF Upload',
    summary:
      'Step-by-step site crew procedures for bar end cutting, cold upsetting, thread rolling, protective cap handling, and wrench torque inspection.',
    contents: [
      'Recommended installation torque values by bar diameter (12mm to 40mm)',
      'Visual and Go/No-Go gauge inspection checklist for site QA/QC engineers',
      'Standard site assembly and thread engagement verification procedures',
    ],
  },
  {
    id: 'doc-qms',
    title: 'BIS IS 16172 : 2023 & ISO 9001:2015 Quality Compliance Dossier',
    category: 'Quality & Compliance',
    documentCode: 'IS 16172:2023 · ISO 9001:2015',
    status: 'Available on Request',
    summary:
      'Quality Management System (ISO 9001:2015) and Bureau of Indian Standards (BIS IS 16172 : 2023) reinforcement coupler compliance documentation and test reports.',
    contents: [
      'ISO 9001:2015 Quality Management System certification details',
      'BIS IS 16172 : 2023 (Reinforcement Couplers for Mechanical Splices of Bars in Concrete) test parameters',
      'Batch Traceability, Mill Test Certificate (MTC), and Universal Testing Machine (UTM) static tensile test reports',
    ],
  },
];
