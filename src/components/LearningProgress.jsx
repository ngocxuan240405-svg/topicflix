
import { useState } from 'react'

const HISTORY_KEY = 'topicflix_listening_test_history'

const levelNames = {
  B1: 'Intermediate',
  B2: 'Upper Intermediate',
  C1: 'Advanced',
}

function getLevel(record) {
  const value = String(
    record.estimatedLevel || record.level || ''
  ).toUpperCase()

  if (value.startsWith('C1')) return 'C1'
  if (value.startsWith('B2')) return 'B2'
  if (value.startsWith('B1')) return 'B1'

  return 'Not determined'
}

function formatDate(value) {
  if (!value) return 'Unknown date'

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'Unknown date'
  }

  return date.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function readHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw)

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed
      .filter((item) => {
        return (
          item &&
          typeof item === 'object' &&
          typeof item.topic === 'string' &&
          Number.isFinite(Number(item.score)) &&
          Number.isFinite(Number(item.total)) &&
          Number(item.total) > 0
        )
      })
      .map((item) => ({
        ...item,
        score: Number(item.score),
        total: Number(item.total),
      }))
      .sort((a, b) => {
        const timeA = new Date(a.completedAt || 0).getTime()
        const timeB = new Date(b.completedAt || 0).getTime()

        return (timeB || 0) - (timeA || 0)
      })
  } catch {
    return []
  }
}

function getPercentage(record) {
  if (!record || !record.total) return 0

  return Math.max(
    0,
    Math.min(
      100,
      Math.round((record.score / record.total) * 100)
    )
  )
}

function getTierScore(record, level) {
  const value = record?.scores?.[level]

  if (
    !value ||
    !Number.isFinite(Number(value.correct)) ||
    !Number.isFinite(Number(value.total)) ||
    Number(value.total) <= 0
  ) {
    return '—'
  }

  return `${value.correct}/${value.total}`
}

function LearningProgress() {
  const [history, setHistory] = useState(readHistory)

  // Đọc lại kết quả mà không tải lại website
  function refreshProgress() {
    setHistory(readHistory())
  }

  const totalTests = history.length

  const averageScore = totalTests
    ? Math.round(
        history.reduce(
          (sum, item) => sum + getPercentage(item),
          0
        ) / totalTests
      )
    : 0

  const bestScore = totalTests
    ? Math.max(...history.map(getPercentage))
    : 0

  const latest = history[0] || null
  const latestLevel = latest
    ? getLevel(latest)
    : 'Not determined'

  // Biểu đồ tối đa 10 lần kiểm tra gần nhất
  const chartData = history
    .slice(0, 10)
    .reverse()

  // Thống kê riêng theo từng chủ đề
  const topicMap = {}

  history.forEach((record) => {
    if (!topicMap[record.topic]) {
      topicMap[record.topic] = {
        topic: record.topic,
        attempts: 0,
        sum: 0,
        best: 0,
        latest: record,
      }
    }

    const stats = topicMap[record.topic]
    const percentage = getPercentage(record)

    stats.attempts += 1
    stats.sum += percentage
    stats.best = Math.max(stats.best, percentage)
  })

  const topicStats = Object.values(topicMap).map(
    (item) => ({
      ...item,
      average: Math.round(item.sum / item.attempts),
    })
  )

  return (
    <section className="tf-progress-page">
      <div className="tf-progress-heading">
        <div>
          <h2>📊 Learning Progress</h2>
          <p>
            Track your listening test results
            and English learning progress.
          </p>
        </div>

        <button
          type="button"
          className="tf-progress-refresh"
          onClick={refreshProgress}
        >
          🔄 Refresh
        </button>
      </div>

      {totalTests === 0 ? (
        <div className="tf-progress-empty">
          <h3>📚 No listening tests completed yet</h3>

          <p>
            Watch a video, open Video Listening Test,
            answer all 15 questions and submit your
            answers to see your learning progress here.
          </p>
        </div>
      ) : (
        <>
          {/* Thẻ thống kê tổng quan */}
          <div className="tf-progress-summary">
            <div className="tf-progress-stat">
              <span className="tf-progress-stat-icon">📝</span>
              <strong>{totalTests}</strong>
              <span>Completed Tests</span>
            </div>

            <div className="tf-progress-stat">
              <span className="tf-progress-stat-icon">📈</span>
              <strong>{averageScore}%</strong>
              <span>Average Score</span>
            </div>

            <div className="tf-progress-stat">
              <span className="tf-progress-stat-icon">🏆</span>
              <strong>{bestScore}%</strong>
              <span>Best Score</span>
            </div>

            <div className="tf-progress-stat">
              <span className="tf-progress-stat-icon">🎓</span>
              <strong>{latestLevel}</strong>
              <span>Latest Estimated Level</span>
            </div>
          </div>

          {/* Kết quả mới nhất */}
          <div className="tf-progress-panel">
            <h3>🎯 Latest Listening Assessment</h3>

            <p>
              <strong>Topic:</strong> {latest.topic}
            </p>

            <p>
              <strong>Result:</strong>{' '}
              {latest.score}/{latest.total} correct
              {' · '}
              {getPercentage(latest)}%
            </p>

            <p>
              <strong>Estimated performance:</strong>{' '}
              {latestLevel}
              {levelNames[latestLevel]
                ? ` – ${levelNames[latestLevel]}`
                : ''}
            </p>

            <div className="tf-progress-tiers">
              {['B1', 'B2', 'C1'].map((level) => (
                <div
                  key={level}
                  className="tf-progress-tier"
                >
                  <strong>{level}</strong>
                  <span>
                    {getTierScore(latest, level)}
                  </span>
                </div>
              ))}
            </div>

            <p className="tf-progress-note">
              The level is an estimate based on
              the latest video listening exercise,
              not an official CEFR assessment.
            </p>
          </div>

          {/* Biểu đồ điểm theo thời gian */}
          <div className="tf-progress-panel">
            <h3>📈 Score History</h3>

            <p className="tf-progress-description">
              Your latest {chartData.length} test
              results, from oldest to newest.
            </p>

            <div
              className="tf-progress-chart"
              role="img"
              aria-label={
                'Scores over time: ' +
                chartData
                  .map(
                    (record) =>
                      `${record.topic} ${getPercentage(record)}%`
                  )
                  .join(', ')
              }
            >
              {chartData.map((record, index) => (
                <div
                  className="tf-progress-chart-item"
                  key={`${record.completedAt}-${index}`}
                  title={`${record.topic}: ${getPercentage(record)}%`}
                >
                  <span className="tf-progress-chart-score">
                    {getPercentage(record)}%
                  </span>

                  <div className="tf-progress-chart-track">
                    <div
                      className="tf-progress-chart-bar"
                      style={{
                        height: `${getPercentage(record)}%`,
                      }}
                    />
                  </div>

                  <span className="tf-progress-chart-label">
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>

            <p className="tf-progress-note">
              Each bar represents one listening
              test attempt. Tests may be from
              different topics.
            </p>
          </div>

          {/* Thống kê từng chủ đề */}
          <div className="tf-progress-panel">
            <h3>📚 Progress by Topic</h3>

            <div className="tf-progress-table-wrap">
              <table className="tf-progress-table">
                <thead>
                  <tr>
                    <th>Topic</th>
                    <th>Attempts</th>
                    <th>Average</th>
                    <th>Best</th>
                  </tr>
                </thead>

                <tbody>
                  {topicStats.map((item) => (
                    <tr key={item.topic}>
                      <td>{item.topic}</td>
                      <td>{item.attempts}</td>
                      <td>{item.average}%</td>
                      <td>{item.best}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Lịch sử chi tiết */}
          <div className="tf-progress-panel">
            <h3>🕘 Listening Test History</h3>

            <div className="tf-progress-table-wrap">
              <table className="tf-progress-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Topic</th>
                    <th>Score</th>
                    <th>Level</th>
                  </tr>
                </thead>

                <tbody>
                  {history.map((record, index) => (
                    <tr
                      key={`${record.completedAt}-${index}`}
                    >
                      <td>
                        {formatDate(record.completedAt)}
                      </td>

                      <td>{record.topic}</td>

                      <td>
                        {record.score}/{record.total}
                        {' ('}
                        {getPercentage(record)}%
                        {')'}
                      </td>

                      <td>{getLevel(record)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <p className="tf-progress-footer">
        Progress is stored locally in this browser.
        The listening test currently retains
        up to 20 recent attempts.
      </p>
    </section>
  )
}

export default LearningProgress
