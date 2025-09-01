export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  contentFile?: string; // Optional - for Markdown-based case studies
  mainImage: string;
  hoverMessage: string;
  liveLink?: string; // Optional - live project URL
  hidden?: boolean; // Add this property
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'freedom2hear-platform',
    title: 'Freedom2hear Platform',
    subtitle: '0–1 Product Design for an AI Content Moderation Platform',
    href: '/work/freedom2hear-platform',
    contentFile: 'freedom2hear-platform.md',
    mainImage: '/work/freedom2hear-1.png',
    liveLink: 'https://freedom2hear.com',
    hoverMessage: '0-1 Product Design'
  },
  {
    id: 'freedom2hear-strategy',
    title: 'Freedom2hear Strategy',
    subtitle: 'Innovation and Growth Strategy for an Emotion AI Startup',
    href: '/work/freedom2hear-strategy',
    contentFile: 'freedom2hear-strategy.md',
    mainImage: '/work/freedom2hear-2.png',
    liveLink: 'https://freedom2hear.com',
    hoverMessage: 'Innovation & Growth'
  },
  {
    id: 'frictionless-futures',
    title: 'Frictionless Futures',
    subtitle: 'Design for the Future of Retail & Hospitality at PwC',
    href: '/work/frictionless-futures',
    contentFile: 'frictionless-futures.md',
    mainImage: '/work/frictionless-futures.png',
    liveLink: 'https://www.pwc.co.uk/services/frictionless-futures.html',
    hoverMessage: 'Design for Innovation'
  },
    {
    id: 'tomandco',
    title: 'Dragonfly DS',
    subtitle: 'White Label Design System for Award Winning Ecommerce Agency Tom&Co',
    href: '/work/tomandco',
    contentFile: 'tomandco.md',
    mainImage: '/work/tomandco.png',
    liveLink: '',
    hoverMessage: 'Design System & DesignOps'
  },
  {
    id: 'oliverbonas',
    title: 'Oliver Bonas',
    subtitle: 'Ecommerce Design for an Independent British Brand with Tom&Co',
    href: '/work/oliverbonas',
    contentFile: 'oliverbonas.md',
    mainImage: '/work/oliver-bonas.png',
    liveLink: 'https://oliverbonas.com',
    hoverMessage: 'Ecommerce',
  },
  {
    id: 'myfujifilm',
    title: 'MyFujifilm',
    subtitle: 'Ecommerce Product Design & Development for a Global Brand – Tom&Co',
    href: '/work/myfujifilm',
    contentFile: 'myfujifilm.md',
    mainImage: '/work/myfujifilm.png',
    liveLink: 'https://my.fujifilm.com',
    hoverMessage: 'Ecommerce',
    hidden: true // This will hide it from the selected work list
  },
];

export const getCaseStudyById = (id: string): CaseStudy | undefined => {
  return caseStudies.find(study => study.id === id);
};

export const getCaseStudyByHref = (href: string): CaseStudy | undefined => {
  return caseStudies.find(study => study.href === href);
};

// Update the getAllCaseStudies function to filter out hidden ones
export const getAllCaseStudies = (): CaseStudy[] => {
  return caseStudies.filter(study => !study.hidden);
}; 