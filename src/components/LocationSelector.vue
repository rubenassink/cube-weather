<template>
  <div class="relative mb-4 w-full z-50">
    <div class="relative">
      <input
        ref="searchInput"
        v-model="searchQuery"
        @input="debouncedSearch"
        @keydown.enter="selectLocation"
        @keydown.down="navigateDropdown(1)"
        @keydown.up="navigateDropdown(-1)"
        @focus="handleFocus"
        @blur="handleBlur"
        placeholder="Search for a city worldwide..."
        class="w-full p-4 pl-12 pr-12 border border-white border-opacity-30 rounded-lg bg-[#2C2F35] bg-opacity-90 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-150 ease-in-out"
      />
      <SearchIcon class="size-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-white opacity-70" />
      <button
        v-if="searchQuery || weatherStore.weatherData"
        @click="clearSearch"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white opacity-70 hover:opacity-100 focus:outline-none"
      >
        <XIcon class="size-6" />
      </button>
    </div>
    <LocationDropdown
      v-if="showDropdown && locations.length > 0"
      :locations="locations"
      :active-index="activeIndex"
      @select="selectLocationFromDropdown"
      @hover="activeIndex = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useWeatherStore } from '../stores/weather'
import { debounce } from '@/utils/debounce'
import { searchLocations } from '@/services/locationService'
import type { Location } from '@/types/location'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import XIcon from '@/components/icons/IconX.vue'
import LocationDropdown from '@/components/LocationDropdown.vue'

// Emit event for dropdown toggle
const emit = defineEmits<{
  (e: 'dropdownToggle', isOpen: boolean): void
}>()

// Initialize weather store
const weatherStore = useWeatherStore()

// Reactive references for component state
const searchQuery = ref('')
const locations = ref<Location[]>([])
const showDropdown = ref(false)
const activeIndex = ref(-1)
const searchInput = ref<HTMLInputElement | null>(null)
const isInputFocused = ref(false)

// Update dropdown visibility based on input focus and location results
const updateDropdownVisibility = () => {
  showDropdown.value = isInputFocused.value && locations.value.length > 0
  emit('dropdownToggle', showDropdown.value)
}

// Select location from dropdown or first result
const selectLocation = () => {
  if (activeIndex.value !== -1) {
    selectLocationFromDropdown(locations.value[activeIndex.value])
  } else if (locations.value.length > 0) {
    selectLocationFromDropdown(locations.value[0])
  }
}

// Handle location selection from dropdown
const selectLocationFromDropdown = (location: Location) => {
  searchQuery.value = `${location.name}, ${location.country}`
  showDropdown.value = false
  emit('dropdownToggle', false)
  weatherStore.fetchWeatherData(location.lat, location.lon)
  searchInput.value?.blur()
}

// Navigate through dropdown options
const navigateDropdown = (direction: number) => {
  if (!showDropdown.value) return
  activeIndex.value = (activeIndex.value + direction + locations.value.length) % locations.value.length
}

// Handle input focus
const handleFocus = () => {
  isInputFocused.value = true
  updateDropdownVisibility()
}

// Handle input blur with slight delay
const handleBlur = () => {
  setTimeout(() => {
    isInputFocused.value = false
    updateDropdownVisibility()
  }, 200)
}

// Perform location search
const performSearch = async () => {
  if (searchQuery.value.length < 3) {
    locations.value = []
    updateDropdownVisibility()
    return
  }

  try {
    locations.value = await searchLocations(searchQuery.value)
    updateDropdownVisibility()
    activeIndex.value = -1
  } catch (error) {
    console.error('Error searching locations:', error)
  }
}

// Debounce search to avoid excessive API calls
const debouncedSearch = debounce(performSearch, 300)

// Watch for changes in search query
watch(searchQuery, debouncedSearch)

// Clear search and reset component state
const clearSearch = () => {
  searchQuery.value = ''
  locations.value = []
  showDropdown.value = false
  emit('dropdownToggle', false)
  weatherStore.$reset()
  searchInput.value?.focus()
}
</script>
