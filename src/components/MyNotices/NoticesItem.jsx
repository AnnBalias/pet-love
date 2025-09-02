import { useState } from 'react';
import Icon from '../Icon/Icon';
import { api } from '../../services/api';
import { useNotification } from '../../contexts/useNotification';
import css from './NoticesItem.module.css';

function NoticesItem({ notice, isFavorite, onRemoveFavorite }) {
  const [isRemoving, setIsRemoving] = useState(false);
  const { showSuccess, showError } = useNotification();

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'sell':
        return 'heart';
      case 'lost-found':
        return 'search';
      case 'in-good-hands':
        return 'user';
      default:
        return 'heart';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'sell':
        return '#f6b83d';
      case 'lost-found':
        return '#54adff';
      case 'in-good-hands':
        return '#00c3f7';
      default:
        return '#f6b83d';
    }
  };

  const handleRemoveFavorite = async () => {
    if (isRemoving) return;

    setIsRemoving(true);

    try {
      await api.removeFromFavorites(notice.id);
      showSuccess('Notice removed from favorites!');
      onRemoveFavorite(notice.id);
    } catch (error) {
      console.error('Error removing from favorites:', error);
      showError('Failed to remove from favorites. Please try again.');
    } finally {
      setIsRemoving(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className={css.noticeCard}>
      <div className={css.noticeImage}>
        {notice.image ? (
          <img src={notice.image} alt={notice.title} className={css.image} />
        ) : (
          <div className={css.imagePlaceholder}>
            <Icon name="star" className={css.imageIcon} />
          </div>
        )}
        <div
          className={css.categoryBadge}
          style={{
            backgroundColor: getCategoryColor(notice.category),
          }}
        >
          <Icon
            name={getCategoryIcon(notice.category)}
            className={css.categoryIcon}
          />
        </div>
      </div>

      <div className={css.noticeInfo}>
        <h3 className={css.noticeTitle}>{notice.title}</h3>
        <p className={css.noticePet}>{notice.pet}</p>
        <p className={css.noticeLocation}>{notice.location}</p>
        <p className={css.noticeDate}>{formatDate(notice.date)}</p>
      </div>

      <div className={css.noticeActions}>
        {isFavorite && (
          <button
            className={css.removeFavoriteBtn}
            onClick={handleRemoveFavorite}
            disabled={isRemoving}
            title="Remove from favorites"
          >
            <Icon name="trash" className={css.actionIcon} />
          </button>
        )}
      </div>
    </div>
  );
}

export default NoticesItem;
