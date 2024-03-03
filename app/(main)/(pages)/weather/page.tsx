"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { fetchWeather } from "@/lib/fetchWeather";
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod"
 
const formSchema = z.object({
  location: z.string().min(2).max(50),
})

const WeatherPage = () => {
    const [location, setLocation] = useState<string | number[] | undefined>(undefined);
    const [weather, setWeather] = useState<any>([]);
    const [coords, setCoords] = useState<number[] | undefined>(undefined);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          location: "",
        },
    })

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                try {
                   fetchWeather([position.coords.latitude, position.coords.longitude]).then((result) => setWeather([result]));
                } catch (error) {
                    console.error(error);
                }
            });
        }
    }, []);


    const handleSelectedLocation = (lat:number, lon:number) => {
        setWeather([]);
        fetchWeather([lat, lon]).then((result) => {
            if (result) {
                setWeather([result]);
            }
        });
    }

    // useEffect(() => {
    //     console.log(weather);
    //     console.log(weather.length);
    // }, [weather]);

    useEffect(() => {
        console.log(coords);
        if (coords) {
            fetchWeather(coords).then((result) => {
                console.log(result)
                if (result) {
                    console.log("got result")
                    setWeather([result]);
                }
            });
        }
    
    }, [coords])


    // console.log(weather?.length);

    function onSubmit(values: z.infer<typeof formSchema>) {
        fetchWeather(values.location).then((result) => setWeather(result));
    }

    console.log(weather);
    console.log(Array.isArray(weather) ? weather.length : 'weather is not an array');
    console.log(weather.length);
    console.log(weather?.name);
    console.log(weather?.sys?.country);
    console.log(weather?.main?.temp);
    console.log(weather?.weather?.[0]?.main);


    return (
        <div className="p-10 flex-1">
            <h1 className="text-3xl font-bold">Weather</h1>
            <Form {...form}>
                <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 py-4">
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="Tokyo" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
           {weather && weather.length > 1 && (
            <div className="grid grid-flow-col grid-rows-3 gap-4">
                {weather.map((weather: any, index: any) => (
                    <Card key={index}>
                        <span className="font-bold">{weather?.name}</span>
                        <p>
                            <span className="font-bold">{weather?.sys.country} | {weather?.coord?.lat},{weather?.coord?.lon}</span>
                        </p>
                        {/* <Button onClick={() => handleSelectedLocation(weather.lat, weather.lon)} type="button">View</Button> */}
                        <Button onClick={() => setCoords([weather.coord.lat, weather.coord.lon])} type="button">View</Button>
                    </Card>
                ))}
            </div>
           )}
           {weather && weather.length === 1 && (
                <Card className="h-auto w-full">
                    <h1 className="text-2xl font-bold">{weather?.[0]?.name}, {weather?.[0]?.sys?.country}</h1>
                    <p>Temperature: <span className="font-bold">{Math.round(weather?.[0]?.main?.temp)}°C</span></p>
                    <p>Weather: <span className="font-bold">{weather?.[0]?.weather?.[0]?.main}</span></p>
                </Card>
            )}

            {/* <Button onClick={() => console.log("WEATHER", weather)}>Log Weather</Button>
            <Button onClick={() => fetch('https://openweathermap.org/data/2.5/find?q=Melbourne&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric').then((response) => response.json()).then((result) => console.log(result))}>Fetch</Button> */}
        </div>
    );
}

export default WeatherPage;