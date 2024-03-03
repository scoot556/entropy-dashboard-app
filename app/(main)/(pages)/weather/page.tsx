"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { fetchWeather } from "@/lib/fetchWeather";
import { zodResolver } from "@hookform/resolvers/zod"
import { ChangeEvent, use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod"
 
const formSchema = z.object({
  location: z.string().min(2).max(50),
})

const WeatherPage = () => {
    const [location, setLocation] = useState<string | number[] | undefined>(undefined);
    const [weather, setWeather] = useState<any>(undefined);

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
                   fetchWeather([position.coords.latitude, position.coords.longitude]).then((result) => setWeather(result));
                } catch (error) {
                    console.error(error);
                }
            });
        }
    }, []);

    // const weather = fetchWeather();

    function onSubmit(values: z.infer<typeof formSchema>) {
        // fetchWeather(values.location).then((result) => setWeather(result));
    }

    return (
        <div className="p-10 flex-1">
            <h1 className="text-3xl font-bold">Weather</h1>
            <Form {...form}>
                <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
           
            {weather && (
                <Card>
                    <h1 className="text-2xl font-bold">Current Weather</h1>
                    <p>Location: <span className="font-bold">{weather?.name}</span></p>
                    <p>Temperature: <span className="font-bold">{weather?.main?.temp}</span></p>
                    <p>Weather: <span className="font-bold">{weather?.weather[0]?.main}</span></p>
                </Card>
            )}
        </div>
    );
}

export default WeatherPage;