import css from './Title.module.css';

function Title({ text }) {
  return (
    <h1 className={css.title}>
      {text}
    </h1>
  );
}

export default Title;
