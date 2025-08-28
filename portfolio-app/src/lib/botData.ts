// ================================
// botData.ts — portable dataset & rules
// ================================

export type BotResponse = string | { text: string; suggestions?: string[] };

export type Intent = {
  id: string;
  description: string;
  // Keywords are stemmed-ish lowercase terms you expect to match
  keywords?: string[];
  // Optional regexes for precise catches
  patterns?: RegExp[];
  // Example user utterances for future ML fine-tuning
  examples?: string[];
  // Named entities the intent may need; if a slot is required and missing, the NLU should ask a targeted follow up
  slots?: { name: string; required?: boolean; prompt?: string }[];
  // Response variants; simple templating with {{slot}}
  responses: { text: string; weight?: number; suggestions?: string[] }[];
};

// Helper: tiny weighted picker
export const pickWeighted = <T extends { weight?: number }>(items: T[]): T => {
  const total = items.reduce((s, i) => s + (i.weight ?? 1), 0);
  let r = Math.random() * total;
  for (const i of items) {
    r -= i.weight ?? 1;
    if (r <= 0) return i;
  }
  return items[items.length - 1];
};

// Knowledge base for templating and richer copy. Keep it tight, UK English, no en dashes.
export const kb = {
  yearsExperience: 8,
  name: "Alessandra",
  currentTitle: "Head of Strategy & Design",
  currentCompany: "Freedom2hear",
  elevator: "Product design and strategy lead with a track record of shipping AI products, running design systems, and aligning teams on clear product bets.",
  sectors: ["B2B", "B2C", "SaaS", "e‑commerce"],
  // Timeline is compact for quick fact lookups
  timeline: [
    { org: "Sofa.com", role: "Junior Designer", start: "2017" },
    { org: "Jack Wills", role: "Designer", start: "2018" },
    { org: "Tom&Co", role: "Senior Product Designer", start: "2019", note: "Led Dragonfly design system" },
    { org: "PwC", role: "Product Designer", start: "2020" },
    { org: "Resi", role: "Product Designer", start: "2021" },
    { org: "Freedom2hear", role: "Head of Strategy & Design", start: "2023" }
  ],
  strengths: [
    "Design systems leadership since 2019",
    "AI product strategy and execution",
    "Turning ambiguity into clear product direction",
    "Facilitating cross‑functional decision making"
  ],
  tools: ["Figma", "Adobe CC", "Sketch", "Loom", "Confluence", "FigJam"],
  caseStudies: {
    dragonfly: {
      name: "Dragonfly design system",
      org: "Tom&Co",
      impact: [
        "Cut design debt and shipped multi‑brand components",
        "Improved accessibility coverage and velocity"
      ]
    },
    goBubbleToF2H: {
      name: "GoBubble to Freedom2hear migration",
      org: "Freedom2hear",
      impact: [
        "Repositioned product to emotion‑aware moderation",
        "Clarified ICP and roadmap, supporting fundraising"
      ]
    }
  },
  links: {
    cv: "/ab-resume.pdf",
    email: "mailto:hello@alessandra.design",
    linkedin: "https://www.linkedin.com/in/alessandraballiana/"
  }
};

export const intents: Intent[] = [
  {
    id: "greeting",
    description: "General greeting and elevator pitch",
    keywords: ["hi", "hello", "hey", "yo", "start", "who are you"],
    responses: [
      {
        text: `Hi, I'm ${kb.name}. ${kb.elevator}`,
        weight: 2,
        suggestions: ["Show experience", "What are you working on?", "Open CV"]
      },
      {
        text: `Hello! I lead product strategy and design at ${kb.currentCompany}. Ask about my experience, design systems, or AI work.`,
        suggestions: ["Tell me about Dragonfly", "Your skills", "Contact"]
      }
    ]
  },
  {
    id: "experience",
    description: "Career overview",
    keywords: ["experience", "background", "career", "work history", "timeline"],
    responses: [
      {
        text: `I've got ~${kb.yearsExperience}+ years across ${kb.sectors.join(", ")}. Highlights include Dragonfly at Tom&Co and leading strategy and design at ${kb.currentCompany}.`,
        weight: 2,
        suggestions: ["Show timeline", "Design systems", "Current role"]
      },
      {
        text: `From startups to global brands. Started at Sofa.com in 2017, then Jack Wills, Tom&Co, PwC, Resi, and now ${kb.currentCompany}.`,
        suggestions: ["What did you do at Tom&Co?", "Team leadership", "AI work"]
      }
    ]
  },
  {
    id: "current_role",
    description: "What I do now",
    keywords: ["current", "now", "present", "freedom2hear", "today", "working on"],
    responses: [
      {
        text: `I'm ${kb.currentTitle} at ${kb.currentCompany}. I set product bets, run discovery with customers, and lead design delivery for emotion‑aware AI moderation tools.`,
        suggestions: ["What's emotion‑aware moderation?", "Show a case study", "Team leadership"]
      }
    ]
  },
  {
    id: "skills",
    description: "Skills and strengths",
    keywords: ["skills", "expertise", "specialise", "strengths", "focus"],
    responses: [
      {
        text: `Core strengths: ${kb.strengths.join(", ")}. Tooling includes ${kb.tools.join(", ")}.`,
        suggestions: ["Design systems", "AI product work", "Leadership approach"]
      }
    ]
  },
  {
    id: "tools",
    description: "Tools and technologies",
    keywords: ["tools", "tech", "technology", "software", "figma", "stack"],
    responses: [
      {
        text: `Day to day: ${kb.tools.join(", ")}. I pair closely with engineering for pragmatic handover and design QA.`,
        suggestions: ["Process", "Prototyping", "Research methods"]
      }
    ]
  },
  {
    id: "leadership",
    description: "Leadership style and team management",
    keywords: ["lead", "manage", "team", "leadership", "mentor"],
    responses: [
      {
        text: `Clear goals, kind candour, and momentum. I mentor designers, facilitate cross‑functional decisions, and create space for others to grow.`,
        suggestions: ["Workshop examples", "Org design", "Hiring philosophy"]
      }
    ]
  },
  {
    id: "design_systems",
    description: "Design systems speciality",
    keywords: ["design system", "dragonfly", "system", "components", "tokens"],
    responses: [
      {
        text: `I've led design systems since 2019. At Tom&Co I built Dragonfly, a modular, accessible system used across multiple brands.`,
        suggestions: ["What improved?", "Accessibility", "Governance"]
      }
    ]
  },
  {
    id: "ai_innovation",
    description: "AI and innovation",
    keywords: ["ai", "innovation", "emerging", "llm", "model", "moderation"],
    responses: [
      {
        text: `I work on emotion‑aware, context‑sensitive moderation tools. My role is to turn vague ideas into testable product bets, then ship.`,
        suggestions: ["How do you validate bets?", "Risks and mitigations", "Ethics"]
      }
    ]
  },
  {
    id: "education",
    description: "Education",
    keywords: ["education", "degree", "university", "study"],
    responses: [
      { text: "Design degree plus eight years of hands‑on product work. I invest in continuous learning through practice, reading, and testing ideas in the wild." }
    ]
  },
  {
    id: "cv",
    description: "CV and portfolio links",
    keywords: ["resume", "cv", "download", "portfolio", "pdf"],
    responses: [
      {
        text: `Here's my CV: ${kb.links.cv}. Portfolio explores case studies like Dragonfly and the GoBubble to Freedom2hear transition.`,
        suggestions: ["Open LinkedIn", "Email me", "Show experience"]
      }
    ]
  },
  {
    id: "tomandco",
    description: "What did you do at Tom&Co?",
    keywords: ["tom&co", "agency", "e-commerce"],
    responses: [
      { text: `Answers about tom&co work` }
    ]
  },
  {
    id: "contact",
    description: "How to get in touch",
    keywords: ["contact", "email", "reach", "connect", "linkedin"],
    responses: [
      { text: `Best ways to reach me: email ${kb.links.email} or LinkedIn ${kb.links.linkedin}. Happy to chat about roles, collaborations, or mentoring.` }
    ]
  },
  {
    id: "timeline",
    description: "Explicit timeline request",
    keywords: ["timeline", "history", "chronology", "path"],
    responses: [
      { text: kb.timeline.map(t => `${t.start}: ${t.role} at ${t.org}${t.note ? ` — ${t.note}` : ""}`).join(" | ") }
    ]
  },
  {
    id: "projects",
    description: "Case studies",
    keywords: ["project", "case study", "dragonfly", "gobubble", "freedom2hear"],
    responses: [
      { text: `${kb.caseStudies.dragonfly.name} at ${kb.caseStudies.dragonfly.org}: ${kb.caseStudies.dragonfly.impact.join(". ")}.`, suggestions: ["Show metrics", "Governance", "Accessibility"] },
      { text: `${kb.caseStudies.goBubbleToF2H.name}: ${kb.caseStudies.goBubbleToF2H.impact.join(". ")}.`, suggestions: ["What changed for users?", "ICP", "Roadmap"] }
    ]
  }
];

// ================================
// nlu.ts — tiny matcher
// ================================

export const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

export const matchIntent = (text: string): Intent | null => {
  const n = normalise(text);
  let best: { intent: Intent; score: number } | null = null;

  for (const intent of intents) {
    let score = 0;
    if (intent.keywords) {
      for (const kw of intent.keywords) if (n.includes(kw)) score += 1;
    }
    if (intent.patterns) {
      for (const rx of intent.patterns) if (rx.test(text)) score += 2;
    }
    if (!best || score > best.score) best = { intent, score };
  }

  if (best && best.score > 0) return best.intent;
  return null;
};

export const respond = (user: string): BotResponse => {
  const intent = matchIntent(user);
  if (!intent) {
    // Fallback keeps tone and points users to useful queries
    return {
      text: `I didn't quite catch that. Ask me about experience, current role, design systems, AI work, or open my CV.`,
      suggestions: ["Experience", "Current role", "Design systems", "Open CV"]
    };
  }
  const variant = pickWeighted(intent.responses);
  return { text: variant.text, suggestions: variant.suggestions };
};
