import { useNews, type EconomicNews } from "../../utils/NewsAPI";
import { Newspaper, ExternalLink, Clock, AlertCircle } from "lucide-react";

const NewsComponent = () => {
  const { data: newsData, isLoading, isError, error } = useNews();

  // Функція для форматування дати
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return `${diffMinutes} хв тому`;
    } else if (diffHours < 24) {
      return `${diffHours} год тому`;
    } else {
      return date.toLocaleDateString("uk-UA", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  };

  // Стан завантаження
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6">
              <div className="h-48 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Стан помилки
  if (isError) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-3">
          <AlertCircle className="text-red-500 flex-shrink-0 mt-1" size={24} />
          <div>
            <h3 className="text-red-800 font-semibold text-lg mb-1">
              Помилка завантаження новин
            </h3>
            <p className="text-red-600">
              {error?.message || "Невідома помилка"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Заголовок */}
      <div className="flex items-center gap-3 mb-8">
        <Newspaper className="text-blue-600" size={32} />
        <h1 className="text-3xl font-bold text-gray-800">Ринкові новини</h1>
      </div>

      {/* Перевірка на пусті дані */}
      {!newsData || newsData.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Newspaper className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-lg">Новини не знайдені</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsData.map((item: EconomicNews) => (
            <article
              key={item.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              {/* Зображення */}
              {item.image && item.image.startsWith("http") && (
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.headline}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  {/* Бейдж категорії */}
                  <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
              )}

              {/* Контент */}
              <div className="p-5 flex-1 flex flex-col">
                {/* Заголовок */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mb-3"
                >
                  <h2 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                    {item.headline}
                  </h2>
                </a>

                {/* Резюме */}
                <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>

                {/* Футер картки */}
                <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{formatDate(item.datetime)}</span>
                  </div>
                  <span className="font-medium text-gray-700">
                    {item.source}
                  </span>
                </div>

                {/* Кнопка "Читати далі" */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm py-2 px-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Читати повністю
                  <ExternalLink size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsComponent;
