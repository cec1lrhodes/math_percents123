import { useQuery } from "@tanstack/react-query";

// const CRYPTO_IDS = ["bitcoin", "ethereum", "tether", "binancecoin", "solana"];

// ТУТ ДОДАВАТИ НОВІ ВАЛЮТИ
export const CRYPTO_CONFIG = {
  bitcoin: { name: "Bitcoin", symbol: "BTC" },
  ethereum: { name: "Ethereum", symbol: "ETH" },
  tether: { name: "Tether", symbol: "USDT" },
  binancecoin: { name: "Binance Coin", symbol: "BNB" },
  solana: { name: "Solana", symbol: "SOL" },

  cardano: { name: "Cardano", symbol: "ADA" },
  ripple: { name: "Ripple", symbol: "XRP" },
} as const; // as const прив'язав значення до read only Та зробив код безпечнішим, щоб саме н-значення можна було ввести,а не будь-який стрінг(до прикладу)

export type CryptoPrices = {
  // [K in CryptoId] означає: "для кожного ключа з CRYPTO_CONFIG створи властивість з типом { usd: number }"
  [K in CryptoId]: {
    usd: number;
  };
  // 2. TypeScript автоматично оновлює:
  // CryptoId = "bitcoin" | "dogecoin"
  // CryptoPrices = {
  //   bitcoin: { usd: number };
  //   dogecoin: { usd: number };
  // }
};

export type CryptoId = keyof typeof CRYPTO_CONFIG;

const fetchCryptoPrice = async (): Promise<CryptoPrices> => {
  const ids = Object.keys(CRYPTO_CONFIG).join(","); // ../price?ids=bitcoin,ethereum,solana...--> res ${ids}

  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch crypto prices");
  }

  const data: CryptoPrices = await res.json();
  return data;
};

export const useCryptoPrices = () => {
  return useQuery({
    queryKey: ["cryptoPrices"], // Ключ для кешування
    queryFn: fetchCryptoPrice,
    refetchInterval: 60000, // Оновлюємо кожну хвилину
    staleTime: 30000, // Дані свіжі 30 секунд
    placeholderData: (previousData) => previousData,
  });
};

export const getCryptoPrice = (
  data: CryptoPrices | undefined,
  cryptoId: CryptoId
): number | null => {
  return data?.[cryptoId]?.usd ?? null; // data ? існує --> [cryptoId = btc, eth ДИНАМІЧНІ ДАНІ] --> ?? якщо ліва частина undefined --> поверне null
};
