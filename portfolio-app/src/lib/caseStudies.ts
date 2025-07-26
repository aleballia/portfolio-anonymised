export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  notionId: string;
  mainImage: string;
  hoverMessage: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'freedom2hear',
    title: 'Freedom2hear',
    subtitle: 'Product Design, Innovation & Growth for an Emotion AI Startup',
    href: '/work/freedom2hear',
    notionId: '142eac4e7ae980d3b74ef291a22af62d',
    mainImage: '/work/freedom2hear.png',
    hoverMessage: 'AI Product Strategy & Design'
  },
  {
    id: 'tomandco',
    title: 'Tom&Co.',
    subtitle: 'White Label Design System for Award Winning Ecommerce Agency',
    href: '/work/tomandco',
    notionId: '7a52ff3c3e2b464d8e923b7d37ac35fb',
    mainImage: '/work/tomandco.png',
    hoverMessage: 'Design System'
  },
  {
    id: 'myfujifilm',
    title: 'MyFujifilm',
    subtitle: 'Ecommerce Product Design & Development for a Global Brand',
    href: '/work/myfujifilm',
    notionId: '12ceac4e7ae980fd9d45fc49c9a47d19',
    mainImage: '/work/myfujifilm.png',
    hoverMessage: 'Ecommerce'
  },
  {
    id: 'frictionless-futures',
    title: 'Frictionless Futures',
    subtitle: 'Strategic design for future-focused innovation',
    href: '/work/frictionless-futures',
    notionId: '23ceac4e7ae980d5be60c55fff75a92e',
    mainImage: '/work/frictionless-futures.png',
    hoverMessage: 'Design for Innovation'
  },
  {
    id: 'oliverbonas',
    title: 'Oliver Bonas',
    subtitle: 'Ecommerce design for an independent British brand',
    href: '/work/oliverbonas',
    notionId: '12ceac4e7ae9801b9cc0f59f4c03386e',
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