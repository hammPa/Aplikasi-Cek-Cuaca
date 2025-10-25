const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const lat = encodeURIComponent(latitude);
    const lon = encodeURIComponent(longitude);
    const url = `${process.env.WEATHER}/current?access_key=${process.env.API_KEY}&query=${lat},${lon}&units=m`;
    
    request(
        { url, json: true },
        (err, res) => {
            if(err) callback('forecast:Tidak dapat terkoneksi ke layanan', undefined);
            else if(res.body.error) callback('forecast:Tidak dapat menemukan lokasi', undefined);
            else {
                const { current } = res.body;
                const location = res.body.location;
                console.log('Current weather data:', current);
                console.log('Location data:', location);
                
                // Kirim object lengkap, bukan string
                callback(undefined, {
                    temperature: current.temperature,
                    weather_descriptions: current.weather_descriptions,
                    weather_icons: current.weather_icons,
                    wind_speed: current.wind_speed,
                    wind_degree: current.wind_degree,
                    wind_dir: current.wind_dir,
                    pressure: current.pressure,
                    precip: current.precip,
                    humidity: current.humidity,
                    cloudcover: current.cloudcover,
                    feelslike: current.feelslike,
                    uv_index: current.uv_index,
                    visibility: current.visibility,
                    is_day: current.is_day,
                    observation_time: current.observation_time,
                    // Tambahkan location data jika ada
                    location: location ? {
                        lat: location.lat,
                        lon: location.lon,
                        name: location.name,
                        country: location.country,
                        region: location.region
                    } : null
                });
            }
        }
    );
}

module.exports = forecast;