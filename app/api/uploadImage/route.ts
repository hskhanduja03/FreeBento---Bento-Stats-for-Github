import { NextResponse } from 'next/server';
import multiparty from 'multiparty';
import { uploadToS3 } from '../../../lib/s3CloudinaryUpload';
import { Readable } from 'stream';
import fs from 'fs';

// Disable Next.js's default body parser for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  try {
    // Convert NextRequest to a stream-compatible format
    const streamReq = new Readable();
    streamReq.push(Buffer.from(await req.arrayBuffer()));
    streamReq.push(null); // Signal the end of the stream
    (streamReq as any).headers = Object.fromEntries(req.headers.entries()); // Transfer headers

    return new Promise((resolve, reject) => {
      const form = new multiparty.Form();

      form.parse(streamReq as any, async (err, fields, files) => {
        if (err) {
          console.error('Error parsing form:', err);
          return reject(
            NextResponse.json({ error: 'Failed to parse form' }, { status: 400 })
          );
        }

        // Validate file
        const file = files?.profileImage?.[0];
        if (!file) {
          return resolve(
            NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
          );
        }

        try {
          // Upload the file to S3
          const fileBuffer = await fs.promises.readFile(file.path);
          const fileUrl = await uploadToS3(fileBuffer, file.originalFilename);

          return resolve(
            NextResponse.json({ imageUrl: fileUrl }, { status: 200 })
          );
        } catch (uploadError) {
          console.error('Error uploading file to S3:', uploadError);
          return resolve(
            NextResponse.json(
              { error: 'File upload to S3 failed' },
              { status: 500 }
            )
          );
        }
      });
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
