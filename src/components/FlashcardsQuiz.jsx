
import { useState } from 'react'

const VOCAB_KEY = 'topicflix_vocabulary'
const HISTORY_KEY = 'topicflix_quiz_history'

// Đọc từ vựng đã lưu
function getSavedWords() {
  try {
    const data = JSON.parse(
      localStorage.getItem(VOCAB_KEY) || '[]'
    )

    if (!Array.isArray(data)) return []

    const seen = new Set()

    return data.filter((item) => {
      if (
        !item ||
        typeof item.word !== 'string' ||
        typeof item.vietnamese !== 'string'
      ) {
        return false
      }

      const word = item.word.trim()
      const meaning = item.vietnamese.trim()
      const key = word.toLowerCase()

      if (
        !word ||
        !meaning ||
        meaning === 'Not available' ||
        meaning === 'Vietnamese translation unavailable' ||
        seen.has(key)
      ) {
        return false
      }

      seen.add(key)
      return true
    })
  } catch {
    return []
  }
}

// Đọc lịch sử làm bài
function getQuizHistory() {
  try {
    const data = JSON.parse(
      localStorage.getItem(HISTORY_KEY) || '[]'
    )

    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

// Trộn thứ tự câu hỏi và đáp án
function shuffle(items) {
  const result = [...items]

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  return result
}

// Tạo câu hỏi trắc nghiệm
function createMultipleChoice(words) {
  const meanings = [
    ...new Set(words.map((item) => item.vietnamese.trim())),
  ]

  if (meanings.length < 4) return []

  return shuffle(words).map((item) => {
    const correct = item.vietnamese.trim()

    const wrong = shuffle(
      meanings.filter((meaning) => meaning !== correct)
    ).slice(0, 3)

    return {
      word: item.word,
      correct,
      options: shuffle([correct, ...wrong]),
    }
  })
}

// Chuẩn hóa câu trả lời để chấm điểm
function normalizeAnswer(value) {
  return value.trim().replace(/\s+/g, ' ').toLowerCase()
}

function FlashcardsQuiz({ view = 'flashcards' }) {
  const [words, setWords] = useState(getSavedWords)

  // Flashcards
  const [cardIndex, setCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  // Quiz
  const [quizType, setQuizType] = useState('multiple')
  const [questions, setQuestions] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [textAnswer, setTextAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [mistakes, setMistakes] = useState([])
  const [quizStarted, setQuizStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [history, setHistory] = useState(getQuizHistory)

  const refreshWords = () => {
    setWords(getSavedWords())
    setCardIndex(0)
    setFlipped(false)
    setQuestions([])
    setQuestionIndex(0)
    setSelected(null)
    setTextAnswer('')
    setScore(0)
    setMistakes([])
    setQuizStarted(false)
    setFinished(false)
  }

  const startQuiz = () => {
    const updated = getSavedWords()

    const newQuestions =
      quizType === 'multiple'
        ? createMultipleChoice(updated)
        : shuffle(updated).map((item) => ({
            word: item.word,
            correct: item.word.trim(),
            meaning: item.vietnamese,
          }))

    setWords(updated)

    if (newQuestions.length === 0) {
      setQuizStarted(false)
      return
    }

    setQuestions(newQuestions)
    setQuestionIndex(0)
    setSelected(null)
    setTextAnswer('')
    setScore(0)
    setMistakes([])
    setFinished(false)
    setQuizStarted(true)
  }

  // Chấm một câu trả lời
  const submitAnswer = (answer) => {
    if (selected !== null) return

    const question = questions[questionIndex]
    if (!question) return

    const isCorrect =
      normalizeAnswer(answer) ===
      normalizeAnswer(question.correct)

    setSelected(answer)

    if (isCorrect) {
      setScore((previous) => previous + 1)
    } else {
      setMistakes((previous) => [
        ...previous,
        {
          word: question.word,
          yourAnswer: answer || '(No answer)',
          correctAnswer: question.correct,
        },
      ])
    }
  }

  // Chuyển câu hỏi hoặc hoàn thành bài kiểm tra
  const nextQuestion = () => {
    if (selected === null) return

    if (questionIndex + 1 < questions.length) {
      setQuestionIndex((previous) => previous + 1)
      setSelected(null)
      setTextAnswer('')
      return
    }

    const result = {
      id: Date.now(),
      date: new Date().toISOString(),
      type: quizType,
      score,
      total: questions.length,
      accuracy: Math.round(
        (score / questions.length) * 100
      ),
      mistakes,
    }

    try {
      const updatedHistory = [
        result,
        ...getQuizHistory(),
      ].slice(0, 20)

      localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(updatedHistory)
      )

      setHistory(updatedHistory)
    } catch {
      // Vẫn hiển thị kết quả nếu bộ nhớ trình duyệt đầy
    }

    setFinished(true)
  }

  const card = words[cardIndex]
  const question = questions[questionIndex]

  const uniqueMeaningCount = new Set(
    words.map((item) => item.vietnamese.trim())
  ).size

  const canStart =
    quizType === 'multiple'
      ? uniqueMeaningCount >= 4
      : words.length >= 1

  // TRANG FLASHCARDS
  if (view === 'flashcards') {
    return (
      <section className="tf-flashcards-quiz">
        <h2>🃏 Flashcards</h2>
        <p>Flip each card to review your vocabulary.</p>

        <div className="tf-study-tabs">
          <button type="button" onClick={refreshWords}>
            ↻ Refresh Saved Words
          </button>
        </div>

        {words.length === 0 ? (
          <p>
            No saved vocabulary yet.
            Save words from Video Learning first.
          </p>
        ) : (
          <div className="tf-flashcard-area">
            <p>
              Card {cardIndex + 1} / {words.length}
            </p>

            <button
              type="button"
              className="tf-flashcard"
              onClick={() => setFlipped((old) => !old)}
            >
              {!flipped ? (
                <>
                  <h3>{card.word}</h3>
                  <p>Click to reveal the meaning</p>
                </>
              ) : (
                <>
                  <h3>{card.vietnamese}</h3>

                  {card.ipa && (
                    <p>IPA: {card.ipa}</p>
                  )}

                  {card.definition && (
                    <p>{card.definition}</p>
                  )}

                  {card.example && (
                    <p>Example: {card.example}</p>
                  )}
                </>
              )}
            </button>

            <div className="tf-flashcard-navigation">
              <button
                type="button"
                disabled={cardIndex === 0}
                onClick={() => {
                  setCardIndex((old) => old - 1)
                  setFlipped(false)
                }}
              >
                ← Previous
              </button>

              <button
                type="button"
                disabled={cardIndex === words.length - 1}
                onClick={() => {
                  setCardIndex((old) => old + 1)
                  setFlipped(false)
                }}
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </section>
    )
  }

  // TRANG QUIZ
  if (view === 'quiz') {
    return (
      <section className="tf-flashcards-quiz">
        <h2>📝 Vocabulary Quiz</h2>
        <p>Practice English and track your results.</p>

        <div className="tf-study-tabs">
          <button
            type="button"
            onClick={() => {
              refreshWords()
              setQuizType('multiple')
            }}
            disabled={quizStarted && !finished}
          >
            Multiple Choice
          </button>

          <button
            type="button"
            onClick={() => {
              refreshWords()
              setQuizType('fill')
            }}
            disabled={quizStarted && !finished}
          >
            Fill in the Blank
          </button>

          <button
            type="button"
            onClick={refreshWords}
            disabled={quizStarted && !finished}
          >
            ↻ Refresh Words
          </button>
        </div>

        {!quizStarted ? (
          <div className="tf-quiz-result">
            <h3>
              {quizType === 'multiple'
                ? 'Multiple Choice Quiz'
                : 'Fill in the Blank Quiz'}
            </h3>

            <p>Saved vocabulary: {words.length}</p>

            {!canStart && (
              <p role="status">
                {quizType === 'multiple'
                  ? `You need 4 different Vietnamese meanings. Current: ${uniqueMeaningCount}.`
                  : 'Please save at least 1 vocabulary item.'}
              </p>
            )}

            <button
              type="button"
              disabled={!canStart}
              onClick={startQuiz}
            >
              ▶ Start Quiz
            </button>
          </div>
        ) : finished ? (
          <div className="tf-quiz-result">
            <h3>🎉 Quiz Completed!</h3>

            <p>
              Your Score: {score} / {questions.length}
            </p>

            <h2>
              {Math.round(
                (score / questions.length) * 100
              )}% Correct
            </h2>

            {mistakes.length > 0 && (
              <div className="tf-quiz-mistakes">
                <h3>Review Incorrect Answers</h3>

                {mistakes.map((item, index) => (
                  <div key={index}>
                    <p>
                      <strong>Word:</strong> {item.word}
                    </p>
                    <p>
                      Your answer: {item.yourAnswer}
                    </p>
                    <p>
                      Correct: {item.correctAnswer}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <button type="button" onClick={startQuiz}>
              ↻ Try Again
            </button>
          </div>
        ) : question ? (
          <div className="tf-quiz-area">
            <p>
              Question {questionIndex + 1} /
              {questions.length}
            </p>

            {quizType === 'multiple' ? (
              <>
                <h3>
                  What is the Vietnamese meaning of
                  "{question.word}"?
                </h3>

                <div className="tf-quiz-options">
                  {question.options.map((option, index) => (
                    <button
                      key={`${index}-${option}`}
                      type="button"
                      disabled={selected !== null}
                      onClick={() => submitAnswer(option)}
                      className={
                        selected !== null &&
                        option === question.correct
                          ? 'tf-correct'
                          : selected === option
                            ? 'tf-incorrect'
                            : ''
                      }
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h3>
                  Write the English word for:
                </h3>

                <p className="tf-quiz-meaning">
                  {question.meaning}
                </p>

                <form
                  onSubmit={(event) => {
                    event.preventDefault()
                    submitAnswer(textAnswer)
                  }}
                >
                  <input
                    type="text"
                    value={textAnswer}
                    onChange={(event) =>
                      setTextAnswer(event.target.value)
                    }
                    disabled={selected !== null}
                    placeholder="Type the English word..."
                    autoComplete="off"
                    className="tf-quiz-input"
                  />

                  <button
                    type="submit"
                    disabled={
                      selected !== null ||
                      !textAnswer.trim()
                    }
                  >
                    Check Answer
                  </button>
                </form>
              </>
            )}

            {selected !== null && (
              <div className="tf-quiz-feedback">
                <p role="status">
                  {normalizeAnswer(selected) ===
                  normalizeAnswer(question.correct)
                    ? '✅ Correct!'
                    : `❌ Incorrect. Correct answer: ${question.correct}`}
                </p>

                <button
                  type="button"
                  onClick={nextQuestion}
                >
                  {questionIndex + 1 === questions.length
                    ? 'See Result'
                    : 'Next Question →'}
                </button>
              </div>
            )}
          </div>
        ) : null}

        <div className="tf-quiz-history">
          <h3>📊 Quiz History</h3>

          {history.length === 0 ? (
            <p>No completed quizzes yet.</p>
          ) : (
            <div className="tf-history-list">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="tf-history-item"
                >
                  <strong>
                    {item.type === 'fill'
                      ? 'Fill in the Blank'
                      : 'Multiple Choice'}
                  </strong>

                  <span>
                    {item.score}/{item.total} ·
                    {' '}{item.accuracy}%
                  </span>

                  <small>
                    {new Date(item.date).toLocaleString(
                      'vi-VN'
                    )}
                  </small>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    )
  }

  return null
}

export default FlashcardsQuiz
