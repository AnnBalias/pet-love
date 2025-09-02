import Icon from '../Icon/Icon';
import css from './Pagination.module.css';

function Pagination({ currentPage, totalPages, onChange }) {
  // Якщо сторінка одна - приховуємо пагінацію
  if (totalPages <= 1) {
    return null;
  }

  const getVisiblePages = () => {
    const delta = 2; // Кількість сторінок з кожного боку від поточної
    const range = [];
    const rangeWithDots = [];

    // Додаємо сторінки навколо поточної
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // Додаємо першу сторінку та крапки якщо потрібно
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    // Додаємо проміжні сторінки
    rangeWithDots.push(...range);

    // Додаємо останню сторінку та крапки якщо потрібно
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const handlePageClick = (page) => {
    if (page !== '...' && page !== currentPage && typeof page === 'number') {
      onChange(page);
    }
  };

  const handleFirstPage = () => {
    if (currentPage > 1) {
      onChange(1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onChange(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    if (currentPage < totalPages) {
      onChange(totalPages);
    }
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={css.pagination}>
      {/* Кнопка першої сторінки */}
      <button
        className={`${css.pageBtn} ${css.firstBtn} ${currentPage === 1 ? css.disabled : ''}`}
        onClick={handleFirstPage}
        disabled={currentPage === 1}
        title="First page"
      >
        <Icon name="left" className={css.arrowIcon} />
        <Icon name="left" className={css.arrowIcon} />
      </button>

      {/* Кнопка попередньої сторінки */}
      <button
        className={`${css.pageBtn} ${css.prevBtn} ${currentPage === 1 ? css.disabled : ''}`}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        title="Previous page"
      >
        <Icon name="left" className={css.arrowIcon} />
      </button>

      {/* Номери сторінок */}
      <div className={css.pageNumbers}>
        {visiblePages.map((page, index) => (
          <button
            key={index}
            className={`${css.pageBtn} ${css.numberBtn} ${
              page === currentPage ? css.active : ''
            } ${page === '...' ? css.dots : ''}`}
            onClick={() => handlePageClick(page)}
            disabled={page === '...'}
            title={page === '...' ? '' : `Page ${page}`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Кнопка наступної сторінки */}
      <button
        className={`${css.pageBtn} ${css.nextBtn} ${currentPage === totalPages ? css.disabled : ''}`}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        title="Next page"
      >
        <Icon name="right" className={css.arrowIcon} />
      </button>

      {/* Кнопка останньої сторінки */}
      <button
        className={`${css.pageBtn} ${css.lastBtn} ${currentPage === totalPages ? css.disabled : ''}`}
        onClick={handleLastPage}
        disabled={currentPage === totalPages}
        title="Last page"
      >
        <Icon name="right" className={css.arrowIcon} />
        <Icon name="right" className={css.arrowIcon} />
      </button>
    </div>
  );
}

export default Pagination;
