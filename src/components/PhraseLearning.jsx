
import { useState } from 'react'
import { findPhrase, phraseData } from '../data/phraseData'

function PhraseLearning({ topic, level }) {
  const [input, setInput] = useState('')
  const [details, setDetails] = useState(null)
  const [message, setMessage] = useState('')

  const searchPhrase = (event) => {
    event.preventDefault()

    const phrase = findPhrase(input)
    setDetails(phrase)

    setMessage(
      phrase
        ? ''
        : 'This phrase is not in the phrase database yet.'
    )
  }

  const selectPhrase = (phrase) => {
    setInput(phrase.word)
    setDetails(phrase)
    setMessage('')
  }

  const pronounce = () => {
    if (!details) return

    if (!('speechSynthesis' in window)) {
      setMessage('Pronunciation is not supported.')
      return
    }

    window.speechSynthesis.cancel()

    const speech = new SpeechSynthesisUtterance(details.word)
    speech.lang = 'en-US'
    speech.rate = 0.85

    window.speechSynthesis.speak(speech)
  }

  const savePhrase = () => {
    if (!details) return

    try {
      const saved = JSON.parse(
        localStorage.getItem('topicflix_vocabulary') || '[]'
      )

      const words = Array.isArray(saved) ? saved : []

      const exists = words.some(
        (item) =>
          item.word.toLowerCase() ===
          details.word.toLowerCase()
      )

      if (exists) {
        setMessage('This phrase is already saved.')
        return
      }

      const updated = [
        ...words,
        {
          ...details,
          topic,
          level,
          savedAt: new Date().toISOString(),
        },
      ]

      localStorage.setItem(
        'topicflix_vocabulary',
        JSON.stringify(updated)
      )

      setMessage('Phrase saved successfully!')
    } catch {
      setMessage('Unable to save this phrase.')
    }
  }

  return (
    <section className="tf-phrase-learning">
      <h2>📖 Collocations & Idioms</h2>

      <p>Learn useful English phrases and expressions.</p>

      <form
        className="tf-phrase-search"
        onSubmit={searchPhrase}
      >
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Enter a phrase..."
        />

        <button type="submit">
          Search Phrase
        </button>
      </form>

      <h3>Suggested Phrases</h3>

      <div className="tf-phrase-suggestions">
        {Object.values(phraseData).map((phrase) => (
          <button
            key={phrase.word}
            type="button"
            onClick={() => selectPhrase(phrase)}
          >
            {phrase.word}
          </button>
        ))}
      </div>

      {details && (
        <article className="tf-phrase-details">
          <h3>{details.word}</h3>

          <p><strong>Category:</strong> {details.type}</p>
          <p><strong>IPA:</strong> {details.ipa}</p>
          <p>
            <strong>Part of Speech:</strong> {details.partOfSpeech}
          </p>
          <p>
            <strong>English Definition:</strong> {details.definition}
          </p>
          <p>
            <strong>Vietnamese Meaning:</strong> {details.vietnamese}
          </p>
          <p><strong>Example:</strong> {details.example}</p>

          <div className="tf-phrase-actions">
            <button type="button" onClick={pronounce}>
              🔊 Pronunciation
            </button>

            <button type="button" onClick={savePhrase}>
              + Save Phrase
            </button>
          </div>
        </article>
      )}

      {message && <p role="status">{message}</p>}
    </section>
  )
}

export default PhraseLearning
