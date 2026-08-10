import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { guestbookSchema } from '@/lib/validation';
import { clientIp, rateLimit } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

const MAX_ENTRIES = 200;

/**
 * GET /api/guestbook
 * Returns the most recent guestbook entries, oldest-to-newest order
 * so the page reads top-down chronologically.
 */
export async function GET() {
  try {
    const entries = await prisma.guestbookEntry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    // Newest first from DB, then reverse for display.
    return NextResponse.json({ entries: entries.reverse() });
  } catch {
    return NextResponse.json(
      { error: 'Could not load guestbook entries.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/guestbook
 * Validates, sanitizes, rate-limits, and stores a new entry.
 */
export async function POST(request: NextRequest) {
  const ip = clientIp(request.headers);
  if (!rateLimit(`guestbook:${ip}`)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment and try again.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const parsed = guestbookSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? 'Invalid input.';
    return NextResponse.json({ error: first }, { status: 422 });
  }

  try {
    const count = await prisma.guestbookEntry.count();
    if (count >= MAX_ENTRIES) {
      // Keep the guestbook from growing unbounded: drop the oldest.
      const oldest = await prisma.guestbookEntry.findFirst({
        orderBy: { createdAt: 'asc' },
        select: { id: true },
      });
      if (oldest) {
        await prisma.guestbookEntry.delete({ where: { id: oldest.id } });
      }
    }

    const entry = await prisma.guestbookEntry.create({
      data: {
        name: parsed.data.name.slice(0, 50),
        message: parsed.data.message.slice(0, 500),
      },
    });
    return NextResponse.json({ entry }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Could not save your message. Please try again.' },
      { status: 500 }
    );
  }
}
