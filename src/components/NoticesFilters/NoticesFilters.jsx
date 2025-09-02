import { useState, useEffect } from 'react';
import SearchField from '../SearchField/SearchField';
import Icon from '../Icon/Icon';
import css from './NoticesFilters.module.css';

function NoticesFilters({ filters, filterOptions, onFilterChange, onReset }) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [activeTags, setActiveTags] = useState(['popular']);
  
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearch = (value) => {
    handleFilterChange('search', value);
  };

  const handleReset = () => {
    const defaultFilters = {
      search: '',
      category: '',
      gender: '',
      petType: '',
      location: '',
      sortBy: 'popularity',
    };
    setLocalFilters(defaultFilters);
    setActiveTags(['popular']);
    onReset();
  };

  const handleTagClick = (tag) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter(t => t !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };

  const removeTag = (tag) => {
    setActiveTags(activeTags.filter(t => t !== tag));
  };

  const sortOptions = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'price', label: 'Price' },
  ];

  const filterTags = [
    { id: 'popular', label: 'Popular' },
    { id: 'unpopular', label: 'Unpopular' },
    { id: 'cheap', label: 'Cheap' },
    { id: 'expensive', label: 'Expensive' },
  ];

  return (
    <div className={css.filters}>
      <div className={css.filtersGrid}>
        {/* Search Field */}
        <div className={css.searchSection}>
          <SearchField
            value={localFilters.search}
            onChange={handleSearch}
            placeholder="Search by title or pet name..."
          />
        </div>

        {/* Category Select */}
        <div className={css.selectSection}>
          <label className={css.label}>Category</label>
          <select
            value={localFilters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className={css.select}
          >
            <option value="">All categories</option>
            {filterOptions.categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Gender Select */}
        <div className={css.selectSection}>
          <label className={css.label}>By gender</label>
          <select
            value={localFilters.gender}
            onChange={(e) => handleFilterChange('gender', e.target.value)}
            className={css.select}
          >
            <option value="">All genders</option>
            {filterOptions.genders.map((gender) => (
              <option key={gender.id} value={gender.id}>
                {gender.name}
              </option>
            ))}
          </select>
        </div>

        {/* Pet Type Select */}
        <div className={css.selectSection}>
          <label className={css.label}>By type</label>
          <select
            value={localFilters.petType}
            onChange={(e) => handleFilterChange('petType', e.target.value)}
            className={css.select}
          >
            <option value="">All types</option>
            {filterOptions.petTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* Location Select */}
        <div className={css.selectSection}>
          <label className={css.label}>Location</label>
          <select
            value={localFilters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className={css.select}
          >
            <option value="">All locations</option>
            {filterOptions.locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div className={css.sortSection}>
          <label className={css.label}>Sort by</label>
          <div className={css.radioGroup}>
            {sortOptions.map((option) => (
              <label key={option.value} className={css.radioLabel}>
                <input
                  type="radio"
                  name="sortBy"
                  value={option.value}
                  checked={localFilters.sortBy === option.value}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className={css.radioInput}
                />
                <span className={css.radioText}>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <div className={css.resetSection}>
          <button type="button" onClick={handleReset} className={css.resetBtn}>
            Reset
          </button>
        </div>
      </div>

      {/* Filter Tags */}
      <div className={css.filterTags}>
        {filterTags.map((tag) => (
          <button
            key={tag.id}
            className={`${css.filterTag} ${activeTags.includes(tag.id) ? css.filterTagActive : ''}`}
            onClick={() => handleTagClick(tag.id)}
          >
            {tag.label}
            {activeTags.includes(tag.id) && (
              <Icon name="cross" className={css.tagRemoveIcon} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NoticesFilters;
