import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/useUser';
import { useNotification } from '../../contexts/useNotification';
import { api } from '../../services/api';
import ModalApproveAction from '../ModalApproveAction/ModalApproveAction';
import css from './LogOutBtn.module.css';

function LogOutBtn({ isHome = false }) {
  const [showModal, setShowModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const { logout } = useUser();
  const { showError } = useNotification();

  const handleLogout = () => {
    setShowModal(true);
  };

  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);

    try {
      // Відправляємо запит на backend для видалення сесії
      await api.logoutSession();
    } catch (error) {
      console.error('Error logging out from backend:', error);
      showError('Failed to logout from server. Please try again.');
    } finally {
      // Незалежно від відповіді backend - очищаємо клієнт
      logout();
      setShowModal(false);
      setIsLoggingOut(false);

      // Редірект на Home page
      navigate('/');
    }
  };

  const handleCloseModal = () => {
    if (!isLoggingOut) {
      setShowModal(false);
    }
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

      <ModalApproveAction
        isOpen={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
        title="Already leaving?"
        message="Are you sure you want to log out? You will need to log in again to access your account."
        confirmText="Yes, Log Out"
        cancelText="Cancel"
        isLoading={isLoggingOut}
      />
    </>
  );
}

export default LogOutBtn;
