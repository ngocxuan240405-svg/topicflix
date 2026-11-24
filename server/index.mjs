
import http from 'node:http'

const PORT = 3001

const API_BASE = 'https://generativelanguage.googleapis.com/v1beta'

const API_KEY = process.env.GEMINI_API_KEY?.trim()
const MODEL = (
  process.env.GEMINI_MODEL || 'gemini-2.5-flash'
).trim()

// Trả dữ liệu JSON về trình duyệt
function sendJSON(res, status, data) {
  if (res.writableEnded) return

  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
  })

  res.end(JSON.stringify(data))
}

// Đọc dữ liệu JSON do website gửi lên
async function readBody(req) {
  let body = ''

  for await (const chunk of req) {
    body += chunk.toString()

    if (body.length > 8000) {
      const error = new Error('Request is too large.')
      error.statusCode = 413
      throw error
    }
  }

  try {
    return JSON.parse(body)
  } catch {
    const error = new Error('Invalid JSON request.')
    error.statusCode = 400
    throw error
  }
}

// Hiển thị lỗi an toàn, không in API key
function getGeminiErrorMessage(status) {
  if (status === 400) {
    return 'Invalid Gemini request. Check model configuration.'
  }

  if (status === 401 || status === 403) {
    return 'API key or project permission error.'
  }

  if (status === 404) {
    return 'Gemini model not found or not available.'
  }

  if (status === 429) {
    return 'AI quota reached. Please try again later.'
  }

  return 'Gemini is unavailable. Check the backend terminal.'
}

// Gọi Gemini sửa câu tiếng Anh
async function checkSentenceWithAI(req, res) {
  try {
    const data = await readBody(req)

    const sentence = data.sentence
    const topic = data.topic
    const level = data.level

    if (
      typeof sentence !== 'string' ||
      !sentence.trim() ||
      sentence.length > 500
    ) {
      sendJSON(res, 400, {
        success: false,
        message: 'Please enter a sentence under 500 characters.',
      })
      return
    }

    if (!API_KEY) {
      sendJSON(res, 503, {
        success: false,
        message: 'Gemini API key is not configured.',
      })
      return
    }

    const prompt = `
You are an experienced English teacher for TopicFlix.

Learning topic: ${String(topic || 'General').slice(0, 60)}
English level: ${String(level || 'B1').slice(0, 10)}

Student sentence:
${sentence}

Your tasks:
1. Correct grammar and spelling.
2. Improve incorrect vocabulary and word choice.
3. Keep the student's intended meaning.
4. Explain corrections clearly in Vietnamese.
5. Suggest a natural English expression.
6. Adjust your feedback to the selected English level.
7. If the sentence is correct, explain that in Vietnamese.

Return ONLY a valid JSON object with four string fields:

{
  "original": "Student's original sentence",
  "corrected": "Corrected English sentence",
  "explanation": "Vietnamese explanation",
  "suggestion": "More natural English sentence"
}

Do not return Markdown or additional text.
`

    const url =
      `${API_BASE}/models/${encodeURIComponent(MODEL)}:generateContent`

    console.log('Checking sentence with Gemini model:', MODEL)

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 2048,
        },
      }),
      signal: AbortSignal.timeout(45000),
    })

    // Hiển thị mã lỗi thực tế của Gemini
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))

      console.error('Gemini HTTP status:', response.status)
      console.error(
        'Gemini error code:',
        errorData.error?.status || 'Unknown'
      )

      // Chỉ hiển thị thông báo, không hiển thị API key
      const rawMessage = String(errorData.error?.message || 'No details')
      const safeMessage = API_KEY
        ? rawMessage.split(API_KEY).join('[REDACTED]')
        : rawMessage

      console.error('Gemini error message:', safeMessage)

      sendJSON(res, response.status === 429 ? 429 : 502, {
        success: false,
        message: getGeminiErrorMessage(response.status),
      })

      return
    }

    const result = await response.json()

    const aiText = result.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || '')
      .join('')
      .trim()

    if (!aiText) {
      console.error('Gemini returned no usable text.')

      sendJSON(res, 502, {
        success: false,
        message: 'Gemini returned an empty response.',
      })
      return
    }

    // Xử lý cả khi AI trả về JSON trong Markdown
    const cleanedText = aiText
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/, '')
      .trim()

    let feedback

    try {
      feedback = JSON.parse(cleanedText)
    } catch {
      console.error('Gemini response was not valid JSON.')

      sendJSON(res, 502, {
        success: false,
        message: 'AI response format was invalid. Please retry.',
      })
      return
    }

    if (
      !feedback ||
      typeof feedback !== 'object' ||
      Array.isArray(feedback) ||
      !['corrected', 'explanation', 'suggestion'].every(
        (field) => typeof feedback[field] === 'string'
      )
    ) {
      sendJSON(res, 502, {
        success: false,
        message: 'AI response was incomplete. Please retry.',
      })
      return
    }

    sendJSON(res, 200, {
      success: true,
      feedback: {
        original: sentence,
        corrected: feedback.corrected,
        explanation: feedback.explanation,
        suggestion: feedback.suggestion,
      },
    })

    console.log('AI sentence checked successfully.')
  } catch (error) {
    console.error('AI processing error:', error.message)

    const status = error.statusCode || (
      error.name === 'TimeoutError' ? 504 : 500
    )

    sendJSON(res, status, {
      success: false,
      message: status === 504
        ? 'AI request timed out. Please retry.'
        : status === 400 || status === 413
          ? error.message
          : 'Unable to check the sentence right now.',
    })
  }
}

// Xem các model có thể sử dụng với API key
async function listAvailableModels(res) {
  if (!API_KEY) {
    sendJSON(res, 503, {
      success: false,
      message: 'Gemini API key is not configured.',
    })
    return
  }

  try {
    const response = await fetch(
      `${API_BASE}/models?pageSize=100`,
      {
        headers: {
          'x-goog-api-key': API_KEY,
        },
        signal: AbortSignal.timeout(15000),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('Model list HTTP status:', response.status)

      sendJSON(res, 502, {
        success: false,
        message: getGeminiErrorMessage(response.status),
      })
      return
    }

    const models = (data.models || [])
      .filter((item) =>
        item.supportedGenerationMethods?.includes('generateContent')
      )
      .map((item) => item.name.replace(/^models\//, ''))

    sendJSON(res, 200, {
      success: true,
      configuredModel: MODEL,
      availableModels: models,
      morePagesAvailable: Boolean(data.nextPageToken),
    })
  } catch (error) {
    console.error('Model list error:', error.message)

    sendJSON(res, 500, {
      success: false,
      message: 'Unable to retrieve Gemini models.',
    })
  }
}

// Máy chủ TopicFlix
const server = http.createServer((req, res) => {
  const origin = req.headers.origin || ''

  // Chỉ cho phép giao diện chạy trên localhost
  if (/^http:\/\/(localhost|127\.0\.0\.1):517\d+$/.test(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  // Kiểm tra backend
  if (req.method === 'GET' && req.url === '/api/health') {
    sendJSON(res, 200, {
      success: true,
      project: 'TopicFlix',
      status: 'running',
    })
    return
  }

  // Kiểm tra danh sách model Gemini
  if (req.method === 'GET' && req.url === '/api/models') {
    listAvailableModels(res)
    return
  }

  // AI Sentence Practice
  if (req.method === 'POST' && req.url === '/api/check-sentence') {
    checkSentenceWithAI(req, res)
    return
  }

  sendJSON(res, 404, {
    success: false,
    message: 'API endpoint not found.',
  })
})

server.listen(PORT, '127.0.0.1', () => {
  console.log('TopicFlix Backend is running')
  console.log(`http://localhost:${PORT}/api/health`)
  console.log('Gemini model:', MODEL)
})
