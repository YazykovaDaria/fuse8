import s from './card.module.css'
import formatDate from '../../lib/formatDate'

const statusStyle = {
  dead: s.statusDead,
  alive: s.statusAlive,
  unknown: s.statusUnknown
}

const Card = (data) => {

  const {name, status, created, url} = data

  return <a href={url}>
    <article className={s.card}>
    <h3 className={s.title}>{name}</h3>

    <div className={s.content}>

      <p className={s.contentItem}>
        <span>Status:</span>
        <span className={`${s.status} ${statusStyle[status.toLowerCase()]}`}>{status}</span>
      </p>
      <div className={s.contentItem}>
        <span>Created:</span>
        <span>{formatDate(created)}</span>
        </div>
        </div>
  </article>
  </a>
}

export default Card
