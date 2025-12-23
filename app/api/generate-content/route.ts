export async function POST(request: Request) {
  try {
    const { subject, name, director } = await request.json();

    if (!subject) {
      return Response.json(
        { error: 'الموضوع مطلوب' },
        { status: 400 }
      );
    }

    // Determine API and key source (Groq vs OpenAI)
    const groqKey = process.env.GROQ_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    // If OPENAI_API_KEY is actually a Groq key (starts with 'sk-proj-'), prefer using Groq
    const inferredGroqKey = (!groqKey && openaiKey && openaiKey.startsWith?.('sk-proj-'))
      ? openaiKey
      : undefined;

    const apiKey = groqKey || inferredGroqKey || openaiKey;
    if (!apiKey) {
      console.error('Missing API key (GROQ_API_KEY or OPENAI_API_KEY)');
      return Response.json(
        { error: 'مفتاح API مفقود. اضبط GROQ_API_KEY أو OPENAI_API_KEY في المتغيرات البيئية' },
        { status: 500 }
      );
    }

    const isGroq = Boolean(groqKey || inferredGroqKey);
    const endpoint = isGroq
      ? 'https://api.groq.com/openai/v1/chat/completions'
      : 'https://api.openai.com/v1/chat/completions';

    const model = isGroq
      ? (process.env.GROQ_MODEL || 'mixtral-8x7b-32768')
      : (process.env.OPENAI_MODEL || 'gpt-3.5-turbo');

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: `أنت كاتب طلبات احترافي جزائري. اكتب محتوى طلب رسمي بالعربية بناءً على الموضوع المعطى. 
يجب أن يكون المحتوى:
- احترافي وموقّر
- يبدأ بـ "لي عظيم الشرف أن أتقدم إلى سيادتكم..."
- يتضمن الموضوع والطلب بوضوح
- ينتهي بـ "وتفضلوا بقبول فائق الاحترام"
- يكون باللهجة الفصحى الجميلة
- لا يتجاوز 300 كلمة`,
          },
          {
            role: 'user',
            content: `اكتب محتوى طلب عن الموضوع التالي: ${subject}
${name ? `المرسل: ${name}` : ''}
${director ? `الموجه إلى: ${director}` : ''}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('API Error:', error);
      return Response.json(
        { error: 'خطأ في توليد المحتوى. تأكد من تعيين متغيرات API بشكل صحيح' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '';

    return Response.json({ content });
  } catch (error) {
    console.error('Generate content error:', error);
    return Response.json(
      { error: 'خطأ في توليد المحتوى' },
      { status: 500 }
    );
  }
}
