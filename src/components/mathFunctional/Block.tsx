import React from "react";

interface BlockProps {
  title: string;
  placeholderPercent: string;
  placeholderNumber: string;
  usePercent: () => string;
  useNumber: () => string;
  useResult: () => number | null;
  onPercentChange: (value: string) => void;
  onNumberChange: (value: string) => void;
}

const Block: React.FC<BlockProps> = React.memo(
  ({
    title,
    placeholderPercent,
    placeholderNumber,
    usePercent,
    useNumber,
    useResult,
    onPercentChange,
    onNumberChange,
  }) => {
    const percent = usePercent();
    const number = useNumber();
    const result = useResult();

    return (
      <section>
        <h4>{title}</h4>
        <input
          placeholder={placeholderPercent}
          type="number"
          value={percent}
          onChange={(e) => onPercentChange(e.target.value)}
        />
        <input
          placeholder={placeholderNumber}
          type="number"
          value={number}
          onChange={(e) => onNumberChange(e.target.value)}
        />
        <h4>{result?.toFixed(2) ?? "-"}</h4>
      </section>
    );
  }
);

Block.displayName = "Block";

export default Block;
