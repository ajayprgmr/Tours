import React, { useState, useEffect } from 'react'
const url = 'https://course-api.com/react-tours-project' // api url
import Tour from './Tours'
import Loading from './Loading'
function App() {
  const [loading, setLoading] = useState(true) // set true bcz initial loading required.
  const [tours, setTours] = useState([]) // initialing empty array in the tours later we will set.

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours)
  }
  const fetchTours = async () => {
    setLoading(true)
    try {
      const response = await fetch(url)
      const tours = await response.json()
      setTours(tours)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchTours()
  }, [])
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }

  if (tours.length === 0) {
    return (
      <div className='title'>
        <h2>no tours left</h2>
        <button className='btn' onClick={() => fetchTours()}>
          refresh
        </button>
      </div>
    )
  }

  return (
    <main>
      <Tour tours={tours} removeTour={removeTour} />
    </main>
  )
}

export default App
