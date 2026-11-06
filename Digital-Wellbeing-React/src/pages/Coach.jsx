
import { useState } from 'react'

function Coach() {
  const [problem, setProblem] = useState('Too much screen time')
  const [hours, setHours] = useState(4)
  const [goal, setGoal] = useState('Improve my digital habits')
  const [advice, setAdvice] = useState('')

  function getAdvice() {
    let recommendation = ''

    if (problem === 'Too much screen time') {
      recommendation = 'Try setting daily screen-time limits. Take regular breaks and spend more time on offline activities.'
    } else if (problem === 'Poor sleep') {
      recommendation = 'Create a regular sleep schedule. Reduce screen use before bedtime and keep your phone away while sleeping.'
    } else if (problem === 'Lack of focus') {
      recommendation = 'Turn off unnecessary notifications. Try studying in short focused sessions with regular breaks.'
    } else if (problem === 'Social media distraction') {
      recommendation = 'Limit unnecessary scrolling. Unfollow distracting accounts and choose specific times to check social media.'
    }

    setAdvice(recommendation)
  }

  return (
    <main className="wrap coach-page">
      <section className="coach-intro">
        <span className="page-tag">Digital Assistant</span>
        <h1>Your Digital Coach</h1>
        <p>
          Get practical suggestions to improve your digital habits,
          manage technology and create a healthier lifestyle.
        </p>
      </section>

      <section className="coach-info">
        <h2>How Can I Help You?</h2>

        <div className="coach-grid">
          <article className="coach-card">
            <span>📱</span>
            <h3>Screen Time</h3>
            <p>Understand your technology usage and find a better balance.</p>
          </article>

          <article className="coach-card">
            <span>🌙</span>
            <h3>Healthy Sleep</h3>
            <p>Build a routine that supports good sleep habits.</p>
          </article>

          <article className="coach-card">
            <span>🎯</span>
            <h3>Better Focus</h3>
            <p>Reduce distractions and improve concentration.</p>
          </article>
        </div>
      </section>

      <section className="coach-form-section">
        <h2>Create Your Personal Plan</h2>
        <p>Answer these questions to receive a recommendation.</p>

        <div className="coach-form">
          <label>
            What is your main challenge?
            <select
              value={problem}
              onChange={e => {
                setProblem(e.target.value)
                setAdvice('')
              }}
            >
              <option>Too much screen time</option>
              <option>Poor sleep</option>
              <option>Lack of focus</option>
              <option>Social media distraction</option>
            </select>
          </label>

          <label>
            How many hours do you spend on devices daily?
            <input
              type="number"
              min="0"
              max="24"
              value={hours}
              onChange={e => {
                setHours(Math.max(0, Math.min(24, Number(e.target.value))))
                setAdvice('')
              }}
            />
          </label>

          <label>
            What is your goal?
            <select
              value={goal}
              onChange={e => {
                setGoal(e.target.value)
                setAdvice('')
              }}
            >
              <option>Improve my digital habits</option>
              <option>Spend more time offline</option>
              <option>Become more productive</option>
              <option>Build a healthy routine</option>
            </select>
          </label>

          <button onClick={getAdvice}>
            Get My Advice
          </button>
        </div>

        {advice && (
          <div className="coach-result">
            <h3>🌱 Your Personal Recommendation</h3>
            <p><strong>Your challenge:</strong> {problem}</p>
            <p><strong>Daily device usage:</strong> {hours} hours</p>
            <p><strong>Your goal:</strong> {goal}</p>
            <p>{advice}</p>
          </div>
        )}
      </section>
    </main>
  )
}

export default Coach
