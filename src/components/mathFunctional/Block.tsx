import React from "react";
import { usePercentsStoreBase, type BlockKey } from "../../store/usePercents";

interface BlockProps {
  blockKey: BlockKey;
  title: string;
  placeholderPercent: string;
  placeholderNumber: string;
}
const Block: React.FC<BlockProps> = React.memo(
  ({ blockKey, title, placeholderPercent, placeholderNumber }) => {
    const block = usePercentsStoreBase((s) => s.blocks[blockKey]);
    const updateBlock = usePercentsStoreBase((s) => s.updateBlock);

    return (
      <section>
        <h4>{title}</h4>
        <input
          placeholder={placeholderPercent}
          type="number"
          value={block.percent}
          onChange={(e) => updateBlock(blockKey, "percent", e.target.value)}
        />
        <input
          placeholder={placeholderNumber}
          type="number"
          value={block.number}
          onChange={(e) => updateBlock(blockKey, "number", e.target.value)}
        />
        <h4>{block.result?.toFixed(2) ?? "-"}</h4>
      </section>
    );
  }
);

Block.displayName = "Block";

export default Block;
