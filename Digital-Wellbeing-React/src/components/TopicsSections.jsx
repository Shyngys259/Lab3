
import { useState } from 'react'
import TopicCard from './TopicCard'

const topics = [
  {
    id: 1,
    icon: '⏰',
    title: 'Screen Time',
    description: 'Understand your screen time and create better digital habits.',
    link: '/screen-time'
  },
  {
    id: 2,
    icon: '🌙',
    title: 'Healthy Sleep',
    description: 'Discover how technology affects your sleep quality.',
    link: '/sleep'
  },
  {
    id: 3,
    icon: '📱',
    title: 'Social Media',
    description: 'Build a healthier relationship with social platforms.',
    link: '/social-media'
  },
  {
    id: 4,
    icon: '🎯',
    title: 'Focus',
    description: 'Improve concentration and reduce digital distractions.',
    link: '/focus'
  },
  {
    id: 5,
    icon: '🌱',
    title: 'Healthy Habits',
    description: 'Create positive habits for everyday digital life.',
    link: '/habits'
  },
  {
    id: 6,
    icon: '🧠',
    title: 'Digital Coach',
    description: 'Get helpful ideas for improving your digital wellbeing.',
    link: '/coach'
  }
]

function TopicsSections() {
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(search.toLowerCase())
  )

  const visibleTopics = showAll
    ? filteredTopics
    : filteredTopics.slice(0, 3)

  return (
    <section className="topics-section" id="topics">
      <h2>Explore Digital Well-being</h2>

      <p className="section-description">
        Choose a topic and start improving your digital lifestyle.
      </p>

      <input
        className="search-input"
        type="text"
        placeholder="Search topics..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <button
        className="filter-button"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? 'Show Less' : 'Show All'}
      </button>

      <div className="topics-grid">
        {visibleTopics.map(topic => (
          <TopicCard
            key={topic.id}
            icon={topic.icon}
            title={topic.title}
            description={topic.description}
            link={topic.link}
          />
        ))}
      </div>

      {filteredTopics.length === 0 && (
        <p>No topics found.</p>
      )}
    </section>
  )
}

export default TopicsSections;
