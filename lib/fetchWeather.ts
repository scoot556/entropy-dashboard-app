export async function fetchWeather(location: string | number[] | undefined) {
    console.log(location);

    if (typeof location === "string") {
        return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=0&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`)
            .then((response) => response.json()).then((result) => {
                console.log(result);
                const filteredResults = result.filter((item:any, index:any, array: any) => 
                    array.findIndex((t: any) => (t.name === item.name && t.country === item.country && t.state === item.state)) === index
                );

                if (filteredResults.length === 1) {
                    console.log(filteredResults[0].lat, filteredResults[0].lon)
                    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${filteredResults[0].lat}&lon=${filteredResults[0].lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric`)
                        .then((response) => response.json());
                } else {
                    return filteredResults;
                }
        });
    }

    if (Array.isArray(location)) {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location[0]}&lon=${location[1]}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric`).then((response) => response.json());
    }
}
