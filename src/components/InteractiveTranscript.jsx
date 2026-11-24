
import { useEffect, useMemo, useState } from 'react'

// TOPICFLIX - INTERACTIVE TRANSCRIPT
// Ho tro day du 8 chu de hoc tieng Anh

const transcriptFiles = {
  'Daily Conversations': '/subtitles/daily-conversations.txt',
  'Travel & Tourism': '/subtitles/travel-tourism.txt',
  'Business & Career': '/subtitles/business-career.txt',
  'Education': '/subtitles/education.txt',
  'Technology': '/subtitles/technology.txt',
  'Food & Lifestyle': '/subtitles/food-lifestyle.txt',
  'Movies & Entertainment': '/subtitles/movies-entertainment.txt',
  'Environment': '/subtitles/environment.txt',
}

// Chuyen moc thoi gian sang giay
function parseTime(value) {
  const parts = value.split(':').map(Number)

  if (
    parts.length < 2 ||
    parts.length > 3 ||
    parts.some((item) => !Number.isFinite(item))
  ) {
    return null
  }

  if (parts.length === 2) {
    const [minutes, seconds] = parts

    if (seconds >= 60) return null

    return minutes * 60 + seconds
  }

  const [hours, minutes, seconds] = parts

  if (minutes >= 60 || seconds >= 60) {
    return null
  }

  return hours * 3600 + minutes * 60 + seconds
}

// Loai bo chu thoi gian tieng Viet
// bi dinh khi sao chep tu YouTube
function cleanTranscriptText(value) {
  return value
    .replace(
      /^\s*\d*\s*phút\s*,?\s*\d*\s*giây\s*/i,
      ''
    )
    .replace(
      /^\s*\d*\s*phút\s*/i,
      ''
    )
    .replace(
      /^\s*\d*\s*giây\s*/i,
      ''
    )
    .trim()
}

// Doc phu de tu file TXT
function parseTranscript(text) {
  const segments = []

  const lines = text.split(/\r?\n/)

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (!line) continue

    // Vi du:
    // 0:08 Hello everyone
    // 0:088 giâyHello everyone
    // 01:23 Some English text
    // 1:02:10 Some English text
    const match = line.match(
      /^(\d{1,2}:\d{2}(?::\d{2})?)(.*)$/
    )

    if (match) {
      const start = parseTime(match[1])

      if (start === null) continue

      const content = cleanTranscriptText(match[2])

      segments.push({
        start,
        text: content,
      })

      continue
    }

    // Truong hop moc thoi gian va loi thoai
    // nam tren hai dong rieng biet
    if (segments.length > 0) {
      const last = segments[segments.length - 1]

      if (last.text) {
        last.text += ' ' + line
      } else {
        last.text = line
      }
    }
  }

  return segments
    .filter((item) => item.text.trim() !== '')
    .sort((a, b) => a.start - b.start)
}

function formatTime(value) {
  const total = Math.floor(
    Math.max(0, Number(value) || 0)
  )

  const minutes = Math.floor(total / 60)
  const seconds = total % 60

  return (
    `${minutes}:` +
    String(seconds).padStart(2, '0')
  )
}

function InteractiveTranscript({
  topic,
  currentTime = 0,
  onWordClick,
}) {
  const [transcriptText, setTranscriptText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Tu dong lay dung file phu de theo chu de
  const transcriptPath = transcriptFiles[topic]

  useEffect(() => {
    if (!transcriptPath) {
      setTranscriptText('')
      setLoading(false)
      setError('')
      return
    }

    const controller = new AbortController()

    setTranscriptText('')
    setLoading(true)
    setError('')

    fetch(transcriptPath, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            'Transcript file not found for this topic.'
          )
        }

        return response.text()
      })
      .then((content) => {
        if (controller.signal.aborted) return

        setTranscriptText(content)
        setLoading(false)
      })
      .catch((err) => {
        if (controller.signal.aborted) return

        setError(
          err.message || 'Unable to load subtitles.'
        )
        setLoading(false)
      })

    return () => controller.abort()
  }, [transcriptPath])

  // Phan tich noi dung phu de mot lan
  const segments = useMemo(() => {
    return parseTranscript(transcriptText)
  }, [transcriptText])

  // Tim cau phu de tuong ung voi thoi gian video
  const activeIndex = useMemo(() => {
    let left = 0
    let right = segments.length - 1
    let result = -1

    while (left <= right) {
      const middle = Math.floor(
        (left + right) / 2
      )

      if (segments[middle].start <= currentTime) {
        result = middle
        left = middle + 1
      } else {
        right = middle - 1
      }
    }

    return result
  }, [segments, currentTime])

  if (!transcriptPath) {
    return null
  }

  const activeSegment = segments[activeIndex]

  return (
    <section className="tf-live-transcript">
      <h2>📖 Live Interactive Subtitles</h2>

      <p className="tf-live-description">
        Subtitles follow the video automatically.
        Click an English word to look up its meaning
        and pronunciation.
      </p>

      <div
        className="tf-live-caption"
        aria-live="off"
      >
        {loading && (
          <span>Loading subtitles...</span>
        )}

        {!loading && error && (
          <span role="alert">
            {error}
          </span>
        )}

        {!loading &&
          !error &&
          segments.length === 0 && (
            <span>
              No timed subtitles available.
              Please check the transcript file.
            </span>
          )}

        {!loading &&
          !error &&
          segments.length > 0 &&
          !activeSegment && (
            <span>
              ▶ Play the video to display subtitles.
            </span>
          )}

        {!loading &&
          !error &&
          activeSegment &&
          activeSegment.text
            .split(/(\s+)/)
            .map((part, index) => {
              if (!part.trim()) {
                return (
                  <span key={index}>{part}</span>
                )
              }

              // Lay tu tieng Anh, giu dau nhay don
              const word = part.replace(
                /^[^a-zA-Z']+|[^a-zA-Z']+$/g,
                ''
              )

              if (!word) {
                return (
                  <span key={index}>{part}</span>
                )
              }

              return (
                <button
                  key={index}
                  type="button"
                  className="tf-live-word"
                  onClick={() => {
                    if (
                      typeof onWordClick === 'function'
                    ) {
                      onWordClick(word)
                    }
                  }}
                  title={`Look up: ${word}`}
                >
                  {part}
                </button>
              )
            })}
      </div>

      <p className="tf-live-timestamp">
        Video time: {formatTime(currentTime)}

        {activeSegment &&
          ` | Subtitle: ${formatTime(activeSegment.start)}`}
      </p>
    </section>
  )
}

export default InteractiveTranscript
