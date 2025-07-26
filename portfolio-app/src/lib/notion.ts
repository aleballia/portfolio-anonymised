import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export interface NotionBlock {
  type: string;
  paragraph?: {
    rich_text: Array<{
      plain_text: string;
      annotations?: {
        bold?: boolean;
        italic?: boolean;
        code?: boolean;
      };
    }>;
  };
  heading_1?: {
    rich_text: Array<{
      plain_text: string;
      annotations?: {
        bold?: boolean;
        italic?: boolean;
        code?: boolean;
      };
    }>;
  };
  heading_2?: {
    rich_text: Array<{
      plain_text: string;
      annotations?: {
        bold?: boolean;
        italic?: boolean;
        code?: boolean;
      };
    }>;
  };
  heading_3?: {
    rich_text: Array<{
      plain_text: string;
      annotations?: {
        bold?: boolean;
        italic?: boolean;
        code?: boolean;
      };
    }>;
  };
  bulleted_list_item?: {
    rich_text: Array<{
      plain_text: string;
      annotations?: {
        bold?: boolean;
        italic?: boolean;
        code?: boolean;
      };
    }>;
  };
  numbered_list_item?: {
    rich_text: Array<{
      plain_text: string;
      annotations?: {
        bold?: boolean;
        italic?: boolean;
        code?: boolean;
      };
    }>;
  };
  divider?: {
    type: string;
  };
  image?: {
    type: string;
    file?: {
      url: string;
    };
    external?: {
      url: string;
    };
    caption?: Array<{
      plain_text: string;
    }>;
  };
}

export interface NotionPageData {
  page: unknown;
  blocks: NotionBlock[];
  properties?: {
    role?: string;
    company?: string;
    tools?: string[];
    tags?: string[];
    date?: string;
    summary?: string;
  };
  coverImage?: string | null;
}

export async function getNotionPage(pageId: string): Promise<NotionPageData | null> {
  try {
    const response = await notion.pages.retrieve({ page_id: pageId });
    const blocks = await notion.blocks.children.list({ block_id: pageId });
    
    // Extract properties from the page
    const properties: {
      role?: string;
      company?: string;
      tools?: string[];
      tags?: string[];
      date?: string;
      summary?: string;
    } = {};
    
    // Extract cover image
    let coverImage: string | null = null;
    const responseWithCover = response as { cover?: { type: string; external?: { url: string }; file?: { url: string } } };
    if (responseWithCover.cover) {
      const cover = responseWithCover.cover;
      if (cover.type === 'external') {
        coverImage = cover.external?.url || null;
      } else if (cover.type === 'file') {
        coverImage = cover.file?.url || null;
      }
    }
    
    // Type assertion to access properties
    const pageWithProperties = response as Record<string, unknown>;
    
    if (pageWithProperties.properties) {
      const props = pageWithProperties.properties as Record<string, unknown>;
      
      // Extract role (as text field)
      if (props.Role && typeof props.Role === 'object' && props.Role !== null) {
        const roleProp = props.Role as { rich_text?: Array<{ plain_text?: string }> };
        if (roleProp.rich_text && roleProp.rich_text[0]?.plain_text) {
          properties.role = roleProp.rich_text[0].plain_text;
        }
      }
      
      // Extract company (as text field)
      if (props.Company && typeof props.Company === 'object' && props.Company !== null) {
        const companyProp = props.Company as { rich_text?: Array<{ plain_text?: string }> };
        if (companyProp.rich_text && companyProp.rich_text[0]?.plain_text) {
          properties.company = companyProp.rich_text[0].plain_text;
        }
      }
      
      // Extract tools (assuming it's a multi-select or tags field)
      if (props.Tools && typeof props.Tools === 'object' && props.Tools !== null) {
        const toolsProp = props.Tools as { multi_select?: Array<{ name?: string }>; rich_text?: Array<{ plain_text?: string }> };
        if (toolsProp.multi_select) {
          properties.tools = toolsProp.multi_select.map((item) => item.name || '').filter(Boolean);
        } else if (toolsProp.rich_text && toolsProp.rich_text[0]?.plain_text) {
          // If tools is stored as comma-separated text
          const toolsText = toolsProp.rich_text[0].plain_text;
          properties.tools = toolsText.split(',').map((tool: string) => tool.trim()).filter(Boolean);
        }
      }
      
      // Extract tags (assuming it's a multi-select field)
      if (props.Tags && typeof props.Tags === 'object' && props.Tags !== null) {
        const tagsProp = props.Tags as { multi_select?: Array<{ name?: string }> };
        if (tagsProp.multi_select) {
          properties.tags = tagsProp.multi_select.map((item) => item.name || '').filter(Boolean);
        }
      }

      // Extract date (as text field)
      if (props.Date && typeof props.Date === 'object' && props.Date !== null) {
        const dateProp = props.Date as { rich_text?: Array<{ plain_text?: string }>, title?: Array<{ plain_text?: string }> };
        if (dateProp.rich_text && dateProp.rich_text[0]?.plain_text) {
          properties.date = dateProp.rich_text[0].plain_text;
        } else if (dateProp.title && dateProp.title[0]?.plain_text) {
          properties.date = dateProp.title[0].plain_text;
        }
      }

      // Extract summary (as text field)
      if (props.Summary && typeof props.Summary === 'object' && props.Summary !== null) {
        const summaryProp = props.Summary as { rich_text?: Array<{ plain_text?: string }> };
        if (summaryProp.rich_text && summaryProp.rich_text.length > 0) {
          properties.summary = summaryProp.rich_text.map(rt => rt.plain_text).join('');
        }
      }
    }
    
    return {
      page: response,
      blocks: blocks.results as NotionBlock[],
      properties,
      coverImage,
    };
  } catch (error) {
    console.error('Error fetching Notion page:', error);
    return null;
  }
}