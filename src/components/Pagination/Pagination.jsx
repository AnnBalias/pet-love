import Icon from '../Icon/Icon';
import css from './Pagination.module.css';

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}) {
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || isLoading) return;
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Показуємо всі сторінки якщо їх мало
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Показуємо обмежену кількість сторінок
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={css.pagination}>
      {/* Кнопка "На першу сторінку" */}
      <button
        className={`${css.paginationButton} ${css.firstPageButton}`}
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1 || isLoading}
        aria-label="Go to first page"
      >
        <Icon name="left" className={css.doubleLeftIcon} />
        <Icon name="left" className={css.doubleLeftIcon} />
      </button>

      {/* Кнопка "Попередня сторінка" */}
      <button
        className={`${css.paginationButton} ${css.prevButton}`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        aria-label="Go to previous page"
      >
        <Icon name="left" className={css.icon} />
      </button>

      {/* Номери сторінок */}
      <div className={css.pageNumbers}>
        {renderPageNumbers().map((page) => (
          <button
            key={page}
            className={`${css.pageButton} ${
              page === currentPage ? css.activePage : ''
            }`}
            onClick={() => handlePageChange(page)}
            disabled={isLoading}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Кнопка "Наступна сторінка" */}
      <button
        className={`${css.paginationButton} ${css.nextButton}`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        aria-label="Go to next page"
      >
        <Icon name="right" className={css.icon} />
      </button>

      {/* Кнопка "На останню сторінку" */}
      <button
        className={`${css.paginationButton} ${css.lastPageButton}`}
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages || isLoading}
        aria-label="Go to last page"
      >
        <Icon name="right" className={css.doubleRightIcon} />
        <Icon name="right" className={css.doubleRightIcon} />
      </button>
    </div>
  );
}

export default Pagination;
