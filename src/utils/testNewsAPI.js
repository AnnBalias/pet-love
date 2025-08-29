import { api } from '../services/api';

// Функція для тестування API новин
export const testNewsAPI = async () => {
  try {
    // Тест 1: Отримання всіх новин
    console.log('=== Тест 1: Отримання всіх новин ===');
    const allNews = await api.getNews();
    console.log('Всі новини:', allNews);

    // Тест 2: Отримання новин з пагінацією
    console.log('=== Тест 2: Отримання новин з пагінацією ===');
    const paginatedNews = await api.getNews({ page: 1, limit: 3 });
    console.log('Пагіновані новини:', paginatedNews);

    // Тест 3: Пошук новин
    console.log('=== Тест 3: Пошук новин ===');
    const searchResults = await api.getNews({
      keyword: 'pet',
      page: 1,
      limit: 6,
    });
    console.log('Результати пошуку:', searchResults);

    // Тест 4: Перевірка структури відповіді
    console.log('=== Тест 4: Перевірка структури відповіді ===');
    if (Array.isArray(allNews)) {
      console.log('Відповідь - масив, довжина:', allNews.length);
      if (allNews.length > 0) {
        console.log('Приклад елемента:', allNews[0]);
      }
    } else if (allNews && typeof allNews === 'object') {
      console.log("Відповідь - об'єкт, ключі:", Object.keys(allNews));
      console.log('Повна відповідь:', allNews);
    }

    return {
      success: true,
      tests: {
        allNews: allNews,
        paginatedNews: paginatedNews,
        searchResults: searchResults,
      },
    };
  } catch (error) {
    console.error('Помилка тестування API:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Функція для тестування конкретного запиту
export const testSpecificNewsQuery = async (params = {}) => {
  try {
    console.log('=== Тест конкретного запиту ===');
    console.log('Параметри:', params);
 
    const response = await api.getNews(params);
    console.log('Відповідь:', response);
 
    return { success: true, data: response };
  } catch (error) {
    console.error('Помилка запиту:', error);
    return { success: false, error: error.message };
  }
};

// Функція для тестування з різними форматами заголовків
export const testNewsHeaders = async () => {
  try {
    console.log('=== Тест заголовків ===');
 
    // Тест з різними комбінаціями параметрів
    const tests = [
      { name: 'Без параметрів', params: {} },
      { name: 'Тільки page', params: { page: 1 } },
      { name: 'Тільки limit', params: { limit: 5 } },
      { name: 'Тільки keyword', params: { keyword: 'test' } },
      { name: 'page + limit', params: { page: 1, limit: 3 } },
      { name: 'page + keyword', params: { page: 1, keyword: 'pet' } },
      { name: 'Всі параметри', params: { page: 1, limit: 6, keyword: 'care' } },
    ];

    for (const test of tests) {
      console.log(`\n--- ${test.name} ---`);
      console.log('Параметри:', test.params);
 
      try {
        const response = await api.getNews(test.params);
        console.log('Успіх:', response);
      } catch (error) {
        console.error('Помилка:', error.message);
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Помилка тестування заголовків:', error);
    return { success: false, error: error.message };
  }
};

// Простий тест для швидкої перевірки
export const quickTest = async () => {
  try {
    console.log('🚀 Швидкий тест API новин...');
    
    const response = await api.getNews();
    console.log('✅ API відповідь:', response);
    
    if (Array.isArray(response)) {
      console.log(`✅ Отримано ${response.length} новин`);
      if (response.length > 0) {
        console.log('📰 Перша новина:', response[0]);
      }
    } else if (response && typeof response === 'object') {
      console.log('📦 Структура відповіді:', Object.keys(response));
      console.log('📄 Повна відповідь:', response);
    }
    
    return { success: true, data: response };
  } catch (error) {
    console.error('❌ Помилка API:', error);
    return { success: false, error: error.message };
  }
};
