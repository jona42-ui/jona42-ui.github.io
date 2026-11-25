// Single source of truth for the CV. Edit here; resume.html and the PDF are generated from it.
// Bullet text supports a bold lead-in written as "**Lead:** rest of the sentence".

export const profile = {
  name: 'Thembo Jonathan',
  title: 'Software Engineer',
  phone: '(256) 770688802',
  location: 'Kampala, Uganda',
  email: 'jonathanthembo123@gmail.com',
  photo: '/assets/images/profile/jonaprof-sm.jpg',
  website: 'https://jona42-ui.github.io',
  github: 'https://github.com/jona42-ui',
  linkedin: 'https://www.linkedin.com/in/thembo-jonathan/',
  tagline: 'I am Thembo Jonathan, a Software Engineer in AI/ML, Data, IoT/WoT and Web domains.',
};

export const summary =
  "Software engineer building production integrations, data platforms and AI systems. I led the Reserve with Google integration for a restaurant-reservation platform, architected SAP S/4HANA integration middleware, and cut geospatial query times by 60%. More recently I have been building multi-agent LLM systems with retrieval and long-term memory. I have open-source roots in OpenMRS (Google Summer of Code), Eclipse Thingweb and Red Hat's nmstate, and I care about software that improves people's lives.";

export const skills: { label: string; items: string }[] = [
  { label: 'Programming Languages', items: 'JavaScript (React, Angular, Node.js, Express, NestJS), TypeScript, Python (Django, Flask, FastAPI), Java SE, Java EE' },
  { label: 'Cloud & DevOps', items: 'AWS, GCP, Docker, CI/CD' },
  { label: 'AI/ML', items: 'LLM agents & orchestration, RAG, pgvector, TensorFlow, Gen AI, Stable Diffusion' },
  { label: 'IoT Protocols', items: 'MQTT, OPC-UA, CoAP, MBUS, MODBUS' },
  { label: 'Integrations', items: 'Reserve with Google (Maps Booking API), SAP S/4HANA, REST API design' },
  { label: 'Databases', items: 'PostgreSQL (pgvector, spatial indexing), MongoDB, MySQL' },
];

export interface Job {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export const experience: Job[] = [
  {
    title: 'Software Developer (Full Time)',
    company: 'MyVirtualab',
    location: 'Pistoia, Tuscany, Italy',
    period: '2024 — Present',
    bullets: [
      '**Google Reserve integration:** Led the end-to-end integration of Reserve with Google into the Bitebooker restaurant-reservation platform — built merchant, service and availability feeds, implemented the booking server (BatchAvailabilityLookup, CreateBooking, UpdateBooking) and real-time updates, letting diners book directly from Google Search, Maps and Assistant.',
      'Designed and built a multi-step booking wizard with step-level validation, giving customers a smoother booking flow and keeping reservation data consistent across every channel.',
      '**SAP S/4HANA middleware:** Architected integration middleware in NestJS/TypeScript — business-partner management APIs, optimized batch processing and data models for SAP business objects — enabling reliable synchronization of large enterprise datasets.',
      'Co-developed an enterprise contract-management system integrated with SAP S/4HANA, reducing contract processing time and automating previously manual business workflows.',
      '**Geospatial platform:** Cut response time for complex geospatial queries by 60% with custom spatial indexing; achieved 99.9% uptime through containerized deployments; designed REST APIs following SOLID principles and clean architecture.',
      'Built PostgreSQL-backed REST APIs for an Industry 4.0 business-process-management platform serving non-invasive remediation and maintenance of water and sewerage networks.',
      '**AI automation:** Co-built a platform that orchestrates specialist LLM agents with a retrieval and long-term memory pipeline on PostgreSQL and pgvector.',
    ],
  },
  {
    title: 'AI/ML Engineer',
    company: '株式会社AIBOS',
    location: 'Kampala, Uganda',
    period: '2024',
    bullets: [
      'At AIBOS, as an AI-focused company, I mainly focused on AI research through reproducing experiments from research papers and also working on custom internal AI tools for the productivity of the employees using Gen AI, Stable Diffusion and AI Agents.',
      "Since it was a startup company, I was also involved in developing the AI strategy and adoption process for the whole company through documenting the standards to follow in the adoption of AI development and use that brought clarity to management and the development team of the best practices and low risk adoption strategy for the company's success.",
    ],
  },
  {
    title: 'AI/ML Engineer (Volunteer)',
    company: 'Red Hat (IBM), Networking Team',
    location: 'Preble Ave, Pittsburgh',
    period: '2024 — March',
    bullets: [
      'Participated in developing the next generation network configuration tool that uses Natural Language. First made contributions upstream to the nmstate project (Declarative network API) to get up to speed with the RHEL System Network Role, NetworkManager, iproute etc.',
      'Designed the test UTI interface to demonstrate the interaction of the user natural language and the model. Participated in conceptualization and training the LLM which leverages transformer library to train a model for generating YAML states.',
    ],
  },
  {
    title: 'Model Validation, Reproducibility and Testing',
    company: 'Ersilia, Artificial Intelligence for Health (Drug Discovery)',
    location: 'Barcelona, ES',
    period: '2024 — April',
    bullets: [
      'I did model Validation and Evaluation for hERG Channel Blockade Prediction.',
      'I cleaned, organised, validated, and evaluated models and datasets aimed to assess the performance and reliability of predictive models in identifying small molecule-induced blockade of the hERG ion channel.',
      'I made literature review of the different models and identify the gap and provided insights into the performance of the model on unseen data (Testing the model in the wild).',
      'Developed a robust machine learning pipeline to predict drug permeability through human intestinal cells (Caco2 model), leveraging the Caco2_Wang dataset from Therapeutics Data Commons and validating externally using ChEMBL data.',
    ],
  },
  {
    title: 'Software Engineer (Volunteer)',
    company: 'OpenELIS-Global',
    location: 'USA (Remote)',
    period: '2023 — 2024',
    bullets: ['At OpenELIS, I worked on translation work, Front-end and REST API as a contributor.'],
  },
  {
    title: 'Cloud Consultant (AWS - Contract)',
    company: 'OpenMRS Inc.',
    location: 'USA (Remote)',
    period: '2023',
    bullets: [
      'Remotely collaborate with contributors worldwide to get them started with OpenMRS.',
      'Worked on OpenMRS backend drawing module.',
    ],
  },
  {
    title: 'Software Engineer Intern (Google Summer of Code)',
    company: 'OpenMRS Inc.',
    location: 'USA (Remote)',
    period: '2022',
    bullets: [
      'Conceptualized and developed an OpenMRS frontend module for annotating clinical images. I used the Micro-frontend architecture.',
      'I also did Business analysis from OpenMRS implementing partners like ICRC, MSF Medicines, that found this project useful for their implementations.',
    ],
  },
];

export const education = [
  { degree: 'Innovation Leadership', institution: 'Aspire Institute', location: 'USA, remote', period: '2023' },
  { degree: 'B.S. in Software Engineering', institution: 'Makerere University', location: 'Kampala, Uganda', period: '2020' },
  { degree: 'Advanced Education Certification', institution: 'Merryland High School', location: 'Entebbe, Uganda', period: '2017' },
  { degree: 'Certificate of Education', institution: 'Merryland High School', location: 'Entebbe, Uganda', period: '2014' },
];

export const talks = ['Lightning Talk - OpenMRS (2023)', 'Google Summer of Code Conference (2023)'];

export const certifications = [
  'OpenMRS Fundamentals Academy',
  'Google Summer of Code',
  'Google Certification - System Administration',
  "CS50X - Harvard's Introduction to Computer Science",
  'JavaScript Algorithms and Data Structures - freeCodeCamp',
  'Responsive Web Design - freeCodeCamp',
  'Problem Solving and Computational Thinking - Michigan University',
];

export const extracurricular = ['Reading literature', 'Jogging', 'Q&A', 'Football playing'];

export const openSource = [
  'Eclipse Foundation - Thingweb Project (node-wot) - Contributed to IoT protocols including MQTT, OPC-UA, CoAP, MBUS, MODBUS',
  'OpenMRS Inc. - Building the future of medical software, Backend drawing module',
  'OpenELIS - Translation work, Front-end and REST API contributions',
  'Fedora (Nmstate Team) - Natural language network configuration tool',
];
