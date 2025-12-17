import { useState, useMemo, useCallback, useEffect } from "react";
import {
  getCryptoPrice,
  useCryptoPrices,
  type CryptoId,
} from "../utils/ApiConverter";

export const useConverter = () => {
  const [usdAmount, setUsdAmount] = useState("");
  const [cryptoAmount, setCryptoAmount] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoId>("bitcoin");

  const { data: prices, isLoading, isError, error } = useCryptoPrices();

  const currentPrice = useMemo(
    () => getCryptoPrice(prices, selectedCrypto),
    [prices, selectedCrypto]
  );

  useEffect(() => {
    if (usdAmount && !isNaN(Number(usdAmount)) && currentPrice) {
      const crypto = Number(usdAmount) / currentPrice;
      setCryptoAmount(crypto.toFixed(8));
    }
  }, [selectedCrypto, currentPrice]);

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

  const handleCryptoSelect = useCallback((id: CryptoId) => {
    setSelectedCrypto(id);
  }, []);

  return {
    usdAmount,
    cryptoAmount,
    selectedCrypto,
    currentPrice,
    prices,
    isLoading,
    isError,
    error,
    handleUsdChange,
    handleCryptoChange,
    handleCryptoSelect,
  };
};
