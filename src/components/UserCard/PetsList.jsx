import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useNotification } from '../../contexts/useNotification';
import PetsItem from './PetsItem';
import css from './PetsList.module.css';

function PetsList() {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showError } = useNotification();

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      setIsLoading(true);
      const petsData = await api.getUserPets();
      setPets(petsData || []);
    } catch (error) {
      console.error('Error fetching pets:', error);
      showError('Failed to load pets. Please try again.');
      // Fallback to mock data for development
      setPets([
        {
          id: 1,
          name: 'Buddy',
          type: 'Dog',
          breed: 'Golden Retriever',
          birthDate: '2021-03-15',
          gender: 'male',
          avatar: null
        },
        {
          id: 2,
          name: 'Whiskers',
          type: 'Cat',
          breed: 'Persian',
          birthDate: '2022-01-10',
          gender: 'female',
          avatar: null
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePet = (petId) => {
    setPets(prevPets => prevPets.filter(pet => pet.id !== petId));
  };

  if (isLoading) {
    return (
      <div className={css.loading}>
        <p>Loading pets...</p>
      </div>
    );
  }

  if (pets.length === 0) {
    return (
      <div className={css.noPets}>
        <p>You don't have any pets added yet.</p>
      </div>
    );
  }

  return (
    <div className={css.petsList}>
      {pets.map(pet => (
        <PetsItem 
          key={pet.id} 
          pet={pet} 
          onDelete={handleDeletePet}
        />
      ))}
    </div>
  );
}

export default PetsList;
