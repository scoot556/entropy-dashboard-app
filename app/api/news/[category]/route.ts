import { fetchNewsByCategory } from "@/lib/fetchNews";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const parsedUrl = new URL(req.url);
        const category = parsedUrl.pathname.split('/')[3];
        const response = await fetchNewsByCategory(category);

        return NextResponse.json(response.articles);
    } catch (error: any) {
         return new NextResponse("Internal Error", { status: 500, statusText: error.message});
    }
}