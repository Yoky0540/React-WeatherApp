import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {

  const name = "Bangkok"
  const apiKey = "c1a41cf734205ef19dde06c7eb6f6f89"
  const [city,setCity] = useState({})
  const [isLoading,setIsLoading] = useState(false)

  useEffect(()=>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`
    fetch(url).then(res=>res.json())
    .then(data=>{
      setCity(data)
      setIsLoading(true)
    })
  },[name])

  const convertTemp = (k) =>{
    return (k-273).toFixed(1)
  }

  return (
    (isLoading && 
    <div className='App'>
      <section>
        <div className="location">
          <h1 className='city'>{city.name}</h1>
          <p className="state">{city.sys.country}</p>
        </div>
        <div className="card">
          <div className="weather">
            <h1>{convertTemp(city.main.temp)}&deg;C</h1>
            <small>max : {convertTemp(city.main.temp_max)}&deg;C , min : {convertTemp(city.main.temp_min)}&deg;C</small>
          </div>
          <div className="info">
            <div className="status">{city.weather[0].main}</div>
            <div className="humidity">Humidity : {city.main.humidity}%</div>
            <div className="wind">Wind : {city.wind.speed}</div>
          </div>
        </div>
      </section>
    </div>
    )
  )
}

export default App
