import { NextResponse } from 'next/server';
import { database } from '@/src/database';

export async function GET() {
  try {
    const leagues = await database.league.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    if (leagues.length > 0) {
      return NextResponse.json(leagues, { status: 200 });
    } else {
      return new NextResponse('No Leagues Found', { status: 404 });
    }
  } catch (error) {
    // Todo : Implement logger

    return new NextResponse('Internal Server Error: Unable to fetch leagues', {
      status: 500,
    });
  }
}
