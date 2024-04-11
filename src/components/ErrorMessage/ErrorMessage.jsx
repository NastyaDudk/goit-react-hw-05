import css from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <p className={css.error}>
      Oops, something went wrong... Try reloading the page
    </p>
  );
};

export default ErrorMessage;
