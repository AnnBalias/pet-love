import css from './GlobalLoader.module.css';

function GlobalLoader() {
  // TODO: Підключити до Redux store для відстеження завантаження
  const isLoading = false; // Тимчасово false, потім буде з Redux

  if (!isLoading) {
    return null;
  }

  return (
    <div className={css.overlay}>
      <div className={css.spinner}></div>
    </div>
  );
}

export default GlobalLoader;
