https://github.com/user-attachments/assets/2ad3161c-819d-4308-800d-375d42f1bab2

## Weather Comfort Analytics Application
 
A secure, full-stack weather analytics application that retrieves live weather data, computes a custom Comfort Index, ranks cities by comfort level, and presents insights through a responsive dashboard with authentication, and caching.
---

## Features

- Weather Analytics
- Data processing using a custom Comfort Index
- Caching
- Authentication & Authorization
- Responsive UI

## Tech Stack

- Express.js
- React
- Node.js

## Setup Instructions

1. Clone the repository
```git clone <repository-url>```

2. Backend setup
```cd backend```
```npm install```

Create a .env file:
PORT=5000
OPENWEATHER_API_KEY=your_openweather_api_key
AUT H0_DOMAIN=your-auth0-domain
AUTH0_AUDIENCE=your-auth0-audience


Start backend:
```npm run dev```

Backend runs on:
http://localhost:5000

3. Frontend setup
```cd frontend```
```npm install```
```npm run dev```

Frontend runs on:
http://localhost:5173


## Comfort Index Formula
The Comfort Index is a custom metric designed to quantify how comfortable a city’s weather feels to a human.

Parameters used
- Temperature (°C)
- Humidity (%)
- Wind speed (m/s)

Optimal values
- Temperature	22°C
- Humidity	50%
- Wind Speed	3 m/s

first the parameters scores are calculated which tells how comfortable is the parameter on a scale from 0 to 100 by parameter_score = 100 - |current value - optimal value| * penalty multiplier. 
|current value - optimal value| tell how far from the optimal point is the current value. This optimal value is set to 22.0 C, 50%, 3 m/s for temperature, humidity and wind speed respectively, which is the average between the recommended temperature, humidity and wind speed in the summer and winter.
penalty multiplier tells how quickly should comfort drop when we move away from the optimal value.

then comfort index calculated using, 

Comfort Index =
(TempScore × 0.45) +
(HumidityScore × 0.33) +
(WindScore × 0.22) 

The final score is rounded and constrained between 0 and 100.

variable weights
- Each parameter is normalized to a 0–100 score based on deviation from its ideal value.

- Temperature	45%
- Humidity 33%
- Wind Speed 22%

## Reason for variable weights

- Temperature has the strongest impact on perceived comfort - 45%
- Humidity significantly affects perceived heat - 33%
- Wind provides natural cooling - 22%

The weighting prioritizes real-world human comfort.

## Cache Design
Strategy
- In-memory TTL cache using JavaScript Map
- Two independent cache layers:
1. Raw OpenWeather API responses (per city)
2. Final processed & ranked analytics output

TTL
- 5 minutes 

Benefits
- Reduces external API calls
- Improves response time
- Clear cache state visibility via debug endpoints

## Testing
Unit tests implemented for the Comfort Index calculation

Tests cover:
- Ideal conditions
- Hot & cold extremes
- High wind penalties
- Boundary values (0–100)

Run tests:
- npm test

## Trade-offs 
- In-memory cache chosen for simplicity 
- Cache resets on server restart 
- Sorting handled on backend for consistency and performance

## Limitations
- Cache does not persist across restarts
- Weather data is real-time only
- Limited to configured city list

## Extra Features Implemented
- Dark mode
- Unit tests
- Sorted analytics output

## Author Notes
All logic, calculations, and architecture decisions were implemented with clarity, scalability, and explainability in mind.
The architecture supports easy extension (persistent caching, analytics charts, historical trends).

