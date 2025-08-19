import paginationButtonsClasses from "./PaginationButtons.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AppComponentsContex from "../store/AppComponentsContext";

export default function PaginationButtons() {
  const { paginationData, activeTag } = useContext(AppComponentsContex);

  if (!paginationData) return null;

  const getUrl = (page) => {
    if (activeTag) {
      return `/recipes?page=${page}&tag=${activeTag}`;
    }
    return `/recipes?page=${page}`;
  };

  return (
    <div className={paginationButtonsClasses.pagination}>
      {paginationData.hasPrevPage && (
        <Link to={getUrl(paginationData.prevPage)}>Prev</Link>
      )}
      <span>{paginationData.currentPage}</span>
      {paginationData.hasNextPage && (
        <Link to={getUrl(paginationData.nextPage)}>Next</Link>
      )}
    </div>
  );
}
