import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { occasion, skinTone, desiredShape, outfitDescription } =
      await req.json();

    const model = genAI.getGenerativeModel({
      model: 'gemini-flash-lite-latest',
    });

    const prompt = `You are Dina, the founder of PRESSI, a press-on nail brand 
from Beirut. A customer is asking for help picking a set. Talk like a warm, 
stylish friend — NOT like a magazine editor. Keep it simple, helpful, and human.

Customer info:
- Occasion: ${occasion}
- Skin tone: ${skinTone}
- Preferred shape: ${desiredShape}
- What she's wearing: ${outfitDescription}

We have 4 collections. YOU MUST pick the one that best matches her occasion and 
outfit. Distribute recommendations across all 4 — do not default to one:
- "The French Edit" — minimal, timeless, everyday, casual chic
- "The Soft Nude" — soft, natural, daytime, work, gentle looks
- "The Golden Hour" — warm, golden, evening, dinners, date nights
- "The Bridal Atelier" — elegant, ceremonial, weddings, big events

Reply ONLY with valid JSON. No markdown. No extra text.

{
  "category": "exact name from the 4 above",
  "suggestedMatchingProduct": "exact product name you'd recommend",
  "shapeAndLength": "e.g. Almond · Medium",
  "finish": "short 4-6 word finish description",
  "message": "2 warm sentences max. Talk directly to her like a friend: why this 
set works for her occasion and outfit. Simple words. No fancy adjectives.",
  "tips": ["1 short practical tip", "1 short practical tip"]
}

Keep the message under 40 words. Keep tips under 12 words each. Sound like a real 
person.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleaned = text.replace(/```json\n?|\n?```/g, '').trim();
    const data = JSON.parse(cleaned);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('AI Stylist error:', error);
    return NextResponse.json(
      { success: false, error: 'Consultation failed' },
      { status: 500 }
    );
  }
}
