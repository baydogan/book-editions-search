import { useReducer, useEffect } from "react";
import { reducer } from "../reducer/reducer";
import axios from "axios";

const initialState = {
  loading: false,
  books: [],
  error: null,
  success: null,
};

export const useFetch = (url, search) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fixedSearch = search.split(" ").join("+");

  useEffect(() => {
    const delayedFetch = setTimeout(() => {
      if (fixedSearch.length > 0) {
        dispatch({ type: "FETCH_START" });
        axios
          .get(url + fixedSearch)
          .then((response) => {
            dispatch({ type: "FETCH_SUCCESS", payload: response.data.docs });
            console.log(response.data.docs);
          })
          .catch((error) => {
            dispatch({ type: "FETCH_FAILURE", payload: error });
          });
      }
    }, 2000);
    return () => clearTimeout(delayedFetch);
  }, [fixedSearch]);

  return {
    state,
  };
};
