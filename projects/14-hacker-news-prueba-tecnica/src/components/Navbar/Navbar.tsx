import { nav, link } from './Navbar.css';

export const Navbar = () => {
  return (
    <nav className={nav}>
      <img src="/logo.gif" alt="Hacker news logo" />
      <a className={link} href="">
        Hacker news
      </a>
    </nav>
  );
};
