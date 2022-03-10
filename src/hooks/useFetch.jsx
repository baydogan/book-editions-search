import { useReducer, useEffect } from "react";
import { reducer } from "../reducer/reducer";
import axios from "axios";

const initialState = {
  loading: false,
  books: [],
  error: null,
  success: null,
};

export const useFetch = (url) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const replaced = url.split(" ").join("+");

  useEffect(() => {
    const delayedFetch = setTimeout(() => {
      dispatch({ type: "FETCH_START" });
      axios
        .get(replaced)
        .then((response) => {
          dispatch({ type: "FETCH_SUCCESS", payload: response.data.docs });
        })
        .catch((error) => {
          dispatch({ type: "FETCH_FAILURE", payload: error });
        });
    }, 2000);
    return () => clearTimeout(delayedFetch);
  }, [url]);
  return {
    state,
  };
};
