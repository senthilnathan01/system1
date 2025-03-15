import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, profile, goal } = req.body;

  const prompt = `
You are simulating System 1 thinking for a user interacting with a webpage. System 1 thinking is fast, intuitive, and automatic, based on instincts rather than slow, deliberate analysis.

Website URL (for context, no automation): ${url}
User Profile: ${profile}
Goal: ${goal}

Describe the intuitive action the user would take on this webpage and why, as a System 1 thinker. Format your response as:
Action: [the action]
Reasoning: [why they’d do it]
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
      temperature: 0.7,
    });

    const responseText = completion.choices[0].message.content.trim();
    const [actionLine, reasoningLine] = responseText.split('\n');
    const action = actionLine.replace('Action: ', '');
    const reasoning = reasoningLine.replace('Reasoning: ', '');

    res.status(200).json({ action, reasoning });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to simulate System 1 thinking' });
  }
}
