import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import GlobalLoader from '../GlobalLoader/GlobalLoader';
import css from './Layout.module.css';

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className={css.layout}>
      <Header isHome={isHome} />
      <GlobalLoader />
      <main className={css.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
