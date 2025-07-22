import { exec } from 'child_process';
import { writeFileSync } from 'fs';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Log webhook hit
    writeFileSync('/var/www/next-prismic/akanksha/webhook-hit.txt', new Date().toISOString());

    // Absolute command path to avoid env issues
    exec('bash -c "/var/www/next-prismic/akanksha/deploy.sh >> /var/www/next-prismic/akanksha/deploy-status.txt 2>&1"');

    return NextResponse.json({
      success: true,
      message: 'Deploy triggered via webhook.',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    }, { status: 500 });
  }
}
