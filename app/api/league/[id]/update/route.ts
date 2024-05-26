import { NextResponse } from 'next/server';
import { database } from '@/src/database';
import { League } from '@prisma/client';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    if (!params.id) {
      return new NextResponse('League ID is required', { status: 400 });
    }

    const idRegex = /^[0-9a-fA-F]{24}$/;
    if (!idRegex.test(params.id)) {
      return new NextResponse('Invalid League ID format', { status: 400 });
    }

    const body = (await request.json()) as Partial<League>;
    if (!body || typeof body !== 'object') {
      return new NextResponse('Invalid request body', { status: 400 });
    }

    const { id, ...data } = body;

    if (Object.keys(data).length === 0) {
      return new NextResponse('No fields to update', { status: 400 });
    }

    const updatedLeague = await database.league.update({
      where: {
        id: params.id,
      },
      data: {
        ...data,
      },
    });

    if (!updatedLeague) {
      return new NextResponse('League not found', { status: 404 });
    }

    return NextResponse.json(updatedLeague, { status: 200 });
  } catch (error) {
    // Todo : Implement logger
    console.log('[UPDATE LEAGUE]', error);

    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
