
import { useState } from 'react'

const STORAGE_KEY = 'topicflix_vocabulary'

function readSavedWords() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

function SavedVocabulary({ onClose }) {
  const [words, setWords] = useState(readSavedWords)
  const [filter, setFilter] = useState('All')

  const filteredWords = words.filter(
    (item) => filter === 'All' || item.type === filter
  )

  const remembered = words.filter((item) => item.remembered).length

  const pronounce = (word) => {
    if (!('speechSynthesis' in window)) return

    window.speechSynthesis.cancel()
    const speech = new SpeechSynthesisUtterance(word)
    speech.lang = 'en-US'
    speech.rate = 0.85
    window.speechSynthesis.speak(speech)
  }

  const toggleRemembered = (word) => {
    const updated = words.map((item) =>
      item.word.toLowerCase() === word.toLowerCase()
        ? { ...item, remembered: !item.remembered }
        : item
    )

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      setWords(updated)
    } catch {
      alert('Unable to update learning progress.')
    }
  }

  return (
    <section className="tf-saved">
      <div className="tf-saved-header">
        <h2>📚 My Vocabulary</h2>
        <button type="button" onClick={onClose}>
          ← Back to Video
        </button>
      </div>

      <div className="tf-saved-stats">
        <p><strong>{words.length}</strong> Saved Words</p>
        <p><strong>{remembered}</strong> Remembered</p>
        <p>
          <strong>{words.length - remembered}</strong> To Review
        </p>
      </div>

      <div className="tf-saved-filters">
        {['All', 'Vocabulary', 'Collocation', 'Idiom'].map((item) => (
          <button
            type="button"
            key={item}
            className={filter === item ? 'selected' : ''}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {filteredWords.length === 0 ? (
        <p>No saved words in this category yet.</p>
      ) : (
        <div className="tf-saved-list">
          {filteredWords.map((item, index) => (
            <article
              className="tf-saved-card"
              key={`${item.word}-${index}`}
            >
              <h3>{item.word}</h3>
              <p><strong>Category:</strong> {item.type}</p>
              <p><strong>IPA:</strong> {item.ipa || 'Not available'}</p>
              <p>
                <strong>Part of Speech:</strong>{' '}
                {item.partOfSpeech || 'Not available'}
              </p>

              <p><strong>English Definition:</strong></p>
              <p>{item.definition || 'Not available'}</p>

              <p><strong>Vietnamese Meaning:</strong></p>
              <p>{item.vietnamese || 'Not available'}</p>

              <p><strong>Example:</strong></p>
              <p>{item.example || 'Not available'}</p>

              <p>
                <strong>Lesson:</strong> {item.topic} – {item.level}
              </p>

              <div className="tf-saved-actions">
                <button
                  type="button"
                  onClick={() => pronounce(item.word)}
                >
                  🔊 Pronunciation
                </button>

                <button
                  type="button"
                  onClick={() => toggleRemembered(item.word)}
                >
                  {item.remembered
                    ? '✓ Remembered'
                    : 'Mark as Remembered'}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default SavedVocabulary
