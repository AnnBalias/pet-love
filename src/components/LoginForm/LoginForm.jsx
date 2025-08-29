import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../Icon/Icon';
import { api } from '../../services/api';
import { useUser } from '../../contexts/UserContext';
import css from './LoginForm.module.css';

const loginSchema = yup.object({
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
});

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
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
    resolver: yupResolver(loginSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await api.login({
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
      let errorMessage = 'Login failed. Please check your credentials.';
      
      if (error.message.includes('Network error')) {
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (error.message.includes('Unauthorized')) {
        errorMessage = 'Invalid email or password.';
      } else if (error.message.includes('Validation error')) {
        errorMessage = 'Please check your input data.';
      } else if (error.message.includes('Server error')) {
        errorMessage = 'Server is temporarily unavailable. Please try again later.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.loginContainer}>
      <div className={css.loginForm}>
        <h2 className={css.title}>Log in</h2>
        <p className={css.text}>
          Welcome! Please enter your credentials to login to the platform:
        </p>

        {error && <div className={css.errorMessage}>{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <div className={css.inputGroup}>
            <div className={css.inputWrapper}>
              <input
                type="email"
                id="email"
                {...register('email')}
                className={`${css.input} ${errors.email ? css.inputError : ''}`}
                placeholder="Email"
              />
              {!errors.email && watch('email') && (
                <Icon name="check" className={css.checkIcon} />
              )}
              {errors.email && <Icon name="cross" className={css.crossIcon} />}
            </div>
            {errors.email && (
              <span className={css.error}>{errors.email.message}</span>
            )}
          </div>

          <div className={css.inputGroup}>
            <div className={css.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                {...register('password')}
                className={`${css.input} ${errors.password ? css.inputError : ''}`}
                placeholder="Password"
              />
              <button
                type="button"
                className={css.eyeButton}
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <Icon
                  name={showPassword ? 'eye-off' : 'eye'}
                  className={css.eyeIcon}
                />
              </button>
              {!errors.password && watch('password') && (
                <Icon name="check" className={css.checkIcon} />
              )}
              {errors.password && (
                <Icon name="cross" className={css.crossIcon} />
              )}
            </div>
            {errors.password && (
              <span className={css.error}>{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            className={css.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className={css.linkContainer}>
          <span className={css.linkText}>Don't have an account? </span>
          <Link to="/register" className={css.link}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
