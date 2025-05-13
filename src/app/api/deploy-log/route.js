import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';

export async function GET() {
  try {
    const log = readFileSync('/var/www/next-prismic/akanksha/deploy.log', 'utf8');
    return NextResponse.json({ log });
  } catch (err) {
    return NextResponse.json({ error: 'Could not read deploy.log' }, { status: 500 });
  }
}
