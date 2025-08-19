import filterRibbonClasses from "./FilterRibbon.module.css";
import { TAG_OPTIONS } from "../utils/config.js";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AppComponentsContex from "../store/AppComponentsContext.jsx";
import Button from "../UI/Button";

export default function FilterRibbon() {
  const { activeTag } = useContext(AppComponentsContex);

  const navigate = useNavigate();

  function handleFilterClick(tag) {
    if (activeTag === tag) {
      navigate("/recipes?page=1");
    } else {
      navigate(`/recipes?page1&tag=${tag}`);
    }
  }

  return (
    <nav className={filterRibbonClasses.container}>
      <h2>Filter Recipes:</h2>
      <ul className={filterRibbonClasses.ribbon_box}>
        {TAG_OPTIONS.map((tag) => (
          <Button
            key={tag}
            btnCaption={tag}
            onClick={() => handleFilterClick(tag)}
            className={activeTag === tag ? filterRibbonClasses.active : ""}
          />
        ))}
      </ul>
    </nav>
  );
}
