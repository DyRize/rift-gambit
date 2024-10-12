import { NextResponse } from 'next/server';
import { database } from '@/src/database';
import { League } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const { name, tag, region, currentPhase }: Partial<League> =
      (await request.json()) as League;

    if (typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { error: 'Name is required and must be a non-empty string' },
        { status: 400 },
      );
    }

    if (typeof tag !== 'string' || tag.trim() === '') {
      return NextResponse.json(
        { error: 'Tag is required and must be a non-empty string' },
        { status: 400 },
      );
    }

    if (typeof region !== 'string' || region.trim() === '') {
      return NextResponse.json(
        { error: 'Region is required and must be a non-empty string' },
        { status: 400 },
      );
    }

    if (typeof currentPhase !== 'string' || currentPhase.trim() === '') {
      return NextResponse.json(
        { error: 'Current phase is required and must be a non-empty string' },
        { status: 400 },
      );
    }

    const league = await database.league.create({
      data: {
        name: name.trim(),
        tag: tag.trim(),
        region: region,
        currentPhase: currentPhase,
      },
    });

    return NextResponse.json(league, { status: 201 });
  } catch (error) {
    // Todo : Implement logger

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
