import AddPet from '../UserCard/AddPet';
import PetsList from '../UserCard/PetsList';
import css from './PetsBlock.module.css';

function PetsBlock() {
  return (
    <div className={css.petsBlock}>
      <div className={css.header}>
        <h3 className={css.title}>My pets</h3>
        <AddPet />
      </div>

      <PetsList />
    </div>
  );
}

export default PetsBlock;
