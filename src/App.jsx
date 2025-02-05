import s from './App.module.css'
import { useState } from 'react'
import Search from './components/search/Search'
import Card from './components/card/Card'


function App() {
  const [cards, setCards] = useState([])
  const [nextUrl, setNextUrl] = useState(null)

  const setData = (cardsData) => {
    if (cardsData) {
      const { results } = cardsData
      const url = cardsData.info.next
      setCards(results)
      setNextUrl(url)
    } else {
      setCards([])
      setNextUrl(null)
    }
  }

  return (
    <main className={s.body}>
      <Search setData={setData}></Search>

      <section className={s.cardsBox}>
        {cards.length > 0 && cards.map((card) => <Card key={card.id} {...card}></Card>)}
      </section>
    </main>
  )
}

export default App
