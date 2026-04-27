import { getStore } from '@netlify/blobs';

export async function handler(event) {
  const store = getStore('dashboard');

  if (event.httpMethod === 'POST') {
    const data = JSON.parse(event.body);
    await store.set('data', data);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Saved' }),
    };
  }

  if (event.httpMethod === 'GET') {
    const data = await store.get('data');

    return {
      statusCode: 200,
      body: JSON.stringify(data || {}),
    };
  }
}
