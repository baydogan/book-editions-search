import { useFetch } from "../hooks/useFetch";
import { useInputs } from "../hooks/useInputs";
import { useEffect } from "react";
import { useDetailedFetch } from "../hooks/useDetailedFetch";
import Loader from "../components/Loader";
import Bookcards from "./BookCards";
import placeholder from "../assets/img/avatar_book-sm.png";

const Searchsection = () => {
  const [inputs, setInputs] = useInputs({ search: "" });
  const { state } = useFetch("http://openlibrary.org/search.json?title=", inputs.search);
  const { editionsFetch, editionState } = useDetailedFetch();

  const imagePath = (image) => {
    //an alternative image path for the book cover
    if (image) {
      return `https://covers.openlibrary.org/b/id/${image}-M.jpg`;
    } else {
      return placeholder;
    }
  };

  useEffect(() => {
    editionState.books = [];
  }, [state]);

  useEffect(() => {
    state.books = [];
    inputs.search = "";
  }, [editionState]);

  return (
    <div>
      <div className="search-section">
        <h1>Search Books by Title</h1>
        <div className="search-section-box">
          <input type="text" name="search" value={inputs.search} onChange={setInputs} />
        </div>
      </div>
      {state.loading && <Loader />}
      {!editionState.loading && (
        <div className="drop-down">
          {state.books &&
            state.books.map((book) => (
              <ul className="drop-down-ul" key={book.key}>
                <li className="drop-down-list" onClick={() => editionsFetch(book)}>
                  <img src={imagePath(book.cover_i)} alt="" />
                  <div className="drop-down-text">
                    <p>{book.title}</p>
                    <p>{book.author_name}</p>
                    <span>First published: {book.first_publish_year}</span>
                  </div>
                </li>
              </ul>
            ))}
        </div>
      )}
      {editionState.loading && <Loader />}
      {!state.loading && (
        <div className="book-card-container">
          {editionState.books && editionState.books.map((book) => <Bookcards key={book.key} book={book} />)}
        </div>
      )}
    </div>
  );
};

export default Searchsection;
