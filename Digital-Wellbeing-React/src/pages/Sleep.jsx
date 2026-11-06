
import { useState } from 'react'

function Sleep() {
  const [hours, setHours] = useState(8)
  const [bedtime, setBedtime] = useState('22:00')
  const [wakeTime, setWakeTime] = useState('06:00')

  const sleepScore = Math.min(100, Math.round((hours / 8) * 100))

  return (
    <main className="wrap sleep-page">
      <section className="sleep-intro">
        <span className="page-tag">Healthy Lifestyle</span>
        <h1>Healthy Sleep</h1>
        <p>
          Good sleep helps your body recover and your mind stay focused.
          Learn how technology can affect your sleep habits.
        </p>
      </section>

      <section className="sleep-content">
        <h2>Why Is Sleep Important?</h2>
        <div className="sleep-grid">
          <article className="sleep-card">
            <span>🧠</span>
            <h3>Better Focus</h3>
            <p>Quality sleep supports memory, learning and concentration.</p>
          </article>
          <article className="sleep-card">
            <span>💚</span>
            <h3>Good Health</h3>
            <p>Sleep gives your body time to rest and recover.</p>
          </article>
          <article className="sleep-card">
            <span>😊</span>
            <h3>Better Mood</h3>
            <p>A regular sleep schedule can support emotional well-being.</p>
          </article>
        </div>
      </section>

      <section className="sleep-tracker">
        <h2>My Sleep Planner</h2>
        <p>Set your sleep schedule and explore your sleep duration.</p>

        <div className="sleep-inputs">
          <label>
            Hours of sleep:
            <input
              type="number"
              min="0"
              max="24"
              value={hours}
              onChange={e => setHours(Math.max(0, Math.min(24, Number(e.target.value))))}
            />
          </label>

          <label>
            Bedtime:
            <input
              type="time"
              value={bedtime}
              onChange={e => setBedtime(e.target.value)}
            />
          </label>

          <label>
            Wake-up time:
            <input
              type="time"
              value={wakeTime}
              onChange={e => setWakeTime(e.target.value)}
            />
          </label>
        </div>

        <div className="sleep-result">
          <h3>{hours} hours</h3>
          <p>Sleep duration</p>
          <div className="sleep-progress">
            <div style={{ width: `${sleepScore}%` }}></div>
          </div>
          <p>{sleepScore}% of an 8-hour reference target</p>
          <p>Your schedule: {bedtime} – {wakeTime}</p>
        </div>
      </section>

      <section className="sleep-tips">
        <h2>Tips for Better Sleep</h2>
        <ul>
          <li>Keep a regular sleep schedule.</li>
          <li>Reduce screen use before bedtime.</li>
          <li>Keep your bedroom quiet and comfortable.</li>
          <li>Avoid caffeine late in the day.</li>
        </ul>
      </section>
    </main>
  )
}

export default Sleep
