import { Audio } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = ({ loading }) => {
  return (
      <div className={css.loaderWrapper}>
    <Audio
  visible={loading}
  height="80"
  width="80"
  radius="9"
  color="#4e75ff"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
      />
      </div>
  );
};

export default Loader;
