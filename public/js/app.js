// public/js/app.js

window.addEventListener('DOMContentLoaded', () => {
    const weatherForm = document.querySelector('form');
    const search = document.querySelector('input');
    const pesanSatu = document.querySelector('#pesan-1');
    const pesanDua = document.querySelector('#pesan-2');

    // Fungsi untuk mendapatkan icon cuaca berdasarkan deskripsi
    function getWeatherIcon(description) {
        if (!description) return '🌈';
        
        const desc = description.toLowerCase();
        
        if (desc.includes('clear') || desc.includes('cerah') || desc.includes('sunny')) {
            return '☀️';
        } else if (desc.includes('partly') || desc.includes('sebagian')) {
            return '⛅';
        } else if (desc.includes('cloud') || desc.includes('berawan') || desc.includes('overcast')) {
            return '☁️';
        } else if (desc.includes('rain') || desc.includes('hujan') || desc.includes('drizzle')) {
            return '🌧️';
        } else if (desc.includes('storm') || desc.includes('badai') || desc.includes('thunder')) {
            return '⛈️';
        } else if (desc.includes('snow') || desc.includes('salju')) {
            return '❄️';
        } else if (desc.includes('fog') || desc.includes('kabut') || desc.includes('mist')) {
            return '🌫️';
        } else {
            return '🌤️';
        }
    }

    // Fungsi untuk membuat card hasil cuaca
    function createWeatherCard(data) {
        console.log('Data received:', data); // Debug
        
        const weather = data.prediksiCuaca;
        const icon = getWeatherIcon(weather.weather_descriptions?.[0] || weather.weather_description || '');
        
        return `
            <div style="padding: 40px; text-align: center;">
                <div class="weather-location">${data.lokasi || 'Lokasi tidak diketahui'}</div>
                <div class="weather-coordinates">
                    Koordinat: ${weather.location?.lat || weather.lat || 'N/A'}, ${weather.location?.lon || weather.lon || 'N/A'}
                </div>
                
                <div class="weather-main">
                    <div class="weather-icon">${icon}</div>
                    <div class="weather-temp">${weather.temperature || weather.temp || 'N/A'}°C</div>
                </div>
                
                <div class="weather-description">
                    ${weather.weather_descriptions?.[0] || weather.weather_description || 'Tidak ada deskripsi'}
                </div>
                
                <div class="weather-details">
                    <div class="weather-detail-item">
                        <div class="weather-detail-label">Terasa Seperti</div>
                        <div class="weather-detail-value">
                            <span class="weather-detail-icon">🌡️</span>
                            ${weather.feelslike || weather.feels_like || 'N/A'}°C
                        </div>
                    </div>
                    
                    <div class="weather-detail-item">
                        <div class="weather-detail-label">Kelembaban</div>
                        <div class="weather-detail-value">
                            <span class="weather-detail-icon">💧</span>
                            ${weather.humidity || 'N/A'}%
                        </div>
                    </div>
                    
                    <div class="weather-detail-item">
                        <div class="weather-detail-label">Angin</div>
                        <div class="weather-detail-value">
                            <span class="weather-detail-icon">🌬️</span>
                            ${weather.wind_speed || 'N/A'} km/h ${weather.wind_dir ? `(${weather.wind_dir})` : ''}
                        </div>
                    </div>
                    
                    <div class="weather-detail-item">
                        <div class="weather-detail-label">Tekanan</div>
                        <div class="weather-detail-value">
                            <span class="weather-detail-icon">📊</span>
                            ${weather.pressure || 'N/A'} mb
                        </div>
                    </div>
                    
                    <div class="weather-detail-item">
                        <div class="weather-detail-label">Visibilitas</div>
                        <div class="weather-detail-value">
                            <span class="weather-detail-icon">👁️</span>
                            ${weather.visibility || 'N/A'} km
                        </div>
                    </div>
                    
                    <div class="weather-detail-item">
                        <div class="weather-detail-label">Indeks UV</div>
                        <div class="weather-detail-value">
                            <span class="weather-detail-icon">☀️</span>
                            ${weather.uv_index || weather.uv || 'N/A'}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Event listener untuk form submit
    weatherForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const location = search.value;
        
        if (!location) {
            pesanSatu.textContent = 'Mohon masukkan nama lokasi!';
            pesanDua.innerHTML = '';
            return;
        }
        
        // Tampilkan loading
        pesanSatu.textContent = 'Sedang mencari lokasi...';
        pesanDua.innerHTML = '';
        
        try {
            const response = await fetch(`/infoCuaca?address=${encodeURIComponent(location)}`);
            const data = await response.json();
            
            console.log('Response data:', data); // Debug - lihat struktur data
            
            if (data.err) {
                pesanSatu.textContent = data.err;
                pesanDua.innerHTML = '';
            } else {
                pesanSatu.textContent = '';
                pesanDua.innerHTML = createWeatherCard(data);
            }
        } catch (error) {
            pesanSatu.textContent = 'Terjadi kesalahan. Tidak dapat mengambil data.';
            pesanDua.innerHTML = '';
            console.error('Error:', error);
        }
    });
});