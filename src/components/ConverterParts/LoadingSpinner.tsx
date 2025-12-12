import { loadingSpinnerStyles } from "../../stylesTail/ConverterStyles";

const LoadingSpinner = () => {
  return (
    <div className={loadingSpinnerStyles.container}>
      <div className={loadingSpinnerStyles.content}>
        <div className={loadingSpinnerStyles.spinner}></div>
        <p className={loadingSpinnerStyles.text}>
          Завантаження цін криптовалют...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
