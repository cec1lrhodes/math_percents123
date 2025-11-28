import { usePercentsStoreBase } from "../../store/usePercents";
import React from "react";

const FirstBlock: React.FC = React.memo(() => {
  const percent = usePercentsStoreBase((s) => s.first_percent);
  const number = usePercentsStoreBase((s) => s.first_number);
  const result = usePercentsStoreBase((s) => s.resultFirst);

  const setPercent = usePercentsStoreBase((s) => s.setFirstPercent);
  const setNumber = usePercentsStoreBase((s) => s.setFirstNumber);

  return (
    <section>
      <h4>% від числа</h4>
      <input
        placeholder="%"
        type="number"
        value={percent}
        onChange={(e) => setPercent(e.target.value)}
      />
      <input
        placeholder="від числа"
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <h4>{result?.toFixed(2) ?? "-"}</h4>
    </section>
  );
});

export default FirstBlock;

// Помилка infinite loop ZUSTAND SHALLOW
// const firstSelector = (s) => ({
//   first_percent: s.first_percent,
//   first_number: s.first_number,
//   resultFirst: s.resultFirst,
//   setFirstPercent: s.setFirstPercent, <--- функція дії i zustnad povetai ves block first_percent... i td.
//   setFirstNumber: s.setFirstNumber,
// });

// const FirstBlock: React.FC = React.memo(() => {
//   const {
//     first_percent,
//     first_number,
//     resultFirst,
//     setFirstPercent,
//     setFirstNumber,
//   } = usePercentsStoreBase(firstSelector, shallow);
// 1. Згрупувати дані (state)
// const { percent, number, result } = usePercentsStoreBase((s) => ({
//   percent: s.first_percent,
//   number: s.first_number,
//   result: s.resultFirst,
// }), shallow); // Використовуйте Object.is або shallow для порівняння даних

// // 2. Згрупувати дії (actions) - Вони стабільні
// const { setPercent, setNumber } = usePercentsStoreBase((s) => ({
//   setPercent: s.setFirstPercent,
//   setNumber: s.setFirstNumber,
// })); // Не використовуйте Object.is/shallow, оскільки вони не змінюються
