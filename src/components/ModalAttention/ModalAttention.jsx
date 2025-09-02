import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import css from './ModalAttention.module.css';

function ModalAttention({ isOpen, onClose }) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Блокуємо скрол на body
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={css.modalOverlay} onClick={handleBackdropClick}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <div className={css.modalHeader}>
          <button
            type="button"
            className={css.closeBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            <Icon name="cross" className={css.closeIcon} />
          </button>
        </div>

        <div className={css.modalContent}>
          <div className={css.attentionIcon}>
            <Icon name="heart" className={css.heartIcon} />
          </div>

          <h2 className={css.modalTitle}>Attention!</h2>

          <p className={css.modalMessage}>
            To interact with notices, you need to be authorized. Please register
            or log in to your account.
          </p>

          <div className={css.modalActions}>
            <Link to="/register" className={css.registerBtn} onClick={onClose}>
              Register
            </Link>

            <Link to="/login" className={css.loginBtn} onClick={onClose}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalAttention;
