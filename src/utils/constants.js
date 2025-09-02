// API константи
export const API_ENDPOINTS = {
  FRIENDS: '/friends',
  NEWS: '/news',
  NOTICES: '/notices',
  USERS: '/users',
  CATEGORIES: '/notices/categories',
  GENDERS: '/notices/genders',
  PET_TYPES: '/notices/pet-types',
  LOCATIONS: '/notices/locations',
  FAVORITES: '/notices/favorites',
  VIEWED: '/notices/viewed',
  PETS: '/users/pets',
  AVATAR: '/users/avatar',
  HEALTH: '/health',
  CITIES: '/cities',
  CITIES_LOCATIONS: '/cities/Locations',
};

// HTTP статуси
export const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  VALIDATION_ERROR: 4,
  SERVER_ERROR: 500,
};

// Повідомлення про помилки
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Unauthorized. Please login again.',
  FORBIDDEN: 'Access forbidden.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION_ERROR: 'Validation error. Please check your input.',
  SERVER_ERROR: 'Server error. Please try again later.',
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
};

// Локальне сховище ключі
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_DATA: 'userData',
};

// Категорії оголошень
export const NOTICE_CATEGORIES = {
  SELL: 'sell',
  LOST_FOUND: 'lost-found',
  IN_GOOD_HANDS: 'in-good-hands',
  FAVORITE: 'favorite',
  MY_ADS: 'my-ads',
};

// Типи улюбленців
export const PET_TYPES = {
  DOG: 'dog',
  CAT: 'cat',
};

// Статі улюбленців
export const PET_GENDERS = {
  MALE: 'male',
  FEMALE: 'female',
};

// Breakpoints для адаптивності
export const BREAKPOINTS = {
  MOBILE_SMALL: 374,
  MOBILE: 767,
  TABLET: 1279,
  DESKTOP: 1280,
};

// Пагінація
export const PAGINATION = {
  DEFAULT_LIMIT: 6,
  MAX_VISIBLE_PAGES: 5,
};

// Валідація
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
};

// Контактні протоколи
export const CONTACT_PROTOCOLS = {
  EMAIL: 'mailto:',
  PHONE: 'tel:',
  TELEGRAM: 'https://t.me/',
};

// Популярність
export const POPULARITY_LEVELS = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
};

// Анімації
export const ANIMATIONS = {
  DURATION: 300,
  EASING: 'ease',
};

// Розміри зображень
export const IMAGE_SIZES = {
  AVATAR: {
    SMALL: 40,
    MEDIUM: 60,
    LARGE: 100,
  },
  NOTICE: {
    THUMBNAIL: 200,
    MODAL: 350,
  },
};
