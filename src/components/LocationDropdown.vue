<template>
    <ul class="absolute z-10 w-full mt-3 bg-[#2C2F35] bg-opacity-90 backdrop-blur-lg border border-white border-opacity-30 rounded-lg shadow-lg max-h-60 overflow-auto">
      <li
        v-for="(location, index) in locations"
        :key="index"
        @click="$emit('select', location)"
        @mouseenter="$emit('hover', index)"
        class="p-4 cursor-pointer hover:bg-blue-600/50 transition duration-150 ease-in-out"
      >
        <div class="flex items-center">
          <i class="fas fa-map-marker-alt mr-3 text-gray-600"></i>
          <div>
            <div class="text-white">{{ location.name }}, {{ location.country }}</div>
          </div>
        </div>
      </li>
    </ul>
  </template>
  
  <script setup lang="ts">
  import type { Location } from '../types/location'
  
  // Define props for the component
  defineProps<{
    locations: Location[] // Array of location objects
    activeIndex: number // Index of the currently active/highlighted location
  }>()
  
  // Define emits for the component
  defineEmits<{
    (e: 'select', location: Location): void // Emitted when a location is selected
    (e: 'hover', index: number): void // Emitted when a location is hovered over
  }>()
  </script>