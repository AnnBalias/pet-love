import LoginForm from '../../components/LoginForm/LoginForm';
import css from './LoginPage.module.css';
import dogImage from '../../assets/images/dog.png';

function LoginPage() {
  return (
    <div className={css.loginPage}>
      <div className={css.imgBox}>
        <div className={css.textBlock}>
          <img src={dogImage} alt="Dog" className={css.dogImg} />
          <div className={css.textBox}>
            <div className={css.textTitle}>
              <p className={css.name}>Rich</p>
              <p className={css.birthday}>
                <span className={css.birthdaySpan}>Birthday: </span>21.09.2020
              </p>
            </div>
            <p className={css.description}>
              Rich would be the perfect addition to an active family that loves
              to play and go on walks. I bet he would love having a doggy
              playmate too!
            </p>
          </div>
        </div>
      </div>

      <LoginForm />
    </div>
  );
}

export default LoginPage;
