import React, { useEffect } from "react";
import { useArticleStore } from "../../store/useArticle";
import ArticleBlock from "./ArticleBlock";
import { Plus, Image as ImageIcon, ArrowUp } from "lucide-react";
import { useState, useRef } from "react";

const ArticleMain = () => {
  const [inputText, setInputText] = useState("");
  const [selectedSvg, setSelectedSvg] = useState<string | undefined>(undefined);
  const addArticle = useArticleStore((state) => state.addArticle);
  const articles = useArticleStore((state) => state.articles);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputText]);

  const applyFormatting = (prefix: string, suffix: string = "") => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const text = el.value;
    const selectedText = text.substring(start, end);
    const before = text.substring(0, start);
    const after = text.substring(end);

    const newText = `${before}${prefix}${selectedText}${suffix}${after}`;
    setInputText(newText);

    // Повертаємо фокус
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const handlePush = () => {
    if (!inputText.trim()) return;
    addArticle(inputText, selectedSvg);
    setInputText("");
    setSelectedSvg(undefined);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedSvg(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="maw-w-4xl mx-auto p-6">
      <h4 className="text-2xl font-bold mb-6 dark:text-white">
        Що хочете написати?
      </h4>
      {/* Поле вводу  */}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-8">
        <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-4 mb-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Додати зображення/SVG"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors relative"
          >
            {selectedSvg ? (
              <img
                src={selectedSvg}
                className="w-6 h-6 object-contain"
                alt="preview"
              />
            ) : (
              <Plus size={24} className="text-blue-500" />
            )}
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />

          <textarea
            ref={textareaRef}
            className="flex-1 bg-transparent outline-none text-gray-200 text-lg resize-none py-2 min-h-[45px] max-h-[300px] overflow-y-auto"
            placeholder="Що хочете написати? (використовуйте # для заголовків або ** для жирного)"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.ctrlKey) handlePush(); // Ctrl+Enter для відправки
              if (e.key === "b" && e.ctrlKey) {
                e.preventDefault();
                applyFormatting("**", "**");
              }
            }}
          />
          <button
            onClick={handlePush}
            disabled={!inputText.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-2 rounded-lg transition-all"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>

      {/* Блоки */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {articles.map((article) => (
          <ArticleBlock key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticleMain;
