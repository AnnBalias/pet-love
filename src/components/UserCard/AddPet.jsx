import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import css from './AddPet.module.css';

function AddPet() {
  return (
    <Link to="/add-pet" className={css.addPetBtn}>
      <Icon name="cross" className={css.plusIcon} />
      Add pet
    </Link>
  );
}

export default AddPet;
