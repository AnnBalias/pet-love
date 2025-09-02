import { VALIDATION } from './constants.js';

// Валідація email
export const validateEmail = (email) => {
  if (!email) {
    return 'Email is required';
  }

  if (!VALIDATION.EMAIL_REGEX.test(email)) {
    return 'Please enter a valid email address';
  }

  return null;
};

// Валідація пароля
export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }

  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters long`;
  }

  return null;
};

// Валідація імені
export const validateName = (name) => {
  if (!name) {
    return 'Name is required';
  }

  if (name.length < VALIDATION.NAME_MIN_LENGTH) {
    return `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters long`;
  }

  if (name.length > VALIDATION.NAME_MAX_LENGTH) {
    return `Name must be no more than ${VALIDATION.NAME_MAX_LENGTH} characters long`;
  }

  return null;
};

// Валідація підтвердження пароля
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }

  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }

  return null;
};

// Валідація файлу зображення
export const validateImageFile = (file) => {
  if (!file) {
    return 'Please select an image file';
  }

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.type)) {
    return 'Please select a valid image file (JPEG, PNG, or WebP)';
  }

  if (file.size > maxSize) {
    return 'File size must be less than 5MB';
  }

  return null;
};

// Валідація обов'язкового поля
export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`;
  }

  return null;
};

// Валідація мінімальної довжини
export const validateMinLength = (value, minLength, fieldName) => {
  if (value && value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters long`;
  }

  return null;
};

// Валідація максимальної довжини
export const validateMaxLength = (value, maxLength, fieldName) => {
  if (value && value.length > maxLength) {
    return `${fieldName} must be no more than ${maxLength} characters long`;
  }

  return null;
};

// Валідація URL
export const validateUrl = (url) => {
  if (!url) {
    return null; // URL не обов'язковий
  }

  try {
    new URL(url);
    return null;
  } catch {
    return 'Please enter a valid URL';
  }
};

// Валідація телефонного номера
export const validatePhone = (phone) => {
  if (!phone) {
    return null; // Телефон не обов'язковий
  }

  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
    return 'Please enter a valid phone number';
  }

  return null;
};

// Комплексна валідація форми
export const validateForm = (values, rules) => {
  const errors = {};

  Object.keys(rules).forEach((fieldName) => {
    const value = values[fieldName];
    const fieldRules = rules[fieldName];

    // Перевіряємо кожне правило для поля
    for (const rule of fieldRules) {
      let error = null;

      switch (rule.type) {
        case 'required':
          error = validateRequired(value, rule.fieldName || fieldName);
          break;
        case 'email':
          error = validateEmail(value);
          break;
        case 'password':
          error = validatePassword(value);
          break;
        case 'confirmPassword':
          error = validateConfirmPassword(values.password, value);
          break;
        case 'name':
          error = validateName(value);
          break;
        case 'minLength':
          error = validateMinLength(
            value,
            rule.length,
            rule.fieldName || fieldName
          );
          break;
        case 'maxLength':
          error = validateMaxLength(
            value,
            rule.length,
            rule.fieldName || fieldName
          );
          break;
        case 'url':
          error = validateUrl(value);
          break;
        case 'phone':
          error = validatePhone(value);
          break;
        case 'image':
          error = validateImageFile(value);
          break;
        case 'custom':
          error = rule.validator(value, values);
          break;
      }

      if (error) {
        errors[fieldName] = error;
        break; // Зупиняємося на першій помилці для поля
      }
    }
  });

  return errors;
};

// Перевірка чи форма валідна
export const isFormValid = (errors) => {
  return Object.keys(errors).length === 0;
};
