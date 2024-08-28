// Import necessary dependencies and types
import { defineStore } from 'pinia'
import axios from 'axios'
import type { WeatherData, ForecastItem } from '../types/weather'
import { fetchWeatherData } from '@/services/weatherService'

// Define and export the weather store
export const useWeatherStore = defineStore('weather', {
  // Define the initial state
  state: () => ({
    weatherData: null as WeatherData | null,
    hourlyForecast: [] as ForecastItem[],
    error: null as string | null,
  }),

  // Define actions to mutate the state
  actions: {
    // Fetch weather data for a given latitude and longitude
    async fetchWeatherData(lat: number, lon: number) {
      this.$reset()

      try {
        const { currentWeather, forecast } = await fetchWeatherData(lat, lon)
        this.setWeatherData(currentWeather)
        this.setHourlyForecast(forecast)
      } catch (error) {
        this.handleError(error)
      }
    },

    // Set the current weather data
    setWeatherData(currentWeather: WeatherData) {
      this.weatherData = currentWeather
      // console.log('Weather data updated:', this.weatherData)
    },

    // Set the hourly forecast data
    setHourlyForecast(forecast: { list: ForecastItem[] }) {
      const currentForecast = this.createCurrentForecast()
      
      if (forecast && Array.isArray(forecast.list)) {
        this.hourlyForecast = [currentForecast, ...this.filterForecast(forecast.list)]
      } else {
        console.error('Forecast data is not in the expected format:', forecast)
        this.hourlyForecast = [currentForecast]
      }
      
      // console.log('Hourly forecast updated:', this.hourlyForecast)
    },

    // Create a forecast item for the current weather
    createCurrentForecast(): ForecastItem {
      return {
        dt: this.weatherData!.dt,
        main: { 
          temp: this.weatherData!.main.temp,
          feels_like: this.weatherData!.main.feels_like,
          temp_min: this.weatherData!.main.temp_min,
          temp_max: this.weatherData!.main.temp_max,
          pressure: this.weatherData!.main.pressure,
          sea_level: 0,
          grnd_level: 0,
          humidity: this.weatherData!.main.humidity,
          temp_kf: 0
        },
        weather: this.weatherData!.weather,
        clouds: this.weatherData!.clouds,
        wind: {
          speed: this.weatherData!.wind.speed,
          deg: this.weatherData!.wind.deg,
          // gust: this.weatherData!.wind.gust ?? 0
        },
        visibility: this.weatherData!.visibility,
        pop: 0,
        sys: { pod: 'd' },
        dt_txt: new Date(this.weatherData!.dt * 1000).toISOString()
      }
    },

    // Filter the forecast list to include only relevant items
    filterForecast(forecastList: ForecastItem[]): ForecastItem[] {
      const currentHour = new Date().getHours()
      return forecastList.filter((item, index) => {
        const itemHour = new Date(item.dt * 1000).getHours()
        return index < 23 && (itemHour > currentHour || index > 0)
      })
    },

    // Handle errors that occur during data fetching
    handleError(error: unknown) {
      console.error('Error in store while fetching weather:', error)
      if (axios.isAxiosError(error) && error.response) {
        this.error = `An error occurred: ${error.response.status} ${error.response.statusText}`
      } else {
        this.error = 'An unknown error occurred while fetching weather data.'
      }
    }
  }
})