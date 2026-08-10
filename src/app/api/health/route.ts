import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'technoblade-tribute',
    timestamp: new Date().toISOString(),
  });
}
