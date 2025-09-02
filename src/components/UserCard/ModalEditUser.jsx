import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useUser } from '../../contexts/useUser';
import { useNotification } from '../../contexts/useNotification';
import { api } from '../../services/api';
import { editUserSchema } from '../../utils/validationSchemas';
import Icon from '../Icon/Icon';
import css from './ModalEditUser.module.css';

function ModalEditUser({ isOpen, onClose }) {
  const { user, updateUser } = useUser();
  const { showSuccess, showError } = useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(editUserSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      avatar: user?.avatar || '',
      phone: user?.phone || '',
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Відправляємо дані на backend
      const updatedUser = await api.updateUser(data);

      // Оновлюємо користувача в контексті
      updateUser(updatedUser);

      // Закриваємо модалку
      onClose();

      // Показуємо notification про успіх
      showSuccess('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      const errorMessage =
        error.message ||
        'An error occurred while updating your profile. Please try again.';

      setSubmitError(errorMessage);
      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    setSubmitError('');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={css.modalOverlay} onClick={handleClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <div className={css.modalHeader}>
          <h2 className={css.modalTitle}>Edit Profile</h2>
          <button
            type="button"
            className={css.closeBtn}
            onClick={handleClose}
            disabled={isSubmitting}
          >
            <Icon name="cross" className={css.closeIcon} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <div className={css.fieldGroup}>
            <label className={css.label} htmlFor="name">
              Name *
            </label>
            <input
              id="name"
              type="text"
              className={`${css.input} ${errors.name ? css.inputError : ''}`}
              placeholder="Enter your name"
              {...register('name')}
            />
            {errors.name && (
              <p className={css.errorMessage}>{errors.name.message}</p>
            )}
          </div>

          <div className={css.fieldGroup}>
            <label className={css.label} htmlFor="email">
              Email *
            </label>
            <input
              id="email"
              type="email"
              className={`${css.input} ${errors.email ? css.inputError : ''}`}
              placeholder="Enter your email"
              {...register('email')}
            />
            {errors.email && (
              <p className={css.errorMessage}>{errors.email.message}</p>
            )}
          </div>

          <div className={css.fieldGroup}>
            <label className={css.label} htmlFor="avatar">
              Avatar URL
            </label>
            <input
              id="avatar"
              type="url"
              className={`${css.input} ${errors.avatar ? css.inputError : ''}`}
              placeholder="https://example.com/avatar.jpg"
              {...register('avatar')}
            />
            {errors.avatar && (
              <p className={css.errorMessage}>{errors.avatar.message}</p>
            )}
          </div>

          <div className={css.fieldGroup}>
            <label className={css.label} htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              className={`${css.input} ${errors.phone ? css.inputError : ''}`}
              placeholder="+38XXXXXXXXXX"
              {...register('phone')}
            />
            {errors.phone && (
              <p className={css.errorMessage}>{errors.phone.message}</p>
            )}
          </div>

          {submitError && <div className={css.submitError}>{submitError}</div>}

          <div className={css.modalActions}>
            <button
              type="button"
              className={css.cancelBtn}
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalEditUser;
