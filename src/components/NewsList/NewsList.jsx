import css from './NewsList.module.css';

function NewsList({ news, isLoading = false }) {
  if (isLoading) {
    return (
      <div className={css.newsList}>
        {[...Array(6)].map((_, index) => (
          <div key={index} className={`${css.newsCard} ${css.skeleton}`}>
            <div className={css.skeletonImage}></div>
            <div className={css.skeletonContent}>
              <div className={css.skeletonTitle}></div>
              <div className={css.skeletonText}></div>
              <div className={css.skeletonText}></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!news || news.length === 0) {
    return (
      <div className={css.emptyState}>
        <div className={css.emptyIcon}>📰</div>
        <h3 className={css.emptyTitle}>No news found</h3>
        <p className={css.emptyText}>
          Try adjusting your search terms or browse all news.
        </p>
      </div>
    );
  }

  return (
    <div className={css.newsList}>
      {news.map((item) => (
        <article key={item._id || item.id} className={css.newsCard}>
          {item.imageUrl && (
            <div className={css.imageContainer}>
              <img
                src={item.imageUrl}
                alt={item.title}
                className={css.newsImage}
                loading="lazy"
              />
            </div>
          )}
          <div className={css.newsContent}>
            <h3 className={css.newsTitle}>{item.title}</h3>
            <p className={css.newsDescription}>{item.description}</p>
            <div className={css.newsMeta}>
              {item.date && (
                <time className={css.newsDate}>
                  {new Date(item.date).toLocaleDateString()}
                </time>
              )}
              {item.category && (
                <span className={css.newsCategory}>{item.category}</span>
              )}
            </div>
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={css.readMoreLink}
              >
                Read more
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export default NewsList;
