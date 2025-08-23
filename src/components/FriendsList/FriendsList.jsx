import FriendsItem from '../FriendsItem/FriendsItem';
import css from './FriendsList.module.css';

function FriendsList({ friends }) {
  return (
    <div className={css.friendsList}>
      {friends.map((friend) => (
        <FriendsItem key={friend._id} friend={friend} />
      ))}
    </div>
  );
}

export default FriendsList;
