import { create } from "zustand";

export type OperationType = // TYPES
  "percent_of" | "number_from_percent" | "add_percent" | "subtract_percent";

export interface BlockState {
  percent: string;
  number: string;
  result: number | null;
}

// Конфіг всіх блоків, просто сюди  додати НОВИЙ блок
export const BLOCK_CONFIGS = {
  first: { operation: "percent_of" as OperationType },
  second: { operation: "number_from_percent" as OperationType },
  third: { operation: "add_percent" as OperationType },
  fourth: { operation: "subtract_percent" as OperationType },
  fifth: { operation: "percent_of" as OperationType },
} as const;

export type BlockKey = keyof typeof BLOCK_CONFIGS; // генерує type BlockKey = "first" | "second" | "third" | "fourth" | "fifth"

export interface PercentsStore {
  blocks: Record<BlockKey, BlockState>;

  updateBlock: (
    key: BlockKey,
    field: "percent" | "number",
    value: string
  ) => void;
}

const calculateResult = (
  percent: string,
  number: string,
  operationType: OperationType
): number | null => {
  if (!percent || !number) return null;

  const p = parseFloat(percent);
  const n = parseFloat(number);

  switch (operationType) {
    case "percent_of":
      return (p / 100) * n;

    case "number_from_percent":
      return (p / n) * 100;

    case "add_percent":
      return n + (p / 100) * n;

    case "subtract_percent":
      return n - (p / 100) * n;
    // сюди нову операцію
    default:
      return null;
  }
};

// Автоматично генеруємо початковий стан з конфігу
// {
//   first: { percent: "", number: "", result: null },
//   second: { percent: "", number: "", result: null },
//   third: { percent: "", number: "", result: null },
//   fourth: { percent: "", number: "", result: null },
//   fifth: { percent: "", number: "", result: null },
// }
const getInitialBlocks = (): Record<BlockKey, BlockState> => {
  const blocks = {} as Record<BlockKey, BlockState>;
  (Object.keys(BLOCK_CONFIGS) as BlockKey[]).forEach((key) => {
    blocks[key] = { percent: "", number: "", result: null };
  });
  return blocks;
};

export const usePercentsStoreBase = create<PercentsStore>((set) => ({
  blocks: getInitialBlocks(),

  updateBlock: (key: BlockKey, field: "percent" | "number", value: string) => {
    set((state) => {
      const block = state.blocks[key];
      const operationType = BLOCK_CONFIGS[key].operation;

      const newBlock = {
        ...block,
        [field]: value,
      };

      const result = calculateResult(
        field === "percent" ? value : block.percent,
        field === "number" ? value : block.number,
        operationType
      );

      return {
        blocks: {
          ...state.blocks,
          [key]: {
            ...newBlock,
            result,
          },
        },
      };
    });
  },
}));
