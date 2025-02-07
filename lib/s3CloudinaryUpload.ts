import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Initialize S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadToS3 = async (fileBuffer: Buffer, filename: string): Promise<string> => {
  const bucketName = process.env.AWS_BUCKET_NAME;

  if (!bucketName) {
    throw new Error('S3 bucket name is not set in environment variables');
  }

  const params = {
    Bucket: bucketName,
    Key: `profile-images/${Date.now()}-${filename}`, // Unique key for the file
    Body: fileBuffer,
    ContentType: 'image/jpeg', // Adjust to match your file type
  };

  const command = new PutObjectCommand(params);

  // Upload the file to S3
  await s3.send(command);

  // Generate and return the file URL
  return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
};
