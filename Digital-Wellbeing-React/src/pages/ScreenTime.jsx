
function ScreenTime() {
  return (
    <section id="screen" className="print-page">
      <div className="wrap">
        <span className="page-tag">Screen Time</span>

        <h2>Screen Time</h2>

        <p className="lead">
          Too much screen time can take away time from studying, sleeping,
          exercising and communicating with other people.
        </p>

        <p>
          The number itself matters less than what it displaces. An hour of
          video calls with a friend and an hour of short-form video are the
          same on the counter and completely different in effect. So the
          useful question is not "how many hours did I log" but "what did
          those hours replace". If the honest answer is sleep, movement, or
          time with people, that is where to start — not by deleting apps,
          but by taking back the specific block of time they are sitting on.
        </p>

        <div className="grid two" style={{ marginTop: '28px' }}>
          <div>
            <h3>Useful Tips</h3>
            <ul className="ticks">
              <li>Take regular breaks from your screen.</li>
              <li>Turn off unnecessary notifications.</li>
              <li>Set a daily screen-time limit.</li>
              <li>Spend more time on offline activities.</li>
            </ul>
          </div>

          <div>
            <h3>How to Measure a Baseline</h3>
            <ol className="steps">
              <li>
                <h4>Look at last week, not today</h4>
                Most phones show a seven-day average. A single day tells you
                nothing; the weekly pattern shows where the hours actually collect.
              </li>
              <li>
                <h4>Find the top three apps</h4>
                Almost always three apps hold most of the total. Everything
                else is noise.
              </li>
              <li>
                <h4>Note the time of day</h4>
                Heavy use usually clusters in two windows — right after waking
                and just before bed.
              </li>
              <li>
                <h4>Write down one number</h4>
                Pick a target for the coming week and put it somewhere visible.
                A number you can remember beats a setting you forget.
              </li>
            </ol>
          </div>
        </div>

        <h3 style={{ marginTop: '36px' }}>
          A Week of Realistic Targets
        </h3>

        <table>
          <thead>
            <tr>
              <th>Habit</th>
              <th>Starting point</th>
              <th className="num">Realistic target</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Total daily screen time</td>
              <td>6 h 00 m</td>
              <td className="num">4 h 30 m</td>
            </tr>
            <tr>
              <td>Phone pickups per day</td>
              <td>96</td>
              <td className="num">60</td>
            </tr>
            <tr>
              <td>Minutes in short-form video</td>
              <td>85</td>
              <td className="num">30</td>
            </tr>
            <tr>
              <td>Notifications allowed through</td>
              <td>All</td>
              <td className="num">Calls &amp; messages only</td>
            </tr>
            <tr>
              <td>Screen-free hours per day</td>
              <td>0</td>
              <td className="num">2</td>
            </tr>
          </tbody>
        </table>

        <div className="callout">
          <strong>Change one thing at a time</strong>
          <p>
            Cutting five habits at once lasts about four days. Cutting one
            habit and holding it for two weeks is how the change survives a
            bad week.
          </p>
        </div>
      </div>
    </section>
  )
}

export default ScreenTime
