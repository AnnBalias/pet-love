import { API_ENDPOINTS, HTTP_STATUS, ERROR_MESSAGES, STORAGE_KEYS } from './constants.js';

// Базовий URL для API
const BASE_URL = import.meta.env.DEV
  ? '/api'
  : 'https://petlove.b.goit.study/api';

// Функція для отримання токена з localStorage
export const getToken = () => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

// Функція для збереження токена в localStorage
export const setToken = (token) => {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
};

// Функція для видалення токена з localStorage
export const removeToken = () => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
};

// Функція для створення заголовків запиту
export const createHeaders = (options = {}) => {
  const headers = {};

  // Додаємо Content-Type тільки для JSON запитів
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  // Додаємо токен авторизації якщо він є
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return { ...headers, ...options.headers };
};

// Функція для обробки помилок HTTP
export const handleHttpError = (status, data) => {
  let errorMessage = '';

  switch (status) {
    case HTTP_STATUS.UNAUTHORIZED:
      errorMessage = ERROR_MESSAGES.UNAUTHORIZED;
      removeToken(); // Видаляємо недійсний токен
      break;
    case HTTP_STATUS.FORBIDDEN:
      errorMessage = ERROR_MESSAGES.FORBIDDEN;
      break;
    case HTTP_STATUS.NOT_FOUND:
      errorMessage = ERROR_MESSAGES.NOT_FOUND;
      break;
    case HTTP_STATUS.VALIDATION_ERROR:
      errorMessage = ERROR_MESSAGES.VALIDATION_ERROR;
      break;
    case HTTP_STATUS.SERVER_ERROR:
      errorMessage = ERROR_MESSAGES.SERVER_ERROR;
      break;
    default:
      errorMessage = `HTTP error! status: ${status}`;
  }

  // Якщо відповідь містить JSON з повідомленням про помилку
  if (typeof data === 'object' && data.message) {
    errorMessage = data.message;
  }
  // Якщо відповідь - текст і не порожній
  else if (typeof data === 'string' && data.trim()) {
    errorMessage = data;
  }

  return new Error(errorMessage);
};

// Функція для виконання HTTP запитів
export const fetchAPI = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;

  const config = {
    method: 'GET',
    headers: createHeaders(options),
    ...options,
  };

  try {
    const response = await fetch(url, config);

    // Перевіряємо чи є контент у відповіді
    const contentType = response.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw handleHttpError(response.status, data);
    }

    return data;
  } catch (error) {
    // Додаткова обробка помилок мережі
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }

    throw error;
  }
};

// Функція для створення query string
export const createQueryString = (params) => {
  const queryParts = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`);

  return queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
};

// Функція для перевірки з'єднання з сервером
export const checkServerConnection = async () => {
  try {
    const response = await fetch(`${BASE_URL}${API_ENDPOINTS.HEALTH}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.ok;
  } catch {
    return false;
  }
};

// Функція для роботи з локальним сховищем
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch {
      return false;
    }
  },
};
