import React, { useState, useEffect } from 'react';
import { searchLocation,
         fetchFiveDayForecast,
         searchGeoLocation,
         fetchCurrentConditions } from './actions/index';
import DayForecastDetails from './components/dayForecastDetails';
import ForecastList from './components/forecastList';
import Footer from './components/footer';
import logo from './assets/images/jupiter.png'


import './App.css';

function App() {

  const [ value, setValue ] = useState('');
  const [ dayForecast, setDayForecast ] = useState({});
  const [ futureForecast, setFutureForecast ] = useState([]);
  const [ forecastQuery, setForecastQuery ] = useState('');
  const [ currentConditions, setCurrentConditions ] = useState({});
  const [ status, setStatus ] = useState('')

  useEffect(() => {
    console.log(process.env.NODE_ENV);
    console.log(process.env.REACT_APP_ACCU_API_KEY);
  }, [])

  const handleForecasts = locationKey => {
    fetchCurrentConditions(locationKey).promise.then(r =>{
      console.log(r)
      setCurrentConditions(r[0])
      fetchFiveDayForecast(locationKey).promise.then(r =>{
        console.log(r)
        setDayForecast(r.DailyForecasts[0]);
        setFutureForecast(r.DailyForecasts.slice(1, 5));
        setStatus('fetched')
      })
    })
  }


  const handleSearch = value => {
    console.log(value)
    searchLocation(value).promise.then(r => {
      console.log(r);
      if (r[0]) {
        console.log(r[0])
        handleForecasts(r[0].Key)
      } else {
        console.log(r[0])
        alert(`Sorry, no such place as ${value}`)
      }
    })
  }


  const handleChange = event => {
    setValue(event.target.value);
  }

  const handleSubmit = event => {
    console.log(value)
    setForecastQuery(value);
    handleSearch(value);
    event.preventDefault();
  }

  const options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
  }

  const success = pos => {
    var crd = pos.coords;
    searchGeoLocation(crd.latitude, crd.longitude).promise.then(r =>{
      console.log(r);
      setForecastQuery(r.LocalizedName)
      handleForecasts(r.Key)
    })
  }

  const error = err => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }


  const handleClick = event => {
    console.log('click');
    navigator.geolocation.getCurrentPosition(success, error, options);
  }


  return (
    <div className="App h-screen flex flex-col">
      <header className="flex mb-6">
        <div className="logo pl-3 pt-3 w-2/6">
          <a rel="noopener noreferrer" target="_blank" href="https://jupiterslb.com/">
            <img className="h-12 w-12" src={ logo } alt="logo" />
          </a>
        </div>
        <p className="text-purple-500 text-3xl pt-3 font-bold w-2/6">JupitersLB Weather Api</p>
        <div className="flex pt-3 w-2/6 justify-end pr-6">
          <form className="w-full max-w-sm" onSubmit={handleSubmit}>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">City: </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-indigo-300 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-900 leading-tight focus:outline-none focus:bg-gray focus:border-purple-500" type="text" value={value} onChange={handleChange} placeholder="Write a city here" />
              </div>
              <div className="h-8 w-8" onClick={handleClick}>
                <svg className="text-purple-500 pl-2 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            {/*<div>
              <input className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit" value="Submit" />
            </div>*/}
          </form>
        </div>
      </header>
      <div className="forecasts flex-grow">
        <div className="day-forecast">
          {status === 'fetched' ? <DayForecastDetails query={forecastQuery} current={currentConditions} forecast={dayForecast} /> : ''}
        </div>
        <div className="future-forecast pt-6">
          {status === 'fetched' ? <ForecastList forecast={futureForecast} /> : ''}
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
