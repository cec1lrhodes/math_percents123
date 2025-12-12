// #1 ConverterCard.tsx

import { Container } from "postcss";

export const converterStyles = {
  container:
    "bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl dark:shadow-2xl transition-shadow p-6 sm:p-8",

  // USD Input Section
  usdSection: "mb-6",
  label: "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2",
  usdInputWrapper: "relative group",
  usdSymbol:
    "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-xl font-bold group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors",
  usdInput:
    "w-full pl-12 pr-4 py-4 text-2xl font-semibold border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 focus:outline-none transition-all",

  // Exchange Icon
  exchangeIconWrapper: "flex justify-center my-6",
  exchangeIcon:
    "bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 p-3 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer",
  exchangeSvg: "w-6 h-6 text-white",

  // Crypto Select Section
  cryptoSelectSection: "mb-6",
  cryptoSelectWrapper: "relative",
  cryptoSelect:
    "w-full px-4 py-4 text-lg font-medium border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 focus:outline-none transition-all appearance-none cursor-pointer pr-12",
  selectArrow: "absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none",
  selectArrowSvg: "w-5 h-5 text-gray-400 dark:text-gray-500",

  // Crypto Input Section
  cryptoInputSection: "mb-6",
  cryptoInput:
    "w-full px-4 py-4 text-2xl font-semibold border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 focus:outline-none transition-all",

  // Current Price Section
  priceContainer:
    "bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-xl p-5 border-2 border-blue-100 dark:border-gray-600",
  priceContent:
    "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2",
  priceLabel:
    "text-gray-600 dark:text-gray-300 font-semibold text-sm sm:text-base",
  priceValue:
    "text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400",
};
export const errorMessageStyles = {
  container:
    "min-h-screen bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-red-900 flex items-center justify-center p-4",

  card: "bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full",

  content: "text-center",

  iconWrapper:
    "w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4",

  iconSvg: "w-8 h-8 text-red-600 dark:text-red-400",

  title: "text-2xl font-bold text-gray-800 dark:text-white mb-2",

  description: "text-gray-600 dark:text-gray-300 mb-4",

  errorBlock:
    "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg text-sm text-left overflow-auto",
};
//#3 CryptoPriceList.tsx

export const cryptoStyles = {
  container:
    "bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl dark:shadow-2xl transition-shadow p-6 sticky top-4",

  title:
    "text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2",

  list: "space-y-3 max-h-[600px] overflow-y-auto",

  buttonBase:
    "w-full flex justify-between items-center p-4 rounded-xl transition-all",

  buttonSelected:
    "bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 shadow-lg scale-105",

  buttonUnselected:
    "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 hover:scale-102",

  avatarBase:
    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold",

  avatarSelected: "bg-white dark:bg-gray-100 text-blue-600 dark:text-blue-700",

  avatarUnselected:
    "bg-gradient-to-br from-blue-400 to-indigo-500 dark:from-blue-500 dark:to-indigo-600 text-white",

  cryptoName: (isSelected: boolean) =>
    `font-semibold text-sm ${isSelected ? "text-white" : "text-gray-800 dark:text-gray-200"}`,

  cryptoSymbol: (isSelected: boolean) =>
    `text-xs ${isSelected ? "text-blue-100 dark:text-blue-200" : "text-gray-500 dark:text-gray-400"}`,

  price: (isSelected: boolean) =>
    `font-bold text-sm ${isSelected ? "text-white" : "text-gray-800 dark:text-gray-200"}`,
};

//#4 LoadingSpinnerStyles.ts

export const loadingSpinnerStyles = {
  container:
    "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center",

  content: "text-center",

  spinner:
    "w-16 h-16 border-4 border-blue-500 dark:border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4",

  text: "text-xl text-gray-700 dark:text-gray-300 font-medium",
};
