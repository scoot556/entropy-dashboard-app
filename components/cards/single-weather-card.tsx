import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Clear from "@/app/assets/clear.png"
import Clouds from "@/app/assets/cloud.png"
import Drizzle from "@/app/assets/rain.png"
import Rain from "@/app/assets/rain.png"
import Snow from "@/app/assets/snow.png"
import Mist from "@/app/assets/mist.png"
import Thunderstorm from "@/app/assets/thunder.png"
import { WiThermometer } from 'react-icons/wi'
import { BiWater } from 'react-icons/bi'
import { TbWind } from 'react-icons/tb'
import { AiOutlineEye } from 'react-icons/ai'
import { IconContext } from "react-icons";
import Image from "next/image";


type Weather = {
    name: string;
    country: string;
    weather: [{
        main: string;
        description: string;
        speed: number;
    }];
    wind: {
        speed: number;
    };
    visibility: number;
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
                <div className="flex flex-row justify-start">
                    {weather?.weather?.[0]?.main === "Clear" && <Image src={Clear} alt="Clear" className="w-20 h-20"/>}
                    {weather?.weather?.[0]?.main === "Clouds" && <Image src={Clouds} alt="Clouds" className="w-20 h-20"/>}
                    {weather?.weather?.[0]?.main === "Drizzle" && <Image src={Drizzle} alt="Drizzle" className="w-20 h-20"/>}
                    {weather?.weather?.[0]?.main === "Rain" && <Image src={Rain} alt="Rain" className="w-20 h-20"/>}
                    {weather?.weather?.[0]?.main === "Snow" && <Image src={Snow} alt="Snow" className="w-20 h-20"/>}
                    {weather?.weather?.[0]?.main === "Thunderstorm" && <Image src={Thunderstorm} alt="Thunderstorm" className="w-20 h-20"/>}
                    {weather?.weather?.[0]?.main === "Mist" && <Image src={Mist} alt="Mist" className="w-20 h-20"/>}
                    <div className="h-20 justify-center flex flex-col my-auto">
                        <h1 className="text-2xl font-bold">{weather?.name}, {weather?.sys?.country}</h1>
                        <span>Feels like {Math.round(weather?.main?.feels_like)}°C, {(weather?.weather?.[0]?.description).charAt(0).toUpperCase()+(weather?.weather?.[0]?.description).slice(1)}</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 divide-y-2 w-full">
                {/* <div className="grid grid-flow-row grid-cols-2"> */}
                <div className='grid grid-cols-2 gap-x-8 gap-y-6 w-full'>
                    <IconContext.Provider value={{ size: '2em'}}>
                        <div className="flex items-center ">
                            <WiThermometer/>
                            {/* <div className='flex flex-col'> */}
                                <span>Temp: {Math.round(weather?.main?.temp)}°C</span>
                            {/* </div> */}
                        </div>
                     
                    {/* <div className='flex'>
                      <IconContext.Provider value={{size: '60', className: 'high-arrow'}} >
                        <WiDirectionUp />
                      </IconContext.Provider>
                      <IconContext.Provider value={{size: '90', className: 'low-arrow'}} >
                        <WiDirectionDown />
                      </IconContext.Provider>
                      <div className='flex flex-col'>
                        <span>{Math.round(weather?.main?.temp_max)}°/{Math.round(weather?.main?.temp_min)}°</span>
                        <p>High/Low</p>
                      </div>
                    </div> */}
                   
                    <div className='flex items-center'>
                        <BiWater/>
                        <span>Humidity: {Math.round(weather?.main?.humidity)}%</span>
                    </div>
                   
                   
                   
                    <div className='flex items-center'>
                        <TbWind/>
                        <span>Wind: {Math.round(weather?.wind?.speed)} km/h</span>
                    </div>

                    <div className='flex items-center'>
                        <AiOutlineEye/>
                        <span>Visibility: {Math.round(weather?.visibility/1000)} km</span>
                    </div>
                  
                        {/* <p>Temperature: </p> */}
                        {/* <p>Feels like: {Math.round(weather?.main?.feels_like)}°C</p>
                        <p>Temperature Min: {Math.round(weather?.main?.temp_min)}°C</p>
                        <p>Temperature Max: {Math.round(weather?.main?.temp_max)}°C</p>
                        <p>Humiditiy: {weather?.main?.humidity}</p> */}
                    </IconContext.Provider>
                </div>
                {/* <div className="py-2">
                </div> */}
            </CardContent>
            <CardFooter className="border-t-2 pt-4 flex text-center justify-center">
                <span>Updated at: {new Date().toLocaleString()}</span>
                {/* <a href={`https://openweathermap.org/city/${weather?.sys?.id}`} target="_blank" rel="noreferrer">OpenWeatherMap</a> */}
            </CardFooter>
        </Card>
    );
}