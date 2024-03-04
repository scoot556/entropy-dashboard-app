"use client";
import { NewsCard } from "@/components/cards/news-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

const NewsPage = () => {
    const [news, setNews] = useState<any>([]);

    useEffect(() => {
        fetch('/api/news', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()).then((result) => {
            setNews(result);
        });
    },[]);

    const handleCategoryFetch = (category: string) => {
        setNews([]);
        if (category === "") {
            fetch('/api/news', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => response.json()).then((result) => {
                setNews(result);
            });
            return;
        } else {
            fetch(`/api/news?category=${category}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => response.json()).then((result) => {
                setNews(result);
            });
        }
    }

    return (
        <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold">News</h1>
            <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
                <Button onClick={() => handleCategoryFetch("sports")} variant="primary">Latest Sports News</Button>
                <Button onClick={() => handleCategoryFetch("business")} variant="primary">Latest Business News</Button>
                <Button onClick={() => handleCategoryFetch("entertainment")} variant="primary">Latest Entertainment News</Button>
                <Button onClick={() => handleCategoryFetch("health")} variant="primary">Latest Health News</Button>
                <Button onClick={() => handleCategoryFetch("science")} variant="primary">Latest Science News</Button>
                <Button onClick={() => handleCategoryFetch("")} variant="primary">Latest News</Button>
            </div>
            {news && news.length !== 0 ? (
                <div className="grid gap-8 md:grid-cols-2">
                    {news.map((article: any, index: number) => {
                        return (
                            <NewsCard article={article} key={index} />
                        );
                    })}
                </div>
            ):(
                <div className="flex flex-col gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div className="flex flex-col space-y-3" key={index}>
                            <Skeleton className="h-[125px] w-full rounded-xl" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default NewsPage;