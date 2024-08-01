// pages/api/generate.js

export default async function handler(req, res) {
    const { prompt } = req.body;
  
    const response = await fetch('https://YOUR_GOOGLE_AI_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GOOGLE_AI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        max_tokens: 100,
      }),
    });
  
    const data = await response.json();
    res.status(200).json({ text: data.choices[0].text });
  }
  