# Weather Cube

Weather Cube is een weervoorspellingsapplicatie gebouwd met Vue.js en TypeScript.

## Functies

- Zoek naar weersinformatie per stadsnaam
- Toon huidige weersomstandigheden
- Toon 24-uurs voorspelling
- Geef gedetailleerde weersinformatie inclusief temperatuur, luchtvochtigheid, windsnelheid, etc.
- Toon luchtkwaliteitsindex en vervuilingsniveaus
- Interactieve kaart met de geselecteerde locatie
- Responsive ontwerp voor verschillende schermformaten

## Gebruikte Technologieën

- Vue.js 3
- TypeScript
- Vite
- Pinia voor staatsbeheer
- Axios voor API-verzoeken
- Leaflet voor interactieve kaarten
- Tailwind CSS voor styling

## Aan de Slag

### Vereisten

- Node.js (versie 14 of hoger)
- npm of yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/weather-cube.git
   cd weather-cube
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy the `.env.example` file to a new file named `.env`:
     ```
     cp .env.example .env
     ```
   - Open the `.env` file and replace `your_openweather_api_key_here` with your actual OpenWeather API key.

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and go to `http://localhost:5173` to see the application running.
