export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  notionId?: string; // Optional - for Notion-based case studies
  contentFile?: string; // Optional - for Markdown-based case studies
  mainImage: string;
  hoverMessage: string;
  liveLink?: string; // Optional - live project URL
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'freedom2hear',
    title: 'Freedom2hear',
    subtitle: 'Product Design & Strategy for an Emotion AI Startup',
    href: '/work/freedom2hear',
    contentFile: 'freedom2hear.md',
    mainImage: '/work/freedom2hear.png',
    liveLink: 'https://freedom2hear.com',
    hoverMessage: 'Product Design & Strategy for AI'
  },
  {
    id: 'frictionless-futures',
    title: 'Frictionless Futures',
    subtitle: 'Design for the Future of Retail & Hospitality',
    href: '/work/frictionless-futures',
    contentFile: 'frictionless-futures.md',
    mainImage: '/work/frictionless-futures.png',
    liveLink: 'https://www.pwc.co.uk/services/frictionless-futures.html',
    hoverMessage: 'Design for Innovation'
  },
  {
    id: 'myfujifilm',
    title: 'MyFujifilm',
    subtitle: 'Ecommerce Product Design & Development for a Global Brand',
    href: '/work/myfujifilm',
    contentFile: 'myfujifilm.md',
    mainImage: '/work/myfujifilm.png',
    liveLink: 'https://my.fujifilm.com',
    hoverMessage: 'Ecommerce'
  },
  {
    id: 'oliverbonas',
    title: 'Oliver Bonas',
    subtitle: 'Ecommerce Design for an Independent British Brand',
    href: '/work/oliverbonas',
    contentFile: 'oliverbonas.md',
    mainImage: '/work/oliver-bonas.png',
    liveLink: 'https://oliverbonas.com',
    hoverMessage: 'Ecommerce'
  },
  {
    id: 'tomandco',
    title: 'Dragonfly DS',
    subtitle: 'White Label Design System for Award Winning Ecommerce Agency',
    href: '/work/tomandco',
    contentFile: 'tomandco.md',
    mainImage: '/work/tomandco.png',
    liveLink: '',
    hoverMessage: 'Design System'
  },
];

export const getCaseStudyById = (id: string): CaseStudy | undefined => {
  return caseStudies.find(study => study.id === id);
};

export const getCaseStudyByHref = (href: string): CaseStudy | undefined => {
  return caseStudies.find(study => study.href === href);
};

export const getAllCaseStudies = (): CaseStudy[] => {
  return caseStudies;
}; 