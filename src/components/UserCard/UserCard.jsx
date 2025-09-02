import EditUserBtn from './EditUserBtn';
import UserBlock from './UserBlock';
import PetsBlock from '../PetsBlock/PetsBlock';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import css from './UserCard.module.css';

function UserCard() {
  return (
    <div className={css.userCard}>
      <div className={css.header}>
        <EditUserBtn />
        <LogOutBtn />
      </div>

      <UserBlock />
      <PetsBlock />
    </div>
  );
}

export default UserCard;
