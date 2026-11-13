
import { useState, useEffect } from 'react'

function Focus() {
  const [minutes, setMinutes] = useState(25)
  const [secondsLeft, setSecondsLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    if (!isRunning) return

    const timer = setInterval(() => {
      setSecondsLeft(previous => {
        if (previous <= 1) {
          clearInterval(timer)
          setIsRunning(false)
          return 0
        }
        return previous - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isRunning])

  function changeDuration(value) {
    setMinutes(value)
    setSecondsLeft(value * 60)
    setIsRunning(false)
  }

  function resetTimer() {
    setIsRunning(false)
    setSecondsLeft(minutes * 60)
  }

  function addTask() {
    if (!task.trim()) return

    setTasks([...tasks, {
      id: Date.now(),
      title: task.trim(),
      completed: false
    }])

    setTask('')
  }

  function toggleTask(id) {
    setTasks(tasks.map(item =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    ))
  }

  const formatTime = `${Math.floor(secondsLeft / 60)
    .toString().padStart(2, '0')}:${(secondsLeft % 60)
    .toString().padStart(2, '0')}`

  return (
    <main className="wrap focus-page">
      <section className="focus-intro">
        <span className="page-tag">Productivity</span>
        <h1>Improve Your Focus</h1>
        <p>
          Learn to manage distractions, organize your tasks
          and spend more time on meaningful activities.
        </p>
      </section>

      <section className="focus-info">
        <h2>Why Is Focus Important?</h2>

        <div className="focus-grid">
          <article className="focus-card">
            <span>🎯</span>
            <h3>Productivity</h3>
            <p>Concentrate on important tasks and complete them more effectively.</p>
          </article>

          <article className="focus-card">
            <span>🧠</span>
            <h3>Learning</h3>
            <p>Give your mind time to understand and remember new information.</p>
          </article>

          <article className="focus-card">
            <span>📵</span>
            <h3>Fewer Distractions</h3>
            <p>Reduce unnecessary notifications while studying or working.</p>
          </article>
        </div>
      </section>

      <section className="focus-timer">
        <h2>Focus Timer</h2>
        <p>Choose a session and concentrate on one task.</p>

        <div className="timer-options">
          <button onClick={() => changeDuration(15)}>15 min</button>
          <button onClick={() => changeDuration(25)}>25 min</button>
          <button onClick={() => changeDuration(45)}>45 min</button>
        </div>

        <div className="timer-display">
          {formatTime}
        </div>

        <div className="timer-actions">
          <button onClick={() => setIsRunning(!isRunning)}
            disabled={secondsLeft === 0}>
            {isRunning ? 'Pause' : 'Start'}
          </button>

          <button onClick={resetTimer}>Reset</button>
        </div>

        {secondsLeft === 0 && <p>Session completed! Great work!</p>}
      </section>

      <section className="focus-tasks">
        <h2>My Tasks</h2>

        <div className="task-input">
          <input
            value={task}
            onChange={e => setTask(e.target.value)}
            placeholder="Enter a task..."
          />
          <button onClick={addTask}>Add Task</button>
        </div>

        <div className="task-list">
          {tasks.map(item => (
            <label className="focus-task" key={item.id}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleTask(item.id)}
              />
              <span className={item.completed ? 'completed' : ''}>
                {item.title}
              </span>
            </label>
          ))}

          {tasks.length === 0 && <p>No tasks yet. Add your first task!</p>}
        </div>
      </section>
    </main>
  )
}

export default Focus
