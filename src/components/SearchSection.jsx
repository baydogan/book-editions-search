import { useFetch } from "../hooks/useFetch";
import { useInputs } from "../hooks/useInputs";
import { useEffect } from "react";
import { useDetailedFetch } from "../hooks/useDetailedFetch";
import Loader from "../components/Loader";
import Bookcards from "./BookCards";

const Searchsection = () => {
  const [inputs, setInputs] = useInputs({ search: "" });
  const { state } = useFetch("http://openlibrary.org/search.json?title=", inputs.search);
  const { editionsFetch, editionState } = useDetailedFetch();

  useEffect(() => {
    if (state.loading) {
      editionState.books = [];
      console.log("editionstate", editionState);
    }
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
      {state.success && (
        <div className="drop-down">
          {state.books &&
            state.books.map((book) => (
              <ul className="drop-down-ul" key={book.key}>
                <li className="drop-down-list" onClick={() => editionsFetch(book)}>
                  <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt="" />
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
      {editionState.books && editionState.books.map((book) => <Bookcards key={book.key} book={book} />)}
    </div>
  );
};

export default Searchsection;
