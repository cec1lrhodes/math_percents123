import React, { useCallback } from "react";
import { useState } from "react";
import {
  getCryptoPrice,
  useCryptoPrices,
  type CryptoId,
} from "../utils/ApiConverter";
import { useMemo } from "react";
import LoadingSpinner from "./ConverterParts/LoadingSpinner";
import ErrorMessage from "./ConverterParts/ErrorMessage";
import CryptoPriceList from "./ConverterParts/CryptoPriceList";
import ConverterCard from "./ConverterParts/ConverterCard";
import { useEffect } from "react";

const Converter = () => {
  const [usdAmount, setUsdAmount] = useState("");
  const [cryptoAmount, setCryptoAmount] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoId>("bitcoin");

  const { data: prices, isLoading, isError, error } = useCryptoPrices();

  const currentPrice = useMemo(
    () => getCryptoPrice(prices, selectedCrypto),
    [prices, selectedCrypto] // викликається лише тоді коли ці дві залежності змінюються, тобто якщо юзер вводить USD то не буде ререндеру
  );

  // основна оптимізація PriceList, щоб не було зайвого ререндеру коли змінюється Converter а в ньому usdAmount/cryptoAmount
  useEffect(() => {
    console.log("Converter mounted(router check)");
    if (usdAmount && !isNaN(Number(usdAmount)) && currentPrice) {
      const crypto = Number(usdAmount) / currentPrice;
      setCryptoAmount(crypto.toFixed(8));
    }
  }, [selectedCrypto, currentPrice]); // Коли змінюється вибір або ціна

  const handleUsdChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setUsdAmount(value);

      if (!currentPrice || value === "" || isNaN(Number(value))) {
        setCryptoAmount("");
      } else {
        const crypto = Number(value) / currentPrice;
        setCryptoAmount(crypto.toFixed(8));
      }
    },
    [currentPrice]
  );

  const handleCryptoChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCryptoAmount(value);

      if (!currentPrice || value === "" || isNaN(Number(value))) {
        setUsdAmount("");
      } else {
        const usd = Number(value) * currentPrice;
        setUsdAmount(usd.toFixed(2));
      }
    },
    [currentPrice]
  );

  const handleCryptoSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newCrypto = e.target.value as CryptoId;
      setSelectedCrypto(newCrypto);

      if (usdAmount && !isNaN(Number(usdAmount))) {
        const newPrice = getCryptoPrice(prices, newCrypto);
        if (newPrice) {
          const crypto = Number(usdAmount) / newPrice;
          setCryptoAmount(crypto.toFixed(8));
        }
      }
    },
    [usdAmount, prices]
  );

  const handleSelectCrypto = useCallback((cryptoId: CryptoId) => {
    setSelectedCrypto(cryptoId);
  }, []); // пусті залежності --> useEffect

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage error={error} />;

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Заголовок */}
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-3">
            Крипто Конвертер
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Конвертуйте USD в криптовалюти в реальному часі
          </p>
        </header>

        {/* Основний контент */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Ліва колонка - Конвертер */}
          <div className="lg:col-span-2">
            <ConverterCard
              usdAmount={usdAmount}
              cryptoAmount={cryptoAmount}
              selectedCrypto={selectedCrypto}
              currentPrice={currentPrice}
              onUsdChange={handleUsdChange}
              onCryptoChange={handleCryptoChange}
              onCryptoSelect={handleCryptoSelect}
            />
          </div>

          {/* Права колонка - Список цін */}
          <div className="lg:col-span-1">
            {prices && (
              <CryptoPriceList
                prices={prices}
                selectedCrypto={selectedCrypto}
                onSelectCrypto={handleSelectCrypto}
              />
            )}
          </div>
        </div>

        {/* Футер */}
        <footer className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm">
          <p>Дані оновлюються автоматично кожну хвилину</p>
          <p className="mt-1">Powered by CoinGecko API</p>
        </footer>
      </div>
    </div>
  );
};

export default Converter;
