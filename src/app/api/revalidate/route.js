import { NextResponse } from 'next/server';
import { exec } from 'child_process';

export async function POST(req) {
  return new Promise((resolve) => {
    // Optional: log when webhook is hit
    console.log("🔔 Prismic webhook received");

    // Run the deploy script
    exec('/var/www/next-prismic/akanksha/deploy.sh', (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Error running deploy.sh:', error.message);
        resolve(
          NextResponse.json(
            { success: false, message: 'Error during deploy', error: error.message },
            { status: 500 }
          )
        );
        return;
      }

      console.log('✅ Deploy script output:\n', stdout);
      if (stderr) console.warn('⚠️ stderr:\n', stderr);

      resolve(
        NextResponse.json({
          success: true,
          message: 'Deploy script executed successfully',
          output: stdout,
        })
      );
    });
  });
}
