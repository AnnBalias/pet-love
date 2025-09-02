import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useUser } from '../../contexts/useUser';
import Navigation from '../Navigation/Navigation';
import NavigationAuth from '../NavigationAuth/NavigationAuth';
import NavigationUser from '../NavigationUser/NavigationUser';
import Icon from '../Icon/Icon';
import css from './MobileMenu.module.css';

function MobileMenu({ isOpen, onClose, isHome = false }) {
  const { user } = useUser();
  const location = useLocation();
  const isAuthenticated = !!user;

  // Close menu when route changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname, onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className={css.backdrop} onClick={onClose} />

      {/* Menu */}
      <div className={`${css.menu} ${isHome ? css.menuHome : css.menuOther}`}>
        {/* Header */}
        <div className={css.header}>
          <button
            className={css.closeBtn}
            onClick={onClose}
            aria-label="Close menu"
          >
            <Icon name="cross" className={css.closeIcon} />
          </button>
        </div>

        {/* Navigation */}
        <div className={css.navigation}>
          <Navigation isHome={false} />
        </div>

        {/* Auth Buttons */}
        <div className={css.authButtons}>
          {isAuthenticated ? (
            <NavigationUser isHome={false} />
          ) : (
            <NavigationAuth isHome={false} />
          )}
        </div>
      </div>
    </>
  );
}

export default MobileMenu;
