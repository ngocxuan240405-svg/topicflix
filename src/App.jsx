
import { useState } from 'react'
import './App.css'

import VideoLearning from './pages/VideoLearning'
import SavedVocabulary from './pages/SavedVocabulary'
import PhraseLearning from './components/PhraseLearning'
import AISentencePractice from './components/AISentencePractice'
import FlashcardsQuiz from './components/FlashcardsQuiz'
import VideoListeningTest from './components/VideoListeningTest'

// Bước 15: Trang theo dõi tiến độ học
import LearningProgress from './components/LearningProgress'

// 8 chủ đề chính thức của TopicFlix
const topics = [
  { name: 'Daily Conversations', icon: '💬' },
  { name: 'Travel & Tourism', icon: '✈️' },
  { name: 'Business & Career', icon: '💼' },
  { name: 'Education', icon: '📚' },
  { name: 'Technology', icon: '💻' },
  { name: 'Food & Lifestyle', icon: '🍔' },
  { name: 'Movies & Entertainment', icon: '🎬' },
  { name: 'Environment', icon: '🌍' },
]

// Giữ 7 tab cũ, bổ sung Learning Progress
const learningTabs = [
  { id: 'video', label: 'Video Learning', icon: '🎬' },
  { id: 'listening-test', label: 'Video Listening Test', icon: '🎧' },
  { id: 'vocabulary', label: 'My Vocabulary', icon: '📚' },
  { id: 'phrases', label: 'Collocations & Idioms', icon: '📖' },
  { id: 'ai', label: 'AI Sentence Practice', icon: '🤖' },
  { id: 'flashcards', label: 'Flashcards', icon: '🃏' },
  { id: 'quiz', label: 'Quiz', icon: '📝' },
  { id: 'progress', label: 'Learning Progress', icon: '📊' },
]

function App() {
  const [topic, setTopic] = useState(null)
  const [page, setPage] = useState('home')
  const [activeTab, setActiveTab] = useState('video')

  // Trình độ chưa được đánh giá trước khi làm bài
  const level = null

  // Chọn chủ đề là mở video ngay
  const handleTopicSelect = (selectedTopic) => {
    setTopic(selectedTopic)
    setActiveTab('video')
    setPage('learning')
    window.scrollTo(0, 0)
  }

  // Quay về trang chọn chủ đề
  const handleBackToTopics = () => {
    setPage('home')
    setActiveTab('video')
    window.scrollTo(0, 0)
  }

  // Chuyển giữa các trang chức năng
  const changeTab = (tab) => {
    setActiveTab(tab)
    window.scrollTo(0, 0)
  }

  return (
    <div className="app">
      {/* Header cũ */}
      <header className="header">
        <h1>🎬 TopicFlix</h1>
        <p>Learn English Through Videos</p>
      </header>

      {page === 'home' ? (
        /* Trang chủ */
        <main className="main">
          <section className="topic-section">
            <h2>Choose Your Learning Topic</h2>

            <p>
              Select a topic to start watching,
              listening and learning English.
            </p>

            <div className="topics">
              {topics.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  className={
                    topic === item.name ? 'selected' : ''
                  }
                  onClick={() =>
                    handleTopicSelect(item.name)
                  }
                >
                  <span className="topic-icon">
                    {item.icon}
                  </span>

                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </section>
        </main>
      ) : (
        /* Khu vực học tập */
        <main className="main tf-learning-workspace">
          {/* Quay về trang chủ */}
          <div className="tf-workspace-top">
            <button
              type="button"
              className="back-button"
              onClick={handleBackToTopics}
            >
              ← Back to Topics
            </button>

            <p className="tf-current-lesson">
              {topic}
            </p>
          </div>

          {/* Thanh điều hướng */}
          <nav
            className="tf-learning-nav"
            aria-label="Learning navigation"
          >
            {learningTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={
                  activeTab === tab.id
                    ? 'tf-nav-active'
                    : ''
                }
                aria-current={
                  activeTab === tab.id
                    ? 'page'
                    : undefined
                }
                onClick={() =>
                  changeTab(tab.id)
                }
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Nội dung của từng trang */}
          <div className="tf-learning-content">

            {/* Video và phụ đề tương tác */}
            {activeTab === 'video' && (
              <VideoLearning
                topic={topic}
                level={level}
                videoOnly
              />
            )}

            {/* Bài kiểm tra nghe hiểu */}
            {activeTab === 'listening-test' && (
              <VideoListeningTest
                key={topic}
                topic={topic}
              />
            )}

            {/* Từ vựng đã lưu */}
            {activeTab === 'vocabulary' && (
              <SavedVocabulary
                onClose={() => changeTab('video')}
              />
            )}

            {/* Collocations và Idioms */}
            {activeTab === 'phrases' && (
              <PhraseLearning
                topic={topic}
                level={level}
              />
            )}

            {/* Gemini AI Sentence Practice */}
            {activeTab === 'ai' && (
              <AISentencePractice
                topic={topic}
                level={level}
              />
            )}

            {/* Flashcards cũ */}
            {activeTab === 'flashcards' && (
              <FlashcardsQuiz
                view="flashcards"
              />
            )}

            {/* Quiz từ vựng cũ */}
            {activeTab === 'quiz' && (
              <FlashcardsQuiz
                view="quiz"
              />
            )}

            {/* Bước 15: Learning Progress */}
            {activeTab === 'progress' && (
              <LearningProgress />
            )}

          </div>
        </main>
      )}
    </div>
  )
}

export default App
