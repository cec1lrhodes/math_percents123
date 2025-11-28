import React from "react";
import { usePercentsStoreBase } from "../../store/usePercents";

const SecondBlock: React.FC = React.memo(() => {
  const percent = usePercentsStoreBase((s) => s.second_percent);
  const number = usePercentsStoreBase((s) => s.second_number);
  const result = usePercentsStoreBase((s) => s.resultSecond);
  const setPercent = usePercentsStoreBase((s) => s.setSecondPercent);
  const setNumber = usePercentsStoreBase((s) => s.setSecondNumber);

  return (
    <section>
      <h4>число від числа</h4>
      <input
        placeholder="число"
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <input
        placeholder="від числа"
        type="number"
        value={percent}
        onChange={(e) => setPercent(e.target.value)}
      />
      <h4>{result?.toFixed(2) ?? "-"} %</h4>
    </section>
  );
});

export default SecondBlock;
