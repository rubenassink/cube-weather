<template>
  <div v-if="weatherStore.weatherData" class="bg-white bg-opacity-15 backdrop-blur-lg rounded-xl p-6 text-white">
    <h3 class="text-xl font-semibold mb-4">Weather Details</h3>
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-white bg-opacity-10 rounded-lg p-3">
        <p class="text-sm font-medium mb-1">Wind</p>
        <p class="text-lg font-semibold">{{ Math.round(weatherStore.weatherData.wind.speed * 3.6) }} <span class="text-xs opacity-75">km/h</span></p>
      </div>
      <div class="bg-white bg-opacity-10 rounded-lg p-3">
        <p class="text-sm font-medium mb-1">Humidity</p>
        <p class="text-lg font-semibold">{{ weatherStore.weatherData.main.humidity }} <span class="text-xs opacity-75">%</span></p>
      </div>
      <div class="bg-white bg-opacity-10 rounded-lg p-3">
        <p class="text-sm font-medium mb-1">Pressure</p>
        <p class="text-lg font-semibold">{{ weatherStore.weatherData.main.pressure }} <span class="text-xs opacity-75">hPa</span></p>
      </div>
      <div class="bg-white bg-opacity-10 rounded-lg p-3">
        <p class="text-sm font-medium mb-1">Visibility</p>
        <p class="text-lg font-semibold">{{ (weatherStore.weatherData.visibility / 1000).toFixed(1) }} <span class="text-xs opacity-75">km</span></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWeatherStore } from '../stores/weather'

const weatherStore = useWeatherStore()
</script>