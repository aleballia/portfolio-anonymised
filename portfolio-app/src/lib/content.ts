import fs from 'fs';
import path from 'path';

export interface CaseStudyContent {
  title: string;
  subtitle: string;
  role: string;
  company: string;
  date: string;
  tools: string[];
  summary: string;
  content: string;
  tags: string[];
  liveLink: string;
}

export function getCaseStudyContent(id: string): CaseStudyContent | null {
  try {
    const filePath = path.join(process.cwd(), 'src', 'content', 'case-studies', `${id}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.split('\n');
    
    // Parse metadata from the first few lines
    const metadata: Record<string, string> = {};
    let contentStartIndex = 0;
    let title = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip empty lines
      if (line === '') {
        continue;
      }
      
      // Extract title from the first heading
      if (line.startsWith('# ') && !title) {
        title = line.replace('# ', '');
        continue;
      }
      
      // Check if this is a metadata line (key: value format)
      if (line.includes(': ')) {
        const [key, value] = line.split(': ', 2);
        metadata[key.toLowerCase()] = value;
      } else {
        // We've reached the content section
        contentStartIndex = i;
        break;
      }
    }
    
    // Extract the content (everything after metadata)
    const content = lines.slice(contentStartIndex).join('\n').trim();
    
    // Parse tools array
    const tools = metadata.tools ? metadata.tools.split(', ').map(tool => tool.trim()) : [];
    
    // Parse tags array
    const tags = metadata.tags ? metadata.tags.split(', ').map(tag => tag.trim()) : [];
    
    return {
      title: title || metadata.title || id,
      subtitle: metadata.subtitle || '',
      role: metadata.role || '',
      company: metadata.company || '',
      date: metadata.date || '',
      tools: tools,
      summary: metadata.summary || '',
      content: content,
      tags: tags,
      liveLink: metadata.liveLink || '',
    };
  } catch (error) {
    console.error(`Error loading case study content for ${id}:`, error);
    return null;
  }
}
