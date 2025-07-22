import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { writeFileSync } from 'fs';

export async function POST() {
  try {
    // Log that webhook was hit
    writeFileSync('/var/www/next-prismic/akanksha/webhook-hit.txt', new Date().toISOString());

    // Trigger deploy
    exec('/bin/bash /var/www/next-prismic/akanksha/deploy.sh >> /var/www/next-prismic/akanksha/deploy-status.txt 2>&1 &');

    return NextResponse.json({
      success: true,
      message: 'Deploy triggered successfully via webhook.',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    }, { status: 500 });
  }
}
