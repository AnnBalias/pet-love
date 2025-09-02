import { api } from '../services/api.js';
import { useState } from 'react';
import { useNotification } from '../contexts/useNotification.js';

// Тест функція для перевірки API міст
export async function testCitiesAPI() {
  try {
    console.log('Testing Cities API...');

    // Тест 1: Отримання списку всіх міст
    console.log('\n1. Getting all cities:');
    const cities = await api.getCities();
    console.log('Cities:', cities);

    // Тест 2: Отримання міст тварин з нотаток
    console.log('\n2. Getting cities from pet notices:');
    const citiesLocations = await api.getCitiesLocations();
    console.log('Cities from notices:', citiesLocations);

    // Тест 3: Пошук міст за ключовим словом
    console.log('\n3. Searching cities with keyword "kyiv":');
    const citiesWithKeyword = await api.getCities({ keyword: 'kyiv' });
    console.log('Cities with keyword "kyiv":', citiesWithKeyword);

    // Тест 4: Пошук міст з нотаток за ключовим словом
    console.log('\n4. Searching cities from notices with keyword "lviv":');
    const citiesLocationsWithKeyword = await api.getCitiesLocations({
      keyword: 'lviv',
    });
    console.log(
      'Cities from notices with keyword "lviv":',
      citiesLocationsWithKeyword
    );

    console.log('\n✅ Cities API test completed successfully!');
    return {
      cities,
      citiesLocations,
      citiesWithKeyword,
      citiesLocationsWithKeyword,
    };
  } catch (error) {
    console.error('❌ Error testing Cities API:', error);
    throw error;
  }
}

// Приклад використання в компоненті
export const useCitiesData = () => {
  const [cities, setCities] = useState([]);
  const [citiesLocations, setCitiesLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCitiesData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [citiesData, locationsData] = await Promise.all([
        api.getCities(),
        api.getCitiesLocations(),
      ]);

      setCities(citiesData || []);
      setCitiesLocations(locationsData || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching cities data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cities,
    citiesLocations,
    isLoading,
    error,
    fetchCitiesData,
  };
};

// Приклад використання в компоненті фільтрів
export const useCitiesForFilters = () => {
  const [filterOptions, setFilterOptions] = useState({
    cities: [],
    citiesLocations: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const { showError } = useNotification();

  const fetchCitiesForFilters = async () => {
    setIsLoading(true);

    try {
      const [cities, citiesLocations] = await Promise.all([
        api.getCities(),
        api.getCitiesLocations(),
      ]);

      setFilterOptions({
        cities: cities || [],
        citiesLocations: citiesLocations || [],
      });
    } catch (error) {
      console.error('Error fetching cities for filters:', error);
      showError('Failed to load cities. Please try again.');

      // Fallback дані для розробки
      setFilterOptions({
        cities: [
          { id: 'kyiv', name: 'Kyiv' },
          { id: 'lviv', name: 'Lviv' },
          { id: 'odesa', name: 'Odesa' },
          { id: 'kharkiv', name: 'Kharkiv' },
          { id: 'dnipro', name: 'Dnipro' },
        ],
        citiesLocations: [
          { id: 'kyiv', name: 'Kyiv' },
          { id: 'lviv', name: 'Lviv' },
          { id: 'odesa', name: 'Odesa' },
          { id: 'kharkiv', name: 'Kharkiv' },
        ],
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    filterOptions,
    isLoading,
    fetchCitiesForFilters,
  };
};
