<template>
  <div v-if="hourlyForecast.length" class="bg-white bg-opacity-15 backdrop-blur-lg rounded-xl p-6 text-white">
    <h3 class="text-xl font-semibold mb-4">24-Hour Forecast</h3>
    <div class="flex overflow-x-auto pb-2 gap-4">
      <div 
        v-for="(forecast, index) in hourlyForecast" 
        :key="index" 
        class="text-center flex-shrink-0 bg-white bg-opacity-10 rounded-lg p-3 min-w-[80px]"
      >
        <p class="text-sm mb-2 font-medium">{{ formatTime(forecast.dt, index) }}</p>
        <img 
          :src="getWeatherIconUrl(forecast.weather[0].icon)" 
          :alt="forecast.weather[0].description" 
          class="w-10 h-10 mx-auto mb-2"
        >
        <p class="font-semibold">{{ Math.round(forecast.main.temp) }}°C</p>
        <p class="text-xs mt-1 opacity-75">{{ forecast.weather[0].main }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useWeatherStore } from '../stores/weather'

const weatherStore = useWeatherStore()

// Compute the hourly forecast for the next 24 hours
const hourlyForecast = computed(() => {
  const now = new Date();
  const twentyFourHoursLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  
  return weatherStore.hourlyForecast.filter(forecast => {
    const forecastDate = new Date(forecast.dt * 1000);
    return forecastDate <= twentyFourHoursLater;
  });
});

// Format the time for display, showing 'Now' for the first item
const formatTime = (timestamp: number, index: number) => {
  if (index === 0) {
    return 'Now'
  }
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', { 
    hour: 'numeric',
    hour12: true
  })
}

// Generate the URL for the weather icon based on the icon code
const getWeatherIconUrl = (iconCode: string) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}
</script>

<style scoped>
/* Custom scrollbar styles for better visibility */
.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.5) transparent;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: transparent;
}
</style>