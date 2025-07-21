import { NextRequest, NextResponse } from 'next/server';
import { getNotionPage } from '../../../../lib/notion';

export async function GET(
  request: NextRequest,
  { params }: { params: { pageId: string } }
) {
  try {
    const pageId = params.pageId;
    const notionData = await getNotionPage(pageId);
    
    return NextResponse.json(notionData);
  } catch (error) {
    console.error('Error fetching Notion data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Notion data' },
      { status: 500 }
    );
  }
} 