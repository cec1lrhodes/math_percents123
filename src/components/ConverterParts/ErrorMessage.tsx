import { errorMessageStyles } from "../../stylesTail/ConverterStyles";

interface ErrorMessageProps {
  error: Error | unknown;
}
const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <div className={errorMessageStyles.container}>
      <div className={errorMessageStyles.card}>
        <div className={errorMessageStyles.content}>
          <div className={errorMessageStyles.iconWrapper}>
            <svg
              className={errorMessageStyles.iconSvg}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className={errorMessageStyles.title}>Помилка завантаження</h2>
          <p className={errorMessageStyles.description}>
            Не вдалося отримати ціни криптовалют
          </p>
          <pre className={errorMessageStyles.errorBlock}>
            {error instanceof Error ? error.message : "Unknown error"}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
