
import { useEffect, useRef, useState } from 'react'

function parseVTT(content) {
  const blocks = content
    .replace(/^\uFEFF/, '')
    .replace(/\r/g, '')
    .split(/\n\s*\n/)

  const toSeconds = (time) => {
    const parts = time.replace(',', '.').split(':')
    const seconds = parts.reduce(
      (total, part) => total * 60 + Number(part),
      0
    )
    return seconds
  }

  const result = []

  for (const block of blocks) {
    const lines = block.trim().split('\n')
    const timeIndex = lines.findIndex((line) => line.includes('-->'))

    if (timeIndex === -1) continue

    const [startText, endText] = lines[timeIndex].split('-->')

    if (!startText || !endText) continue

    const start = toSeconds(startText.trim())
    const end = toSeconds(endText.trim().split(/\s+/)[0])
    const text = lines
      .slice(timeIndex + 1)
      .join(' ')
      .replace(/<[^>]*>/g, '')
      .trim()

    if (
      Number.isFinite(start) &&
      Number.isFinite(end) &&
      end > start &&
      text
    ) {
      result.push({ start, end, text })
    }
  }

  return result
}

function VideoPlayer({
  videoSrc,
  subtitleSrc = '/subtitles/education-b1.vtt',
  onWordClick,
}) {
  const videoRef = useRef(null)
  const phraseAnchorRef = useRef(null)

  const [currentTime, setCurrentTime] = useState(0)
  const [showSubtitles, setShowSubtitles] = useState(true)
  const [speed, setSpeed] = useState(1)
  const [subtitles, setSubtitles] = useState([])
  const [subtitleError, setSubtitleError] = useState('')

  const [selectedPhrase, setSelectedPhrase] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadSubtitles() {
      setSubtitles([])
      setSubtitleError('')

      try {
        const response = await fetch(subtitleSrc, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Subtitle file could not be loaded.')
        }

        const content = await response.text()

        if (!content.trimStart().startsWith('WEBVTT')) {
          throw new Error('Invalid WebVTT subtitle format.')
        }

        const parsed = parseVTT(content)

        if (parsed.length === 0) {
          throw new Error('No valid subtitles were found.')
        }

        setSubtitles(parsed)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setSubtitleError(error.message)
        }
      }
    }

    if (subtitleSrc) {
      loadSubtitles()
    }

    return () => controller.abort()
  }, [subtitleSrc])

  const activeSubtitle = subtitles.find(
    (item) =>
      currentTime >= item.start &&
      currentTime < item.end
  )

  const changeSpeed = (value) => {
    const newSpeed = Number(value)
    setSpeed(newSpeed)

    if (videoRef.current) {
      videoRef.current.playbackRate = newSpeed
    }
  }

  // Tra cứu một từ riêng lẻ
  const handleWordClick = (word) => {
    const cleanWord = word
      .replace(/^[^\p{L}]+|[^\p{L}]+$/gu, '')
      .trim()

    if (cleanWord && onWordClick) {
      onWordClick(cleanWord)
    }
  }

  // Chọn nhiều từ liên tiếp bằng Shift + Click
  const handleSubtitleClick = (word, index, event) => {
    if (!activeSubtitle) return

    const anchor = phraseAnchorRef.current

    if (
      event.shiftKey &&
      anchor &&
      anchor.subtitleStart === activeSubtitle.start
    ) {
      const tokens = activeSubtitle.text.split(/(\s+)/)

      const from = Math.min(anchor.index, index)
      const to = Math.max(anchor.index, index)

      const phrase = tokens
        .slice(from, to + 1)
        .join('')
        .trim()
        .replace(/^[^\p{L}]+|[^\p{L}]+$/gu, '')

      phraseAnchorRef.current = null

      if (phrase) {
        setSelectedPhrase(phrase)

        if (onWordClick) {
          onWordClick(phrase)
        }
      }

      return
    }

    // Click thường: chọn một từ như trước
    phraseAnchorRef.current = {
      index,
      subtitleStart: activeSubtitle.start,
    }

    setSelectedPhrase('')
    handleWordClick(word)
  }

  const replayVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    }
  }

  const rewindVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        0,
        videoRef.current.currentTime - 10
      )
    }
  }

  return (
    <div className="video-learning-player">
      <video
        key={videoSrc}
        ref={videoRef}
        src={videoSrc}
        controls
        width="100%"
        preload="metadata"
        onTimeUpdate={(event) =>
          setCurrentTime(event.currentTarget.currentTime)
        }
      />

      <div className="video-controls">
        <button
          type="button"
          onClick={rewindVideo}
        >
          ↶ Back 10s
        </button>

        <button
          type="button"
          onClick={replayVideo}
        >
          ↻ Replay
        </button>

        <button
          type="button"
          onClick={() =>
            setShowSubtitles((previous) => !previous)
          }
        >
          Subtitles: {showSubtitles ? 'ON' : 'OFF'}
        </button>

        <label>
          Playback Speed:{' '}
          <select
            value={speed}
            onChange={(event) =>
              changeSpeed(event.target.value)
            }
          >
            <option value="0.75">0.75x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
          </select>
        </label>
      </div>

      {subtitleError && (
        <p role="alert" className="subtitle-error">
          Subtitle error: {subtitleError}
        </p>
      )}

      {showSubtitles && (
        <>
          <div
            className="interactive-subtitles"
            aria-label="Interactive English subtitles"
          >
            {activeSubtitle ? (
              activeSubtitle.text
                .split(/(\s+)/)
                .map((word, index) =>
                  word.trim() ? (
                    <button
                      type="button"
                      key={index}
                      className="subtitle-word"
                      onClick={(event) =>
                        handleSubtitleClick(
                          word,
                          index,
                          event
                        )
                      }
                      title="Click for a word; Shift + Click for a phrase"
                    >
                      {word}
                    </button>
                  ) : (
                    <span key={index}>{word}</span>
                  )
                )
            ) : (
              <span>
                {subtitles.length === 0 && !subtitleError
                  ? 'Loading subtitles...'
                  : 'No subtitles at this moment.'}
              </span>
            )}
          </div>

          <p className="tf-subtitle-guide">
            💡 Click a word to look it up.
            To select a phrase, click the first word,
            then hold Shift and click the last word.
          </p>

          {selectedPhrase && (
            <p className="tf-selected-phrase">
              Selected phrase: <strong>{selectedPhrase}</strong>
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default VideoPlayer
