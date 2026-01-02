import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Article {
  id: string;
  text: string;
  svg?: string; // Зберігаємо як Base64 або рядок
  createdAt: number;
}

interface ArticleStore {
  articles: Article[];
  addArticle: (text: string, svg?: string) => void;
  deleteArticle: (id: string) => void;
}

export const useArticleStore = create<ArticleStore>()(
  persist(
    (set) => ({
      articles: [],

      addArticle: (text, svg) => {
        const newArticle: Article = {
          id: Date.now().toString(),
          text,
          svg,
          createdAt: Date.now(),
        };
        set((state) => ({ articles: [newArticle, ...state.articles] }));
      },

      deleteArticle: (id) => {
        set((state) => ({
          articles: state.articles.filter((a) => a.id !== id),
        }));
      },
    }),
    { name: "article-storage" }
  )
);
