import { API_ENDPOINTS, STORAGE_KEYS } from '../utils/constants.js';
import {
  fetchAPI,
  setToken,
  removeToken,
  createQueryString,
  storage,
} from '../utils/apiHelpers.js';

// API функції
export const api = {
  // Отримання списку друзів
  getFriends: () => fetchAPI(API_ENDPOINTS.FRIENDS),

  // Отримання новин з параметрами
  getNews: (params = {}) => {
    const { keyword, page, limit = 6 } = params;
    const queryParams = { page, limit, keyword };
    const queryString = createQueryString(queryParams);
    const endpoint = queryString
      ? `${API_ENDPOINTS.NEWS}${queryString}`
      : API_ENDPOINTS.NEWS;

    return fetchAPI(endpoint);
  },

  // Реєстрація користувача
  register: async (userData) => {
    const response = await fetchAPI(`${API_ENDPOINTS.USERS}/signup`, {
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
    const response = await fetchAPI(`${API_ENDPOINTS.USERS}/signin`, {
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

  // Вихід користувача (локальний)
  logout: () => {
    removeToken();
    storage.remove(STORAGE_KEYS.USER_DATA);
  },

  // Вихід користувача з backend (видалення сесії)
  logoutSession: async () => {
    try {
      const response = await fetchAPI(`${API_ENDPOINTS.USERS}/logout`, {
        method: 'POST',
      });

      // Видаляємо токен після успішного logout
      removeToken();
      storage.remove(STORAGE_KEYS.USER_DATA);

      return response;
    } catch (error) {
      // Навіть якщо backend повернув помилку, видаляємо токен
      removeToken();
      storage.remove(STORAGE_KEYS.USER_DATA);
      throw error;
    }
  },

  // Отримання поточного користувача
  getCurrentUser: async () => {
    try {
      const userData = await fetchAPI(`${API_ENDPOINTS.USERS}/current`);
      storage.set(STORAGE_KEYS.USER_DATA, userData);
      return userData;
    } catch {
      // Якщо запит не вдався, повертаємо дані з localStorage як fallback
      return storage.get(STORAGE_KEYS.USER_DATA);
    }
  },

  // Оновлення профілю користувача
  updateProfile: async (userData) => {
    const response = await fetchAPI(`${API_ENDPOINTS.USERS}/profile`, {
      method: 'PATCH',
      body: JSON.stringify(userData),
    });

    // Оновлюємо збережені дані користувача
    if (response) {
      storage.set(STORAGE_KEYS.USER_DATA, response);
    }

    return response;
  },

  // Оновлення користувача (аліас для updateProfile)
  updateUser: async (userData) => {
    return api.updateProfile(userData);
  },

  // Завантаження аватара
  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await fetchAPI(API_ENDPOINTS.AVATAR, {
      method: 'POST',
      body: formData,
    });
    return response;
  },

  // Отримання улюбленців користувача
  getUserPets: () => fetchAPI(API_ENDPOINTS.PETS),

  // Видалення улюбленця
  deletePet: async (petId) => {
    const response = await fetchAPI(`${API_ENDPOINTS.PETS}/${petId}`, {
      method: 'DELETE',
    });
    return response;
  },

  // Додавання улюбленця
  addPet: async (petData) => {
    const response = await fetchAPI(API_ENDPOINTS.PETS, {
      method: 'POST',
      body: JSON.stringify(petData),
    });
    return response;
  },

  // Отримання улюблених оголошень
  getFavoriteNotices: () => fetchAPI(API_ENDPOINTS.FAVORITES),

  // Отримання переглянутих оголошень
  getViewedNotices: () => fetchAPI(API_ENDPOINTS.VIEWED),

  // Видалення з улюблених
  removeFromFavorites: async (noticeId) => {
    const response = await fetchAPI(`${API_ENDPOINTS.FAVORITES}/${noticeId}`, {
      method: 'DELETE',
    });
    return response;
  },

  // Отримання оголошень з фільтрами
  getNotices: async (params = '') => {
    const endpoint = params
      ? `${API_ENDPOINTS.NOTICES}?${params}`
      : API_ENDPOINTS.NOTICES;
    return fetchAPI(endpoint);
  },

  // Отримання категорій
  getCategories: () => fetchAPI(API_ENDPOINTS.CATEGORIES),

  // Отримання статей
  getGenders: () => fetchAPI(API_ENDPOINTS.GENDERS),

  // Отримання типів улюбленців
  getPetTypes: () => fetchAPI(API_ENDPOINTS.PET_TYPES),

  // Отримання локацій
  getLocations: () => fetchAPI(API_ENDPOINTS.LOCATIONS),

  // Отримання детальної інформації про оголошення
  getNoticeDetails: async (noticeId) => {
    const response = await fetchAPI(`${API_ENDPOINTS.NOTICES}/${noticeId}`);
    return response;
  },

  // Додавання до улюблених
  addToFavorites: async (noticeId) => {
    const response = await fetchAPI(`${API_ENDPOINTS.FAVORITES}/${noticeId}`, {
      method: 'POST',
    });
    return response;
  },

  // Отримання списку міст
  getCities: (params = {}) => {
    const { keyword } = params;
    const queryParams = { keyword };
    const queryString = createQueryString(queryParams);
    const endpoint = queryString
      ? `${API_ENDPOINTS.CITIES}${queryString}`
      : API_ENDPOINTS.CITIES;

    return fetchAPI(endpoint);
  },

  // Отримання міст тварин з нотаток
  getCitiesLocations: (params = {}) => {
    const { keyword } = params;
    const queryParams = { keyword };
    const queryString = createQueryString(queryParams);
    const endpoint = queryString
      ? `${API_ENDPOINTS.CITIES_LOCATIONS}${queryString}`
      : API_ENDPOINTS.CITIES_LOCATIONS;

    return fetchAPI(endpoint);
  },
};

export default api;
