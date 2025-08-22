import UserBar from '../UserBar/UserBar';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import css from './NavigationUser.module.css';

function NavigationUser({ isHome = false }) {
  return (
    <nav className={css.navUser}>
      <LogOutBtn isHome={isHome} />
      <UserBar isHome={isHome} />
    </nav>
  );
}

export default NavigationUser;
