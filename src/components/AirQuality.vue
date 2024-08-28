<template>
  <div v-if="airQualityData" class="bg-white bg-opacity-15 backdrop-blur-lg rounded-xl p-6 text-white">
    <h3 class="text-xl font-semibold mb-4">Air Quality</h3>
    <div v-if="airQualityData.main" class="flex items-center justify-between mb-6">
      <div class="text-4xl font-bold" :style="{ color: getAQIColor(airQualityData.main.aqi) }">
        {{ airQualityData.main.aqi }}
      </div>
      <div class="text-right">
        <p class="text-2xl font-bold">
          {{ getAirQualityDescription(airQualityData.main.aqi) }}
        </p>
        <p class="text-sm opacity-75">Air Quality Index</p>
      </div>
    </div>
    <div v-if="airQualityData.components" class="grid grid-cols-3 gap-4">
      <div v-for="(value, pollutant) in airQualityData.components" :key="pollutant" class="bg-white bg-opacity-10 rounded-lg p-3">
        <p class="text-sm font-medium mb-1">{{ getPollutantName(pollutant) }}</p>
        <p class="text-lg font-semibold">{{ Math.round(value) }} <span class="text-xs opacity-75">μg/m³</span></p>
      </div>
    </div>
    <p v-else class="text-center opacity-75 mt-4">Detailed air quality data not available</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useWeatherStore } from '../stores/weather';
import axios from 'axios';
import type { AirQualityData } from '@/types/airQuality';
import { API_BASE_URL } from '@/config/constants';

// Initialize the weather store
const weatherStore = useWeatherStore();

// Reactive reference to hold air quality data
const airQualityData = ref<AirQualityData | null>(null);

// Function to fetch air quality data
const fetchAirQuality = async () => {
  if (weatherStore.weatherData) {
    const { lat, lon } = weatherStore.weatherData.coord;
    // console.log('Fetching air quality for:', lat, lon)
    try {
      const response = await axios.get(`${API_BASE_URL}/air_pollution`, {
        params: {
          lat,
          lon,
          appid: import.meta.env.VITE_OPENWEATHER_API_KEY
        }
      });
      // console.log('Air quality data:', response.data)
      airQualityData.value = response.data.list[0];
    } catch (error) {
      console.error('Error fetching air quality:', error)
      airQualityData.value = null;
    }
  } else {
    console.log('No weather data available')
  }
};

// Function to get air quality description based on AQI
const getAirQualityDescription = (aqi: number) => {
  const descriptions = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
  return descriptions[aqi - 1] || 'Unknown';
};

// Function to get color for AQI value
const getAQIColor = (aqi: number) => {
  const colors = ['#4CAF50', '#FFC107', '#FF9800', '#F44336', '#8E24AA'];
  return colors[aqi - 1] || '#9E9E9E';
};

// Function to get full name of pollutants
const getPollutantName = (pollutant: string) => {
  const names: { [key: string]: string } = {
    co: 'CO',
    no: 'NO',
    no2: 'NO₂',
    o3: 'O₃',
    so2: 'SO₂',
    pm2_5: 'PM2.5',
    pm10: 'PM10',
    nh3: 'NH₃'
  };
  return names[pollutant as keyof typeof names] || pollutant.toUpperCase();
};

// Watch for changes in weather data and fetch air quality data accordingly
watch(() => weatherStore.weatherData, fetchAirQuality, { immediate: true });
</script>