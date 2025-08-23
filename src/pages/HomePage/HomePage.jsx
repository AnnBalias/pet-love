import css from './HomePage.module.css';

function HomePage() {
  return (
    <div className={css.homePageContainer}>
      <div className={css.homePageInfo}>
        <h1 className={css.homePageTitle}>
          Take good <span className={css.homePageTitleSpan}>care</span> of your
          small pets
        </h1>
        <p className={css.homePageText}>
          Choosing a pet for your home is a choice that is meant to enrich your
          life with immeasurable joy and tenderness.
        </p>
      </div>
      <div className={css.homePageImg}></div>
    </div>
  );
}

export default HomePage;
