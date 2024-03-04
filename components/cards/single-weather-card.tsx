import { Card, CardContent, CardHeader } from "../ui/card";

type Weather = {
    name: string;
    country: string;
    weather: [{
        main: string;
        description: string;
    }];
    sys: {
        country: string;
    };
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        humidity: number;
    };
}

type WeatherCardProps = {
    weather: Weather;
}

export const SingleWeatherCard = ({ weather }: WeatherCardProps) => {
    return (
        <Card className="h-auto mx-auto">
            <CardHeader>
                <h1 className="text-2xl font-bold">{weather?.name}, {weather?.sys?.country}</h1>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 divide-y-2">
                <div className="grid grid-flow-row grid-cols-2">
                    <p>Temperature: {Math.round(weather?.main?.temp)}°C</p>
                    <p>Feels like: {Math.round(weather?.main?.feels_like)}°C</p>
                    <p>Temperature Min: {Math.round(weather?.main?.temp_min)}°C</p>
                    <p>Temperature Max: {Math.round(weather?.main?.temp_max)}°C</p>
                    <p>Humiditiy: {weather?.main?.humidity}</p>
                </div>
                <div className="py-2">
                    <p>Weather: {weather?.weather?.[0]?.main}, {weather?.weather?.[0]?.description}</p>
                </div>
            </CardContent>
            
        </Card>
    );
}