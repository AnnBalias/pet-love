import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import css from './Header.module.css';
import Navigation from '../Navigation/Navigation';
import NavigationAuth from '../NavigationAuth/NavigationAuth';
import NavigationUser from '../NavigationUser/NavigationUser';
import { useUser } from '../../contexts/UserContext';

function Header({ isHome = false }) {
  const { user } = useUser();
  const isAuthenticated = !!user;

  const headerClassName = isHome
    ? `${css.header} ${css.headerHome}`
    : css.header;

  return (
    <header className={headerClassName}>
      <Link to="/" className={css.logo}>
        petl
        <Icon name="heart" className={css.heart} />
        ve
      </Link>
      <Navigation isHome={isHome} />
      {isAuthenticated ? (
        <NavigationUser isHome={isHome} />
      ) : (
        <NavigationAuth isHome={isHome} />
      )}
    </header>
  );
}

export default Header;
