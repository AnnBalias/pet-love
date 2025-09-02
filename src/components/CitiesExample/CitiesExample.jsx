import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useNotification } from '../../contexts/useNotification';
import css from './CitiesExample.module.css';

function CitiesExample() {
  const [cities, setCities] = useState([]);
  const [citiesLocations, setCitiesLocations] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showError, showSuccess } = useNotification();

  useEffect(() => {
    fetchCitiesData();
  }, []);

  const fetchCitiesData = async (keyword = '') => {
    setIsLoading(true);

    try {
      // Отримуємо обидва типи даних міст з можливістю пошуку
      const [allCities, petCities] = await Promise.all([
        api.getCities({ keyword }),
        api.getCitiesLocations({ keyword }),
      ]);

      setCities(allCities || []);
      setCitiesLocations(petCities || []);

      if (keyword) {
        showSuccess(`Cities data loaded for keyword: "${keyword}"`);
      } else {
        showSuccess('Cities data loaded successfully!');
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
      showError('Failed to load cities data. Please try again.');

      // Fallback дані
      setCities([
        { id: 'kyiv', name: 'Kyiv' },
        { id: 'lviv', name: 'Lviv' },
        { id: 'odesa', name: 'Odesa' },
        { id: 'kharkiv', name: 'Kharkiv' },
        { id: 'dnipro', name: 'Dnipro' },
      ]);

      setCitiesLocations([
        { id: 'kyiv', name: 'Kyiv' },
        { id: 'lviv', name: 'Lviv' },
        { id: 'odesa', name: 'Odesa' },
        { id: 'kharkiv', name: 'Kharkiv' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchCitiesData();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCitiesData(searchKeyword);
  };

  const handleClearSearch = () => {
    setSearchKeyword('');
    fetchCitiesData();
  };

  if (isLoading) {
    return (
      <div className={css.container}>
        <h2>Cities API Example</h2>
        <p>Loading cities data...</p>
      </div>
    );
  }

  return (
    <div className={css.container}>
      <h2>Cities API Example</h2>

      <div className={css.section}>
        <h3>Search Cities</h3>
        <form onSubmit={handleSearch} className={css.searchForm}>
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Enter city name to search..."
            className={css.searchInput}
          />
          <button type="submit" className={css.searchBtn} disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
          {searchKeyword && (
            <button
              type="button"
              onClick={handleClearSearch}
              className={css.clearBtn}
              disabled={isLoading}
            >
              Clear
            </button>
          )}
        </form>
      </div>

      <div className={css.section}>
        <h3>All Cities ({cities.length})</h3>
        <p>
          Endpoint: <code>/api/cities</code>
        </p>
        <div className={css.citiesList}>
          {cities.map((city) => (
            <div key={city.id} className={css.cityItem}>
              <span className={css.cityName}>{city.name}</span>
              <span className={css.cityId}>ID: {city.id}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={css.section}>
        <h3>Cities from Pet Notices ({citiesLocations.length})</h3>
        <p>
          Endpoint: <code>/api/cities/Locations</code>
        </p>
        <div className={css.citiesList}>
          {citiesLocations.map((city) => (
            <div key={city.id} className={css.cityItem}>
              <span className={css.cityName}>{city.name}</span>
              <span className={css.cityId}>ID: {city.id}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={css.actions}>
        <button
          className={css.refreshBtn}
          onClick={handleRefresh}
          disabled={isLoading}
        >
          {isLoading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      <div className={css.info}>
        <h4>API Usage:</h4>
        <ul>
          <li>
            <strong>api.getCities()</strong> - отримати список всіх міст
          </li>
          <li>
            <strong>api.getCities({ keyword: 'kyiv' })</strong> - пошук міст за ключовим словом
          </li>
          <li>
            <strong>api.getCitiesLocations()</strong> - отримати міста тварин з
            нотаток
          </li>
          <li>
            <strong>api.getCitiesLocations({ keyword: 'lviv' })</strong> - пошук міст з нотаток за ключовим словом
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CitiesExample;
