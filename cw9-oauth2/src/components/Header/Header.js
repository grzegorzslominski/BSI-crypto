/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable func-names */
import styles from './Header.module.css';
import logoImg from '../../assets/images/header-icon.png';

const Header = function () {
  return (
    <header className={`${styles.header}`}>
      <img src={logoImg} alt="" style={{ height: '100px' }} />
    </header>
  );
};

export default Header;
