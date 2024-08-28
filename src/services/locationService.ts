import axios from 'axios'
import type { Location } from '@/types/location'
import { GEOCODING_URL } from '@/config/constants'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

export async function searchLocations(query: string): Promise<Location[]> {
  try {
    const response = await axios.get(GEOCODING_URL, {
      params: {
        q: query,
        limit: 5,
        appid: API_KEY
      }
    })
    return response.data.map((item: any) => ({
      name: item.name,
      country: item.country,
      lat: item.lat,
      lon: item.lon
    }))
  } catch (error) {
    console.error('Error fetching locations:', error)
    throw error
  }
}