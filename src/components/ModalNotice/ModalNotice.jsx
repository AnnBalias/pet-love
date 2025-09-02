import { useEffect, useState } from 'react';
import { useUser } from '../../contexts/useUser';
import { useNotification } from '../../contexts/useNotification';
import { api } from '../../services/api';
import Icon from '../Icon/Icon';
import css from './ModalNotice.module.css';

function ModalNotice({ isOpen, onClose, notice }) {
  const { user } = useUser();
  const { showSuccess, showError } = useNotification();
  const [isFavorite, setIsFavorite] = useState(notice?.isFavorite || false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Блокуємо скрол на body
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Оновлюємо стан favorite при зміні notice
  useEffect(() => {
    if (notice) {
      setIsFavorite(notice.isFavorite || false);
    }
  }, [notice]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleFavoriteClick = async () => {
    if (!user) {
      showError('Please login to add notices to favorites');
      return;
    }

    if (!notice?.id) {
      showError('Notice ID is missing');
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

  const handleContactClick = () => {
    if (!notice?.contactInfo) {
      showError('Contact information is not available');
      return;
    }

    // Визначаємо тип контакту та відкриваємо відповідний протокол
    const { contactInfo } = notice;

    if (contactInfo.email) {
      window.open(`mailto:${contactInfo.email}`, '_blank');
    } else if (contactInfo.phone) {
      window.open(`tel:${contactInfo.phone}`, '_blank');
    } else if (contactInfo.telegram) {
      window.open(`https://t.me/${contactInfo.telegram}`, '_blank');
    } else {
      showError('No contact information available');
    }
  };

  if (!isOpen || !notice) {
    return null;
  }

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

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const formatPopularity = (popularity) => {
    if (!popularity) return '0';
    return popularity.toString();
  };

  const hasContactInfo =
    notice.contactInfo &&
    (notice.contactInfo.email ||
      notice.contactInfo.phone ||
      notice.contactInfo.telegram);

  return (
    <div className={css.modalOverlay} onClick={handleBackdropClick}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <div className={css.modalHeader}>
          <button
            type="button"
            className={css.closeBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            <Icon name="cross" className={css.closeIcon} />
          </button>
        </div>

        <div className={css.modalContent}>
          <div className={css.noticeImage}>
            {notice.image ? (
              <img
                src={notice.image}
                alt={notice.title}
                className={css.image}
              />
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
            <h2 className={css.noticeTitle}>{notice.title}</h2>

            <div className={css.noticeDetails}>
              <div className={css.detailRow}>
                <span className={css.detailLabel}>Pet:</span>
                <span className={css.detailValue}>{notice.pet}</span>
              </div>

              <div className={css.detailRow}>
                <span className={css.detailLabel}>Birth Date:</span>
                <span className={css.detailValue}>
                  {formatDate(notice.birthDate)}
                </span>
              </div>

              <div className={css.detailRow}>
                <span className={css.detailLabel}>Gender:</span>
                <span className={css.detailValue}>
                  <Icon
                    name={notice.gender === 'male' ? 'male' : 'female'}
                    className={css.genderIcon}
                  />
                  {notice.gender}
                </span>
              </div>

              <div className={css.detailRow}>
                <span className={css.detailLabel}>Type:</span>
                <span className={css.detailValue}>{notice.petType}</span>
              </div>

              <div className={css.detailRow}>
                <span className={css.detailLabel}>Category:</span>
                <span className={css.detailValue}>{notice.category}</span>
              </div>

              {notice.location && (
                <div className={css.detailRow}>
                  <span className={css.detailLabel}>Location:</span>
                  <span className={css.detailValue}>{notice.location}</span>
                </div>
              )}

              {notice.price && notice.price > 0 && (
                <div className={css.detailRow}>
                  <span className={css.detailLabel}>Price:</span>
                  <span className={css.detailValue}>${notice.price}</span>
                </div>
              )}
            </div>

            {notice.comment && (
              <div className={css.comment}>
                <h3>Comment:</h3>
                <p>{notice.comment}</p>
              </div>
            )}

            {notice.additionalInfo && (
              <div className={css.additionalInfo}>
                <h3>Additional Information:</h3>
                <p>{notice.additionalInfo}</p>
              </div>
            )}
          </div>

          <div className={css.modalActions}>
            <button
              className={`${css.favoriteBtn} ${isFavorite ? css.favoriteActive : ''}`}
              onClick={handleFavoriteClick}
              disabled={isLoading}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Icon name="heart" className={css.favoriteIcon} />
              {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            </button>

            {hasContactInfo && (
              <button
                className={css.contactBtn}
                onClick={handleContactClick}
                title="Contact owner"
              >
                <Icon name="phone" className={css.contactIcon} />
                Contact
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalNotice;
