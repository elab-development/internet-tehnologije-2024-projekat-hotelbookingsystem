export async function getCoordinatesByCity(city) {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
  )

  if (!response.ok) {
    throw new Error('Failed to find city coordinates.')
  }

  const data = await response.json()
  const result = data.results?.[0]

  if (!result) {
    throw new Error('No weather location found for this city.')
  }

  return {
    latitude: result.latitude,
    longitude: result.longitude,
    name: result.name,
    country: result.country,
  }
}

export async function getCurrentWeather(latitude, longitude) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
  )

  if (!response.ok) {
    throw new Error('Failed to load current weather.')
  }

  const data = await response.json()

  if (!data.current_weather) {
    throw new Error('Current weather is not available for this location.')
  }

  return {
    temperature: data.current_weather.temperature,
    windspeed: data.current_weather.windspeed,
    weathercode: data.current_weather.weathercode,
  }
}

export async function getWeatherByCity(city) {
  const coordinates = await getCoordinatesByCity(city)
  const weather = await getCurrentWeather(coordinates.latitude, coordinates.longitude)

  return {
    city: coordinates.name,
    country: coordinates.country,
    temperature: weather.temperature,
    windspeed: weather.windspeed,
    weathercode: weather.weathercode,
  }
}
