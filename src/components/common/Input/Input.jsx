import React, { forwardRef } from 'react';
import Icon from '../../Icon/Icon';
import css from './Input.module.css';

const Input = forwardRef(({
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  success,
  disabled = false,
  required = false,
  fullWidth = false,
  size = 'medium',
  icon,
  iconPosition = 'right',
  className = '',
  ...props
}, ref) => {
  const inputClasses = [
    css.input,
    css[size],
    fullWidth && css.fullWidth,
    error && css.error,
    success && css.success,
    icon && css[`icon-${iconPosition}`],
    className
  ].filter(Boolean).join(' ');

  const wrapperClasses = [
    css.inputWrapper,
    fullWidth && css.fullWidth
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        required={required}
        className={inputClasses}
        {...props}
      />
      
      {icon && (
        <div className={`${css.icon} ${css[`icon-${iconPosition}`]}`}>
          <Icon name={icon} className={css.iconSvg} />
        </div>
      )}
      
      {error && (
        <div className={css.errorMessage}>
          {error}
        </div>
      )}
      
      {success && (
        <div className={css.successMessage}>
          ✓
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
