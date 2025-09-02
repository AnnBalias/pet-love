import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import { useUser } from '../../contexts/useUser';
import { api } from '../../services/api';
import { useNotification } from '../../contexts/useNotification';
import ModalAttention from '../ModalAttention/ModalAttention';
import ModalNotice from '../ModalNotice/ModalNotice';
import css from './NoticesItem.module.css';

function NoticesItem({ notice }) {
  const { user } = useUser();
  const { showSuccess, showError } = useNotification();
  const [isFavorite, setIsFavorite] = useState(notice.isFavorite || false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModalAttention, setShowModalAttention] = useState(false);
  const [showModalNotice, setShowModalNotice] = useState(false);
  const [noticeDetails, setNoticeDetails] = useState(null);

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'sell':
        return 'heart';
      case 'lost':
        return 'search';
      case 'found':
        return 'search';
      case 'in-good-hands':
        return 'user';
      default:
        return 'heart';
    }
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'sell':
        return '#f6b83d';
      case 'lost':
        return '#54adff';
      case 'found':
        return '#54adff';
      case 'in-good-hands':
        return '#00c3f7';
      default:
        return '#f6b83d';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';

    try {
      const date = new Date(dateString);
      return date
        .toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/\//g, '.');
    } catch {
      return dateString;
    }
  };

  const formatPopularity = (popularity) => {
    if (!popularity) return '0';
    return popularity.toString();
  };

  const formatPrice = (price) => {
    if (price === null || price === undefined) return 'Price not specified';
    return `$${parseFloat(price).toFixed(2)}`;
  };

  const handleLearnMore = async () => {
    if (!user) {
      setShowModalAttention(true);
      return;
    }

    try {
      setIsLoading(true);
      const details = await api.getNoticeDetails(notice.id);
      setNoticeDetails(details);
      setShowModalNotice(true);
    } catch (error) {
      console.error('Error fetching notice details:', error);
      showError('Failed to load notice details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavoriteClick = async () => {
    if (!user) {
      setShowModalAttention(true);
      return;
    }

    try {
      setIsLoading(true);

      if (isFavorite) {
        await api.removeFromFavorites(notice.id);
        setIsFavorite(false);
        showSuccess('Removed from favorites!');
      } else {
        await api.addToFavorites(notice.id);
        setIsFavorite(true);
        showSuccess('Added to favorites!');
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
      showError('Failed to update favorites. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModalAttention = () => {
    setShowModalAttention(false);
  };

  const closeModalNotice = () => {
    setShowModalNotice(false);
  };

  return (
    <>
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
          <div className={css.popularityBadge}>
            <Icon name="heart" className={css.popularityIcon} />
            <span>{formatPopularity(notice.popularity)}</span>
          </div>
        </div>

        <div className={css.noticeInfo}>
          <h3 className={css.noticeTitle}>{notice.title}</h3>

          <div className={css.noticeDetails}>
            <div className={css.detailRow}>
              <span className={css.detailLabel}>Name:</span>
              <span className={css.detailValue}>{notice.pet}</span>
            </div>

            <div className={css.detailRow}>
              <span className={css.detailLabel}>Birthday:</span>
              <span className={css.detailValue}>
                {formatDate(notice.birthDate)}
              </span>
            </div>

            <div className={css.detailRow}>
              <span className={css.detailLabel}>Sex:</span>
              <span className={css.detailValue}>
                <Icon
                  name={notice.gender === 'male' ? 'male' : 'female'}
                  className={css.genderIcon}
                />
                {notice.gender || 'Unknown'}
              </span>
            </div>

            <div className={css.detailRow}>
              <span className={css.detailLabel}>Species:</span>
              <span className={css.detailValue}>{notice.petType}</span>
            </div>

            <div className={css.detailRow}>
              <span className={css.detailLabel}>Category:</span>
              <span className={css.detailValue}>{notice.category}</span>
            </div>
          </div>

          {notice.comment && (
            <div className={css.comment}>
              <p>{notice.comment}</p>
            </div>
          )}

          <div className={css.priceSection}>
            <span className={css.price}>{formatPrice(notice.price)}</span>
          </div>
        </div>

        <div className={css.noticeActions}>
          <button
            className={`${css.favoriteBtn} ${isFavorite ? css.favoriteActive : ''}`}
            onClick={handleFavoriteClick}
            disabled={isLoading}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Icon name="heart" className={css.favoriteIcon} />
          </button>

          <button
            className={css.learnMoreBtn}
            onClick={handleLearnMore}
            disabled={isLoading}
            title="Learn more"
          >
            Learn more
          </button>
        </div>
      </div>

      <ModalAttention
        isOpen={showModalAttention}
        onClose={closeModalAttention}
      />

      <ModalNotice
        isOpen={showModalNotice}
        onClose={closeModalNotice}
        notice={noticeDetails}
      />
    </>
  );
}

export default NoticesItem;
