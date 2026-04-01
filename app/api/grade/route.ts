import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY chưa được cấu hình." },
      { status: 500 }
    );
  }

  let body: {
    rubric: string;
    maxScore: number;
    examText?: string;
    examImageBase64?: string;
    examImageType?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Request body không hợp lệ." }, { status: 400 });
  }

  const { rubric, maxScore, examText, examImageBase64, examImageType } = body;

  if (!rubric?.trim()) {
    return NextResponse.json({ error: "Rubric chấm điểm không được để trống." }, { status: 400 });
  }
  if (!examText?.trim() && !examImageBase64) {
    return NextResponse.json({ error: "Nội dung bài thi không được để trống." }, { status: 400 });
  }

  const userContent: Anthropic.MessageParam["content"] = [];

  const promptText = `Bạn là giáo viên chấm điểm chuyên nghiệp. Nhiệm vụ của bạn là chấm bài thi sau dựa trên rubric được cung cấp.

**RUBRIC CHẤM ĐIỂM:**
${rubric}

**THANG ĐIỂM TỐI ĐA:** ${maxScore} điểm

${examText?.trim() ? `**NỘI DUNG BÀI THI:**\n${examText}` : "**NỘI DUNG BÀI THI:** (xem ảnh đính kèm bên dưới)"}

---

Hãy chấm điểm bài thi theo đúng định dạng sau, không thêm bớt:

SCORE: [điểm số]/${maxScore}

NHẬN XÉT:
**Điểm mạnh:**
- [Liệt kê những phần học sinh làm đúng, làm tốt]

**Điểm cần cải thiện:**
- [Liệt kê những phần còn thiếu, sai, hoặc chưa đầy đủ]

**Đánh giá chi tiết theo từng tiêu chí:**
[Giải thích điểm số cho từng tiêu chí trong rubric]

**Kết luận:**
[Đánh giá tổng thể về bài làm]`;

  userContent.push({ type: "text", text: promptText });

  if (examImageBase64 && examImageType) {
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const mediaType = validTypes.includes(examImageType)
      ? (examImageType as "image/jpeg" | "image/png" | "image/gif" | "image/webp")
      : "image/jpeg";

    userContent.push({
      type: "image",
      source: {
        type: "base64",
        media_type: mediaType,
        data: examImageBase64,
      },
    });
  }

  try {
    const stream = client.messages.stream({
      model: "claude-opus-4-6",
      max_tokens: 4000,
      thinking: { type: "adaptive" },
      messages: [{ role: "user", content: userContent }],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    if (err instanceof Anthropic.AuthenticationError) {
      return NextResponse.json({ error: "API key không hợp lệ." }, { status: 401 });
    }
    if (err instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: "Vượt quá giới hạn API. Vui lòng thử lại sau." }, { status: 429 });
    }
    if (err instanceof Anthropic.APIError) {
      return NextResponse.json({ error: `Lỗi API: ${err.message}` }, { status: 500 });
    }
    return NextResponse.json({ error: "Có lỗi không xác định xảy ra." }, { status: 500 });
  }
}
