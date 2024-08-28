<template>
  <div v-if="weatherStore.weatherData" class="bg-white bg-opacity-15 backdrop-blur-lg rounded-xl p-6 text-white">
    <div class="flex justify-between items-center mb-4 gap-4">
      <h2 class="text-3xl font-bold">{{ weatherStore.weatherData.name }}</h2>
      <p class="text-sm opacity-80">{{ currentDateTime }}</p>
    </div>
    <div class="flex items-center justify-between">
      <div>
        <div class="text-7xl font-bold">{{ Math.round(weatherStore.weatherData.main.temp) }}°C</div>
        <div class="text-xl capitalize mt-2 flex items-center">
          <img :src="getWeatherIconUrl(weatherStore.weatherData.weather[0].icon)" :alt="weatherStore.weatherData.weather[0].description" class="w-10 h-10 mr-2">
          {{ weatherStore.weatherData.weather[0].description }}
        </div>
        <div class="text-sm opacity-75 mt-1">Feels like {{ Math.round(weatherStore.weatherData.main.feels_like) }}°C</div>
      </div>
      <div class="text-right">
        <div class="text-sm">
          <i class="fas fa-arrow-up"></i> Max: {{ Math.round(weatherStore.weatherData.main.temp_max) }}°C
        </div>
        <div class="text-sm">
          <i class="fas fa-arrow-down"></i> Min: {{ Math.round(weatherStore.weatherData.main.temp_min) }}°C
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="weatherStore.error" class="bg-red-500 text-white p-4 rounded-lg shadow-lg">
    <p class="font-bold">Error:</p>
    <p>{{ weatherStore.error }}</p>
  </div>
  <div v-else class="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 text-white shadow-lg">
    <p>Search for a city to view the weather.</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWeatherStore } from '../stores/weather'

const weatherStore = useWeatherStore()

// Compute the current date and time in the specified format
const currentDateTime = computed(() => {
  return new Date().toLocaleString('en-US', { 
    dateStyle: 'full', 
    timeStyle: 'short' 
  })
})

// Generate the URL for the weather icon based on the icon code
const getWeatherIconUrl = (iconCode: string) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}
</script>