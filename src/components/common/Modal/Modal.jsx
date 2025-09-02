import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../../Icon/Icon';
import { useEscapeKey, useClickOutside } from '../../../utils/hooks.js';
import css from './Modal.module.css';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  className = '',
  ...props
}) => {
  const modalRef = useRef(null);

  // Хук для закриття по Escape
  useEscapeKey(() => {
    if (closeOnEscape && isOpen) {
      onClose();
    }
  });

  // Хук для кліку поза модальним вікном
  useClickOutside(modalRef, () => {
    if (closeOnBackdrop && isOpen) {
      onClose();
    }
  });

  // Блокування скролу при відкритій модалці
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

  if (!isOpen) return null;

  const modalContent = (
    <div className={css.overlay}>
      <div
        ref={modalRef}
        className={`${css.modal} ${css[size]} ${className}`}
        {...props}
      >
        {title && (
          <div className={css.header}>
            <h2 className={css.title}>{title}</h2>
            {showCloseButton && (
              <button
                type="button"
                className={css.closeButton}
                onClick={onClose}
                aria-label="Close modal"
              >
                <Icon name="cross" className={css.closeIcon} />
              </button>
            )}
          </div>
        )}
        
        <div className={css.content}>
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;
