import { NextResponse } from 'next/server';
import { exec } from 'child_process';

export async function POST() {
  try {
    // ✅ Run the deploy script in the background
    exec('/bin/bash /var/www/next-prismic/akanksha/deploy.sh >> /var/www/next-prismic/akanksha/deploy.log 2>&1 &');

    console.log("🚀 Deploy triggered in background via webhook");

    return NextResponse.json({
      success: true,
      message: "Deploy triggered. Check deploy.log for output.",
    });
  } catch (error) {
    console.error("❌ Error triggering deploy:", error);
    return NextResponse.json({
      success: false,
      message: error.message,
    }, { status: 500 });
  }
}
