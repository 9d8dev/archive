import { NextRequest, NextResponse } from 'next/server';
import { list, put } from '@vercel/blob';

export async function GET(request: NextRequest) {
  try {
    const result = await list({ prefix: 'archive/' });
    // Return array of blobs
    return NextResponse.json(result.blobs);
  } catch (error: any) {
    console.error('Error listing blobs:', error);
    return NextResponse.json(
      { error: error.message ?? 'Error listing blobs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const uploaded = [];
    for (const file of files) {
      if (file instanceof File) {
        const result = await put(`archive/${file.name}`, file, {
          access: 'public',
          contentType: file.type,
          token: process.env.BLOB_READ_WRITE_TOKEN,
          addRandomSuffix: true,
        });
        uploaded.push(result);
      }
    }
    return NextResponse.json({ uploaded });
  } catch (error: any) {
    console.error('Error uploading files:', error);
    return NextResponse.json(
      { error: error.message ?? 'Error uploading files' },
      { status: 500 }
    );
  }
}