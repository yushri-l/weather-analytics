🌦️ Weather Comfort Analytics Application

A full-stack weather analytics application that retrieves live weather data, computes a custom Comfort Index, ranks cities based on comfort, and displays the results on a responsive dashboard.
The system includes server-side caching and a clean separation between frontend and backend.

📌 Features

Fetches live weather data from OpenWeatherMap API

Computes a custom Comfort Index (0–100) on the backend

Ranks cities from most comfortable to least comfortable

Server-side caching with 5-minute TTL

Debug endpoints to inspect cache state

Responsive React dashboard

Clear separation of concerns (services, controllers, routes)

🧱 Tech Stack
Backend

Node.js (v20)

Express.js

OpenWeatherMap API

In-memory cache (TTL-based)

ES Modules

Frontend

React (Vite)

Fetch API

Responsive UI (card-based layout)

📂 Project Structure
weather-analytics/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── utils/
│   │   └── data/cities.json
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md

⚙️ Setup Instructions
1️⃣ Clone the repository
git clone <repository-url>
cd weather-analytics

2️⃣ Backend setup
cd backend
npm install


Create a .env file:

OPENWEATHER_API_KEY=your_api_key_here
PORT=5000


Start backend:

npm run dev


Backend runs on:

http://localhost:5000

3️⃣ Frontend setup
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173

🌍 API Endpoints
Get weather analytics
GET /api/weather


Response:

{
  "source": "api | cache",
  "totalCities": 8,
  "rankedCities": [
    {
      "city": "Paris",
      "description": "clear sky",
      "temperature": 22.4,
      "comfortIndex": 91
    }
  ]
}

Cache status (debug)
GET /api/weather/cache/status

Clear cache (debug)
GET /api/weather/cache/clear

🧮 Comfort Index Formula

The Comfort Index is a custom metric designed to quantify how comfortable a city’s weather feels to a human.

Parameters used

Temperature (°C)

Humidity (%)

Wind speed (m/s)

Cloudiness (%)

Ideal reference values
Parameter	Ideal Value
Temperature	22°C
Humidity	50%
Wind Speed	3 m/s
Cloudiness	40%
Scoring & Weights

Each parameter is normalized to a 0–100 score based on deviation from its ideal value.

Parameter	Weight
Temperature	40%
Humidity	30%
Wind Speed	20%
Cloudiness	10%
Final formula
Comfort Index =
(TempScore × 0.4) +
(HumidityScore × 0.3) +
(WindScore × 0.2) +
(CloudScore × 0.1)


The final score is rounded and constrained between 0 and 100.

🧠 Reasoning Behind the Formula

Temperature has the highest impact on human comfort

Humidity significantly affects perceived heat

Wind provides natural cooling

Cloudiness affects sun exposure and glare

The weighting prioritizes real-world human comfort while keeping the formula simple, explainable, and testable.

🗄️ Cache Design
Strategy

In-memory TTL cache using JavaScript Map

Two layers of caching:

Raw weather API responses (per city)

Processed & ranked output

TTL

5 minutes (as required)

Benefits

Reduces external API calls

Improves response time

Clear cache state visibility via debug endpoints

⚖️ Trade-offs Considered

In-memory cache chosen for simplicity (no Redis dependency)

Cache resets on server restart (acceptable for assignment scope)

StrictMode disabled in frontend dev to avoid misleading double API calls

🚧 Known Limitations

In-memory cache does not persist across restarts

Limited city count based on provided dataset

No authentication (implemented in Part 2)

✨ Bonus Features Implemented

Responsive UI

Backend cache debug endpoints

Clear API vs cache source visibility

Clean service-oriented backend design

🧑‍💻 Author Notes

All logic, calculations, and architecture decisions were implemented with clarity, scalability, and explainability in mind.
The project is structured to support easy extension (authentication, persistent caching, analytics visualization).

✅ Status

✔ Part 1 — Weather Analytics: Completed
⬜ Part 2 — Authentication & Authorization: Pending