import { Link } from 'react-router-dom';
import css from './LoginBtn.module.css';

function LoginBtn({ isHome = false }) {
  const loginBtnClassName = isHome ? `${css.loginBtn} ${css.loginBtnHome}` : css.loginBtn;

  return (
    <Link to="/login" className={loginBtnClassName}>
      Log In
    </Link>
  );
}

export default LoginBtn;
