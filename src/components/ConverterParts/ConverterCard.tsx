import React from "react";
import { CRYPTO_CONFIG, type CryptoId } from "../../utils/ApiConverter";
import { useMemo } from "react";
import { converterStyles } from "../../stylesTail/ConverterStyles";

interface ConverterCardProps {
  usdAmount: string;
  cryptoAmount: string;
  selectedCrypto: CryptoId;
  currentPrice: number | null;
  onUsdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCryptoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCryptoSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;

  onSwap: () => void;
}

const ConverterCard: React.FC<ConverterCardProps> = ({
  usdAmount,
  cryptoAmount,
  selectedCrypto,
  currentPrice,
  onUsdChange,
  onCryptoChange,
  onCryptoSelect,
  onSwap,
}) => {
  const UsdSection = (
    <div className={converterStyles.usdSection}>
      <label className={converterStyles.label}>Сума в USD</label>
      <div className={converterStyles.usdInputWrapper}>
        <span className={converterStyles.usdSymbol}>$</span>
        <input
          type="number"
          value={usdAmount}
          onChange={onUsdChange}
          placeholder="0.00"
          className={converterStyles.usdInput}
        />
      </div>
    </div>
  );

  const CryptoSection = (
    <div className={converterStyles.cryptoInputSection}>
      <label className={converterStyles.label}>
        Кількість {CRYPTO_CONFIG[selectedCrypto].symbol}
      </label>
      <input
        type="number"
        value={cryptoAmount}
        onChange={onCryptoChange}
        placeholder="0.00000000"
        className={converterStyles.cryptoInput}
      />
    </div>
  );

  const cryptoOptions = useMemo(
    () =>
      Object.entries(CRYPTO_CONFIG).map(([id, config]) => (
        <option key={id} value={id}>
          {config.name} ({config.symbol})
        </option>
      )),
    []
  );

  return (
    <div className={converterStyles.container}>
      {/* Контейнер з динамічним порядком */}
      <div className="flex flex-col">
        {UsdSection}

        {/* Іконка обміну  */}
        <div className={converterStyles.exchangeIconWrapper}>
          <button
            onClick={onSwap}
            type="button"
            className={`${converterStyles.exchangeIcon} hover:scale-110 active:rotate-180 transition-transform duration-300 cursor-pointer border-none bg-transparent`}
          >
            <svg
              className={converterStyles.exchangeSvg}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
          </button>
        </div>

        {CryptoSection}
      </div>

      {/* Вибір криптовалюти */}
      <div className={converterStyles.cryptoSelectSection + " mt-6"}>
        <label className={converterStyles.label}>Оберіть криптовалюту</label>
        <div className={converterStyles.cryptoSelectWrapper}>
          <select
            value={selectedCrypto}
            onChange={onCryptoSelect}
            className={converterStyles.cryptoSelect}
          >
            {cryptoOptions}
          </select>
          <div className={converterStyles.selectArrow}>
            <svg
              className={converterStyles.selectArrowSvg}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Поточний курс */}
      {currentPrice && (
        <div className={converterStyles.priceContainer}>
          <div className={converterStyles.priceContent}>
            <span className={converterStyles.priceLabel}>Поточний курс:</span>
            <span className={converterStyles.priceValue}>
              1 {CRYPTO_CONFIG[selectedCrypto].symbol} = $
              {currentPrice.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
export default ConverterCard;
