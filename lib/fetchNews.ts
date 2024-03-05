export async function fetchNews(page: number = 1) {
    return fetch(`https://newsapi.org/v2/top-headlines?country=au&apiKey=${process.env.NEWS_API_KEY}&pageSize=10&page=${page}`).then((response) => response.json());
}

export async function fetchNewsByCategory(category: string, page: number = 1) {
    return fetch(`https://newsapi.org/v2/top-headlines?country=au&category=${category}&apiKey=${process.env.NEWS_API_KEY}&pageSize=10&page=${page}`).then((response) => response.json());
}