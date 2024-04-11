import { NavLink } from "react-router-dom";
import clsx from "clsx";

import css from "./Navigation.module.css";
const buildLinkClass = ({ isActive }) =>
  clsx(css.link, {
    [css.active]: isActive,
  });

const Navigation = () => {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <nav className={css.nav}>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
          <NavLink to="/movies" className={buildLinkClass}>
            Movies
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
