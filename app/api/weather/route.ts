import { fetchWeather } from "@/lib/fetchWeather";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { location } = await req.json();
        const response = await fetchWeather(location);

        return NextResponse.json(response);
    } catch (error) {
         return new NextResponse("Internal Error", { status: 500 });
    }
}