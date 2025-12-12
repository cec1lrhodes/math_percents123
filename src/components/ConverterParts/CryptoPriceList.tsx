import React from "react";
import {
  CRYPTO_CONFIG,
  type CryptoId,
  type CryptoPrices,
} from "../../utils/ApiConverter";
import { cryptoStyles } from "../../stylesTail/ConverterStyles";

interface CryptoPriceListProps {
  prices: CryptoPrices;
  selectedCrypto: CryptoId;
  onSelectCrypto: (cryptoId: CryptoId) => void;
}

const CryptoPriceList: React.FC<CryptoPriceListProps> = React.memo(
  ({ prices, selectedCrypto, onSelectCrypto }) => {
    return (
      <div className={cryptoStyles.container}>
        <h3 className={cryptoStyles.title}>
          <span>Ціни криптовалют</span>
        </h3>
        <div className={cryptoStyles.list}>
          {Object.entries(CRYPTO_CONFIG).map(([id, config]) => {
            const cryptoId = id as CryptoId;
            const price = prices[cryptoId]?.usd; // витягуємо ЦІНУ
            const isSelected = selectedCrypto === id; // перевірка чи вибраний

            return (
              <button
                key={id}
                onClick={() => onSelectCrypto(cryptoId)}
                className={`${cryptoStyles.buttonBase} ${
                  isSelected
                    ? cryptoStyles.buttonSelected
                    : cryptoStyles.buttonUnselected
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`${cryptoStyles.avatarBase} ${
                      isSelected
                        ? cryptoStyles.avatarSelected
                        : cryptoStyles.avatarUnselected
                    }`}
                  >
                    {config.symbol.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className={cryptoStyles.cryptoName(isSelected)}>
                      {config.name}
                    </div>
                    <div className={cryptoStyles.cryptoSymbol(isSelected)}>
                      {config.symbol}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={cryptoStyles.price(isSelected)}>
                    $
                    {price?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

export default CryptoPriceList;
