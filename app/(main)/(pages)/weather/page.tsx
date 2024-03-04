"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
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
    const [location, setLocation] = useState<string | number | number[] | undefined>(undefined);
    const [weather, setWeather] = useState<any>([]);

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
                    setLocation([position.coords.latitude, position.coords.longitude]);
                } catch (error) {
                    console.error(error);
                }
            });
        }
    }, []);

    useEffect(() => {
        if (location === undefined) return;
        fetch('/api/weather', {
        method: 'POST',
        body: JSON.stringify({ location }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()).then((result) => {
                setWeather(result);
        });
    },[location]);


    function onSubmit(values: z.infer<typeof formSchema>) {
        setLocation(values.location);
    }

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
            <div className="flex grid-flow-col grid-rows-2 grid-cols-2 gap-2 justify-center items-center">
                {weather.map((weather: any, index: any) => (
                    <Card key={index} className="h-auto w-72">
                        <CardHeader>
                            <h1 className="text-2xl font-bold">{weather?.name}</h1>
                        </CardHeader>
                        <CardContent>
                            <p className="semi-bold">{weather?.country}{weather?.state ? `, ${weather?.state}` : null}</p>
                            <p>{weather?.lat}{weather?.lon && (",")}{weather?.lon}</p>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => setLocation([weather?.lat, weather?.lon])} type="button" className="w-full">View</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
           )}
           {weather && weather?.name !== undefined && (
                <Card className="h-auto w-96">
                    <CardHeader>
                        <h1 className="text-2xl font-bold">{weather?.name}, {weather?.sys?.country}</h1>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <div className="grid grid-flow-row grid-cols-2">
                            <p>Temperature: {Math.round(weather?.main?.temp)}°C</p>
                            <p>Feels like: {Math.round(weather?.main?.feels_like)}°C</p>
                            <p>Temperature Min: {Math.round(weather?.main?.temp_min)}°C</p>
                            <p>Temperature Max: {Math.round(weather?.main?.temp_max)}°C</p>
                            <p>Humiditiy: {weather?.main?.humidity}s</p>
                        </div>
                        <div>
                            <p>Weather: {weather?.weather?.[0]?.main}, {weather?.weather?.[0]?.description}</p>
                        </div>
                    </CardContent>
                    
                </Card>
            )}
        </div>
    );
}

export default WeatherPage;