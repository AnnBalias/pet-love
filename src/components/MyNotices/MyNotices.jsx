import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useNotification } from '../../contexts/useNotification';
import NoticesItem from './NoticesItem';
import css from './MyNotices.module.css';

function MyNotices() {
  const [activeTab, setActiveTab] = useState('favorites');
  const [notices, setNotices] = useState({
    favorites: [],
    viewed: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const { showError } = useNotification();

  const tabs = [
    {
      id: 'favorites',
      label: 'My favorites pets',
      count: notices.favorites.length,
    },
    { id: 'viewed', label: 'Viewed', count: notices.viewed.length },
  ];

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setIsLoading(true);

      // Завантажуємо улюблені оголошення
      const favoritesData = await api.getFavoriteNotices();

      // Завантажуємо переглянуті оголошення
      const viewedData = await api.getViewedNotices();

      setNotices({
        favorites: favoritesData || [],
        viewed: viewedData || [],
      });
    } catch (error) {
      console.error('Error fetching notices:', error);
      showError('Failed to load notices. Please try again.');

      // Fallback на mock дані для розробки
      setNotices({
        favorites: [
          {
            id: 1,
            title: 'Cute kitten needs home',
            pet: 'British Shorthair',
            location: 'Odesa',
            category: 'sell',
            image: null,
            date: '2024-01-12',
          },
          {
            id: 2,
            title: 'Playful puppy',
            pet: 'Labrador',
            location: 'Kyiv',
            category: 'sell',
            image: null,
            date: '2024-01-10',
          },
        ],
        viewed: [
          {
            id: 3,
            title: 'Lost my cat',
            pet: 'Persian cat',
            location: 'Lviv',
            category: 'lost-found',
            image: null,
            date: '2024-01-08',
          },
        ],
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFavorite = (noticeId) => {
    setNotices((prev) => ({
      ...prev,
      favorites: prev.favorites.filter((notice) => notice.id !== noticeId),
    }));
  };

  if (isLoading) {
    return (
      <div className={css.myNotices}>
        <h2 className={css.title}>My notices</h2>
        <div className={css.loading}>
          <p>Loading notices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={css.myNotices}>
      <h2 className={css.title}>My notices</h2>

      <div className={css.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${css.tab} ${activeTab === tab.id ? css.tabActive : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            <span className={css.count}>{tab.count}</span>
          </button>
        ))}
      </div>

      <div className={css.content}>
        {notices[activeTab].length === 0 ? (
          <div className={css.empty}>
            <p>No notices in this category yet.</p>
          </div>
        ) : (
          <div className={css.noticesList}>
            {notices[activeTab].map((notice) => (
              <NoticesItem
                key={notice.id}
                notice={notice}
                isFavorite={activeTab === 'favorites'}
                onRemoveFavorite={handleRemoveFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyNotices;
