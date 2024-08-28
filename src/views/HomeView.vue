<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWeatherStore } from '../stores/weather'
import LocationSelector from '../components/LocationSelector.vue'
import WeatherInfo from '../components/WeatherInfo.vue'
import WeatherForecast from '../components/WeatherForecast.vue'
import WeatherDetails from '../components/WeatherDetails.vue'
import WeatherMap from '../components/WeatherMap.vue'
import AirQuality from '../components/AirQuality.vue'
import IconCube from '../components/icons/IconCube.vue'
import IconSun from '../components/icons/IconSun.vue'
import IconThermometer from '../components/icons/IconThermometer.vue'
import IconMap from '../components/icons/IconMap.vue'

const weatherStore = useWeatherStore()
const isDropdownOpen = ref(false)

const handleDropdownToggle = (isOpen: boolean) => {
  isDropdownOpen.value = isOpen
}

const hasWeatherData = computed(() => !!weatherStore.weatherData)
</script>

<template>
  <div class="mx-auto relative pb-4">
    <header class="relative w-full">
      <img
        src="https://images.unsplash.com/photo-1516907450399-41d50409e739?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Weather background"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div class="relative max-w-4xl mx-auto flex flex-col justify-center items-center px-4 sm:px-0">
        <IconCube class="text-white size-20" />
        <LocationSelector class="w-full" @dropdownToggle="handleDropdownToggle" />
      </div>
    </header>

    <main class="max-w-4xl mx-auto pt-4 px-4 sm:px-0" :class="{ 'blur-sm pointer-events-none': isDropdownOpen }">

      <div v-if="hasWeatherData" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WeatherInfo />
        <WeatherDetails />
        <WeatherMap />
        <AirQuality />
        <WeatherForecast class="col-span-1 sm:col-span-2" />
      </div>

      <div v-else class="h-full p-4 sm:p-8 rounded-lg py-8 flex items-center justify-center bg-white bg-opacity-15 backdrop-blur-lg rounded-xl">
        <div class="text-center text-white max-w-2xl mx-auto px-4">
          <h2 class="text-3xl font-semibold mb-4">Cube Welcome</h2>
          <p class="text-xl mb-8">Your professional weather forecasting companion</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div class="bg-white bg-opacity-5 backdrop-blur-lg rounded-xl p-6">
              <IconSun class="mb-4 size-10 text-yellow-300" />
              <h3 class="text-lg font-semibold mb-2">Accurate Forecasts</h3>
              <p>Get precise weather predictions for any location worldwide</p>
            </div>
            <div class="bg-white bg-opacity-5 backdrop-blur-lg rounded-xl p-6">
              <IconThermometer class="mb-4 size-10 text-green-300" />
              <h3 class="text-lg font-semibold mb-2">Detailed Insights</h3>
              <p>Access comprehensive weather data and air quality information</p>
            </div>
            <div class="bg-white bg-opacity-5 backdrop-blur-lg rounded-xl p-6">
              <IconMap class="mb-4 size-10 text-purple-300" />
              <h3 class="text-lg font-semibold mb-2">Interactive Maps</h3>
              <p>Pick a location anywhere in the world and see the weather</p>
            </div>
          </div>
          <p class="text-xl mt-8 font-semibold">Enter a location above to experience Weather Cube</p>
        </div>
      </div>
      
    </main>

    <div
      v-if="isDropdownOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
      @click="handleDropdownToggle(false)"
    ></div>
  </div>
</template>

<style scoped>
.blur-sm {
  filter: blur(4px);
  transition: filter 0.3s ease;
}
</style>
