import { useFetch } from "../hooks/useFetch";
import { useInputs } from "../hooks/useInputs";
import { useEffect } from "react";

const Searchsection = () => {
  const [inputs, setInputs] = useInputs({ search: "" });
  const { state } = useFetch(`http://openlibrary.org/search.json?title=${inputs.search}`);



  return (
    <div>
      <div className="search-section">
        <h1>Search Books by Title</h1>
        <div className="search-section-box">
          <input type="text" name="search" value={inputs.search} onChange={setInputs} />
          <button>Search</button>
        </div>
      </div>
      <div className="drop-down">
        {state.books &&
          state.books.map((book) => (
            <ul className="drop-down-ul" key={book.key}>
              <li className="drop-down-list">
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
    </div>
  );
};

export default Searchsection;
