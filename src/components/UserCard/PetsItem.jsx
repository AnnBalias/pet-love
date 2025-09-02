import { useState } from 'react';
import Icon from '../Icon/Icon';
import { api } from '../../services/api';
import { useNotification } from '../../contexts/useNotification';
import css from './PetsItem.module.css';

function PetsItem({ pet, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { showSuccess, showError } = useNotification();

  const handleDelete = async () => {
    if (isDeleting) return;
    
    setIsDeleting(true);
    
    try {
      await api.deletePet(pet.id);
      showSuccess('Pet deleted successfully!');
      onDelete(pet.id);
    } catch (error) {
      console.error('Error deleting pet:', error);
      showError('Failed to delete pet. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getGenderIcon = (gender) => {
    return gender === 'male' ? 'male' : 'female';
  };

  return (
    <div className={css.petCard}>
      <div className={css.petAvatar}>
        {pet.avatar ? (
          <img src={pet.avatar} alt={pet.name} className={css.petImg} />
        ) : (
          <Icon name="heart" className={css.defaultPetAvatar} />
        )}
      </div>
      
      <div className={css.petInfo}>
        <h4 className={css.petName}>{pet.name}</h4>
        <div className={css.petDetails}>
          <div className={css.petField}>
            <span className={css.label}>Type:</span>
            <span className={css.value}>{pet.type}</span>
          </div>
          <div className={css.petField}>
            <span className={css.label}>Breed:</span>
            <span className={css.value}>{pet.breed}</span>
          </div>
          <div className={css.petField}>
            <span className={css.label}>Birth:</span>
            <span className={css.value}>{formatDate(pet.birthDate)}</span>
          </div>
          <div className={css.petField}>
            <span className={css.label}>Gender:</span>
            <span className={css.value}>
              <Icon name={getGenderIcon(pet.gender)} className={css.genderIcon} />
              {pet.gender === 'male' ? 'Male' : 'Female'}
            </span>
          </div>
        </div>
      </div>
      
      <div className={css.petActions}>
        <button 
          className={css.deletePetBtn}
          onClick={handleDelete}
          disabled={isDeleting}
          title="Delete pet"
        >
          <Icon name="trash" className={css.actionIcon} />
        </button>
      </div>
    </div>
  );
}

export default PetsItem;
