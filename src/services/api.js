const BASE_URL = 'https://petlove.b.goit.study/api';

// Функція для виконання HTTP запитів
async function fetchAPI(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  console.log('Making API request to:', url);

  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  console.log('Request config:', config);

  try {
    const response = await fetch(url, config);
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response error text:', errorText);
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const data = await response.json();
    console.log('Response data:', data);
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// API функції
export const api = {
  // Отримання списку друзів
  getFriends: () => fetchAPI('/friends'),

  // Отримання новин
  getNews: () => fetchAPI('/news'),

  // Отримання оголошень
  getNotices: () => fetchAPI('/notices'),
};

export default api;
