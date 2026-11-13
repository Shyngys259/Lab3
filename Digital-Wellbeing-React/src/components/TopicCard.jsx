function TopicCard({ icon, title, description, link }) {
  return (
    <article className="topic-card">
      <div className="topic-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={link}>Learn more →</a>
    </article>
  )
}

export default TopicCard