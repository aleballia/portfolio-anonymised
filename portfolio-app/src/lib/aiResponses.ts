export interface AIResponse {
    keywords: string[];
    responses: string[];
  }
  
  export const aiResponses: AIResponse[] = [
    {
      keywords: ['experience', 'work', 'background', 'career'],
      responses: [
        "I have 8+ years of experience in product design, starting as a Junior Designer at Sofa.com and working my way up to Head of Product Design at Freedom2hear. I've worked across B2B, B2C, SaaS, and e-commerce in both agency and in-house environments.",
        "My career spans from early-stage startups to global brands. I started in 2017 at Sofa.com, then moved through Jack Wills, Tom&Co (where I led design systems), PwC, Resi, and now Freedom2hear where I'm Head of Product Design.",
        "I've been in product design for 8+ years, with experience leading teams at companies like Freedom2hear, PwC, and Tom&Co. I specialize in design systems, AI products, and strategic design leadership."
      ]
    },
    {
      keywords: ['current', 'now', 'present', 'freedom2hear'],
      responses: [
        "I'm currently Head of Product Design at Freedom2hear, a startup developing emotion-based, context-aware AI. I lead product strategy, design teams, and innovation initiatives, helping position the company for growth and securing funding rounds."
      ]
    },
    {
      keywords: ['skills', 'expertise', 'specialize', 'focus'],
      responses: [
        "My core skills are Product Design, Innovation, Leadership, and Design Systems. I combine strategic thinking with technical fluency to design user-centered solutions that drive business impact.",
        "I specialize in design systems (since 2019), AI product design, strategic leadership, and innovation. I'm comfortable with Figma, user research, prototyping, and leading cross-functional teams.",
        "My expertise spans product design, design systems, AI innovation, and team leadership. I thrive in fast-paced environments, turning ambiguity into clarity with a focus on AI products and emerging technologies."
      ]
    },
    {
      keywords: ['tools', 'technologies', 'software', 'figma'],
      responses: [
        "I work with Figma, Sketch, Adobe Creative Suite, and various prototyping tools. I'm also experienced with design systems, user research methodologies, and collaborating with development teams using tools like Confluence and Loom."
      ]
    },
    {
      keywords: ['lead', 'manage', 'team', 'leadership'],
      responses: [
        "I lead with clarity, empathy, and purpose. I've managed design teams at Freedom2hear and PwC, mentored designers, and facilitated cross-functional workshops. I focus on aligning vision with execution and creating space for others to grow."
      ]
    },
    {
      keywords: ['design system', 'dragonfly', 'systems'],
      responses: [
        "I've led design systems since 2019, including Dragonfly at Tom&Co. I create scalable, modular systems that support product growth, accessibility, and team alignment. My systems have been used across multiple brands and platforms."
      ]
    },
    {
      keywords: ['ai', 'innovation', 'emerging', 'technology'],
      responses: [
        "I'm passionate about AI products and innovation. At Freedom2hear, I work with emotion-based AI for content moderation. I bring structure to ambiguity, using strategic thinking and experimentation to explore bold ideas and turn them into focused product direction."
      ]
    },
    {
      keywords: ['education', 'degree', 'university', 'study'],
      responses: [
        "I have a design degree and have built my expertise through 8+ years of hands-on experience in product design, design systems, and strategic leadership. I'm constantly learning and adapting to new technologies and methodologies."
      ]
    },
    {
      keywords: ['resume', 'cv', 'download', 'portfolio'],
      responses: [
        "You can download my full resume from the link in my portfolio. It contains detailed information about my experience, projects, and achievements. I'm also happy to discuss specific aspects of my background!"
      ]
    },
    {
      keywords: ['contact', 'email', 'reach', 'connect'],
      responses: [
        "Feel free to reach out via email or LinkedIn! I'm always open to discussing new opportunities, collaborations, or just connecting with fellow designers and product people."
      ]
    }
  ];
  
  export const defaultResponses = [
    "Hi! I'm Alessandra, a Product Design Leader with 8+ years of experience. I specialize in design systems, AI products, and strategic leadership. Ask me about my experience, current role at Freedom2hear, or my expertise in design systems!",
    "Hello! I'm a Head of Product Design at Freedom2hear, with experience leading teams and building AI products. I'm passionate about innovation, design systems, and strategic design. What would you like to know about my background?",
    "Hi there! I'm a Product Design Leader with expertise in design systems, AI innovation, and team leadership. I've worked at companies like Freedom2hear, PwC, and Tom&Co. Ask me about my experience or current projects!"
  ];
  
  export const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Find matching response category
    for (const category of aiResponses) {
      const hasKeyword = category.keywords.some(keyword => 
        message.includes(keyword.toLowerCase())
      );
      
      if (hasKeyword) {
        // Return a random response from the matching category
        return category.responses[Math.floor(Math.random() * category.responses.length)];
      }
    }
    
    // Return a random default response if no keywords match
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };