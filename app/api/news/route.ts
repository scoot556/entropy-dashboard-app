import { fetchNews, fetchNewsByCategory } from "@/lib/fetchNews";
import { NextRequest,NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const page = Number(req.nextUrl.searchParams.get('page')) || 1;
        const response = await fetchNews(page);
        return NextResponse.json({articles: response.articles, pages: Math.ceil(response.totalResults/10)});
    } catch (error: any) {
         return new NextResponse("Internal Error", { status: 500, statusText: error.message});
    }
}

export async function POST(req: NextRequest) {
    try {
        const page = Number(req.nextUrl.searchParams.get('page')) || 1;
        const category = req.nextUrl.searchParams.get('category') || '';
        if (!category) {
            throw new Error('Category is required');
        }
        const response = await fetchNewsByCategory(category,page);
        return NextResponse.json({articles: response.articles, pages: Math.ceil(response.totalResults/10)});
        // return NextResponse.json(response.articles);
    } catch (error) {
         return new NextResponse("Internal Error", { status: 500 });
    }
}