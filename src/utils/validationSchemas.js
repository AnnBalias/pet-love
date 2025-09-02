import * as yup from 'yup';

// Схема валідації для додавання улюбленця
export const addPetSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(2, 'Title must be at least 2 characters')
    .max(100, 'Title must not exceed 100 characters'),
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  imgUrl: yup
    .string()
    .required('Image URL is required')
    .matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/i,
      'Image URL must be a valid image URL (png, jpg, jpeg, gif, bmp, webp)'
    ),
  species: yup
    .string()
    .required('Species is required')
    .min(2, 'Species must be at least 2 characters')
    .max(50, 'Species must not exceed 50 characters'),
  birthday: yup
    .string()
    .required('Birthday is required')
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      'Birthday must be in format YYYY-MM-DD'
    )
    .test('valid-date', 'Invalid date', (value) => {
      if (!value) return false;
      const date = new Date(value);
      return date instanceof Date && !isNaN(date);
    })
    .test('not-future', 'Birthday cannot be in the future', (value) => {
      if (!value) return false;
      const date = new Date(value);
      const today = new Date();
      return date <= today;
    }),
  sex: yup
    .string()
    .required('Sex is required')
    .oneOf(['male', 'female'], 'Sex must be either male or female'),
});

// Схема валідації для редагування користувача (якщо потрібно)
export const editUserSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  avatar: yup
    .string()
    .matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/i,
      'Avatar must be a valid image URL (png, jpg, jpeg, gif, bmp, webp)'
    )
    .nullable(),
  phone: yup
    .string()
    .matches(
      /^\+?[0-9\s\-\(\)]{10,}$/,
      'Phone number must be valid'
    )
    .nullable(),
  city: yup
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must not exceed 50 characters')
    .nullable(),
  birthday: yup
    .string()
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      'Birthday must be in format YYYY-MM-DD'
    )
    .nullable(),
});

// Схема валідації для логіну
export const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

// Схема валідації для реєстрації
export const registerSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must not exceed 50 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

// Схема валідації для пошуку оголошень
export const noticesSearchSchema = yup.object({
  search: yup
    .string()
    .max(100, 'Search query must not exceed 100 characters')
    .nullable(),
  category: yup
    .string()
    .oneOf(['sell', 'lost', 'found', 'in-good-hands'], 'Invalid category')
    .nullable(),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Invalid gender')
    .nullable(),
  type: yup
    .string()
    .max(50, 'Pet type must not exceed 50 characters')
    .nullable(),
  location: yup
    .string()
    .max(50, 'Location must not exceed 50 characters')
    .nullable(),
  minAge: yup
    .number()
    .min(0, 'Minimum age cannot be negative')
    .max(50, 'Minimum age cannot exceed 50')
    .nullable(),
  maxAge: yup
    .number()
    .min(0, 'Maximum age cannot be negative')
    .max(50, 'Maximum age cannot exceed 50')
    .nullable(),
});

// Утилітні функції для валідації
export const validateImageUrl = (url) => {
  const imageUrlPattern = /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/i;
  return imageUrlPattern.test(url);
};

export const validateDate = (dateString) => {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(dateString)) return false;
  
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

export const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};
