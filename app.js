// Koordinaten für Höhenweg 16, 91605 Gallmersgarten
const lat = 49.4497;
const lon = 10.2635;
const days = 7; // Hier die gewünschte Anzahl an 'X' Tagen eintragen

const url = `https://open-meteo.com{lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FBerlin&forecast_days=${days}`;

async function fetchWeather() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weather').innerText = 'Fehler beim Laden der Wetterdaten.';
        console.error(error);
    }
}

function displayWeather(data) {
    const weatherDiv = document.getElementById('weather');
    weatherDiv.innerHTML = ''; 

    data.daily.time.forEach((date, index) => {
        const maxTemp = data.daily.temperature_2m_max[index];
        const minTemp = data.daily.temperature_2m_min[index];
        const rainProb = data.daily.precipitation_probability_max[index];

        // Datum lesbar formatieren
        const formattedDate = new Date(date).toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' });

        const dayEl = document.createElement('div');
        dayEl.className = 'forecast-day';
        dayEl.innerHTML = `
            <strong>${formattedDate}</strong>
            <span>Max: ${maxTemp}°C / Min: ${minTemp}°C</span>
            <span>💧 ${rainProb}%</span>
        `;
        weatherDiv.appendChild(dayEl);
    });
}

fetchWeather();
