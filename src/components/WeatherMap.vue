<template>
  <div v-if="weatherStore.weatherData" class="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 text-white">
    <h3 class="text-xl font-semibold mb-4">Location Map</h3>
    <div class="relative rounded-xl overflow-hidden" style="height: 350px;">
      <div ref="mapContainer" class="absolute inset-0"></div>
      <div class="absolute inset-0 bg-black bg-opacity-30 pointer-events-none"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick, onBeforeUnmount } from 'vue';
import { useWeatherStore } from '../stores/weather';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const weatherStore = useWeatherStore();
const mapContainer = ref<HTMLElement | null>(null);
let map: L.Map | null = null;
let marker: L.Marker | null = null;

// Fix
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

const initMap = async () => {
  if (weatherStore.weatherData && mapContainer.value) {
    const { lat, lon } = weatherStore.weatherData.coord;
    
    await nextTick();

    // Remove existing map if it exists
    if (map) {
      map.remove();
      map = null;
    }

    // Create a new map instance
    map = L.map(mapContainer.value).setView([lat, lon], 10);
    
    // Add tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Add marker for the location
    marker = L.marker([lat, lon]).addTo(map);
    marker.bindPopup(weatherStore.weatherData.name).openPopup();

    // Force a map redraw to ensure proper rendering
    map.invalidateSize();
  }
};

onMounted(() => {
  // Initialize map if weather data is available on component mount
  if (weatherStore.weatherData) {
    initMap();
  }
});

watch(() => weatherStore.weatherData, (newValue) => {
  // Re-initialize map when weather data changes
  if (newValue) {
    nextTick(() => {
      initMap();
    });
  }
}, { deep: true });

onBeforeUnmount(() => {
  // Clean up map instance when component is unmounted
  if (map) {
    map.remove();
    map = null;
  }
});
</script>

<style>
@import 'leaflet/dist/leaflet.css';
</style>