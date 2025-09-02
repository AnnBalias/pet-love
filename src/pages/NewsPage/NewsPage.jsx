import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import NewsSearch from '../../components/NewsSearch/NewsSearch';
import NewsList from '../../components/NewsList/NewsList';
import Pagination from '../../components/Pagination/Pagination';
import css from './NewsPage.module.css';

function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const searchTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const fetchNews = useCallback(
    async (page = 1, keyword = '') => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.getNews({
          page,
          limit: 6,
          keyword: keyword.trim(),
        });

        // Спрощена обробка - перевіряємо чи є response.results
        if (response.results && Array.isArray(response.results)) {
          setNews(response.results);
          setTotalPages(
            response.totalPages || Math.ceil(response.results.length / 6)
          );
          setTotalResults(response.total || response.results.length);
        } else {
          // Якщо немає даних - перекидаємо на 404
          navigate('/404');
          return;
        }
      } catch (err) {
        setError(err.message || 'Failed to load news');
        setNews([]);
        setTotalPages(1);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  useEffect(() => {
    fetchNews(currentPage, searchKeyword);
  }, [currentPage, searchKeyword, fetchNews]);

  // Cleanup таймауту при розмонтуванні компонента
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const handleSearch = (keyword) => {
    // Очищаємо попередній таймаут
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Встановлюємо новий таймаут для debounce (500ms)
    searchTimeoutRef.current = setTimeout(() => {
      setSearchKeyword(keyword);
      setCurrentPage(1); // Скидаємо на першу сторінку при пошуку
    }, 500);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Прокручуємо нагору сторінки при зміні сторінки
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1 className={css.title}>News</h1>
        <p className={css.subtitle}>
          Stay updated with the latest pet care news and tips
        </p>
      </div>

      <NewsSearch onSearch={handleSearch} isLoading={loading} />

      {error && (
        <div className={css.errorContainer}>
          <p className={css.errorMessage}>{error}</p>
          <button
            onClick={() => fetchNews(currentPage, searchKeyword)}
            className={css.retryButton}
          >
            Try Again
          </button>
        </div>
      )}

      {!error && (
        <>
          {searchKeyword && (
            <div className={css.searchResults}>
              <p className={css.resultsInfo}>
                {loading
                  ? 'Searching...'
                  : `Found ${totalResults} results for "${searchKeyword}"`}
              </p>
            </div>
          )}

          <NewsList news={news} isLoading={loading} />

          {!loading && news.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}

export default NewsPage;
