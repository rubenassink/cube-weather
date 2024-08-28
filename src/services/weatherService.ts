import axios from 'axios'
import type { WeatherData, ForecastItem } from '../types/weather'
import { API_BASE_URL } from '@/config/constants'

/**
 * Fetches weather data for a given latitude and longitude.
 * 
 * @param lat - The latitude of the location.
 * @param lon - The longitude of the location.
 * @returns An object containing current weather and forecast data.
 * @throws Will throw an error if the API request fails.
 */
export async function fetchWeatherData(lat: number, lon: number) {
//   console.log('Fetching weather data for:', lat, lon)
  try {
    const [currentWeather, forecast] = await Promise.all([
      axios.get<WeatherData>(`${API_BASE_URL}/weather`, {
        params: { 
          lat, 
          lon, 
          units: 'metric', 
          appid: import.meta.env.VITE_OPENWEATHER_API_KEY, 
          lang: 'en' 
        }
      }),
      axios.get<{ list: ForecastItem[] }>(`${API_BASE_URL}/forecast`, {
        params: { 
          lat, 
          lon, 
          units: 'metric', 
          cnt: 24, 
          appid: import.meta.env.VITE_OPENWEATHER_API_KEY, 
          lang: 'en' 
        }
      })
    ])

    // console.log('Current weather:', currentWeather.data)
    // console.log('Forecast:', forecast.data)

    return { currentWeather: currentWeather.data, forecast: forecast.data }
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw error
  }
}