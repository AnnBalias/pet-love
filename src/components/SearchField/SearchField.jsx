import css from './SearchField.module.css';

function SearchField({ 
  value, 
  onChange, 
  placeholder = 'Search...' 
}) {
  return (
    <div className={css.searchField}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={css.input}
      />
    </div>
  );
}

export default SearchField;
