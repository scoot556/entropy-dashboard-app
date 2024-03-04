import { fetchNews, fetchNewsByCategory } from "@/lib/fetchNews";
import { NextRequest,NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetchNews();
        return NextResponse.json(response.articles);
    } catch (error: any) {
         return new NextResponse("Internal Error", { status: 500, statusText: error.message});
    }
}

export async function POST(req: NextRequest) {
    try {
        const category = req.nextUrl.searchParams.get('category') || '';
        if (!category) {
            throw new Error('Category is required');
        }
        const response = await fetchNewsByCategory(category);
        return NextResponse.json(response.articles);
    } catch (error) {
         return new NextResponse("Internal Error", { status: 500 });
    }
}