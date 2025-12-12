// BlockStyles.ts
export const blockStyles = {
  block:
    "bg-gradient-to-br from-[#667eea] to-[#764ba2] dark:from-[#4c5fd7] dark:to-[#5a3a7f] rounded-xl p-4 shadow-lg transition-colors duration-200 ease-in-out w-full max-w-md mx-auto hover:translate-y-[-2px] hover:shadow-xl sm:p-3.5",
  header: "flex justify-between items-center mb-3",

  title:
    "text-sm font-bold text-white uppercase tracking-wide m-0 sm:text-[13px]",

  resetButton:
    "bg-white/20 dark:bg-white/30 border-[1.5px] border-white/30 dark:border-white/40 rounded-md w-7 h-7 text-white text-base font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center p-0 hover:bg-white/30 dark:hover:bg-white/40 hover:border-white/50 hover:scale-105 active:scale-95 disabled:bg-white/5 disabled:border-white/10 disabled:text-white/30 disabled:cursor-not-allowed disabled:transform-none disabled:hover:bg-white/5 disabled:hover:border-white/10 disabled:hover:transform-none",

  inputGroup: "flex flex-col gap-2 mb-3",

  input:
    "bg-white/15 dark:bg-white/20 border-[1.5px] border-white/30 dark:border-white/40 rounded-lg px-3 py-2.5 text-sm text-white font-medium transition-all duration-200 outline-none placeholder:text-white/60 dark:placeholder:text-white/70 placeholder:text-[13px] focus:bg-white/25 dark:focus:bg-white/30 focus:border-white/60 dark:focus:border-white/70 focus:shadow-[0_0_0_2px_rgba(255,255,255,0.1)] hover:border-white/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0 sm:px-[11px] sm:py-[9px] sm:text-[13px]",

  result:
    "bg-white/20 dark:bg-white/25 rounded-lg p-3 text-center backdrop-blur-[10px]",

  resultTitle:
    "text-[11px] text-white/80 dark:text-white/90 mb-1 uppercase tracking-wide font-semibold",

  resultValue:
    "text-2xl font-extrabold text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.2)] dark:[text-shadow:0_2px_10px_rgba(0,0,0,0.3)] sm:text-[22px]",
};
