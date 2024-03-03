export async function fetchWeather(location: string | number[] | undefined) {
    // if ('geolocation' in navigator) {
    //     console.log(navigator.geolocation.getCurrentPosition);
    // }

    console.log(location);

    if (typeof location === "string") {
        return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=0&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`)
        // return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric`)
            .then((response) => response.json());
    }

    console.log(process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY)

    if (Array.isArray(location)) {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location[0]}&lon=${location[1]}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric`).then((response) => response.json());
    }

    // return fetch("https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=London&aqi=no")
    //     .then((response) => response.json());
}
