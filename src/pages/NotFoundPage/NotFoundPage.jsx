import { Link } from 'react-router-dom';
import errorCat from '../../assets/images/error-cat.png';
import css from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <div className={css.container}>
      <h2 className={css.errorTitle}>
        4<img src={errorCat} alt="Error cat" className={css.errorImage} />4
      </h2>
      <p className={css.errorText}>Ooops! This page not found :(</p>
      <Link to="/" className={css.homeLink}>
        To home page
      </Link>
    </div>
  );
}

export default NotFoundPage;
