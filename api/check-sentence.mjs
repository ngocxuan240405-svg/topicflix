
const API_BASE = 'https://generativelanguage.googleapis.com/v1beta'

// Trả kết quả JSON cho website TopicFlix
function sendJSON(status, data) {
  return Response.json(data, {
    status,
    headers: {
      'Cache-Control': 'no-store',
    },
  })
}

// Thông báo lỗi Gemini an toàn
function geminiError(status) {
  if (status === 400) {
    return 'Invalid Gemini request.'
  }

  if (status === 401 || status === 403) {
    return 'Gemini API key or permission error.'
  }

  if (status === 404) {
    return 'Gemini model is not available.'
  }

  if (status === 429) {
    return 'AI quota reached. Please try again later.'
  }

  return 'Gemini is currently unavailable.'
}

// API: POST /api/check-sentence
export async function POST(request) {
  try {
    const contentType =
      request.headers.get('content-type') || ''

    if (!contentType.includes('application/json')) {
      return sendJSON(415, {
        success: false,
        message: 'JSON request required.',
      })
    }

    // Giới hạn kích thước dữ liệu gửi lên
    const rawBody = await request.text()

    if (new TextEncoder().encode(rawBody).length > 8000) {
      return sendJSON(413, {
        success: false,
        message: 'Request too large.',
      })
    }

    let data

    try {
      data = JSON.parse(rawBody)
    } catch {
      return sendJSON(400, {
        success: false,
        message: 'Invalid JSON.',
      })
    }

    const sentence = data?.sentence

    if (
      typeof sentence !== 'string' ||
      !sentence.trim() ||
      sentence.length > 500
    ) {
      return sendJSON(400, {
        success: false,
        message: 'Enter an English sentence under 500 characters.',
      })
    }

    // API Key chỉ lưu trên Vercel
    const apiKey = process.env.GEMINI_API_KEY?.trim()

    const model = (
      process.env.GEMINI_MODEL || 'gemini-2.5-flash'
    ).trim()

    if (!apiKey) {
      return sendJSON(503, {
        success: false,
        message: 'Gemini API key is not configured.',
      })
    }

    const topic = String(
      data.topic || 'General'
    ).slice(0, 60)

    const level = String(
      data.level || 'Not assessed'
    ).slice(0, 20)

    // Yêu cầu Gemini sửa câu tiếng Anh
    const prompt = `
You are an experienced English teacher for TopicFlix.

Learning topic: ${topic}
English level: ${level}

Student sentence:
${sentence}

Your tasks:
1. Correct grammar and spelling.
2. Improve incorrect vocabulary and word choice.
3. Keep the student's intended meaning.
4. Explain corrections clearly in Vietnamese.
5. Suggest a natural English expression.
6. Adjust feedback to the student's level if known.
7. If the sentence is correct, explain that in Vietnamese.

Return ONLY a valid JSON object with these four string fields:

{
  "original": "Student's original sentence",
  "corrected": "Corrected English sentence",
  "explanation": "Vietnamese explanation",
  "suggestion": "More natural English sentence"
}

Do not return Markdown or additional text.
`

    // Gửi yêu cầu đến Google Gemini
    const url =
      `${API_BASE}/models/${encodeURIComponent(model)}:generateContent`

    const response = await fetch(url, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },

      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],

        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 2048,
          responseMimeType: 'application/json',
        },
      }),

      signal: AbortSignal.timeout(45000),
    })

    // Xử lý lỗi từ Gemini
    if (!response.ok) {
      console.error(
        'Gemini HTTP status:',
        response.status
      )

      return sendJSON(
        response.status === 429 ? 429 : 502,
        {
          success: false,
          message: geminiError(response.status),
        }
      )
    }

    const result = await response.json()

    const aiText = result.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || '')
      .join('')
      .trim()

    if (!aiText) {
      return sendJSON(502, {
        success: false,
        message: 'Gemini returned an empty response.',
      })
    }

    // Làm sạch kết quả JSON từ AI
    const cleanedText = aiText
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/, '')
      .trim()

    let feedback

    try {
      feedback = JSON.parse(cleanedText)
    } catch {
      return sendJSON(502, {
        success: false,
        message: 'AI response format was invalid.',
      })
    }

    // Kiểm tra dữ liệu phản hồi
    if (
      !feedback ||
      typeof feedback !== 'object' ||
      Array.isArray(feedback) ||
      !['corrected', 'explanation', 'suggestion'].every(
        (field) => typeof feedback[field] === 'string'
      )
    ) {
      return sendJSON(502, {
        success: false,
        message: 'AI response was incomplete.',
      })
    }

    // Trả kết quả cho giao diện TopicFlix
    return sendJSON(200, {
      success: true,

      feedback: {
        original: sentence,
        corrected: feedback.corrected,
        explanation: feedback.explanation,
        suggestion: feedback.suggestion,
      },
    })
  } catch (error) {
    console.error(
      'TopicFlix AI error:',
      error.name
    )

    const timedOut =
      error.name === 'TimeoutError' ||
      error.name === 'AbortError'

    return sendJSON(timedOut ? 504 : 500, {
      success: false,

      message: timedOut
        ? 'AI request timed out. Please retry.'
        : 'Unable to check the sentence right now.',
    })
  }
}

// Truy cập API bằng GET chỉ trả thông báo
export function GET() {
  return sendJSON(405, {
    success: false,
    message: 'Use POST to check an English sentence.',
  })
}
