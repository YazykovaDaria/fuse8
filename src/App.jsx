import s from './App.module.css'
import { useCallback, useState } from 'react'
import Search from './components/search/Search'
import Card from './components/card/Card'
import fetchGet from './lib/api'

function App() {
  const [cards, setCards] = useState([])
  const [nextUrl, setNextUrl] = useState(null)

  const setData = useCallback((cardsData) => {
    if (cardsData) {
      const { results } = cardsData
      const url = cardsData.info.next
      setCards(results)
      setNextUrl(url)
    } else {
      setCards([])
      setNextUrl(null)
    }
  }, [])

  const loadCards = async () => {
    if (!nextUrl) return

    try {
      const data = await fetchGet(nextUrl)
      const { results } = data
      const url = data.info.next

      setNextUrl(url)
      setCards((prevCards) => [...prevCards, ...results])
    } catch (error) {
      console.error(error)
      return
    }
  }


  return (
    <main className={s.body}>
      <Search setData={setData}></Search>

      <section className={s.cardsBox}>
        {cards.length > 0 && cards.map((card) => <Card key={card.id} {...card}></Card>)}
      </section>

      {nextUrl && <button className={s.btn} onClick={loadCards}>Show more</button>}
    </main>
  )
}

export default App
