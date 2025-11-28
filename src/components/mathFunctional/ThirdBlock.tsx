import React from "react";
import { usePercentsStoreBase } from "../../store/usePercents";

const ThirdBlock: React.FC = React.memo(() => {
  const percent = usePercentsStoreBase((s) => s.third_percent);
  const number = usePercentsStoreBase((s) => s.third_number);
  const result = usePercentsStoreBase((s) => s.resultThird);
  const setPercent = usePercentsStoreBase((s) => s.setThirdPercent);
  const setNumber = usePercentsStoreBase((s) => s.setThirdNumber);

  return (
    <section>
      <h4>додати % до числа</h4>
      <input
        placeholder="додати %"
        type="number"
        value={percent}
        onChange={(e) => setPercent(e.target.value)}
      />
      <input
        placeholder="до числа"
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <h4>{result?.toFixed(2) ?? "-"}</h4>
    </section>
  );
});

export default ThirdBlock;
