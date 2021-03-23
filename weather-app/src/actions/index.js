const apiKey = process.env.REACT_APP_ACCU_API_KEY
const baseUrl = 'http://dataservice.accuweather.com/'

export const searchLocation = location => {
  const queryParams = `apikey=${apiKey}&q=${location}&offset=5`
  const url = `${baseUrl}locations/v1/cities/search?${queryParams}`;
  const promise = fetch(url, { credentials: "same-origin"})
                    .then(r => r.json());
  return { promise }
}

export const searchGeoLocation = (lat, lon) => {
  const queryParams = `apikey=${apiKey}&q=${lat},${lon}&toplevel=true`
  const url = `${baseUrl}locations/v1/cities/geoposition/search?${queryParams}`;
  const promise = fetch(url, { credentials: "same-origin"})
                    .then(r => r.json());
  return { promise }
}


export const fetchFiveDayForecast = locationId => {
  const queryParams = `apikey=${apiKey}&metric=true`
  const url = `${baseUrl}forecasts/v1/daily/5day/${locationId}?${queryParams}`
  const promise = fetch(url, { credentials: "same-origin"})
                    .then(r => r.json());
  return { promise }
}

export const fetchCurrentConditions = locationId => {
  const queryParams = `apikey=${apiKey}&details=true`
  const url = `${baseUrl}currentconditions/v1/${locationId}?${queryParams}`
  const promise = fetch(url, { credentials: "same-origin"})
                    .then(r => r.json());
  return { promise }
}
