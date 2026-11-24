
import { useState } from 'react'

function AISentencePractice({ topic, level }) {
  const [sentence, setSentence] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Gửi câu tiếng Anh đến backend Gemini
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
      const response = await fetch(
        'http://localhost:3001/api/check-sentence',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sentence: text,
            topic,
            level,
          }),
        }
      )

      const data = await response.json()

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
      setError(
        err instanceof TypeError
          ? 'Cannot connect to the AI backend. Check port 3001.'
          : err.message || 'Something went wrong.'
      )
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
        <strong>Level:</strong> {level}
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
        <div className="tf-ai-feedback" role="alert">
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
