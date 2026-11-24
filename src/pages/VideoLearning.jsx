
import { useEffect, useState } from 'react'

import VideoPlayer from '../components/VideoPlayer'
import YouTubeEmbed from '../components/YouTubeEmbed'
import InteractiveTranscript from '../components/InteractiveTranscript'
import PhraseLearning from '../components/PhraseLearning'
import AISentencePractice from '../components/AISentencePractice'
import FlashcardsQuiz from '../components/FlashcardsQuiz'

import { findVocabulary } from '../data/vocabulary'
import { findPhrase } from '../data/phraseData'
import { lookupWord } from '../data/dictionaryService'

import SavedVocabulary from './SavedVocabulary'

// Giữ cấu hình bài học cũ để không mất chức năng
const lessons = {
  Education: {
    B1: {
      title: 'Students Talk About Wikipedia',
      video: '/videos/education-b1.webm',
      subtitles: '/subtitles/education-b1.vtt',
    },
  },
}

function VideoLearning({ topic, level, videoOnly = false }) {
  const [selectedWord, setSelectedWord] = useState('')
  const [wordDetails, setWordDetails] = useState(null)
  const [savedMessage, setSavedMessage] = useState('')
  const [showSaved, setShowSaved] = useState(false)
  const [lookupStatus, setLookupStatus] = useState('')
  const [lookupRequest, setLookupRequest] = useState(0)

  // Thời gian phát hiện tại của video YouTube
  const [currentTime, setCurrentTime] = useState(0)

  // Video YouTube được lưu riêng cho từng chủ đề
  const [youtubeId, setYoutubeId] = useState(() => {
    try {
      return (
        localStorage.getItem(`topicflix_youtube_${topic}`) || ''
      )
    } catch {
      return ''
    }
  })

  useEffect(() => {
    try {
      setYoutubeId(
        localStorage.getItem(`topicflix_youtube_${topic}`) || ''
      )
    } catch {
      setYoutubeId('')
    }

    setCurrentTime(0)
    setSelectedWord('')
    setWordDetails(null)
    setSavedMessage('')
    setLookupStatus('')
  }, [topic])

  const lesson = lessons[topic]?.[level]

  // Tra cứu từ hoặc cụm từ trong phụ đề
  const handleWordClick = (word) => {
    const cleanWord = word.trim()
    if (!cleanWord) return

    const localWord =
      findPhrase(cleanWord) || findVocabulary(cleanWord)

    setSelectedWord(cleanWord)
    setWordDetails(localWord)
    setSavedMessage('')

    if (localWord) {
      setLookupStatus('')
    } else {
      setLookupStatus('Looking up this word...')
      setLookupRequest((previous) => previous + 1)
    }
  }

  // Tra từ điển trực tuyến nếu chưa có dữ liệu
  useEffect(() => {
    if (!selectedWord) return

    const localWord =
      findPhrase(selectedWord) || findVocabulary(selectedWord)

    if (localWord) return

    let cancelled = false

    lookupWord(selectedWord)
      .then((result) => {
        if (cancelled) return

        setWordDetails(result)
        setLookupStatus('')
      })
      .catch((error) => {
        if (cancelled) return

        setWordDetails(null)
        setLookupStatus(
          error.message || 'Unable to look up this word.'
        )
      })

    return () => {
      cancelled = true
    }
  }, [selectedWord, lookupRequest])

  // Phát âm từ tiếng Anh
  const pronounceWord = (word) => {
    if (!('speechSynthesis' in window)) {
      setSavedMessage('Pronunciation is not supported.')
      return
    }

    window.speechSynthesis.cancel()

    const speech = new SpeechSynthesisUtterance(word)
    speech.lang = 'en-US'
    speech.rate = 0.85
    window.speechSynthesis.speak(speech)
  }

  // Lưu từ vựng
  const saveVocabulary = () => {
    if (!wordDetails) return

    try {
      const saved = JSON.parse(
        localStorage.getItem('topicflix_vocabulary') || '[]'
      )

      const words = Array.isArray(saved) ? saved : []

      const exists = words.some(
        (item) =>
          item.word.toLowerCase() ===
          wordDetails.word.toLowerCase()
      )

      if (exists) {
        setSavedMessage(
          'This word or phrase is already saved.'
        )
        return
      }

      const updatedWords = [
        ...words,
        {
          ...wordDetails,
          topic,
          level,
          savedAt: new Date().toISOString(),
        },
      ]

      localStorage.setItem(
        'topicflix_vocabulary',
        JSON.stringify(updatedWords)
      )

      setSavedMessage('Vocabulary saved successfully!')
    } catch {
      setSavedMessage('Unable to save vocabulary.')
    }
  }

  return (
    <main className="video-learning-page">
      <h1>Video Learning</h1>

      {/* Giữ nguyên trang My Vocabulary cũ */}
      {!videoOnly && (
        <>
          <button
            type="button"
            className="tf-my-vocabulary-btn"
            onClick={() =>
              setShowSaved((previous) => !previous)
            }
          >
            📚 {showSaved
              ? 'Hide My Vocabulary'
              : 'My Vocabulary'}
          </button>

          {showSaved && (
            <SavedVocabulary
              onClose={() => setShowSaved(false)}
            />
          )}
        </>
      )}

      <p>
        Topic: <strong>{topic}</strong>
        {level && (
          <>
            {' | '}Level: <strong>{level}</strong>
          </>
        )}
      </p>

      {/* YouTube giữ chức năng nhập và lưu link */}
      <YouTubeEmbed
        topic={topic}
        videoId={youtubeId}
        onTimeUpdate={setCurrentTime}
        onVideoChange={(id) => {
          setYoutubeId(id)
          setCurrentTime(0)
          setSelectedWord('')
          setWordDetails(null)
          setLookupStatus('')
        }}
      />

      {/* Phụ đề đồng bộ theo thời gian phát YouTube */}
      {youtubeId && (
        <InteractiveTranscript
          topic={topic}
          currentTime={currentTime}
          onWordClick={handleWordClick}
        />
      )}

      {/* Giữ video cục bộ cũ */}
      {!youtubeId && lesson && (
        <>
          <h2>{lesson.title}</h2>

          <VideoPlayer
            videoSrc={lesson.video}
            subtitleSrc={lesson.subtitles}
            onWordClick={handleWordClick}
          />
        </>
      )}

      {!youtubeId && !lesson && (
        <p>
          This topic does not have a local video yet.
          Add a YouTube video above to start learning.
        </p>
      )}

      {/* Giữ bảng tra từ, phát âm và lưu từ vựng */}
      {selectedWord && (
        <section className="word-details">
          {wordDetails ? (
            <>
              <h2>{wordDetails.word}</h2>

              <p>
                <strong>Category:</strong>{' '}
                {wordDetails.type}
              </p>

              <p>
                <strong>IPA:</strong>{' '}
                {wordDetails.ipa || 'Not available'}
              </p>

              <p>
                <strong>Part of Speech:</strong>{' '}
                {wordDetails.partOfSpeech || 'Not available'}
              </p>

              <h3>English Definition</h3>
              <p>{wordDetails.definition}</p>

              <h3>Vietnamese Meaning</h3>
              <p>{wordDetails.vietnamese}</p>

              <h3>Example</h3>
              <p>{wordDetails.example}</p>

              <div className="vocabulary-actions">
                <button
                  type="button"
                  onClick={() =>
                    pronounceWord(wordDetails.word)
                  }
                >
                  🔊 Pronunciation
                </button>

                <button
                  type="button"
                  onClick={saveVocabulary}
                >
                  + Save Vocabulary
                </button>
              </div>

              {savedMessage && (
                <p role="status">{savedMessage}</p>
              )}
            </>
          ) : (
            <>
              <h2>{selectedWord}</h2>

              <p role="status">
                {lookupStatus ||
                  'This word or phrase could not be found.'}
              </p>
            </>
          )}
        </section>
      )}

      {/* Giữ nguyên các chức năng học tập khác */}
      {!videoOnly && (
        <>
          <PhraseLearning topic={topic} level={level} />

          <AISentencePractice
            topic={topic}
            level={level}
          />

          <FlashcardsQuiz />
        </>
      )}
    </main>
  )
}

export default VideoLearning
