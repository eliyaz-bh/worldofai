import OpenAI from "openai";

export default async function handler(req, res) {
  const layer = req.query.layer || "AI";

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: `Explain ${layer} in simple, concise terms suitable for website visitors.` }],
      max_tokens: 200
    });

    const text = completion.choices[0].message.content;
    res.json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ text: "Error fetching AI content." });
  }
}
