import Block from "./mathFunctional/Block";
import { type BlockKey } from "../store/usePercents";

interface BlockConfig {
  key: BlockKey;
  title: string;
  placeholderPercent: string;
  placeholderNumber: string;
}
// тут можна розширювати лешгко блоки, додати 5-6-7...
const blockConfigs: BlockConfig[] = [
  {
    key: "first",
    title: "% від числа",
    placeholderPercent: "%",
    placeholderNumber: "від числа",
  },
  {
    key: "second",
    title: "Число за його %",
    placeholderPercent: "число",
    placeholderNumber: "від числа",
  },
  {
    key: "third",
    title: "Додати % до числа",
    placeholderPercent: "%",
    placeholderNumber: "число",
  },
  {
    key: "fourth",
    title: "Відняти % від числа",
    placeholderPercent: "%",
    placeholderNumber: "число",
  },
  {
    key: "fifth",
    title: "нова операція",
    placeholderPercent: "...",
    placeholderNumber: "...",
  },

  // --> NEW {...}
];

const Percents = () => {
  return (
    <div className="min-h-screen py-8 px-4 sm:py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-8">
          Обчислення
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blockConfigs.map((config) => (
            <Block
              key={config.key}
              blockKey={config.key}
              title={config.title}
              placeholderPercent={config.placeholderPercent}
              placeholderNumber={config.placeholderNumber}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Percents;
