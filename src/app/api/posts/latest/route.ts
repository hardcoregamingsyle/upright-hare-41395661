import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const post = await prisma.post.findFirst({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        createdAt: true,
      },
    });
    if (!post) {
      return NextResponse.json({ post: null });
    }
    return NextResponse.json({ post });
  } catch {
    return NextResponse.json(
      { error: 'Could not load the latest post.' },
      { status: 500 }
    );
  }
}
