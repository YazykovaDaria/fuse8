import s from './search.module.css'
import { useState, useRef, useEffect, memo } from 'react'
import fetchGet from '../../lib/api'
import { BASE_URL } from '../../../public/constants'
import useDebounce from '../../hooks/useDebounce'

const Search = memo(function Search ({setData}) {
  const [itemCount, setItemCount] = useState(null)
  const [err, setErr] = useState('')
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, []);


  const getData = async () => {
    try {
      const data = await fetchGet(`${BASE_URL}${value.trim().toLowerCase()}`)
      const { count } = data.info
      setErr('')
      setItemCount(count)
      setData(data)
    } catch {
      setItemCount(null)
      setErr('Nothing was found')
      setData(null)
    }
  }

  const debouncedRequest = useDebounce(getData, 200);

  const onChange = (e) => {
    if (value.length < 3) {
      setData(null)
      setItemCount('')
    }

    const newValue = e.target.value;
    setValue(newValue);

    if (newValue.length > 2) {
        debouncedRequest(value)
    }
  };

  return <div className={s.box}>
    <input type="text" className={s.search} placeholder='Search characters...' value={value} onChange={onChange} ref={inputRef}/>

    {itemCount && <p className={s.count}>
      <span>Found characters: </span>
      <span>{itemCount}</span>
    </p>}

    {err && <p className={`${s.count} ${s.err}`}>{err}</p>}
  </div>
})

export default Search
