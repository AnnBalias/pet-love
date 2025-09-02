import css from './PetBlock.module.css';

function PetBlock() {
  return (
    <div className={css.petBlock}>
      <div className={css.imageContainer}>
        <div className={css.placeholderImage}>
          <span className={css.placeholderText}>Pet Illustration</span>
        </div>
      </div>
    </div>
  );
}

export default PetBlock;
