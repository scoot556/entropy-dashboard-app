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
        <Card className="w-full divide-y-2">
            <CardHeader>
                <h1 className="text-2xl font-bold">{article.title}</h1>
            </CardHeader>
            {article.description && (
                <CardContent>
                    <p>{article.description}</p>
                </CardContent>
            )}
            <CardFooter className="justify-between p-4 align-bottom">
                <span>{article.author}, {formattedDateTime}</span>
                <Button variant="outline"><Link href={article.url} rel="noreferrer" target="_blank">Read More</Link></Button>
            </CardFooter>
       </Card>
    );
}