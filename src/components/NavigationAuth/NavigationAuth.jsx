import LoginBtn from '../LoginBtn/LoginBtn';
import RegisterBtn from '../RegisterBtn/RegisterBtn';
import css from './NavigationAuth.module.css';

function NavigationAuth({ isHome = false }) {
  return (
    <nav className={css.navAuth}>
      <LoginBtn isHome={isHome} />
      <RegisterBtn isHome={isHome} />
    </nav>
  );
}

export default NavigationAuth;
