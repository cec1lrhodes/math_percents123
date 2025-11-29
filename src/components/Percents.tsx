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
    title: "Твоя операція",
    placeholderPercent: "...",
    placeholderNumber: "...",
  },
  // new new new
];

const Percents = () => {
  return (
    <div>
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
  );
};

export default Percents;
