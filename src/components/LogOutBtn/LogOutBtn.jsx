import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import catImage from '../../assets/images/cat.png';
import { useUser } from '../../contexts/UserContext';
import css from './LogOutBtn.module.css';

function LogOutBtn({ isHome = false }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { logout } = useUser();

  const handleLogout = () => {
    setShowModal(true);
  };

  const handleConfirmLogout = () => {
    // Виконуємо логаут через контекст
    logout();
    setShowModal(false);

    // Перенаправляємо на сторінку логіну
    navigate('/login');
  };

  const handleCancelLogout = () => {
    setShowModal(false);
  };

  // Приховуємо кнопку на домашній сторінці
  if (isHome) {
    return null;
  }

  const logoutBtnClassName = isHome
    ? `${css.logoutBtn} ${css.logoutBtnHome}`
    : css.logoutBtn;

  return (
    <>
      <button className={logoutBtnClassName} onClick={handleLogout}>
        Log Out
      </button>

      {showModal && (
        <div className={css.modalOverlay} onClick={handleCancelLogout}>
          <div className={css.modal} onClick={(e) => e.stopPropagation()}>
            <img src={catImage} alt="Cat" className={css.catImg} />
            <h3 className={css.modalTitle}>Already leaving?</h3>
            <div className={css.modalButtons}>
              <button className={css.confirmBtn} onClick={handleConfirmLogout}>
                Yes
              </button>
              <button className={css.cancelBtn} onClick={handleCancelLogout}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LogOutBtn;
