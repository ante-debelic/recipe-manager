import { Link } from "react-router-dom";
import { useContext } from "react";
import classes from "./HomePage.module.css";
import { FaReadme, FaPlus } from "react-icons/fa6";
import AppComponentsContex from "../store/AppComponentsContext.jsx";

export default function HomePage() {
  const { error } = useContext(AppComponentsContex);

  let content = (
    <header>
      <h1 className={classes.title}>Recipe Manager</h1>
      <nav className={classes.navbar}>
        <ul className={classes.navlinks}>
          <li className={classes.navlink}>
            <Link to="/recipes" className={classes.navlink_button}>
              <span className={classes.link_title}>My Recipes</span>
              <span className={classes.link_icon}>
                <FaReadme />
              </span>
            </Link>
          </li>
          <li className={classes.navlink}>
            <Link to="/recipe" className={classes.navlink_button}>
              <span className={classes.link_title}>Add Recipe</span>
              <span className={classes.link_icon}>
                <FaPlus />
              </span>
            </Link>
          </li>
        </ul>
        {error && <p>Error:{error}</p>}
      </nav>
      <q className={classes.quote}>
        You learn a lot about someone when you share a meal together.
        <div className={classes.line}></div>
      </q>
    </header>
  );

  return <div className={classes.container}>{content}</div>;
}
