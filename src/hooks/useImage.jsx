import placeholder from "../assets/img/avatar_book-sm.png";
import {useState, useEffect} from "react";
export const useImage = (image) => {
  const [imagePath, setImagePath] = useState(placeholder);
  useEffect(() => {
    if (image) {
      setImagePath(`https://covers.openlibrary.org/b/id/${image}-M.jpg`);
    } else {
      return placeholder;
    }
  }, [image]);

  return imagePath;
};
