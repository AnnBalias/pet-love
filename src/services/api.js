// Використовуємо проксі для розробки або прямий URL для продакшену
const BASE_URL = import.meta.env.DEV
  ? '/api'
  : 'https://petlove.b.goit.study/api';

// Функція для виконання HTTP запитів
async function fetchAPI(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  // Отримуємо токен для авторизованих запитів
  const token = getToken();

  const defaultOptions = {
    method: 'GET',
    headers: {},
  };

  // Додаємо Content-Type тільки для JSON запитів
  if (!(options.body instanceof FormData)) {
    defaultOptions.headers['Content-Type'] = 'application/json';
  }

  // Додаємо токен авторизації якщо він є
  if (token) {
    defaultOptions.headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
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
      // Специфічні повідомлення для різних статусів
      let errorMessage = '';

      switch (response.status) {
        case 401:
          errorMessage = 'Unauthorized. Please login again.';
          removeToken(); // Видаляємо недійсний токен
          break;
        case 403:
          errorMessage = 'Access forbidden.';
          break;
        case 404:
          errorMessage = 'Resource not found.';
          break;
        case 422:
          errorMessage = 'Validation error. Please check your input.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        default:
          errorMessage = `HTTP error! status: ${response.status}`;
      }

      // Якщо відповідь містить JSON з повідомленням про помилку
      if (typeof data === 'object' && data.message) {
        errorMessage = data.message;
      }
      // Якщо відповідь - текст і не порожній
      else if (typeof data === 'string' && data.trim()) {
        errorMessage = data;
      }

      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    // Додаткова обробка помилок мережі
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    }

    throw error;
  }
}

// Функція для отримання токена з localStorage
function getToken() {
  return localStorage.getItem('token');
}

// Функція для збереження токена в localStorage
function setToken(token) {
  localStorage.setItem('token', token);
}

// Функція для видалення токена з localStorage
function removeToken() {
  localStorage.removeItem('token');
}

// API функції
export const api = {
  // Отримання списку друзів
  getFriends: () => fetchAPI('/friends'),

  // Отримання новин з параметрами
  getNews: (params = {}) => {
    const { keyword, page, limit = 6 } = params;

    // Тимчасово повертаємося до query string для тестування
    const queryParts = [
      page && `page=${page}`,
      limit && `limit=${limit}`,
      keyword && `keyword=${encodeURIComponent(keyword)}`,
    ].filter(Boolean);

    const queryString = queryParts.join('&');
    const endpoint = queryString ? `/news?${queryString}` : '/news';

    return fetchAPI(endpoint);
  },

  // Отримання оголошень
  getNotices: () => fetchAPI('/notices'),

  // Реєстрація користувача
  register: async (userData) => {
    const response = await fetchAPI('/users/signup', {
      method: 'POST',
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      }),
    });

    // Зберігаємо токен
    if (response.token) {
      setToken(response.token);
    }

    return response;
  },

  // Авторизація користувача
  login: async (userData) => {
    const response = await fetchAPI('/users/signin', {
      method: 'POST',
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    });

    // Зберігаємо токен
    if (response.token) {
      setToken(response.token);
    }

    return response;
  },

  // Вихід користувача
  logout: () => {
    removeToken();
  },

  // Отримання поточного користувача
  getCurrentUser: async () => {
    const token = getToken();
    if (!token) {
      return null;
    }

    try {
      // Робимо запит до API для отримання даних користувача
      const userData = await fetchAPI('/users/current');
      return userData;
    } catch {
      // Якщо запит не вдався, повертаємо дані з localStorage як fallback
      const localUserData = localStorage.getItem('userData');
      return localUserData ? JSON.parse(localUserData) : null;
    }
  },

  // Збереження даних користувача
  setUserData: (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData));
  },

  // Оновлення профілю користувача
  updateProfile: async (userData) => {
    const response = await fetchAPI('/users/profile', {
      method: 'PATCH',
      body: JSON.stringify(userData),
    });
    return response;
  },

  // Завантаження аватара
  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await fetchAPI('/users/avatar', {
      method: 'POST',
      headers: {
        // Не встановлюємо Content-Type для FormData
      },
      body: formData,
    });
    return response;
  },
};

// Функція для перевірки з'єднання з сервером
export const checkServerConnection = async () => {
  try {
    const response = await fetch(`${BASE_URL}/health`, {
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

export default api;
