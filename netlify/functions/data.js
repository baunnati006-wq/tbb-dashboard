import { getStore } from '@netlify/blobs';

export async function handler(event) {

  const store = getStore({
    name: "dashboard",
    consistency: "strong"
  });

  try {

    // SAVE
    if (event.httpMethod === 'POST') {
      const data = JSON.parse(event.body || "{}");

      await store.set("data", JSON.stringify(data));

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Saved" }),
      };
    }

    // LOAD
    if (event.httpMethod === 'GET') {
      const data = await store.get("data", { type: "text" });

      return {
        statusCode: 200,
        body: data || "{}",
      };
    }

    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
