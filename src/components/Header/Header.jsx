import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import css from './Header.module.css';
import Navigation from '../Navigation/Navigation';
import NavigationAuth from '../NavigationAuth/NavigationAuth';
import NavigationUser from '../NavigationUser/NavigationUser';
import MobileMenu from '../MobileMenu/MobileMenu';
import { useUser } from '../../contexts/useUser';

function Header({ isHome = false }) {
  const { user } = useUser();
  const isAuthenticated = !!user;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1280);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const headerClassName = isHome
    ? `${css.header} ${css.headerHome}`
    : css.header;

  const handleOpenMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const handleCloseMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      <header className={headerClassName}>
        <Link to="/" className={css.logo}>
          petl
          <Icon name="heart" className={css.heart} />
          ve
        </Link>

        {/* Desktop Navigation */}
        <div className={css.desktopNav}>
          <Navigation isHome={isHome} />
          {isAuthenticated ? (
            <NavigationUser isHome={isHome} />
          ) : (
            <NavigationAuth isHome={isHome} />
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={css.mobileMenuBtn}
          onClick={handleOpenMobileMenu}
          aria-label="Open mobile menu"
        >
          <Icon name="menu" className={css.menuIcon} />
        </button>
      </header>

      {/* Mobile Menu - only render on mobile */}
      {isMobile && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={handleCloseMobileMenu}
          isHome={isHome}
        />
      )}
    </>
  );
}

export default Header;
