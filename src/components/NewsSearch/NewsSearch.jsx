import { useState } from 'react';
import Icon from '../Icon/Icon';
import css from './NewsSearch.module.css';

function NewsSearch({ onSearch, isLoading = false }) {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword.trim());
  };

  const handleClear = () => {
    setKeyword('');
    onSearch('');
  };

  return (
    <div className={css.searchContainer}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <div className={css.searchInputWrapper}>
          <Icon name="search" className={css.searchIcon} />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search news..."
            className={css.searchInput}
            disabled={isLoading}
          />
          {keyword && (
            <button
              type="button"
              onClick={handleClear}
              className={css.clearButton}
              disabled={isLoading}
              aria-label="Clear search"
            >
              <Icon name="cross" className={css.clearIcon} />
            </button>
          )}
        </div>
        <button type="submit" className={css.searchButton} disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  );
}

export default NewsSearch;
