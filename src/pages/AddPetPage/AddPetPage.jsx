import PetBlock from '../../components/PetBlock/PetBlock';
import AddPetForm from '../../components/AddPetForm/AddPetForm';
import css from './AddPetPage.module.css';

function AddPetPage() {
  return (
    <div className={css.addPetPage}>
      <div className={css.container}>
        <PetBlock />
        <AddPetForm />
      </div>
    </div>
  );
}

export default AddPetPage;
