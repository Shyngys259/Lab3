
import { useState } from 'react'

function Habits() {
  const [habits, setHabits] = useState([
    { id: 1, title: 'Read a book', completed: false },
    { id: 2, title: 'Take a break from phone', completed: true },
    { id: 3, title: 'Go for a walk', completed: false }
  ])

  const [newHabit, setNewHabit] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  function addHabit() {
    if (newHabit.trim() === '') return

    const habit = {
      id: Date.now(),
      title: newHabit.trim(),
      completed: false
    }

    setHabits([...habits, habit])
    setNewHabit('')
  }

  function toggleHabit(id) {
    setHabits(habits.map(habit =>
      habit.id === id
        ? { ...habit, completed: !habit.completed }
        : habit
    ))
  }

  function deleteHabit(id) {
    setHabits(habits.filter(habit => habit.id !== id))
  }

  function editHabit(id) {
    const habit = habits.find(item => item.id === id)
    const newTitle = prompt('Enter a new habit name:', habit.title)

    if (newTitle && newTitle.trim()) {
      setHabits(habits.map(item =>
        item.id === id
          ? { ...item, title: newTitle.trim() }
          : item
      ))
    }
  }

  const filteredHabits = habits.filter(habit => {
    const matchesSearch = habit.title.toLowerCase().includes(search.toLowerCase())

    if (filter === 'completed') return matchesSearch && habit.completed
    if (filter === 'active') return matchesSearch && !habit.completed

    return matchesSearch
  })

  const completedCount = habits.filter(habit => habit.completed).length

  return (
    <main className="wrap habits-page">
      <section className="habits-intro">
        <span className="page-tag">Healthy Lifestyle</span>
        <h1>Build Better Habits</h1>
        <p>
          Small positive actions can make a big difference.
          Create healthy digital habits and track your progress.
        </p>
      </section>

      <section className="tracker-section">
        <h2>My Habits</h2>

        <div className="habit-stats">
          <div className="habit-stat">
            <strong>{habits.length}</strong>
            <span>Total habits</span>
          </div>
          <div className="habit-stat">
            <strong>{completedCount}</strong>
            <span>Completed</span>
          </div>
          <div className="habit-stat">
            <strong>{habits.length - completedCount}</strong>
            <span>Remaining</span>
          </div>
        </div>

        <div className="tracker">
          <div className="tracker-tools">
            <input
              type="text"
              placeholder="Enter a new habit..."
              value={newHabit}
              onChange={e => setNewHabit(e.target.value)}
            />
            <button onClick={addHabit}>Add Habit</button>
          </div>

          <input
            className="search-input"
            type="text"
            placeholder="Search habits..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">All habits</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>

          <div className="habit-list">
            {filteredHabits.map(habit => (
              <div className="tracker-item" key={habit.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={habit.completed}
                    onChange={() => toggleHabit(habit.id)}
                  />
                  <span className={habit.completed ? 'completed' : ''}>
                    {habit.title}
                  </span>
                </label>

                <div className="tracker-actions">
                  <button onClick={() => editHabit(habit.id)}>Edit</button>
                  <button onClick={() => deleteHabit(habit.id)}>Delete</button>
                </div>
              </div>
            ))}

            {filteredHabits.length === 0 && (
              <p>No habits found.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Habits
