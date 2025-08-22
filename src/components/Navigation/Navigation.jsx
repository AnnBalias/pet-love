import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

function Navigation({ isHome = false }) {
  const linkClassName = ({ isActive }) => {
    const baseClass = css.link;
    const activeClass = isActive ? css.active : '';
    const homeClass = isHome ? css.linkHome : '';
    
    return `${baseClass} ${activeClass} ${homeClass}`.trim();
  };

  return (
    <nav className={css.navList}>
      <NavLink
        to="/news"
        className={linkClassName}
      >
        News
      </NavLink>
      <NavLink
        to="/notices"
        className={linkClassName}
      >
        Find pet
      </NavLink>
      <NavLink
        to="/friends"
        className={linkClassName}
      >
        Our friends
      </NavLink>
    </nav>
  );
}

export default Navigation;
