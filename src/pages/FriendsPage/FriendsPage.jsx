import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import FriendsList from '../../components/FriendsList/FriendsList';
import css from './FriendsPage.module.css';

function FriendsPage() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await api.getFriends();

        if (!data || data.length === 0) {
          navigate('/404');
          return;
        }

        setFriends(data);
      } catch (err) {
        if (err.message.includes('404') || err.message.includes('Not Found')) {
          navigate('/404');
          return;
        }

        setError(`Failed to load friends: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [navigate]);

  return (
    <div className={css.container}>
      <h2 className={css.title}>Our Friends</h2>
      {loading && <p>Loading </p>}
      {error && !loading && <p className={css.error}>Error: {error}</p>}
      {!loading && !error && <FriendsList friends={friends} />}
    </div>
  );
}

export default FriendsPage;
