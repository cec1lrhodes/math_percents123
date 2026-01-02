import React, { useState } from "react";
import { type Article, useArticleStore } from "../../store/useArticle";
import { Maximize2, Minimize2, Trash2, X } from "lucide-react";

interface Props {
  article: Article;
}

const ArticleBlock: React.FC<Props> = ({ article }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFullSvg, setShowFullSvg] = useState(false);
  const deleteArticle = useArticleStore((state) => state.deleteArticle);

  const handleToggle = () => {
    // Отримуємо текст, який виділив користувач
    const selection = window.getSelection()?.toString();

    // Якщо користувач щось виділив — нічого не робимо (даємо скопіювати)
    if (selection && selection.length > 0) {
      return;
    }

    // Якщо виділення немає — перемикаємо стан
    setIsExpanded(!isExpanded);
  };

  /**
   * 1. ФУНКЦІЯ ОЧИЩЕННЯ (для прев'ю)
   * Видаляє символи розмітки, щоб у списку був лише чистий текст
   */
  const stripMarkdown = (text: string) => {
    return text
      .replace(/^#\s+/gm, "")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .trim();
  };

  /**
   * 2. ФУНКЦІЯ ФОРМАТУВАННЯ (для повного вигляду)
   */
  const renderFormattedText = (text: string) => {
    return text.split("\n").map((line, i) => {
      // Рендер заголовків
      if (line.startsWith("# ")) {
        return (
          <h3 key={i} className="text-xl font-bold text-blue-400 mt-2 mb-2">
            {line.replace("# ", "")}
          </h3>
        );
      }

      // Рендер жирного тексту
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedLine = parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={index} className="text-white font-extrabold">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      return (
        <p key={i} className="mb-1 min-h-[1rem]">
          {formattedLine}
        </p>
      );
    });
  };

  return (
    <>
      <div
        // Ввесь блок тепер працює як Toggle (перемикач)
        className={`bg-[#1e2235] border border-gray-700/50 rounded-2xl p-5 transition-all duration-500 shadow-lg relative flex flex-col cursor-pointer ${
          isExpanded
            ? "col-span-full ring-2 ring-blue-500/50"
            : "hover:border-blue-500/30 h-full"
        }`}
        onClick={handleToggle}
      >
        <div
          className={
            isExpanded ? "flex flex-col" : "flex gap-4 items-start h-full"
          }
        >
          {/* Зображення / SVG */}
          {article.svg && (
            <div
              className={`flex-shrink-0 bg-black/20 rounded-xl border border-gray-700/30 overflow-hidden transition-all duration-500 ${
                isExpanded
                  ? "w-full h-auto max-h-[400px] mb-6 cursor-zoom-in"
                  : "w-16 h-16"
              }`}
              onClick={(e) => {
                if (isExpanded) {
                  e.stopPropagation(); // Зупиняємо закриття блоку при кліку на фото
                  setShowFullSvg(true);
                }
              }}
            >
              <img
                src={article.svg}
                alt="content"
                className="w-full h-full object-contain p-1"
              />
            </div>
          )}

          {/* Контентна частина */}
          <div className="flex-1 w-full flex flex-col justify-between">
            <div
              className={`text-gray-300 leading-relaxed whitespace-pre-wrap transition-all ${
                isExpanded ? "" : "line-clamp-2 text-sm text-gray-400"
              }`}
            >
              {isExpanded
                ? renderFormattedText(article.text)
                : stripMarkdown(article.text)}
            </div>

            {/* Нижня панель (Дата та Керування) */}
            <div className="mt-4 pt-4 border-t border-gray-700/30 flex items-center justify-between">
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">
                {new Date(article.createdAt).toLocaleDateString("uk-UA")} •{" "}
                {isExpanded ? "Повний текст" : "Прев'ю"}
              </div>

              <div className="flex gap-2">
                {isExpanded && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Зупиняємо закриття блоку при видаленні
                      deleteArticle(article.id);
                    }}
                    className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                    title="Видалити"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
                <div className="p-1.5 text-blue-400">
                  {isExpanded ? (
                    <Minimize2 size={18} />
                  ) : (
                    <Maximize2 size={16} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальне вікно для фото */}
      {showFullSvg && article.svg && (
        <div
          className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out animate-in fade-in duration-300"
          onClick={() => setShowFullSvg(false)}
        >
          <img
            src={article.svg}
            className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
            alt="Full size"
          />
          <X
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            size={32}
          />
        </div>
      )}
    </>
  );
};

export default ArticleBlock;
