import { useImage } from "../hooks/useImage";

const Bookcards = ({ book }) => {
  
    const imagePath = useImage(book.covers);

  return (
    <div className="book-card">
      <img src={imagePath} alt="" />
      <div className="book-card-text">
        <h4>{book.title}</h4>
        {book.by_statement && <p>{book.by_statement}</p>}
        <p>Publisher: {book.publishers}</p>
        <p>Publish Date: {book.publish_date}</p>
        {book.isbn_10 && <p>ISBN: {book.isbn_10}</p>}
        {book.number_of_pages && <p>Pages: {book.number_of_pages}</p>}
      </div>
    </div>
  );
};

export default Bookcards;

// `https://covers.openlibrary.org/b/id/${book.covers}-M.jpg`
// require("../assets/img/avatar_book-sm.png")
