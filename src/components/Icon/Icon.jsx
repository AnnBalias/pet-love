import css from './Icon.module.css';
import sprite from '../../assets/icons/sprite.svg';

export default function Icon({ name, className }) {
  return (
    <svg className={`${css.icon} ${className || ''}`} aria-hidden="true">
      <use href={`${sprite}#${name}`} />
    </svg>
  );
}
