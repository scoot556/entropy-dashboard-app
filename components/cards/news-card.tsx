import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

type Article = {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    publishedAt: string;
}

export const NewsCard = ({ article }: { article: Article }) => {
    const options = { 
        year: "numeric" as const, 
        month: "long" as const, 
        day: "numeric" as const,
        hour: "numeric" as const,
        minute: "numeric" as const,
        second: "numeric" as const,
    };

    const formattedDateTime = new Date(article.publishedAt).toLocaleString('en-AU', options);

    return (
        <Card className={
            article.description ? "w-full divide-y-2 flex flex-col h-fit" : "w-full divide-y-2 justify-between flex flex-col h-full"
        }>
            <CardHeader className={
                article.description ? "p-4" : "p-4 pb-2 h-auto"
            }>
                <h1 className="text-2xl font-bold">{article.title}</h1>
            </CardHeader>
            {article.description && (
                <CardContent>
                    <p className="py-4">{article.description}</p>
                </CardContent>
            )}
            <CardFooter className={
                article.description ? "justify-between p-4 align-bottom" : "p-4 pt-2 h-auto justify-between align-bottom"
            }>
                <span className="text-sm md:text-base">{article.author ? `${article.author}, ${formattedDateTime}` : `${formattedDateTime}`}</span>
                <Button variant="outline"><Link href={article.url} rel="noreferrer" target="_blank">Read More</Link></Button>
            </CardFooter>
       </Card>
    );
}