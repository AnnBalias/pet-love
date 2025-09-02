import { useState } from 'react';
import { useUser } from '../../contexts/useUser';
import Icon from '../Icon/Icon';
import ModalEditUser from './ModalEditUser';
import css from './UserBlock.module.css';

function UserBlock() {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) {
    return null;
  }

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.userBlock}>
      <div className={css.avatarSection}>
        <div className={css.avatar}>
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className={css.avatarImg} />
          ) : (
            <button
              className={css.addAvatarBtn}
              onClick={handleEditClick}
              title="Add profile photo"
            >
              <Icon name="user" className={css.defaultAvatar} />
              <div className={css.addAvatarOverlay}>
                <Icon name="edit" className={css.editIcon} />
              </div>
            </button>
          )}
        </div>
      </div>

      <div className={css.userInfo}>
        <h2 className={css.userName}>{user.name}</h2>
        <div className={css.userDetails}>
          <div className={css.userField}>
            <span className={css.label}>Email:</span>
            <span className={css.value}>{user.email}</span>
          </div>
          {user.phone && (
            <div className={css.userField}>
              <span className={css.label}>Phone:</span>
              <span className={css.value}>{user.phone}</span>
            </div>
          )}
        </div>
      </div>

      <ModalEditUser isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default UserBlock;
