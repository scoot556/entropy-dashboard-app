"use client";
import { SingleWeatherCard } from "@/components/cards/single-weather-card";
import { WeatherCard } from "@/components/cards/weather-card";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
        form.reset();
    }

    return (
        <div className="w-full flex-1 justify-center items-center">
            <h1 className="text-3xl font-bold">Weather</h1>
            <Form {...form}>
                <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 py-4 w-96 flex flex-col mx-auto">
                    <FormField
                        control={form.control}
                        name="location"
                        disabled={form.formState.isSubmitting}
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
                    <Button type="submit" className="w-full" variant="primary" disabled={form.formState.isSubmitting}>Submit</Button>
                </form>
            </Form>
           {weather && weather.length > 1 && (
            <div className="grid gap-4 justify-center mx-auto md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                {weather.map((weather: any, index: any) => (
                    <WeatherCard weather={weather} setLocation={setLocation} key={index} />
                ))}
            </div>
           )}
           <div className="w-96 mx-auto">
            {weather && weather?.name !== undefined && (
                    <SingleWeatherCard weather={weather} />
                )}
            </div>
        </div>
    );
}

export default WeatherPage;