"use client";
import { NewsCard } from "@/components/cards/news-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

const NewsPage = () => {
    const [news, setNews] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState("general");

    const handlePageChange = async (page: number) => {
        setNews([]);
        setCurrentPage(page);
        fetch(`/api/news?category=${category}&page=${page}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
            }).then((response) => response.json()).then((result) => {
                setNews(result);
        })
    }

    useEffect(() => {
        fetch(`/api/news?category=${category}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()).then((result) => {
            setNews(result);
        });
    },[category]);

    const handleCategoryChange = (category: string) => {
        setNews([]);
        setCurrentPage(1);
        setCategory(category);
    }

    return (
        <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold">News</h1>
            <div className="flex md:gap-2 md:flex-row lg:gap-2 w-full justify-center flex-col gap-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 grid-cols-1">
                    <Button onClick={() => handleCategoryChange("sports")} variant="primary">Sports</Button>
                    <Button onClick={() => handleCategoryChange("business")} variant="primary">Business</Button>
                    <Button onClick={() => handleCategoryChange("entertainment")} variant="primary">Entertainment</Button>
                    <Button onClick={() => handleCategoryChange("health")} variant="primary">Health</Button>
                    <Button onClick={() => handleCategoryChange("science")} variant="primary">Science</Button>
                    <Button onClick={() => handleCategoryChange("technology")} variant="primary">Technology</Button>
                </div>
                <Button onClick={() => handleCategoryChange("general")} variant="primary" className="">Reset</Button>
            </div>
            {news && news.length !== 0 ? (
                <>
                    <div className="grid gap-8 md:grid-cols-2">
                        {news.articles.map((article: any, index: number) => {
                            return (
                                <NewsCard article={article} key={index} />
                            );
                        })}
                    </div>
                    <Pagination>
                            <PaginationContent>
                                {news.pages > 1 && (
                                    <>
                                        <PaginationItem>
                                            <PaginationPrevious href="#" onClick={() => handlePageChange(currentPage - 1)} 
                                                aria-disabled={currentPage <= 1}
                                                tabIndex={currentPage <= 1 ? -1 : undefined}
                                                className={
                                                currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
                                                }
                                            />
                                        </PaginationItem>
                                        {Array.from({ length: news.pages }).map((_, index) => (
                                            <PaginationItem key={index}>
                                                <PaginationLink href="#" onClick={() => handlePageChange(index + 1)}
                                                    className={
                                                        currentPage === index + 1 ? "bg-green-700 text-white" : undefined
                                                    }
                                                >
                                                    {index + 1}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}
                                        <PaginationItem>
                                            <PaginationNext href="#" onClick={() => handlePageChange(currentPage + 1)} 
                                            aria-disabled={currentPage >= news.pages}
                                            tabIndex={currentPage >= news.pages ? -1 : undefined}
                                            className={
                                            currentPage >= news.pages ? "pointer-events-none opacity-50" : undefined
                                            }/>
                                        </PaginationItem>
                                    </>
                                )}
                        </PaginationContent>
                    </Pagination>
                    </>
            ):(
                // <div className="flex flex-col gap-4">
                <div className="grid gap-8 md:grid-cols-2">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div className="flex flex-col space-y-3" key={index}>
                            <Skeleton className="h-64 w-full rounded-xl" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default NewsPage;