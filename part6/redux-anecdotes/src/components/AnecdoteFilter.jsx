import { setFilter } from "../reducers/filterReducer"
import { useDispatch } from 'react-redux'

const AnecdoteFilter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    const filter = event.target.value
    dispatch(setFilter(filter))
  }
  return (
    <div>
      filter <input onChange={handleChange}/>
    </div>
  )
}

export default AnecdoteFilter