"use client";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const NewsPage = () => {
    useEffect(() => {
        console.log("NewsPage mounted");
        fetch('/api/news', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()).then((result) => {
            console.log(result);
        });
    },[]);

    return (
        <div className="p-10 flex-1">
            News
            <Button onClick={() => {
                fetch('/api/news/sports', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => response.json()).then((result) => {
                    console.log(result);
                });
            }}>Fetch News</Button>
        </div>
    );
}

export default NewsPage;