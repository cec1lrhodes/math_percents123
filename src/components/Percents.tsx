import Block from "./mathFunctional/Block";
import { usePercentsStoreBase } from "../store/usePercents";

// Хуки для першого блоку
const useFirstPercent = () => usePercentsStoreBase((s) => s.first_percent);
const useFirstNumber = () => usePercentsStoreBase((s) => s.first_number);
const useFirstResult = () => usePercentsStoreBase((s) => s.resultFirst);

// Хуки для другого блоку
const useSecondPercent = () => usePercentsStoreBase((s) => s.second_percent);
const useSecondNumber = () => usePercentsStoreBase((s) => s.second_number);
const useSecondResult = () => usePercentsStoreBase((s) => s.resultSecond);

// Хуки для третього блоку
const useThirdPercent = () => usePercentsStoreBase((s) => s.third_percent);
const useThirdNumber = () => usePercentsStoreBase((s) => s.third_number);
const useThirdResult = () => usePercentsStoreBase((s) => s.resultThird);

// Хуки для четвертого блоку
const useFourthPercent = () => usePercentsStoreBase((s) => s.fourth_percent);
const useFourthNumber = () => usePercentsStoreBase((s) => s.fourth_number);
const useFourthResult = () => usePercentsStoreBase((s) => s.resultFourth);

// Хуки для action-ів
const useFirstActions = () => ({
  setPercent: usePercentsStoreBase((s) => s.setFirstPercent),
  setNumber: usePercentsStoreBase((s) => s.setFirstNumber),
});

const useSecondActions = () => ({
  setPercent: usePercentsStoreBase((s) => s.setSecondPercent),
  setNumber: usePercentsStoreBase((s) => s.setSecondNumber),
});

const useThirdActions = () => ({
  setPercent: usePercentsStoreBase((s) => s.setThirdPercent),
  setNumber: usePercentsStoreBase((s) => s.setThirdNumber),
});

const useFourthActions = () => ({
  setPercent: usePercentsStoreBase((s) => s.setFourthPercent),
  setNumber: usePercentsStoreBase((s) => s.setFourthNumber),
});

const Percents = () => {
  const firstActions = useFirstActions();
  const secondActions = useSecondActions();
  const thirdActions = useThirdActions();
  const fourthActions = useFourthActions();

  return (
    <div>
      <Block
        title="% від числа"
        placeholderPercent="%"
        placeholderNumber="від числа"
        usePercent={useFirstPercent}
        useNumber={useFirstNumber}
        useResult={useFirstResult}
        onPercentChange={firstActions.setPercent}
        onNumberChange={firstActions.setNumber}
      />

      <Block
        title="Число за його %"
        placeholderPercent="число"
        placeholderNumber="від числа"
        usePercent={useSecondPercent}
        useNumber={useSecondNumber}
        useResult={useSecondResult}
        onPercentChange={secondActions.setPercent}
        onNumberChange={secondActions.setNumber}
      />

      <Block
        title="Додати % до числа"
        placeholderPercent="%"
        placeholderNumber="число"
        usePercent={useThirdPercent}
        useNumber={useThirdNumber}
        useResult={useThirdResult}
        onPercentChange={thirdActions.setPercent}
        onNumberChange={thirdActions.setNumber}
      />

      <Block
        title="Відняти % від числа"
        placeholderPercent="%"
        placeholderNumber="число"
        usePercent={useFourthPercent}
        useNumber={useFourthNumber}
        useResult={useFourthResult}
        onPercentChange={fourthActions.setPercent}
        onNumberChange={fourthActions.setNumber}
      />
    </div>
  );
};

export default Percents;
