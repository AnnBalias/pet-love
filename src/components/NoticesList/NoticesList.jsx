import NoticesItem from './NoticesItem';
import css from './NoticesList.module.css';

function NoticesList({ notices, isLoading }) {
  if (isLoading) {
    return (
      <div className={css.loading}>
        <div className={css.loadingSpinner}></div>
        <p>Loading notices...</p>
      </div>
    );
  }

  if (notices.length === 0) {
    return (
      <div className={css.empty}>
        <h3>No notices found</h3>
        <p>Try adjusting your search criteria or check back later.</p>
      </div>
    );
  }

  return (
    <div className={css.noticesList}>
      {notices.map((notice) => (
        <NoticesItem key={notice.id} notice={notice} />
      ))}
    </div>
  );
}

export default NoticesList;
