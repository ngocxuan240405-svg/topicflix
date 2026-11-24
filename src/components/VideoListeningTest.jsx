
import { useState } from 'react'
import { getVideoAssessment } from '../data/videoAssessments'

function shuffle(items) {
  const result = [...items]

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  return result
}

function prepareQuestions(questions) {
  return shuffle(
    questions.map((question) => ({
      ...question,
      choices: shuffle(
        question.options.map((text, index) => ({
          text,
          originalIndex: index,
        }))
      ),
    }))
  )
}

function estimateLevel(scores) {
  const b1 = scores.B1.correct
  const b2 = scores.B2.correct
  const c1 = scores.C1.correct

  if (b1 >= 4 && b2 >= 4 && c1 >= 4) {
    return 'C1-style performance'
  }

  if (b1 >= 3 && b2 >= 3) {
    return 'B2-style performance'
  }

  if (b1 >= 3) {
    return 'B1-style performance'
  }

  return 'More listening practice recommended'
}

function VideoListeningTest({ topic }) {
  const assessment = getVideoAssessment(topic)

  const [questions, setQuestions] = useState(() =>
    prepareQuestions(
      getVideoAssessment(topic)?.questions || []
    )
  )

  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [message, setMessage] = useState('')

  if (!assessment) {
    return (
      <section className="tf-test-page">
        <h2>🎧 Video Listening Test</h2>
        <p>
          This topic's listening test is not available yet.
          You can continue learning with the video,
          interactive subtitles and vocabulary tools.
        </p>
      </section>
    )
  }

  const answeredCount = Object.keys(answers).length

  const scores = {
    B1: { correct: 0, total: 0 },
    B2: { correct: 0, total: 0 },
    C1: { correct: 0, total: 0 },
  }

  for (const question of questions) {
    scores[question.level].total += 1

    if (answers[question.id] === question.answer) {
      scores[question.level].correct += 1
    }
  }

  const totalCorrect =
    scores.B1.correct +
    scores.B2.correct +
    scores.C1.correct

  const estimatedLevel = estimateLevel(scores)

  function selectAnswer(questionId, originalIndex) {
    if (submitted) return

    setAnswers((previous) => ({
      ...previous,
      [questionId]: originalIndex,
    }))
  }

  function submitTest() {
    if (answeredCount < questions.length) {
      setMessage(
        `Please answer all questions (${answeredCount}/${questions.length}).`
      )
      return
    }

    setSubmitted(true)
    setMessage('')

    // Lưu kết quả riêng, không ảnh hưởng Quiz từ vựng.
    try {
      const key = 'topicflix_listening_test_history'
      const saved = JSON.parse(localStorage.getItem(key) || '[]')
      const history = Array.isArray(saved) ? saved : []

      const record = {
        topic,
        score: totalCorrect,
        total: questions.length,
        estimatedLevel,
        scores,
        completedAt: new Date().toISOString(),
      }

      localStorage.setItem(
        key,
        JSON.stringify([record, ...history].slice(0, 20))
      )
    } catch {
      // Nếu lưu lịch sử thất bại, vẫn hiển thị kết quả.
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function retryTest() {
    setQuestions(prepareQuestions(assessment.questions))
    setAnswers({})
    setSubmitted(false)
    setMessage('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="tf-test-page">
      <header>
        <h2>🎧 Video Listening Test</h2>
        <h3>{assessment.title}</h3>
        <p>{assessment.description}</p>
        <p>
          15 multiple-choice questions · 4 options each
        </p>
      </header>

      {!submitted && (
        <p role="status">
          Answered: {answeredCount}/{questions.length}
        </p>
      )}

      {submitted && (
        <section
          className="tf-test-results"
          aria-label="Listening test results"
        >
          <h2>🎉 Your Listening Results</h2>

          <p>
            <strong>
              {totalCorrect}/{questions.length} correct
            </strong>
            {' · '}
            {Math.round(
              (totalCorrect / questions.length) * 100
            )}%
          </p>

          <p>
            Estimated performance: <strong>{estimatedLevel}</strong>
          </p>

          <div className="tf-test-tier-results">
            {['B1', 'B2', 'C1'].map((level) => (
              <p key={level}>
                <strong>{level}:</strong>{' '}
                {scores[level].correct}/
                {scores[level].total}
              </p>
            ))}
          </div>

          <p>
            This is a practice-based listening estimate,
            not an official CEFR certification.
          </p>

          <button type="button" onClick={retryTest}>
            🔄 Try Again
          </button>
        </section>
      )}

      <div className="tf-test-questions">
        {questions.map((question, index) => (
          <article
            className="tf-test-question"
            key={question.id}
          >
            <h3>
              Question {index + 1}
            </h3>

            <p>
              <strong>{question.question}</strong>
            </p>

            <div className="tf-test-options">
              {question.choices.map((choice, indexChoice) => {
                const selected =
                  answers[question.id] === choice.originalIndex

                const isCorrect =
                  choice.originalIndex === question.answer

                return (
                  <label
                    key={`${question.id}-${choice.originalIndex}`}
                    className={[
                      'tf-test-option',
                      selected ? 'tf-test-selected' : '',
                      submitted && isCorrect
                        ? 'tf-test-correct'
                        : '',
                      submitted && selected && !isCorrect
                        ? 'tf-test-incorrect'
                        : '',
                    ].filter(Boolean).join(' ')}
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={choice.originalIndex}
                      checked={selected}
                      disabled={submitted}
                      onChange={() =>
                        selectAnswer(
                          question.id,
                          choice.originalIndex
                        )
                      }
                    />

                    <span>
                      {String.fromCharCode(65 + indexChoice)}.{' '}
                      {choice.text}
                    </span>
                  </label>
                )
              })}
            </div>

            {submitted && (
              <div className="tf-test-explanation">
                <p>
                  <strong>Difficulty:</strong>{' '}
                  {question.level}
                  {' · '}
                  <strong>Video:</strong>{' '}
                  {question.time}
                </p>

                <p>
                  <strong>Correct answer:</strong>{' '}
                  {question.options[question.answer]}
                </p>

                <p>
                  <strong>Explanation:</strong>{' '}
                  {question.explanation}
                </p>
              </div>
            )}
          </article>
        ))}
      </div>

      {!submitted && (
        <div className="tf-test-submit">
          {message && (
            <p role="alert">{message}</p>
          )}

          <button type="button" onClick={submitTest}>
            ✅ Submit Listening Test
          </button>
        </div>
      )}

      {submitted && (
        <div className="tf-test-submit">
          <button type="button" onClick={retryTest}>
            🔄 Retake Test
          </button>
        </div>
      )}
    </section>
  )
}

export default VideoListeningTest
