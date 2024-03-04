import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

type Weather = {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state: string;
}

type WeatherCardProps = {
    weather: Weather;
    setLocation: (location: [number, number]) => void;
}

export const WeatherCard = ({ weather, setLocation }: WeatherCardProps) => {
    return (
        <Card className="h-auto w-full">
            <CardHeader>
                <h1 className="text-2xl font-bold">{weather?.name}</h1>
            </CardHeader>
            <CardContent>
                <p className="semi-bold">{weather?.country}{weather?.state ? `, ${weather?.state}` : null}</p>
                <p>{weather?.lat}{weather?.lon && (",")}{weather?.lon}</p>
            </CardContent>
            <CardFooter>
                <Button onClick={() => setLocation([weather?.lat, weather?.lon])} type="button" className="w-full" variant="primary">View</Button>
            </CardFooter>
        </Card>
    );
}