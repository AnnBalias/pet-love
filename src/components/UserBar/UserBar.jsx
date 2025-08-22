import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import css from './UserBar.module.css';

function UserBar({ isHome = false }) {
  // TODO: Отримувати дані користувача з Redux store
  const user = {
    name: 'John Doe',
    avatar: null, // null для дефолтного фото
  };

  const userBarClassName = isHome
    ? `${css.userBar} ${css.userBarHome}`
    : css.userBar;

  return (
    <Link to="/profile" className={userBarClassName}>
      <div className={css.avatar}>
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} />
        ) : (
          <Icon name="user" className={css.defaultAvatar} />
        )}
      </div>
      <span className={css.name}>{user.name}</span>
    </Link>
  );
}

export default UserBar;
