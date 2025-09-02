import UserCard from '../../components/UserCard/UserCard';
import MyNotices from '../../components/MyNotices/MyNotices';
import css from './ProfilePage.module.css';

function ProfilePage() {
  return (
    <div className={css.profilePage}>
      <div className={css.container}>
        <UserCard />
        <MyNotices />
      </div>
    </div>
  );
}

export default ProfilePage;
