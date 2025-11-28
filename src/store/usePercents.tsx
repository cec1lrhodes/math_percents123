import { create } from "zustand";

export interface PercentsStore {
  // Блок 1: Знайти відсоток від числа
  first_percent: string;
  first_number: string;
  resultFirst: number | null;

  // Блок 2: Знайти число за його відсотком
  second_percent: string;
  second_number: string;
  resultSecond: number | null;

  // Блок 3: Додати відсоток до числа
  third_percent: string;
  third_number: string;
  resultThird: number | null;

  // Блок 4: Відняти відсоток від числа
  fourth_percent: string;
  fourth_number: string;
  resultFourth: number | null;

  // Actions
  setFirstPercent: (value: string) => void;
  setFirstNumber: (value: string) => void;

  setSecondPercent: (value: string) => void;
  setSecondNumber: (value: string) => void;

  setThirdPercent: (value: string) => void;
  setThirdNumber: (value: string) => void;

  setFourthPercent: (value: string) => void;
  setFourthNumber: (value: string) => void;
}

export const usePercentsStoreBase = create<PercentsStore>((set) => ({
  first_percent: "",
  first_number: "",
  resultFirst: null,

  second_percent: "",
  second_number: "",
  resultSecond: null,

  third_percent: "",
  third_number: "",
  resultThird: null,

  fourth_percent: "",
  fourth_number: "",
  resultFourth: null,

  setFirstPercent: (value: string) => {
    set((state) => ({
      first_percent: value,
      resultFirst:
        value && state.first_number
          ? (parseFloat(value) / 100) * parseFloat(state.first_number)
          : null,
    }));
  },

  setFirstNumber: (value: string) => {
    set((state) => ({
      first_number: value,
      resultFirst:
        value && state.first_percent
          ? (parseFloat(state.first_percent) / 100) * parseFloat(value)
          : null,
    }));
  },

  setSecondPercent: (value: string) => {
    set((state) => ({
      second_percent: value,
      resultSecond:
        value && state.second_number
          ? (parseFloat(value) / parseFloat(state.second_number)) * 100
          : null,
    }));
  },

  setSecondNumber: (value: string) => {
    set((state) => ({
      second_number: value,
      resultSecond:
        value && state.second_percent
          ? (parseFloat(state.second_percent) / parseFloat(value)) * 100
          : null,
    }));
  },

  setThirdPercent: (value: string) => {
    set((state) => ({
      third_percent: value,
      resultThird:
        value && state.third_number
          ? parseFloat(state.third_number) +
            (parseFloat(value) / 100) * parseFloat(state.third_number)
          : null,
    }));
  },

  setThirdNumber: (value: string) => {
    set((state) => ({
      third_number: value,
      resultThird:
        value && state.third_percent
          ? parseFloat(value) +
            (parseFloat(state.third_percent) / 100) * parseFloat(value)
          : null,
    }));
  },

  setFourthPercent: (value: string) => {
    set((state) => ({
      fourth_percent: value,
      resultFourth:
        value && state.fourth_number
          ? parseFloat(state.fourth_number) -
            (parseFloat(value) / 100) * parseFloat(state.fourth_number)
          : null,
    }));
  },

  setFourthNumber: (value: string) => {
    set((state) => ({
      fourth_number: value,
      resultFourth:
        value && state.fourth_percent
          ? parseFloat(value) -
            (parseFloat(state.fourth_percent) / 100) * parseFloat(value)
          : null,
    }));
  },
}));
// selector
