// Template-based content generator for Arabic formal Algerian requests
function generateRequestContent(subject: string): string {
  const content = `لي عظيم الشرف أن أتقدم إلى سيادتكم المحترمة بهذا الطلب، راجيًا منكم التفضل بدراسته، والمتعلق بـ ${subject}، وذلك في إطار ما تنص عليه القوانين والتنظيمات المعمول بها.

وعليه، أرجو من سيادتكم التكرم بالموافقة على طلبي هذا، لما ترونه مناسبًا،

وتفضلوا بقبول أسمى عبارات التقدير والاحترام.`;

  return content;
}

export async function POST(request: Request) {
  try {
    const { subject, name, director } = await request.json();

    if (!subject) {
      return Response.json(
        { error: 'الموضوع مطلوب' },
        { status: 400 }
      );
    }

    // Generate content using the specified format
    const content = generateRequestContent(subject);

    return Response.json({ content });
  } catch (error) {
    console.error('Generate content error:', error);
    return Response.json(
      { error: 'خطأ في توليد المحتوى' },
      { status: 500 }
    );
  }
}
