export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  notionId?: string; // Optional - for Notion-based case studies
  contentFile?: string; // Optional - for Markdown-based case studies
  mainImage: string;
  hoverMessage: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'freedom2hear',
    title: 'Freedom2hear',
    subtitle: 'Product Design, Innovation & Growth for an Emotion AI Startup',
    href: '/work/freedom2hear',
    contentFile: 'freedom2hear.md',
    mainImage: '/work/freedom2hear.png',
    hoverMessage: 'AI Product Strategy & Design'
  },
  {
    id: 'tomandco',
    title: 'Tom&Co.',
    subtitle: 'White Label Design System for Award Winning Ecommerce Agency',
    href: '/work/tomandco',
    contentFile: 'tomandco.md',
    mainImage: '/work/tomandco.png',
    hoverMessage: 'Design System'
  },
  {
    id: 'myfujifilm',
    title: 'MyFujifilm',
    subtitle: 'Ecommerce Product Design & Development for a Global Brand',
    href: '/work/myfujifilm',
    contentFile: 'myfujifilm.md',
    mainImage: '/work/myfujifilm.png',
    hoverMessage: 'Ecommerce'
  },
  {
    id: 'frictionless-futures',
    title: 'Frictionless Futures',
    subtitle: 'Design for the future of retail & hospitality',
    href: '/work/frictionless-futures',
    contentFile: 'frictionless-futures.md',
    mainImage: '/work/frictionless-futures.png',
    hoverMessage: 'Design for Innovation'
  },
  {
    id: 'oliverbonas',
    title: 'Oliver Bonas',
    subtitle: 'Ecommerce design for an independent British brand',
    href: '/work/oliverbonas',
    contentFile: 'oliverbonas.md',
    mainImage: '/work/oliver-bonas.png',
    hoverMessage: 'Ecommerce'
  }
];

export const getCaseStudyById = (id: string): CaseStudy | undefined => {
  return caseStudies.find(study => study.id === id);
};

export const getCaseStudyByHref = (href: string): CaseStudy | undefined => {
  return caseStudies.find(study => study.href === href);
}; 