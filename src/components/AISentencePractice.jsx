
import { useState } from 'react'

// Localhost uses the existing backend.
// Vercel uses the new serverless API.
const AI_ENDPOINT = import.meta.env.DEV
  ? 'http://localhost:3001/api/check-sentence'
  : '/api/check-sentence'

function AISentencePractice({ topic, level }) {
  const [sentence, setSentence] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Trình độ chưa xác định cho đến khi đánh giá
  const displayLevel = level || 'Not assessed'

  // Gửi câu tiếng Anh đến Gemini AI
  const handleCheckSentence = async () => {
    const text = sentence.trim()

    if (!text) {
      setError('Please enter an English sentence first.')
      setFeedback(null)
      return
    }

    if (text.length > 500) {
      setError('Please enter no more than 500 characters.')
      setFeedback(null)
      return
    }

    if (isLoading) return

    setIsLoading(true)
    setError('')
    setFeedback(null)

    try {
      const response = await fetch(AI_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sentence: text,
          topic,
          level,
        }),
      })

      let data

      try {
        data = await response.json()
      } catch {
        throw new Error(
          'AI server returned an invalid response.'
        )
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || 'Unable to check your sentence.'
        )
      }

      if (!data.feedback) {
        throw new Error('AI feedback is missing.')
      }

      setFeedback(data.feedback)
    } catch (err) {
      if (err instanceof TypeError) {
        setError(
          import.meta.env.DEV
            ? 'Cannot connect to the local AI backend. Check port 3001.'
            : 'Cannot connect to the online AI service. Please retry.'
        )
      } else {
        setError(
          err.message || 'Something went wrong.'
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="tf-ai-practice">
      <h2>🤖 AI Sentence Practice</h2>

      <p>
        Write an English sentence using the vocabulary
        you learned from the video.
      </p>

      <p>
        <strong>Topic:</strong> {topic}
        {' | '}
        <strong>Level:</strong> {displayLevel}
      </p>

      <label htmlFor="tf-ai-sentence">
        <strong>Your English Sentence</strong>
      </label>

      <textarea
        id="tf-ai-sentence"
        value={sentence}
        onChange={(event) => {
          setSentence(event.target.value)
          setFeedback(null)
          setError('')
        }}
        placeholder="Example: I have many experience with online learning."
        rows={5}
        maxLength={500}
        disabled={isLoading}
      />

      <p>{sentence.length}/500 characters</p>

      <button
        type="button"
        onClick={handleCheckSentence}
        disabled={isLoading || !sentence.trim()}
      >
        {isLoading
          ? '⏳ AI is checking...'
          : '✨ Check My Sentence'}
      </button>

      {error && (
        <div
          className="tf-ai-feedback"
          role="alert"
        >
          <p>{error}</p>
        </div>
      )}

      {feedback && (
        <div
          className="tf-ai-feedback"
          role="status"
        >
          <h3>✨ AI Feedback</h3>

          <h4>Original Sentence</h4>
          <p>
            {feedback.original || sentence}
          </p>

          <h4>Corrected Sentence</h4>
          <p>
            {feedback.corrected || 'Not available'}
          </p>

          <h4>Explanation (Vietnamese)</h4>
          <p>
            {feedback.explanation || 'Not available'}
          </p>

          <h4>Better Expression</h4>
          <p>
            {feedback.suggestion || 'Not available'}
          </p>
        </div>
      )}
    </section>
  )
}

export default AISentencePractice
