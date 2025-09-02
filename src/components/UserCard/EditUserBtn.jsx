import { useState } from 'react';
import Icon from '../Icon/Icon';
import ModalEditUser from './ModalEditUser';
import css from './EditUserBtn.module.css';

function EditUserBtn({ className }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button 
        className={`${css.editBtn} ${className || ''}`} 
        onClick={handleEditClick}
      >
        <Icon name="edit" className={css.editIcon} />
        Edit Profile
      </button>
      
      <ModalEditUser 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  );
}

export default EditUserBtn;
