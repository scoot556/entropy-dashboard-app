export async function fetchWeather(location: string | number[] | undefined) {
    console.log(location);

    if (typeof location === "string") {
        // return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=0&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`)
        return fetch(`https://openweathermap.org/data/2.5/find?q=${location}&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric`)
            .then((response) => response.json()).then((result) => {
                console.log(result);
                // const filteredResults = result.list.filter((item:any, index:any, array: any) => 
                //     // array.findIndex((t: any) => (t.name === item.name && t.country === item.country && t.state === item.state)) === index
                //     array.findIndex((t:any) => (
                //         t.name === item.name &&
                //         t.sys.country === item.sys.country &&

                //     ))
                // );

                if (result.length === 1) {
                    console.log(result[0].coord.lat, result[0].coord.lon)
                    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${result[0].coord.lat}&lon=${result[0].coord.lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric`)
                        .then((response) => response.json());
                } else {
                    return result.list;
                }
        });
    }

    if (Array.isArray(location)) {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location[0]}&lon=${location[1]}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric`).then((response) => response.json());
    }
}
