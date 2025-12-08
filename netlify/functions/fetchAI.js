// netlify/functions/fetchAI.js
import OpenAI from "openai";

export async function handler(event, context) {
  const layer = event.queryStringParameters?.layer || "AI";

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "user", content: `Explain ${layer} in simple, concise terms suitable for website visitors.` }
      ],
      max_tokens: 200
    });

    const text = completion.choices?.[0]?.message?.content || "No content returned";
    return {
      statusCode: 200,
      body: JSON.stringify({ text })
    };

  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ text: "Error fetching AI content." })
    };
  }
}
