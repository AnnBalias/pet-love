import RegisterForm from '../../components/RegisterForm/RegisterForm';
import css from './RegisterPage.module.css';
import catImage from '../../assets/images/cat.png';

function RegisterPage() {
  return (
    <div className={css.registerPage}>
      <div className={css.imgBox}>
        <div className={css.textBlock}>
          <img src={catImage} alt="Cat" className={css.catImg} />
          <div className={css.textBox}>
            <div className={css.textTitle}>
              <p className={css.name}>Jack</p>
              <p className={css.birthday}>
                <span className={css.birthdaySpan}>Birthday: </span>
                18.10.2021
              </p>
            </div>
            <p className={css.description}>
              Jack is a gray Persian cat with green eyes. He loves to be
              pampered and groomed, and enjoys playing with toys.
            </p>
          </div>
        </div>
      </div>

      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
