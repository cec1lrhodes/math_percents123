import React from "react";
import { usePercentsStoreBase } from "../../store/usePercents";

const FourthBlock: React.FC = React.memo(() => {
  const percent = usePercentsStoreBase((s) => s.fourth_percent);
  const number = usePercentsStoreBase((s) => s.fourth_number);
  const result = usePercentsStoreBase((s) => s.resultFourth);
  const setPercent = usePercentsStoreBase((s) => s.setFourthPercent);
  const setNumber = usePercentsStoreBase((s) => s.setFourthNumber);

  return (
    <section>
      <h4>Відняти % від числа</h4>
      <input
        placeholder="Відняти %"
        type="number"
        value={percent}
        onChange={(e) => setPercent(e.target.value)}
      />
      <input
        placeholder="Від числа"
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <h4>{result?.toFixed(2) ?? "-"}</h4>
    </section>
  );
});

export default FourthBlock;
