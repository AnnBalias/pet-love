import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import { useUser } from '../../contexts/UserContext';
import css from './UserBar.module.css';

function UserBar({ isHome = false }) {
  const { user } = useUser();

  const userBarClassName = isHome
    ? `${css.userBar} ${css.userBarHome}`
    : css.userBar;

  // Якщо користувач не авторизований, не показуємо UserBar
  if (!user) {
    return null;
  }

  return (
    <Link to="/profile" className={userBarClassName}>
      <div className={css.avatar}>
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} />
        ) : (
          <Icon name="user" className={css.defaultAvatar} />
        )}
      </div>
      <span className={css.name}>{user.nickname || user.name}</span>
    </Link>
  );
}

export default UserBar;
