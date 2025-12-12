import React from "react";
import { usePercentsStoreBase, type BlockKey } from "../../store/usePercents";
import { blockStyles } from "../../stylesTail/BlockStyles";

interface BlockProps {
  blockKey: BlockKey;
  title: string;
  placeholderPercent: string;
  placeholderNumber: string;
}
const Block: React.FC<BlockProps> = React.memo(
  ({ blockKey, title, placeholderPercent, placeholderNumber }) => {
    const block = usePercentsStoreBase((s) => s.blocks[blockKey]); // отримали блок
    //     block = {
    //   percent: "10",
    //   number: "100",
    //   result: 10
    // }
    const updateBlock = usePercentsStoreBase((s) => s.updateBlock);
    const resetBlock = usePercentsStoreBase((s) => s.resetBlock);

    const isEmpty = !block.percent && !block.number; // перевірка на наявність 123 в INPUT

    return (
      <section className={blockStyles.block}>
        <div className={blockStyles.header}>
          <h4 className={blockStyles.title}>{title}</h4>

          <button
            className={blockStyles.resetButton}
            onClick={() => resetBlock(blockKey)}
            disabled={isEmpty}
            title={isEmpty ? "Немає даних для очищення" : "Очистити"}
          >
            x
          </button>
        </div>

        <div className={blockStyles.inputGroup}>
          <input
            className={blockStyles.input}
            placeholder={placeholderPercent}
            type="number"
            value={block.percent}
            onChange={(e) => updateBlock(blockKey, "percent", e.target.value)}
          />

          <input
            className={blockStyles.input}
            placeholder={placeholderNumber}
            type="number"
            value={block.number}
            onChange={(e) => updateBlock(blockKey, "number", e.target.value)}
          />
        </div>

        <div className={blockStyles.result}>
          <div className={blockStyles.resultTitle}>Результат</div>
          <h4 className={blockStyles.resultValue}>
            {block.result?.toFixed(2) ?? "-"}
          </h4>
        </div>
      </section>
    );
  }
);

Block.displayName = "Block"; //dev

export default Block;
