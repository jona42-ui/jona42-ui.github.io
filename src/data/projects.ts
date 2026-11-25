// Single source of truth for the portfolio. Add a project by adding an object here.
// Images live in src/assets/ and are imported so Astro can compress and resize them at build time.
import type { ImageMetadata } from 'astro';
import googleReserve from '../assets/projects/google_reserve.webp';
import sapMiddleware from '../assets/projects/sap_middleware.webp';
import geospatial from '../assets/projects/geospatial.webp';
import nlpNetwork from '../assets/projects/nlp_network.webp';

export type Category = 'enterprise' | 'ai' | 'oss' | 'iot';

export const categories: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'enterprise', label: 'Enterprise' },
  { id: 'ai', label: 'AI / ML' },
  { id: 'oss', label: 'Open Source' },
  { id: 'iot', label: 'IoT' },
];

export const stats = [
  { value: '60%', label: 'faster geospatial queries' },
  { value: '99.9%', label: 'platform uptime' },
  { value: '3', label: 'Google surfaces taking bookings' },
  { value: '4+', label: 'open-source orgs contributed to' },
];

/** Inner SVG markup (24×24 viewBox, stroke icons) used when a project has no image. */
export const icons = {
  contract: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/><path d="M15.5 16.5l1.5 1.5 3-3"/>',
  agents: '<rect x="9" y="9" width="6" height="6" rx="1"/><circle cx="4" cy="4" r="2"/><circle cx="20" cy="4" r="2"/><circle cx="4" cy="20" r="2"/><circle cx="20" cy="20" r="2"/><path d="M5.5 5.5 9 9M18.5 5.5 15 9M5.5 18.5 9 15M18.5 18.5 15 15"/>',
  water: '<path d="M12 2.7S6 9.3 6 13.5a6 6 0 0 0 12 0C18 9.3 12 2.7 12 2.7z"/><path d="M9 14a3 3 0 0 0 3 3"/>',
  iot: '<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>',
  pill: '<path d="M10.5 20.5 3.5 13.5a4.95 4.95 0 0 1 7-7l7 7a4.95 4.95 0 0 1-7 7z"/><path d="m7 10 7 7"/>',
  body: '<circle cx="12" cy="5" r="2.5"/><path d="M12 7.5v7M8 10h8M12 14.5 9 21M12 14.5l3 6.5"/><path d="M17 3.5l3 2-3 2"/>',
} as const;

export interface Project {
  title: string;
  role: string;
  description: string;
  highlights?: string[];
  tags: string[];
  categories: Category[];
  badge: string;
  metric: string;
  accent: string;
  accentSoft: string;
  image?: ImageMetadata;
  icon?: keyof typeof icons;
  link?: { href: string; label: string };
  /** Shown in the footer when there is no public link. */
  note?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    featured: true,
    title: 'Reserve with Google Integration',
    role: 'Lead engineer · Bitebooker',
    description:
      'Led the end-to-end integration of Reserve with Google into the Bitebooker restaurant-reservation platform, letting diners book a table directly from Google Search, Maps and Assistant.',
    highlights: [
      'Built merchant, service and availability feeds',
      'Implemented the booking server — `BatchAvailabilityLookup`, `CreateBooking`, `UpdateBooking` — plus real-time updates',
      'Designed a multi-step booking wizard with step-level validation, keeping reservation data consistent across every channel',
    ],
    tags: ['TypeScript', 'NestJS', 'Maps Booking API', 'Real-time updates'],
    categories: ['enterprise'],
    badge: 'Featured · Enterprise',
    metric: 'Live on Search · Maps · Assistant',
    accent: '#2563eb',
    accentSoft: '#dbeafe',
    image: googleReserve,
    note: 'Enterprise · private codebase',
  },
  {
    title: 'SAP S/4HANA Integration Middleware',
    role: 'Architect',
    description:
      'Architected NestJS/TypeScript middleware between web applications and SAP S/4HANA, enabling reliable synchronization of large enterprise datasets.',
    highlights: ['Business-partner management APIs', 'Optimized batch processing and data models for SAP business objects'],
    tags: ['NestJS', 'TypeScript', 'SAP S/4HANA'],
    categories: ['enterprise'],
    badge: 'Enterprise',
    metric: 'Large-dataset sync',
    accent: '#7c3aed',
    accentSoft: '#ede9fe',
    image: sapMiddleware,
    note: 'Enterprise · private codebase',
  },
  {
    title: 'Enterprise Contract Management',
    role: 'Co-developer',
    description:
      'Co-developed a contract-management system integrated with SAP S/4HANA, reducing contract processing time and automating previously manual business workflows.',
    tags: ['SAP S/4HANA', 'NestJS', 'Workflow automation'],
    categories: ['enterprise'],
    badge: 'Enterprise',
    metric: 'Manual workflows automated',
    accent: '#db2777',
    accentSoft: '#fce7f3',
    icon: 'contract',
    note: 'Enterprise · private codebase',
  },
  {
    title: 'High-Performance Geospatial Platform',
    role: 'Backend engineer',
    description:
      'Cut response time for complex geospatial queries by 60% with custom spatial indexing, and kept the platform at 99.9% uptime through containerized deployments.',
    highlights: ['REST APIs designed on SOLID principles and clean architecture'],
    tags: ['PostgreSQL', 'Spatial indexing', 'Docker', 'REST'],
    categories: ['enterprise'],
    badge: 'Enterprise',
    metric: '−60% query time · 99.9% uptime',
    accent: '#059669',
    accentSoft: '#d1fae5',
    image: geospatial,
    note: 'Enterprise · private codebase',
  },
  {
    title: 'AI Automation Platform',
    role: 'Co-builder',
    description:
      'Co-built a platform that orchestrates specialist LLM agents, backed by a retrieval and long-term memory pipeline on PostgreSQL and pgvector.',
    tags: ['LLM agents', 'RAG', 'pgvector', 'PostgreSQL'],
    categories: ['ai'],
    badge: 'AI / ML',
    metric: 'Multi-agent LLM orchestration',
    accent: '#ea580c',
    accentSoft: '#ffedd5',
    icon: 'agents',
    note: 'Private codebase',
  },
  {
    title: 'Industry 4.0 Process Management',
    role: 'Backend engineer',
    description:
      'Built PostgreSQL-backed REST APIs for a business-process-management platform serving non-invasive remediation and maintenance of water and sewerage networks.',
    tags: ['PostgreSQL', 'REST APIs', 'BPM'],
    categories: ['enterprise'],
    badge: 'Industry 4.0',
    metric: 'Water & sewerage networks',
    accent: '#0891b2',
    accentSoft: '#cffafe',
    icon: 'water',
    note: 'Enterprise · private codebase',
  },
  {
    title: 'Natural-Language Network Configuration',
    role: 'AI/ML engineer (volunteer)',
    description:
      'Helped build a next-generation network configuration tool at Red Hat that turns natural language into declarative nmstate YAML, and designed the test UI.',
    tags: ['Python', 'Transformers', 'LLMs', 'Networking'],
    categories: ['ai', 'oss'],
    badge: 'AI / ML · Open Source',
    metric: 'Red Hat · nmstate',
    accent: '#dc2626',
    accentSoft: '#fee2e2',
    image: nlpNetwork,
    link: { href: 'https://github.com/nmstate/nmstate', label: 'View upstream' },
  },
  {
    title: 'Eclipse Thingweb node-wot',
    role: 'Contributor · Eclipse Foundation',
    description:
      'Implemented and optimized communication bindings for industrial IoT protocols in the Eclipse Web of Things runtime.',
    tags: ['Node.js', 'MQTT', 'OPC-UA', 'CoAP', 'Modbus'],
    categories: ['iot', 'oss'],
    badge: 'IoT · Open Source',
    metric: '5 industrial protocols',
    accent: '#d97706',
    accentSoft: '#fef3c7',
    icon: 'iot',
    link: { href: 'https://github.com/eclipse-thingweb/node-wot', label: 'View project' },
  },
  {
    title: 'Drug Absorption Prediction',
    role: 'Ersilia · AI for drug discovery',
    description:
      'Machine-learning pipeline predicting drug permeability through human intestinal cells (Caco-2), trained on TDC Caco2_Wang and validated externally on ChEMBL data.',
    tags: ['Python', 'scikit-learn', 'Cheminformatics'],
    categories: ['ai'],
    badge: 'AI / ML · Health',
    metric: 'Validated on ChEMBL',
    accent: '#4f46e5',
    accentSoft: '#e0e7ff',
    icon: 'pill',
    link: { href: 'https://github.com/jona42-ui/Drug-Absorption-Model', label: 'View project' },
  },
  {
    title: 'OpenMRS Draw-on-Body Diagram',
    role: 'GSoC intern · OpenMRS',
    description:
      'Micro-frontend module that lets clinicians document findings by annotating body diagrams and clinical images; scoped with implementers such as ICRC and MSF.',
    tags: ['React', 'JavaScript', 'Micro-frontends'],
    categories: ['oss'],
    badge: 'Open Source · GSoC',
    metric: 'Google Summer of Code',
    accent: '#0369a1',
    accentSoft: '#e0f2fe',
    icon: 'body',
    link: { href: 'https://github.com/jona42-ui/openmrs-frontend', label: 'View project' },
  },
];
