
function Hero() {
  return (
    <section className="hero" id="intro">
      <div className="wrap hero-grid">
        <div>
          <span className="page-tag">Welcome</span>

          <h1>Digital Well-being &amp; Mental Health</h1>

          <p className="lead">
            Learn how to use technology in a healthier, smarter and more balanced way.
          </p>

          <p>
            Technology is not the enemy. The problem is the absence of a plan.
            This guide walks through the everyday habits that decide whether
            your phone works for you or the other way around — how much you
            look at it, when you put it down, and what you do with the time
            you get back.
          </p>

          <div className="hero-actions">
            <a className="btn" href="/habits.html">Learn More</a>
            <a className="btn ghost" href="/coach.html">Try the AI Coach</a>
          </div>
        </div>

        <aside className="hero-card">
          <h4>At a glance</h4>
          <div className="hero-stat">
            <span>Average waking hours online</span>
            <span>7 h 30 m</span>
          </div>
          <div className="hero-stat">
            <span>Daily phone pickups</span>
            <span>96</span>
          </div>
          <div className="hero-stat">
            <span>Hours lost per year to scrolling</span>
            <span>≈ 1,000</span>
          </div>
          <div className="hero-stat">
            <span>People who sleep beside a phone</span>
            <span>4 in 5</span>
          </div>
          <p className="hero-note">
            Illustrative figures for orientation — measure your own baseline
            with the tools built into your phone.
          </p>
        </aside>
      </div>
    </section>
  )
}

export default Hero
