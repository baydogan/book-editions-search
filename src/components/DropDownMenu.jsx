import React from "react";
import { useFetch } from "../hooks/useFetch";

const Dropdownmenu = ({ state }) => {
  const { editionsFetch } = useFetch();
  return (
    <div className="drop-down">
      {state.books &&
        state.books.map((book) => (
          <ul className="drop-down-ul" key={book.key}>
            <li className="drop-down-list" onClick={() => editionsFetch(book.key)}>
              <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt="" />
              <div className="drop-down-text">
                <p>{book.title}</p>
                <p>{book.author_name}</p>
                <p>First published: {book.first_publish_year}</p>
              </div>
            </li>
          </ul>
        ))}
    </div>
  );
};

export default Dropdownmenu;
