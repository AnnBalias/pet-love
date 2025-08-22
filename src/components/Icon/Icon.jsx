import css from './Icon.module.css';

export default function Icon({ name, className }) {
  return (
    <svg className={`${css.icon} ${className || ''}`} aria-hidden="true">
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
}
