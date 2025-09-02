import { useState } from 'react';
import { NotificationContext } from './contexts';

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random();
    const notification = { id, message, type, duration };

    setNotifications((prev) => [...prev, notification]);

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
  };

  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const showSuccess = (message, duration) => {
    addNotification(message, 'success', duration);
  };

  const showError = (message, duration) => {
    addNotification(message, 'error', duration);
  };

  const showInfo = (message, duration) => {
    addNotification(message, 'info', duration);
  };

  const showWarning = (message, duration) => {
    addNotification(message, 'warning', duration);
  };

  const value = {
    notifications,
    addNotification,
    removeNotification,
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}


