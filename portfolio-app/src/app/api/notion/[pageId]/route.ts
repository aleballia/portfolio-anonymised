import { NextRequest, NextResponse } from 'next/server';
import { getNotionPage } from '../../../../lib/notion';

type Params = { pageId: string };

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const resolvedParams = await params;
    const pageId = resolvedParams.pageId;
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