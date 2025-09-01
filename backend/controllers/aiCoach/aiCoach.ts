import { Request, Response } from 'express';
import OpenAI from 'openai';
import { prompt } from './prompt';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const chatWithCoach = async (req: Request, res: Response) => {
  try {
    console.log('Received request:', req.body);
    console.log('OpenAI API Key present:', !!process.env.OPENAI_API_KEY);

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is missing');
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: message },
      ],
    });

    const reply = completion.choices[0].message?.content || '';
    res.json({ reply });
  } catch (err) {
    console.log(process.env.OPENAI_API_KEY);
    console.error('Error in chatWithCoach:', err);
    res.status(500).json({
      error: 'Something went wrong',
      details: err instanceof Error ? err.message : 'Unknown error',
    });
  }
};
