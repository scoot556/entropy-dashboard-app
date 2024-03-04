export async function fetchNews() {
    return fetch(`https://newsapi.org/v2/top-headlines/sources?language=en&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`).then((response) => response.json());
}

export async function fetchNewsByCategory(category: string) {
    return fetch(`https://newsapi.org/v2/top-headlines?country=au&category=${category}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`).then((response) => response.json());
}