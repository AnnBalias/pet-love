import { Link } from 'react-router-dom';
import css from './RegisterBtn.module.css';

function RegisterBtn({ isHome = false }) {
  const registerBtnClassName = isHome
    ? `${css.registerBtn} ${css.registerBtnHome}`
    : css.registerBtn;

  return (
    <Link to="/register" className={registerBtnClassName}>
      Registration
    </Link>
  );
}

export default RegisterBtn;
