
function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="brand footer-brand">
              <span className="dot"></span>
              Digital Well-being
            </div>
            <p className="footer-description">
              A practical guide to using technology in a healthier, smarter
              and more balanced way.
            </p>
          </div>

          <div>
            <h4>Topics</h4>
            <ul>
              <li><a href="/screen-time.html">Screen Time</a></li>
              <li><a href="/sleep.html">Sleep and Technology</a></li>
              <li><a href="/social-media.html">Social Media</a></li>
              <li><a href="/focus.html">Focus and Attention</a></li>
            </ul>
          </div>

          <div>
            <h4>Practice</h4>
            <ul>
              <li><a href="/habits.html">Healthy Habits</a></li>
              <li><a href="/habits.html#detox">Digital Detox</a></li>
              <li><a href="/coach.html">AI Coach &amp; FAQ</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
