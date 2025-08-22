import css from './LogOutBtn.module.css';

function LogOutBtn({ isHome = false }) {
  const handleLogout = () => {
    // TODO: Відкрити ModalApproveAction
    console.log('Logout clicked');
  };

  // Приховуємо кнопку на домашній сторінці
  if (isHome) {
    return null;
  }

  const logoutBtnClassName = isHome ? `${css.logoutBtn} ${css.logoutBtnHome}` : css.logoutBtn;

  return (
    <button className={logoutBtnClassName} onClick={handleLogout}>
      Log Out
    </button>
  );
}

export default LogOutBtn;
