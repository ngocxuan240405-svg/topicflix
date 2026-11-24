
import { useEffect, useId, useRef, useState } from 'react'

function getYouTubeId(link) {
  try {
    const url = new URL(link.trim())
    const host = url.hostname.toLowerCase().replace(/^www\./, '')
    let id = ''

    if (host === 'youtu.be') {
      id = url.pathname.split('/')[1]
    } else if (
      host === 'youtube.com' ||
      host === 'm.youtube.com' ||
      host === 'youtube-nocookie.com'
    ) {
      if (url.pathname === '/watch') {
        id = url.searchParams.get('v')
      } else if (
        url.pathname.startsWith('/shorts/') ||
        url.pathname.startsWith('/embed/') ||
        url.pathname.startsWith('/live/')
      ) {
        id = url.pathname.split('/')[2]
      }
    }

    return /^[a-zA-Z0-9_-]{11}$/.test(id || '') ? id : null
  } catch {
    return null
  }
}

function YouTubeEmbed({
  topic,
  videoId,
  onVideoChange,
  onTimeUpdate,
}) {
  const [link, setLink] = useState('')
  const [message, setMessage] = useState('')
  const [playerError, setPlayerError] = useState('')

  const generatedId = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const playerId = `topicflix-player-${generatedId}`

  const onTimeUpdateRef = useRef(onTimeUpdate)
  onTimeUpdateRef.current = onTimeUpdate

  useEffect(() => {
    if (!videoId) return

    let cancelled = false
    let player = null
    let setupTimer = null
    let playbackTimer = null

    setPlayerError('')
    onTimeUpdateRef.current?.(0)

    // Chỉ nạp API một lần, không cần cài thư viện.
    if (
      !window.YT?.Player &&
      !document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      )
    ) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      script.async = true
      document.head.appendChild(script)
    }

    const startPlayer = () => {
      if (cancelled || player || !window.YT?.Player) return

      const container = document.getElementById(playerId)
      if (!container) return

      try {
        player = new window.YT.Player(playerId, {
          width: '100%',
          height: '100%',
          videoId,
          host: 'https://www.youtube-nocookie.com',
          playerVars: {
            autoplay: 0,
            controls: 1,
            playsinline: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (event) => {
              if (cancelled) return

              const updateTime = () => {
                if (cancelled) return

                try {
                  const seconds = event.target.getCurrentTime()

                  if (Number.isFinite(seconds)) {
                    onTimeUpdateRef.current?.(seconds)
                  }
                } catch {
                  // Video có thể chưa sẵn sàng.
                }
              }

              updateTime()
              playbackTimer = window.setInterval(updateTime, 300)
            },

            onError: () => {
              if (!cancelled) {
                setPlayerError(
                  'YouTube could not play this video.'
                )
              }
            },
          },
        })
      } catch {
        if (!cancelled) {
          setPlayerError('Unable to initialize YouTube player.')
        }
      }
    }

    // Chờ YouTube API tải xong, sau đó khởi tạo player.
    setupTimer = window.setInterval(() => {
      if (window.YT?.Player) {
        window.clearInterval(setupTimer)
        startPlayer()
      }
    }, 200)

    startPlayer()

    return () => {
      cancelled = true
      window.clearInterval(setupTimer)
      window.clearInterval(playbackTimer)

      try {
        player?.destroy()
      } catch {
        // Không ảnh hưởng các chức năng khác.
      }
    }
  }, [videoId, playerId])

  const handleSave = (event) => {
    event.preventDefault()

    const id = getYouTubeId(link)

    if (!id) {
      setMessage('Invalid YouTube link. Please try again.')
      return
    }

    try {
      localStorage.setItem(`topicflix_youtube_${topic}`, id)
      onVideoChange(id)
      setMessage('Video added successfully!')
      setLink('')
    } catch {
      setMessage('Unable to save video in this browser.')
    }
  }

  return (
    <section className="tf-youtube-section">
      <h2>🎬 Watch Video – {topic}</h2>

      {videoId ? (
        <div className="tf-youtube-frame">
          <div
            key={videoId}
            id={playerId}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      ) : (
        <p>No video has been added for this topic yet.</p>
      )}

      {playerError && (
        <p role="alert">{playerError}</p>
      )}

      <form
        className="tf-youtube-form"
        onSubmit={handleSave}
      >
        <label htmlFor="youtube-link">
          Add a YouTube video for this topic
        </label>

        <input
          id="youtube-link"
          type="url"
          value={link}
          onChange={(event) => setLink(event.target.value)}
          placeholder="Paste YouTube URL here..."
          required
        />

        <button type="submit">
          Save &amp; Embed Video
        </button>
      </form>

      {message && <p role="status">{message}</p>}
    </section>
  )
}

export default YouTubeEmbed
