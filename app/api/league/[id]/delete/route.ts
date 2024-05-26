import { NextResponse } from 'next/server';
import { database } from '@/src/database';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    if (!params.id) {
      return new NextResponse('League ID is required', { status: 400 });
    }

    const idRegex = /^[0-9a-fA-F]{24}$/;
    if (!idRegex.test(params.id)) {
      return new NextResponse('Invalid League ID format', { status: 400 });
    }

    const deletedLeague = await database.league.delete({
      where: {
        id: params.id,
      },
    });

    if (!deletedLeague) {
      return new NextResponse('League not found', { status: 404 });
    }

    return NextResponse.json(deletedLeague, { status: 200 });
  } catch (error) {
    // Todo : Implement logger

    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
