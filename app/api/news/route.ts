import { fetchNews } from "@/lib/fetchNews";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetchNews();
        return NextResponse.json(response.articles);
    } catch (error: any) {
         return new NextResponse("Internal Error", { status: 500, statusText: error.message});
    }
}