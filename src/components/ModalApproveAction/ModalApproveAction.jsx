import { useEffect } from 'react';
import Icon from '../Icon/Icon';
import css from './ModalApproveAction.module.css';

function ModalApproveAction({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Yes',
  cancelText = 'Cancel',
  isLoading = false,
}) {
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

  const handleConfirm = () => {
    onConfirm();
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
            disabled={isLoading}
            aria-label="Close modal"
          >
            <Icon name="cross" className={css.closeIcon} />
          </button>
        </div>

        <div className={css.modalContent}>
          <h2 className={css.modalTitle}>{title}</h2>
          {message && <p className={css.modalMessage}>{message}</p>}
        </div>

        <div className={css.modalActions}>
          <button
            type="button"
            className={css.cancelBtn}
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={css.confirmBtn}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalApproveAction;
