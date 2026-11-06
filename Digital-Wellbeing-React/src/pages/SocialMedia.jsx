
import { useState } from 'react'

function SocialMedia() {
  const [platform, setPlatform] = useState('Instagram')
  const [hours, setHours] = useState(2)
  const [goal, setGoal] = useState('Reduce screen time')
  const [showAdvice, setShowAdvice] = useState(false)

  const recommendations = {
    'Reduce screen time': 'Set a daily time limit and take regular breaks.',
    'Improve focus': 'Turn off unnecessary notifications while studying.',
    'Better sleep': 'Avoid social media before going to bed.'
  }

  return (
    <main className="wrap social-page">
      <section className="social-intro">
        <span className="page-tag">Digital Lifestyle</span>
        <h1>Social Media & Well-being</h1>
        <p>
          Social media helps us communicate and share ideas.
          However, balanced use is important for our digital well-being.
        </p>
      </section>

      <section className="social-benefits">
        <h2>How Social Media Affects Us</h2>

        <div className="social-grid">
          <article className="social-card">
            <span>💬</span>
            <h3>Communication</h3>
            <p>Stay connected with friends and family around the world.</p>
          </article>

          <article className="social-card">
            <span>📚</span>
            <h3>Learning</h3>
            <p>Discover educational content and new interests.</p>
          </article>

          <article className="social-card">
            <span>⚖️</span>
            <h3>Balance</h3>
            <p>Too much scrolling can distract you from everyday activities.</p>
          </article>
        </div>
      </section>

      <section className="social-planner">
        <h2>My Social Media Habits</h2>
        <p>Explore your usage and create a healthier digital routine.</p>

        <div className="social-form">
          <label>
            Choose a platform:
            <select
              value={platform}
              onChange={e => {
                setPlatform(e.target.value)
                setShowAdvice(false)
              }}
            >
              <option>Instagram</option>
              <option>TikTok</option>
              <option>YouTube</option>
              <option>Facebook</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            Daily usage (hours):
            <input
              type="number"
              min="0"
              max="24"
              value={hours}
              onChange={e => {
                setHours(Math.max(0, Math.min(24, Number(e.target.value))))
                setShowAdvice(false)
              }}
            />
          </label>

          <label>
            My goal:
            <select
              value={goal}
              onChange={e => {
                setGoal(e.target.value)
                setShowAdvice(false)
              }}
            >
              <option>Reduce screen time</option>
              <option>Improve focus</option>
              <option>Better sleep</option>
            </select>
          </label>

          <button onClick={() => setShowAdvice(true)}>
            Get Recommendations
          </button>
        </div>

        {showAdvice && (
          <div className="social-result">
            <h3>Your Social Media Plan</h3>
            <p>Platform: {platform}</p>
            <p>Daily usage: {hours} hours</p>
            <p>Goal: {goal}</p>
            <p>{recommendations[goal]}</p>
          </div>
        )}
      </section>

      <section className="social-tips">
        <h2>Tips for Responsible Social Media Use</h2>
        <ul>
          <li>Think critically about the information you see online.</li>
          <li>Protect your personal information and privacy.</li>
          <li>Take breaks and spend time offline.</li>
          <li>Follow accounts that inspire and educate you.</li>
        </ul>
      </section>
    </main>
  )
}

export default SocialMedia
