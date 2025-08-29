import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../Icon/Icon';
import { api } from '../../services/api';
import { useUser } from '../../contexts/UserContext';
import styles from './RegisterForm.module.css';

const registerSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters long'),
  email: yup
    .string()
    .required('Email is required')
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      'Please enter a valid email address'
    ),
  password: yup
    .string()
    .required('Password is required')
    .min(7, 'Password must be at least 7 characters long'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await api.register({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      // Оновлюємо контекст користувача
      login({
        name: response.name,
        email: data.email,
        avatar: response.avatar, // Додаємо аватар якщо він є в відповіді
      });

      // Перенаправляємо на головну сторінку
      navigate('/');
    } catch (error) {
      // Більш детальні повідомлення про помилки
      let errorMessage = 'Registration failed. Please try again.';

      if (error.message.includes('Network error')) {
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (
        error.message.includes('email already exists') ||
        error.message.includes('Email already exists')
      ) {
        errorMessage = 'User with this email already exists.';
      } else if (error.message.includes('Validation error')) {
        errorMessage = 'Please check your input data.';
      } else if (error.message.includes('Server error')) {
        errorMessage =
          'Server is temporarily unavailable. Please try again later.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerForm}>
        <h2 className={styles.title}>Register</h2>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                id="name"
                {...register('name')}
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                placeholder="Enter your name"
              />
              {!errors.name && watch('name') && (
                <Icon name="check" className={styles.checkIcon} />
              )}
              {errors.name && (
                <Icon name="cross" className={styles.crossIcon} />
              )}
            </div>
            {errors.name && (
              <span className={styles.error}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                id="email"
                {...register('email')}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="Enter your email"
              />
              {!errors.email && watch('email') && (
                <Icon name="check" className={styles.checkIcon} />
              )}
              {errors.email && (
                <Icon name="cross" className={styles.crossIcon} />
              )}
            </div>
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                {...register('password')}
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <Icon
                  name={showPassword ? 'eye-off' : 'eye'}
                  className={styles.eyeIcon}
                />
              </button>
              {!errors.password && watch('password') && (
                <Icon name="check" className={styles.checkIcon} />
              )}
              {errors.password && (
                <Icon name="cross" className={styles.crossIcon} />
              )}
            </div>
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                {...register('confirmPassword')}
                className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={toggleConfirmPasswordVisibility}
                aria-label={
                  showConfirmPassword ? 'Hide password' : 'Show password'
                }
              >
                <Icon
                  name={showConfirmPassword ? 'eye-off' : 'eye'}
                  className={styles.eyeIcon}
                />
              </button>
              {!errors.confirmPassword && watch('confirmPassword') && (
                <Icon name="check" className={styles.checkIcon} />
              )}
              {errors.confirmPassword && (
                <Icon name="cross" className={styles.crossIcon} />
              )}
            </div>
            {errors.confirmPassword && (
              <span className={styles.error}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className={styles.linkContainer}>
          <span className={styles.linkText}>Already have an account? </span>
          <Link to="/login" className={styles.link}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
