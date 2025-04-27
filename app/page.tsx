import { list } from '@vercel/blob';
import type { ListBlobResultBlob } from '@vercel/blob';

export default async function Home() {
  let blobs: ListBlobResultBlob[] = [];
  try {
    const result = await list({ prefix: 'archive/' });
    blobs = result.blobs;
  } catch (error: any) {
    console.error('Error fetching blobs:', error);
  }
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Archived Images</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {blobs.map((blob) => (
          <img key={blob.url} src={blob.url} alt={blob.pathname} style={{ width: '100%', height: 'auto' }} />
        ))}
      </div>
      <p>
        <a href="/archive">Upload more images</a>
      </p>
    </div>
  );
}
