import { useNotification } from '../../contexts/useNotification';
import Icon from '../Icon/Icon';
import css from './NotificationContainer.module.css';

function NotificationContainer() {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) {
    return null;
  }

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return 'check';
      case 'error':
        return 'cross';
      case 'warning':
        return 'eye';
      case 'info':
      default:
        return 'star';
    }
  };

  return (
    <div className={css.container}>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${css.notification} ${css[notification.type]}`}
        >
          <div className={css.content}>
            <Icon name={getIcon(notification.type)} className={css.icon} />
            <span className={css.message}>{notification.message}</span>
          </div>
          <button
            className={css.closeBtn}
            onClick={() => removeNotification(notification.id)}
          >
            <Icon name="cross" className={css.closeIcon} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default NotificationContainer;
