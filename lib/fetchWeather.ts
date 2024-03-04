export async function fetchWeather(location: string | number[] | undefined) {
    if (typeof location === "string") {
        return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${process.env.OPEN_WEATHER_API_KEY}`)
            .then((response) => response.json()).then((result) => {
                if (result.length === 1) {
                    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${result[0].lat}&lon=${result[0].lon}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`)
                        .then((response) => response.json());
                } else {
                    const filteredResults = result.filter((item:any, index:any, array: any) => 
                    array.findIndex((t:any) => (
                        t.name === item.name &&
                        t.country === item.country &&
                        t.state === item.state
                    )) === index
                );
                    return filteredResults;
                }
        });
    }

    if (typeof location === "number") {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?id=${location}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`).then((response) => response.json());
    }

    if (Array.isArray(location)) {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location[0]}&lon=${location[1]}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`).then((response) => response.json());
    }
}
