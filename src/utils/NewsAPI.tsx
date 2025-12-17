import { useQuery } from "@tanstack/react-query";

export interface EconomicNews {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

const API_KEY = "d500nshr01qsabpqdfe0d500nshr01qsabpqdfeg";
const BASE_URL = "https://finnhub.io/api/v1";
const QUERY_KEY = "marketNews";

const fetchNews = async (): Promise<EconomicNews[]> => {
  const category = "general";
  const response = await fetch(
    `${BASE_URL}/news?category=${category}&token=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const useNews = () => {
  return useQuery<EconomicNews[], Error>({
    queryKey: [QUERY_KEY],
    queryFn: fetchNews,
    staleTime: 5 * 60 * 1000, // Дані свіжі 5 хвилин
    gcTime: 10 * 60 * 1000, // Кеш зберігається 10 хвилин
    refetchOnWindowFocus: false, // Не перезавантажувати при фокусі
    retry: 2, // Повторити 2 рази при помилці
  });
};
