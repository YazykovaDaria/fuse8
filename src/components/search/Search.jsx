import s from './search.module.css'
import { useState, useRef, useEffect } from 'react'
import fetchGet from '../../lib/api'
import { BASE_URL } from '../../../public/constants'

const Search = ({setData}) => {
  const [itemCount, setItemCount] = useState(null)
  const [err, setErr] = useState('')
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, []);

  const onChange = async(e) => {
    const value = e.currentTarget.value
    setValue(value)

    if (value.length > 2) {
      try {
        const data = await fetchGet(`${BASE_URL}${value}`)
        const { count } = data.info
        setErr('')
        setItemCount(count)
        setData(data)
      } catch (error) {
        console.log(error);
        setItemCount(null)
        setErr('Nothing was found')
        setData(null)
      }
    }
  }

  return <div className={s.box}>
    <input type="text" className={s.search} placeholder='Search characters...' value={value} onChange={onChange} ref={inputRef}/>

    {itemCount && <p className={s.count}>
      <span>Found characters: </span>
      <span>{itemCount}</span>
    </p>}

    {err && <p className={`${s.count} ${s.err}`}>{err}</p>}
  </div>
}

export default Search
