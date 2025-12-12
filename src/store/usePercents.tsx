import { create } from "zustand";

export type OperationType = // TYPES
  "percent_of" | "number_from_percent" | "add_percent" | "subtract_percent";

export interface BlockState {
  percent: string;
  number: string;
  result: number | null;
}

// Конфіг всіх блоків, просто сюди  додати НОВИЙ блок +
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

  resetBlock: (key: BlockKey) => void; // передається унікальний ключ для first, second і спрацьовує коректне очищення
}

// MATH
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
    // --> СЮДИ НОВУ ОПЕРАЦІЮ, ЗА ПОТРЕБИ
    default:
      return null;
  }
};

// Автоматично генеруємо початковий стан з конфігу
// {
//   first: { percent: "", number: "", result: null }, 1-ітерація
//   second: { percent: "", number: "", result: null }, 2-га
//   third: { percent: "", number: "", result: null }, 3-тя і тд...
//   fourth: { percent: "", number: "", result: null },
//   fifth: { percent: "", number: "", result: null },
// }
const getInitialBlocks = (): Record<BlockKey, BlockState> => {
  const blocks = {} as Record<BlockKey, BlockState>;
  (Object.keys(BLOCK_CONFIGS) as BlockKey[]).forEach((key) => {
    // key = "second" ітерація по ключам -> blocks["second"] = { percent: "", number: "", result: null };
    blocks[key] = { percent: "", number: "", result: null };
  });
  return blocks; //{first...second...}
};

export const usePercentsStoreBase = create<PercentsStore>((set) => ({
  blocks: getInitialBlocks(),

  updateBlock: (key: BlockKey, field: "percent" | "number", value: string) => {
    set((state) => {
      const block = state.blocks[key]; // {first: { percent: "", number: "100", result: null },second {percent: ...}},

      const operationType = BLOCK_CONFIGS[key].operation; // отримати тип операції

      const newBlock = {
        // 1. bylo -> block = { percent: "", number: "100", result: null }
        ...block, // percent: "", number: "100", result: null
        [field]: value, // [field] стає ["percent"] → percent: "10" --> newBlock = { percent: "10", number: "100", result: null }
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
            result, // перезапис із новим значенням
          },
        },
      };
    });
  },

  resetBlock: (key: BlockKey) => {
    set((state) => ({
      blocks: {
        ...state.blocks,
        [key]: { percent: "", number: "", result: null }, // reset do початкового стану
      },
    }));
  },
}));
